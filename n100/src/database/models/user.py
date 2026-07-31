# src/database/models/user.py
"""User model for authentication.

Stores a unique email, hashed password, and an optional role (e.g., admin, analyst).
"""

from __future__ import annotations

from sqlalchemy import Column, String, Boolean

from src.database.base import Base


class User(Base):
    __tablename__ = "users"

    email = Column(String(255), primary_key=True, index=True)
    hashed_password = Column(String, nullable=False)
    is_active = Column(Boolean, default=True)
    role = Column(String(50), default="user")
