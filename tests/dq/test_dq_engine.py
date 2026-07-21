"""
Unit tests for the full 16-rule DataQualityEngine.
Pure Python – no database required.
"""
from __future__ import annotations
import pytest
import pandas as pd
import sys, os

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "..", "..", "src"))

from etl.dq_engine import DataQualityEngine


# ---------------------------------------------------------------------------
# Helpers
# ---------------------------------------------------------------------------
def _engine() -> DataQualityEngine:
    return DataQualityEngine()


def _statuses(engine: DataQualityEngine, rule_id: str) -> list[str]:
    return [r["Status"] for r in engine.report if r["Rule ID"] == rule_id]


# ---------------------------------------------------------------------------
# DQ-01 Primary Key Uniqueness
# ---------------------------------------------------------------------------
class TestDQ01:
    def test_pass(self):
        df = pd.DataFrame({"id": [1, 2, 3], "val": ["a", "b", "c"]})
        e = _engine(); e.check_dq01_pk_uniqueness(df, "test")
        assert "PASS" in _statuses(e, "DQ-01")

    def test_fail_duplicate(self):
        df = pd.DataFrame({"id": [1, 1, 3]})
        e = _engine(); e.check_dq01_pk_uniqueness(df, "test")
        assert "FAIL" in _statuses(e, "DQ-01")

    def test_fail_null(self):
        df = pd.DataFrame({"id": [1, None, 3]})
        e = _engine(); e.check_dq01_pk_uniqueness(df, "test")
        assert "FAIL" in _statuses(e, "DQ-01")

    def test_no_pk_col(self):
        df = pd.DataFrame({"val": [1, 2, 3]})
        e = _engine(); e.check_dq01_pk_uniqueness(df, "test")
        assert "FAIL" in _statuses(e, "DQ-01")


# ---------------------------------------------------------------------------
# DQ-02 Company-Year Uniqueness
# ---------------------------------------------------------------------------
class TestDQ02:
    def test_pass(self):
        df = pd.DataFrame({"company_id": [1, 1, 2], "year": [2021, 2022, 2021]})
        e = _engine(); e.check_dq02_company_year_uniqueness(df, "test")
        assert "PASS" in _statuses(e, "DQ-02")

    def test_fail_duplicate_pair(self):
        df = pd.DataFrame({"company_id": [1, 1], "year": [2021, 2021]})
        e = _engine(); e.check_dq02_company_year_uniqueness(df, "test")
        assert "FAIL" in _statuses(e, "DQ-02")

    def test_missing_columns(self):
        df = pd.DataFrame({"company_id": [1, 2]})
        e = _engine(); e.check_dq02_company_year_uniqueness(df, "test")
        assert "FAIL" in _statuses(e, "DQ-02")


# ---------------------------------------------------------------------------
# DQ-03 Foreign Key Integrity
# ---------------------------------------------------------------------------
class TestDQ03:
    def test_pass(self):
        df = pd.DataFrame({"company_id": [1, 2, 3]})
        e = _engine(); e.check_dq03_fk_integrity(df, "test", "company_id", {1, 2, 3})
        assert "PASS" in _statuses(e, "DQ-03")

    def test_fail_orphan(self):
        df = pd.DataFrame({"company_id": [1, 99]})
        e = _engine(); e.check_dq03_fk_integrity(df, "test", "company_id", {1})
        assert "FAIL" in _statuses(e, "DQ-03")
        assert any(f["Value"] == "99" for f in e.failures)


# ---------------------------------------------------------------------------
# DQ-04 Balance Sheet Validation
# ---------------------------------------------------------------------------
class TestDQ04:
    def test_pass(self):
        df = pd.DataFrame({
            "total_assets": [1000.0],
            "total_liabilities": [600.0],
            "total_equity": [400.0],
        })
        e = _engine(); e.check_dq04_balance_sheet(df, "test")
        assert "PASS" in _statuses(e, "DQ-04")

    def test_fail_imbalanced(self):
        df = pd.DataFrame({
            "total_assets": [1000.0],
            "total_liabilities": [600.0],
            "total_equity": [300.0],   # sum = 900 ≠ 1000
        })
        e = _engine(); e.check_dq04_balance_sheet(df, "test")
        assert "FAIL" in _statuses(e, "DQ-04")


# ---------------------------------------------------------------------------
# DQ-05 OPM Validation
# ---------------------------------------------------------------------------
class TestDQ05:
    def test_pass(self):
        df = pd.DataFrame({"opm": [0.15, 0.22, 0.05]})
        e = _engine(); e.check_dq05_opm(df, "test")
        assert "PASS" in _statuses(e, "DQ-05")

    def test_fail_out_of_range(self):
        df = pd.DataFrame({"opm": [1.5, 0.2]})  # 150% is invalid
        e = _engine(); e.check_dq05_opm(df, "test")
        assert "FAIL" in _statuses(e, "DQ-05")

    def test_no_opm_col(self):
        df = pd.DataFrame({"revenue": [100]})
        e = _engine(); e.check_dq05_opm(df, "test")
        assert "PASS" in _statuses(e, "DQ-05")  # skipped = pass


# ---------------------------------------------------------------------------
# DQ-06 Positive Sales
# ---------------------------------------------------------------------------
class TestDQ06:
    def test_pass(self):
        df = pd.DataFrame({"revenue": [100, 200, 300]})
        e = _engine(); e.check_dq06_positive_sales(df, "test")
        assert "PASS" in _statuses(e, "DQ-06")

    def test_fail_zero(self):
        df = pd.DataFrame({"revenue": [0, 100]})
        e = _engine(); e.check_dq06_positive_sales(df, "test")
        assert "FAIL" in _statuses(e, "DQ-06")

    def test_fail_negative(self):
        df = pd.DataFrame({"sales": [-50, 100]})
        e = _engine(); e.check_dq06_positive_sales(df, "test")
        assert "FAIL" in _statuses(e, "DQ-06")


# ---------------------------------------------------------------------------
# DQ-07 Year Validation
# ---------------------------------------------------------------------------
class TestDQ07:
    def test_pass(self):
        df = pd.DataFrame({"year": [2018, 2020, 2023]})
        e = _engine(); e.check_dq07_year(df, "test")
        assert "PASS" in _statuses(e, "DQ-07")

    def test_fail_old_year(self):
        df = pd.DataFrame({"year": [1980, 2020]})
        e = _engine(); e.check_dq07_year(df, "test")
        assert "FAIL" in _statuses(e, "DQ-07")

    def test_fail_future_year(self):
        df = pd.DataFrame({"year": [2036, 2022]})
        e = _engine(); e.check_dq07_year(df, "test")
        assert "FAIL" in _statuses(e, "DQ-07")


# ---------------------------------------------------------------------------
# DQ-09 URL Validation
# ---------------------------------------------------------------------------
class TestDQ09:
    def test_pass(self):
        df = pd.DataFrame({"website": ["https://tcs.com", "http://infosys.com"]})
        e = _engine(); e.check_dq09_url(df, "test")
        assert "PASS" in _statuses(e, "DQ-09")

    def test_fail_invalid_url(self):
        df = pd.DataFrame({"website": ["tcs.com", "https://infosys.com"]})
        e = _engine(); e.check_dq09_url(df, "test")
        assert "FAIL" in _statuses(e, "DQ-09")


# ---------------------------------------------------------------------------
# DQ-14 Ticker Validation
# ---------------------------------------------------------------------------
class TestDQ14:
    def test_pass(self):
        df = pd.DataFrame({"ticker": ["TCS", "INFY", "RELIANCE"]})
        e = _engine(); e.check_dq14_ticker(df, "test")
        assert "PASS" in _statuses(e, "DQ-14")

    def test_fail_invalid_ticker(self):
        df = pd.DataFrame({"ticker": ["TCS", "invalid ticker!"]})
        e = _engine(); e.check_dq14_ticker(df, "test")
        assert "FAIL" in _statuses(e, "DQ-14")


# ---------------------------------------------------------------------------
# DQ-15 Missing Values
# ---------------------------------------------------------------------------
class TestDQ15:
    def test_pass_no_nulls(self):
        df = pd.DataFrame({"col1": [1, 2], "col2": ["a", "b"]})
        e = _engine(); e.check_dq15_missing_values(df, "test")
        assert all(s == "PASS" for s in _statuses(e, "DQ-15"))

    def test_fail_has_nulls(self):
        df = pd.DataFrame({"col1": [1, None], "col2": ["a", "b"]})
        e = _engine(); e.check_dq15_missing_values(df, "test")
        assert "FAIL" in _statuses(e, "DQ-15")


# ---------------------------------------------------------------------------
# DQ-16 Duplicate Rows
# ---------------------------------------------------------------------------
class TestDQ16:
    def test_pass(self):
        df = pd.DataFrame({"a": [1, 2, 3]})
        e = _engine(); e.check_dq16_duplicate_rows(df, "test")
        assert "PASS" in _statuses(e, "DQ-16")

    def test_fail(self):
        df = pd.DataFrame({"a": [1, 1, 2]})
        e = _engine(); e.check_dq16_duplicate_rows(df, "test")
        assert "FAIL" in _statuses(e, "DQ-16")


# ---------------------------------------------------------------------------
# Summary & Export
# ---------------------------------------------------------------------------
class TestSummary:
    def test_summary_counts(self):
        df = pd.DataFrame({"id": [1, 2], "val": ["a", "b"]})
        e = _engine()
        e.check_dq01_pk_uniqueness(df, "test")
        e.check_dq15_missing_values(df, "test")
        s = e.summary()
        assert s["total"] > 0
        assert s["passed"] + s["failed"] == s["total"]
        assert 0 <= s["pass_rate"] <= 100

    def test_get_report_is_dataframe(self):
        df = pd.DataFrame({"id": [1, 2]})
        e = _engine()
        e.check_dq01_pk_uniqueness(df, "test")
        assert isinstance(e.get_report(), pd.DataFrame)
