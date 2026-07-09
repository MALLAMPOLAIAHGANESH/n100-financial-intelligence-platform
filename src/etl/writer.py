import pandas as pd
from src.database.db import engine
from src.etl.logger import logger

class DatabaseWriter:
    @staticmethod
    def write(df: pd.DataFrame, table_name: str):
        logger.info(f"Loading data into PostgreSQL table: {table_name}")

        try:
            # We use if_exists='append' to add to our SQLAlchemy managed tables
            df.to_sql(
                name=table_name,
                con=engine,
                if_exists="append",
                index=False,
                method="multi",
            )
            logger.info(f"Successfully loaded {len(df)} rows into {table_name}.")
        except Exception as e:
            logger.error(f"Failed to load data into {table_name}: {e}")
            raise
