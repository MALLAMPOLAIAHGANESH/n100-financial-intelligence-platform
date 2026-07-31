"use client";

import React from "react";

interface SectorItem {
  name: string;
  change: string;
  isPositive: boolean;
  pct: number;
  icon: string;
}

const sectors: SectorItem[] = [
  { name: "IT Services", change: "+2.35%", isPositive: true, pct: 85, icon: "💻" },
  { name: "Financial Services", change: "+1.82%", isPositive: true, pct: 70, icon: "🏦" },
  { name: "Automobile", change: "+1.45%", isPositive: true, pct: 60, icon: "🚗" },
  { name: "Pharma", change: "+0.85%", isPositive: true, pct: 45, icon: "💊" },
  { name: "FMCG", change: "+0.22%", isPositive: true, pct: 20, icon: "🛒" },
  { name: "Metals", change: "-0.35%", isPositive: false, pct: 15, icon: "⛓️" },
];

export default function SectorPerformance() {
  return (
    <div className="glass-card p-5 border border-slate-200 dark:border-white/10 flex flex-col justify-between h-full shadow-lg dark:shadow-xl transition-colors">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <span>📊</span> Sector Performance
        </h3>
        <span className="text-[10px] text-blue-600 dark:text-blue-400 font-semibold cursor-pointer hover:underline">
          View All
        </span>
      </div>

      <div className="space-y-3">
        {sectors.map((sec) => (
          <div key={sec.name} className="space-y-1">
            <div className="flex items-center justify-between text-xs font-semibold">
              <span className="text-slate-700 dark:text-gray-300 flex items-center gap-2">
                <span className="text-xs">{sec.icon}</span>
                <span>{sec.name}</span>
              </span>
              <span className={sec.isPositive ? "text-emerald-600 dark:text-emerald-400 font-bold" : "text-rose-600 dark:text-rose-400 font-bold"}>
                {sec.change}
              </span>
            </div>
            {/* Horizontal Bar Indicator */}
            <div className="w-full h-1.5 rounded-full bg-slate-100 dark:bg-gray-800/80 overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-500 ${
                  sec.isPositive ? "bg-emerald-500 shadow-sm shadow-emerald-500/30" : "bg-rose-500 shadow-sm shadow-rose-500/30"
                }`}
                style={{ width: `${sec.pct}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
