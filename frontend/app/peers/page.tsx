"use client";

import React from "react";
import Sidebar from "@/components/layout/Sidebar";

export default function PeersPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-[#050816] text-slate-900 dark:text-gray-100 flex font-sans transition-colors duration-300">
      <Sidebar />

      <main className="flex-1 p-6 space-y-6 overflow-y-auto max-h-screen scrollbar-thin">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
            <span>👥</span> Peer Comparison Engine
          </h1>
          <p className="text-xs text-gray-400">
            Compare financial ratios, valuation, growth, and margins across industry peers.
          </p>
        </div>

        <div className="glass-card p-6 border border-white/5 space-y-4">
          <h3 className="text-sm font-bold text-white">IT Services Peer Matrix (TCS vs INFY vs HCLTECH)</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-gray-900/60 text-gray-400 uppercase font-semibold border-b border-gray-800">
                <tr>
                  <th className="p-3">Metric</th>
                  <th className="p-3 text-blue-400 font-bold">TCS</th>
                  <th className="p-3 text-cyan-400 font-bold">Infosys</th>
                  <th className="p-3 text-indigo-400 font-bold">HCL Tech</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800/50 text-gray-200">
                <tr>
                  <td className="p-3 font-semibold text-gray-300">P/E Ratio</td>
                  <td className="p-3 font-bold">28.45</td>
                  <td className="p-3">26.12</td>
                  <td className="p-3">23.80</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-gray-300">ROE %</td>
                  <td className="p-3 font-bold text-emerald-400">34.21%</td>
                  <td className="p-3 text-emerald-400">31.50%</td>
                  <td className="p-3 text-emerald-400">28.90%</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-gray-300">Operating Margin %</td>
                  <td className="p-3 font-bold text-emerald-400">24.53%</td>
                  <td className="p-3">21.20%</td>
                  <td className="p-3">18.60%</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-gray-300">Market Cap (Cr)</td>
                  <td className="p-3 font-bold">₹15,42,000</td>
                  <td className="p-3">₹6,05,000</td>
                  <td className="p-3">₹4,20,000</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
