from sqlalchemy import create_engine, Column, Integer, String, Float, DateTime, Boolean, Text, ForeignKey
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, relationship
from datetime import datetime
from config import settings

engine = create_engine(settings.DATABASE_URL, connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

class Candidate(Base):
    __tablename__ = "candidates"
    
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    name = Column(String, nullable=False)
    slug = Column(String, unique=True, index=True, nullable=False)
    election = Column(String)
    created_at = Column(DateTime, default=datetime.utcnow)
    
    # Agent Configuration
    agent_name = Column(String, default="Assistant")
    tone = Column(String, default="accessible")  # formal, accessible
    response_length = Column(String, default="concise")  # concise, detailed
    
    # Program
    program_uploaded = Column(Boolean, default=False)
    program_filename = Column(String)
    program_processed = Column(Boolean, default=False)
    program_processed_at = Column(DateTime)
    
    # Relationships
    conversations = relationship("Conversation", back_populates="candidate")
    cost_logs = relationship("CostLog", back_populates="candidate")

class Conversation(Base):
    __tablename__ = "conversations"
    
    id = Column(Integer, primary_key=True, index=True)
    candidate_id = Column(Integer, ForeignKey("candidates.id"), nullable=False)
    ip_hash = Column(String, index=True)  # Hashed IP for rate limiting
    question = Column(Text, nullable=False)
    answer = Column(Text, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow, index=True)
    response_time_ms = Column(Integer)
    
    candidate = relationship("Candidate", back_populates="conversations")

class CostLog(Base):
    __tablename__ = "cost_logs"
    
    id = Column(Integer, primary_key=True, index=True)
    candidate_id = Column(Integer, ForeignKey("candidates.id"), nullable=False)
    date = Column(DateTime, default=datetime.utcnow, index=True)
    model = Column(String)
    input_tokens = Column(Integer)
    output_tokens = Column(Integer)
    cost_usd = Column(Float)
    operation = Column(String)  # "chat", "embedding"
    
    candidate = relationship("Candidate", back_populates="cost_logs")

class QACache(Base):
    __tablename__ = "qa_cache"
    
    id = Column(Integer, primary_key=True, index=True)
    candidate_id = Column(Integer, ForeignKey("candidates.id"), nullable=False, index=True)
    question_hash = Column(String, index=True, nullable=False)
    question = Column(Text, nullable=False)
    answer = Column(Text, nullable=False)
    hit_count = Column(Integer, default=0)
    created_at = Column(DateTime, default=datetime.utcnow)
    last_used = Column(DateTime, default=datetime.utcnow)

def init_db():
    Base.metadata.create_all(bind=engine)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
