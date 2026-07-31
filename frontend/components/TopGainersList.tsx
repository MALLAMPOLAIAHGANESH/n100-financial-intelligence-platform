"use client";

import React, { useState } from "react";
import Link from "next/link";

interface StockItem {
  ticker: string;
  change: string;
  isPositive: boolean;
}

const topGainers: StockItem[] = [
  { ticker: "TCS", change: "+2.42%", isPositive: true },
  { ticker: "HDFCBANK", change: "+2.05%", isPositive: true },
  { ticker: "INFY", change: "+1.82%", isPositive: true },
  { ticker: "ICICIBANK", change: "+1.45%", isPositive: true },
  { ticker: "LT", change: "+1.21%", isPositive: true },
];

const topLosers: StockItem[] = [
  { ticker: "SBIN", change: "-0.45%", isPositive: false },
  { ticker: "MARUTI", change: "-0.35%", isPositive: false },
  { ticker: "PNB", change: "-0.28%", isPositive: false },
  { ticker: "TATAMOTORS", change: "-0.22%", isPositive: false },
  { ticker: "INDUSINDBK", change: "-0.18%", isPositive: false },
];

export default function TopGainersList() {
  const [activeTab, setActiveTab] = useState<"Gainers" | "Losers">("Gainers");
  const list = activeTab === "Gainers" ? topGainers : topLosers;

  return (
    <div className="glass-card p-5 border border-slate-200 dark:border-white/10 flex flex-col justify-between h-full shadow-lg dark:shadow-xl transition-colors">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab("Gainers")}
            className={`text-xs font-bold transition-all px-2.5 py-1 rounded-lg cursor-pointer ${
              activeTab === "Gainers"
                ? "bg-emerald-100 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 border border-emerald-300 dark:border-emerald-500/30"
                : "text-slate-500 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            Top Gainers
          </button>
          <button
            onClick={() => setActiveTab("Losers")}
            className={`text-xs font-bold transition-all px-2.5 py-1 rounded-lg cursor-pointer ${
              activeTab === "Losers"
                ? "bg-rose-100 dark:bg-rose-500/20 text-rose-700 dark:text-rose-400 border border-rose-300 dark:border-rose-500/30"
                : "text-slate-500 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            Top Losers
          </button>
        </div>

        <Link href="/companies" className="text-[10px] text-blue-600 dark:text-blue-400 font-semibold hover:underline">
          View All
        </Link>
      </div>

      <div className="space-y-2">
        {list.map((stock) => (
          <Link
            key={stock.ticker}
            href={`/company/${stock.ticker}`}
            className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 dark:bg-gray-900/50 hover:bg-slate-100 dark:hover:bg-gray-800/60 border border-slate-200 dark:border-white/5 transition-all shadow-sm"
          >
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg gradient-bg flex items-center justify-center font-black text-white text-[10px]">
                {stock.ticker.charAt(0)}
              </div>
              <span className="text-xs font-bold text-slate-900 dark:text-white tracking-wide">{stock.ticker}</span>
            </div>
            <span
              className={`text-xs font-black ${
                stock.isPositive ? "text-emerald-600 dark:text-emerald-400" : "text-rose-600 dark:text-rose-400"
              }`}
            >
              {stock.change}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
