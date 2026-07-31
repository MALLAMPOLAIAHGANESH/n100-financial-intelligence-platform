"use client";

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

export default function Home() {
  const { token, loading } = useAuth();

  return (
    <div className="min-h-screen bg-[#090d16] text-white flex flex-col justify-between p-6 relative overflow-hidden">
      {/* Glow Backdrops */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-indigo-600/15 rounded-full blur-[140px] pointer-events-none" />

      {/* Top Bar */}
      <header className="max-w-7xl w-full mx-auto flex items-center justify-between z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl gradient-bg flex items-center justify-center font-bold text-white text-xl shadow-lg shadow-indigo-500/20">
            F
          </div>
          <span className="text-xl font-bold tracking-tight">FINANCEL</span>
        </div>

        <div className="flex items-center gap-4">
          {token ? (
            <Link
              href="/dashboard"
              className="px-5 py-2.5 rounded-xl gradient-bg text-white text-sm font-semibold shadow-lg shadow-indigo-600/30 hover:opacity-95 transition-all"
            >
              Go to Dashboard
            </Link>
          ) : (
            <>
              <Link
                href="/login"
                className="text-sm font-medium text-gray-300 hover:text-white px-4 py-2 transition-colors"
              >
                Sign In
              </Link>
              <Link
                href="/register"
                className="px-4 py-2 rounded-xl gradient-bg text-white text-sm font-semibold shadow-lg shadow-indigo-600/30 hover:opacity-95 transition-all"
              >
                Get Started
              </Link>
            </>
          )}
        </div>
      </header>

      {/* Hero Content */}
      <main className="max-w-4xl w-full mx-auto text-center z-10 my-auto py-16 space-y-6">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold uppercase tracking-wider mb-2">
          <span>⚡ Next-Gen Financial Intelligence Engine</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight leading-tight">
          Nifty 100 Financial Analytics &{" "}
          <span className="gradient-text">Ratio Intelligence</span>
        </h1>

        <p className="text-base sm:text-lg text-gray-400 max-w-2xl mx-auto font-normal">
          Automated ETL, data quality validation, ratios computation engine, and JWT-authenticated analytics dashboard built for financial professionals.
        </p>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href={token ? "/dashboard" : "/login"}
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl gradient-bg text-white font-semibold text-sm shadow-xl shadow-indigo-600/30 hover:opacity-95 transition-all"
          >
            {token ? "Open Dashboard" : "Launch Dashboard"}
          </Link>
          <Link
            href="/register"
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl glass-card text-gray-200 border border-gray-800 hover:border-gray-700 font-semibold text-sm transition-all"
          >
            Create Account
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="max-w-7xl w-full mx-auto text-center text-xs text-gray-500 z-10">
        © 2026 FINANCEL Platform. All rights reserved.
      </footer>
    </div>
  );
}
