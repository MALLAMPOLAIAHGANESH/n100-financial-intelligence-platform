from pathlib import Path

# Base project root (two levels up from this file)
PROJECT_ROOT = Path(__file__).resolve().parents[1]

# Directory paths
RAW_DATA_DIR = PROJECT_ROOT / "data" / "raw"
PROCESSED_DATA_DIR = PROJECT_ROOT / "data" / "processed"
REPORTS_DIR = PROJECT_ROOT / "reports"
LOGS_DIR = PROJECT_ROOT / "logs"
