"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useTheme } from "@/context/ThemeContext";
import Logo from "@/components/Logo";

interface NavItem {
  name: string;
  href: string;
  icon: string;
  badge?: string;
}

const navItems: NavItem[] = [
  { name: "Dashboard", href: "/dashboard", icon: "📊" },
  { name: "Market Overview", href: "/markets", icon: "🌐" },
  { name: "Companies", href: "/companies", icon: "🏢" },
  { name: "Financials", href: "/company/TCS", icon: "📈" },
  { name: "Ratios", href: "/company/TCS#ratios", icon: "🔢" },
  { name: "Screener", href: "/screener", icon: "🔍", badge: "AI" },
  { name: "Peers", href: "/peers", icon: "👥" },
  { name: "Portfolio", href: "/portfolio", icon: "💼" },
  { name: "Reports", href: "/reports", icon: "📄" },
  { name: "AI Insights", href: "/ai-insights", icon: "⚡", badge: "PRO" },
  { name: "Watchlist", href: "/watchlist", icon: "⭐" },
  { name: "Alerts", href: "/alerts", icon: "🔔" },
  { name: "News", href: "/news", icon: "📰" },
  { name: "Settings", href: "/settings", icon: "⚙️" },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const { theme } = useTheme();

  return (
    <aside className="w-64 bg-slate-50 dark:bg-[#0B1220] border-r border-slate-200 dark:border-gray-800/60 flex flex-col justify-between h-screen sticky top-0 z-40 select-none transition-colors">
      {/* Top Header & Search */}
      <div className="p-4 space-y-4">
        {/* Brand Logo */}
        <Link href="/dashboard" className="flex items-center gap-3 px-2 py-1 hover:opacity-95 transition-opacity">
          <Logo variant="horizontal" size="md" theme={theme === "dark" ? "dark" : "light"} />
        </Link>

        {/* Global Search Bar */}
        <div className="relative">
          <input
            type="text"
            placeholder="Search anything..."
            className="w-full pl-8 pr-10 py-2 rounded-xl bg-white dark:bg-gray-900/80 border border-slate-200 dark:border-gray-800/80 text-xs text-slate-800 dark:text-gray-200 placeholder-slate-400 dark:placeholder-gray-500 focus:outline-none focus:border-blue-600 transition-all shadow-sm"
          />
          <kbd className="absolute right-2.5 top-1/2 -translate-y-1/2 px-1.5 py-0.5 rounded bg-slate-100 dark:bg-gray-800 text-[10px] font-bold text-slate-500 dark:text-gray-400 border border-slate-200 dark:border-gray-700">
            ⌘K
          </kbd>
        </div>

        {/* Navigation Items */}
        <nav className="space-y-1 overflow-y-auto max-h-[calc(100vh-230px)] scrollbar-thin pr-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href || (item.href !== "/dashboard" && pathname?.startsWith(item.href));
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all relative ${
                  isActive
                    ? "bg-blue-50 dark:bg-blue-600/30 text-blue-600 dark:text-white border border-blue-200 dark:border-blue-500/40 shadow-sm font-bold"
                    : "text-slate-600 dark:text-gray-400 hover:text-slate-900 dark:hover:text-gray-100 hover:bg-slate-100 dark:hover:bg-gray-800/50"
                }`}
              >
                {isActive && (
                  <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 bg-blue-600 rounded-r-full shadow-sm" />
                )}
                <div className="flex items-center gap-3">
                  <span className={`text-base ${isActive ? "text-blue-600 dark:text-blue-400" : "text-slate-400 dark:text-gray-400"}`}>
                    {item.icon}
                  </span>
                  <span>{item.name}</span>
                </div>
                {item.badge && (
                  <span className="text-[9px] font-extrabold tracking-wider uppercase px-1.5 py-0.5 rounded-md bg-blue-100 dark:bg-blue-500/20 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-500/30">
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Bottom Profile Badge */}
      <div className="p-4 border-t border-slate-200 dark:border-gray-800/60 bg-white dark:bg-[#070c17]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full gradient-bg flex items-center justify-center text-xs font-bold text-white shadow">
              {user?.email ? user.email.charAt(0).toUpperCase() : "G"}
            </div>
            <div className="overflow-hidden">
              <p className="text-xs font-semibold text-slate-900 dark:text-white truncate max-w-[110px]">
                {user?.email ? user.email.split("@")[0] : "Ganesh P"}
              </p>
              <p className="text-[10px] text-blue-600 dark:text-blue-400 font-medium">Premium Plan</p>
            </div>
          </div>
          <button
            onClick={logout}
            title="Logout"
            className="p-1.5 rounded-lg text-slate-400 dark:text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors text-xs cursor-pointer"
          >
            🚪
          </button>
        </div>
      </div>
    </aside>
  );
}
