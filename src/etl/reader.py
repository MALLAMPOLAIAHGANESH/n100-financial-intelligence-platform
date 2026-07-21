import pandas as pd
from pathlib import Path

class ExcelReader:
    @staticmethod
    def read(file_path: Path):

        print(f"Reading {file_path.name}")
        
        # Raw datasets have a metadata banner in row 0, so skip it
        # Supporting datasets do not
        if file_path.parent.name == "raw":
            df = pd.read_excel(file_path, skiprows=1)
        else:
            df = pd.read_excel(file_path)
            
        return df