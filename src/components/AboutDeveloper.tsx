import React from 'react';
import { Github, Send, ExternalLink, Heart, Sparkles } from 'lucide-react';
import { Language, TRANSLATIONS } from '../i18n/translations';
import { KhqrCard } from './KhqrCard';

interface AboutDeveloperProps {
  darkMode: boolean;
  lang: Language;
}

export const AboutDeveloper: React.FC<AboutDeveloperProps> = ({ darkMode, lang }) => {
  const t = TRANSLATIONS[lang];
  const isKm = lang === 'km';

  return (
    <section id="about" className={`py-14 border-t ${
      darkMode ? 'bg-[#080b11] border-[#18202d]' : 'bg-slate-50 border-slate-200'
    }`}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-10">
          <div className="text-xs font-mono font-bold text-[#c6f135] uppercase tracking-wider mb-2">
            {t.aboutKicker}
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-2">
            {t.aboutTitle}
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            {t.aboutSubtitle}
          </p>
        </div>

        {/* Unified, Balanced Card with Running RGB on Developer Frame */}
        <div className="rounded-3xl bg-[#111722] border border-[#1f2c3e] shadow-2xl p-6 sm:p-8 relative overflow-hidden">
          {/* Subtle ambient lime aura */}
          <div 
            className="absolute top-0 right-1/4 w-80 h-80 bg-[#c6f135]/5 blur-3xl pointer-events-none rounded-full" 
            aria-hidden="true"
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            {/* Left Column: Developer Profile with Running RGB Frame */}
            <div className="lg:col-span-7 flex flex-col justify-between space-y-5">
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 text-center sm:text-left">
                {/* Running RGB Animated Frame around Seavfou Eang Photo */}
                <div className="relative shrink-0">
                  <div className="running-rgb-container">
                    <div className="relative z-10 w-36 sm:w-40 h-48 sm:h-52 rounded-2xl overflow-hidden bg-[#0d131f] flex items-center justify-center">
                      <img
                        src="https://avatars.githubusercontent.com/u/106633880?v=4"
                        alt="Seavfou Eang"
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover object-top transition-transform duration-300 hover:scale-105"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = 'https://github.com/seavfoueang-coc.png';
                        }}
                      />
                    </div>
                  </div>

                  {/* Online Status Indicator */}
                  <div className="absolute -bottom-2 right-2 z-20 px-2 py-0.5 rounded-full bg-[#111722] border border-[#273549] flex items-center gap-1 shadow-md">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                    <span className="text-[10px] font-mono font-bold text-slate-300">ONLINE</span>
                  </div>
                </div>

                {/* Identity, Role & Social */}
                <div className="space-y-2 flex-1 pt-1">
                  <div>
                    <h3 className="text-2xl font-extrabold text-white tracking-tight">
                      {t.aboutName}
                    </h3>
                    <a 
                      href="https://github.com/seavfoueang-coc" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-xs font-mono text-[#c6f135] hover:underline inline-flex items-center gap-1 mt-0.5"
                    >
                      <span>{t.aboutHandle}</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                  <div className="text-xs text-slate-400 font-medium">
                    {t.aboutRole}
                  </div>

                  {/* Feature Highlights */}
                  <div className="flex flex-wrap items-center justify-center sm:justify-start gap-1.5 pt-1 text-[11px]">
                    <span className="px-2.5 py-0.5 rounded-full bg-[#182333] border border-[#273549] text-[#c6f135] font-mono font-bold">
                      ✓ 100% Free
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-[#182333] border border-[#273549] text-slate-300 font-mono">
                      ✓ Zero Ads
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-[#182333] border border-[#273549] text-slate-300 font-mono">
                      ✓ 100% Offline
                    </span>
                  </div>
                </div>
              </div>

              {/* Bio Prose */}
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed text-center sm:text-left">
                {t.aboutBio}
              </p>

              {/* Action Buttons: GitHub & Telegram */}
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 pt-1">
                <a
                  href="https://github.com/seavfoueang-coc"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 text-xs font-bold bg-[#c6f135] hover:bg-[#b5e028] text-black rounded-xl shadow-md transition-all flex items-center gap-2 active:scale-95"
                >
                  <Github className="w-4 h-4" />
                  <span>{t.githubBtn}</span>
                  <ExternalLink className="w-3 h-3" />
                </a>

                <a
                  href="https://t.me/eangseavfou"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 text-xs font-semibold bg-[#161f2e] hover:bg-[#1f2c3e] border border-[#273549] text-slate-200 rounded-xl transition-all flex items-center gap-2"
                >
                  <Send className="w-3.5 h-3.5 text-[#2aabee]" />
                  <span>{t.telegramBtn}</span>
                </a>
              </div>
            </div>

            {/* Right Column: Real Scannable KHQR Bank Stand */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center pt-6 lg:pt-0 lg:border-l lg:border-[#1e2b3d] lg:pl-8">
              <div className="text-center mb-3">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/10 text-rose-400 border border-rose-500/20 text-xs font-bold mb-1">
                  <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
                  <span>{isKm ? 'ឧបត្ថម្ភអ្នកបង្កើត' : 'Support the Creator'}</span>
                </div>
                <h4 className="text-sm font-bold text-white">
                  {isKm ? 'ស្កេនដើម្បីឧបត្ថម្ភ (KHQR)' : 'Scan to Support with KHQR'}
                </h4>
              </div>

              {/* Clean, Scannable KHQR Stand Card */}
              <KhqrCard darkMode={darkMode} lang={lang} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
