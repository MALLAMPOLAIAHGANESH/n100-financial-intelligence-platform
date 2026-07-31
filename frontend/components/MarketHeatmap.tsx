"use client";

import React from "react";
import Link from "next/link";

interface HeatmapTile {
  ticker: string;
  change: number;
}

const heatmapData: HeatmapTile[] = [
  { ticker: "RELIANCE", change: 2.35 },
  { ticker: "HDFCBANK", change: 1.82 },
  { ticker: "ICICIBANK", change: 1.45 },
  { ticker: "INFY", change: 1.21 },
  { ticker: "TCS", change: 2.42 },
  { ticker: "SBIN", change: -0.45 },
  { ticker: "LT", change: 0.85 },
  { ticker: "AXISBANK", change: 1.12 },
  { ticker: "BHARTIARTL", change: 0.65 },
  { ticker: "MARUTI", change: -0.35 },
  { ticker: "ITC", change: 0.22 },
  { ticker: "ASIANPAINT", change: 0.18 },
];

export default function MarketHeatmap() {
  return (
    <div className="glass-card p-5 border border-slate-200 dark:border-white/10 flex flex-col justify-between h-full shadow-lg dark:shadow-xl transition-colors">
      <div className="flex items-center justify-between mb-3">
        <div>
          <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
            Market Heatmap
          </h3>
          <p className="text-xs text-slate-500 dark:text-gray-400">Nifty 100 Real-Time Stock Performance</p>
        </div>
        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 font-bold">
          Live Data
        </span>
      </div>

      {/* Grid Matrix (4 cols x 3 rows) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 my-auto">
        {heatmapData.map((tile) => {
          const isPositive = tile.change >= 0;
          const bgStyle = isPositive
            ? "bg-emerald-50 dark:bg-emerald-950/70 border-emerald-300 dark:border-emerald-500/50 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-100 dark:hover:bg-emerald-900/80 shadow-sm"
            : "bg-rose-50 dark:bg-rose-950/70 border-rose-300 dark:border-rose-500/50 text-rose-700 dark:text-rose-300 hover:bg-rose-100 dark:hover:bg-rose-900/80 shadow-sm";

          return (
            <Link
              key={tile.ticker}
              href={`/company/${tile.ticker}`}
              className={`p-3 rounded-xl border flex flex-col items-center justify-center transition-all cursor-pointer hover:scale-[1.03] ${bgStyle}`}
            >
              <span className="text-xs font-black tracking-wider text-slate-900 dark:text-white">
                {tile.ticker}
              </span>
              <span className="text-[11px] font-extrabold mt-1">
                {isPositive ? `+${tile.change}%` : `${tile.change}%`}
              </span>
            </Link>
          );
        })}
      </div>

      {/* Heatmap Spectrum Legend */}
      <div className="mt-4 pt-3 border-t border-slate-200 dark:border-gray-800/60 flex items-center justify-between text-[10px] text-slate-500 dark:text-gray-400 font-semibold">
        <span>Spectrum:</span>
        <div className="flex items-center gap-1.5 font-mono">
          <span className="w-3.5 h-2 rounded bg-rose-500 inline-block" />
          <span>-2%</span>
          <span className="w-3.5 h-2 rounded bg-rose-300 dark:bg-rose-900 inline-block" />
          <span>-1%</span>
          <span className="w-3.5 h-2 rounded bg-slate-300 dark:bg-gray-700 inline-block" />
          <span>0%</span>
          <span className="w-3.5 h-2 rounded bg-emerald-300 dark:bg-emerald-900 inline-block" />
          <span>+1%</span>
          <span className="w-3.5 h-2 rounded bg-emerald-500 inline-block" />
          <span>+2%</span>
        </div>
      </div>
    </div>
  );
}
