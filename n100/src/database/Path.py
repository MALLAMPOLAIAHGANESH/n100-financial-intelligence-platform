from pathlib import Path

base = Path("src/database")
models = base / "models"

models.mkdir(parents=True, exist_ok=True)

for file in [
    base / "__init__.py",
    base / "db.py",
    base / "base.py",
    base / "create_tables.py",
    models / "__init__.py",
    models / "company.py",
    models / "profit_loss.py",
    models / "balance_sheet.py",
    models / "cash_flow.py",
]:
    file.touch(exist_ok=True)