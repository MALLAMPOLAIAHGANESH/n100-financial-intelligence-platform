"use client";

import React from "react";
import Sidebar from "@/components/layout/Sidebar";
import Link from "next/link";

export default function WatchlistPage() {
  return (
    <div className="min-h-screen bg-[#050816] text-gray-100 flex font-sans">
      <Sidebar />

      <main className="flex-1 p-6 space-y-6 overflow-y-auto max-h-screen scrollbar-thin">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
            <span>⭐</span> Custom Watchlist
          </h1>
          <p className="text-xs text-gray-400">
            Saved Nifty 100 constituents with real-time target price alerts.
          </p>
        </div>

        <div className="glass-card p-5 border border-white/5 space-y-3">
          <div className="flex justify-between text-xs text-gray-400 border-b border-gray-800 pb-2">
            <span>Stock</span>
            <span>Current Price</span>
            <span>Target Price</span>
            <span>Action</span>
          </div>

          <div className="flex justify-between items-center text-xs">
            <Link href="/company/TCS" className="font-bold text-blue-400">TCS</Link>
            <span className="font-bold text-white">₹4,235.20</span>
            <span className="text-emerald-400 font-semibold">₹4,500.00</span>
            <span className="text-xs text-blue-400 cursor-pointer">View Analysis →</span>
          </div>

          <div className="flex justify-between items-center text-xs pt-2 border-t border-gray-800/40">
            <Link href="/company/HDFCBANK" className="font-bold text-blue-400">HDFCBANK</Link>
            <span className="font-bold text-white">₹1,678.95</span>
            <span className="text-emerald-400 font-semibold">₹1,850.00</span>
            <span className="text-xs text-blue-400 cursor-pointer">View Analysis →</span>
          </div>
        </div>
      </main>
    </div>
  );
}
