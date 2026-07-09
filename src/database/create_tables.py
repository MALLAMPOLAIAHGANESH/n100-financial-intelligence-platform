import logging

from src.database.base import Base
from src.database.db import engine

# Import all models to ensure they are registered with Base metadata
import src.database.models

logging.basicConfig(level=logging.INFO, format="%(asctime)s | %(message)s")

if __name__ == "__main__":
    logging.info("Starting Database Table Creation...")
    
    try:
        # Create all tables
        Base.metadata.create_all(bind=engine)
        logging.info("✅ Database tables created successfully.")
    except Exception as e:
        logging.error(f"❌ Failed to create tables: {e}")