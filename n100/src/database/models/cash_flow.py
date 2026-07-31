from sqlalchemy import Column, Float, ForeignKey, Integer, String
from sqlalchemy.orm import relationship

from src.database.base import Base


class CashFlow(Base):
    __tablename__ = "cash_flow"

    id = Column(Integer, primary_key=True, autoincrement=True)
    company_id = Column(String(50), ForeignKey("companies.company_id", ondelete="CASCADE"), nullable=False)
    year = Column(Integer)
    operating_cf = Column(Float)
    investing_cf = Column(Float)
    financing_cf = Column(Float)
    net_cash_flow = Column(Float)

    # Relationships
    company = relationship("Company", back_populates="cash_flow")