# src/core/dependencies.py
"""FastAPI dependency utilities.

Provides a `get_current_user` dependency that extracts the JWT token from the
`Authorization: Bearer <token>` header, decodes it using the project's security
helpers, and returns a simple dictionary containing the user's identifier and
role.
"""

from __future__ import annotations

from fastapi import Depends, HTTPException, status
from src.core.dependencies import get_current_user


def admin_required(current_user: dict = Depends(get_current_user)) -> dict:
    """Ensure the current user has admin role.

    Raises HTTPException 403 if role is not admin.
    """
    if current_user.get("role") != "admin":
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Admin privileges required")
    return current_user
from fastapi.security import OAuth2PasswordBearer

from src.core.security import decode_token

# The OAuth2 scheme expects a token endpoint (not used directly here because we
# provide our own `/auth/login` route). The tokenUrl is required but never called.
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/login")


def get_current_user(token: str = Depends(oauth2_scheme)) -> dict:
    """Validate JWT and return user information.

    Parameters
    ----------
    token: str
        JWT from the `Authorization: Bearer` header.

    Returns
    -------
    dict
        A dictionary with ``user_id`` and optional ``role`` claims.
    """
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = decode_token(token)
        user_id: str | None = payload.get("sub")
        if user_id is None:
            raise credentials_exception
        role: str | None = payload.get("role")
        return {"user_id": user_id, "role": role}
    except Exception:
        raise credentials_exception
