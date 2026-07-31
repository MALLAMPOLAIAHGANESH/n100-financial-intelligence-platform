from __future__ import annotations

import os
from pathlib import Path
from typing import List

from pydantic import BaseSettings, Field, validator

class Settings(BaseSettings):
    """Application configuration loaded from environment variables.

    Uses pydantic ``BaseSettings`` for type validation and default handling.
    """

    # Database configuration
    POSTGRES_USER: str = Field(..., env="POSTGRES_USER")
    POSTGRES_PASSWORD: str = Field(..., env="POSTGRES_PASSWORD")
    POSTGRES_HOST: str = Field("localhost", env="POSTGRES_HOST")
    POSTGRES_PORT: str = Field("5432", env="POSTGRES_PORT")
    POSTGRES_DB: str = Field(..., env="POSTGRES_DB")

    # Application settings
    APP_NAME: str = "Nifty100 Financial Intelligence Platform"
    APP_VERSION: str = "0.1.0"
    DEBUG: bool = False

    # CORS configuration – will be overridden by user input later if needed
    CORS_ORIGINS: List[str] = [
        "https://app.nifty100.com",
        "http://localhost:3000",
    ]

    # JWT secret – placeholder; should be overridden in production
    JWT_SECRET_KEY: str = Field("change-me", env="JWT_SECRET_KEY")
    JWT_ALGORITHM: str = "HS256"
    JWT_ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24  # 1 day

    class Config:
        env_file = Path(__file__).resolve().parents[2] / ".env"
        env_file_encoding = "utf-8"
        case_sensitive = False

    @validator("POSTGRES_PORT", pre=True)
    def _convert_port(cls, v: str) -> str:
        return str(v)

# Export a singleton for easy import
settings = Settings()
