"""
Altman Z-Score Model
N100 Financial Intelligence Platform
=====================================
Quantitative bankruptcy prediction formula:
  Z = 1.2 * X1 + 1.4 * X2 + 3.3 * X3 + 0.6 * X4 + 0.999 * X5

Where:
  X1 = Working Capital / Total Assets
  X2 = Retained Earnings / Total Assets
  X3 = EBIT / Total Assets
  X4 = Market Value of Equity / Total Liabilities
  X5 = Sales / Total Assets

Classifications:
  Z > 2.99       => Safe Zone
  1.81 <= Z <= 2.99 => Grey Zone
  Z < 1.81       => Distress Zone
"""
from __future__ import annotations

import pandas as pd
import numpy as np


def compute_altman_z_score(
    working_capital: float,
    retained_earnings: float,
    ebit: float,
    market_cap: float,
    sales: float,
    total_assets: float,
    total_liabilities: float,
) -> dict:
    """Computes Altman Z-Score and assigns solvency zone classification."""
    if not total_assets or total_assets <= 0 or not total_liabilities or total_liabilities <= 0:
        return {"z_score": None, "zone": "Unknown", "status": "Insufficient Data"}

    x1 = working_capital / total_assets
    x2 = retained_earnings / total_assets
    x3 = ebit / total_assets
    x4 = market_cap / total_liabilities
    x5 = sales / total_assets

    z_score = round(1.2 * x1 + 1.4 * x2 + 3.3 * x3 + 0.6 * x4 + 0.999 * x5, 2)

    if z_score > 2.99:
        zone = "Safe Zone"
        description = "Low probability of financial distress"
    elif z_score >= 1.81:
        zone = "Grey Zone"
        description = "Moderate risk; caution advised"
    else:
        zone = "Distress Zone"
        description = "High probability of financial distress within 2 years"

    return {
        "z_score": z_score,
        "zone": zone,
        "description": description,
        "components": {
            "x1_working_capital_to_assets": round(x1, 3),
            "x2_retained_earnings_to_assets": round(x2, 3),
            "x3_ebit_to_assets": round(x3, 3),
            "x4_mcap_to_liabilities": round(x4, 3),
            "x5_sales_to_assets": round(x5, 3),
        },
    }
