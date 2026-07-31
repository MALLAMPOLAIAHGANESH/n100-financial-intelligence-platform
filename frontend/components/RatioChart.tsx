"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";

const Plot = dynamic(() => import("react-plotly.js"), { ssr: false });

const mockRatioData = {
  times: ["2020", "2021", "2022", "2023", "2024"],
  values: [15.2, 17.8, 19.3, 21.5, 23.1]
};

export default function RatioChart() {
  const [data] = useState(mockRatioData);

  return (
    <div className="glass-card p-5 border border-white/5 flex flex-col justify-between h-full">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-bold text-white">Key Ratio Trend</h3>
        <p className="text-xs text-gray-400">ROE over years</p>
      </div>
      <div className="w-full h-56 min-h-[220px] relative">
        <Plot
          data={[
            {
              x: data.times,
              y: data.values,
              type: "scatter",
              mode: "lines+markers",
              line: { color: "#10B981", shape: "spline" },
              marker: { color: "#10B981" },
              hoverinfo: "x+y",
            },
          ]}
          layout={{
            autosize: true,
            margin: { l: 30, r: 15, t: 10, b: 30 },
            paper_bgcolor: "transparent",
            plot_bgcolor: "transparent",
            xaxis: { showgrid: false, color: "#64748B", tickfont: { size: 10 } },
            yaxis: { showgrid: true, gridcolor: "rgba(255,255,255,0.05)", color: "#64748B", tickfont: { size: 10 } },
          }}
          useResizeHandler={true}
          className="w-full h-full"
          config={{ displayModeBar: false, responsive: true }}
        />
      </div>
    </div>
  );
}
