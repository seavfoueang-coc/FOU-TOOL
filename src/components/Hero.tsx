import React from 'react';
import { Download, Monitor, ArrowLeft } from 'lucide-react';
import { Language, TRANSLATIONS } from '../i18n/translations';
import { HongguoLogo } from './HongguoLogo';

interface HeroProps {
  darkMode: boolean;
  onOpenDownloadModal: () => void;
  onJumpToSimulator: () => void;
  onBackToHub?: () => void;
  lang: Language;
}

export const Hero: React.FC<HeroProps> = ({
  darkMode,
  onOpenDownloadModal,
  onJumpToSimulator,
  onBackToHub,
  lang,
}) => {
  const t = TRANSLATIONS[lang];
  const isKm = lang === 'km';

  return (
    <section id="overview" className="relative pt-6 sm:pt-14 lg:pt-20 pb-8 sm:pb-14 overflow-hidden w-full max-w-full">
      {/* Subtle ambient lime aura (decorative; capped to the section width so it never relies on clipping) */}
      <div 
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(320px,100%)] sm:w-[600px] h-[220px] sm:h-[300px] bg-[#c6f135]/10 blur-[90px] sm:blur-[130px] pointer-events-none rounded-full" 
        aria-hidden="true"
      />
      
      <div className="w-full max-w-5xl mx-auto lg:px-8 text-center relative z-10 box-border">
        {/* Clean Back to Hub button placed cleanly at the top */}
        {onBackToHub && (
          <div className="flex justify-center mb-4 sm:mb-6">
            <button
              onClick={onBackToHub}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#111722]/90 hover:bg-[#182333] border border-[#213044] hover:border-[#c6f135]/50 text-xs font-semibold text-slate-300 hover:text-white transition-all shadow-sm hover:scale-105 active:scale-95 group cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-[#c6f135] group-hover:-translate-x-1 transition-transform" />
              <span>{isKm ? '← ត្រឡប់ទៅ FOU TOOL (ប្រអប់ទាំង ៤)' : '← Back to All Tools (FOU TOOL Suite)'}</span>
            </button>
          </div>
        )}

        {/* Official Hongguo DL Logo Badge from user */}
        <div className="flex justify-center mb-4 sm:mb-5">
          <div className="p-2.5 sm:p-3.5 rounded-2xl sm:rounded-3xl bg-[#0f1522] border border-[#25364b] shadow-2xl hover:scale-105 transition-transform inline-flex items-center gap-2.5 sm:gap-3">
            <HongguoLogo size={42} />
            <div className="text-left pr-1.5 sm:pr-2">
              <div className="text-sm sm:text-base font-black tracking-tight text-white flex items-center gap-1.5 leading-none">
                <span>HONGGUO</span>
                <span className="text-[#c6f135]">DL</span>
              </div>
              <div className="text-[10px] font-mono text-slate-400 mt-0.5">
                Official Windows Downloader
              </div>
            </div>
          </div>
        </div>

        {/* Creator & Free Badge */}
        <div className="inline-flex items-center gap-2 px-2.5 py-0.5 sm:px-3.5 sm:py-1.5 rounded-full bg-[#141b26] border border-[#202b3d] text-[10px] sm:text-xs font-mono text-[#c6f135] mb-3 sm:mb-5 max-w-full">
          <span className="w-2 h-2 rounded-full bg-[#c6f135] animate-pulse shrink-0"></span>
          <span className="font-bold truncate">{t.heroBadge}</span>
        </div>

        {/* Clean headline with responsive text sizing: ~28px on mobile */}
        <h1 className="text-[28px] sm:text-5xl lg:text-6xl font-black tracking-tight mb-3 sm:mb-4 text-white leading-tight">
          {t.heroTitlePrefix} <span className="text-[#c6f135]">{t.heroTitleAccent}</span>
        </h1>

        {/* Subtitle */}
        <p className="text-[13px] sm:text-base lg:text-lg text-slate-400 mb-5 sm:mb-8 max-w-2xl mx-auto leading-relaxed">
          {t.heroSubtitle}
        </p>

        {/* Action buttons: Min 48px touch targets */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5 sm:gap-3 max-w-xs sm:max-w-none mx-auto w-full">
          <button
            onClick={onOpenDownloadModal}
            className="w-full sm:w-auto min-h-[48px] h-12 inline-flex items-center justify-center gap-2 px-6 text-[14px] sm:text-sm font-bold text-black bg-[#c6f135] hover:bg-[#b5e028] rounded-xl shadow-lg shadow-[#c6f135]/25 transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
          >
            <Download className="w-4 h-4 shrink-0" />
            <span className="whitespace-nowrap">{t.btnDownloadWindows}</span>
          </button>

          <button
            onClick={onJumpToSimulator}
            className={`w-full sm:w-auto min-h-[48px] h-12 inline-flex items-center justify-center gap-2 px-6 text-[14px] sm:text-sm font-semibold rounded-xl border transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer ${
              darkMode 
                ? 'border-[#263449] bg-[#141b26] text-slate-200 hover:border-[#c6f135]/60 hover:text-white' 
                : 'border-slate-300 bg-white text-slate-800 hover:bg-slate-50 shadow-sm'
            }`}
          >
            <Monitor className="w-4 h-4 text-[#c6f135] shrink-0" />
            <span className="whitespace-nowrap">{t.btnTryApp}</span>
          </button>
        </div>

        {/* Trust Badges */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-y-2 gap-x-6 text-xs text-slate-400">
          <div className="flex items-center gap-1.5">
            <span className="text-[#c6f135] font-bold">✓</span>
            <span>{isKm ? 'ឥតគិតថ្លៃរហូត' : 'Free forever'}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-[#c6f135] font-bold">✓</span>
            <span>{isKm ? 'មិនបាច់ចុះឈ្មោះ' : 'No sign-up required'}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-[#c6f135] font-bold">✓</span>
            <span>{isKm ? 'ដំណើរការក្រៅបណ្តាញ' : 'Works offline'}</span>
          </div>
        </div>
      </div>
    </section>
  );
};
