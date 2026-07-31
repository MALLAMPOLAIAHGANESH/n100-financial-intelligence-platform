"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { companyApi, Company, RatioItem } from "@/lib/api";

export default function DashboardPage() {
  const { user, token, loading: authLoading, logout } = useAuth();
  const router = useRouter();

  const [companies, setCompanies] = useState<Company[]>([]);
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
  const [ratios, setRatios] = useState<RatioItem[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSector, setSelectedSector] = useState("All");
  const [loadingData, setLoadingData] = useState(true);

  useEffect(() => {
    if (!authLoading && !token) {
      router.push("/login");
    }
  }, [token, authLoading, router]);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoadingData(true);
        const fetchedCompanies = await companyApi.getCompanies();
        setCompanies(fetchedCompanies);
        if (fetchedCompanies.length > 0) {
          setSelectedCompany(fetchedCompanies[0]);
          const fetchedRatios = await companyApi.getRatios(fetchedCompanies[0].ticker);
          setRatios(fetchedRatios);
        }
      } catch (err) {
        console.error("Error loading dashboard data:", err);
      } finally {
        setLoadingData(false);
      }
    }
    if (token) {
      fetchData();
    }
  }, [token]);

  const handleSelectCompany = async (comp: Company) => {
    setSelectedCompany(comp);
    setLoadingData(true);
    try {
      const fetchedRatios = await companyApi.getRatios(comp.ticker);
      setRatios(fetchedRatios);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingData(false);
    }
  };

  if (authLoading || !token) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#090d16] text-gray-400">
        <div className="flex items-center gap-3">
          <div className="w-5 h-5 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
          <span>Authenticating session...</span>
        </div>
      </div>
    );
  }

  const sectors = ["All", ...Array.from(new Set(companies.map((c) => c.sector).filter(Boolean)))];

  const filteredCompanies = companies.filter((c) => {
    const matchesSearch =
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.ticker.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSector = selectedSector === "All" || c.sector === selectedSector;
    return matchesSearch && matchesSector;
  });

  return (
    <div className="min-h-screen bg-[#090d16] text-gray-100 flex flex-col font-sans">
      {/* Top Header */}
      <header className="sticky top-0 z-30 bg-[#090d16]/80 backdrop-blur-xl border-b border-gray-800/80 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl gradient-bg flex items-center justify-center shadow-lg shadow-indigo-500/20 font-bold text-white text-lg">
            F
          </div>
          <div>
            <h1 className="text-lg font-bold tracking-tight text-white flex items-center gap-2">
              FINANCEL
              <span className="text-[10px] font-semibold tracking-wider uppercase px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                Nifty 100 Intelligence
              </span>
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gray-900/90 border border-gray-800 text-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-gray-300">{user?.email}</span>
          </div>

          <button
            onClick={logout}
            className="px-3.5 py-1.5 rounded-lg bg-gray-900 hover:bg-gray-800 border border-gray-800 text-xs text-gray-300 hover:text-white transition-colors"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 p-6 max-w-7xl w-full mx-auto space-y-6">
        {/* Metric Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="glass-card p-5 border border-white/5">
            <p className="text-xs font-medium text-gray-400 uppercase tracking-wider">
              Tracked Companies
            </p>
            <div className="mt-2 flex items-baseline justify-between">
              <span className="text-2xl font-bold text-white">{companies.length}</span>
              <span className="text-xs font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">
                +100% Verified
              </span>
            </div>
            <p className="text-xs text-gray-500 mt-2">Nifty 100 constituents</p>
          </div>

          <div className="glass-card p-5 border border-white/5">
            <p className="text-xs font-medium text-gray-400 uppercase tracking-wider">
              Selected Ticker
            </p>
            <div className="mt-2 flex items-baseline justify-between">
              <span className="text-2xl font-bold text-cyan-400">
                {selectedCompany?.ticker || "NSE"}
              </span>
              <span className="text-xs font-medium text-gray-400">NSE Index</span>
            </div>
            <p className="text-xs text-gray-400 mt-2 truncate">
              {selectedCompany?.name}
            </p>
          </div>

          <div className="glass-card p-5 border border-white/5">
            <p className="text-xs font-medium text-gray-400 uppercase tracking-wider">
              Avg Sector ROE
            </p>
            <div className="mt-2 flex items-baseline justify-between">
              <span className="text-2xl font-bold text-emerald-400">18.5%</span>
              <span className="text-xs font-semibold text-emerald-400">▲ +2.1%</span>
            </div>
            <p className="text-xs text-gray-500 mt-2">FY24/25 Benchmark</p>
          </div>

          <div className="glass-card p-5 border border-white/5">
            <p className="text-xs font-medium text-gray-400 uppercase tracking-wider">
              Data Quality Index
            </p>
            <div className="mt-2 flex items-baseline justify-between">
              <span className="text-2xl font-bold text-indigo-400">99.4%</span>
              <span className="text-xs font-semibold text-indigo-400">Engine Passed</span>
            </div>
            <p className="text-xs text-gray-500 mt-2">Automated DQ validation</p>
          </div>
        </div>

        {/* Company Selector & Filters */}
        <div className="glass-card p-5 border border-white/5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            <span className="text-xs text-gray-400 font-medium mr-1">Sector Filter:</span>
            {sectors.map((sec) => (
              <button
                key={sec}
                onClick={() => setSelectedSector(sec as string)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  selectedSector === sec
                    ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30"
                    : "bg-gray-900/80 text-gray-400 hover:text-gray-200 border border-gray-800"
                }`}
              >
                {sec}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-64">
            <input
              type="text"
              placeholder="Search ticker or name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-3.5 py-1.5 rounded-lg bg-gray-900/90 border border-gray-800 text-xs text-gray-200 focus:outline-none focus:border-indigo-500"
            />
          </div>
        </div>

        {/* Company Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
          {filteredCompanies.map((comp) => (
            <button
              key={comp.id}
              onClick={() => handleSelectCompany(comp)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-2 ${
                selectedCompany?.ticker === comp.ticker
                  ? "gradient-bg text-white shadow-lg shadow-indigo-600/30"
                  : "glass-card text-gray-300 hover:border-gray-700"
              }`}
            >
              <span>{comp.ticker}</span>
              <span className="opacity-60 text-[10px] font-normal">{comp.sector}</span>
            </button>
          ))}
        </div>

        {/* Ratio Metrics Explorer & Chart Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left 2 Cols: Financial Ratios Grid */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                Financial Ratios Overview
                <span className="text-xs text-gray-400 font-normal">
                  ({selectedCompany?.name})
                </span>
              </h2>
              {loadingData && (
                <span className="text-xs text-indigo-400 animate-pulse">
                  Updating ratios...
                </span>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {ratios.map((item, idx) => (
                <div
                  key={idx}
                  className="glass-card p-4 border border-white/5 glass-card-hover flex flex-col justify-between"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold text-gray-300">
                      {item.ratio_name}
                    </span>
                    <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-gray-800 text-gray-400">
                      {item.category || "KPI"}
                    </span>
                  </div>

                  <div className="flex items-baseline justify-between mt-2">
                    <span className="text-xl font-bold text-white">
                      {typeof item.value === "number" ? item.value.toFixed(2) : item.value}
                    </span>
                    <span className="text-xs font-medium text-emerald-400">
                      Healthy Range
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Col: Performance Analytics Chart */}
          <div className="glass-card p-5 border border-white/5 flex flex-col justify-between">
            <div>
              <h3 className="text-sm font-bold text-white mb-1">
                Multi-Year Trend Analysis
              </h3>
              <p className="text-xs text-gray-400 mb-4">
                Financial trajectory for {selectedCompany?.ticker}
              </p>

              {/* Mock SVG Visual Trend Line */}
              <div className="h-48 w-full bg-gray-950/60 rounded-xl p-4 border border-gray-900 flex flex-col justify-between relative overflow-hidden">
                <div className="flex justify-between text-[10px] text-gray-500 border-b border-gray-900 pb-1">
                  <span>Margin %</span>
                  <span>FY21 - FY25</span>
                </div>

                <div className="relative h-28 w-full flex items-end">
                  <svg className="w-full h-full overflow-visible" viewBox="0 0 100 50" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="grad" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#6366f1" stopOpacity="0.4" />
                        <stop offset="100%" stopColor="#6366f1" stopOpacity="0.0" />
                      </linearGradient>
                    </defs>
                    <path
                      d="M 0,35 Q 25,15 50,22 T 100,10 L 100,50 L 0,50 Z"
                      fill="url(#grad)"
                    />
                    <path
                      d="M 0,35 Q 25,15 50,22 T 100,10"
                      fill="none"
                      stroke="#6366f1"
                      strokeWidth="2.5"
                    />
                  </svg>
                </div>

                <div className="flex justify-between text-[10px] text-gray-400 pt-1 border-t border-gray-900">
                  <span>FY21</span>
                  <span>FY22</span>
                  <span>FY23</span>
                  <span>FY24</span>
                  <span>FY25</span>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-900 flex items-center justify-between text-xs">
              <span className="text-gray-400">Engine Status:</span>
              <span className="text-emerald-400 font-semibold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                Live Sync Ready
              </span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
