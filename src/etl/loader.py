from pathlib import Path

from src.etl.reader import ExcelReader
from src.etl.validator import DataValidator
from src.etl.normalizer import DataNormalizer
from src.etl.transformer import DataTransformer
from src.etl.writer import DatabaseWriter
from src.etl.logger import logger

PROJECT_ROOT = Path(__file__).resolve().parents[2]
DATA_PATH = PROJECT_ROOT / "data" / "raw"

def run_etl(file_name: str, table_name: str):
    """Run the complete ETL pipeline."""
    file_path = DATA_PATH / file_name

    try:
        logger.info("=" * 60)
        logger.info(f"Starting ETL for {file_name}")

        # Step 1 - Read
        df = ExcelReader.read(file_path)

        # Step 2 - Validate
        df = DataValidator.validate(df)

        # Step 3 - Transform schema
        df = DataTransformer.transform(df)

        # Step 4 - Normalize data content
        df = DataNormalizer.normalize(df)

        # Step 5 - Load to database
        DatabaseWriter.write(df, table_name)

        logger.info(f"ETL completed successfully for {table_name}")
        print(f"\n✅ {table_name} loaded successfully!")

    except Exception as e:
        logger.exception("ETL Failed")
        print(f"\n❌ ETL Failed: {e}")

if __name__ == "__main__":
    run_etl(
        file_name="companies.xlsx",
        table_name="companies"
    )