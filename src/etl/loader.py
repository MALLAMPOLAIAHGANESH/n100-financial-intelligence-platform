import sys
import time
from pathlib import Path

# Dynamically add the project root to sys.path so direct script execution works
PROJECT_ROOT = Path(__file__).resolve().parents[2]
if str(PROJECT_ROOT) not in sys.path:
    sys.path.insert(0, str(PROJECT_ROOT))

from src.config.datasets import DATASETS
from src.etl.reader import ExcelReader
from src.etl.validator import DataValidator
from src.etl.normalizer import DataNormalizer
from src.etl.transformer import DataTransformer
from src.etl.writer import DatabaseWriter
from src.etl.load_audit import LoadAudit
from src.etl.logger import logger

RAW_DATA = PROJECT_ROOT / "data" / "raw"
SUPPORTING_DATA = PROJECT_ROOT / "data" / "supporting"


class ETLLoader:

    def __init__(self):
        self.loaded = 0
        self.failed = 0
        self.audit = LoadAudit()

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
            df = ExcelReader.read(file_path)

            validator = DataValidator()
            df = validator.validate(df, dataset_name)

            df = DataNormalizer.normalize(df)
            df = DataTransformer.transform(df)
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
        
        self.audit.export()


if __name__ == "__main__":
    loader = ETLLoader()
    loader.run()