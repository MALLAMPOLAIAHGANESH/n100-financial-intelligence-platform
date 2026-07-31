"""
Data Quality Engine – full implementation of all 16 DQ rules.
N100 Financial Intelligence Platform – Sprint 1
"""
from __future__ import annotations

import re
import pandas as pd
from pathlib import Path
from typing import Optional

from etl.dq_rules import DQ_RULES


class DataQualityEngine:
    """Runs all 16 DQ rules against a pandas DataFrame and records results."""

    VALID_YEAR_MIN = 1990
    VALID_YEAR_MAX = 2035
    URL_REGEX = re.compile(r"^https?://", re.IGNORECASE)
    TICKER_REGEX = re.compile(r"^[A-Z0-9&\-]{1,20}$")

    def __init__(self) -> None:
        self.report: list[dict] = []
        self.failures: list[dict] = []

    # ------------------------------------------------------------------
    # Internal helpers
    # ------------------------------------------------------------------
    def _pass(self, dataset: str, rule_id: str, details: str) -> None:
        self.report.append({
            "Dataset": dataset,
            "Rule ID": rule_id,
            "Rule": DQ_RULES[rule_id]["name"],
            "Severity": DQ_RULES[rule_id]["severity"],
            "Status": "PASS",
            "Details": details,
        })

    def _fail(self, dataset: str, rule_id: str, details: str) -> None:
        self.report.append({
            "Dataset": dataset,
            "Rule ID": rule_id,
            "Rule": DQ_RULES[rule_id]["name"],
            "Severity": DQ_RULES[rule_id]["severity"],
            "Status": "FAIL",
            "Details": details,
        })

    def _add_failure(
        self,
        dataset: str,
        column: str,
        rule: str,
        value: object,
        severity: str,
    ) -> None:
        self.failures.append({
            "Dataset": dataset,
            "Column": column,
            "Rule": rule,
            "Value": str(value),
            "Severity": severity,
        })

    # ------------------------------------------------------------------
    # DQ Rule implementations
    # ------------------------------------------------------------------

    def check_dq01_pk_uniqueness(self, df: pd.DataFrame, dataset: str, pk_col: Optional[str] = None) -> None:
        """DQ-01 Primary Key Uniqueness – id column must be unique and not null."""
        col = pk_col or ("id" if "id" in df.columns else None)
        if col is None:
            self._fail(dataset, "DQ-01", "No primary key column found")
            return
        nulls = int(df[col].isna().sum())
        dups = int(df[col].duplicated().sum())
        if nulls == 0 and dups == 0:
            self._pass(dataset, "DQ-01", f"{col}: all values unique and non-null")
        else:
            self._fail(dataset, "DQ-01", f"{col}: {nulls} nulls, {dups} duplicates")
            for v in df[df[col].duplicated(keep=False)][col].unique():
                self._add_failure(dataset, col, "PK Duplicate", v, "CRITICAL")

    def check_dq02_company_year_uniqueness(self, df: pd.DataFrame, dataset: str) -> None:
        """DQ-02 Company-Year Uniqueness – (company_id, year) must be unique."""
        needed = {"company_id", "year"}
        if not needed.issubset(df.columns):
            self._fail(dataset, "DQ-02", f"Missing columns for composite key: {needed - set(df.columns)}")
            return
        dups = int(df.duplicated(subset=["company_id", "year"]).sum())
        if dups == 0:
            self._pass(dataset, "DQ-02", "No duplicate (company_id, year) pairs")
        else:
            self._fail(dataset, "DQ-02", f"{dups} duplicate (company_id, year) combinations")

    def check_dq03_fk_integrity(
        self,
        df: pd.DataFrame,
        dataset: str,
        fk_col: str,
        parent_ids: set,
    ) -> None:
        """DQ-03 Foreign Key Integrity – fk_col values must exist in parent_ids."""
        if fk_col not in df.columns:
            self._fail(dataset, "DQ-03", f"FK column '{fk_col}' not found")
            return
        orphans = df[~df[fk_col].isin(parent_ids)][fk_col].dropna()
        if orphans.empty:
            self._pass(dataset, "DQ-03", f"{fk_col}: all FK values valid")
        else:
            self._fail(dataset, "DQ-03", f"{fk_col}: {len(orphans)} orphan FK values")
            for v in orphans.unique():
                self._add_failure(dataset, fk_col, "FK Violation", v, "CRITICAL")

    def check_dq04_balance_sheet(self, df: pd.DataFrame, dataset: str) -> None:
        """DQ-04 Balance Sheet Validation – Total Assets ≈ Total Liabilities + Equity."""
        cols = {"total_assets", "total_liabilities", "total_equity"}
        if not cols.issubset(df.columns):
            self._fail(dataset, "DQ-04", f"Missing columns: {cols - set(df.columns)}")
            return
        tol = 1.0  # ₹1 Cr tolerance
        df_check = df[["total_assets", "total_liabilities", "total_equity"]].dropna()
        balance = (df_check["total_liabilities"] + df_check["total_equity"] - df_check["total_assets"]).abs()
        violations = int((balance > tol).sum())
        if violations == 0:
            self._pass(dataset, "DQ-04", "Balance sheet equation holds for all rows")
        else:
            self._fail(dataset, "DQ-04", f"{violations} rows where Assets ≠ Liabilities + Equity")

    def check_dq05_opm(self, df: pd.DataFrame, dataset: str) -> None:
        """DQ-05 Operating Profit Margin Validation – OPM must be between -100% and 100%."""
        opm_cols = [c for c in df.columns if "opm" in c.lower() or "operating_profit_margin" in c.lower()]
        if not opm_cols:
            self._pass(dataset, "DQ-05", "No OPM column found – skipped")
            return
        for col in opm_cols:
            numeric = pd.to_numeric(df[col], errors="coerce")
            invalid = ((numeric < -1.0) | (numeric > 1.0)).sum()
            if invalid == 0:
                self._pass(dataset, "DQ-05", f"{col}: OPM values in valid range")
            else:
                self._fail(dataset, "DQ-05", f"{col}: {invalid} values outside [-100%, 100%]")

    def check_dq06_positive_sales(self, df: pd.DataFrame, dataset: str) -> None:
        """DQ-06 Positive Sales Validation – revenue/sales must be > 0."""
        sales_cols = [c for c in df.columns if c.lower() in {"revenue", "sales", "net_sales", "total_revenue"}]
        if not sales_cols:
            self._pass(dataset, "DQ-06", "No sales column found – skipped")
            return
        for col in sales_cols:
            numeric = pd.to_numeric(df[col], errors="coerce").dropna()
            non_positive = int((numeric <= 0).sum())
            if non_positive == 0:
                self._pass(dataset, "DQ-06", f"{col}: all values > 0")
            else:
                self._fail(dataset, "DQ-06", f"{col}: {non_positive} non-positive values")
                for v in numeric[numeric <= 0].unique():
                    self._add_failure(dataset, col, "Non-positive Sales", v, "WARNING")

    def check_dq07_year(self, df: pd.DataFrame, dataset: str) -> None:
        """DQ-07 Year Validation – year column must be between 1990 and 2035."""
        year_cols = [c for c in df.columns if "year" in c.lower()]
        if not year_cols:
            self._pass(dataset, "DQ-07", "No year column found – skipped")
            return
        for col in year_cols:
            numeric = pd.to_numeric(df[col], errors="coerce")
            invalid = df[(numeric < self.VALID_YEAR_MIN) | (numeric > self.VALID_YEAR_MAX)]
            if invalid.empty:
                self._pass(dataset, "DQ-07", f"{col}: all years in range")
            else:
                self._fail(dataset, "DQ-07", f"{col}: {len(invalid)} out-of-range years")
                for v in numeric[(numeric < self.VALID_YEAR_MIN) | (numeric > self.VALID_YEAR_MAX)].unique():
                    self._add_failure(dataset, col, "Invalid Year", v, "WARNING")

    def check_dq08_cashflow(self, df: pd.DataFrame, dataset: str) -> None:
        """DQ-08 Cash Flow Validation – CFO+CFI+CFF ≈ Net Change in Cash (if all present)."""
        needed = {"cfo", "cfi", "cff", "net_change_in_cash"}
        if not needed.issubset(df.columns):
            self._pass(dataset, "DQ-08", "Insufficient columns for cash flow validation – skipped")
            return
        df_check = df[list(needed)].apply(pd.to_numeric, errors="coerce").dropna()
        computed = df_check["cfo"] + df_check["cfi"] + df_check["cff"]
        diff = (computed - df_check["net_change_in_cash"]).abs()
        violations = int((diff > 1.0).sum())
        if violations == 0:
            self._pass(dataset, "DQ-08", "Cash flow equation holds for all rows")
        else:
            self._fail(dataset, "DQ-08", f"{violations} rows where CFO+CFI+CFF ≠ Net Change in Cash")

    def check_dq09_url(self, df: pd.DataFrame, dataset: str) -> None:
        """DQ-09 URL Validation – url/website columns must start with http(s)://."""
        url_cols = [c for c in df.columns if "url" in c.lower() or "website" in c.lower()]
        if not url_cols:
            self._pass(dataset, "DQ-09", "No URL column found – skipped")
            return
        for col in url_cols:
            invalid = [v for v in df[col].dropna() if not self.URL_REGEX.match(str(v))]
            if not invalid:
                self._pass(dataset, "DQ-09", f"{col}: all URLs valid")
            else:
                self._fail(dataset, "DQ-09", f"{col}: {len(invalid)} invalid URLs")
                for v in invalid[:10]:
                    self._add_failure(dataset, col, "Invalid URL", v, "WARNING")

    def check_dq10_year_coverage(self, df: pd.DataFrame, dataset: str, min_years: int = 3) -> None:
        """DQ-10 Year Coverage – each company must have at least min_years of data."""
        if "company_id" not in df.columns or "year" not in df.columns:
            self._pass(dataset, "DQ-10", "Missing company_id/year – skipped")
            return
        coverage = df.groupby("company_id")["year"].nunique()
        insufficient = int((coverage < min_years).sum())
        if insufficient == 0:
            self._pass(dataset, "DQ-10", f"All companies have ≥{min_years} years of data")
        else:
            self._fail(dataset, "DQ-10", f"{insufficient} companies have <{min_years} years of data")

    def check_dq11_dividend(self, df: pd.DataFrame, dataset: str) -> None:
        """DQ-11 Dividend Validation – dividend yield must be between 0% and 50%."""
        div_cols = [c for c in df.columns if "dividend" in c.lower()]
        if not div_cols:
            self._pass(dataset, "DQ-11", "No dividend column found – skipped")
            return
        for col in div_cols:
            numeric = pd.to_numeric(df[col], errors="coerce").dropna()
            invalid = int(((numeric < 0) | (numeric > 0.50)).sum())
            if invalid == 0:
                self._pass(dataset, "DQ-11", f"{col}: all dividend values valid")
            else:
                self._fail(dataset, "DQ-11", f"{col}: {invalid} values outside [0%, 50%]")

    def check_dq12_tax_rate(self, df: pd.DataFrame, dataset: str) -> None:
        """DQ-12 Tax Rate Validation – effective tax rate must be between 0% and 60%."""
        tax_cols = [c for c in df.columns if "tax" in c.lower() and "rate" in c.lower()]
        if not tax_cols:
            self._pass(dataset, "DQ-12", "No tax rate column found – skipped")
            return
        for col in tax_cols:
            numeric = pd.to_numeric(df[col], errors="coerce").dropna()
            invalid = int(((numeric < 0) | (numeric > 0.60)).sum())
            if invalid == 0:
                self._pass(dataset, "DQ-12", f"{col}: all tax rates valid")
            else:
                self._fail(dataset, "DQ-12", f"{col}: {invalid} values outside [0%, 60%]")

    def check_dq13_market_cap(self, df: pd.DataFrame, dataset: str) -> None:
        """DQ-13 Market Cap Validation – market cap must be positive."""
        mcap_cols = [c for c in df.columns if "market_cap" in c.lower() or "mcap" in c.lower()]
        if not mcap_cols:
            self._pass(dataset, "DQ-13", "No market cap column found – skipped")
            return
        for col in mcap_cols:
            numeric = pd.to_numeric(df[col], errors="coerce").dropna()
            invalid = int((numeric <= 0).sum())
            if invalid == 0:
                self._pass(dataset, "DQ-13", f"{col}: all market cap values positive")
            else:
                self._fail(dataset, "DQ-13", f"{col}: {invalid} non-positive market cap values")

    def check_dq14_ticker(self, df: pd.DataFrame, dataset: str) -> None:
        """DQ-14 Ticker Validation – ticker symbols must match expected format."""
        ticker_cols = [c for c in df.columns if c.lower() in {"ticker", "symbol", "nse_symbol", "bse_symbol"}]
        if not ticker_cols:
            self._pass(dataset, "DQ-14", "No ticker column found – skipped")
            return
        for col in ticker_cols:
            invalid = [v for v in df[col].dropna() if not self.TICKER_REGEX.match(str(v).upper())]
            if not invalid:
                self._pass(dataset, "DQ-14", f"{col}: all tickers valid format")
            else:
                self._fail(dataset, "DQ-14", f"{col}: {len(invalid)} invalid ticker formats")
                for v in invalid[:10]:
                    self._add_failure(dataset, col, "Invalid Ticker", v, "WARNING")

    def check_dq15_missing_values(self, df: pd.DataFrame, dataset: str) -> None:
        """DQ-15 Missing Values – flag any column with nulls."""
        for col in df.columns:
            missing = int(df[col].isna().sum())
            if missing == 0:
                self._pass(dataset, "DQ-15", f"{col}: no missing values")
            else:
                self._fail(dataset, "DQ-15", f"{col}: {missing} missing values")
                self._add_failure(dataset, col, "Missing Values", "NULL", "WARNING")

    def check_dq16_duplicate_rows(self, df: pd.DataFrame, dataset: str) -> None:
        """DQ-16 Duplicate Records – flag fully duplicate rows."""
        dups = int(df.duplicated().sum())
        if dups == 0:
            self._pass(dataset, "DQ-16", "No duplicate rows")
        else:
            self._fail(dataset, "DQ-16", f"{dups} fully duplicate rows")

    # ------------------------------------------------------------------
    # Orchestrator
    # ------------------------------------------------------------------
    def run(
        self,
        df: pd.DataFrame,
        dataset: str,
        pk_col: Optional[str] = None,
        parent_ids: Optional[set] = None,
        fk_col: Optional[str] = None,
    ) -> None:
        """Run all applicable DQ rules against the given DataFrame."""
        self.check_dq01_pk_uniqueness(df, dataset, pk_col)
        self.check_dq02_company_year_uniqueness(df, dataset)
        if fk_col and parent_ids is not None:
            self.check_dq03_fk_integrity(df, dataset, fk_col, parent_ids)
        self.check_dq04_balance_sheet(df, dataset)
        self.check_dq05_opm(df, dataset)
        self.check_dq06_positive_sales(df, dataset)
        self.check_dq07_year(df, dataset)
        self.check_dq08_cashflow(df, dataset)
        self.check_dq09_url(df, dataset)
        self.check_dq10_year_coverage(df, dataset)
        self.check_dq11_dividend(df, dataset)
        self.check_dq12_tax_rate(df, dataset)
        self.check_dq13_market_cap(df, dataset)
        self.check_dq14_ticker(df, dataset)
        self.check_dq15_missing_values(df, dataset)
        self.check_dq16_duplicate_rows(df, dataset)

    # ------------------------------------------------------------------
    # Reporting
    # ------------------------------------------------------------------
    def get_report(self) -> pd.DataFrame:
        return pd.DataFrame(self.report)

    def get_failures(self) -> pd.DataFrame:
        return pd.DataFrame(self.failures)

    def summary(self) -> dict:
        report_df = self.get_report()
        if report_df.empty:
            return {"total": 0, "passed": 0, "failed": 0, "pass_rate": 0.0}
        total = len(report_df)
        passed = int((report_df["Status"] == "PASS").sum())
        failed = total - passed
        return {
            "total": total,
            "passed": passed,
            "failed": failed,
            "pass_rate": round(passed / total * 100, 1),
        }

    def export_reports(self, output_dir: Optional[Path] = None) -> None:
        if output_dir is None:
            project_root = Path(__file__).resolve().parents[2]
            output_dir = project_root / "reports"
        output_dir.mkdir(parents=True, exist_ok=True)
        self.get_report().to_csv(output_dir / "validation_report.csv", index=False)
        self.get_failures().to_csv(output_dir / "validation_failures.csv", index=False)
        print(f"Reports written to {output_dir}")
