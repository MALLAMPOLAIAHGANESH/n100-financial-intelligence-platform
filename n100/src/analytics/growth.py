"""
Convenience wrappers to compute Revenue / PAT / EPS CAGR windows.
"""
from __future__ import annotations
from typing import Dict, Optional, List
from .cagr import compute_cagr

def cagr_for_series(values_by_year: Dict[int, float], anchor_year: int, window_years: int) -> Dict[str, Optional[float]]:
    """
    values_by_year: {year:int -> value:float}
    anchor_year: end year for CAGR
    window_years: 3,5,10 etc.
    """
    start_year = anchor_year - window_years
    start = values_by_year.get(start_year)
    end = values_by_year.get(anchor_year)
    return compute_cagr(start, end, window_years)