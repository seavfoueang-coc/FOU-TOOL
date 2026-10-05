import React from 'react';
import { Zap, ShieldCheck, HardDrive } from 'lucide-react';
import { Language, TRANSLATIONS } from '../i18n/translations';

interface FeaturesSimpleProps {
  darkMode: boolean;
  lang: Language;
}

export const FeaturesSimple: React.FC<FeaturesSimpleProps> = ({ darkMode, lang }) => {
  const t = TRANSLATIONS[lang];

  return (
    <section id="features" className={`py-16 border-t ${
      darkMode ? 'bg-[#0a0d14] border-[#18202d]' : 'bg-white border-slate-200'
    }`}>
      <div className="w-full max-w-5xl mx-auto lg:px-8 box-border">
        <div className="text-center max-w-xl mx-auto mb-12">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-2">
            {t.featuresTitle}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="p-6 rounded-3xl bg-[#111722] border border-[#1f2c3e]">
            <div className="w-10 h-10 rounded-2xl bg-[#182333] border border-[#273549] text-[#c6f135] flex items-center justify-center mb-4">
              <Zap className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-white mb-2">{t.feat1Title}</h3>
            <p className="text-xs text-slate-400 leading-relaxed">{t.feat1Desc}</p>
          </div>

          <div className="p-6 rounded-3xl bg-[#111722] border border-[#1f2c3e]">
            <div className="w-10 h-10 rounded-2xl bg-[#182333] border border-[#273549] text-[#c6f135] flex items-center justify-center mb-4">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-white mb-2">{t.feat2Title}</h3>
            <p className="text-xs text-slate-400 leading-relaxed">{t.feat2Desc}</p>
          </div>

          <div className="p-6 rounded-3xl bg-[#111722] border border-[#1f2c3e]">
            <div className="w-10 h-10 rounded-2xl bg-[#182333] border border-[#273549] text-[#c6f135] flex items-center justify-center mb-4">
              <HardDrive className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-white mb-2">{t.feat3Title}</h3>
            <p className="text-xs text-slate-400 leading-relaxed">{t.feat3Desc}</p>
          </div>
        </div>
      </div>
    </section>
  );
};
