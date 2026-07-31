# Core logger using structlog for JSON output

from __future__ import annotations

import logging
import sys
from typing import Any

import structlog

# Configure the root logger to output to stdout
logging.basicConfig(
    level=logging.INFO,
    format="%(message)s",
    stream=sys.stdout,
)

# Configure structlog to emit JSON with timestamp and level
structlog.configure(
    processors=[
        structlog.processors.TimeStamper(fmt="iso"),
        structlog.processors.JSONRenderer(),
    ],
    logger_factory=structlog.stdlib.LoggerFactory(),
    wrapper_class=structlog.stdlib.BoundLogger,
    cache_logger_on_first_use=True,
)

# Export a global logger instance
logger = structlog.get_logger()

def bind_context(**kwargs: Any) -> None:
    """Add contextual fields to the logger for the current execution flow.
    Example: ``bind_context(request_id="abc123")``.
    """
    global logger
    logger = logger.bind(**kwargs)

def unbind_context(*keys: str) -> None:
    """Remove previously bound context keys from the logger."""
    global logger
    logger = logger.unbind(*keys)
