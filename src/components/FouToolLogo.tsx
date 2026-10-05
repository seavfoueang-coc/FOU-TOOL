import React, { useState } from 'react';

interface FouToolLogoProps {
  className?: string;
  size?: number | string;
  showText?: boolean;
}

export const FouToolLogo: React.FC<FouToolLogoProps> = ({
  className = '',
  size = 36,
  showText = true,
}) => {
  const [logoSrc, setLogoSrc] = useState('/title.jpn');
  const [useFallbackSvg, setUseFallbackSvg] = useState(false);

  const handleImgError = () => {
    if (logoSrc === '/title.jpn') {
      setLogoSrc('/title.jpg');
    } else if (logoSrc === '/title.jpg') {
      setLogoSrc('/title.png');
    } else if (logoSrc === '/title.png') {
      setLogoSrc('/image.png');
    } else {
      setUseFallbackSvg(true);
    }
  };

  return (
    <div className={`inline-flex items-center gap-2.5 select-none ${className}`}>
      {/* 
        User logo in /public:
        Directly loads "/title.jpn" (or "/title.jpg") from GitHub / public folder.
        If the user has placed their image file into /public, it displays immediately!
      */}
      <div 
        style={{ width: size, height: size }}
        className="relative shrink-0 rounded-xl overflow-hidden bg-gradient-to-b from-[#162030] to-[#0b1019] border border-[#2b3d56] shadow-lg flex items-center justify-center p-0.5"
      >
        {!useFallbackSvg ? (
          <img
            src={logoSrc}
            alt="FOU TOOL"
            className="w-full h-full object-cover rounded-lg"
            referrerPolicy="no-referrer"
            onError={handleImgError}
          />
        ) : (
          <svg
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full"
          >
            {/* Background gradient */}
            <rect width="100" height="100" rx="14" fill="#0d1420" />

            {/* Floating Python Logo on top-left */}
            <path d="M 16 16 C 16 13 18 11 21 11 L 27 11 C 30 11 32 13 32 16 L 32 20 L 22 20 C 18 20 16 22 16 26 Z" fill="#387eb8" />
            <circle cx="21" cy="14" r="1.2" fill="#ffffff" />
            <path d="M 32 24 C 32 27 30 29 27 29 L 21 29 C 18 29 16 27 16 24 L 16 20 L 26 20 C 30 20 32 18 32 14 Z" fill="#ffe052" />
            <circle cx="27" cy="26" r="1.2" fill="#ffffff" />

            {/* Floating VS Code Ribbon */}
            <path d="M 35 27 L 42 22 L 40 33 Z" fill="#007acc" />
            <path d="M 42 22 L 35 34 L 38 36 L 44 30 Z" fill="#1f9cf0" />

            {/* 404 Error badge */}
            <rect x="52" y="10" width="38" height="12" rx="4" fill="#121a27" stroke="#334661" strokeWidth="1" />
            <text x="71" y="19" fill="#ffffff" fontSize="7" fontWeight="bold" fontFamily="monospace" textAnchor="middle">
              404 error
            </text>

            {/* Cat Ears */}
            <polygon points="32,45 22,26 42,34" fill="#c49a6c" stroke="#875c34" strokeWidth="1.5" />
            <polygon points="30,42 25,30 38,36" fill="#f4b8bb" />
            <polygon points="68,45 78,26 58,34" fill="#c49a6c" stroke="#875c34" strokeWidth="1.5" />
            <polygon points="70,42 75,30 62,36" fill="#f4b8bb" />

            {/* Cat Head */}
            <ellipse cx="50" cy="52" rx="26" ry="22" fill="#f8f1e5" stroke="#9a7147" strokeWidth="1.5" />
            {/* Fur pattern on forehead */}
            <path d="M 46 34 L 50 42 L 54 34" stroke="#a7794e" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M 42 36 L 46 44" stroke="#a7794e" strokeWidth="1.2" strokeLinecap="round" />
            <path d="M 58 36 L 54 44" stroke="#a7794e" strokeWidth="1.2" strokeLinecap="round" />

            {/* Big Round Glasses */}
            <circle cx="39" cy="50" r="10.5" fill="#ffffff" fillOpacity="0.15" stroke="#1f242e" strokeWidth="2.2" />
            <circle cx="61" cy="50" r="10.5" fill="#ffffff" fillOpacity="0.15" stroke="#1f242e" strokeWidth="2.2" />
            <path d="M 49.5 50 Q 50 47 50.5 50" stroke="#1f242e" strokeWidth="2.2" fill="none" />

            {/* Cat Eyes */}
            <ellipse cx="39" cy="50" rx="3.5" ry="4.5" fill="#1b2318" />
            <circle cx="40.5" cy="48" r="1.2" fill="#ffffff" />
            <ellipse cx="61" cy="50" rx="3.5" ry="4.5" fill="#1b2318" />
            <circle cx="62.5" cy="48" r="1.2" fill="#ffffff" />

            {/* Pink Nose & Whiskers */}
            <polygon points="50,56 47,53 53,53" fill="#f7989d" />
            <path d="M 50 56 Q 47 60 43 59 M 50 56 Q 53 60 57 59" stroke="#5a3d24" strokeWidth="1.2" fill="none" />
            <path d="M 33 54 L 18 53 M 32 57 L 19 60 M 67 54 L 82 53 M 68 57 L 81 60" stroke="#a7794e" strokeWidth="0.8" opacity="0.8" />

            {/* Red Patterned Bowtie */}
            <polygon points="50,68 40,64 42,74 50,70" fill="#c02626" />
            <polygon points="50,68 60,64 58,74 50,70" fill="#c02626" />
            <circle cx="50" cy="69" r="2.5" fill="#e11d48" />

            {/* Laptop Lid & Keyboard */}
            <polygon points="20,92 80,92 72,78 28,78" fill="#1e293b" stroke="#334155" strokeWidth="1" />
            <line x1="32" y1="83" x2="68" y2="83" stroke="#475569" strokeWidth="1" strokeDasharray="3 2" />
            <line x1="28" y1="87" x2="72" y2="87" stroke="#475569" strokeWidth="1" strokeDasharray="3 2" />

            {/* Cat Paws on Laptop */}
            <ellipse cx="36" cy="78" rx="5" ry="3.5" fill="#f8f1e5" stroke="#9a7147" strokeWidth="1" />
            <ellipse cx="64" cy="78" rx="5" ry="3.5" fill="#f8f1e5" stroke="#9a7147" strokeWidth="1" />

            {/* Linux Tux Penguin Sticker on Laptop */}
            <ellipse cx="78" cy="80" rx="3.5" ry="5.5" fill="#0f172a" />
            <ellipse cx="78" cy="81" rx="2" ry="3.5" fill="#ffffff" />
            <ellipse cx="78" cy="77" rx="1.5" ry="1" fill="#f59e0b" />
          </svg>
        )}

        {/* Online Indicator */}
        <span className="absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full bg-[#c6f135] ring-2 ring-[#0a0d14]" />
      </div>

      {showText && (
        <div className="shrink-0 text-left">
          <div className="text-sm sm:text-base font-black tracking-tight leading-none text-white flex items-center gap-1.5">
            <span>FOU</span>
            <span className="text-[#c6f135] font-extrabold">TOOL</span>
          </div>
          <div className="text-[10px] font-mono text-slate-400 leading-none mt-0.5">
            by Seavfou Eang
          </div>
        </div>
      )}
    </div>
  );
};
