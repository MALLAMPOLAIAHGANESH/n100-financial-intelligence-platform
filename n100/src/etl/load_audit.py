import pandas as pd
from pathlib import Path
from datetime import datetime

class LoadAudit:
    """Utility for persisting a simple audit log of ETL loads.

    The class maintains an in‑memory list of records and can export them to
    ``reports/load_audit.csv``. A convenience ``record_load`` static method is
    provided for the one‑off use case in ``load_companies.py``.
    """

    def __init__(self):
        self.records = []

    def add_record(
        self,
        dataset,
        table,
        rows_read,
        rows_loaded,
        rows_rejected,
        status,
        load_time
    ):

        self.records.append({

            "Dataset": dataset,

            "Table": table,

            "Rows Read": rows_read,

            "Rows Loaded": rows_loaded,

            "Rows Rejected": rows_rejected,

            "Status": status,

            "Load Time (sec)": round(load_time, 2)

        })

    def export(self):

        reports = Path("reports")

        reports.mkdir(exist_ok=True)

        df = pd.DataFrame(self.records)

        output = reports / "load_audit.csv"

        df.to_csv(output, index=False)

        print(f"\n✅ Load Audit Generated: {output}")

    @staticmethod
    def record_load(dataset: str, row_count: int, status: str, details: str) -> None:
        """Append a single audit entry to ``reports/load_audit.csv``.

        Parameters
        ----------
        dataset: str
            Name of the dataset / table loaded.
        row_count: int
            Number of rows written to the destination.
        status: str
            ``SUCCESS`` or ``FAILURE``.
        details: str
            Human‑readable description of the load outcome.
        """
        reports_path = Path(__file__).resolve().parents[2] / "reports"
        reports_path.mkdir(exist_ok=True)
        record = {
            "timestamp": datetime.utcnow().isoformat(),
            "dataset": dataset,
            "row_count": row_count,
            "status": status,
            "details": details,
        }
        # Load existing CSV if it exists, otherwise create new DataFrame
        csv_file = reports_path / "load_audit.csv"
        try:
            existing = pd.read_csv(csv_file)
            df = pd.concat([existing, pd.DataFrame([record])], ignore_index=True)
        except FileNotFoundError:
            df = pd.DataFrame([record])
        df.to_csv(csv_file, index=False)