import logging
from pathlib import Path

# Compute the root directory relative to this file
PROJECT_ROOT = Path(__file__).resolve().parents[2]
LOG_DIR = PROJECT_ROOT / "logs"

LOG_DIR.mkdir(exist_ok=True)

# Configure the global logger for the ETL package
logger = logging.getLogger("ETL")
logger.setLevel(logging.INFO)

# Prevent adding multiple handlers if the module is re-imported
if not logger.handlers:
    # Create file handler
    file_handler = logging.FileHandler(LOG_DIR / "etl.log")
    file_handler.setLevel(logging.INFO)

    # Create console handler
    console_handler = logging.StreamHandler()
    console_handler.setLevel(logging.INFO)

    # Create formatter and add it to the handlers
    formatter = logging.Formatter("%(asctime)s | %(levelname)s | %(message)s")
    file_handler.setFormatter(formatter)
    console_handler.setFormatter(formatter)

    # Add the handlers to the logger
    logger.addHandler(file_handler)
    logger.addHandler(console_handler)