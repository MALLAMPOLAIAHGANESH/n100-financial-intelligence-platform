import pandas as pd
from src.etl.logger import logger

class DataTransformer:
    @staticmethod
    def transform(df: pd.DataFrame) -> pd.DataFrame:
        logger.info("Transforming Dataset Columns...")

        # Convert column names to lowercase and replace spaces with underscores
        df.columns = (
            df.columns
            .str.lower()
            .str.replace(" ", "_")
            .str.replace("-", "_")
        )

        # Standardize 'id' to 'company_id' if present, to match our SQLAlchemy models
        if "id" in df.columns and "company_id" not in df.columns:
            df.rename(columns={"id": "company_id"}, inplace=True)
            logger.info("Renamed 'id' column to 'company_id' for model compatibility.")

        return df
