import time


import pandas as pd
from pathlib import Path


class LoadAudit:

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