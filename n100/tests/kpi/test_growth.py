"""Unit tests for growth module (cagr_for_series)."""
from __future__ import annotations
import pytest
from analytics.growth import cagr_for_series


class TestCAGRForSeries:
    def _series(self):
        return {2018: 1000, 2019: 1100, 2020: 1210, 2021: 1331, 2022: 1464, 2023: 1611}

    def test_5yr_cagr(self):
        result = cagr_for_series(self._series(), anchor_year=2023, window_years=5)
        assert result["flag"] is None
        assert result["value"] == pytest.approx(0.10, abs=1e-2)

    def test_3yr_cagr(self):
        result = cagr_for_series(self._series(), anchor_year=2023, window_years=3)
        assert result["flag"] is None
        assert result["value"] == pytest.approx(0.10, abs=1e-2)

    def test_missing_start_year(self):
        result = cagr_for_series(self._series(), anchor_year=2023, window_years=10)
        assert result["flag"] == "insufficient_data"

    def test_missing_end_year(self):
        result = cagr_for_series(self._series(), anchor_year=2030, window_years=5)
        assert result["flag"] == "insufficient_data"

    def test_1yr_window(self):
        result = cagr_for_series(self._series(), anchor_year=2019, window_years=1)
        assert result["flag"] is None
        assert result["value"] == pytest.approx(0.10, abs=1e-4)
