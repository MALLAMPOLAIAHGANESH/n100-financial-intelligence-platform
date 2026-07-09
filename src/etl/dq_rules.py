"""
Data Quality Rules
N100 Financial Intelligence Platform
"""

DQ_RULES = {

    "DQ-01": {
        "name": "Primary Key Uniqueness",
        "severity": "CRITICAL"
    },

    "DQ-02": {
        "name": "Company-Year Uniqueness",
        "severity": "CRITICAL"
    },

    "DQ-03": {
        "name": "Foreign Key Integrity",
        "severity": "CRITICAL"
    },

    "DQ-04": {
        "name": "Balance Sheet Validation",
        "severity": "WARNING"
    },

    "DQ-05": {
        "name": "Operating Profit Margin Validation",
        "severity": "WARNING"
    },

    "DQ-06": {
        "name": "Positive Sales Validation",
        "severity": "WARNING"
    },

    "DQ-07": {
        "name": "Year Validation",
        "severity": "WARNING"
    },

    "DQ-08": {
        "name": "Cash Flow Validation",
        "severity": "WARNING"
    },

    "DQ-09": {
        "name": "URL Validation",
        "severity": "WARNING"
    },

    "DQ-10": {
        "name": "Year Coverage",
        "severity": "INFO"
    },

    "DQ-11": {
        "name": "Dividend Validation",
        "severity": "WARNING"
    },

    "DQ-12": {
        "name": "Tax Rate Validation",
        "severity": "WARNING"
    },

    "DQ-13": {
        "name": "Market Cap Validation",
        "severity": "WARNING"
    },

    "DQ-14": {
        "name": "Ticker Validation",
        "severity": "WARNING"
    },

    "DQ-15": {
        "name": "Missing Values",
        "severity": "WARNING"
    },

    "DQ-16": {
        "name": "Duplicate Records",
        "severity": "WARNING"
    }

}
