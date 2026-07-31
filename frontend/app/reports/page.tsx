"use client";

import React from "react";
import Sidebar from "@/components/layout/Sidebar";
import Link from "next/link";

export default function ReportsPage() {
  return (
    <div className="min-h-screen bg-[#050816] text-gray-100 flex font-sans">
      <Sidebar />

      <main className="flex-1 p-6 space-y-6 overflow-y-auto max-h-screen scrollbar-thin">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
            <span>📄</span> Financial Intelligence Reports
          </h1>
          <p className="text-xs text-gray-400">
            Export institutional equity research summaries, ratio teardowns, and quarterly earnings insights.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="glass-card p-5 border border-white/5 space-y-3">
            <h3 className="text-sm font-bold text-white">Nifty 100 Q4 Earnings Teardown</h3>
            <p className="text-xs text-gray-400">Comprehensive sector-by-sector margin expansion analysis.</p>
            <Link href="/company/TCS" className="inline-block text-xs text-blue-400 font-bold hover:underline">
              Download PDF Report →
            </Link>
          </div>

          <div className="glass-card p-5 border border-white/5 space-y-3">
            <h3 className="text-sm font-bold text-white">IT Services Moat Assessment FY25</h3>
            <p className="text-xs text-gray-400">Deep dive into TCS, Infosys, and HCL Tech moat endurance.</p>
            <Link href="/company/INFY" className="inline-block text-xs text-blue-400 font-bold hover:underline">
              Download PDF Report →
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
