import sys
from pathlib import Path

# Dynamically add the project root to sys.path so direct script execution works
PROJECT_ROOT = Path(__file__).resolve().parents[1]
if str(PROJECT_ROOT) not in sys.path:
    sys.path.insert(0, str(PROJECT_ROOT))

import pandas as pd
from src.etl.dq_engine import DataQualityEngine

DATA = PROJECT_ROOT / "data" / "raw"

file = DATA / "companies.xlsx"

df = pd.read_excel(file)

dq = DataQualityEngine()

dq.run(df, "companies")

dq.export_reports()

print("DQ Engine Executed Successfully")