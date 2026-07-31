"""
run_ratios.py – N100 Financial Intelligence Platform
Runs the ratio/KPI engine against the loaded PostgreSQL data.

Usage:
    python run_ratios.py

Prereqs:
    - PostgreSQL container running
    - ETL pipeline already executed (python run_etl.py)
"""
from __future__ import annotations
import sys
from pathlib import Path

PROJECT_ROOT = Path(__file__).resolve().parent
sys.path.insert(0, str(PROJECT_ROOT / "src"))

from analytics.ratio_engine import run_ratio_engine

if __name__ == "__main__":
    run_ratio_engine()
