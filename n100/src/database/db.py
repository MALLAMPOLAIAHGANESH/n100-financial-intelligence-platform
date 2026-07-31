"""
Database engine and session factory.
Reads connection details from environment variables (loaded via .env).
Env vars: DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_NAME
"""
from __future__ import annotations
import os
from pathlib import Path
from dotenv import load_dotenv
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

# Load .env from the project root (two levels up from src/database/)
_env_path = Path(__file__).resolve().parents[2] / ".env"
load_dotenv(dotenv_path=_env_path, override=False)

_url_override = os.getenv("DATABASE_URL")
if _url_override:
    DATABASE_URL = _url_override
elif os.getenv("USE_SQLITE", "false").lower() in ("true", "1", "yes"):
    sqlite_path = Path(__file__).resolve().parents[2] / "financial_test_db.sqlite"
    DATABASE_URL = f"sqlite:///{sqlite_path}"
else:
    _user     = os.getenv("DB_USER") or os.getenv("POSTGRES_USER", "test_user")
    _password = os.getenv("DB_PASSWORD") or os.getenv("POSTGRES_PASSWORD", "test_password")
    _host     = os.getenv("DB_HOST") or os.getenv("POSTGRES_HOST", "localhost")
    _port     = os.getenv("DB_PORT") or os.getenv("POSTGRES_PORT", "5433")
    _name     = os.getenv("DB_NAME") or os.getenv("POSTGRES_DB", "financial_test_db")
    DATABASE_URL = f"postgresql+psycopg2://{_user}:{_password}@{_host}:{_port}/{_name}"

if DATABASE_URL.startswith("sqlite"):
    engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})
else:
    engine = create_engine(DATABASE_URL, pool_pre_ping=True)

SessionLocal = sessionmaker(bind=engine, autoflush=False, autocommit=False)