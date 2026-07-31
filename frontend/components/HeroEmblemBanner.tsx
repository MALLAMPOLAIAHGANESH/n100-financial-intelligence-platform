"use client";

import React from "react";
import Logo from "@/components/Logo";
import { useTheme } from "@/context/ThemeContext";

export default function HeroEmblemBanner() {
  const { theme } = useTheme();

  return (
    <div className="relative w-full rounded-3xl overflow-hidden border border-slate-200 dark:border-white/10 bg-gradient-to-br from-blue-50/50 via-white to-indigo-50/40 dark:from-[#070d19] dark:via-[#070d19] dark:to-[#0B1220] shadow-xl dark:shadow-2xl p-6 md:p-8 flex flex-col lg:flex-row items-center justify-between gap-8 group transition-colors">
      {/* Background Lighting & Grid Lines */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5 dark:from-blue-900/20 dark:to-purple-900/20 pointer-events-none" />
      <div className="absolute -right-20 -top-20 w-96 h-96 bg-blue-500/10 dark:bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />

      {/* Left Wall Panel: Embossed Metallic NIFTY100 Logo Emblem */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center py-6 px-4 text-center">
        <div className="transform transition-transform duration-700 group-hover:scale-105">
          <Logo variant="presentation" className="bg-transparent shadow-none p-0 !bg-transparent" theme={theme === "dark" ? "dark" : "light"} />
        </div>
      </div>

      {/* Right Wall Panel: Market Overview Panel */}
      <div className="relative z-10 w-full lg:w-80 bg-white/90 dark:bg-gray-900/80 backdrop-blur-xl border border-slate-200 dark:border-white/10 rounded-2xl p-5 space-y-4 shadow-lg">
        <div className="flex items-center justify-between border-b border-slate-200 dark:border-gray-800 pb-3">
          <h3 className="text-xs font-bold text-slate-700 dark:text-gray-300 uppercase tracking-wider">
            Market Overview
          </h3>
          <span className="text-[10px] text-blue-600 dark:text-blue-400 font-semibold cursor-pointer hover:underline">
            View All ↗
          </span>
        </div>

        {/* Market Cap */}
        <div className="space-y-1">
          <p className="text-[10px] font-medium text-slate-500 dark:text-gray-400">Market Cap</p>
          <div className="flex items-baseline justify-between">
            <span className="text-xl font-black text-slate-900 dark:text-white">₹235.8T</span>
            <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">+1.68%</span>
          </div>
          {/* Mini Sparkline Line SVG */}
          <div className="h-4 w-full">
            <svg className="w-full h-full stroke-emerald-500 fill-none" viewBox="0 0 100 20">
              <path d="M0,15 Q25,5 50,12 T100,2" strokeWidth="2" />
            </svg>
          </div>
        </div>

        {/* Nifty 100 */}
        <div className="space-y-1 pt-2 border-t border-slate-200 dark:border-gray-800/60">
          <p className="text-[10px] font-medium text-slate-500 dark:text-gray-400">Nifty 100 Index</p>
          <div className="flex items-baseline justify-between">
            <span className="text-xl font-black text-slate-900 dark:text-white">22,453.20</span>
            <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">+1.12%</span>
          </div>
          <div className="h-4 w-full">
            <svg className="w-full h-full stroke-blue-500 fill-none" viewBox="0 0 100 20">
              <path d="M0,18 Q30,10 60,14 T100,3" strokeWidth="2" />
            </svg>
          </div>
        </div>

        {/* Advances / Declines Bar */}
        <div className="pt-2 border-t border-slate-200 dark:border-gray-800/60 space-y-1.5">
          <div className="flex justify-between text-xs font-bold">
            <span className="text-slate-500 dark:text-gray-400">Advances / Declines</span>
            <span>
              <span className="text-emerald-600 dark:text-emerald-400">73</span> / <span className="text-rose-600 dark:text-rose-400">23</span>
            </span>
          </div>
          <div className="w-full h-2 rounded-full bg-slate-200 dark:bg-gray-800 overflow-hidden flex">
            <div className="h-full bg-emerald-500 rounded-l-full" style={{ width: "76%" }} />
            <div className="h-full bg-rose-500 rounded-r-full" style={{ width: "24%" }} />
          </div>
        </div>

        {/* High / Low Stats */}
        <div className="pt-2 border-t border-slate-200 dark:border-gray-800/60 grid grid-cols-3 gap-2 text-center text-[10px]">
          <div className="bg-slate-100 dark:bg-gray-800/40 p-1.5 rounded-lg border border-slate-200 dark:border-white/5">
            <p className="text-slate-500 dark:text-gray-400">52W High</p>
            <p className="font-bold text-slate-900 dark:text-white mt-0.5">22,800.15</p>
          </div>
          <div className="bg-slate-100 dark:bg-gray-800/40 p-1.5 rounded-lg border border-slate-200 dark:border-white/5">
            <p className="text-slate-500 dark:text-gray-400">52W Low</p>
            <p className="font-bold text-slate-900 dark:text-white mt-0.5">18,105.45</p>
          </div>
          <div className="bg-slate-100 dark:bg-gray-800/40 p-1.5 rounded-lg border border-slate-200 dark:border-white/5">
            <p className="text-slate-500 dark:text-gray-400">Market Status</p>
            <p className="font-bold text-emerald-600 dark:text-emerald-400 mt-0.5">Open</p>
          </div>
        </div>
      </div>
    </div>
  );
}
