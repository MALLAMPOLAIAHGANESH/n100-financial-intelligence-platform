import pandas as pd
from src.etl.logger import logger

class DataNormalizer:
    @staticmethod
    def normalize(df: pd.DataFrame) -> pd.DataFrame:
        logger.info("Normalizing Dataset Content...")

        for column in df.columns:
            # Clean string columns
            if df[column].dtype == "object":
                df[column] = (
                    df[column]
                    .fillna("")
                    .astype(str)
                    .str.replace("\n", " ")
                    .str.strip()
                )
                
        # Optional: drop empty rows if they exist
        df = df.dropna(how='all')
        
        return df