class ColumnMapper:

    @staticmethod
    def map_columns(df, mapping):
        df = df.rename(columns=mapping)
        return df
