"""
ETL loader for the Companies dataset.
Reads companies.xlsx → validates → normalises → DQ checks → writes to PostgreSQL.
"""
from __future__ import annotations
import sys
from pathlib import Path
import pandas as pd
from sqlalchemy import text

# Project root on sys.path
PROJECT_ROOT = Path(__file__).resolve().parents[2]
if str(PROJECT_ROOT) not in sys.path:
    sys.path.insert(0, str(PROJECT_ROOT))

from src.config.column_mapping import COMPANIES_MAPPING
from src.etl.mapper import ColumnMapper
from src.etl.validator import DataValidator
from src.etl.normalizer import DataNormalizer
from src.etl.dq_engine import DataQualityEngine
from src.etl.writer import DatabaseWriter
from src.etl.load_audit import LoadAudit
from src.etl.logger import logger


def load_companies():
    logger.info("Starting Companies ETL Load...")
    table_name = "companies"

    # 1. Read – skip banner row
    file_path = PROJECT_ROOT / "data" / "raw" / "companies.xlsx"
    df = pd.read_excel(file_path, skiprows=1)
    logger.info(f"Read {len(df)} rows from {file_path.name}")

    # 2. Validate
    validator = DataValidator()
    try:
        df = validator.validate(df, table_name)
    except ValueError as exc:
        logger.error(f"Validation failed: {exc}")
        return None
    logger.info("Dataset validated.")

    # 3. Column mapping
    df = ColumnMapper.map_columns(df, COMPANIES_MAPPING)
    logger.info("Column mapping applied.")

    # 4. Normalisation
    df = DataNormalizer.normalize(df)
    logger.info("Data normalisation completed.")

    # 5. Data‑Quality checks
    dq_engine = DataQualityEngine()
    dq_engine.run(df, table_name)
    dq_engine.export_reports()
    summary = dq_engine.summary()
    logger.info(f"DQ complete – pass rate {summary['pass_rate']}%")

    # 6. Write to PostgreSQL
    DatabaseWriter.write(df, table_name)
    logger.info("Data written to PostgreSQL.")

    # 7. Audit record
    LoadAudit.record_load(
        dataset=table_name,
        row_count=len(df),
        status="SUCCESS",
        details=f"ETL load completed. DQ pass rate: {summary['pass_rate']}%",
    )
    logger.info("Companies ETL load complete.")
    return df


if __name__ == "__main__":
    load_companies()
