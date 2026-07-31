# src/services/company_service.py

"""Company service layer – encapsulates DB operations for the Company model.

Uses the FastAPI ``get_db`` dependency to obtain a SQLAlchemy session.
"""

from __future__ import annotations

from typing import List, Optional

from sqlalchemy.orm import Session

from src.database.models.company import Company
from src.database.session import get_db


def create_company(db: Session, *, ticker: str, name: str, sector: Optional[str] = None) -> Company:
    """Create a new Company record.

    Args:
        db: SQLAlchemy session (provided by ``get_db``).
        ticker: Stock ticker symbol.
        name: Full company name.
        sector: Optional sector name.
    """
    company = Company(company_id=ticker.upper(), company_name=name, sector=sector)
    db.add(company)
    db.commit()
    db.refresh(company)
    return company


def get_company(db: Session, company_id: str) -> Optional[Company]:
    """Retrieve a company by its primary key ``company_id`` (ticker)."""
    return db.query(Company).filter(Company.company_id == company_id.upper()).first()


def list_companies(db: Session, skip: int = 0, limit: int = 100) -> List[Company]:
    """Return a paginated list of companies.

    ``skip`` and ``limit`` support simple pagination for large datasets.
    """
    return db.query(Company).offset(skip).limit(limit).all()
