# src/routers/v1/companies.py

"""Company CRUD endpoints (stub implementations)."""

from __future__ import annotations

from fastapi import APIRouter, HTTPException, status
from pydantic import BaseModel

# Simple Pydantic models for request/response (replace with real DB models later)

class CompanyCreate(BaseModel):
    ticker: str
    name: str
    sector: str | None = None

class CompanyRead(BaseModel):
    id: int
    ticker: str
    name: str
    sector: str | None = None

router = APIRouter()

# In‑memory store for demonstration (to be replaced by DB service)
_FAKE_DB: dict[int, CompanyRead] = {}
_NEXT_ID = 1


@router.post("/", response_model=CompanyRead, status_code=status.HTTP_201_CREATED)
async def create_company(payload: CompanyCreate, db: Session = Depends(get_db), _: dict = Depends(admin_required)) -> CompanyRead:
    global _NEXT_ID
    company = CompanyRead(id=_NEXT_ID, **payload.dict())
    _FAKE_DB[_NEXT_ID] = company
    _NEXT_ID += 1
    return company


@router.get("/{company_id}", response_model=CompanyRead)
async def get_company(company_id: int) -> CompanyRead:
    company = _FAKE_DB.get(company_id)
    if not company:
        raise HTTPException(status_code=404, detail="Company not found")
    return company


@router.get("/", response_model=list[CompanyRead])
async def list_companies() -> list[CompanyRead]:
    return list(_FAKE_DB.values())
