"use client";

import React from "react";

interface DuPontData {
  net_margin_pct?: number;
  asset_turnover?: number;
  equity_multiplier?: number;
  dupont_roe_pct?: number;
}

interface AltmanData {
  z_score?: number;
  zone?: string;
  description?: string;
}

interface PiotroskiData {
  f_score?: number;
  max_score?: number;
  strength?: string;
}

interface CompanyModelsCardProps {
  dupont?: DuPontData;
  altman_z?: AltmanData;
  piotroski_f?: PiotroskiData;
}

export default function CompanyModelsCard({
  dupont = { net_margin_pct: 24.1, asset_turnover: 1.15, equity_multiplier: 1.38, dupont_roe_pct: 38.2 },
  altman_z = { z_score: 4.85, zone: "Safe Zone", description: "Low probability of financial distress" },
  piotroski_f = { f_score: 8, max_score: 9, strength: "Strong Fundamental Health" },
}: CompanyModelsCardProps) {
  const getAltmanBadgeColor = (zone?: string) => {
    if (zone === "Safe Zone") return "bg-emerald-500/20 text-emerald-400 border-emerald-500/30";
    if (zone === "Grey Zone") return "bg-amber-500/20 text-amber-400 border-amber-500/30";
    return "bg-rose-500/20 text-rose-400 border-rose-500/30";
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* 1. DuPont 3-Step Analysis Card */}
      <div className="glass-card p-6 border border-white/5 space-y-4 rounded-2xl bg-slate-900/60 backdrop-blur-md">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <span>📐</span> DuPont 3-Step ROE Analysis
          </h3>
          <span className="text-xs font-black text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
            {dupont.dupont_roe_pct}% ROE
          </span>
        </div>
        <p className="text-xs text-gray-400">
          Decomposes Return on Equity into Net Margin, Asset Turnover, and Financial Leverage.
        </p>

        <div className="space-y-2.5 pt-2 text-xs">
          <div className="flex justify-between items-center bg-gray-800/40 p-2.5 rounded-xl border border-gray-800">
            <span className="text-gray-300">Net Profit Margin</span>
            <span className="font-bold text-sky-400">{dupont.net_margin_pct}%</span>
          </div>
          <div className="flex justify-between items-center bg-gray-800/40 p-2.5 rounded-xl border border-gray-800">
            <span className="text-gray-300">Asset Turnover</span>
            <span className="font-bold text-cyan-400">{dupont.asset_turnover}x</span>
          </div>
          <div className="flex justify-between items-center bg-gray-800/40 p-2.5 rounded-xl border border-gray-800">
            <span className="text-gray-300">Equity Multiplier</span>
            <span className="font-bold text-indigo-400">{dupont.equity_multiplier}x</span>
          </div>
        </div>
      </div>

      {/* 2. Altman Z-Score Bankruptcy Model */}
      <div className="glass-card p-6 border border-white/5 space-y-4 rounded-2xl bg-slate-900/60 backdrop-blur-md">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <span>⚠️</span> Altman Z-Score Model
          </h3>
          <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full border ${getAltmanBadgeColor(altman_z.zone)}`}>
            {altman_z.zone}
          </span>
        </div>
        <p className="text-xs text-gray-400">
          Quantitative solvency evaluation predicting financial distress likelihood.
        </p>

        <div className="text-center py-3 bg-gray-800/40 rounded-xl border border-gray-800">
          <span className="text-3xl font-black text-white">{altman_z.z_score}</span>
          <p className="text-[10px] text-gray-400 mt-1">{altman_z.description}</p>
        </div>
      </div>

      {/* 3. Piotroski 9-Point F-Score Gauge */}
      <div className="glass-card p-6 border border-white/5 space-y-4 rounded-2xl bg-slate-900/60 backdrop-blur-md">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <span>🛡️</span> Piotroski F-Score Meter
          </h3>
          <span className="text-xs font-bold text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded-full border border-indigo-500/20">
            {piotroski_f.f_score} / {piotroski_f.max_score}
          </span>
        </div>
        <p className="text-xs text-gray-400">
          9-point accounting matrix measuring profitability, solvency, and efficiency.
        </p>

        <div className="space-y-2 pt-2">
          <div className="w-full bg-gray-800 rounded-full h-3 overflow-hidden p-0.5 border border-gray-700">
            <div
              className="bg-gradient-to-r from-blue-500 to-emerald-400 h-full rounded-full transition-all duration-500"
              style={{ width: `${((piotroski_f.f_score || 0) / 9) * 100}%` }}
            />
          </div>
          <p className="text-xs font-semibold text-center text-emerald-400 pt-1">
            {piotroski_f.strength}
          </p>
        </div>
      </div>
    </div>
  );
}
