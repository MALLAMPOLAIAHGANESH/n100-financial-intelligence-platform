"""
Piotroski F-Score Engine
N100 Financial Intelligence Platform
=====================================
9-point fundamental rating system assessing:
  1. Profitability (4 points): Positive ROA, Positive CFO, ROA > Previous ROA, CFO > Net Income
  2. Leverage & Solvency (3 points): Lower Long-Term Debt, Higher Current Ratio, No New Shares Issued
  3. Operating Efficiency (2 points): Higher Gross Margin, Higher Asset Turnover
"""
from __future__ import annotations


def compute_piotroski_f_score(
    roa_current: float,
    roa_previous: float,
    cfo_current: float,
    net_income_current: float,
    long_term_debt_current: float,
    long_term_debt_previous: float,
    current_ratio_current: float,
    current_ratio_previous: float,
    shares_outstanding_current: float,
    shares_outstanding_previous: float,
    gross_margin_current: float,
    gross_margin_previous: float,
    asset_turnover_current: float,
    asset_turnover_previous: float,
) -> dict:
    """Computes 9-point Piotroski F-Score."""
    signals = {
        # Profitability Signals
        "f_positive_roa": 1 if roa_current > 0 else 0,
        "f_positive_cfo": 1 if cfo_current > 0 else 0,
        "f_roa_growth": 1 if roa_current > roa_previous else 0,
        "f_quality_earnings": 1 if cfo_current > net_income_current else 0,
        # Leverage & Liquidity Signals
        "f_debt_reduction": 1 if long_term_debt_current <= long_term_debt_previous else 0,
        "f_liquidity_growth": 1 if current_ratio_current > current_ratio_previous else 0,
        "f_no_dilution": 1 if shares_outstanding_current <= shares_outstanding_previous else 0,
        # Operating Efficiency Signals
        "f_margin_growth": 1 if gross_margin_current > gross_margin_previous else 0,
        "f_turnover_growth": 1 if asset_turnover_current > asset_turnover_previous else 0,
    }

    f_score = sum(signals.values())

    if f_score >= 8:
        strength = "Strong Fundamental Health"
    elif f_score >= 5:
        strength = "Moderate Health"
    else:
        strength = "Weak Fundamental Health"

    return {
        "f_score": f_score,
        "max_score": 9,
        "strength": strength,
        "signals": signals,
    }
