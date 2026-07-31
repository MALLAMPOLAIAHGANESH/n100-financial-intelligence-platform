from __future__ import annotations

import os
from pathlib import Path
from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from starlette.middleware.cors import CORSMiddleware

from src.config.settings import settings
from src.core.logger import logger
from src.routers.v1 import health, companies, ratios, auth, reports


def create_app() -> FastAPI:
    """Create and configure the FastAPI application.

    - Applies CORS middleware.
    - Includes versioned API routers.
    - Mounts static production frontend if available.
    """
    app = FastAPI(
        title=settings.APP_NAME,
        version=settings.APP_VERSION,
        debug=settings.DEBUG,
        description="Nifty100 Financial Intelligence Platform backend API",
    )

    # CORS
    app.add_middleware(
        CORSMiddleware,
        allow_origins=settings.CORS_ORIGINS,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    # Simple request logger
    @app.middleware("http")
    async def log_requests(request, call_next):
        logger.info(
            "request",
            method=request.method,
            url=str(request.url),
            client=request.client.host if request.client else "unknown",
        )
        response = await call_next(request)
        logger.info(
            "response",
            status_code=response.status_code,
            path=request.url.path,
        )
        return response

    # Register API routers
    app.include_router(health.router, prefix="/health", tags=["health"])
    app.include_router(companies.router, prefix="/v1/companies", tags=["companies"])
    app.include_router(ratios.router, prefix="/v1/ratios", tags=["ratios"])
    app.include_router(reports.router, prefix="/v1/reports", tags=["reports"])
    app.include_router(auth.router, prefix="/auth", tags=["auth"])

    # Mount static frontend if available in container
    possible_out_dirs = [
        Path("/app/frontend/out"),
        Path("./frontend/out"),
        Path(__file__).resolve().parents[3] / "frontend" / "out",
    ]
    for out_dir in possible_out_dirs:
        if out_dir.exists() and out_dir.is_dir():
            app.mount("/", StaticFiles(directory=str(out_dir), html=True), name="static_frontend")
            logger.info(f"Mounted static frontend from {out_dir}")
            break

    return app
