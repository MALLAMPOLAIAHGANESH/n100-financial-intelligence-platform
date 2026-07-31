"use client";

import React from "react";
import Sidebar from "@/components/layout/Sidebar";

export default function AlertsPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-[#050816] text-slate-900 dark:text-gray-100 flex font-sans transition-colors duration-300">
      <Sidebar />

      <main className="flex-1 p-6 space-y-6 overflow-y-auto max-h-screen scrollbar-thin">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
            <span>🔔</span> Real-Time Financial Alerts
          </h1>
          <p className="text-xs text-gray-400">
            Set signals for 52W High break-outs, ROE threshold triggers, and unusual volume spikes.
          </p>
        </div>

        <div className="glass-card p-5 border border-white/5 space-y-3">
          <div className="p-3 rounded-xl bg-gray-900 border border-gray-800 flex justify-between items-center text-xs">
            <div>
              <p className="font-bold text-white">TCS 52-Week High Trigger</p>
              <p className="text-[10px] text-gray-400">Alert when price crosses ₹4,381.00</p>
            </div>
            <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-bold text-[10px]">Active</span>
          </div>

          <div className="p-3 rounded-xl bg-gray-900 border border-gray-800 flex justify-between items-center text-xs">
            <div>
              <p className="font-bold text-white">INFY ROE Expansion</p>
              <p className="text-[10px] text-gray-400">Alert when quarterly ROE exceeds 32%</p>
            </div>
            <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-bold text-[10px]">Active</span>
          </div>
        </div>
      </main>
    </div>
  );
}
