"use client";

import React from "react";
import Sidebar from "@/components/layout/Sidebar";

export default function PortfolioPage() {
  return (
    <div className="min-h-screen bg-[#050816] text-gray-100 flex font-sans">
      <Sidebar />

      <main className="flex-1 p-6 space-y-6 overflow-y-auto max-h-screen scrollbar-thin">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
            <span>💼</span> Portfolio Analytics & Tracker
          </h1>
          <p className="text-xs text-gray-400">
            Track holdings, asset allocation, sector exposure, and risk metrics.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="glass-card p-5 border border-white/5">
            <p className="text-xs font-medium text-gray-400">Portfolio Value</p>
            <p className="text-2xl font-black text-white mt-1">₹12,45,000</p>
            <p className="text-xs font-bold text-emerald-400 mt-1">↑ +18.4% Total Return</p>
          </div>
          <div className="glass-card p-5 border border-white/5">
            <p className="text-xs font-medium text-gray-400">Day Gain</p>
            <p className="text-2xl font-black text-emerald-400 mt-1">₹14,250</p>
            <p className="text-xs font-bold text-emerald-400 mt-1">+1.15% Today</p>
          </div>
          <div className="glass-card p-5 border border-white/5">
            <p className="text-xs font-medium text-gray-400">Portfolio Beta</p>
            <p className="text-2xl font-black text-blue-400 mt-1">0.88</p>
            <p className="text-xs font-medium text-gray-400 mt-1">Low Volatility vs Nifty</p>
          </div>
        </div>
      </main>
    </div>
  );
}
