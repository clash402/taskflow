from pydantic_settings import BaseSettings
from typing import List
import os


class Settings(BaseSettings):
    """Application settings"""

    # API Settings
    API_V1_STR: str = "/api/v1"
    PROJECT_NAME: str = "TaskFlow API"

    # CORS
    ALLOWED_ORIGINS: List[str] = [
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "https://taskflow-one-gules.vercel.app",
        "https://*.vercel.app",  # Allow all Vercel subdomains
    ]

    # Database
    DATABASE_URL: str = "sqlite:///./taskflow.db"

    # OpenAI
    OPENAI_API_KEY: str = ""
    OPENAI_MODEL: str = "gpt-4"
    OPENAI_MAX_TOKENS: int = 4000
    OPENAI_TEMPERATURE: float = 0.7

    # ElevenLabs
    ELEVENLABS_API_KEY: str = ""

    # ChromaDB
    CHROMA_PERSIST_DIRECTORY: str = "./chroma_db"

    # Logging
    LOG_LEVEL: str = "INFO"
    LOG_FORMAT: str = "%(asctime)s - %(name)s - %(levelname)s - %(message)s"

    # Task Settings
    MAX_TASK_DURATION: int = 300  # 5 minutes
    MAX_CONCURRENT_TASKS: int = 5

    # Rate Limiting
    RATE_LIMIT_PER_MINUTE: int = 60

    model_config = {"env_file": ".env", "case_sensitive": True}


# Create settings instance
settings = Settings()
