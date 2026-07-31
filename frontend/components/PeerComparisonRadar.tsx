"use client";

import React from "react";

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
  const metrics = [
    { name: "ROE %", val: targetCompany.roe_pct || 30, med: sectorMedian.roe_pct || 20, max: 50 },
    { name: "Net Margin %", val: targetCompany.net_profit_margin_pct || 20, med: sectorMedian.net_profit_margin_pct || 15, max: 40 },
    { name: "ROCE %", val: targetCompany.roce_pct || 35, med: sectorMedian.roce_pct || 25, max: 50 },
    { name: "Asset Turnover", val: (targetCompany.asset_turnover || 1.1) * 10, med: (sectorMedian.asset_turnover || 0.8) * 10, max: 20 },
    { name: "Solvency Safety", val: Math.max(5, 50 - (targetCompany.debt_to_equity || 0.1) * 50), med: Math.max(5, 50 - (sectorMedian.debt_to_equity || 0.3) * 50), max: 50 },
  ];

  const size = 300;
  const center = size / 2;
  const radius = 100;
  const total = metrics.length;

  const getCoordinates = (index: number, value: number, maxVal: number) => {
    const angle = (Math.PI * 2 / total) * index - Math.PI / 2;
    const norm = Math.min(1, Math.max(0.1, value / maxVal));
    const r = radius * norm;
    const x = center + r * Math.cos(angle);
    const y = center + r * Math.sin(angle);
    return { x, y };
  };

  const getPolygonPoints = (key: "val" | "med") => {
    return metrics
      .map((m, i) => {
        const { x, y } = getCoordinates(i, m[key], m.max);
        return `${x},${y}`;
      })
      .join(" ");
  };

  return (
    <div className="glass-card p-6 border border-white/5 space-y-4 rounded-2xl bg-slate-900/60 backdrop-blur-md">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <span>🎯</span> Peer Comparison Radar Chart
          </h3>
          <p className="text-xs text-gray-400">
            Benchmarking <span className="text-sky-400 font-bold">{targetTicker}</span> against <span className="text-purple-400 font-bold">{sector}</span> median
          </p>
        </div>
        <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30">
          5-Dimensional Benchmark
        </span>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-2">
        {/* SVG Radar Visualizer */}
        <div className="relative w-[300px] h-[300px] flex items-center justify-center">
          <svg width={size} height={size} className="overflow-visible">
            {/* Concentric Polar Grids */}
            {[0.2, 0.4, 0.6, 0.8, 1.0].map((level, idx) => (
              <polygon
                key={idx}
                points={metrics
                  .map((_, i) => {
                    const angle = (Math.PI * 2 / total) * i - Math.PI / 2;
                    const r = radius * level;
                    return `${center + r * Math.cos(angle)},${center + r * Math.sin(angle)}`;
                  })
                  .join(" ")}
                fill="none"
                stroke="#374151"
                strokeWidth="1"
                strokeDasharray={idx < 4 ? "3,3" : "none"}
              />
            ))}

            {/* Axis Lines */}
            {metrics.map((_, i) => {
              const angle = (Math.PI * 2 / total) * i - Math.PI / 2;
              const x2 = center + radius * Math.cos(angle);
              const y2 = center + radius * Math.sin(angle);
              return <line key={i} x1={center} y1={center} x2={x2} y2={y2} stroke="#374151" strokeWidth="1" />;
            })}

            {/* Sector Median Polygon */}
            <polygon
              points={getPolygonPoints("med")}
              fill="rgba(168, 85, 247, 0.25)"
              stroke="#A855F7"
              strokeWidth="2"
            />

            {/* Target Company Polygon */}
            <polygon
              points={getPolygonPoints("val")}
              fill="rgba(56, 189, 248, 0.35)"
              stroke="#38BDF8"
              strokeWidth="2.5"
            />

            {/* Target Data Points */}
            {metrics.map((m, i) => {
              const { x, y } = getCoordinates(i, m.val, m.max);
              return <circle key={i} cx={x} cy={y} r="4" fill="#38BDF8" className="shadow-lg shadow-sky-500" />;
            })}

            {/* Axis Labels */}
            {metrics.map((m, i) => {
              const angle = (Math.PI * 2 / total) * i - Math.PI / 2;
              const labelRadius = radius + 22;
              const lx = center + labelRadius * Math.cos(angle);
              const ly = center + labelRadius * Math.sin(angle);
              return (
                <text
                  key={i}
                  x={lx}
                  y={ly}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fill="#9CA3AF"
                  fontSize="10"
                  fontWeight="600"
                >
                  {m.name}
                </text>
              );
            })}
          </svg>
        </div>

        {/* Legend & Breakdown Panel */}
        <div className="flex-1 space-y-3 text-xs">
          <div className="flex items-center gap-6 pb-2 border-b border-gray-800">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-sky-400 border border-sky-300" />
              <span className="font-bold text-white">{targetTicker} (Target)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-purple-400 border border-purple-300" />
              <span className="font-bold text-purple-300">{sector} Median</span>
            </div>
          </div>

          <div className="space-y-2">
            {metrics.map((m) => (
              <div key={m.name} className="flex items-center justify-between bg-gray-800/40 p-2 rounded-xl border border-gray-800">
                <span className="text-gray-400 font-medium">{m.name}</span>
                <div className="flex items-center gap-3">
                  <span className="font-bold text-sky-400">{m.val.toFixed(1)}</span>
                  <span className="text-gray-500">vs</span>
                  <span className="font-bold text-purple-300">{m.med.toFixed(1)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
