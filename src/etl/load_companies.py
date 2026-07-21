import sys
from pathlib import Path
import pandas as pd
from sqlalchemy import text

# Project root resolution
project_root = Path(__file__).resolve().parent.parent.parent
sys.path.append(str(project_root))

# Local imports
from src.config.column_mapping import COMPANIES_MAPPING
from src.etl.mapper import ColumnMapper
from src.etl.validator import DatasetValidator
from src.etl.normalizer import DataNormalizer
from src.etl.dq_engine import DataQualityEngine
from src.etl.writer import DatabaseWriter
from src.etl.load_audit import LoadAudit
from src.etl.logger import logger

def load_companies():
    logger.info("Starting Companies ETL Load...")
    table_name = "companies"

    # 1. Read companies.xlsx, skipping the header banner on row 0
    file_path = project_root / "data" / "raw" / "companies.xlsx"
    df = pd.read_excel(file_path, skiprows=1)
    logger.info(f"Read {len(df)} rows from {file_path.name}")

    # 2. Validate dataset
    validator = DatasetValidator(df)
    is_valid = validator.validate_dataset(table_name)
    logger.info(f"Dataset Valid: {is_valid}")

    if not is_valid:
        logger.error("Dataset validation failed. Please check validation_failures.csv.")
        return None

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
    logger.info("Data‑quality engine executed; reports generated.")

    # 6. Write to PostgreSQL
    DatabaseWriter.write(df, table_name)
    logger.info("Data written to PostgreSQL.")

    # 7. Load audit record
    LoadAudit.record_load(
        dataset=table_name,
        row_count=len(df),
        status="SUCCESS",
        details="ETL load completed without validation errors."
    )
    logger.info("Companies load completed.")
    return df

if __name__ == "__main__":
    load_companies()
