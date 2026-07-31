"use client";

import React, { useState } from "react";
import Sidebar from "@/components/layout/Sidebar";
import { useAuth } from "@/context/AuthContext";

export default function SettingsPage() {
  const { user } = useAuth();
  const [fullName, setFullName] = useState("Mallam Polaiah Ganesh");
  const [jobTitle, setJobTitle] = useState("Senior Equity Research Analyst");
  const [email, setEmail] = useState(user?.email || "admin1@gmail.com");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [apiKey, setApiKey] = useState("fn_live_8943729857912489");
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [keyGenerated, setKeyGenerated] = useState(false);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const handleGenerateKey = () => {
    const newKey = `fn_live_${Math.random().toString(36).substring(2, 18)}`;
    setApiKey(newKey);
    setKeyGenerated(true);
    setTimeout(() => setKeyGenerated(false), 3000);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-[#050816] text-slate-900 dark:text-gray-100 flex font-sans transition-colors duration-300">
      <Sidebar />

      <main className="flex-1 p-6 space-y-6 overflow-y-auto max-h-screen scrollbar-thin">
        {/* Header Block */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
              <span>👤</span> Profile & Account Settings
            </h1>
            <p className="text-xs text-gray-400">
              Manage personal credentials, professional role, API keys, and platform security.
            </p>
          </div>

          {savedSuccess && (
            <div className="px-3.5 py-1.5 rounded-xl bg-emerald-500/20 text-emerald-400 font-bold text-xs border border-emerald-500/30 flex items-center gap-1.5 animate-pulse">
              <span>✅</span> Profile changes saved!
            </div>
          )}
        </div>

        {/* Profile Card Header */}
        <div className="glass-card p-6 border border-white/5 rounded-2xl bg-slate-900/60 backdrop-blur-md flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl gradient-bg flex items-center justify-center font-black text-white text-2xl shadow-xl shadow-blue-500/20 border border-white/10">
              {fullName.split(" ").map((n) => n[0]).join("")}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-black text-white">{fullName}</h2>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 border border-blue-500/30">
                  {jobTitle}
                </span>
              </div>
              <p className="text-xs text-gray-400 mt-1">{email}</p>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  Institutional Pro Member
                </span>
                <span className="text-[10px] text-gray-500">Member since 2024</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* 1. Personal Information Form */}
          <div className="lg:col-span-7 glass-card p-6 border border-white/5 rounded-2xl bg-slate-900/60 backdrop-blur-md space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <span>📝</span> Personal Information
            </h3>

            <form onSubmit={handleSaveProfile} className="space-y-4 text-xs">
              <div>
                <label className="text-gray-400 font-medium block mb-1">Full Name</label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-gray-900/80 border border-gray-800 text-white focus:outline-none focus:border-blue-500 transition-colors"
                />
              </div>

              <div>
                <label className="text-gray-400 font-medium block mb-1">Job Title / Role</label>
                <input
                  type="text"
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-gray-900/80 border border-gray-800 text-white focus:outline-none focus:border-blue-500 transition-colors"
                />
              </div>

              <div>
                <label className="text-gray-400 font-medium block mb-1">Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-gray-900/80 border border-gray-800 text-white focus:outline-none focus:border-blue-500 transition-colors"
                />
              </div>

              <hr className="border-gray-800 my-2" />

              <h4 className="text-xs font-bold text-gray-300 pt-1">Change Security Password</h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-gray-400 font-medium block mb-1">Current Password</label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl bg-gray-900/80 border border-gray-800 text-white focus:outline-none focus:border-blue-500 transition-colors"
                  />
                </div>
                <div>
                  <label className="text-gray-400 font-medium block mb-1">New Password</label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl bg-gray-900/80 border border-gray-800 text-white focus:outline-none focus:border-blue-500 transition-colors"
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl gradient-bg text-xs font-bold text-white shadow-md shadow-blue-500/20 hover:opacity-90 transition-all"
                >
                  Save Profile Updates
                </button>
              </div>
            </form>
          </div>

          {/* 2. Developer API Keys & Credentials */}
          <div className="lg:col-span-5 space-y-6">
            <div className="glass-card p-6 border border-white/5 rounded-2xl bg-slate-900/60 backdrop-blur-md space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <span>🔑</span> Developer API Key
                </h3>
                {keyGenerated && (
                  <span className="text-[10px] text-emerald-400 font-bold">New key generated!</span>
                )}
              </div>
              <p className="text-xs text-gray-400 leading-relaxed">
                Use your Personal API Token to authenticate programmatic REST API requests to the ratio engine.
              </p>

              <div className="space-y-2 text-xs">
                <label className="text-gray-400 font-medium block">Active REST Token</label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    readOnly
                    value={apiKey}
                    className="w-full px-3 py-2 rounded-xl bg-gray-900 border border-gray-800 font-mono text-cyan-400 text-xs"
                  />
                  <button
                    onClick={() => navigator.clipboard.writeText(apiKey)}
                    className="px-3 py-2 rounded-xl bg-gray-800 text-gray-300 font-bold hover:bg-gray-700 transition-colors"
                  >
                    Copy
                  </button>
                </div>
              </div>

              <button
                onClick={handleGenerateKey}
                className="w-full py-2 rounded-xl bg-blue-600/20 text-blue-300 font-bold text-xs border border-blue-500/30 hover:bg-blue-600/30 transition-all"
              >
                🔄 Roll / Regenerate Token
              </button>
            </div>

            {/* Notification Preferences */}
            <div className="glass-card p-6 border border-white/5 rounded-2xl bg-slate-900/60 backdrop-blur-md space-y-4">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <span>🔔</span> Alert Channels
              </h3>
              <div className="space-y-3 text-xs">
                <label className="flex items-center justify-between text-gray-300 cursor-pointer">
                  <span>Q4 Earnings Teardown Email Digest</span>
                  <input type="checkbox" defaultChecked className="accent-blue-500 rounded" />
                </label>
                <label className="flex items-center justify-between text-gray-300 cursor-pointer">
                  <span>Altman Z Insolvency Distress Alerts</span>
                  <input type="checkbox" defaultChecked className="accent-blue-500 rounded" />
                </label>
                <label className="flex items-center justify-between text-gray-300 cursor-pointer">
                  <span>Weekly Sector Median Summary</span>
                  <input type="checkbox" className="accent-blue-500 rounded" />
                </label>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
