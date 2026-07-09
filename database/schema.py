from sqlalchemy import Column, Float, String, Text
from src.database.db import Base


class Company(Base):
    __tablename__ = "companies"

    id = Column(String(30), primary_key=True, index=True)

    company_name = Column(String(255), nullable=False)

    company_logo = Column(Text)

    chart_link = Column(Text)

    about_company = Column(Text)

    website = Column(Text)

    nse_profile = Column(Text)

    bse_profile = Column(Text)

    face_value = Column(Float)

    book_value = Column(Float)

    roe_percentage = Column(Float)

    roce_percentage = Column(Float)