"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import Sidebar from "@/components/layout/Sidebar";
import DashboardHeader from "@/components/DashboardHeader";
import HeroEmblemBanner from "@/components/HeroEmblemBanner";
import MarketCapDonut from "@/components/MarketCapDonut";
import SectorPerformance from "@/components/SectorPerformance";
import TopGainersList from "@/components/TopGainersList";
import NiftyIndexChart from "@/components/NiftyIndexChart";
import MarketHeatmap from "@/components/MarketHeatmap";
import AiMarketInsightCard from "@/components/AiMarketInsightCard";
import RiskAnalysisGauge from "@/components/RiskAnalysisGauge";
import WatchlistPerformanceSparkline from "@/components/WatchlistPerformanceSparkline";
import LatestNewsTicker from "@/components/LatestNewsTicker";

export default function DashboardPage() {
  const { user, token, loading: authLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!authLoading && !token) {
      router.push("/login");
    }
  }, [token, authLoading, router]);

  if (authLoading || !token) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-[#050816] text-slate-600 dark:text-gray-400">
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
          <span className="text-xs font-semibold">Loading Dashboard...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-[#050816] text-slate-900 dark:text-gray-100 flex font-sans transition-colors duration-300">
      {/* Sidebar Navigation */}
      <Sidebar />

      {/* Main Workspace Area */}
      <div className="flex-1 flex flex-col min-w-0 max-h-screen overflow-hidden">
        {/* Top Header Bar */}
        <DashboardHeader />

        {/* Scrollable Dashboard Body */}
        <main className="flex-1 p-6 space-y-6 overflow-y-auto scrollbar-thin bg-slate-50/50 dark:bg-transparent">
          {/* Hero Wall Emblem Banner */}
          <HeroEmblemBanner />

          {/* Top 6 KPI Cards Strip */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            <div className="glass-card p-4 border border-slate-200 dark:border-white/5 flex flex-col justify-between hover:border-blue-500/40 transition-all shadow-sm">
              <div className="flex items-center justify-between">
                <p className="text-[10px] font-bold text-slate-500 dark:text-gray-400 uppercase tracking-wider">Total Companies</p>
                <span className="p-1 rounded-md bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs">🏢</span>
              </div>
              <div className="mt-2">
                <p className="text-xl font-black text-slate-900 dark:text-white leading-none">92</p>
                <p className="text-[10px] font-semibold text-slate-500 dark:text-gray-400 mt-1">Active</p>
              </div>
            </div>

            <div className="glass-card p-4 border border-slate-200 dark:border-white/5 flex flex-col justify-between hover:border-purple-500/40 transition-all shadow-sm">
              <div className="flex items-center justify-between">
                <p className="text-[10px] font-bold text-slate-500 dark:text-gray-400 uppercase tracking-wider">Market Cap</p>
                <span className="p-1 rounded-md bg-purple-500/10 text-purple-600 dark:text-purple-400 text-xs">🌐</span>
              </div>
              <div className="mt-2">
                <p className="text-xl font-black text-slate-900 dark:text-white leading-none">₹235.8T</p>
                <p className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 mt-1">↑ 1.68%</p>
              </div>
            </div>

            <div className="glass-card p-4 border border-slate-200 dark:border-white/5 flex flex-col justify-between hover:border-emerald-500/40 transition-all shadow-sm">
              <div className="flex items-center justify-between">
                <p className="text-[10px] font-bold text-slate-500 dark:text-gray-400 uppercase tracking-wider">52W Highs</p>
                <span className="p-1 rounded-md bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs">📈</span>
              </div>
              <div className="mt-2">
                <p className="text-xl font-black text-emerald-600 dark:text-emerald-400 leading-none">18</p>
                <p className="text-[10px] font-semibold text-slate-500 dark:text-gray-400 mt-1">New Highs</p>
              </div>
            </div>

            <div className="glass-card p-4 border border-slate-200 dark:border-white/5 flex flex-col justify-between hover:border-rose-500/40 transition-all shadow-sm">
              <div className="flex items-center justify-between">
                <p className="text-[10px] font-bold text-slate-500 dark:text-gray-400 uppercase tracking-wider">52W Lows</p>
                <span className="p-1 rounded-md bg-rose-500/10 text-rose-600 dark:text-rose-400 text-xs">📉</span>
              </div>
              <div className="mt-2">
                <p className="text-xl font-black text-rose-600 dark:text-rose-400 leading-none">6</p>
                <p className="text-[10px] font-semibold text-slate-500 dark:text-gray-400 mt-1">New Lows</p>
              </div>
            </div>

            <div className="glass-card p-4 border border-slate-200 dark:border-white/5 flex flex-col justify-between hover:border-emerald-500/40 transition-all shadow-sm">
              <div className="flex items-center justify-between">
                <p className="text-[10px] font-bold text-slate-500 dark:text-gray-400 uppercase tracking-wider">Advances</p>
                <span className="p-1 rounded-md bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs">🟢</span>
              </div>
              <div className="mt-2">
                <p className="text-xl font-black text-emerald-600 dark:text-emerald-400 leading-none">73</p>
                <p className="text-[10px] font-semibold text-slate-500 dark:text-gray-400 mt-1">Advancing</p>
              </div>
            </div>

            <div className="glass-card p-4 border border-slate-200 dark:border-white/5 flex flex-col justify-between hover:border-rose-500/40 transition-all shadow-sm">
              <div className="flex items-center justify-between">
                <p className="text-[10px] font-bold text-slate-500 dark:text-gray-400 uppercase tracking-wider">Declines</p>
                <span className="p-1 rounded-md bg-rose-500/10 text-rose-600 dark:text-rose-400 text-xs">🔴</span>
              </div>
              <div className="mt-2">
                <p className="text-xl font-black text-rose-600 dark:text-rose-400 leading-none">23</p>
                <p className="text-[10px] font-semibold text-slate-500 dark:text-gray-400 mt-1">Declining</p>
              </div>
            </div>
          </div>

          {/* Main Chart + Heatmap Matrix */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
            <div className="lg:col-span-7">
              <NiftyIndexChart />
            </div>
            <div className="lg:col-span-5">
              <MarketHeatmap />
            </div>
          </div>

          {/* Middle Analytics Grid: Sector + Top Gainers + News */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-5">
            <div className="lg:col-span-4">
              <SectorPerformance />
            </div>
            <div className="lg:col-span-4">
              <TopGainersList />
            </div>
            <div className="lg:col-span-4">
              <LatestNewsTicker />
            </div>
          </div>

          {/* Bottom Grid: AI Insights + Donut + Risk Gauge + Watchlist */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-5">
            <div className="lg:col-span-3">
              <AiMarketInsightCard />
            </div>
            <div className="lg:col-span-3">
              <MarketCapDonut />
            </div>
            <div className="lg:col-span-3">
              <RiskAnalysisGauge />
            </div>
            <div className="lg:col-span-3">
              <WatchlistPerformanceSparkline />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
