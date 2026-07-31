# src/routers/v1/companies.py

"""Company API endpoints connected to PostgreSQL database."""

from __future__ import annotations

from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import BaseModel
from sqlalchemy.orm import Session

from src.database.session import get_db
from src.services.company_service import (
    create_company as create_company_service,
    get_company as get_company_service,
    list_companies as list_companies_service,
)

class CompanyCreate(BaseModel):
    ticker: str
    name: str
    sector: str | None = None

class CompanyRead(BaseModel):
    company_id: str
    company_name: str
    website: str | None = None
    roe_percentage: float | None = None
    roce_percentage: float | None = None

    class Config:
        from_attributes = True

router = APIRouter()


@router.post("/", response_model=CompanyRead, status_code=status.HTTP_201_CREATED)
async def create_company(payload: CompanyCreate, db: Session = Depends(get_db)) -> CompanyRead:
    company = create_company_service(db, ticker=payload.ticker, name=payload.name)
    return CompanyRead(
        company_id=company.company_id,
        company_name=company.company_name,
        website=company.website,
        roe_percentage=company.roe_percentage,
        roce_percentage=company.roce_percentage,
    )


@router.get("/{company_id}", response_model=CompanyRead)
async def get_company(company_id: str, db: Session = Depends(get_db)) -> CompanyRead:
    company = get_company_service(db, company_id)
    if not company:
        raise HTTPException(status_code=404, detail="Company not found")
    return CompanyRead(
        company_id=company.company_id,
        company_name=company.company_name,
        website=company.website,
        roe_percentage=company.roe_percentage,
        roce_percentage=company.roce_percentage,
    )


@router.get("/", response_model=list[CompanyRead])
async def list_companies(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)) -> list[CompanyRead]:
    companies = list_companies_service(db, skip=skip, limit=limit)
    return [
        CompanyRead(
            company_id=c.company_id,
            company_name=c.company_name,
            website=c.website,
            roe_percentage=c.roe_percentage,
            roce_percentage=c.roce_percentage,
        )
        for c in companies
    ]
