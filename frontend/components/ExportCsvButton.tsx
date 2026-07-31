"use client";

import React from "react";
import { companyApi } from "@/lib/api";

export default function ExportCsvButton({ ticker }: { ticker: string }) {
  const handleExport = async () => {
    try {
      await companyApi.exportCsv(ticker);
    } catch (err) {
      console.error("CSV export failed", err);
    }
  };

  return (
    <button
      onClick={handleExport}
      className="px-3.5 py-1.5 rounded-xl bg-blue-600/20 text-blue-400 border border-blue-500/30 hover:bg-blue-600/30 font-semibold transition-all text-xs flex items-center gap-1.5"
    >
      📥 Export CSV
    </button>
  );
}
