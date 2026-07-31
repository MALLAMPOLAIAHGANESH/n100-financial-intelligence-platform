"""
conftest.py – project-wide pytest configuration.
Adds src/ to sys.path so tests can import analytics, etl, etc. directly.
"""
import sys
import os

# Insert src/ at the front of the module search path
src_path = os.path.join(os.path.dirname(__file__), "src")
if src_path not in sys.path:
    sys.path.insert(0, src_path)
