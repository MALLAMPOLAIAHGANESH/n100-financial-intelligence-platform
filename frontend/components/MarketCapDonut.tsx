"use client";

import React from "react";
import dynamic from "next/dynamic";

const Plot = dynamic(() => import("react-plotly.js"), { ssr: false });

export default function MarketCapDonut() {
  return (
    <div className="glass-card p-5 border border-slate-200 dark:border-white/10 flex flex-col justify-between h-full shadow-lg dark:shadow-xl transition-colors">
      <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-2">Market Cap Distribution</h3>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 my-auto">
        {/* Interactive Donut Chart */}
        <div className="relative w-40 h-40 flex items-center justify-center">
          <Plot
            data={[
              {
                values: [142.6, 62.4, 30.8],
                labels: ["Large Cap", "Mid Cap", "Small Cap"],
                type: "pie",
                hole: 0.7,
                marker: {
                  colors: ["#2563EB", "#06B6D4", "#22C55E"],
                },
                textinfo: "none",
                hoverinfo: "label+percent+value",
              },
            ]}
            layout={{
              width: 160,
              height: 160,
              margin: { l: 0, r: 0, t: 0, b: 0 },
              showlegend: false,
              paper_bgcolor: "transparent",
              plot_bgcolor: "transparent",
            }}
            config={{ displayModeBar: false, responsive: true }}
          />
          <div className="absolute flex flex-col items-center pointer-events-none">
            <span className="text-sm font-extrabold text-slate-900 dark:text-white">₹235.8T</span>
            <span className="text-[10px] font-semibold text-slate-500 dark:text-gray-400">Total</span>
          </div>
        </div>

        {/* Legend Details */}
        <div className="flex flex-col space-y-3 w-full sm:w-auto text-xs">
          <div className="flex items-center justify-between sm:justify-start gap-4">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-blue-600" />
              <span className="text-slate-700 dark:text-gray-300 font-medium">Large Cap</span>
            </div>
            <span className="font-bold text-slate-900 dark:text-white">₹142.6T (60.5%)</span>
          </div>

          <div className="flex items-center justify-between sm:justify-start gap-4">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-cyan-500" />
              <span className="text-slate-700 dark:text-gray-300 font-medium">Mid Cap</span>
            </div>
            <span className="font-bold text-slate-900 dark:text-white">₹62.4T (26.5%)</span>
          </div>

          <div className="flex items-center justify-between sm:justify-start gap-4">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-emerald-500" />
              <span className="text-slate-700 dark:text-gray-300 font-medium">Small Cap</span>
            </div>
            <span className="font-bold text-slate-900 dark:text-white">₹30.8T (13.0%)</span>
          </div>
        </div>
      </div>
    </div>
  );
}
