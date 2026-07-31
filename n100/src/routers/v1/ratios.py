# src/routers/v1/ratios.py
"""Ratio endpoints – thin wrappers around the analytics engine.

Provides:
- POST /v1/ratios/compute – triggers a full recomputation of all financial ratios.
- GET /v1/ratios/company/{company_id} – returns ratio rows for a specific company.
- GET /v1/ratios/companies – paginated list of company IDs that have ratios.
"""

from __future__ import annotations

from fastapi import APIRouter, HTTPException, status, Depends, Query
from sqlalchemy.orm import Session
from typing import List

from src.services.ratio_service import (
    compute_all_ratios,
    get_ratios_for_company,
    list_companies_with_ratios,
)
from src.database.session import get_db

router = APIRouter()


@router.post(
    "/compute",
    summary="Run the full ratio engine",
    status_code=status.HTTP_202_ACCEPTED,
    response_model=dict,
)
async def trigger_ratio_engine(db: Session = Depends(get_db)):
    """Kick off a full recomputation of all financial ratios.
    The endpoint runs the engine synchronously for now; in production this
    should be delegated to a background worker (Celery, Cloud Tasks, etc.).
    """
    try:
        df = compute_all_ratios()
        return {"status": "completed", "rows": len(df)}
    except Exception as exc:
        raise HTTPException(
            status_code=500,
            detail=f"Ratio engine failed: {exc}",
        ) from exc


@router.get(
    "/company/{company_id}",
    summary="Get computed ratios for a single company",
    response_model=List[dict],
)
async def ratios_for_company(
    company_id: str, db: Session = Depends(get_db)
) -> List[dict]:
    """Return all ratio rows for the given company.
    If the company has no ratios, a 404 is returned.
    """
    df = get_ratios_for_company(company_id)
    if df.empty:
        raise HTTPException(status_code=404, detail="No ratios found for this company")
    return df.to_dict(orient="records")


@router.get(
    "/companies",
    summary="List companies that have computed ratios",
    response_model=List[dict],
)
async def list_companies(
    limit: int = Query(100, ge=1, le=1000),
    offset: int = Query(0, ge=0),
    db: Session = Depends(get_db),
) -> List[dict]:
    """Paginated list of company IDs with ratio data.
    Returns a list of objects like ``{"company_id": "ABC"}``.
    """
    return list_companies_with_ratios(limit=limit, offset=offset)
