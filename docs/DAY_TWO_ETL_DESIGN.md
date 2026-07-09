# Day 2: ETL Pipeline & Database Architecture

## 1. Objective
The goal for Day 2 was to refactor the initial prototype codebase into a production-ready, standardized architecture. We focused on decoupling the Database ORM from the ETL logic, establishing a clean schema for the `companies` dataset, and building a modular, 5-stage Extract, Transform, Load (ETL) pipeline.

---

## 2. Project Architecture Overview

Our final project structure aligns with standard Python package guidelines to ensure modularity and prevent import errors (`ModuleNotFoundError`).

```text
nifty100-financial-intelligence-platform/
├── src/
│   ├── database/
│   │   ├── base.py              # Single Source of Truth for SQLAlchemy Base
│   │   ├── db.py                # Database configuration (engine, SessionLocal)
│   │   ├── create_tables.py     # Schema initialization script
│   │   └── models/              # SQLAlchemy ORM Models
│   │       ├── company.py
│   │       ├── profit_loss.py
│   │       ├── balance_sheet.py
│   │       └── cash_flow.py
│   │
│   └── etl/                     # 5-Stage Modular ETL Pipeline
│       ├── logger.py            # Global ETL logger
│       ├── reader.py            # (1) Extract
│       ├── validator.py         # (2) Validate
│       ├── transformer.py       # (3) Transform Schema
│       ├── normalizer.py        # (4) Normalize Content
│       ├── writer.py            # (5) Load
│       └── loader.py            # Orchestrator
```

---

## 3. Database Design Principles

To ensure scalability and consistency across the N100 platform:
1. **Centralized Base**: `src/database/base.py` acts as the single `declarative_base()`. All models import from this file to ensure they are bound to the same metadata registry.
2. **Separation of Concerns**: `src/database/db.py` handles **only** connection pooling (`create_engine`) and session management (`sessionmaker`). It is isolated from the models.
3. **Relational Integrity**: 
   - `companies` serves as the parent table (Primary Key: `company_id`).
   - `profit_loss`, `balance_sheet`, and `cash_flow` act as child tables with `ForeignKey("companies.company_id", ondelete="CASCADE")`.
   - Bidirectional SQLAlchemy `relationship` mappings are established for rapid object graph traversal.

---

## 4. ETL Pipeline Design

Our ETL engine is strictly object-oriented and sequence-based, ensuring data quality before it touches PostgreSQL.

### Stage 1: Extraction (`ExcelReader`)
- **Action**: Safely loads `.xlsx` files from `data/raw/` into Pandas DataFrames.
- **Fail-safe**: Verifies file existence to prevent arbitrary IO crashes.

### Stage 2: Validation (`DataValidator`)
- **Action**: Inspects the DataFrame for critical structural issues.
- **Rules**: Rejects empty datasets and detects duplicate column headers to prevent SQL injection or mapping collisions.

### Stage 3: Schema Transformation (`DataTransformer`)
- **Action**: Aligns the raw excel headers with the PostgreSQL Table Schema.
- **Rules**: 
  - Converts all column names to lowercase.
  - Replaces spaces and dashes with underscores (`snake_case`).
  - Automatically maps standard `id` columns to `company_id` to strictly adhere to foreign key constraints.

### Stage 4: Content Normalization (`DataNormalizer`)
- **Action**: Cleanses the actual cell values.
- **Rules**: 
  - Strips leading/trailing whitespaces from string columns.
  - Removes trailing newlines `\n` that break front-end UI rendering.
  - Drops completely empty rows (NaN).

### Stage 5: Loading (`DatabaseWriter`)
- **Action**: Inserts the scrubbed DataFrame into PostgreSQL.
- **Rules**: Uses Pandas `to_sql` coupled directly with our SQLAlchemy `engine`. Uses `if_exists="append"` and `method="multi"` for rapid batch inserts.

### The Orchestrator (`loader.py`)
Provides the execution runtime. It ties the steps together and uses the `ETL Logger` to record timestamps, row counts, and exceptions to `logs/etl.log`.

---

## 5. Execution

The entire pipeline is executed via the Python module system from the root directory:

**Initialize the Database:**
```bash
python -m src.database.create_tables
```

**Run the ETL Pipeline:**
```bash
python -m src.etl.loader
```
