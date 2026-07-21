"""Unit tests for Leverage KPIs."""
from __future__ import annotations
import pytest
from analytics.Leverage import (
    debt_to_equity,
    net_debt,
    interest_coverage_ratio,
    high_leverage_flag,
    debt_free_label,
)


class TestDebtToEquity:
    def test_normal(self):
        assert debt_to_equity(500, 1000) == pytest.approx(0.5)

    def test_zero_equity(self):
        assert debt_to_equity(500, 0) is None

    def test_none_equity(self):
        assert debt_to_equity(500, None) is None

    def test_debt_free(self):
        assert debt_to_equity(0, 1000) == pytest.approx(0.0)

    def test_high_leverage(self):
        assert debt_to_equity(3000, 1000) == pytest.approx(3.0)


class TestNetDebt:
    def test_positive_net_debt(self):
        assert net_debt(1000, 200) == pytest.approx(800)

    def test_negative_net_debt(self):
        assert net_debt(200, 1000) == pytest.approx(-800)

    def test_both_none(self):
        assert net_debt(None, None) is None

    def test_zero_debt(self):
        assert net_debt(0, 500) == pytest.approx(-500)


class TestInterestCoverageRatio:
    def test_normal(self):
        assert interest_coverage_ratio(600, 100) == pytest.approx(6.0)

    def test_zero_interest(self):
        assert interest_coverage_ratio(600, 0) is None

    def test_negative_ebit(self):
        assert interest_coverage_ratio(-200, 100) == pytest.approx(-2.0)


class TestHighLeverageFlag:
    def test_above_threshold(self):
        assert high_leverage_flag(3.0) is True

    def test_below_threshold(self):
        assert high_leverage_flag(1.5) is False

    def test_exactly_at_threshold(self):
        assert high_leverage_flag(2.0) is False  # > not >=

    def test_none_ratio(self):
        assert high_leverage_flag(None) is False

    def test_custom_threshold(self):
        assert high_leverage_flag(1.5, threshold=1.0) is True


class TestDebtFreeLabel:
    def test_debt_free(self):
        assert debt_free_label(0) is True

    def test_has_debt(self):
        assert debt_free_label(500) is False

    def test_none(self):
        assert debt_free_label(None) is True
