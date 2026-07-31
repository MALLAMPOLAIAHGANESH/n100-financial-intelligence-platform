# src/core/security.py
"""Security utilities for password hashing and JWT token handling.

We use ``passlib``'s ``bcrypt`` scheme for password hashing and ``pyjwt``
for token creation/validation. The secret key comes from ``settings``.
"""

from __future__ import annotations

from datetime import datetime, timedelta
from typing import Any

from passlib.context import CryptContext
import jwt

from src.config.settings import settings

# ---------------------------------------------------------------------------
# Password hashing
# ---------------------------------------------------------------------------
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def hash_password(password: str) -> str:
    """Return a bcrypt hash of the plain password."""
    return pwd_context.hash(password)


def verify_password(plain_password: str, hashed_password: str) -> bool:
    """Verify a plain password against its bcrypt hash."""
    return pwd_context.verify(plain_password, hashed_password)

# ---------------------------------------------------------------------------
# JWT handling
# ---------------------------------------------------------------------------

def _create_access_token(data: dict, expires_delta: timedelta | None = None) -> str:
    """Create a signed JWT token.

    ``data`` is a dict that will be encoded (e.g. ``{"sub": user_id}``).
    ``expires_delta`` sets the token expiration; defaults to the value from
    ``settings.JWT_ACCESS_TOKEN_EXPIRE_MINUTES``.
    """
    to_encode = data.copy()
    expire = datetime.utcnow() + (
        expires_delta or timedelta(minutes=settings.JWT_ACCESS_TOKEN_EXPIRE_MINUTES)
    )
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, settings.JWT_SECRET_KEY, algorithm=settings.JWT_ALGORITHM)
    return encoded_jwt


def create_access_token(user_id: str, role: str | None = None) -> str:
    """Public helper to generate a token for a given ``user_id``.

    ``role`` is optional; it will be included as ``"role"`` claim if provided.
    """
    payload: dict[str, Any] = {"sub": user_id}
    if role:
        payload["role"] = role
    return _create_access_token(payload)


def decode_token(token: str) -> dict[str, Any]:
    """Decode a JWT token and return its payload.

    Raises ``jwt.PyJWTError`` on invalid signature or expiration.
    """
    return jwt.decode(token, settings.JWT_SECRET_KEY, algorithms=[settings.JWT_ALGORITHM])
