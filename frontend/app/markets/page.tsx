"use client";

import React from "react";
import Sidebar from "@/components/layout/Sidebar";
import MarketHeatmap from "@/components/MarketHeatmap";
import NiftyIndexChart from "@/components/NiftyIndexChart";

export default function MarketsPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-[#050816] text-slate-900 dark:text-gray-100 flex font-sans transition-colors duration-300">
      <Sidebar />

      <main className="flex-1 p-6 space-y-6 overflow-y-auto max-h-screen scrollbar-thin">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
              <span>🌐</span> Market Overview
            </h1>
            <p className="text-xs text-gray-400">
              Macro-level view of Nifty 100 benchmark, sector breadth, and advance/decline distribution.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-6">
            <NiftyIndexChart />
          </div>
          <div className="lg:col-span-6">
            <MarketHeatmap />
          </div>
        </div>
      </main>
    </div>
  );
}
