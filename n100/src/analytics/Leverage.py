"""
Leverage KPIs: Debt-to-Equity, Interest Coverage Ratio, Net Debt
"""
from __future__ import annotations
from typing import Optional
import logging

logger = logging.getLogger(__name__)


def safe_divide(numerator: float, denominator: float) -> Optional[float]:
    try:
        if denominator is None or denominator == 0:
            return None
        return float(numerator) / float(denominator)
    except Exception:
        return None


def debt_to_equity(total_debt: float, total_equity: float) -> Optional[float]:
    if total_equity is None or total_equity == 0:
        return None
    return float(total_debt) / float(total_equity)


def net_debt(total_debt: float, cash_and_equivalents: float) -> Optional[float]:
    if total_debt is None and cash_and_equivalents is None:
        return None
    td = float(total_debt or 0.0)
    cash = float(cash_and_equivalents or 0.0)
    return td - cash


def interest_coverage_ratio(ebit: float, interest_expense: float) -> Optional[float]:
    """
    ICR = EBIT / Interest Expense
    If interest_expense is zero -> return None (flagged as debt-free or non-applicable)
    """
    return safe_divide(ebit, interest_expense)


def high_leverage_flag(debt_to_equity_ratio: Optional[float], threshold: float = 2.0) -> bool:
    if debt_to_equity_ratio is None:
        return False
    return debt_to_equity_ratio > threshold


def debt_free_label(total_debt: Optional[float]) -> bool:
    return (total_debt or 0.0) == 0.0