"use client";

import React from "react";
import Link from "next/link";

export default function AiMarketInsightCard() {
  return (
    <div className="glass-card p-5 border border-slate-200 dark:border-white/10 flex flex-col justify-between h-full bg-gradient-to-br from-blue-50/70 to-indigo-50/50 dark:from-blue-950/30 dark:to-indigo-950/20 shadow-lg dark:shadow-xl transition-colors">
      <div>
        <div className="flex items-center gap-2 mb-3">
          <span className="p-2 rounded-xl bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-500/30 text-sm animate-pulse">
            ⚡
          </span>
          <h3 className="text-sm font-bold text-slate-900 dark:text-white tracking-tight">AI Market Insight</h3>
        </div>
        <p className="text-xs text-slate-700 dark:text-gray-300 leading-relaxed font-medium">
          Market sentiment is bullish with strong momentum in IT and Financials. Watch for key resistance near <span className="text-blue-600 dark:text-blue-400 font-bold">22,600</span> levels.
        </p>
      </div>

      <div className="mt-4 pt-3 border-t border-slate-200 dark:border-white/5">
        <Link
          href="/ai-insights"
          className="w-full py-2 px-4 rounded-xl gradient-bg text-xs font-bold text-white shadow-lg shadow-blue-500/20 hover:opacity-90 transition-all flex items-center justify-center gap-2"
        >
          <span>View Full Insight</span>
          <span>→</span>
        </Link>
      </div>
    </div>
  );
}
