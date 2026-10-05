import React from 'react';
import { Download, Monitor, Heart, ShieldCheck } from 'lucide-react';
import { Language, TRANSLATIONS } from '../i18n/translations';

interface HeroProps {
  darkMode: boolean;
  onOpenDownloadModal: () => void;
  onJumpToSimulator: () => void;
  lang: Language;
}

export const Hero: React.FC<HeroProps> = ({
  darkMode,
  onOpenDownloadModal,
  onJumpToSimulator,
  lang,
}) => {
  const t = TRANSLATIONS[lang];

  return (
    <section id="overview" className="relative pt-10 pb-12 md:pt-16 md:pb-16 overflow-hidden">
      {/* Subtle ambient lime aura */}
      <div 
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#c6f135]/10 blur-[130px] pointer-events-none rounded-full" 
        aria-hidden="true"
      />
      
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Creator & Free Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#141b26] border border-[#202b3d] text-xs font-mono text-[#c6f135] mb-5">
          <span className="w-2 h-2 rounded-full bg-[#c6f135] animate-pulse"></span>
          <span className="font-bold">{t.heroBadge}</span>
        </div>

        {/* Clean headline with NO underline */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight mb-5 text-white">
          {t.heroTitlePrefix} <span className="text-[#c6f135]">{t.heroTitleAccent}</span>
        </h1>

        {/* Simple subtitle */}
        <p className="text-base sm:text-lg text-slate-400 mb-8 max-w-2xl mx-auto leading-relaxed">
          {t.heroSubtitle}
        </p>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={onOpenDownloadModal}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-bold text-black bg-[#c6f135] hover:bg-[#b5e028] rounded-xl shadow-lg shadow-[#c6f135]/25 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <Download className="w-4 h-4" />
            <span>{t.btnDownloadWindows}</span>
          </button>

          <button
            onClick={onJumpToSimulator}
            className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold rounded-xl border transition-all hover:scale-[1.02] active:scale-[0.98] ${
              darkMode 
                ? 'border-[#263449] bg-[#141b26] text-slate-200 hover:border-[#c6f135]/60 hover:text-white' 
                : 'border-slate-300 bg-white text-slate-800 hover:bg-slate-50 shadow-sm'
            }`}
          >
            <Monitor className="w-4 h-4 text-[#c6f135]" />
            <span>{t.btnTryApp}</span>
          </button>
        </div>

        {/* Free Tagline */}
        <div className="mt-6 text-xs text-slate-500 font-mono flex items-center justify-center gap-2">
          <span>✓ {t.freeTagline}</span>
        </div>
      </div>
    </section>
  );
};
