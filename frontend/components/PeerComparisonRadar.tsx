"use client";

import React from "react";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";

interface PeerComparisonRadarProps {
  targetTicker?: string;
  sector?: string;
  targetCompany?: Record<string, number>;
  sectorMedian?: Record<string, number>;
}

export default function PeerComparisonRadar({
  targetTicker = "TCS",
  sector = "IT Services",
  targetCompany = { roe_pct: 38.2, net_profit_margin_pct: 24.1, debt_to_equity: 0.05, roce_pct: 42.1, asset_turnover: 1.15 },
  sectorMedian = { roe_pct: 22.5, net_profit_margin_pct: 16.8, debt_to_equity: 0.25, roce_pct: 26.4, asset_turnover: 0.85 },
}: PeerComparisonRadarProps) {
  const radarData = [
    { metric: "ROE %", Target: targetCompany.roe_pct || 30, SectorMedian: sectorMedian.roe_pct || 20 },
    { metric: "Net Margin %", Target: targetCompany.net_profit_margin_pct || 20, SectorMedian: sectorMedian.net_profit_margin_pct || 15 },
    { metric: "ROCE %", Target: targetCompany.roce_pct || 35, SectorMedian: sectorMedian.roce_pct || 25 },
    { metric: "Asset Turnover (x10)", Target: (targetCompany.asset_turnover || 1.1) * 10, SectorMedian: (sectorMedian.asset_turnover || 0.8) * 10 },
    { metric: "Low Debt Safety", Target: Math.max(0, 50 - (targetCompany.debt_to_equity || 0.1) * 50), SectorMedian: Math.max(0, 50 - (sectorMedian.debt_to_equity || 0.3) * 50) },
  ];

  return (
    <div className="glass-card p-6 border border-white/5 space-y-4 rounded-2xl bg-slate-900/60 backdrop-blur-md">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <span>🎯</span> Peer Comparison Radar Chart
          </h3>
          <p className="text-xs text-gray-400">
            Benchmarking <span className="text-blue-400 font-bold">{targetTicker}</span> against <span className="text-cyan-400 font-bold">{sector}</span> median
          </p>
        </div>
        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 border border-blue-500/30">
          5-Dimensional Benchmark
        </span>
      </div>

      <div className="w-full h-72">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
            <PolarGrid stroke="#374151" />
            <PolarAngleAxis dataKey="metric" tick={{ fill: "#9CA3AF", fontSize: 11 }} />
            <PolarRadiusAxis angle={30} domain={[0, 50]} stroke="#4B5563" tick={false} />
            <Radar
              name={`${targetTicker} (Target)`}
              dataKey="Target"
              stroke="#38BDF8"
              fill="#38BDF8"
              fillOpacity={0.4}
            />
            <Radar
              name={`${sector} Median`}
              dataKey="SectorMedian"
              stroke="#A855F7"
              fill="#A855F7"
              fillOpacity={0.3}
            />
            <Tooltip contentStyle={{ backgroundColor: "#0F172A", borderColor: "#1E293B", borderRadius: "12px", color: "#FFF" }} />
            <Legend wrapperStyle={{ fontSize: "12px", paddingTop: "10px" }} />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
