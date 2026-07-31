# src/services/ratio_service.py

"""Ratio service layer – provides functions to compute financial ratios.

Wraps the existing ``run_ratio_engine`` logic so that API endpoints can request
ratio calculations on demand without re‑reading the entire dataset each time.
"""

from __future__ import annotations

from typing import List

import pandas as pd

from src.analytics.ratio_engine import run_ratio_engine


def compute_all_ratios() -> pd.DataFrame:
    """Execute the full ratio engine and return the resulting DataFrame.

    This function can be called from an API endpoint to trigger a fresh
    computation (e.g., after new data has been loaded). It returns the DataFrame
    so that callers can further filter, paginate, or export the results.
    """
    return run_ratio_engine()


def get_ratios_for_company(company_id: str) -> pd.DataFrame:
    """Return computed ratios for a single company.

    The function loads the cached ``computed_ratios`` table from the database
    (or from the CSV if the table is unavailable) and filters by ``company_id``.
    """
    # Load from DB – using SQLAlchemy engine defined in ``src.database.db``
    from src.database.db import engine
    try:
        df = pd.read_sql_table("computed_ratios", con=engine)
    except Exception:
        # Fallback to CSV if the table does not exist yet
        from pathlib import Path
        csv_path = Path(__file__).resolve().parents[3] / "reports" / "financial_ratios_computed.csv"
        df = pd.read_csv(csv_path)

    filtered = df[df["company_id"] == company_id]
    return filtered.reset_index(drop=True)


def list_companies_with_ratios(limit: int = 100, offset: int = 0) -> List[dict]:
    """Return a list of company IDs that have computed ratios (for pagination)."""
    from src.database.db import engine
    query = "SELECT DISTINCT company_id FROM computed_ratios ORDER BY company_id LIMIT :limit OFFSET :offset"
    with engine.connect() as conn:
        result = conn.execute(query, {"limit": limit, "offset": offset})
        return [{"company_id": row["company_id"]} for row in result]
