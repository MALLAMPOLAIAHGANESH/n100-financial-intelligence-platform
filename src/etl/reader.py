import pandas as pd
from pathlib import Path


class ExcelReader:

    @staticmethod
    def read(file_path: Path):

        print(f"Reading {file_path.name}")

        df = pd.read_excel(file_path)

        return df