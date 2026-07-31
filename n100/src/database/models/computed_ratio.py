from sqlalchemy import Column, Float, Integer, String

from src.database.base import Base


class ComputedRatio(Base):
    __tablename__ = "computed_ratios"

    id = Column(Integer, primary_key=True, autoincrement=True)
    company_id = Column(String(50), nullable=False, index=True)
    company_name = Column(String(255))
    year = Column(Integer)
    roe_pct = Column(Float)
    roce_pct = Column(Float)
    roa_pct = Column(Float)
    net_profit_margin_pct = Column(Float)
    operating_profit_margin_pct = Column(Float)
    debt_to_equity = Column(Float)
    interest_coverage_ratio = Column(Float)
    net_debt = Column(Float)
    asset_turnover = Column(Float)
    high_leverage_flag = Column(String(10))
    debt_free_label = Column(String(50))
