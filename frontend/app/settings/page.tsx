"use client";

import React from "react";
import Sidebar from "@/components/layout/Sidebar";
import { useAuth } from "@/context/AuthContext";

export default function SettingsPage() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-[#050816] text-gray-100 flex font-sans">
      <Sidebar />

      <main className="flex-1 p-6 space-y-6 overflow-y-auto max-h-screen scrollbar-thin">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
            <span>⚙️</span> Platform Settings
          </h1>
          <p className="text-xs text-gray-400">
            Account preferences, API keys, and notification channels.
          </p>
        </div>

        <div className="glass-card p-6 border border-white/5 space-y-4 max-w-2xl">
          <h3 className="text-sm font-bold text-white">Account Details</h3>
          <div className="space-y-3 text-xs">
            <div>
              <label className="text-gray-400 block mb-1">Email Address</label>
              <input
                type="text"
                disabled
                value={user?.email || "admin1@gmail.com"}
                className="w-full px-3.5 py-2 rounded-xl bg-gray-900 border border-gray-800 text-gray-300"
              />
            </div>
            <div>
              <label className="text-gray-400 block mb-1">Subscription Tier</label>
              <span className="inline-block px-3 py-1 rounded-xl bg-blue-500/20 text-blue-300 font-bold border border-blue-500/30">
                Premium Institutional Plan
              </span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
