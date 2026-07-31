"use client";

import React from "react";
import { useAuth } from "@/context/AuthContext";
import { useTheme } from "@/context/ThemeContext";

export default function DashboardHeader() {
  const { user } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const userName = user?.email ? user.email.split("@")[0] : "Ganesh P";

  return (
    <header className="sticky top-0 z-30 bg-white/90 dark:bg-[#050816]/90 backdrop-blur-xl border-b border-gray-200 dark:border-gray-800/80 px-6 py-3.5 flex items-center justify-between gap-4 transition-colors">
      {/* Search Input with ⌘K Badge */}
      <div className="relative flex-1 max-w-md">
        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-gray-500 text-xs">
          🔍
        </span>
        <input
          type="text"
          placeholder="Search for companies, stocks, sectors..."
          className="w-full pl-9 pr-14 py-2 rounded-xl bg-slate-100 dark:bg-gray-900/90 border border-slate-200 dark:border-gray-800 text-xs text-slate-900 dark:text-gray-200 placeholder-slate-400 dark:placeholder-gray-500 focus:outline-none focus:border-blue-600 transition-all shadow-inner"
        />
        <kbd className="absolute right-3 top-1/2 -translate-y-1/2 px-1.5 py-0.5 rounded bg-slate-200 dark:bg-gray-800 text-[10px] font-bold text-slate-600 dark:text-gray-400 border border-slate-300 dark:border-gray-700">
          ⌘ K
        </kbd>
      </div>

      {/* Right Stats & Quick Tools */}
      <div className="flex items-center gap-4 text-xs font-semibold">
        {/* Live Market Status */}
        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-[11px] font-bold">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
          <span>Market Open</span>
        </div>

        {/* NIFTY 100 Ticker Index Pill */}
        <div className="hidden md:flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-slate-100 dark:bg-gray-900 border border-slate-200 dark:border-gray-800 text-slate-800 dark:text-gray-300">
          <span className="text-slate-500 dark:text-gray-400 font-bold">NIFTY</span>
          <span className="text-slate-900 dark:text-white font-extrabold">22,453.20</span>
          <span className="text-emerald-600 dark:text-emerald-400 font-bold">+247.15 (1.12%)</span>
        </div>

        {/* Theme Toggle Button */}
        <button
          onClick={toggleTheme}
          title={`Switch to ${theme === "dark" ? "Light" : "Dark"} Mode`}
          className="p-2 rounded-xl bg-slate-100 dark:bg-gray-900 border border-slate-200 dark:border-gray-800 text-slate-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-white transition-all cursor-pointer shadow-sm"
        >
          {theme === "dark" ? "☀️" : "🌙"}
        </button>

        {/* User Profile Avatar */}
        <div className="flex items-center gap-2 pl-2 border-l border-slate-200 dark:border-gray-800">
          <div className="w-8 h-8 rounded-full gradient-bg p-0.5 flex items-center justify-center shadow-md">
            <div className="w-full h-full rounded-full bg-white dark:bg-gray-900 flex items-center justify-center font-bold text-slate-900 dark:text-white text-xs">
              {userName.charAt(0).toUpperCase()}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
