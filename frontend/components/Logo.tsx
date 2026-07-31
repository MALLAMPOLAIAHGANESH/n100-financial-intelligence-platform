"use client";

import React from "react";

interface LogoProps {
  variant?: "icon" | "horizontal" | "stacked" | "presentation";
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
  theme?: "dark" | "light";
}

export default function Logo({
  variant = "stacked",
  size = "md",
  className = "",
  theme = "dark",
}: LogoProps) {
  const iconSizes = {
    sm: "w-8 h-8",
    md: "w-11 h-11",
    lg: "w-16 h-16",
    xl: "w-32 h-32",
  };

  const textSizes = {
    sm: { title: "text-xs", subtitle: "text-[8px]" },
    md: { title: "text-base", subtitle: "text-[10px]" },
    lg: { title: "text-2xl", subtitle: "text-xs" },
    xl: { title: "text-4xl", subtitle: "text-sm" },
  };

  // SVG Geometric Monogram Icon with Blueprint Construction Lines
  const MonogramIcon = (
    <svg
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full drop-shadow-[0_10px_25px_rgba(37,99,235,0.4)]"
    >
      <defs>
        {/* Main Blue Facet Gradient */}
        <linearGradient id="nPrimary" x1="20" y1="20" x2="180" y2="180" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#60A5FA" />
          <stop offset="45%" stopColor="#3B82F6" />
          <stop offset="80%" stopColor="#2563EB" />
          <stop offset="100%" stopColor="#0B5FFF" />
        </linearGradient>

        {/* Accent Purple Highlight Gradient */}
        <linearGradient id="nAccent" x1="180" y1="20" x2="20" y2="180" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#A78BFA" />
          <stop offset="50%" stopColor="#8B5CF6" />
          <stop offset="100%" stopColor="#7C3AED" />
        </linearGradient>

        {/* Metallic Dark Facet Gradient */}
        <linearGradient id="nDarkFacet" x1="50" y1="50" x2="150" y2="150" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#1E3A8A" />
          <stop offset="100%" stopColor="#091E42" />
        </linearGradient>

        {/* Glass Reflection Highlight */}
        <linearGradient id="nGlassReflect" x1="0" y1="0" x2="200" y2="200" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.6" />
          <stop offset="50%" stopColor="#FFFFFF" stopOpacity="0.1" />
          <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* Blueprint Construction Guide Circles & Lines */}
      <circle cx="100" cy="100" r="85" stroke="#3B82F6" strokeOpacity="0.2" strokeWidth="0.75" strokeDasharray="3 3" />
      <circle cx="100" cy="100" r="60" stroke="#7C3AED" strokeOpacity="0.2" strokeWidth="0.75" />
      <circle cx="100" cy="100" r="35" stroke="#60A5FA" strokeOpacity="0.15" strokeWidth="0.5" />
      <line x1="15" y1="185" x2="185" y2="15" stroke="#3B82F6" strokeOpacity="0.2" strokeWidth="0.75" />
      <line x1="15" y1="15" x2="185" y2="185" stroke="#3B82F6" strokeOpacity="0.15" strokeWidth="0.5" />
      <line x1="100" y1="10" x2="100" y2="190" stroke="#3B82F6" strokeOpacity="0.15" strokeWidth="0.5" strokeDasharray="2 2" />

      {/* Outer Sharp Geometric Geometric 'N' Structure */}
      {/* Left Stem Sharp Facet */}
      <polygon points="40,165 40,35 65,35 65,135" fill="url(#nPrimary)" />
      <polygon points="40,165 65,135 65,165" fill="url(#nDarkFacet)" />

      {/* Upward Diagonal Financial Growth Stem (The Hero Rise) */}
      <polygon points="40,35 65,35 160,165 135,165" fill="url(#nAccent)" />
      <polygon points="65,35 85,35 160,140 160,165" fill="url(#nPrimary)" />

      {/* Right Vertical Stem */}
      <polygon points="135,35 160,35 160,165 135,165" fill="url(#nPrimary)" />

      {/* 3D Glass Metallic Bevel Overlays for High-Tech Reflection */}
      <polygon points="40,35 90,105 75,105 40,55" fill="url(#nGlassReflect)" />
      <polygon points="135,35 160,35 145,165 135,165" fill="url(#nGlassReflect)" />

      {/* Circular Blueprint Intersection Nodes */}
      <circle cx="40" cy="35" r="2.5" fill="#60A5FA" />
      <circle cx="160" cy="35" r="2.5" fill="#A78BFA" />
      <circle cx="160" cy="165" r="2.5" fill="#3B82F6" />
      <circle cx="40" cy="165" r="2.5" fill="#7C3AED" />
      <circle cx="100" cy="100" r="3" fill="#FFFFFF" />
    </svg>
  );

  const titleColor = theme === "dark" ? "text-white" : "text-gray-900";
  const subtitleColor = theme === "dark" ? "text-blue-400" : "text-blue-600";

  if (variant === "icon") {
    return <div className={`${iconSizes[size]} ${className}`}>{MonogramIcon}</div>;
  }

  if (variant === "presentation") {
    return (
      <div className={`flex flex-col items-center justify-center p-12 bg-white rounded-3xl shadow-2xl ${className}`}>
        {/* Centered Large Monogram */}
        <div className="w-48 h-48 mb-8 relative">
          <svg
            viewBox="0 0 200 200"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full filter drop-shadow-[0_20px_40px_rgba(37,99,235,0.35)]"
          >
            <defs>
              <linearGradient id="presPrimary" x1="20" y1="20" x2="180" y2="180" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#3B82F6" />
                <stop offset="60%" stopColor="#2563EB" />
                <stop offset="100%" stopColor="#0B5FFF" />
              </linearGradient>
              <linearGradient id="presAccent" x1="180" y1="20" x2="20" y2="180" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#8B5CF6" />
                <stop offset="100%" stopColor="#7C3AED" />
              </linearGradient>
              <linearGradient id="presDark" x1="50" y1="50" x2="150" y2="150" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#1E3A8A" />
                <stop offset="100%" stopColor="#0F172A" />
              </linearGradient>
            </defs>

            {/* Grid Construction Lines */}
            <circle cx="100" cy="100" r="90" stroke="#0B5FFF" strokeOpacity="0.25" strokeWidth="0.8" strokeDasharray="4 4" />
            <circle cx="100" cy="100" r="65" stroke="#7C3AED" strokeOpacity="0.25" strokeWidth="0.8" />
            <circle cx="100" cy="100" r="40" stroke="#3B82F6" strokeOpacity="0.2" strokeWidth="0.8" />
            <line x1="10" y1="190" x2="190" y2="10" stroke="#0B5FFF" strokeOpacity="0.2" strokeWidth="0.8" />
            <line x1="10" y1="10" x2="190" y2="190" stroke="#0B5FFF" strokeOpacity="0.2" strokeWidth="0.8" />

            {/* Geometric N Geometry */}
            <polygon points="35,170 35,30 65,30 65,135" fill="url(#presPrimary)" />
            <polygon points="35,170 65,135 65,170" fill="url(#presDark)" />
            <polygon points="35,30 65,30 165,170 135,170" fill="url(#presAccent)" />
            <polygon points="65,30 90,30 165,135 165,170" fill="url(#presPrimary)" />
            <polygon points="135,30 165,30 165,170 135,170" fill="url(#presPrimary)" />

            {/* Nodes */}
            <circle cx="35" cy="30" r="3" fill="#2563EB" />
            <circle cx="165" cy="30" r="3" fill="#8B5CF6" />
            <circle cx="165" cy="170" r="3" fill="#0B5FFF" />
            <circle cx="35" cy="170" r="3" fill="#7C3AED" />
            <circle cx="100" cy="100" r="3.5" fill="#3B82F6" />
          </svg>
        </div>

        {/* Typography */}
        <div className="text-center font-sans tracking-tight">
          <h1 className="text-4xl font-black text-[#0B1220] tracking-tighter uppercase flex items-center justify-center gap-1">
            NIFTY100<span className="text-xs text-blue-600 font-extrabold -mt-4">®</span>
          </h1>
          <div className="flex items-center justify-center gap-3 mt-2">
            <span className="h-[1px] w-8 bg-blue-600/40" />
            <p className="text-xs font-black tracking-[0.35em] text-blue-600 uppercase">
              FINANCIAL INTELLIGENCE
            </p>
            <span className="h-[1px] w-8 bg-blue-600/40" />
          </div>
        </div>
      </div>
    );
  }

  if (variant === "horizontal") {
    return (
      <div className={`flex items-center gap-3 ${className}`}>
        <div className={iconSizes[size]}>{MonogramIcon}</div>
        <div>
          <h1 className={`${textSizes[size].title} font-black tracking-tight ${titleColor} leading-none`}>
            NIFTY100
          </h1>
          <p className={`${textSizes[size].subtitle} font-bold tracking-[0.2em] ${subtitleColor} uppercase mt-0.5`}>
            FINANCIAL INTELLIGENCE
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={`flex flex-col items-center text-center ${className}`}>
      <div className={`${iconSizes[size]} mb-2`}>{MonogramIcon}</div>
      <h1 className={`${textSizes[size].title} font-black tracking-tight ${titleColor} leading-none`}>
        NIFTY100
      </h1>
      <p className={`${textSizes[size].subtitle} font-bold tracking-[0.25em] ${subtitleColor} uppercase mt-1`}>
        FINANCIAL INTELLIGENCE
      </p>
    </div>
  );
}
