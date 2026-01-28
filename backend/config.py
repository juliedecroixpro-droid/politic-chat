from pydantic_settings import BaseSettings
from typing import Optional

class Settings(BaseSettings):
    # API Keys
    ANTHROPIC_API_KEY: str
    OPENAI_API_KEY: Optional[str] = None
    
    # Security
    SECRET_KEY: str = "change-this-to-a-random-secret-key-in-production"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24 * 7  # 7 days
    
    # Database
    DATABASE_URL: str = "sqlite:///./politic_chat.db"
    CHROMA_PERSIST_DIR: str = "./chroma_db"
    
    # Production: Railway auto-provides DATABASE_URL as PostgreSQL
    # The environment variable will override the SQLite default
    
    # Rate Limiting
    RATE_LIMIT_PER_DAY: int = 20
    
    # Cost Monitoring
    DAILY_BUDGET_ALERT_USD: float = 10.0
    
    # Document Processing
    MAX_PAGES: int = 100
    MAX_FILE_SIZE_MB: int = 50
    
    # LLM Settings
    PRIMARY_MODEL: str = "claude-3-haiku-20240307"
    FALLBACK_MODEL: str = "gpt-3.5-turbo"
    EMBEDDING_MODEL: str = "text-embedding-3-small"
    
    # CORS - accepts both string and list for flexibility
    CORS_ORIGINS: str = '["http://localhost:5173", "http://localhost:3000"]'
    
    @property
    def get_cors_origins(self) -> list:
        """Parse CORS_ORIGINS from string or list"""
        if isinstance(self.CORS_ORIGINS, str):
            import json
            return json.loads(self.CORS_ORIGINS)
        return self.CORS_ORIGINS
    
    class Config:
        env_file = ".env"

settings = Settings()
