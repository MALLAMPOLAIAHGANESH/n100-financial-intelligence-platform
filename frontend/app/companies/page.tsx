"use client";

import React, { useState } from "react";
import Link from "next/link";
import Sidebar from "@/components/layout/Sidebar";

interface CompanyItem {
  ticker: string;
  name: string;
  sector: string;
  price: string;
  change: string;
  pe: number;
  roe: number;
  marketCap: string;
}

const mockCompanies: CompanyItem[] = [
  { ticker: "TCS", name: "Tata Consultancy Services", sector: "IT Services", price: "₹4,235.20", change: "+3.42%", pe: 28.45, roe: 34.21, marketCap: "₹15.42T" },
  { ticker: "INFY", name: "Infosys Ltd", sector: "IT Services", price: "₹1,455.10", change: "+2.11%", pe: 26.12, roe: 31.50, marketCap: "₹6.05T" },
  { ticker: "HDFCBANK", name: "HDFC Bank Ltd", sector: "Financial Services", price: "₹1,678.95", change: "+2.58%", pe: 19.80, roe: 17.40, marketCap: "₹12.80T" },
  { ticker: "RELIANCE", name: "Reliance Industries Ltd", sector: "Oil & Gas", price: "₹2,950.40", change: "+1.32%", pe: 24.30, roe: 9.80, marketCap: "₹19.85T" },
  { ticker: "ICICIBANK", name: "ICICI Bank Ltd", sector: "Financial Services", price: "₹1,234.80", change: "+1.89%", pe: 17.50, roe: 18.90, marketCap: "₹8.65T" },
  { ticker: "ITC", name: "ITC Ltd", sector: "FMCG", price: "₹485.60", change: "+0.45%", pe: 25.60, roe: 29.10, marketCap: "₹6.10T" },
  { ticker: "SBIN", name: "State Bank of India", sector: "Financial Services", price: "₹840.15", change: "-0.21%", pe: 10.40, roe: 16.80, marketCap: "₹7.50T" },
  { ticker: "LT", name: "Larsen & Toubro Ltd", sector: "Construction", price: "₹3,058.70", change: "+1.74%", pe: 31.20, roe: 15.60, marketCap: "₹4.20T" },
  { ticker: "BHARTIARTL", name: "Bharti Airtel Ltd", sector: "Telecom", price: "₹1,420.30", change: "+0.73%", pe: 42.10, roe: 12.40, marketCap: "₹8.10T" },
  { ticker: "AXISBANK", name: "Axis Bank Ltd", price: "₹1,180.50", sector: "Financial Services", change: "+1.25%", pe: 14.80, roe: 16.20, marketCap: "₹3.65T" },
];

export default function CompaniesDirectoryPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSector, setSelectedSector] = useState("All");

  const sectors = ["All", ...Array.from(new Set(mockCompanies.map((c) => c.sector)))];

  const filtered = mockCompanies.filter((c) => {
    const matchesSearch = c.name.toLowerCase().includes(searchQuery.toLowerCase()) || c.ticker.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSector = selectedSector === "All" || c.sector === selectedSector;
    return matchesSearch && matchesSector;
  });

  return (
    <div className="min-h-screen bg-white dark:bg-[#050816] text-slate-900 dark:text-gray-100 flex font-sans transition-colors duration-300">
      <Sidebar />

      <main className="flex-1 p-6 space-y-6 overflow-y-auto max-h-screen scrollbar-thin">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
              <span>🏢</span> Nifty 100 Companies Directory
            </h1>
            <p className="text-xs text-gray-400">
              Browse constituents with key valuation ratios, market caps, and performance metrics.
            </p>
          </div>

          <div className="w-full md:w-72 relative">
            <input
              type="text"
              placeholder="Search ticker or name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-4 py-2 rounded-xl bg-gray-900 border border-gray-800 text-xs text-white focus:outline-none focus:border-blue-500"
            />
            <span className="absolute left-2.5 top-2 text-gray-500 text-xs">🔍</span>
          </div>
        </div>

        {/* Sector Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-thin">
          {sectors.map((sec) => (
            <button
              key={sec}
              onClick={() => setSelectedSector(sec)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                selectedSector === sec
                  ? "bg-blue-600 text-white shadow-sm"
                  : "bg-gray-900 text-gray-400 border border-gray-800 hover:text-gray-200"
              }`}
            >
              {sec}
            </button>
          ))}
        </div>

        {/* Companies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((company) => (
            <Link
              key={company.ticker}
              href={`/company/${company.ticker}`}
              className="glass-card p-5 border border-white/5 glass-card-hover flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl gradient-bg flex items-center justify-center font-extrabold text-white text-sm">
                      {company.ticker.charAt(0)}
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-white leading-tight">{company.ticker}</h3>
                      <p className="text-[11px] text-gray-400 truncate max-w-[160px]">{company.name}</p>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">
                    {company.change}
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2 my-3 p-3 rounded-xl bg-gray-900/60 border border-gray-800/80 text-center text-xs">
                  <div>
                    <p className="text-[10px] text-gray-400">Price</p>
                    <p className="font-bold text-white mt-0.5">{company.price}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-400">P/E Ratio</p>
                    <p className="font-bold text-gray-200 mt-0.5">{company.pe}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-400">ROE %</p>
                    <p className="font-bold text-emerald-400 mt-0.5">{company.roe}%</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between text-[11px] text-gray-400 border-t border-gray-800/60 pt-3">
                <span className="bg-gray-800 px-2 py-0.5 rounded text-[10px] text-gray-300">
                  {company.sector}
                </span>
                <span className="font-semibold text-white">{company.marketCap}</span>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
