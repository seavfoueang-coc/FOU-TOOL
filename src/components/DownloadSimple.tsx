import React from 'react';
import { Download } from 'lucide-react';
import { Language, TRANSLATIONS } from '../i18n/translations';

interface DownloadSimpleProps {
  darkMode: boolean;
  lang: Language;
}

export const DownloadSimple: React.FC<DownloadSimpleProps> = ({ darkMode, lang }) => {
  const t = TRANSLATIONS[lang];

  const handleDownload = (filename: string) => {
    const blob = new Blob([
      `HONGGUO DL v1.4.2\nPlatform: Windows x64\nCreated by: @eangseavfou\n\nTo use:\n1. Unzip or run the installer.\n2. Paste any short drama link from hongguoduanju.com\n3. Select episodes and click download.`
    ], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

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

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto text-left">
          {/* Installer */}
          <div className="p-5 rounded-3xl bg-[#111722] border border-[#1f2c3e] flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="font-bold text-white text-sm">{t.installerTitle}</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#c6f135]/20 text-[#c6f135] font-bold">Recommended</span>
              </div>
              <p className="text-xs text-slate-400 mb-4">{t.installerDesc}</p>
            </div>
            <button
              onClick={() => handleDownload('HongguoDL-Setup-1.4.2.exe.txt')}
              className="w-full py-2.5 px-4 text-xs font-bold bg-[#c6f135] hover:bg-[#b5e028] text-black rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{t.btnDownload} .exe</span>
            </button>
          </div>

          {/* Portable */}
          <div className="p-5 rounded-3xl bg-[#111722] border border-[#1f2c3e] flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="font-bold text-white text-sm">{t.portableTitle}</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-400">Portable</span>
              </div>
              <p className="text-xs text-slate-400 mb-4">{t.portableDesc}</p>
            </div>
            <button
              onClick={() => handleDownload('HongguoDL-1.4.2-portable.zip.txt')}
              className="w-full py-2.5 px-4 text-xs font-bold rounded-xl border border-[#273549] bg-[#161f2e] hover:bg-[#1f2c3e] text-slate-200 transition-all flex items-center justify-center gap-2"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{t.btnDownload} .zip</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
