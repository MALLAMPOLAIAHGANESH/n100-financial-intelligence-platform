"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const { register } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }

    setSubmitting(true);
    try {
      await register(email, password);
      router.push("/dashboard");
    } catch (err: any) {
      setError(
        err.response?.data?.detail ||
          "Registration failed. Email may already be in use."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden bg-[#090d16]">
      {/* Background Glow Effects */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-cyan-600/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-indigo-600/15 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md glass-card p-8 shadow-2xl relative z-10 border border-white/10">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl gradient-bg mb-3 shadow-lg shadow-indigo-500/30">
            <span className="text-xl font-bold text-white">F</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-white">
            Create Account
          </h1>
          <p className="text-sm text-gray-400 mt-1">
            Join <span className="gradient-text font-semibold">FINANCEL</span> Intelligence Platform
          </p>
        </div>

        {error && (
          <div className="mb-6 p-3.5 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm flex items-start gap-2">
            <svg className="w-5 h-5 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-medium text-gray-300 uppercase tracking-wider mb-2">
              Email Address
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@company.com"
              className="w-full px-4 py-3 rounded-lg bg-gray-900/80 border border-gray-800 text-gray-100 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-300 uppercase tracking-wider mb-2">
              Password (min. 8 characters)
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-3 rounded-lg bg-gray-900/80 border border-gray-800 text-gray-100 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-300 uppercase tracking-wider mb-2">
              Confirm Password
            </label>
            <input
              type="password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-3 rounded-lg bg-gray-900/80 border border-gray-800 text-gray-100 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors text-sm"
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full py-3 px-4 rounded-lg gradient-bg text-white font-medium text-sm shadow-lg shadow-indigo-600/30 hover:opacity-95 transition-all disabled:opacity-50"
          >
            {submitting ? "Creating Account..." : "Register & Continue"}
          </button>
        </form>

        <div className="mt-6 pt-5 border-t border-gray-800 text-center text-xs text-gray-400">
          Already have an account?{" "}
          <Link href="/login" className="text-indigo-400 hover:text-indigo-300 font-medium">
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}
