"""
Generic CAGR engine with sign-aware behavior and flags.
CAGR formula: (end / start)^(1/years) - 1
Handle:
- zero start
- sign changes
- insufficient years
Returns dict with keys: value (float|None), flag (str|None)
"""
from __future__ import annotations
from typing import Optional, Dict
import math

def compute_cagr(start_value: float, end_value: float, years: int) -> Dict[str, Optional[float]]:
    """
    Returns:
    {
      "value": float (decimal, e.g., 0.05 => 5%) or None,
      "flag": one of ("insufficient_years", "zero_start", "sign_change", None)
    }
    """
    if years is None or years <= 0:
        return {"value": None, "flag": "insufficient_years"}
    if start_value is None or end_value is None:
        return {"value": None, "flag": "insufficient_data"}
    if start_value == 0:
        # can't compute multiplicative CAGR from zero base
        return {"value": None, "flag": "zero_start"}
    # sign change detection
    if (start_value < 0 and end_value >= 0) or (start_value >= 0 and end_value < 0):
        # handle separately: compute absolute growth and flag
        try:
            # approximate CAGR on absolute magnitudes but mark sign_change
            abs_start, abs_end = abs(start_value), abs(end_value)
            if abs_start == 0:
                return {"value": None, "flag": "zero_start"}
            val = (abs_end / abs_start) ** (1.0 / years) - 1.0
            return {"value": val, "flag": "sign_change"}
        except Exception:
            return {"value": None, "flag": "error"}
    # normal path (same sign, non-zero start)
    try:
        val = (end_value / start_value) ** (1.0 / years) - 1.0
        return {"value": val, "flag": None}
    except Exception:
        return {"value": None, "flag": "error"}