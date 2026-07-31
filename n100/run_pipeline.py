"""
Master pipeline script to execute:
1. Table Creation in PostgreSQL (financial_test_db)
2. Seed Nifty 100 constituents & financial statement data
3. Run Financial Ratio Engine to compute KPIs & store in computed_ratios table
"""
import sys
import logging
from pathlib import Path

PROJECT_ROOT = Path(__file__).resolve().parent
sys.path.insert(0, str(PROJECT_ROOT))

logging.basicConfig(level=logging.INFO, format="%(asctime)s | %(levelname)s | %(message)s")
logger = logging.getLogger("FINANCEL_PIPELINE")

if __name__ == "__main__":
    logger.info("==================================================")
    logger.info("🚀 STARTING FINANCEL DATABASE & ANALYTICS PIPELINE")
    logger.info("==================================================")

    # 1. Create Tables
    logger.info("\n--- STEP 1: Creating Database Tables ---")
    from src.database.base import Base
    from src.database.db import engine
    import src.database.models

    try:
        Base.metadata.create_all(bind=engine)
        logger.info("✅ Database tables created successfully.")
    except Exception as e:
        logger.error(f"❌ Failed to create tables: {e}")
        sys.exit(1)

    # 2. Seed Data
    logger.info("\n--- STEP 2: Seeding Nifty 100 Constituent Data ---")
    from src.database.seed_data import seed_database
    try:
        seed_database()
        logger.info("✅ Database seeding completed successfully.")
    except Exception as e:
        logger.error(f"❌ Failed to seed data: {e}")
        sys.exit(1)

    # 3. Ratio Engine Execution
    logger.info("\n--- STEP 3: Executing Financial Ratio Engine ---")
    from src.analytics.ratio_engine import run_ratio_engine
    try:
        df = run_ratio_engine()
        logger.info(f"✅ Financial Ratio Engine executed successfully! Computed {len(df)} ratio records.")
    except Exception as e:
        logger.error(f"❌ Ratio Engine execution failed: {e}")
        sys.exit(1)

    logger.info("\n==================================================")
    logger.info("🎉 PIPELINE COMPLETED SUCCESSFULLY!")
    logger.info("==================================================")
