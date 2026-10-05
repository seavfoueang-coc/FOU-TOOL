import React from 'react';
import { Download, ExternalLink } from 'lucide-react';
import { Language, TRANSLATIONS } from '../i18n/translations';
import { APP_DOWNLOAD_URL, APP_EXE_FILENAME, APP_VERSION } from '../config/constants';

interface DownloadSimpleProps {
  darkMode: boolean;
  lang: Language;
}

export const DownloadSimple: React.FC<DownloadSimpleProps> = ({ darkMode, lang }) => {
  const t = TRANSLATIONS[lang];

  return (
    <section id="download" className={`py-16 border-t ${
      darkMode ? 'bg-[#080b11] border-[#18202d]' : 'bg-slate-50 border-slate-200'
    }`}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-2">
          {t.downloadSectionTitle}
        </h2>
        <p className="text-sm text-slate-400 mb-8 max-w-lg mx-auto">
          {t.downloadSectionDesc}
        </p>

        {/* Single Installer Card */}
        <div className="max-w-md mx-auto p-6 rounded-3xl bg-[#111722] border border-[#1f2c3e] shadow-xl text-left space-y-5">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="font-extrabold text-white text-base">HONGGUO DL {APP_VERSION}</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#c6f135]/20 text-[#c6f135] font-bold">
                Windows 10 / 11 (64-bit)
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed font-mono">
              {APP_EXE_FILENAME} · Official GitHub Release · 100% Free
            </p>
          </div>

          <a
            href={APP_DOWNLOAD_URL}
            target="_blank"
            rel="noopener noreferrer"
            download
            className="w-full py-3 px-5 text-sm font-bold bg-[#c6f135] hover:bg-[#b5e028] text-black rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 active:scale-95 cursor-pointer no-underline"
          >
            <Download className="w-4 h-4" />
            <span>{t.btnDownload} .exe ({APP_VERSION})</span>
          </a>
        </div>
      </div>
    </section>
  );
};
