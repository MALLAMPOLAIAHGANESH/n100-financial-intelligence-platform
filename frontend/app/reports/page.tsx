"use client";

import React, { useState } from "react";
import Sidebar from "@/components/layout/Sidebar";
import Link from "next/link";

export default function ReportsPage() {
  const [activeCategory, setActiveCategory] = useState<"All" | "Earnings" | "Ratio Matrix" | "Audit Log">("All");
  const [searchQuery, setSearchQuery] = useState("");

  const reports = [
    {
      id: "q4-earnings",
      title: "Nifty 100 Q4 Earnings Teardown",
      category: "Earnings",
      date: "Q4 FY24",
      size: "2.4 KB CSV",
      description: "Sector-by-sector revenue, net profit, operating profit margin %, and YoY expansion metrics.",
      downloadPath: "/data/q4-earnings/nifty100_q4_earnings_summary.csv",
      format: "CSV",
      icon: "📰",
      badgeColor: "bg-blue-500/20 text-blue-300 border-blue-500/30",
    },
    {
      id: "ratio-matrix",
      title: "Master Financial Ratio Matrix (50+ Ratios)",
      category: "Ratio Matrix",
      date: "FY24 Full Year",
      size: "3.8 KB CSV",
      description: "Complete ratio dataset: ROE, ROCE, Debt/Equity, Interest Coverage, DuPont ROE, Altman Z-Score & Piotroski F-Score.",
      downloadPath: "/data/q4-earnings/nifty100_ratio_matrix_full.csv",
      format: "CSV",
      icon: "📊",
      badgeColor: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
    },
    {
      id: "dq-audit",
      title: "Data Quality & Ingestion Audit Report",
      category: "Audit Log",
      date: "Sprint 1 Validation",
      size: "1.9 KB CSV",
      description: "Audit compliance log across all 16 Data Quality rules (DQ-01 to DQ-16) with 100% pass status.",
      downloadPath: "/data/q4-earnings/data_quality_audit_summary.csv",
      format: "CSV",
      icon: "🛡️",
      badgeColor: "bg-purple-500/20 text-purple-300 border-purple-500/30",
    },
    {
      id: "it-moat",
      title: "IT Services Moat & Solvency Assessment",
      category: "Earnings",
      date: "Q4 FY24",
      size: "Institutional PDF",
      description: "Deep dive teardown of TCS, Infosys, and HCL Tech capital efficiency, free cash flow yield, and valuation metrics.",
      downloadPath: "/data/q4-earnings/nifty100_q4_earnings_summary.csv",
      format: "PDF",
      icon: "🏢",
      badgeColor: "bg-cyan-500/20 text-cyan-300 border-cyan-500/30",
    },
  ];

  const filteredReports = reports.filter((r) => {
    const matchesCategory = activeCategory === "All" || r.category === activeCategory;
    const matchesSearch = r.title.toLowerCase().includes(searchQuery.toLowerCase()) || r.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-white dark:bg-[#050816] text-slate-900 dark:text-gray-100 flex font-sans transition-colors duration-300">
      <Sidebar />

      <main className="flex-1 p-6 space-y-6 overflow-y-auto max-h-screen scrollbar-thin">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
              <span>📄</span> Reports & Dataset Download Center
            </h1>
            <p className="text-xs text-gray-400">
              Export institutional equity research summaries, ratio teardowns, raw CSV datasets, and audit reports.
            </p>
          </div>

          {/* Search Bar */}
          <div className="relative min-w-[240px]">
            <input
              type="text"
              placeholder="Search reports or datasets..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-gray-900/80 text-white text-xs px-3.5 py-2 rounded-xl border border-gray-800 focus:outline-none focus:border-blue-500 transition-colors"
            />
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-2 border-b border-gray-800 pb-2 overflow-x-auto text-xs font-medium">
          {(["All", "Earnings", "Ratio Matrix", "Audit Log"] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-xl transition-all ${
                activeCategory === cat
                  ? "bg-blue-600 text-white font-bold shadow-md shadow-blue-500/20"
                  : "text-gray-400 hover:text-gray-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Report Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredReports.map((report) => (
            <div
              key={report.id}
              className="glass-card p-6 border border-white/5 space-y-4 rounded-2xl bg-slate-900/60 backdrop-blur-md flex flex-col justify-between hover:border-blue-500/30 transition-all"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-2xl">{report.icon}</span>
                  <div className="flex items-center gap-2">
                    <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${report.badgeColor}`}>
                      {report.category}
                    </span>
                    <span className="text-[10px] font-bold text-gray-400 bg-gray-800 px-2 py-0.5 rounded">
                      {report.format}
                    </span>
                  </div>
                </div>

                <div>
                  <h3 className="text-base font-bold text-white leading-snug">{report.title}</h3>
                  <p className="text-xs text-gray-400 mt-1.5 leading-relaxed">{report.description}</p>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-800 flex items-center justify-between">
                <div className="text-[11px] text-gray-500 font-medium">
                  <span>{report.date}</span> • <span>{report.size}</span>
                </div>

                <a
                  href={report.downloadPath}
                  download
                  className="px-4 py-2 rounded-xl gradient-bg text-xs font-bold text-white shadow-md shadow-blue-500/20 hover:opacity-90 transition-all flex items-center gap-1.5"
                >
                  <span>⬇️</span> Download Raw Dataset
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Interactive Q4 Earnings Sample Preview Table */}
        <div className="glass-card p-6 border border-white/5 space-y-4 rounded-2xl bg-slate-900/60 backdrop-blur-md">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <span>🔍</span> Q4 Earnings Teardown Sample Preview
            </h3>
            <a
              href="/data/q4-earnings/nifty100_q4_earnings_summary.csv"
              download
              className="text-xs text-blue-400 font-bold hover:underline"
            >
              Export Full CSV Dataset →
            </a>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-gray-900/80 text-gray-400 uppercase font-semibold border-b border-gray-800">
                <tr>
                  <th className="p-3">Ticker</th>
                  <th className="p-3">Company Name</th>
                  <th className="p-3">Sector</th>
                  <th className="p-3 text-right">Q4 Revenue (Cr)</th>
                  <th className="p-3 text-right">Q4 Net Profit (Cr)</th>
                  <th className="p-3 text-right">OPM %</th>
                  <th className="p-3 text-right">YoY Growth %</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800/50 text-gray-200">
                <tr>
                  <td className="p-3 font-bold text-blue-400">RELIANCE</td>
                  <td className="p-3 font-medium">Reliance Industries Ltd</td>
                  <td className="p-3 text-gray-400">Energy & Petrochemicals</td>
                  <td className="p-3 text-right font-bold">₹2,36,533</td>
                  <td className="p-3 text-right font-bold text-emerald-400">₹18,951</td>
                  <td className="p-3 text-right font-bold text-sky-400">17.4%</td>
                  <td className="p-3 text-right font-bold text-emerald-400">+11.5%</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-blue-400">TCS</td>
                  <td className="p-3 font-medium">Tata Consultancy Services</td>
                  <td className="p-3 text-gray-400">IT Services</td>
                  <td className="p-3 text-right font-bold">₹61,237</td>
                  <td className="p-3 text-right font-bold text-emerald-400">₹12,434</td>
                  <td className="p-3 text-right font-bold text-sky-400">26.0%</td>
                  <td className="p-3 text-right font-bold text-emerald-400">+3.5%</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-blue-400">HDFCBANK</td>
                  <td className="p-3 font-medium">HDFC Bank Ltd</td>
                  <td className="p-3 text-gray-400">Financial Services</td>
                  <td className="p-3 text-right font-bold">₹89,620</td>
                  <td className="p-3 text-right font-bold text-emerald-400">₹16,511</td>
                  <td className="p-3 text-right font-bold text-sky-400">48.2%</td>
                  <td className="p-3 text-right font-bold text-emerald-400">+24.1%</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-blue-400">INFY</td>
                  <td className="p-3 font-medium">Infosys Limited</td>
                  <td className="p-3 text-gray-400">IT Services</td>
                  <td className="p-3 text-right font-bold">₹37,923</td>
                  <td className="p-3 text-right font-bold text-emerald-400">₹7,969</td>
                  <td className="p-3 text-right font-bold text-sky-400">21.1%</td>
                  <td className="p-3 text-right font-bold text-emerald-400">+1.2%</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
