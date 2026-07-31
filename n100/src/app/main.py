from __future__ import annotations

from fastapi import FastAPI
from starlette.middleware.cors import CORSMiddleware

from src.config.settings import settings
from src.core.logger import logger
from src.routers.v1 import health, companies, ratios


def create_app() -> FastAPI:
    """Create and configure the FastAPI application.

    - Applies CORS middleware using origins from ``settings.CORS_ORIGINS``.
    - Includes versioned API routers.
    - Registers a request logger middleware.
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
            client=request.client.host,
        )
        response = await call_next(request)
        logger.info(
            "response",
            status_code=response.status_code,
            path=request.url.path,
        )
        return response

    # Register routers
    app.include_router(health.router, prefix="/health", tags=["health"])
    app.include_router(companies.router, prefix="/v1/companies", tags=["companies"])
    app.include_router(ratios.router, prefix="/v1/ratios", tags=["ratios"])
    from src.routers.v1 import auth
    app.include_router(auth.router, prefix="/auth", tags=["auth"])


    return app
