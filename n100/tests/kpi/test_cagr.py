"""Unit tests for CAGR engine."""
from __future__ import annotations
import pytest
from analytics.cagr import compute_cagr


class TestComputeCAGR:
    def test_basic_10pct(self):
        # 100 → 121 in 2 years = 10% CAGR
        result = compute_cagr(100, 121, 2)
        assert result["flag"] is None
        assert result["value"] == pytest.approx(0.10, abs=1e-6)

    def test_zero_growth(self):
        result = compute_cagr(100, 100, 5)
        assert result["flag"] is None
        assert result["value"] == pytest.approx(0.0, abs=1e-9)

    def test_5yr_cagr(self):
        result = compute_cagr(1000, 1610.51, 5)
        assert result["flag"] is None
        assert result["value"] == pytest.approx(0.10, abs=1e-3)

    def test_zero_start(self):
        result = compute_cagr(0, 500, 3)
        assert result["flag"] == "zero_start"
        assert result["value"] is None

    def test_zero_years(self):
        result = compute_cagr(100, 200, 0)
        assert result["flag"] == "insufficient_years"

    def test_negative_years(self):
        result = compute_cagr(100, 200, -1)
        assert result["flag"] == "insufficient_years"

    def test_none_start(self):
        result = compute_cagr(None, 200, 5)
        assert result["flag"] == "insufficient_data"
        assert result["value"] is None

    def test_none_end(self):
        result = compute_cagr(100, None, 5)
        assert result["flag"] == "insufficient_data"

    def test_negative_to_positive(self):
        result = compute_cagr(-100, 200, 3)
        assert result["flag"] == "sign_change"
        assert result["value"] is not None

    def test_positive_to_negative(self):
        result = compute_cagr(100, -200, 3)
        assert result["flag"] == "sign_change"

    def test_both_negative(self):
        result = compute_cagr(-200, -100, 3)
        assert result["flag"] is None
        assert result["value"] is not None
