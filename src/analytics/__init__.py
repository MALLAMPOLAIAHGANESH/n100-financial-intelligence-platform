"""Analytics package for KPI computations."""

from .Profitability import (
    net_profit_margin_pct,
    operating_profit_margin_pct,
    return_on_equity_pct,
    return_on_capital_employed_pct,
    return_on_assets_pct,
    opm_cross_check,
)
from .Leverage import (
    debt_to_equity,
    interest_coverage_ratio,
    net_debt,
    high_leverage_flag,
    debt_free_label,
)
from .Efficiency import asset_turnover
from .cagr import compute_cagr
from .growth import cagr_for_series
