"""Unit tests for Efficiency KPIs."""
from __future__ import annotations
import pytest
from analytics.Efficiency import asset_turnover


class TestAssetTurnover:
    def test_normal(self):
        assert asset_turnover(2000, 1000) == pytest.approx(2.0)

    def test_zero_assets(self):
        assert asset_turnover(2000, 0) is None

    def test_none_assets(self):
        assert asset_turnover(2000, None) is None

    def test_low_turnover(self):
        assert asset_turnover(1000, 5000) == pytest.approx(0.2)

    def test_zero_revenue(self):
        assert asset_turnover(0, 1000) == pytest.approx(0.0)
