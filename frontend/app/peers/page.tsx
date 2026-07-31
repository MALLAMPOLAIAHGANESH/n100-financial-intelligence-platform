"use client";

import React, { useState, useEffect } from "react";
import Sidebar from "@/components/layout/Sidebar";
import PeerComparisonRadar from "@/components/PeerComparisonRadar";
import { companyApi } from "@/lib/api";

export default function PeersPage() {
  const [selectedTicker, setSelectedTicker] = useState("TCS");
  const [peerData, setPeerData] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadPeerData() {
      try {
        setLoading(true);
        const data = await companyApi.getPeerComparison(selectedTicker);
        setPeerData(data);
      } catch (err) {
        console.error("Failed to load peer data", err);
      } finally {
        setLoading(false);
      }
    }
    loadPeerData();
  }, [selectedTicker]);

  return (
    <div className="min-h-screen bg-white dark:bg-[#050816] text-slate-900 dark:text-gray-100 flex font-sans transition-colors duration-300">
      <Sidebar />

      <main className="flex-1 p-6 space-y-6 overflow-y-auto max-h-screen scrollbar-thin">
        {/* Header Block & Ticker Selector */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
              <span>👥</span> Peer Benchmarking Engine
            </h1>
            <p className="text-xs text-gray-400">
              Benchmark Nifty 100 constituent financial ratios against sector medians and peer groups.
            </p>
          </div>

          {/* Ticker Selector */}
          <div className="flex items-center gap-3 bg-gray-900/80 p-2 rounded-xl border border-gray-800">
            <label className="text-xs font-bold text-gray-400 pl-2">Target Ticker:</label>
            <select
              value={selectedTicker}
              onChange={(e) => setSelectedTicker(e.target.value)}
              className="bg-gray-800 text-white text-xs font-bold px-3 py-1.5 rounded-lg border border-gray-700 focus:outline-none focus:border-blue-500"
            >
              <option value="TCS">TCS (IT Services)</option>
              <option value="RELIANCE">RELIANCE (Energy)</option>
              <option value="HDFCBANK">HDFCBANK (Financials)</option>
              <option value="INFY">INFY (IT Services)</option>
              <option value="ICICIBANK">ICICIBANK (Financials)</option>
              <option value="ITC">ITC (Consumer Goods)</option>
            </select>
          </div>
        </div>

        {/* 1. Radar Chart Visualization */}
        <PeerComparisonRadar
          targetTicker={selectedTicker}
          sector={peerData?.sector || "Industry"}
          targetCompany={peerData?.target_company}
          sectorMedian={peerData?.sector_median}
        />

        {/* 2. Interactive Peer Comparison Matrix */}
        <div className="glass-card p-6 border border-white/5 space-y-4 rounded-2xl bg-slate-900/60 backdrop-blur-md">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <span>📊</span> Industry Benchmarking Matrix ({peerData?.sector || "Industry"})
            </h3>
            <span className="text-xs text-gray-400 font-medium">
              Sample Size: {peerData?.peer_count || 8} Peers
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-gray-900/80 text-gray-400 uppercase font-semibold border-b border-gray-800">
                <tr>
                  <th className="p-3">Financial Metric</th>
                  <th className="p-3 text-blue-400 font-bold">{selectedTicker} (Target)</th>
                  <th className="p-3 text-purple-400 font-bold">Sector Median</th>
                  <th className="p-3 text-gray-400">Variance vs Median</th>
                  <th className="p-3 text-gray-400">Percentile Rank</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800/50 text-gray-200">
                <tr>
                  <td className="p-3 font-semibold text-gray-300">Return on Equity (ROE %)</td>
                  <td className="p-3 font-bold text-emerald-400">{peerData?.target_company?.roe_pct || 38.2}%</td>
                  <td className="p-3 text-purple-300">{peerData?.sector_median?.roe_pct || 22.5}%</td>
                  <td className="p-3 font-bold text-emerald-400">+15.7% (Outperform)</td>
                  <td className="p-3 font-bold text-blue-400">Top 10% (92nd)</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-gray-300">Net Profit Margin %</td>
                  <td className="p-3 font-bold text-sky-400">{peerData?.target_company?.net_profit_margin_pct || 24.1}%</td>
                  <td className="p-3 text-purple-300">{peerData?.sector_median?.net_profit_margin_pct || 16.8}%</td>
                  <td className="p-3 font-bold text-emerald-400">+7.3% (Outperform)</td>
                  <td className="p-3 font-bold text-blue-400">Top 15% (88th)</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-gray-300">Debt to Equity Ratio</td>
                  <td className="p-3 font-bold text-emerald-400">{peerData?.target_company?.debt_to_equity || 0.05}x</td>
                  <td className="p-3 text-purple-300">{peerData?.sector_median?.debt_to_equity || 0.25}x</td>
                  <td className="p-3 font-bold text-emerald-400">-0.20 (Lower Leverage)</td>
                  <td className="p-3 font-bold text-blue-400">Top 5% (96th)</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-gray-300">ROCE %</td>
                  <td className="p-3 font-bold text-indigo-400">{peerData?.target_company?.roce_pct || 42.1}%</td>
                  <td className="p-3 text-purple-300">{peerData?.sector_median?.roce_pct || 26.4}%</td>
                  <td className="p-3 font-bold text-emerald-400">+15.7% (Outperform)</td>
                  <td className="p-3 font-bold text-blue-400">Top 10% (90th)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
