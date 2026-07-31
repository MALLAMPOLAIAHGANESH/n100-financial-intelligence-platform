"use client";

import React from "react";
import Link from "next/link";

interface NewsItem {
  id: number;
  title: string;
  time: string;
  source?: string;
}

const mockNews: NewsItem[] = [
  {
    id: 1,
    title: "RBI maintains repo rate; keeps focus on inflation and growth",
    time: "10m ago",
    source: "Economic Times",
  },
  {
    id: 2,
    title: "India's GDP growth forecast raised to 6.8% for FY25",
    time: "25m ago",
    source: "Bloomberg",
  },
  {
    id: 3,
    title: "Markets rally as global cues turn positive across Asia",
    time: "45m ago",
    source: "Reuters",
  },
];

export default function LatestNewsTicker() {
  return (
    <div className="glass-card p-5 border border-slate-200 dark:border-white/10 flex flex-col justify-between h-full shadow-lg dark:shadow-xl transition-colors">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <span>📰</span> Latest News
        </h3>
        <Link href="/news" className="text-[10px] text-blue-600 dark:text-blue-400 font-semibold hover:underline">
          View All
        </Link>
      </div>

      <div className="space-y-3">
        {mockNews.map((item) => (
          <div
            key={item.id}
            className="p-3 rounded-xl bg-slate-50 dark:bg-gray-900/60 border border-slate-200 dark:border-white/5 hover:border-blue-500/30 transition-all cursor-pointer group shadow-sm"
          >
            <p className="text-xs font-semibold text-slate-800 dark:text-gray-200 group-hover:text-blue-600 dark:group-hover:text-blue-300 transition-colors line-clamp-2">
              {item.title}
            </p>
            <div className="flex justify-between items-center mt-2 text-[10px] text-slate-500 dark:text-gray-500 font-medium">
              <span>{item.source}</span>
              <span className="text-blue-600 dark:text-blue-400 font-bold">{item.time}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
