"use client";

import React from "react";
import Link from "next/link";
import Logo from "@/components/Logo";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-[#050816] text-slate-900 dark:text-gray-100 font-sans flex flex-col justify-between selection:bg-blue-500 selection:text-white transition-colors duration-300">
      {/* Navbar */}
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-[#050816]/80 backdrop-blur-xl border-b border-gray-200 dark:border-gray-800/60 px-6 py-4 transition-colors">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 hover:opacity-95 transition-opacity">
            <Logo variant="horizontal" size="md" theme="dark" />
          </Link>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 text-xs font-medium text-gray-300">
            <Link href="/dashboard" className="hover:text-white transition-colors">
              Dashboard
            </Link>
            <Link href="/companies" className="hover:text-white transition-colors">
              Companies
            </Link>

            <Link href="/screener" className="hover:text-white transition-colors">
              Screener
            </Link>
            <Link href="/company/TCS" className="hover:text-white transition-colors">
              Reports
            </Link>
            <Link href="#pricing" className="hover:text-white transition-colors">
              Pricing
            </Link>
          </nav>

          {/* Auth Actions */}
          <div className="flex items-center gap-4 text-xs font-semibold">
            <Link href="/login" className="text-gray-300 hover:text-white transition-colors">
              Sign In
            </Link>
            <Link
              href="/dashboard"
              className="px-4 py-2 rounded-xl gradient-bg text-white shadow-lg shadow-blue-500/25 hover:opacity-90 transition-all"
            >
              Get Started
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-6 py-12 lg:py-20 flex-1 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Column Content */}
        <div className="lg:col-span-6 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs font-semibold text-blue-300">
            <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
            Next-Gen Financial Intelligence Engine
          </div>

          <h1 className="text-4xl lg:text-6xl font-black text-white tracking-tight leading-[1.1]">
            AI-Powered Financial <span className="gradient-text">Intelligence</span> Platform
          </h1>

          <p className="text-sm lg:text-base text-gray-400 max-w-xl leading-relaxed">
            Analyze. Compare. Invest smarter with real-time data, advanced analytics, and AI-driven stock insights for Nifty 100 constituents.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Link
              href="/dashboard"
              className="px-6 py-3 rounded-xl gradient-bg text-sm font-bold text-white shadow-xl shadow-blue-500/30 hover:scale-[1.02] transition-all"
            >
              Explore Dashboard
            </Link>
            <Link
              href="/screener"
              className="px-6 py-3 rounded-xl glass-card text-sm font-bold text-gray-200 border border-gray-700 hover:bg-gray-800/60 transition-all"
            >
              Stock Screener
            </Link>
          </div>

          {/* Bottom Key Stats Bar */}
          <div className="pt-8 border-t border-gray-800/60 grid grid-cols-5 gap-3">
            <div>
              <p className="text-xl font-black text-white">92</p>
              <p className="text-[10px] text-gray-400 font-medium">Nifty 100 Companies</p>
            </div>
            <div>
              <p className="text-xl font-black text-white">60+</p>
              <p className="text-[10px] text-gray-400 font-medium">Financial Ratios</p>
            </div>
            <div>
              <p className="text-xl font-black text-white">10Y</p>
              <p className="text-[10px] text-gray-400 font-medium">Historical Data</p>
            </div>
            <div>
              <p className="text-xl font-black text-emerald-400">95%</p>
              <p className="text-[10px] text-gray-400 font-medium">Data Accuracy</p>
            </div>
            <div>
              <p className="text-xl font-black text-blue-400">24/7</p>
              <p className="text-[10px] text-gray-400 font-medium">Real-Time Updates</p>
            </div>
          </div>
        </div>

        {/* Right Column: Animated Live Interactive Hero Visual */}
        <div className="lg:col-span-6 relative">
          <div className="absolute -inset-1 rounded-3xl gradient-bg opacity-30 blur-2xl -z-10" />
          <div className="glass-card p-6 border border-white/10 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-gray-800/80 pb-3">
              <span className="text-xs font-bold text-white uppercase tracking-wider">
                Market Overview
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                Market Open
              </span>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-4 gap-3 text-xs">
              <div className="bg-gray-900/80 p-3 rounded-xl border border-gray-800">
                <p className="text-[10px] text-gray-400">Market Cap</p>
                <p className="font-bold text-white text-sm mt-0.5">₹235.8T</p>
                <p className="text-[10px] text-emerald-400 font-semibold">+1.68%</p>
              </div>
              <div className="bg-gray-900/80 p-3 rounded-xl border border-gray-800">
                <p className="text-[10px] text-gray-400">Nifty 100</p>
                <p className="font-bold text-white text-sm mt-0.5">22,453.20</p>
                <p className="text-[10px] text-emerald-400 font-semibold">+1.12%</p>
              </div>
              <div className="bg-gray-900/80 p-3 rounded-xl border border-gray-800">
                <p className="text-[10px] text-gray-400">Advances</p>
                <p className="font-bold text-emerald-400 text-sm mt-0.5">73</p>
                <p className="text-[10px] text-rose-400 font-semibold">23 Declines</p>
              </div>
              <div className="bg-gray-900/80 p-3 rounded-xl border border-gray-800">
                <p className="text-[10px] text-gray-400">Volume</p>
                <p className="font-bold text-white text-sm mt-0.5">1.25B</p>
                <p className="text-[10px] text-emerald-400 font-semibold">+18.27%</p>
              </div>
            </div>

            {/* Simulated Live Index Curve */}
            <div className="h-44 w-full bg-gray-950/80 rounded-xl p-3 border border-gray-800/80 relative overflow-hidden flex flex-col justify-between">
              <div className="flex justify-between text-[10px] text-gray-500">
                <span>Nifty 100 Index Intraday</span>
                <span>22,453.20 Peak</span>
              </div>
              <div className="h-28 w-full">
                <svg className="w-full h-full overflow-visible" viewBox="0 0 100 50" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="heroGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.4" />
                      <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.0" />
                    </linearGradient>
                  </defs>
                  <path d="M 0,35 Q 25,10 50,20 T 100,8 L 100,50 L 0,50 Z" fill="url(#heroGrad)" />
                  <path d="M 0,35 Q 25,10 50,20 T 100,8" fill="none" stroke="#3B82F6" strokeWidth="2.5" />
                </svg>
              </div>
              <div className="flex justify-between text-[9px] text-gray-400">
                <span>09:15</span>
                <span>10:30</span>
                <span>11:45</span>
                <span>13:00</span>
                <span>14:15</span>
                <span>15:30</span>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-800/60 py-6 px-6 text-center text-xs text-gray-500">
        © 2026 FINANCEL Intelligence Platform. Powered by Nifty 100 High-Precision Financial Engine.
      </footer>
    </div>
  );
}
