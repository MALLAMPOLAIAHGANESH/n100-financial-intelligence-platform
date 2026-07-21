import re
import pandas as pd
from etl.dq_engine import DataQualityEngine

class DataValidator:

    def __init__(self):
        self.report = []
        self.failures = []

    def add_result(
        self,
        dataset,
        rule,
        severity,
        status,
        details
    ):
        self.report.append({
            "Dataset": dataset,
            "Rule": rule,
            "Severity": severity,
            "Status": status,
            "Details": details
        })

    def add_failure(
        self,
        dataset,
        column,
        rule,
        value,
        severity
    ):
        self.failures.append({
            "Dataset": dataset,
            "Column": column,
            "Rule": rule,
            "Value": value,
            "Severity": severity
        })

    def validate_empty(self, df, dataset):

        if df.empty:

            self.add_result(
                dataset,
                "DQ-00 Empty Dataset",
                "CRITICAL",
                "FAIL",
                "Dataset is empty"
            )

            raise ValueError("Dataset is empty")

        self.add_result(
            dataset,
            "DQ-00 Empty Dataset",
            "INFO",
            "PASS",
            "Dataset contains data"
        )

    def validate_duplicate_columns(
        self,
        df,
        dataset
    ):

        duplicates = df.columns[df.columns.duplicated()]

        if len(duplicates):

            self.add_result(
                dataset,
                "DQ-05 Duplicate Columns",
                "CRITICAL",
                "FAIL",
                ",".join(duplicates)
            )

        else:

            self.add_result(
                dataset,
                "DQ-05 Duplicate Columns",
                "INFO",
                "PASS",
                "No duplicate columns"
            )

    def validate_duplicate_rows(
        self,
        df,
        dataset
    ):

        dup = int(df.duplicated().sum())

        if dup:

            self.add_result(
                dataset,
                "DQ-04 Duplicate Rows",
                "WARNING",
                "FAIL",
                f"{dup} duplicates"
            )

        else:

            self.add_result(
                dataset,
                "DQ-04 Duplicate Rows",
                "INFO",
                "PASS",
                "No duplicate rows"
            )

    def validate_missing_values(
        self,
        df,
        dataset
    ):

        for col in df.columns:

            missing = int(df[col].isna().sum())

            if missing:

                self.add_result(
                    dataset,
                    "DQ-03 Missing Values",
                    "WARNING",
                    "FAIL",
                    f"{col}: {missing}"
                )

                self.add_failure(
                    dataset,
                    col,
                    "Missing Values",
                    "NULL",
                    "WARNING"
                )

    def validate_year(self, df, dataset):

        year_columns = [
            c for c in df.columns
            if "year" in c.lower()
        ]

        for col in year_columns:
            
            # Convert to numeric temporarily to safely check boundaries
            numeric_years = pd.to_numeric(df[col], errors="coerce")
            invalid = df[
                (numeric_years < 1990) |
                (numeric_years > 2035)
            ]

            if len(invalid):

                self.add_result(
                    dataset,
                    "DQ-06 Year Validation",
                    "WARNING",
                    "FAIL",
                    f"{len(invalid)} invalid years"
                )

    def validate_urls(self, df, dataset):

        url_columns = [
            c for c in df.columns
            if "url" in c.lower()
            or "website" in c.lower()
        ]

        regex = r"^(https?://)"

        for col in url_columns:

            for value in df[col].dropna():

                if not re.match(regex, str(value)):

                    self.add_failure(
                        dataset,
                        col,
                        "Invalid URL",
                        value,
                        "WARNING"
                    )

    def validate(
        self,
        df,
        dataset
    ):

        self.validate_empty(df, dataset)

        self.validate_duplicate_columns(df, dataset)

        self.validate_duplicate_rows(df, dataset)

        self.validate_missing_values(df, dataset)

        self.validate_year(df, dataset)

        self.validate_urls(df, dataset)

        return df

    def run_all(self, df: pd.DataFrame, dataset: str) -> DataQualityEngine:
        """Run both custom validator checks and the full DQ engine.

        Returns
        -------
        DataQualityEngine
            Engine containing combined DQ results.
        """
        # Run the existing validator checks
        _ = self.validate(df, dataset)
        # Run the comprehensive DQ engine
        engine = DataQualityEngine()
        engine.run(df, dataset)
        # Merge engine results into this validator's report structures
        self.report.extend(engine.report)
        self.failures.extend(engine.failures)
        return engine

    def get_report(self):

        return pd.DataFrame(self.report)

    def get_failures(self):

        return pd.DataFrame(self.failures)