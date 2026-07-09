class DataValidator:

    @staticmethod
    def validate(df):

        print("Running Validation...")

        if df.empty:
            raise ValueError("Dataset is empty.")

        df.columns = df.columns.str.strip()

        if df.columns.duplicated().any():
            raise ValueError("Duplicate columns detected.")

        print("Validation Passed")

        return df