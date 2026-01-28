import hashlib
from datetime import datetime, timedelta
from typing import Optional
from sqlalchemy.orm import Session
from database import Conversation
from config import settings

def hash_ip(ip: str) -> str:
    """Hash IP address for privacy."""
    return hashlib.sha256(ip.encode()).hexdigest()

def get_daily_message_count(db: Session, candidate_id: int, ip: str) -> int:
    """Get number of messages sent by this IP today."""
    ip_hash = hash_ip(ip)
    today = datetime.utcnow().date()
    
    count = db.query(Conversation).filter(
        Conversation.candidate_id == candidate_id,
        Conversation.ip_hash == ip_hash,
        Conversation.created_at >= today
    ).count()
    
    return count

def is_rate_limited(db: Session, candidate_id: int, ip: str) -> tuple[bool, int]:
    """
    Check if IP is rate limited.
    Returns: (is_limited, remaining_messages)
    """
    count = get_daily_message_count(db, candidate_id, ip)
    remaining = max(0, settings.RATE_LIMIT_PER_DAY - count)
    is_limited = count >= settings.RATE_LIMIT_PER_DAY
    
    return is_limited, remaining
