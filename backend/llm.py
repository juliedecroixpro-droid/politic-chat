import hashlib
from typing import List, Dict, Optional
from mistralai import Mistral
from datetime import datetime
from sqlalchemy.orm import Session
from database import Candidate, CostLog, QACache
from config import settings

mistral_client = Mistral(api_key=settings.MISTRAL_API_KEY)

# Pricing (per 1M tokens) - Mistral AI pricing (Feb 2026)
PRICING = {
    "mistral-small-latest": {"input": 0.2, "output": 0.6},
    "mistral-medium-latest": {"input": 2.5, "output": 7.5},
    "mistral-large-latest": {"input": 2.0, "output": 6.0}
}

def calculate_cost(model: str, input_tokens: int, output_tokens: int) -> float:
    """Calculate cost in USD based on token usage."""
    if model not in PRICING:
        return 0.0
    
    pricing = PRICING[model]
    input_cost = (input_tokens / 1_000_000) * pricing["input"]
    output_cost = (output_tokens / 1_000_000) * pricing["output"]
    return input_cost + output_cost

def log_cost(db: Session, candidate_id: int, model: str, input_tokens: int, 
             output_tokens: int, operation: str):
    """Log API cost to database."""
    cost = calculate_cost(model, input_tokens, output_tokens)
    cost_log = CostLog(
        candidate_id=candidate_id,
        model=model,
        input_tokens=input_tokens,
        output_tokens=output_tokens,
        cost_usd=cost,
        operation=operation
    )
    db.add(cost_log)
    db.commit()

def get_daily_cost(db: Session, candidate_id: int) -> float:
    """Get total cost for today."""
    today = datetime.utcnow().date()
    logs = db.query(CostLog).filter(
        CostLog.candidate_id == candidate_id,
        CostLog.date >= today
    ).all()
    return sum(log.cost_usd for log in logs)

def hash_question(question: str) -> str:
    """Create hash of question for caching."""
    return hashlib.sha256(question.lower().strip().encode()).hexdigest()

def get_cached_answer(db: Session, candidate_id: int, question: str) -> Optional[str]:
    """Check if question is cached."""
    q_hash = hash_question(question)
    cache = db.query(QACache).filter(
        QACache.candidate_id == candidate_id,
        QACache.question_hash == q_hash
    ).first()
    
    if cache:
        # Update usage stats
        cache.hit_count += 1
        cache.last_used = datetime.utcnow()
        db.commit()
        return cache.answer
    
    return None

def cache_answer(db: Session, candidate_id: int, question: str, answer: str):
    """Cache a question-answer pair."""
    q_hash = hash_question(question)
    
    # Check if already exists
    existing = db.query(QACache).filter(
        QACache.candidate_id == candidate_id,
        QACache.question_hash == q_hash
    ).first()
    
    if not existing:
        cache = QACache(
            candidate_id=candidate_id,
            question_hash=q_hash,
            question=question,
            answer=answer,
            hit_count=0
        )
        db.add(cache)
        db.commit()

def build_system_prompt(candidate: Candidate, context_sections: List[Dict]) -> str:
    """Build system prompt with context."""
    tone_instructions = {
        "formal": "Maintain a professional and formal tone. Use complete sentences and avoid colloquialisms.",
        "accessible": "Use clear, friendly language that's easy to understand. Be warm and approachable."
    }
    
    length_instructions = {
        "concise": "Keep responses brief and to the point, typically 2-3 sentences.",
        "detailed": "Provide comprehensive answers with explanations and context when appropriate."
    }
    
    context_text = "\n\n".join([
        f"[Page {section['page']}]\n{section['text']}"
        for section in context_sections
    ])
    
    prompt = f"""You are {candidate.agent_name}, an AI assistant for {candidate.name}'s municipal campaign.

IMPORTANT INSTRUCTIONS:
- Answer questions based ONLY on the provided program sections below
- {tone_instructions.get(candidate.tone, tone_instructions['accessible'])}
- {length_instructions.get(candidate.response_length, length_instructions['concise'])}
- Always cite specific page numbers when referencing the program
- If a topic is not covered in the program, respond: "Ce sujet n'est pas abordé dans le programme. Je vous encourage à contacter {candidate.name} directement pour plus d'informations."
- Be helpful, accurate, and maintain a non-partisan tone
- Respond in French

PROGRAM SECTIONS:
{context_text}

Remember: Only answer based on the above sections. If the information isn't there, admit it."""
    
    return prompt

def generate_response(
    db: Session,
    candidate: Candidate,
    question: str,
    context_sections: List[Dict],
    use_cache: bool = True
) -> Dict:
    """Generate response using LLM."""
    
    # Check cache first
    if use_cache:
        cached = get_cached_answer(db, candidate.id, question)
        if cached:
            return {
                "answer": cached,
                "cached": True,
                "cost": 0.0
            }
    
    system_prompt = build_system_prompt(candidate, context_sections)
    
    try:
        # Use Mistral
        response = mistral_client.chat.complete(
            model=settings.PRIMARY_MODEL,
            messages=[
                {
                    "role": "system",
                    "content": system_prompt
                },
                {
                    "role": "user",
                    "content": question
                }
            ],
            max_tokens=1024
        )
        
        answer = response.choices[0].message.content
        input_tokens = response.usage.prompt_tokens
        output_tokens = response.usage.completion_tokens
        model_used = settings.PRIMARY_MODEL
        
    except Exception as e:
        print(f"Mistral error: {e}")
        return {
            "answer": "Désolé, une erreur technique est survenue. Veuillez réessayer dans quelques instants.",
            "cached": False,
            "cost": 0.0,
            "error": True
        }
    
    # Log cost
    log_cost(db, candidate.id, model_used, input_tokens, output_tokens, "chat")
    cost = calculate_cost(model_used, input_tokens, output_tokens)
    
    # Cache the answer
    if use_cache:
        cache_answer(db, candidate.id, question, answer)
    
    return {
        "answer": answer,
        "cached": False,
        "cost": cost
    }
