from sqlalchemy import Column, Float, ForeignKey, Integer, String
from sqlalchemy.orm import relationship

from src.database.base import Base


class BalanceSheet(Base):
    __tablename__ = "balance_sheet"

    id = Column(Integer, primary_key=True, autoincrement=True)
    company_id = Column(String(50), ForeignKey("companies.company_id", ondelete="CASCADE"), nullable=False)
    year = Column(Integer)
    equity = Column(Float)
    reserves = Column(Float)
    borrowings = Column(Float)
    assets = Column(Float)
    liabilities = Column(Float)

    # Relationships
    company = relationship("Company", back_populates="balance_sheet")