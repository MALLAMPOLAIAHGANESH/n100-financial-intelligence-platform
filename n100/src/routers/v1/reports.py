# src/routers/v1/reports.py
"""Reports endpoints for institutional research and data downloads."""

from __future__ import annotations
from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from typing import List, Dict, Any

from src.database.session import get_db

router = APIRouter()

REPORTS_CATALOG = [
    {
        "id": "q4-earnings",
        "title": "Nifty 100 Q4 Earnings Teardown",
        "category": "Earnings",
        "format": "CSV",
        "download_url": "/data/q4-earnings/nifty100_q4_earnings_summary.csv",
        "file_size": "2.4 KB",
    },
    {
        "id": "ratio-matrix",
        "title": "Master Financial Ratio Matrix (50+ Ratios)",
        "category": "Ratio Matrix",
        "format": "CSV",
        "download_url": "/data/q4-earnings/nifty100_ratio_matrix_full.csv",
        "file_size": "3.8 KB",
    },
    {
        "id": "dq-audit",
        "title": "Data Quality & Ingestion Audit Report",
        "category": "Audit Log",
        "format": "CSV",
        "download_url": "/data/q4-earnings/data_quality_audit_summary.csv",
        "file_size": "1.9 KB",
    },
]


@router.get("/", summary="List all available reports and raw datasets", response_model=List[dict])
async def list_reports(db: Session = Depends(get_db)) -> List[dict]:
    """Returns catalog of institutional reports and raw CSV downloads."""
    return REPORTS_CATALOG


@router.get("/q4-earnings", summary="Get Q4 Earnings Teardown summary metadata", response_model=dict)
async def q4_earnings_report(db: Session = Depends(get_db)) -> dict:
    """Returns metadata for Nifty 100 Q4 Earnings Teardown."""
    return REPORTS_CATALOG[0]
