"""
Ratio Engine – N100 Financial Intelligence Platform
=====================================================
Reads profit_loss, balance_sheet, cash_flow, and companies tables from
PostgreSQL, computes all financial KPIs using vectorized logic, and
writes results to:
  - reports/financial_ratios_computed.csv
  - PostgreSQL table: computed_ratios
"""
from __future__ import annotations

import sys
from pathlib import Path
import logging
import pandas as pd
import numpy as np

PROJECT_ROOT = Path(__file__).resolve().parents[2]
sys.path.insert(0, str(PROJECT_ROOT / "src"))

from database.db import engine
from analytics.Profitability import (
    net_profit_margin_pct,
    operating_profit_margin_pct,
    return_on_equity_pct,
    return_on_capital_employed_pct,
    return_on_assets_pct,
)
from analytics.Leverage import (
    debt_to_equity,
    interest_coverage_ratio,
    net_debt,
    high_leverage_flag,
    debt_free_label,
)
from analytics.Efficiency import asset_turnover
from analytics.cagr import compute_cagr

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s | %(levelname)s | %(message)s",
)
logger = logging.getLogger(__name__)


def load_tables() -> tuple[pd.DataFrame, pd.DataFrame, pd.DataFrame, pd.DataFrame]:
    logger.info("Loading tables from PostgreSQL...")
    with engine.connect() as conn:
        pl  = pd.read_sql_table("profit_loss",   conn)
        bs  = pd.read_sql_table("balance_sheet",  conn)
        cf  = pd.read_sql_table("cash_flow",      conn)
        co  = pd.read_sql_table("companies",      conn)
    logger.info(f"  profit_loss:   {len(pl)} rows")
    logger.info(f"  balance_sheet: {len(bs)} rows")
    logger.info(f"  cash_flow:     {len(cf)} rows")
    logger.info(f"  companies:     {len(co)} rows")
    return pl, bs, cf, co


def _get_series(df: pd.DataFrame, *possible_names: str) -> pd.Series:
    col_map = {c.lower(): c for c in df.columns}
    for name in possible_names:
        if name.lower() in col_map:
            return pd.to_numeric(df[col_map[name.lower()]], errors="coerce")
    return pd.Series(np.nan, index=df.index)


def compute_cagr_kpis(pl: pd.DataFrame) -> pd.DataFrame:
    records = []
    year_col  = next((c for c in pl.columns if "year" in c.lower()), None)
    comp_col  = next((c for c in pl.columns if "company_id" in c.lower()), None)
    rev_col   = next((c for c in pl.columns if c.lower() in {"revenue", "net_sales", "sales", "total_revenue"}), None)
    pat_col   = next((c for c in pl.columns if c.lower() in {"net_profit", "pat", "profit_after_tax"}), None)

    if not all([year_col, comp_col]):
        return pd.DataFrame()

    for company_id, grp in pl.groupby(comp_col):
        grp = grp.dropna(subset=[year_col]).sort_values(year_col)
        if grp.empty:
            continue
        anchor = int(grp[year_col].max())
        row = {"company_id": company_id, "anchor_year": anchor}

        for label, col in [("revenue", rev_col), ("pat", pat_col)]:
            if col is None:
                continue
            series = {int(r[year_col]): (r[col] if pd.notna(r[col]) else None) for _, r in grp.iterrows()}
            for window in [3, 5]:
                result = compute_cagr(series.get(anchor - window), series.get(anchor), window)
                row[f"{label}_cagr_{window}yr_value"] = result["value"]
                row[f"{label}_cagr_{window}yr_flag"]  = result["flag"]

        records.append(row)

    return pd.DataFrame(records)


def run_ratio_engine() -> pd.DataFrame:
    pl, bs, cf, co = load_tables()

    def get_col(df, *names):
        for n in names:
            match = next((c for c in df.columns if c.lower() == n.lower()), None)
            if match:
                return match
        return None

    pl_comp = get_col(pl, "company_id", "id")
    bs_comp = get_col(bs, "company_id", "id")
    pl_year = get_col(pl, "year")
    bs_year = get_col(bs, "year")

    if not all([pl_comp, pl_year, bs_comp, bs_year]):
        logger.error("Cannot find company_id/year columns – aborting ratio engine")
        return pd.DataFrame()

    pl = pl.rename(columns={pl_comp: "company_id", pl_year: "year"})
    bs = bs.rename(columns={bs_comp: "company_id", bs_year: "year"})

    for df_ in (pl, bs):
        df_["year"]       = pd.to_numeric(df_["year"], errors="coerce")
        df_["company_id"] = pd.to_numeric(df_["company_id"], errors="coerce")

    logger.info("Merging profit_loss + balance_sheet...")
    merged = pd.merge(
        pl, bs,
        on=["company_id", "year"],
        how="inner",
        suffixes=("_pl", "_bs"),
    )
    logger.info(f"Merged {len(merged)} company-year rows")

    revenue      = _get_series(merged, "revenue", "net_sales", "sales", "total_revenue")
    net_profit   = _get_series(merged, "net_profit", "pat", "profit_after_tax", "net_income")
    op_profit    = _get_series(merged, "operating_profit", "ebit", "ebitda", "pbdit")
    equity       = _get_series(merged, "shareholders_equity", "total_equity", "networth", "net_worth")
    total_assets = _get_series(merged, "total_assets")
    total_debt   = _get_series(merged, "total_debt", "borrowings", "total_borrowings")
    cash         = _get_series(merged, "cash_and_cash_equivalents", "cash_equivalents", "cash")
    interest     = _get_series(merged, "interest_expense", "finance_cost", "finance_costs")

    # Vectorized KPI computations
    merged["net_profit_margin"]          = np.where((revenue > 0) & net_profit.notna(), net_profit / revenue, np.nan)
    merged["operating_profit_margin"]    = np.where((revenue > 0) & op_profit.notna(), op_profit / revenue, np.nan)
    merged["return_on_equity"]           = np.where((equity > 0) & net_profit.notna(), net_profit / equity, np.nan)
    merged["return_on_capital_employed"] = np.where((total_assets > 0) & op_profit.notna(), op_profit / total_assets, np.nan)
    merged["return_on_assets"]           = np.where((total_assets > 0) & net_profit.notna(), net_profit / total_assets, np.nan)

    merged["debt_to_equity"]             = np.where((equity > 0) & total_debt.notna(), total_debt / equity, np.nan)
    merged["interest_coverage_ratio"]    = np.where((interest > 0) & op_profit.notna(), op_profit / interest, np.nan)
    merged["net_debt"]                   = np.where(total_debt.notna() & cash.notna(), total_debt - cash, total_debt)
    merged["high_leverage_flag"]         = np.where(merged["debt_to_equity"] > 2.0, True, False)
    merged["debt_free"]                  = np.where(total_debt == 0, "DEBT_FREE", "LEVERAGED")
    merged["asset_turnover"]             = np.where((total_assets > 0) & revenue.notna(), revenue / total_assets, np.nan)

    co_id_col = get_col(co, "company_id", "id")
    if co_id_col:
        co = co.rename(columns={co_id_col: "company_id"})
        co["company_id"] = pd.to_numeric(co["company_id"], errors="coerce")
        meta_cols = ["company_id"] + [c for c in ["name", "company_name", "ticker", "symbol", "sector", "industry"] if c in co.columns]
        merged = merged.merge(co[meta_cols], on="company_id", how="left")

    logger.info("Computing CAGR KPIs...")
    cagr_df = compute_cagr_kpis(pl)
    if not cagr_df.empty:
        cagr_df["company_id"] = pd.to_numeric(cagr_df["company_id"], errors="coerce")
        merged = merged.merge(cagr_df, on="company_id", how="left")

    reports_dir = PROJECT_ROOT / "reports"
    reports_dir.mkdir(exist_ok=True)
    out_csv = reports_dir / "financial_ratios_computed.csv"
    merged.to_csv(out_csv, index=False)
    logger.info(f"Saved computed ratios → {out_csv}")

    logger.info("Writing computed_ratios table to PostgreSQL...")
    merged.to_sql(
        name="computed_ratios",
        con=engine,
        if_exists="replace",
        index=False,
        method="multi",
    )
    logger.info(f"✅ computed_ratios table written ({len(merged)} rows)")

    print("\n" + "=" * 70)
    print("RATIO ENGINE SUMMARY")
    print("=" * 70)
    print(f"  Companies processed : {merged['company_id'].nunique()}")
    print(f"  Company-year rows   : {len(merged)}")
    print("=" * 70)

    return merged


if __name__ == "__main__":
    run_ratio_engine()
