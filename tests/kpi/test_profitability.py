"""Unit tests for Profitability KPIs."""
from __future__ import annotations
import pytest
from analytics.Profitability import (
    net_profit_margin_pct,
    operating_profit_margin_pct,
    return_on_equity_pct,
    return_on_capital_employed_pct,
    return_on_assets_pct,
    opm_cross_check,
    safe_divide,
)


class TestSafeDivide:
    def test_normal(self):
        assert safe_divide(10, 4) == pytest.approx(2.5)

    def test_zero_denominator(self):
        assert safe_divide(10, 0) is None

    def test_none_denominator(self):
        assert safe_divide(10, None) is None

    def test_zero_numerator(self):
        assert safe_divide(0, 5) == pytest.approx(0.0)


class TestNetProfitMargin:
    def test_positive(self):
        assert net_profit_margin_pct(100, 1000) == pytest.approx(0.10)

    def test_negative_profit(self):
        assert net_profit_margin_pct(-50, 500) == pytest.approx(-0.10)

    def test_zero_revenue(self):
        assert net_profit_margin_pct(100, 0) is None

    def test_typical_12pct(self):
        assert net_profit_margin_pct(1200, 10000) == pytest.approx(0.12)


class TestOperatingProfitMargin:
    def test_positive(self):
        assert operating_profit_margin_pct(250, 1000) == pytest.approx(0.25)

    def test_zero_revenue(self):
        assert operating_profit_margin_pct(250, 0) is None

    def test_high_margin(self):
        assert operating_profit_margin_pct(500, 1000) == pytest.approx(0.50)


class TestROE:
    def test_positive(self):
        assert return_on_equity_pct(200, 1000) == pytest.approx(0.20)

    def test_zero_equity(self):
        assert return_on_equity_pct(200, 0) is None

    def test_none_equity(self):
        assert return_on_equity_pct(200, None) is None

    def test_negative_profit(self):
        assert return_on_equity_pct(-100, 500) == pytest.approx(-0.20)


class TestROCE:
    def test_positive(self):
        assert return_on_capital_employed_pct(300, 2000) == pytest.approx(0.15)

    def test_zero_capital(self):
        assert return_on_capital_employed_pct(300, 0) is None


class TestROA:
    def test_positive(self):
        assert return_on_assets_pct(100, 2000) == pytest.approx(0.05)

    def test_zero_assets(self):
        assert return_on_assets_pct(100, 0) is None


class TestOPMCrossCheck:
    def test_within_tolerance(self):
        ok, msg = opm_cross_check(0.25, 0.255, tolerance_pct=0.01)
        assert ok is True
        assert msg is None

    def test_outside_tolerance(self):
        ok, msg = opm_cross_check(0.25, 0.27, tolerance_pct=0.01)
        assert ok is False
        assert "exceeds" in msg.lower()

    def test_none_inputs(self):
        ok, msg = opm_cross_check(None, 0.25)
        assert ok is True
        assert msg is None

    def test_exact_match(self):
        ok, msg = opm_cross_check(0.30, 0.30)
        assert ok is True
