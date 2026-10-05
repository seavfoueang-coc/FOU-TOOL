import React, { useState } from 'react';
import { Download, Check, Copy } from 'lucide-react';
import { Language, TRANSLATIONS } from '../i18n/translations';

import { APP_DOWNLOAD_URL, APP_EXE_FILENAME, APP_VERSION } from '../config/constants';

interface DownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
  darkMode: boolean;
  lang: Language;
}

export const DownloadModal: React.FC<DownloadModalProps> = ({ 
  isOpen, 
  onClose, 
  darkMode,
  lang 
}) => {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const t = TRANSLATIONS[lang];

  if (!isOpen) return null;

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleDownload = (fileName: string) => {
    const blob = new Blob([
      `HONGGUO DL v1.4.2 (Hongguo Short Drama Desktop Downloader)\nRelease: 2026-10-05\nArchitecture: Windows x64 (Electron)\nCreated by: @eangseavfou\n\nQuick Start:\n1. Extract or run installer.\n2. Paste any series link from hongguoduanju.com\n3. Select episodes and download as decrypted MP4.`
    ], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className={`relative max-w-2xl w-full rounded-3xl border p-6 sm:p-8 shadow-2xl transition-colors ${
        darkMode ? 'bg-[#0c1018] border-[#1e2a3c] text-white' : 'bg-white border-slate-300 text-slate-900'
      }`}>
        <button
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-5 right-5 text-slate-400 hover:text-white p-1 rounded-xl text-lg"
        >
          ✕
        </button>

        <div className="mb-6">
          <div className="flex items-center gap-2 text-xs font-mono text-[#c6f135] uppercase font-bold mb-1">
            <span>{t.modalKicker}</span>
          </div>
          <h3 className="text-2xl font-extrabold tracking-tight">
            {t.modalTitle}
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            {t.modalDesc}
          </p>
        </div>

        {/* Download Artifact Cards */}
        <div className="space-y-3 mb-6">
          {/* Windows Installer */}
          <div className={`p-4 rounded-2xl border flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
            darkMode ? 'bg-[#111722] border-[#1f2c3e]' : 'bg-slate-50 border-slate-200'
          }`}>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm text-white">HONGGUO DL {APP_VERSION}</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#c6f135]/20 text-[#c6f135] font-bold">Recommended</span>
              </div>
              <div className="text-xs text-slate-400 mt-0.5 font-mono">
                {APP_EXE_FILENAME} · Windows 10 / 11 (64-bit)
              </div>
            </div>

            <a
              href={APP_DOWNLOAD_URL}
              target="_blank"
              rel="noopener noreferrer"
              download
              className="px-5 py-2.5 text-xs font-bold bg-[#c6f135] hover:bg-[#b5e028] text-black rounded-xl shadow-md transition-colors flex items-center justify-center gap-2 whitespace-nowrap shrink-0 no-underline cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download .exe</span>
            </a>
          </div>
        </div>

        {/* SHA-256 Checksums */}
        <div className="p-4 rounded-2xl bg-[#090c12] border border-[#1b2536] text-xs font-mono space-y-2 mb-6">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[11px] font-bold text-slate-300 font-sans">{t.checksumLabel}</span>
            <button
              onClick={() => handleCopy('e4a1f8c09b23f81e6490dd72199b0c79e6f3aa21448bcae8841a0219ffbb0c42', 'sha')}
              className="text-[11px] text-[#c6f135] hover:underline flex items-center gap-1 font-sans"
            >
              {copiedKey === 'sha' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
              <span>{copiedKey === 'sha' ? t.copied : t.copyHash}</span>
            </button>
          </div>
          <div className="text-[11px] text-slate-400 break-all select-all">
            e4a1f8c09b23f81e6490dd72199b0c79e6f3aa21448bcae8841a0219ffbb0c42
          </div>
        </div>

        {/* System requirements */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-slate-400 pt-3 border-t border-[#1f2c3e]">
          <div>
            <span className="text-slate-500 block text-[10px]">OS</span>
            <strong className="text-slate-200">Windows 10 / 11 (64-bit)</strong>
          </div>
          <div>
            <span className="text-slate-500 block text-[10px]">RAM / Disk</span>
            <strong className="text-slate-200">4 GB RAM · 500 MB Free</strong>
          </div>
          <div>
            <span className="text-slate-500 block text-[10px]">Author</span>
            <strong className="text-[#c6f135]">@eangseavfou</strong>
          </div>
        </div>
      </div>
    </div>
  );
};
