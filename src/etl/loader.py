import sys
import time
from pathlib import Path
from sqlalchemy import text

# Dynamically add the project root to sys.path so direct script execution works
PROJECT_ROOT = Path(__file__).resolve().parents[2]
if str(PROJECT_ROOT) not in sys.path:
    sys.path.insert(0, str(PROJECT_ROOT))

from src.config.datasets import DATASETS
# Optionally import specific mappings if needed (since they matched, mapping is optional or identity)
from src.config.column_mapping import COMPANIES_MAPPING
from src.etl.reader import ExcelReader
from src.etl.validator import DataValidator
from src.etl.normalizer import DataNormalizer
from src.etl.transformer import DataTransformer
from src.etl.mapper import ColumnMapper
from src.etl.dq_engine import DataQualityEngine
from src.etl.writer import DatabaseWriter
from src.etl.load_audit import LoadAudit
from src.etl.logger import logger
from src.database.db import engine

RAW_DATA = PROJECT_ROOT / "data" / "raw"
SUPPORTING_DATA = PROJECT_ROOT / "data" / "supporting"

class ETLLoader:

    def __init__(self):
        self.loaded = 0
        self.failed = 0
        self.audit = LoadAudit()
        self.dq_engine = DataQualityEngine()

    def process_dataset(self, dataset_name, config):
        file_name = config["file"]
        table_name = config["table"]

        if file_name in [
            "financial_ratios.xlsx",
            "stock_prices.xlsx",
            "market_cap.xlsx",
            "peer_groups.xlsx",
            "sectors.xlsx"
        ]:
            file_path = SUPPORTING_DATA / file_name
        else:
            file_path = RAW_DATA / file_name

        print("=" * 70)
        print(f"Processing : {dataset_name}")
        
        start = time.time()

        try:
            # 1. Read
            df = ExcelReader.read(file_path)

            # 2. Validate
            validator = DataValidator()
            df = validator.validate(df, dataset_name)

            # 3. Normalize
            df = DataNormalizer.normalize(df)
            
            # 4. Transform (Standardizing id -> company_id etc.)
            df = DataTransformer.transform(df)

            # 5. Map Columns (No explicit mapping needed yet since they match, but included for completeness)
            if dataset_name == "companies":
                df = ColumnMapper.map_columns(df, COMPANIES_MAPPING)

            # 6. Data Quality Checks
            self.dq_engine.run(df, dataset_name)

            # 7. Write to PostgreSQL
            # Drop table to ensure schema is rebuilt correctly by pandas and eliminate bad columns
            with engine.begin() as conn:
                try:
                    conn.execute(text(f"DROP TABLE IF EXISTS {table_name} CASCADE;"))
                except:
                    pass
            DatabaseWriter.write(df, table_name)

            end = time.time()
            self.loaded += 1
            logger.info(f"{dataset_name} loaded successfully.")
            print(f"SUCCESS : {dataset_name}")

            self.audit.add_record(
                dataset=file_name,
                table=table_name,
                rows_read=len(df),
                rows_loaded=len(df),
                rows_rejected=0,
                status="SUCCESS",
                load_time=end - start
            )

        except Exception as e:
            end = time.time()
            self.failed += 1
            logger.exception(e)
            print(f"FAILED : {dataset_name}")
            print(e)

            self.audit.add_record(
                dataset=file_name,
                table=table_name,
                rows_read=0,
                rows_loaded=0,
                rows_rejected=0,
                status="FAILED",
                load_time=end - start
            )

    def run(self):
        print("=" * 70)
        print("N100 ETL PIPELINE")
        print("=" * 70)

        for dataset_name, config in DATASETS.items():
            self.process_dataset(dataset_name, config)

        print("=" * 70)
        print("ETL SUMMARY")
        print("=" * 70)
        print(f"Loaded : {self.loaded}")
        print(f"Failed : {self.failed}")
        
        # Export load audit
        self.audit.export()
        # Export validation reports and failures
        self.dq_engine.export_reports()


if __name__ == "__main__":
    loader = ETLLoader()
    loader.run()