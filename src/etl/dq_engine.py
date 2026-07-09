import pandas as pd
from pathlib import Path

from src.etl.dq_rules import DQ_RULES


class DataQualityEngine:

    def __init__(self):
        self.report = []
        self.failures = []

    def add_result(self, dataset, rule_id, status, details):

        self.report.append({
            "Dataset": dataset,
            "Rule ID": rule_id,
            "Rule": DQ_RULES[rule_id]["name"],
            "Severity": DQ_RULES[rule_id]["severity"],
            "Status": status,
            "Details": details
        })

    def add_failure(self, dataset, column, rule, value, severity):

        self.failures.append({
            "Dataset": dataset,
            "Column": column,
            "Rule": rule,
            "Value": value,
            "Severity": severity
        })

    def run(self, df, dataset):

        # DQ-15 Missing Values
        for col in df.columns:

            missing = df[col].isna().sum()

            if missing == 0:

                self.add_result(
                    dataset,
                    "DQ-15",
                    "PASS",
                    f"{col}: No Missing Values"
                )

            else:

                self.add_result(
                    dataset,
                    "DQ-15",
                    "FAIL",
                    f"{col}: {missing} Missing Values"
                )

                self.add_failure(
                    dataset,
                    col,
                    "Missing Values",
                    "NULL",
                    "WARNING"
                )

        # DQ-16 Duplicate Rows

        duplicates = df.duplicated().sum()

        if duplicates == 0:

            self.add_result(
                dataset,
                "DQ-16",
                "PASS",
                "No Duplicate Rows"
            )

        else:

            self.add_result(
                dataset,
                "DQ-16",
                "FAIL",
                f"{duplicates} Duplicate Rows"
            )

    def export_reports(self):

        report = pd.DataFrame(self.report)

        failures = pd.DataFrame(self.failures)

        # Generate reports in the project root's reports directory
        # Using PROJECT_ROOT to ensure it goes to nifty100-financial-intelligence-platform/reports
        project_root = Path(__file__).resolve().parents[2]
        reports_path = project_root / "reports"

        reports_path.mkdir(exist_ok=True)

        report.to_csv(
            reports_path / "validation_report.csv",
            index=False
        )

        failures.to_csv(
            reports_path / "validation_failures.csv",
            index=False
        )

        print("Reports Generated Successfully")
