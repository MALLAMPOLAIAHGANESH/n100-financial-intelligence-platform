"use client";

import React, { useState } from "react";
import Sidebar from "@/components/layout/Sidebar";

const screenerTabs = [
  "Basic",
  "Valuation",
  "Profitability",
  "Growth",
  "Cash Flow",
  "Technical",
  "Momentum",
  "Quality",
  "Dividend",
  "Custom",
];

const mockScreenerResults = [
  { ticker: "TCS", name: "Tata Consultancy Services", sector: "IT Services", pe: 28.45, roe: 34.21, mcap: "15,42,000", div: 1.15, cagr: 14.2, debt: 0.04 },
  { ticker: "INFY", name: "Infosys Ltd", sector: "IT Services", pe: 26.12, roe: 31.50, mcap: "6,05,000", div: 2.10, cagr: 12.8, debt: 0.08 },
  { ticker: "HDFCBANK", name: "HDFC Bank Ltd", sector: "Financial Services", pe: 19.80, roe: 17.40, mcap: "12,80,000", div: 1.20, cagr: 16.5, debt: 0.85 },
  { ticker: "RELIANCE", name: "Reliance Industries", sector: "Oil & Gas", pe: 24.30, roe: 9.80, mcap: "19,85,000", div: 0.35, cagr: 15.1, debt: 0.38 },
  { ticker: "ICICIBANK", name: "ICICI Bank Ltd", sector: "Financial Services", pe: 17.50, roe: 18.90, mcap: "8,65,000", div: 0.80, cagr: 18.4, debt: 0.72 },
  { ticker: "ITC", name: "ITC Ltd", sector: "FMCG", pe: 25.60, roe: 29.10, mcap: "6,10,000", div: 3.45, cagr: 11.2, debt: 0.01 },
];

export default function StockScreenerPage() {
  const [activeTab, setActiveTab] = useState("Profitability");
  const [minRoe, setMinRoe] = useState("15");
  const [maxPe, setMaxPe] = useState("30");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredResults = mockScreenerResults.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || item.ticker.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRoe = item.roe >= Number(minRoe || 0);
    const matchesPe = item.pe <= Number(maxPe || 999);
    return matchesSearch && matchesRoe && matchesPe;
  });

  return (
    <div className="min-h-screen bg-white dark:bg-[#050816] text-slate-900 dark:text-gray-100 flex font-sans transition-colors duration-300">
      <Sidebar />

      <main className="flex-1 p-6 space-y-6 overflow-y-auto max-h-screen scrollbar-thin">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
              <span>🔍</span> Stock Screener
            </h1>
            <p className="text-xs text-gray-400">
              Filter Nifty 100 stocks across custom multi-factor profitability and valuation models.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button className="px-3.5 py-1.5 rounded-xl bg-gray-900 border border-gray-800 text-xs font-semibold text-gray-300 hover:text-white transition-colors">
              Save Screen
            </button>
            <button className="px-4 py-1.5 rounded-xl gradient-bg text-xs font-bold text-white shadow-lg shadow-blue-500/20 hover:opacity-90 transition-all">
              Run Screener
            </button>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-1 border-b border-gray-800/80 pb-2 overflow-x-auto text-xs font-medium scrollbar-thin">
          {screenerTabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3.5 py-1.5 rounded-xl transition-all whitespace-nowrap ${
                activeTab === tab
                  ? "bg-blue-600 text-white font-bold shadow-sm"
                  : "text-gray-400 hover:text-gray-200"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Filter Builder Panel */}
        <div className="glass-card p-5 border border-white/5 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400">
              Active Criteria Builder (AND logic)
            </h3>
            <span className="text-[10px] text-blue-400 font-mono">Matched: {filteredResults.length} Companies</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <label className="text-[11px] font-semibold text-gray-300 block mb-1">
                Min ROE (%)
              </label>
              <input
                type="number"
                value={minRoe}
                onChange={(e) => setMinRoe(e.target.value)}
                className="w-full px-3 py-1.5 rounded-xl bg-gray-900 border border-gray-800 text-xs text-white focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="text-[11px] font-semibold text-gray-300 block mb-1">
                Max P/E Ratio
              </label>
              <input
                type="number"
                value={maxPe}
                onChange={(e) => setMaxPe(e.target.value)}
                className="w-full px-3 py-1.5 rounded-xl bg-gray-900 border border-gray-800 text-xs text-white focus:outline-none focus:border-blue-500"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="text-[11px] font-semibold text-gray-300 block mb-1">
                Quick Search Ticker / Sector
              </label>
              <input
                type="text"
                placeholder="Search TCS, INFY, Financials..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-3 py-1.5 rounded-xl bg-gray-900 border border-gray-800 text-xs text-white focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Results Table */}
        <div className="glass-card border border-white/5 overflow-hidden">
          <div className="p-4 border-b border-gray-800/80 flex items-center justify-between">
            <h3 className="text-sm font-bold text-white">Screener Results</h3>
            <button className="text-xs text-blue-400 font-semibold hover:text-blue-300">
              Export CSV ↓
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-gray-900/60 text-gray-400 uppercase font-semibold border-b border-gray-800/80">
                <tr>
                  <th className="p-3">Ticker</th>
                  <th className="p-3">Company</th>
                  <th className="p-3">Sector</th>
                  <th className="p-3">P/E</th>
                  <th className="p-3">ROE %</th>
                  <th className="p-3">Market Cap (Cr)</th>
                  <th className="p-3">Div Yield %</th>
                  <th className="p-3">3Y CAGR %</th>
                  <th className="p-3">D/E</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800/50 text-gray-200">
                {filteredResults.map((row) => (
                  <tr key={row.ticker} className="hover:bg-gray-800/30 transition-colors">
                    <td className="p-3 font-bold text-blue-400">{row.ticker}</td>
                    <td className="p-3 font-medium text-white">{row.name}</td>
                    <td className="p-3 text-gray-400">{row.sector}</td>
                    <td className="p-3 font-semibold">{row.pe}</td>
                    <td className="p-3 font-bold text-emerald-400">{row.roe}%</td>
                    <td className="p-3">₹{row.mcap}</td>
                    <td className="p-3 text-gray-300">{row.div}%</td>
                    <td className="p-3 font-semibold text-blue-300">{row.cagr}%</td>
                    <td className="p-3 text-gray-400">{row.debt}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
