"""
Profitability KPIs

Functions are pure and return floats (percent as decimal e.g. 0.12 for 12%)
Each function handles zero-denominator and returns None when not computable.
OPM cross-check helper returns (computed, reported, warning_message_or_None)
"""
from __future__ import annotations
import logging
from typing import Optional, Tuple

logger = logging.getLogger(__name__)


def safe_divide(numerator: float, denominator: float) -> Optional[float]:
    try:
        if denominator is None or denominator == 0:
            return None
        return float(numerator) / float(denominator)
    except Exception:
        return None


def net_profit_margin_pct(net_profit: float, revenue: float) -> Optional[float]:
    """
    Net Profit Margin = Net Profit / Revenue
    Returns decimal (e.g., 0.10 for 10%) or None
    """
    return safe_divide(net_profit, revenue)


def operating_profit_margin_pct(operating_profit: float, revenue: float) -> Optional[float]:
    """
    Operating Profit Margin = Operating Profit / Revenue
    """
    return safe_divide(operating_profit, revenue)


def return_on_equity_pct(net_profit: float, equity: float, sector: Optional[str] = None) -> Optional[float]:
    """
    ROE = Net Income / Shareholder's Equity
    Return None for zero equity
    """
    if equity is None or equity == 0:
        return None
    return safe_divide(net_profit, equity)


def return_on_capital_employed_pct(ebit: float, capital_employed: float) -> Optional[float]:
    """
    ROCE = EBIT / Capital Employed
    """
    return safe_divide(ebit, capital_employed)


def return_on_assets_pct(net_profit: float, total_assets: float) -> Optional[float]:
    """
    ROA = Net Profit / Total Assets
    """
    return safe_divide(net_profit, total_assets)


def opm_cross_check(computed_opm: Optional[float], reported_opm: Optional[float], tolerance_pct: float = 0.01) -> Tuple[bool, Optional[str]]:
    """
    Compare computed OPM against reported OPM.
    Returns (is_within_tolerance, warning_message_or_None)
    tolerance_pct = 0.01 denotes 1 percentage point (0.01 = 1%)
    """
    if computed_opm is None or reported_opm is None:
        return True, None
    try:
        diff = abs(computed_opm - reported_opm)
        if diff > tolerance_pct:
            msg = f"OPM difference {diff:.4f} exceeds tolerance {tolerance_pct:.4f}"
            logger.warning(msg)
            return False, msg
        return True, None
    except Exception:
        logger.exception("Error during OPM cross-check")
        return True, None