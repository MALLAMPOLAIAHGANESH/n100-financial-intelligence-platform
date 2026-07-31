"use client";

import React from "react";
import { useTheme } from "@/context/ThemeContext";

export default function RiskAnalysisGauge() {
  const score = 42; // Moderate Risk score matching screenshot
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <div className="glass-card p-5 border border-slate-200 dark:border-white/10 flex flex-col justify-between h-full shadow-lg dark:shadow-xl transition-colors">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-bold text-slate-900 dark:text-white">Risk Analysis</h3>
        <span className="text-[10px] font-bold text-amber-700 dark:text-amber-400 px-2 py-0.5 rounded bg-amber-100 dark:bg-amber-500/10 border border-amber-300 dark:border-amber-500/20">
          Moderate Risk
        </span>
      </div>

      <div className="relative flex flex-col items-center justify-center my-2">
        {/* SVG Semi-Circle Gauge */}
        <svg viewBox="0 0 160 90" className="w-36 h-20">
          {/* Gauge Background Track */}
          <path
            d="M 20 80 A 60 60 0 0 1 140 80"
            fill="none"
            stroke={isDark ? "#1E293B" : "#E2E8F0"}
            strokeWidth="14"
            strokeLinecap="round"
          />
          {/* Gauge Colored Spectrum Fill */}
          <path
            d="M 20 80 A 60 60 0 0 1 75 22"
            fill="none"
            stroke="#22C55E"
            strokeWidth="14"
            strokeLinecap="round"
          />
          <path
            d="M 75 22 A 60 60 0 0 1 110 32"
            fill="none"
            stroke="#F59E0B"
            strokeWidth="14"
            strokeLinecap="round"
          />
          {/* Gauge Needle Pointer */}
          <line
            x1="80"
            y1="80"
            x2="60"
            y2="40"
            stroke={isDark ? "#FFFFFF" : "#0F172A"}
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          <circle cx="80" cy="80" r="6" fill={isDark ? "#FFFFFF" : "#0F172A"} />
        </svg>

        {/* Center Score Text */}
        <div className="text-center mt-1">
          <span className="text-2xl font-black text-slate-900 dark:text-white leading-none">{score}</span>
          <p className="text-[10px] text-slate-500 dark:text-gray-400 font-semibold uppercase tracking-wider">
            Risk Metric
          </p>
        </div>
      </div>

      <div className="flex justify-between text-[10px] text-slate-500 dark:text-gray-400 font-semibold pt-2 border-t border-slate-200 dark:border-white/5">
        <span>Low</span>
        <span className="text-amber-600 dark:text-amber-400 font-bold">Moderate</span>
        <span>High</span>
      </div>
    </div>
  );
}
