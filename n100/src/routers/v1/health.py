# src/routers/v1/health.py

"""Health check endpoints for the API."""

from __future__ import annotations

from fastapi import APIRouter

router = APIRouter()


@router.get("/ping", summary="Health check", response_model=dict)
async def ping() -> dict:
    """Simple health check endpoint.

    Returns a JSON payload confirming the service is alive.
    """
    return {"status": "ok"}
