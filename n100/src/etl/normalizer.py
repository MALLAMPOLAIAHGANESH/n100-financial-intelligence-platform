import pandas as pd
import numpy as np


class DataNormalizer:

    @staticmethod
    def normalize_nulls(df: pd.DataFrame) -> pd.DataFrame:
        """
        Replace common null-like values with NaN.
        """
        df.replace(
            ["", "NA", "N/A", "NULL", "-", "--", "None"],
            np.nan,
            inplace=True
        )
        return df

    @staticmethod
    def normalize_year(df: pd.DataFrame) -> pd.DataFrame:
        """
        Convert year columns to nullable integer (Int64).
        Falls back to float if Int64 cast fails (Python 3.14 compat).
        """
        year_columns = [col for col in df.columns if "year" in col.lower()]
        for col in year_columns:
            numeric = pd.to_numeric(df[col], errors="coerce")
            try:
                df[col] = numeric.astype("Int64")
            except (TypeError, ValueError):
                df[col] = numeric  # keep as float64 if Int64 fails
        return df

    @staticmethod
    def normalize_ticker(df: pd.DataFrame) -> pd.DataFrame:
        """
        Standardize stock ticker symbols.
        """
        ticker_columns = [
            "ticker",
            "symbol",
            "stock_symbol",
            "nse_symbol",
            "bse_symbol"
        ]

        for col in ticker_columns:
            if col in df.columns:
                df[col] = (
                    df[col]
                    .fillna("")
                    .astype(str)
                    .str.upper()
                    .str.strip()
                )

        return df

    @staticmethod
    def normalize_currency(df: pd.DataFrame) -> pd.DataFrame:
        """
        Convert numeric financial columns.
        """
        for col in df.columns:

            if df[col].dtype == "object":

                sample = df[col].dropna().astype(str)

                if sample.empty:
                    continue

                if sample.str.contains(r"\d").mean() > 0.7:

                    df[col] = (
                        df[col]
                        .astype(str)
                        .str.replace(",", "", regex=False)
                        .str.replace("₹", "", regex=False)
                        .str.strip()
                    )

                    df[col] = pd.to_numeric(
                        df[col],
                        errors="coerce"
                    )

        return df

    @staticmethod
    def normalize_percentage(df: pd.DataFrame) -> pd.DataFrame:
        """
        Remove percentage signs.
        """
        for col in df.columns:

            if "%" in col.lower() or "ratio" in col.lower():

                df[col] = (
                    df[col]
                    .astype(str)
                    .str.replace("%", "", regex=False)
                )

                df[col] = pd.to_numeric(
                    df[col],
                    errors="coerce"
                )

        return df

    @staticmethod
    def normalize_text(df: pd.DataFrame) -> pd.DataFrame:
        """
        Clean text columns.
        """
        object_columns = df.select_dtypes(include="object").columns

        for col in object_columns:

            df[col] = (
                df[col]
                .fillna("")
                .astype(str)
                .str.strip()
            )

        return df

    @classmethod
    def normalize(cls, df: pd.DataFrame) -> pd.DataFrame:
        """
        Execute complete normalization pipeline.
        """
        df = cls.normalize_nulls(df)
        df = cls.normalize_year(df)
        df = cls.normalize_ticker(df)
        df = cls.normalize_currency(df)
        df = cls.normalize_percentage(df)
        df = cls.normalize_text(df)

        return df