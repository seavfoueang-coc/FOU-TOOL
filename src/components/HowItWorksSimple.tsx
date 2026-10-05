import React from 'react';
import { Clipboard, Sliders, Download } from 'lucide-react';
import { Language, TRANSLATIONS } from '../i18n/translations';

interface HowItWorksSimpleProps {
  darkMode: boolean;
  lang: Language;
}

export const HowItWorksSimple: React.FC<HowItWorksSimpleProps> = ({ darkMode, lang }) => {
  const t = TRANSLATIONS[lang];

  return (
    <section id="how-it-works" className={`py-16 border-t ${
      darkMode ? 'bg-[#080b11] border-[#18202d]' : 'bg-slate-50 border-slate-200'
    }`}>
      <div className="w-full max-w-5xl mx-auto lg:px-8 box-border">
        <div className="text-center max-w-xl mx-auto mb-12">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-2">
            {t.howItWorksTitle}
          </h2>
          <p className="text-sm text-slate-400">
            {t.howItWorksSubtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Step 1 */}
          <div className="p-6 rounded-3xl bg-[#111722] border border-[#1f2c3e] relative">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-mono font-bold text-[#c6f135]">01</span>
              <div className="w-8 h-8 rounded-full bg-[#1b2738] flex items-center justify-center text-[#c6f135]">
                <Clipboard className="w-4 h-4" />
              </div>
            </div>
            <h3 className="font-bold text-base text-white mb-2">{t.step1Title}</h3>
            <p className="text-xs text-slate-400 leading-relaxed">{t.step1Desc}</p>
          </div>

          {/* Step 2 */}
          <div className="p-6 rounded-3xl bg-[#111722] border border-[#1f2c3e] relative">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-mono font-bold text-[#c6f135]">02</span>
              <div className="w-8 h-8 rounded-full bg-[#1b2738] flex items-center justify-center text-[#c6f135]">
                <Sliders className="w-4 h-4" />
              </div>
            </div>
            <h3 className="font-bold text-base text-white mb-2">{t.step2Title}</h3>
            <p className="text-xs text-slate-400 leading-relaxed">{t.step2Desc}</p>
          </div>

          {/* Step 3 */}
          <div className="p-6 rounded-3xl bg-[#111722] border border-[#1f2c3e] relative">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-mono font-bold text-[#c6f135]">03</span>
              <div className="w-8 h-8 rounded-full bg-[#1b2738] flex items-center justify-center text-[#c6f135]">
                <Download className="w-4 h-4" />
              </div>
            </div>
            <h3 className="font-bold text-base text-white mb-2">{t.step3Title}</h3>
            <p className="text-xs text-slate-400 leading-relaxed">{t.step3Desc}</p>
          </div>
        </div>
      </div>
    </section>
  );
};
