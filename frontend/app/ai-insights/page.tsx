"use client";

import React from "react";
import Sidebar from "@/components/layout/Sidebar";

export default function AiInsightsPage() {
  return (
    <div className="min-h-screen bg-[#050816] text-gray-100 flex font-sans">
      <Sidebar />

      <main className="flex-1 p-6 space-y-6 overflow-y-auto max-h-screen scrollbar-thin">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
              <span>⚡</span> AI Financial Insights & Copilot
            </h1>
            <p className="text-xs text-gray-400">
              Automated financial report analysis, moat evaluations, and risk scoring across Nifty 100 stocks.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="glass-card p-6 border border-white/5 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-blue-400 uppercase tracking-wider">TCS AI Analysis</span>
              <span className="text-xs font-extrabold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">
                Score: 96/100
              </span>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between text-gray-300">
                <span>Business Model</span>
                <span className="font-bold text-white">Excellent</span>
              </div>
              <div className="flex justify-between text-gray-300">
                <span>Growth Rate</span>
                <span className="font-bold text-blue-400">Strong</span>
              </div>
              <div className="flex justify-between text-gray-300">
                <span>Debt Status</span>
                <span className="font-bold text-emerald-400">Very Low</span>
              </div>
              <div className="flex justify-between text-gray-300">
                <span>Cash Flow</span>
                <span className="font-bold text-emerald-400">Healthy</span>
              </div>
              <div className="flex justify-between text-gray-300">
                <span>Valuation Rating</span>
                <span className="font-bold text-amber-400">Fairly Priced</span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-blue-950/40 border border-blue-500/30 text-xs">
              <p className="font-bold text-blue-300 mb-1">AI Recommendation</p>
              <p className="text-gray-300">Long Term Growth Buy • Confidence 94%</p>
            </div>
          </div>

          <div className="glass-card p-6 border border-white/5 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-blue-400 uppercase tracking-wider">HDFCBANK AI Analysis</span>
              <span className="text-xs font-extrabold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">
                Score: 92/100
              </span>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between text-gray-300">
                <span>Business Model</span>
                <span className="font-bold text-white">Top Tier</span>
              </div>
              <div className="flex justify-between text-gray-300">
                <span>Growth Rate</span>
                <span className="font-bold text-blue-400">High</span>
              </div>
              <div className="flex justify-between text-gray-300">
                <span>NPA Quality</span>
                <span className="font-bold text-emerald-400">Low Risk</span>
              </div>
              <div className="flex justify-between text-gray-300">
                <span>Valuation Rating</span>
                <span className="font-bold text-emerald-400">Attractive</span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-xs">
              <p className="font-bold text-emerald-300 mb-1">AI Recommendation</p>
              <p className="text-gray-300">Strong Buy • Confidence 91%</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
