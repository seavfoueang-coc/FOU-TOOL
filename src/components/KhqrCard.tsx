import React, { useState, useEffect } from 'react';
import { Maximize2, X, Check, Copy, QrCode } from 'lucide-react';
import { Language, TRANSLATIONS } from '../i18n/translations';

interface KhqrCardProps {
  darkMode: boolean;
  lang: Language;
}

export const KhqrCard: React.FC<KhqrCardProps> = ({ darkMode, lang }) => {
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [imageSrc, setImageSrc] = useState<string>('/khqr.jpg');
  const t = TRANSLATIONS[lang];
  const isKm = lang === 'km';

  // Candidate image sources with GitHub raw fallback
  const sources = [
    '/khqr.jpg',
    '/khqr.png',
    'https://raw.githubusercontent.com/seavfoueang-coc/HONGGUA-DL/main/public/khqr.jpg',
    'https://raw.githubusercontent.com/seavfoueang-coc/HONGGUA-DL/main/public/khqr.png'
  ];

  const handleImageError = () => {
    const currentIndex = sources.indexOf(imageSrc);
    if (currentIndex < sources.length - 1) {
      setImageSrc(sources[currentIndex + 1]);
    }
  };

  const handleCopyName = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText('SEAVFOU EANG');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Close full screen on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsFullScreen(false);
      }
    };
    if (isFullScreen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isFullScreen]);

  return (
    <div className="w-full flex flex-col items-center">
      {/* KHQR Card Stand (Click to open full screen) */}
      <div 
        onClick={() => setIsFullScreen(true)}
        className="relative w-full max-w-[280px] rounded-2xl overflow-hidden bg-white shadow-2xl border-2 border-slate-200 cursor-pointer group transition-all duration-200 hover:scale-[1.02] hover:shadow-[#c6f135]/20"
        title={isKm ? 'ចុចដើម្បីពង្រីកពេញអេក្រង់' : 'Click to open full screen'}
      >
        <img 
          src={imageSrc} 
          alt="SEAVFOU EANG KHQR" 
          onError={handleImageError}
          className="w-full h-auto object-contain block select-none"
        />

        {/* Hover Hint */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white text-xs font-semibold gap-1.5 transition-opacity backdrop-blur-[1px]">
          <Maximize2 className="w-4 h-4 text-[#c6f135]" />
          <span>{t.openKhqrFullScreen}</span>
        </div>
      </div>

      {/* Action Button: Open KHQR Full Screen */}
      <div className="mt-3.5 flex flex-col items-center gap-1.5 w-full max-w-[280px]">
        <button
          onClick={() => setIsFullScreen(true)}
          className="w-full py-2.5 px-4 text-xs font-bold rounded-xl bg-[#141b26] hover:bg-[#1b2536] text-[#c6f135] border border-[#243348] hover:border-[#c6f135]/50 flex items-center justify-center gap-2 transition-all shadow-md active:scale-95 cursor-pointer"
        >
          <Maximize2 className="w-4 h-4 text-[#c6f135]" />
          <span>{t.openKhqrFullScreen}</span>
        </button>

        <p className="text-[11px] text-slate-400 text-center leading-tight font-sans mt-1">
          {isKm 
            ? 'ស្កេនតាម ABA Mobile, Bakong, Wing, ACLEDA ឬគ្រប់ធនាគារក្នុងស្រុក'
            : 'Scan via ABA Mobile, Bakong, Wing, ACLEDA, or any local bank'}
        </p>
      </div>

      {/* Full-Screen Lightbox Modal */}
      {isFullScreen && (
        <div 
          onClick={() => setIsFullScreen(false)}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
        >
          {/* Top Bar with Close button */}
          <div className="w-full max-w-md flex items-center justify-between mb-3 px-1 text-white">
            <div className="flex items-center gap-2">
              <QrCode className="w-5 h-5 text-[#c6f135]" />
              <span className="text-sm font-bold font-mono text-slate-200">SEAVFOU EANG · KHQR</span>
            </div>

            <button
              onClick={() => setIsFullScreen(false)}
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors"
              title="Close (Esc)"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Full Screen Image Container */}
          <div 
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-sm sm:max-w-md w-full bg-white rounded-3xl overflow-hidden shadow-2xl border-4 border-slate-700/50 flex flex-col items-center"
          >
            <img 
              src={imageSrc} 
              alt="SEAVFOU EANG KHQR Stand" 
              onError={handleImageError}
              className="w-full h-auto object-contain max-h-[75vh]"
            />

            {/* In-Modal Bottom Bar */}
            <div className="w-full bg-[#0d131f] border-t border-[#1e2a3c] p-3 flex items-center justify-between gap-2">
              <span className="text-xs font-mono text-slate-300 font-bold">
                SEAVFOU EANG
              </span>

              <button
                onClick={handleCopyName}
                className="px-3 py-1.5 text-xs font-bold rounded-lg bg-[#192435] hover:bg-[#223147] text-slate-200 border border-[#2a3a50] flex items-center gap-1.5 transition-all active:scale-95"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-[#c6f135]" />}
                <span>{copied ? (isKm ? 'បានចម្លង!' : 'Copied!') : (isKm ? 'ចម្លងឈ្មោះ' : 'Copy Name')}</span>
              </button>
            </div>
          </div>

          <p className="text-xs text-slate-400 mt-3 text-center">
            {isKm ? 'ចុចទីតាំងណាក៏បាន ឬចុច Esc ដើម្បីបិទ' : 'Tap anywhere or press Esc to close'}
          </p>
        </div>
      )}
    </div>
  );
};
