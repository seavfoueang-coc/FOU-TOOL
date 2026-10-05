import React, { useState } from 'react';

interface HongguoLogoProps {
  className?: string;
  size?: number | string;
  showText?: boolean;
}

export const HongguoLogo: React.FC<HongguoLogoProps> = ({
  className = '',
  size = 40,
  showText = false,
}) => {
  const [useFallbackSvg, setUseFallbackSvg] = useState(false);

  return (
    <div className={`inline-flex flex-col items-center select-none ${className}`}>
      {/* 
        User logo in /public:
        Directly loads "/hongguo-dl-logo.png" (or /hongguo-logo.png) from the public folder.
        If the user hasn't dropped their custom file into /public yet, it seamlessly falls back to the vector SVG.
      */}
      {!useFallbackSvg ? (
        <img
          src="/hongguo-dl-logo.png"
          alt="HONGGUO DL"
          style={{ width: size, height: size }}
          className="shrink-0 object-contain drop-shadow-[0_4px_12px_rgba(198,241,53,0.3)] rounded-lg"
          referrerPolicy="no-referrer"
          onError={() => setUseFallbackSvg(true)}
        />
      ) : (
        <svg
          width={size}
          height={size}
          viewBox="0 0 200 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="shrink-0 drop-shadow-[0_4px_12px_rgba(198,241,53,0.3)]"
        >
          <defs>
            <linearGradient id="hgLimeGrad" x1="20" y1="20" x2="180" y2="180" gradientUnits="userSpaceOnUse">
              <stop stopColor="#d8ff43" />
              <stop offset="1" stopColor="#b4e41f" />
            </linearGradient>
            <filter id="hgGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#000000" floodOpacity="0.8" />
            </filter>
          </defs>

          {/* Film Strip Left Border */}
          <g fill="#ffffff" opacity="0.95">
            <path d="M 28 65 C 28 62 31 60 34 60 L 40 60 L 40 140 L 34 140 C 31 140 28 138 28 135 Z" fill="#1b2433" />
            <rect x="30" y="68" width="7" height="15" rx="2" fill="#ffffff" />
            <rect x="30" y="92" width="7" height="15" rx="2" fill="#ffffff" />
            <rect x="30" y="116" width="7" height="15" rx="2" fill="#ffffff" />
          </g>

          {/* Film Strip Right Border */}
          <g fill="#ffffff" opacity="0.95">
            <path d="M 172 65 C 172 62 169 60 166 60 L 160 60 L 160 140 L 166 140 C 169 140 172 138 172 135 Z" fill="#1b2433" />
            <rect x="163" y="68" width="7" height="15" rx="2" fill="#ffffff" />
            <rect x="163" y="92" width="7" height="15" rx="2" fill="#ffffff" />
            <rect x="163" y="116" width="7" height="15" rx="2" fill="#ffffff" />
          </g>

          {/* Outer Dark Hexagon Backing */}
          <path
            d="M 100 18 L 158 52 L 158 148 L 100 182 L 42 148 L 42 52 Z"
            fill="#0c1017"
            stroke="#1f2c3d"
            strokeWidth="3"
          />

          {/* Hexagon Letter H (Lime Green) */}
          <path
            d="M 46 56 L 94 30 L 94 92 L 62 92 L 62 110 L 94 110 L 94 170 L 46 144 Z"
            fill="url(#hgLimeGrad)"
            stroke="#0a0e14"
            strokeWidth="4"
            strokeLinejoin="round"
          />

          {/* Inner H Cutout */}
          <path d="M 62 70 L 78 61 L 78 82 L 62 82 Z" fill="#0c1017" />
          <path d="M 62 120 L 78 120 L 78 139 L 62 130 Z" fill="#0c1017" />

          {/* Hexagon Letter G (Lime Green) */}
          <path
            d="M 106 30 L 154 56 L 154 144 L 106 170 L 106 130 L 138 114 L 138 100 L 120 100 L 120 86 L 154 70 L 154 56 Z"
            fill="url(#hgLimeGrad)"
            stroke="#0a0e14"
            strokeWidth="4"
            strokeLinejoin="round"
          />

          {/* G Bottom Curve Solid Body */}
          <path
            d="M 106 130 L 106 170 L 154 144 L 154 100 L 126 100 L 126 114 L 138 114 L 138 134 L 106 150 Z"
            fill="url(#hgLimeGrad)"
            stroke="#0a0e14"
            strokeWidth="3"
          />

          {/* White Downward Download Arrow (Inside G) */}
          <g filter="url(#hgGlow)">
            <path
              d="M 124 72 L 134 72 L 134 86 L 142 86 L 129 100 L 116 86 L 124 86 Z"
              fill="#ffffff"
              stroke="#0a0e14"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
          </g>
        </svg>
      )}

      {showText && (
        <span className="mt-1 font-black text-xs tracking-wider text-white uppercase drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
          HONGGUO DL
        </span>
      )}
    </div>
  );
};
