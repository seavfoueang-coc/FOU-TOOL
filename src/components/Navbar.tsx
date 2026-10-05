import React from 'react';
import { Download, Moon, Sun, Languages } from 'lucide-react';
import { Language, TRANSLATIONS } from '../i18n/translations';

interface NavbarProps {
  darkMode: boolean;
  setDarkMode: (val: boolean) => void;
  onOpenDownloadModal: () => void;
  lang: Language;
  onToggleLang: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  darkMode,
  setDarkMode,
  onOpenDownloadModal,
  lang,
  onToggleLang,
}) => {
  const t = TRANSLATIONS[lang];

  return (
    <header className={`sticky top-0 z-40 w-full transition-colors border-b backdrop-blur-md ${
      darkMode 
        ? 'bg-[#0a0d14]/90 border-[#19212e] text-slate-100' 
        : 'bg-white/95 border-slate-200 text-slate-900'
    }`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand */}
        <a 
          href="#" 
          className="text-lg font-extrabold tracking-tight text-white flex items-center gap-2.5"
        >
          <div className="w-7 h-7 rounded-lg bg-[#141b26] border border-[#c6f135]/50 flex items-center justify-center text-xs font-bold text-[#c6f135]">
            HG
          </div>
          <span>
            HONGGUO <span className="text-[#c6f135]">DL</span>
          </span>
        </a>

        {/* Clean, Simple Nav links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-400">
          <a href="#simulator" className="hover:text-[#c6f135] transition-colors">{t.navApp}</a>
          <a href="#how-it-works" className="hover:text-[#c6f135] transition-colors">{t.navHowItWorks}</a>
          <a href="#features" className="hover:text-[#c6f135] transition-colors">{t.navFeatures}</a>
          <a href="#about" className="hover:text-[#c6f135] transition-colors">{t.navAbout}</a>
          <a href="#download" className="hover:text-[#c6f135] transition-colors">{t.navDownload}</a>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2.5">
          {/* Language Toggle */}
          <button
            onClick={onToggleLang}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 border transition-all ${
              darkMode 
                ? 'border-[#263449] bg-[#141b26] text-slate-200 hover:border-[#c6f135]/60 hover:text-[#c6f135]' 
                : 'border-slate-300 bg-white text-slate-800'
            }`}
          >
            <Languages className="w-3.5 h-3.5 text-[#c6f135]" />
            <span>{lang === 'km' ? 'ភាសាខ្មែរ' : 'English'}</span>
          </button>

          {/* Theme */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            aria-label="Toggle theme"
            className={`p-2 rounded-xl transition-colors border ${
              darkMode 
                ? 'border-[#263449] bg-[#141b26] text-slate-300 hover:text-white' 
                : 'border-slate-200 bg-slate-100 text-slate-700'
            }`}
          >
            {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* Download CTA */}
          <button
            onClick={onOpenDownloadModal}
            className="hidden sm:inline-flex items-center gap-2 px-4 py-2 text-xs font-bold text-black bg-[#c6f135] hover:bg-[#b5e028] rounded-xl shadow-md transition-all active:scale-95 whitespace-nowrap"
          >
            <Download className="w-3.5 h-3.5" />
            <span>{t.getForWindows}</span>
          </button>
        </div>
      </div>
    </header>
  );
};
