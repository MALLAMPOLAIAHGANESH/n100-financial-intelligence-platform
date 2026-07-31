"""
Seed script for Nifty 100 constituents & financial statement data.
Populates PostgreSQL tables:
- companies
- profit_loss
- balance_sheet
- cash_flow
"""
from __future__ import annotations

import logging
import sys
from pathlib import Path

PROJECT_ROOT = Path(__file__).resolve().parents[2]
sys.path.insert(0, str(PROJECT_ROOT))

from src.database.db import SessionLocal
from src.database.models import Company, ProfitLoss, BalanceSheet, CashFlow

logging.basicConfig(level=logging.INFO, format="%(asctime)s | %(levelname)s | %(message)s")
logger = logging.getLogger(__name__)

COMPANIES_SEED = [
    {
        "company_id": "RELIANCE",
        "company_name": "Reliance Industries Ltd",
        "about_company": "Reliance Industries Limited is an Indian multinational conglomerate headquartered in Mumbai.",
        "website": "https://www.ril.com",
        "face_value": 10.0,
        "book_value": 1120.5,
        "roe_percentage": 14.8,
        "roce_percentage": 16.2,
    },
    {
        "company_id": "TCS",
        "company_name": "Tata Consultancy Services Ltd",
        "about_company": "TCS is an Indian multinational information technology services and consulting company.",
        "website": "https://www.tcs.com",
        "face_value": 1.0,
        "book_value": 245.8,
        "roe_percentage": 34.2,
        "roce_percentage": 41.3,
    },
    {
        "company_id": "HDFCBANK",
        "company_name": "HDFC Bank Ltd",
        "about_company": "HDFC Bank Limited is an Indian banking and financial services company.",
        "website": "https://www.hdfcbank.com",
        "face_value": 1.0,
        "book_value": 480.2,
        "roe_percentage": 16.8,
        "roce_percentage": 18.5,
    },
    {
        "company_id": "INFY",
        "company_name": "Infosys Ltd",
        "about_company": "Infosys Limited is an Indian multinational information technology company providing business consulting, IT and outsourcing services.",
        "website": "https://www.infosys.com",
        "face_value": 5.0,
        "book_value": 210.4,
        "roe_percentage": 31.5,
        "roce_percentage": 38.4,
    },
    {
        "company_id": "ICICIBANK",
        "company_name": "ICICI Bank Ltd",
        "about_company": "ICICI Bank Limited is an Indian multinational bank and financial services company.",
        "website": "https://www.icicibank.com",
        "face_value": 2.0,
        "book_value": 315.6,
        "roe_percentage": 17.2,
        "roce_percentage": 19.1,
    },
    {
        "company_id": "LT",
        "company_name": "Larsen & Toubro Ltd",
        "about_company": "Larsen & Toubro Limited is an Indian multinational conglomerate involved in EPC projects, manufacturing, defence and services.",
        "website": "https://www.larsentoubro.com",
        "face_value": 2.0,
        "book_value": 640.1,
        "roe_percentage": 15.4,
        "roce_percentage": 17.8,
    },
    {
        "company_id": "SBIN",
        "company_name": "State Bank of India",
        "about_company": "State Bank of India is an Indian multinational public sector bank and financial services statutory body.",
        "website": "https://sbi.co.in",
        "face_value": 1.0,
        "book_value": 385.2,
        "roe_percentage": 18.1,
        "roce_percentage": 19.8,
    },
    {
        "company_id": "ITC",
        "company_name": "ITC Ltd",
        "about_company": "ITC Limited is an Indian conglomerate with diversified presence across FMCG, Hotels, Paperboards & Packaging, Agri Business and Information Technology.",
        "website": "https://www.itcportal.com",
        "face_value": 1.0,
        "book_value": 56.4,
        "roe_percentage": 28.9,
        "roce_percentage": 36.2,
    },
    {
        "company_id": "BHARTIARTL",
        "company_name": "Bharti Airtel Ltd",
        "about_company": "Bharti Airtel Limited is an Indian multinational telecommunications services company.",
        "website": "https://www.airtel.in",
        "face_value": 5.0,
        "book_value": 142.8,
        "roe_percentage": 13.5,
        "roce_percentage": 15.9,
    },
    {
        "company_id": "MARUTI",
        "company_name": "Maruti Suzuki India Ltd",
        "about_company": "Maruti Suzuki India Limited is an Indian automobile manufacturer, subsidiary of Japanese automaker Suzuki Motor Corporation.",
        "website": "https://www.marutisuzuki.com",
        "face_value": 5.0,
        "book_value": 1980.5,
        "roe_percentage": 14.1,
        "roce_percentage": 17.5,
    },
]


def seed_database():
    session = SessionLocal()
    try:
        logger.info("Seeding companies...")
        for c_data in COMPANIES_SEED:
            existing = session.query(Company).filter(Company.company_id == c_data["company_id"]).first()
            if not existing:
                company = Company(**c_data)
                session.add(company)
        session.commit()

        # Seed 3 years of financial statement data for each company
        logger.info("Seeding P&L, Balance Sheet, and Cash Flow financial records...")
        years = [2022, 2023, 2024]
        
        for c_data in COMPANIES_SEED:
            cid = c_data["company_id"]
            for idx, y in enumerate(years):
                base_sales = 50000.0 * (1 + idx * 0.12)
                
                # Profit & Loss
                if not session.query(ProfitLoss).filter(ProfitLoss.company_id == cid, ProfitLoss.year == y).first():
                    pl = ProfitLoss(
                        company_id=cid,
                        year=y,
                        sales=round(base_sales, 2),
                        operating_profit=round(base_sales * 0.22, 2),
                        net_profit=round(base_sales * 0.15, 2),
                        eps=round(45.0 + idx * 8.5, 2),
                    )
                    session.add(pl)

                # Balance Sheet
                if not session.query(BalanceSheet).filter(BalanceSheet.company_id == cid, BalanceSheet.year == y).first():
                    bs = BalanceSheet(
                        company_id=cid,
                        year=y,
                        equity=round(25000.0 + idx * 3000, 2),
                        reserves=round(35000.0 + idx * 4000, 2),
                        borrowings=round(12000.0 - idx * 1000, 2),
                        assets=round(80000.0 + idx * 8000, 2),
                        liabilities=round(20000.0 + idx * 1000, 2),
                    )
                    session.add(bs)

                # Cash Flow
                if not session.query(CashFlow).filter(CashFlow.company_id == cid, CashFlow.year == y).first():
                    cf = CashFlow(
                        company_id=cid,
                        year=y,
                        operating_cf=round(12000.0 + idx * 1500, 2),
                        investing_cf=round(-5000.0 - idx * 800, 2),
                        financing_cf=round(-3000.0 - idx * 500, 2),
                        net_cash_flow=round(4000.0 + idx * 200, 2),
                    )
                    session.add(cf)

        session.commit()
        logger.info("✅ Database seeding completed successfully.")
    except Exception as e:
        session.rollback()
        logger.error(f"❌ Database seeding failed: {e}")
        raise
    finally:
        session.close()


if __name__ == "__main__":
    seed_database()
