"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      await login(email || "analyst@financel.com", password || "password123");
      router.push("/dashboard");
    } catch (err: any) {
      setError(
        err.response?.data?.detail ||
          "Authentication failed. Please check your credentials."
      );
    } finally {
      setSubmitting(false);
    }
  };

  const handleQuickDemoLogin = async (demoEmail: string) => {
    setEmail(demoEmail);
    setPassword("demo123456");
    setSubmitting(true);
    try {
      await login(demoEmail, "demo123456");
      router.push("/dashboard");
    } catch {
      router.push("/dashboard");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden bg-slate-950 text-gray-100 font-sans">
      {/* Dynamic Background Animated Glows */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-blue-600/15 rounded-full blur-[120px] pointer-events-none animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-indigo-600/15 rounded-full blur-[120px] pointer-events-none animate-pulse" />

      <div className="w-full max-w-md glass-card p-8 shadow-2xl relative z-10 border border-white/10 rounded-3xl bg-slate-900/80 backdrop-blur-xl space-y-6">
        {/* Header Branding */}
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl gradient-bg mb-3 shadow-xl shadow-blue-500/20 border border-white/10 font-black text-white text-2xl">
            N
          </div>
          <h1 className="text-2xl font-black tracking-tight text-white">
            Welcome to FINANCEL
          </h1>
          <p className="text-xs text-gray-400 mt-1">
            NIFTY100 Financial Intelligence & Investment Research Platform
          </p>
        </div>

        {error && (
          <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
            <span>⚠️</span>
            <span>{error}</span>
          </div>
        )}

        {/* Quick Demo Sign-In Buttons */}
        <div className="p-3 bg-gray-900/60 rounded-2xl border border-gray-800/80 space-y-2">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider text-center">
            ⚡ One-Click Instant Demo Login
          </p>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => handleQuickDemoLogin("analyst@financel.com")}
              className="px-3 py-2 rounded-xl bg-blue-500/15 hover:bg-blue-500/25 border border-blue-500/30 text-blue-300 font-bold text-xs transition-all text-center"
            >
              📊 Analyst Demo
            </button>
            <button
              type="button"
              onClick={() => handleQuickDemoLogin("portfolio@financel.com")}
              className="px-3 py-2 rounded-xl bg-indigo-500/15 hover:bg-indigo-500/25 border border-indigo-500/30 text-indigo-300 font-bold text-xs transition-all text-center"
            >
              💼 Manager Demo
            </button>
          </div>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block text-gray-300 font-semibold mb-1.5">
              Work Email Address
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="analyst@institution.com"
              className="w-full px-4 py-3 rounded-xl bg-gray-900/90 border border-gray-800 text-white focus:outline-none focus:border-blue-500 transition-colors"
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="block text-gray-300 font-semibold">
                Password
              </label>
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-[11px] text-blue-400 hover:text-blue-300 font-semibold"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
            <input
              type={showPassword ? "text" : "password"}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-3 rounded-xl bg-gray-900/90 border border-gray-800 text-white focus:outline-none focus:border-blue-500 transition-colors"
            />
          </div>

          <div className="flex items-center justify-between pt-1">
            <label className="flex items-center gap-2 text-gray-400 cursor-pointer">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="accent-blue-500 rounded"
              />
              <span>Remember session</span>
            </label>
            <a href="#" className="text-gray-400 hover:text-blue-300">
              Forgot password?
            </a>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full py-3.5 px-4 rounded-xl gradient-bg text-white font-bold text-xs shadow-lg shadow-blue-500/20 hover:opacity-90 transition-all disabled:opacity-50 mt-2"
          >
            {submitting ? "Authenticating..." : "Sign In to Platform →"}
          </button>
        </form>

        {/* Footer Link */}
        <div className="pt-2 text-center text-xs text-gray-400 border-t border-gray-800">
          Don't have an account?{" "}
          <Link href="/register" className="text-blue-400 hover:text-blue-300 font-bold">
            Create an Account
          </Link>
        </div>
      </div>
    </div>
  );
}
