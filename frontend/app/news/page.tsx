"use client";

import React from "react";
import Sidebar from "@/components/layout/Sidebar";

export default function NewsPage() {
  return (
    <div className="min-h-screen bg-[#050816] text-gray-100 flex font-sans">
      <Sidebar />

      <main className="flex-1 p-6 space-y-6 overflow-y-auto max-h-screen scrollbar-thin">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
            <span>📰</span> Live Financial News & Sentiment
          </h1>
          <p className="text-xs text-gray-400">
            AI-summarized financial news and market sentiment signals.
          </p>
        </div>

        <div className="space-y-4">
          <div className="glass-card p-5 border border-white/5 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-blue-400">IT Services Sector</span>
              <span className="text-gray-500 text-[10px]">10 mins ago</span>
            </div>
            <h3 className="text-sm font-bold text-white">TCS and Infosys Win Multi-Billion Dollar AI Cloud Transformation Deals in Europe</h3>
            <p className="text-xs text-gray-400">Demand for enterprise generative AI and cloud infrastructure modernization drives strong FY25 order book expansion.</p>
          </div>

          <div className="glass-card p-5 border border-white/5 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-emerald-400 font-mono">HDFCBANK</span>
              <span className="text-gray-500 text-[10px]">45 mins ago</span>
            </div>
            <h3 className="text-sm font-bold text-white">HDFC Bank Reports 18% YoY Net Profit Growth Led by Retail Credit Expansion</h3>
            <p className="text-xs text-gray-400">Asset quality remains resilient with Gross NPA dropping to 1.24%.</p>
          </div>
        </div>
      </main>
    </div>
  );
}
