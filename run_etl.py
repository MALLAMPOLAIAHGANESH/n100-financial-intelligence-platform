"""
run_etl.py – N100 Financial Intelligence Platform
Full ETL pipeline runner.

Usage:
    python run_etl.py

Prereqs:
    - PostgreSQL container must be running (docker-compose -f docker-compose.test.yml up -d)
    - data/raw/*.xlsx files must be present
"""
from __future__ import annotations
import sys
from pathlib import Path

# Ensure src/ is on the import path
PROJECT_ROOT = Path(__file__).resolve().parent
sys.path.insert(0, str(PROJECT_ROOT / "src"))

from etl.loader import ETLLoader


if __name__ == "__main__":
    loader = ETLLoader()
    loader.run()
