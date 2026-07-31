# src/routers/v1/ratios.py
"""Ratio endpoints – thin wrappers around the analytics engine.

Provides:
- POST /v1/ratios/compute – triggers a full recomputation of all financial ratios.
- GET /v1/ratios/company/{company_id} – returns ratio rows for a specific company.
- GET /v1/ratios/companies – paginated list of company IDs that have ratios.
- GET /v1/ratios/screener – multi-factor stock screener endpoint.
- GET /v1/ratios/peer-comparison/{company_id} – benchmark company vs sector median.
- GET /v1/ratios/models/{company_id} – advanced models (DuPont, Altman Z, Piotroski F).
"""

from __future__ import annotations

from fastapi import APIRouter, HTTPException, status, Depends, Query
from sqlalchemy.orm import Session
from typing import List, Optional, Dict, Any

from src.services.ratio_service import (
    compute_all_ratios,
    get_ratios_for_company,
    list_companies_with_ratios,
    screen_companies,
    get_peer_comparison,
    get_company_models,
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
    """Kick off a full recomputation of all financial ratios."""
    try:
        df = compute_all_ratios()
        return {"status": "completed", "rows": len(df)}
    except Exception as exc:
        raise HTTPException(
            status_code=500,
            detail=f"Ratio engine failed: {exc}",
        ) from exc


@router.get(
    "/screener",
    summary="Multi-factor stock screener endpoint",
    response_model=List[dict],
)
async def screener(
    min_roe: Optional[float] = Query(None, description="Minimum ROE % threshold"),
    max_debt_equity: Optional[float] = Query(None, description="Maximum Debt-to-Equity ratio"),
    min_net_margin: Optional[float] = Query(None, description="Minimum Net Profit Margin %"),
    sector: Optional[str] = Query(None, description="Filter by sector name"),
    db: Session = Depends(get_db),
) -> List[dict]:
    """Screen Nifty 100 companies based on financial ratio conditions."""
    return screen_companies(
        min_roe=min_roe,
        max_debt_equity=max_debt_equity,
        min_net_margin=min_net_margin,
        sector=sector,
    )


@router.get(
    "/peer-comparison/{company_id}",
    summary="Get peer comparison & sector medians for a company",
    response_model=dict,
)
async def peer_comparison(
    company_id: str, db: Session = Depends(get_db)
) -> dict:
    """Benchmark target company metrics against its sector peers."""
    res = get_peer_comparison(company_id)
    if "error" in res:
        raise HTTPException(status_code=404, detail=res["error"])
    return res


@router.get(
    "/models/{company_id}",
    summary="Get DuPont 3-Step, Altman Z-Score & Piotroski F-Score models",
    response_model=dict,
)
async def company_models(
    company_id: str, db: Session = Depends(get_db)
) -> dict:
    """Computes DuPont ROE breakdown, Altman Z-Score, and Piotroski F-Score."""
    return get_company_models(company_id)


@router.get(
    "/company/{company_id}",
    summary="Get computed ratios for a single company",
    response_model=List[dict],
)
async def ratios_for_company(
    company_id: str, db: Session = Depends(get_db)
) -> List[dict]:
    """Return all ratio rows for the given company."""
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
    """Paginated list of company IDs with ratio data."""
    return list_companies_with_ratios(limit=limit, offset=offset)
