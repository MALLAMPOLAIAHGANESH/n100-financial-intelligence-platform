# src/database/session.py

"""SQLAlchemy session handling for FastAPI.

Provides a ``SessionLocal`` factory and a FastAPI dependency ``get_db``
that yields a session and ensures proper cleanup.
"""

from __future__ import annotations

from typing import Generator

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, Session

from src.config.settings import settings

# Build the engine using the validated settings
engine = create_engine(
    settings.get_database_url(),
    pool_pre_ping=True,
    future=True,
)

# Session factory – autoflush=False for better control, autocommit disabled
SessionLocal = sessionmaker(bind=engine, autoflush=False, autocommit=False)


def get_db() -> Generator[Session, None, None]:
    """FastAPI dependency that provides a DB session.

    Yields a SQLAlchemy ``Session`` and ensures it is closed after the request.
    """
    db: Session = SessionLocal()
    try:
        yield db
    finally:
        db.close()
