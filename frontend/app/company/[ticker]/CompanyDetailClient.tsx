"use client";

import React, { useState, use } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import Sidebar from "@/components/layout/Sidebar";
import { companyApi } from "@/lib/api";
import ExportCsvButton from "@/components/ExportCsvButton";

const Plot = dynamic(() => import("react-plotly.js"), { ssr: false });

export default function CompanyDetailClient({ params }: { params: Promise<{ ticker: string }> }) {
  const resolvedParams = use(params);
  const ticker = resolvedParams.ticker || "TCS";
  const [activeTab, setActiveTab] = useState<"Overview" | "Financials" | "Ratios" | "Peers" | "Charts" | "News" | "Reports">("Overview");
  const [summaryMetric, setSummaryMetric] = useState<"Revenue" | "Net Profit" | "EBITDA" | "EPS">("Revenue");
  const [downloadingCsv, setDownloadingCsv] = useState(false);

  const handleExportCsv = async () => {
    try {
      setDownloadingCsv(true);
      await companyApi.exportCsv(ticker);
    } catch (err) {
      console.error(err);
    } finally {
      setDownloadingCsv(false);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-[#050816] text-slate-900 dark:text-gray-100 flex font-sans transition-colors duration-300">
      <Sidebar />

      <main className="flex-1 p-6 space-y-6 overflow-y-auto max-h-screen scrollbar-thin">
        {/* Breadcrumb & Navigation */}
        <div className="flex items-center justify-between text-xs text-gray-400">
          <div className="flex items-center gap-2">
            <Link href="/dashboard" className="hover:text-white transition-colors">
              Dashboard
            </Link>
            <span>/</span>
            <Link href="/companies" className="hover:text-white transition-colors">
              Companies
            </Link>
            <span>/</span>
            <span className="text-white font-bold">{ticker}</span>
          </div>

          <ExportCsvButton ticker={ticker} />
        </div>

        {/* Header Block */}
        <div className="glass-card p-6 border border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl gradient-bg flex items-center justify-center font-black text-white text-xl shadow-lg shadow-blue-500/20">
              {ticker.charAt(0)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-extrabold text-white">Tata Consultancy Services</h1>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 border border-blue-500/30">
                  {ticker}
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-gray-800 text-gray-400">
                  NSE
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300">
                  IT Services
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300">
                  Large Cap
                </span>
              </div>
              <div className="flex items-baseline gap-3 mt-2">
                <span className="text-2xl font-black text-white">₹4,235.20</span>
                <span className="text-xs font-bold text-emerald-400">
                  +140.10 (+3.42%)
                </span>
                <span className="text-[10px] text-gray-500">Market Open • 12 Aug, 3:30 PM IST</span>
              </div>
            </div>
          </div>

          <button className="px-4 py-2 rounded-xl gradient-bg text-xs font-bold text-white shadow-md shadow-blue-500/20 hover:opacity-90 transition-all self-start md:self-auto">
            + Add to Watchlist
          </button>
        </div>

        {/* Page Sub-Tabs */}
        <div className="flex items-center gap-2 border-b border-gray-800/80 pb-2 overflow-x-auto text-xs font-medium">
          {(["Overview", "Financials", "Ratios", "Peers", "Charts", "News", "Reports"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-xl transition-all ${
                activeTab === tab
                  ? "bg-blue-600 text-white shadow-sm font-bold"
                  : "text-gray-400 hover:text-gray-200"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Key Info Grid + Interactive Price Chart */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Key Information Panel */}
          <div className="lg:col-span-4 glass-card p-5 border border-white/5 space-y-3">
            <h3 className="text-sm font-bold text-white mb-3">Key Information</h3>
            <div className="space-y-2.5 text-xs">
              <div className="flex justify-between text-gray-400 border-b border-gray-800/40 pb-1.5">
                <span>Market Cap</span>
                <span className="font-bold text-white">₹15.42T</span>
              </div>
              <div className="flex justify-between text-gray-400 border-b border-gray-800/40 pb-1.5">
                <span>Enterprise Value</span>
                <span className="font-bold text-white">₹16.35T</span>
              </div>
              <div className="flex justify-between text-gray-400 border-b border-gray-800/40 pb-1.5">
                <span>P/E Ratio (TTM)</span>
                <span className="font-bold text-white">28.45</span>
              </div>
              <div className="flex justify-between text-gray-400 border-b border-gray-800/40 pb-1.5">
                <span>P/B Ratio</span>
                <span className="font-bold text-white">9.12</span>
              </div>
              <div className="flex justify-between text-gray-400 border-b border-gray-800/40 pb-1.5">
                <span>Dividend Yield</span>
                <span className="font-bold text-white">1.15%</span>
              </div>
              <div className="flex justify-between text-gray-400 border-b border-gray-800/40 pb-1.5">
                <span>ROE</span>
                <span className="font-bold text-emerald-400">34.21%</span>
              </div>
              <div className="flex justify-between text-gray-400 border-b border-gray-800/40 pb-1.5">
                <span>ROCE</span>
                <span className="font-bold text-emerald-400">41.35%</span>
              </div>
              <div className="flex justify-between text-gray-400 border-b border-gray-800/40 pb-1.5">
                <span>Face Value</span>
                <span className="font-bold text-white">₹1.00</span>
              </div>
              <div className="flex justify-between text-gray-400 border-b border-gray-800/40 pb-1.5">
                <span>52W High</span>
                <span className="font-bold text-emerald-400">₹4,381.00</span>
              </div>
              <div className="flex justify-between text-gray-400">
                <span>52W Low</span>
                <span className="font-bold text-rose-400">₹3,056.00</span>
              </div>
            </div>
          </div>

          {/* Interactive Price Chart */}
          <div className="lg:col-span-8 glass-card p-5 border border-white/5 flex flex-col justify-between">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-bold text-white">Price Chart</h3>
              <div className="flex items-center gap-1 bg-gray-900/90 p-1 rounded-xl border border-gray-800 text-[10px]">
                {["1D", "5D", "1M", "6M", "YTD", "1Y", "5Y", "All"].map((tf, idx) => (
                  <button
                    key={tf}
                    className={`px-2 py-0.5 rounded font-semibold ${
                      idx === 5 ? "bg-blue-600 text-white" : "text-gray-400"
                    }`}
                  >
                    {tf}
                  </button>
                ))}
              </div>
            </div>

            <div className="w-full h-72">
              <Plot
                data={[
                  {
                    x: ["Mar", "Apr", "May", "Jun", "Jul", "Aug"],
                    open: [3400, 3600, 3700, 3800, 4100, 4150],
                    high: [3550, 3750, 3850, 4000, 4300, 4381],
                    low: [3350, 3500, 3650, 3750, 4000, 4100],
                    close: [3500, 3700, 3780, 3950, 4200, 4235.2],
                    type: "candlestick",
                    xaxis: "x",
                    yaxis: "y",
                    increasing: { line: { color: "#22C55E" } },
                    decreasing: { line: { color: "#EF4444" } },
                  },
                ]}
                layout={{
                  autosize: true,
                  margin: { l: 35, r: 15, t: 10, b: 30 },
                  paper_bgcolor: "transparent",
                  plot_bgcolor: "transparent",
                  showlegend: false,
                  xaxis: { showgrid: false, color: "#64748B" },
                  yaxis: { showgrid: true, gridcolor: "rgba(255, 255, 255, 0.05)", color: "#64748B" },
                }}
                useResizeHandler={true}
                className="w-full h-full"
                config={{ displayModeBar: false, responsive: true }}
              />
            </div>
          </div>
        </div>

        {/* Bottom Grid: Financial Summary + Ratios + AI Score */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Financial Summary */}
          <div className="lg:col-span-4 glass-card p-5 border border-white/5 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-bold text-white">Financial Summary (Consolidated)</h3>
              </div>

              {/* Metric Selector Tabs */}
              <div className="flex items-center gap-1.5 mb-4">
                {(["Revenue", "Net Profit", "EBITDA", "EPS"] as const).map((m) => (
                  <button
                    key={m}
                    onClick={() => setSummaryMetric(m)}
                    className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                      summaryMetric === m
                        ? "bg-blue-600 text-white shadow-sm"
                        : "bg-gray-900 text-gray-400 border border-gray-800"
                    }`}
                  >
                    {m}
                  </button>
                ))}
              </div>

              {/* Bar Visual Chart */}
              <div className="h-44 w-full flex items-end justify-between gap-3 pt-6 border-b border-gray-800/80 pb-2">
                {[
                  { year: "2020", val: "1.57T", height: "55%" },
                  { year: "2021", val: "1.64T", height: "65%" },
                  { year: "2022", val: "1.91T", height: "78%" },
                  { year: "2023", val: "2.25T", height: "88%" },
                  { year: "2024", val: "2.40T", height: "96%" },
                ].map((item) => (
                  <div key={item.year} className="flex-1 flex flex-col items-center gap-2">
                    <span className="text-[10px] font-bold text-blue-300">{item.val}</span>
                    <div
                      className="w-full rounded-t-lg gradient-bg transition-all hover:opacity-80"
                      style={{ height: item.height }}
                    />
                    <span className="text-[10px] text-gray-400">{item.year}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Ratios Snapshot */}
          <div className="lg:col-span-4 glass-card p-5 border border-white/5 flex flex-col justify-between">
            <h3 className="text-sm font-bold text-white mb-3">Ratios Snapshot</h3>
            <div className="space-y-4">
              <div>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">Profitability</p>
                <div className="space-y-1.5 text-xs">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">ROE</span>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-white">34.21%</span>
                      <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400">Excellent</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">ROCE</span>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-white">41.35%</span>
                      <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400">Excellent</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Net Margin</span>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-white">24.53%</span>
                      <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400">Excellent</span>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">Valuation</p>
                <div className="space-y-1.5 text-xs">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">P/E Ratio</span>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-white">28.45</span>
                      <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-400">Fair</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">EV/EBITDA</span>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-white">18.32</span>
                      <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-400">Fair</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* AI Score & Investment Rating */}
          <div className="lg:col-span-4 glass-card p-5 border border-white/5 flex flex-col justify-between">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                <span>⚡</span> AI Company Rating
              </h3>
              <span className="text-xs font-bold text-blue-400">Confidence 94%</span>
            </div>

            <div className="flex items-center justify-between p-4 rounded-xl bg-blue-950/40 border border-blue-500/30">
              <div>
                <span className="text-3xl font-black text-white">96</span>
                <span className="text-xs text-gray-400"> /100</span>
                <p className="text-xs font-bold text-emerald-400 mt-0.5">★★★★★ Excellent</p>
              </div>
              <div className="text-right text-xs">
                <p className="text-gray-400">AI Recommendation</p>
                <p className="text-sm font-extrabold text-blue-400">Long Term Buy</p>
              </div>
            </div>

            <div className="space-y-2 text-xs mt-3">
              <div className="flex justify-between text-gray-300">
                <span>Business Quality</span>
                <span className="font-bold text-emerald-400">92%</span>
              </div>
              <div className="flex justify-between text-gray-300">
                <span>Financial Health</span>
                <span className="font-bold text-emerald-400">98%</span>
              </div>
              <div className="flex justify-between text-gray-300">
                <span>Growth Trajectory</span>
                <span className="font-bold text-blue-400">83%</span>
              </div>
              <div className="flex justify-between text-gray-300">
                <span>Moat Rating</span>
                <span className="font-bold text-amber-400">★★★★★ Strong</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
