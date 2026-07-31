"""
DuPont 3-Step Analysis Engine
N100 Financial Intelligence Platform
=====================================
Calculates:
  1. Net Profit Margin = Net Income / Revenue
  2. Asset Turnover = Revenue / Total Assets
  3. Financial Leverage (Equity Multiplier) = Total Assets / Shareholders' Equity
  4. DuPont ROE = Net Margin * Asset Turnover * Financial Leverage
"""
from __future__ import annotations

import pandas as pd
import numpy as np


def compute_dupont_analysis(
    net_income: float | pd.Series,
    revenue: float | pd.Series,
    total_assets: float | pd.Series,
    shareholders_equity: float | pd.Series,
) -> dict | pd.DataFrame:
    """Computes DuPont 3-Step ROE decomposition."""
    net_margin = np.where(revenue > 0, net_income / revenue, np.nan)
    asset_turnover = np.where(total_assets > 0, revenue / total_assets, np.nan)
    equity_multiplier = np.where(shareholders_equity > 0, total_assets / shareholders_equity, np.nan)
    dupont_roe = net_margin * asset_turnover * equity_multiplier * 100

    if isinstance(net_income, pd.Series):
        return pd.DataFrame({
            "net_margin_pct": np.round(net_margin * 100, 2),
            "asset_turnover": np.round(asset_turnover, 3),
            "equity_multiplier": np.round(equity_multiplier, 3),
            "dupont_roe_pct": np.round(dupont_roe, 2),
        })

    return {
        "net_margin_pct": round(float(net_margin) * 100, 2) if pd.notna(net_margin) else None,
        "asset_turnover": round(float(asset_turnover), 3) if pd.notna(asset_turnover) else None,
        "equity_multiplier": round(float(equity_multiplier), 3) if pd.notna(equity_multiplier) else None,
        "dupont_roe_pct": round(float(dupont_roe), 2) if pd.notna(dupont_roe) else None,
    }
