from sqlalchemy import Column, Float, ForeignKey, Integer, String
from sqlalchemy.orm import relationship

from src.database.base import Base


class ProfitLoss(Base):
    __tablename__ = "profit_loss"

    id = Column(Integer, primary_key=True, autoincrement=True)
    company_id = Column(String(50), ForeignKey("companies.company_id", ondelete="CASCADE"), nullable=False)
    year = Column(Integer)
    sales = Column(Float)
    operating_profit = Column(Float)
    net_profit = Column(Float)
    eps = Column(Float)

    # Relationships
    company = relationship("Company", back_populates="profit_loss")