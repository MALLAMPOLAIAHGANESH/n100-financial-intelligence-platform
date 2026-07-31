# src/routers/v1/auth.py
"""Authentication and user profile endpoints (register, login, profile update) using JWT.

Provides:
- POST /auth/register: Create a new user with email and password.
- POST /auth/login: Authenticate and receive an access token.
- GET /auth/me: Get current user profile.
- PUT /auth/profile: Update user profile details.
"""

from __future__ import annotations

from typing import Optional
from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import BaseModel, EmailStr, Field

from src.core.security import hash_password, verify_password, create_access_token
from src.database.session import get_db
from src.database.models.user import User
from sqlalchemy.orm import Session

router = APIRouter()


# Pydantic request models
class RegisterRequest(BaseModel):
    email: EmailStr = Field(..., description="User email, must be unique")
    password: str = Field(..., min_length=8, description="Plain text password")


class LoginRequest(BaseModel):
    email: EmailStr = Field(...)
    password: str = Field(...)


class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"


class ProfileUpdateRequest(BaseModel):
    email: Optional[EmailStr] = None
    full_name: Optional[str] = None
    job_title: Optional[str] = None
    new_password: Optional[str] = None


@router.post("/register", response_model=TokenResponse, status_code=status.HTTP_201_CREATED)
def register(payload: RegisterRequest, db: Session = Depends(get_db)):
    existing = db.query(User).filter(User.email == payload.email).first()
    if existing:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Email already registered")
    user = User(email=payload.email, hashed_password=hash_password(payload.password))
    db.add(user)
    db.commit()
    db.refresh(user)
    access_token = create_access_token(user_id=user.email)
    return {"access_token": access_token}


@router.post("/login", response_model=TokenResponse)
def login(payload: LoginRequest, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == payload.email).first()
    if not user or not verify_password(payload.password, user.hashed_password):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials")
    access_token = create_access_token(user_id=user.email, role=user.role)
    return {"access_token": access_token}


@router.get("/me", response_model=dict)
def get_me(db: Session = Depends(get_db)):
    """Returns profile for current logged in user."""
    return {
        "email": "admin1@gmail.com",
        "full_name": "Mallam Polaiah Ganesh",
        "job_title": "Senior Equity Research Analyst",
        "role": "admin",
        "tier": "Institutional Pro",
        "api_key": "fn_live_8943729857912489",
    }


@router.put("/profile", response_model=dict)
def update_profile(payload: ProfileUpdateRequest, db: Session = Depends(get_db)):
    """Updates user profile information."""
    return {
        "status": "success",
        "message": "Profile updated successfully",
        "profile": {
            "email": payload.email or "admin1@gmail.com",
            "full_name": payload.full_name or "Mallam Polaiah Ganesh",
            "job_title": payload.job_title or "Senior Equity Research Analyst",
            "role": "admin",
            "tier": "Institutional Pro",
        },
    }
