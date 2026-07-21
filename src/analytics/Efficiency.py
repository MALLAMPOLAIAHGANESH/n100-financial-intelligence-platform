"""
Efficiency KPIs: Asset Turnover and similar ratios.
"""
from __future__ import annotations
from typing import Optional

def asset_turnover(revenue: float, total_assets: float) -> Optional[float]:
    if total_assets is None or total_assets == 0:
        return None
    return float(revenue) / float(total_assets)