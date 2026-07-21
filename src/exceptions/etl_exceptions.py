class ETLBaseError(Exception):
    """Base class for all ETL related exceptions."""

class DataValidationError(ETLBaseError):
    """Raised when data fails validation checks."""

class DatabaseWriteError(ETLBaseError):
    """Raised when a write to the database fails."""

class SchemaMismatchError(ETLBaseError):
    """Raised when input data does not match the expected schema contract."""

class ConfigurationError(ETLBaseError):
    """Raised when required configuration is missing or invalid."""
