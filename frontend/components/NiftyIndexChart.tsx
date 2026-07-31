"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import { useTheme } from "@/context/ThemeContext";

const Plot = dynamic(() => import("react-plotly.js"), { ssr: false });

const timelineFilters = ["1D", "5D", "1M", "3M", "6M", "YTD", "1Y", "5Y", "All"];

const generateMockTimeseries = (timeframe: string) => {
  const times = ["09:15", "10:00", "11:00", "12:00", "13:00", "14:00", "15:30"];
  const values = [22050, 22220, 22310, 22280, 22390, 22430, 22453.2];
  return { times, values };
};

export default function NiftyIndexChart() {
  const [selectedTimeframe, setSelectedTimeframe] = useState("1D");
  const { theme } = useTheme();
  const data = generateMockTimeseries(selectedTimeframe);

  const isDark = theme === "dark";

  return (
    <div className="glass-card p-5 border border-slate-200 dark:border-white/10 flex flex-col justify-between h-full shadow-lg dark:shadow-xl transition-colors">
      {/* Header & Filter Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
        <div>
          <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
            Nifty 100 Index Chart
          </h3>
          <p className="text-xs text-slate-500 dark:text-gray-400">Real-time benchmark index performance</p>
        </div>

        {/* Timeframe Buttons */}
        <div className="flex items-center gap-1 bg-slate-100 dark:bg-gray-900/90 p-1 rounded-xl border border-slate-200 dark:border-gray-800 self-start sm:self-auto">
          {timelineFilters.map((tf) => (
            <button
              key={tf}
              onClick={() => setSelectedTimeframe(tf)}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all ${
                selectedTimeframe === tf
                  ? "bg-blue-600 text-white shadow-sm font-bold"
                  : "text-slate-600 dark:text-gray-400 hover:text-slate-900 dark:hover:text-gray-200"
              }`}
            >
              {tf}
            </button>
          ))}
        </div>
      </div>

      {/* Plotly Interactive Line Chart */}
      <div className="w-full h-64 min-h-[240px] relative">
        <Plot
          data={[
            {
              x: data.times,
              y: data.values,
              type: "scatter",
              mode: "lines",
              fill: "tozeroy",
              fillcolor: isDark ? "rgba(59, 130, 246, 0.12)" : "rgba(37, 99, 235, 0.08)",
              line: {
                color: "#2563EB",
                width: 2.5,
                shape: "spline",
              },
              hoverinfo: "x+y",
            },
          ]}
          layout={{
            autosize: true,
            margin: { l: 35, r: 15, t: 10, b: 30 },
            paper_bgcolor: "transparent",
            plot_bgcolor: "transparent",
            xaxis: {
              showgrid: false,
              color: isDark ? "#64748B" : "#475569",
              font: { size: 10, family: "sans-serif" },
            },
            yaxis: {
              showgrid: true,
              gridcolor: isDark ? "rgba(255, 255, 255, 0.05)" : "rgba(0, 0, 0, 0.05)",
              color: isDark ? "#64748B" : "#475569",
              font: { size: 10, family: "sans-serif" },
            },
          }}
          useResizeHandler={true}
          className="w-full h-full"
          config={{ displayModeBar: false, responsive: true }}
        />
      </div>
    </div>
  );
}
