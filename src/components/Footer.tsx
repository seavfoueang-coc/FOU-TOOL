import React from 'react';
import { Send } from 'lucide-react';
import { Language, TRANSLATIONS } from '../i18n/translations';
import { FouToolLogo } from './FouToolLogo';

interface FooterProps {
  darkMode: boolean;
  onOpenDownloadModal: () => void;
  lang: Language;
}

export const Footer: React.FC<FooterProps> = ({
  darkMode,
  onOpenDownloadModal,
  lang,
}) => {
  const t = TRANSLATIONS[lang];

  return (
    <footer className={`border-t transition-colors ${
      darkMode ? 'bg-[#070a10] border-[#18202d] text-slate-400' : 'bg-slate-100 border-slate-200 text-slate-600'
    }`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-2">
            <FouToolLogo size={24} showText={true} />
            <span className="text-slate-500">·</span>
            <span className="flex items-center gap-1 text-slate-300">
              <Send className="w-3 h-3 text-[#2aabee]" />
              <span>@eangseavfou</span>
            </span>
          </div>

          <div className="flex flex-wrap items-center justify-center sm:justify-end gap-x-5 gap-y-2 text-slate-400">
            <a href="#simulator" className="hover:text-[#c6f135]">{t.navApp}</a>
            <a href="#how-it-works" className="hover:text-[#c6f135]">{t.navHowItWorks}</a>
            <a href="#features" className="hover:text-[#c6f135]">{t.navFeatures}</a>
            <a href="#download" className="hover:text-[#c6f135] text-[#c6f135] font-bold">{t.navDownload}</a>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-[#18202d]/60 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-slate-500">
          <div>{t.footerRights}</div>
          <div>{t.footerNotice}</div>
        </div>
      </div>
    </footer>
  );
};
