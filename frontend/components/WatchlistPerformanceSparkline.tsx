"use client";

import React from "react";

export default function WatchlistPerformanceSparkline() {
  return (
    <div className="glass-card p-5 border border-slate-200 dark:border-white/10 flex flex-col justify-between h-full shadow-lg dark:shadow-xl transition-colors">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-bold text-slate-900 dark:text-white">Watchlist Performance</h3>
        <span className="text-[10px] font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-300 dark:border-emerald-500/20">
          +1.35% Today
        </span>
      </div>

      {/* Sparkline Chart */}
      <div className="w-full h-24 my-2 relative">
        <svg viewBox="0 0 200 60" className="w-full h-full stroke-blue-600 fill-none overflow-visible">
          <defs>
            <linearGradient id="watchlistGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#2563EB" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#2563EB" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path
            d="M 0,45 Q 30,50 60,30 T 120,35 T 180,15 L 200,10"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <path
            d="M 0,45 Q 30,50 60,30 T 120,35 T 180,15 L 200,10 L 200,60 L 0,60 Z"
            fill="url(#watchlistGradient)"
            stroke="none"
          />
        </svg>
      </div>

      <div className="flex justify-between text-[10px] text-slate-500 dark:text-gray-400 font-semibold pt-2 border-t border-slate-200 dark:border-white/5">
        <span>5 Stocks Tracked</span>
        <span className="text-blue-600 dark:text-blue-400 font-bold">View Watchlist ↗</span>
      </div>
    </div>
  );
}
