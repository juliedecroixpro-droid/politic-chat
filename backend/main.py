import os
import time
import re
from datetime import datetime, timedelta
from typing import Optional
from fastapi import FastAPI, Depends, HTTPException, status, UploadFile, File, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
from sqlalchemy.orm import Session
from sqlalchemy import func
from pydantic import BaseModel, EmailStr
import aiofiles

from database import init_db, get_db, Candidate, Conversation, CostLog
from auth import (
    get_password_hash, 
    verify_password, 
    create_access_token, 
    get_current_candidate
)
from document_processor import process_document, search_program
from llm import generate_response, get_daily_cost
from rate_limiter import is_rate_limited, hash_ip
from config import settings

# Initialize FastAPI app
app = FastAPI(title="PoliticChat API", version="1.0.0")

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.get_cors_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize database on startup
@app.on_event("startup")
def startup_event():
    init_db()
    os.makedirs(settings.CHROMA_PERSIST_DIR, exist_ok=True)
    os.makedirs("uploads", exist_ok=True)

# Pydantic models
class CandidateRegister(BaseModel):
    email: EmailStr
    password: str
    name: str
    election: Optional[str] = None

class CandidateLogin(BaseModel):
    email: EmailStr
    password: str

class Token(BaseModel):
    access_token: str
    token_type: str

class AgentConfig(BaseModel):
    agent_name: Optional[str] = None
    tone: Optional[str] = None
    response_length: Optional[str] = None

class ChatMessage(BaseModel):
    question: str

class ChatResponse(BaseModel):
    answer: str
    cached: bool
    remaining_messages: int

# Utility functions
def slugify(text: str) -> str:
    """Create URL-safe slug from text."""
    text = text.lower()
    text = re.sub(r'[^\w\s-]', '', text)
    text = re.sub(r'[-\s]+', '-', text)
    return text.strip('-')

def get_client_ip(request: Request) -> str:
    """Extract client IP from request."""
    forwarded = request.headers.get("X-Forwarded-For")
    if forwarded:
        return forwarded.split(",")[0]
    return request.client.host

# Auth Routes
@app.post("/api/auth/register", response_model=Token)
def register(candidate: CandidateRegister, db: Session = Depends(get_db)):
    """Register a new candidate."""
    # Check if email exists
    if db.query(Candidate).filter(Candidate.email == candidate.email).first():
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered"
        )
    
    # Create slug from name
    base_slug = slugify(candidate.name)
    slug = base_slug
    counter = 1
    while db.query(Candidate).filter(Candidate.slug == slug).first():
        slug = f"{base_slug}-{counter}"
        counter += 1
    
    # Create candidate
    db_candidate = Candidate(
        email=candidate.email,
        hashed_password=get_password_hash(candidate.password),
        name=candidate.name,
        slug=slug,
        election=candidate.election
    )
    db.add(db_candidate)
    db.commit()
    db.refresh(db_candidate)
    
    # Create access token
    access_token = create_access_token(data={"sub": str(db_candidate.id)})
    
    return {"access_token": access_token, "token_type": "bearer"}

@app.post("/api/auth/login", response_model=Token)
def login(credentials: CandidateLogin, db: Session = Depends(get_db)):
    """Login candidate."""
    candidate = db.query(Candidate).filter(Candidate.email == credentials.email).first()
    
    if not candidate or not verify_password(credentials.password, candidate.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password"
        )
    
    access_token = create_access_token(data={"sub": str(candidate.id)})
    return {"access_token": access_token, "token_type": "bearer"}

@app.get("/api/auth/me")
def get_current_user(candidate: Candidate = Depends(get_current_candidate)):
    """Get current candidate info."""
    return {
        "id": candidate.id,
        "email": candidate.email,
        "name": candidate.name,
        "slug": candidate.slug,
        "election": candidate.election,
        "agent_name": candidate.agent_name,
        "tone": candidate.tone,
        "response_length": candidate.response_length,
        "program_uploaded": candidate.program_uploaded,
        "program_processed": candidate.program_processed
    }

# Program Upload Routes
@app.post("/api/program/upload")
async def upload_program(
    file: UploadFile = File(...),
    candidate: Candidate = Depends(get_current_candidate),
    db: Session = Depends(get_db)
):
    """Upload and process program document."""
    # Validate file type
    if not file.filename.endswith(('.pdf', '.docx', '.doc')):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Only PDF and Word documents are supported"
        )
    
    # Validate file size
    file.file.seek(0, 2)
    file_size = file.file.tell()
    file.file.seek(0)
    
    if file_size > settings.MAX_FILE_SIZE_MB * 1024 * 1024:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"File too large. Max size: {settings.MAX_FILE_SIZE_MB}MB"
        )
    
    # Save file
    file_path = f"uploads/candidate_{candidate.id}_{file.filename}"
    async with aiofiles.open(file_path, 'wb') as out_file:
        content = await file.read()
        await out_file.write(content)
    
    try:
        # Process document
        result = process_document(file_path, candidate.id, file.filename)
        
        # Update candidate
        candidate.program_uploaded = True
        candidate.program_filename = file.filename
        candidate.program_processed = True
        candidate.program_processed_at = datetime.utcnow()
        db.commit()
        
        return {
            "success": True,
            "message": "Program processed successfully",
            "details": result
        }
    
    except Exception as e:
        # Clean up on error
        if os.path.exists(file_path):
            os.remove(file_path)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error processing document: {str(e)}"
        )

# Agent Configuration Routes
@app.put("/api/agent/config")
def update_agent_config(
    config: AgentConfig,
    candidate: Candidate = Depends(get_current_candidate),
    db: Session = Depends(get_db)
):
    """Update agent configuration."""
    if config.agent_name is not None:
        candidate.agent_name = config.agent_name
    if config.tone is not None:
        if config.tone not in ["formal", "accessible"]:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Tone must be 'formal' or 'accessible'"
            )
        candidate.tone = config.tone
    if config.response_length is not None:
        if config.response_length not in ["concise", "detailed"]:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Response length must be 'concise' or 'detailed'"
            )
        candidate.response_length = config.response_length
    
    db.commit()
    
    return {
        "success": True,
        "agent_name": candidate.agent_name,
        "tone": candidate.tone,
        "response_length": candidate.response_length
    }

# Public Chat Routes
@app.get("/api/chat/{slug}/info")
def get_chat_info(slug: str, db: Session = Depends(get_db)):
    """Get public chat info for a candidate."""
    candidate = db.query(Candidate).filter(Candidate.slug == slug).first()
    
    if not candidate:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Candidate not found"
        )
    
    if not candidate.program_processed:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Chat not available yet"
        )
    
    return {
        "name": candidate.name,
        "agent_name": candidate.agent_name,
        "election": candidate.election
    }

@app.post("/api/chat/{slug}/message", response_model=ChatResponse)
def send_message(
    slug: str,
    message: ChatMessage,
    request: Request,
    db: Session = Depends(get_db)
):
    """Send a message to the candidate's chatbot."""
    # Get candidate
    candidate = db.query(Candidate).filter(Candidate.slug == slug).first()
    
    if not candidate or not candidate.program_processed:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Chat not available"
        )
    
    # Get client IP and check rate limit
    client_ip = get_client_ip(request)
    is_limited, remaining = is_rate_limited(db, candidate.id, client_ip)
    
    if is_limited:
        raise HTTPException(
            status_code=status.HTTP_429_TOO_MANY_REQUESTS,
            detail="Daily message limit reached. Please try again tomorrow."
        )
    
    # Search for relevant context
    start_time = time.time()
    context_sections = search_program(candidate.id, message.question, n_results=5)
    
    if not context_sections:
        answer = f"Je n'ai pas encore accès au programme complet. Je vous encourage à contacter {candidate.name} directement."
        cached = False
    else:
        # Generate response
        result = generate_response(db, candidate, message.question, context_sections)
        answer = result["answer"]
        cached = result.get("cached", False)
    
    response_time_ms = int((time.time() - start_time) * 1000)
    
    # Log conversation
    conversation = Conversation(
        candidate_id=candidate.id,
        ip_hash=hash_ip(client_ip),
        question=message.question,
        answer=answer,
        response_time_ms=response_time_ms
    )
    db.add(conversation)
    db.commit()
    
    # Get updated remaining count
    _, remaining = is_rate_limited(db, candidate.id, client_ip)
    
    return {
        "answer": answer,
        "cached": cached,
        "remaining_messages": remaining
    }

# Analytics Routes
@app.get("/api/analytics/overview")
def get_analytics_overview(
    candidate: Candidate = Depends(get_current_candidate),
    db: Session = Depends(get_db)
):
    """Get analytics overview."""
    # Total conversations
    total_conversations = db.query(Conversation).filter(
        Conversation.candidate_id == candidate.id
    ).count()
    
    # Conversations today
    today = datetime.utcnow().date()
    conversations_today = db.query(Conversation).filter(
        Conversation.candidate_id == candidate.id,
        Conversation.created_at >= today
    ).count()
    
    # Average response time
    avg_response_time = db.query(func.avg(Conversation.response_time_ms)).filter(
        Conversation.candidate_id == candidate.id
    ).scalar() or 0
    
    # Daily cost
    daily_cost = get_daily_cost(db, candidate.id)
    
    # Unique users (approximate, based on IP hashes)
    unique_users = db.query(func.count(func.distinct(Conversation.ip_hash))).filter(
        Conversation.candidate_id == candidate.id
    ).scalar() or 0
    
    return {
        "total_conversations": total_conversations,
        "conversations_today": conversations_today,
        "avg_response_time_ms": int(avg_response_time),
        "daily_cost_usd": round(daily_cost, 4),
        "unique_users": unique_users
    }

@app.get("/api/analytics/conversations")
def get_conversations(
    limit: int = 50,
    candidate: Candidate = Depends(get_current_candidate),
    db: Session = Depends(get_db)
):
    """Get recent conversations."""
    conversations = db.query(Conversation).filter(
        Conversation.candidate_id == candidate.id
    ).order_by(Conversation.created_at.desc()).limit(limit).all()
    
    return [{
        "id": conv.id,
        "question": conv.question,
        "answer": conv.answer,
        "created_at": conv.created_at.isoformat(),
        "response_time_ms": conv.response_time_ms
    } for conv in conversations]

@app.get("/api/analytics/export-csv")
def export_conversations_csv(
    candidate: Candidate = Depends(get_current_candidate),
    db: Session = Depends(get_db)
):
    """Export conversations as CSV."""
    conversations = db.query(Conversation).filter(
        Conversation.candidate_id == candidate.id
    ).order_by(Conversation.created_at.desc()).all()
    
    # Generate CSV
    csv_lines = ["Date,Question,Answer,Response Time (ms)"]
    for conv in conversations:
        # Escape quotes in CSV
        question = conv.question.replace('"', '""')
        answer = conv.answer.replace('"', '""')
        date = conv.created_at.strftime("%Y-%m-%d %H:%M:%S")
        csv_lines.append(f'"{date}","{question}","{answer}",{conv.response_time_ms}')
    
    csv_content = "\n".join(csv_lines)
    
    return StreamingResponse(
        iter([csv_content]),
        media_type="text/csv",
        headers={
            "Content-Disposition": f"attachment; filename=conversations_{candidate.slug}.csv"
        }
    )

@app.get("/api/analytics/top-questions")
def get_top_questions(
    limit: int = 10,
    candidate: Candidate = Depends(get_current_candidate),
    db: Session = Depends(get_db)
):
    """Get most frequently asked questions."""
    # Group by question (case-insensitive) and count
    questions = db.query(
        Conversation.question,
        func.count(Conversation.id).label('count')
    ).filter(
        Conversation.candidate_id == candidate.id
    ).group_by(
        func.lower(Conversation.question)
    ).order_by(
        func.count(Conversation.id).desc()
    ).limit(limit).all()
    
    return [{"question": q[0], "count": q[1]} for q in questions]

@app.get("/api/analytics/hourly-activity")
def get_hourly_activity(
    candidate: Candidate = Depends(get_current_candidate),
    db: Session = Depends(get_db)
):
    """Get conversation activity by hour."""
    # Get conversations from last 7 days
    week_ago = datetime.utcnow() - timedelta(days=7)
    conversations = db.query(Conversation).filter(
        Conversation.candidate_id == candidate.id,
        Conversation.created_at >= week_ago
    ).all()
    
    # Group by hour
    hourly_counts = [0] * 24
    for conv in conversations:
        hour = conv.created_at.hour
        hourly_counts[hour] += 1
    
    return {
        "hours": list(range(24)),
        "counts": hourly_counts
    }

# Health check endpoints
@app.get("/health")
def health_check():
    """Basic health check"""
    return {"status": "healthy", "service": "eluia-api"}

@app.get("/api/health")
def api_health_check():
    """API health check with more details"""
    try:
        # Check database connection
        from database import engine
        with engine.connect() as conn:
            conn.execute("SELECT 1")
        db_status = "connected"
    except Exception as e:
        db_status = f"error: {str(e)}"
    
    return {
        "status": "healthy",
        "service": "eluia-api",
        "database": db_status,
        "version": "1.0.0"
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
