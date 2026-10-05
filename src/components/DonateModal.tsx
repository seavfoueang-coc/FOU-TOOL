import React from 'react';
import { X, Heart, Sparkles, Send, Coffee } from 'lucide-react';
import { Language } from '../i18n/translations';
import { KhqrCard } from './KhqrCard';

interface DonateModalProps {
  isOpen: boolean;
  onClose: () => void;
  darkMode: boolean;
  lang: Language;
}

export const DonateModal: React.FC<DonateModalProps> = ({
  isOpen,
  onClose,
  darkMode,
  lang,
}) => {
  if (!isOpen) return null;

  const isKm = lang === 'km';

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className={`relative w-full max-w-md rounded-3xl border shadow-2xl p-5 sm:p-6 max-h-[92vh] overflow-y-auto ${
          darkMode 
            ? 'bg-[#0e1420] border-[#223247] text-white' 
            : 'bg-white border-slate-200 text-slate-900'
        }`}
        onClick={e => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/60 transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="text-center mb-4 pt-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/10 text-rose-400 border border-rose-500/20 text-xs font-bold mb-2">
            <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
            <span>{isKm ? 'ឧបត្ថម្ភអ្នកបង្កើត' : 'Support the Developer'}</span>
          </div>

          <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
            {isKm ? 'គាំទ្រការអភិវឌ្ឍ NEXUS TOOL' : 'Fuel NEXUS TOOL Development'}
          </h3>

          <p className="text-xs text-slate-400 mt-1 max-w-xs mx-auto leading-relaxed">
            {isKm
              ? 'កម្មវិធីនេះឥតគិតថ្លៃ ១០០%។ ការឧបត្ថម្ភរបស់អ្នកជួយឱ្យខ្ញុំអាចបន្តអភិវឌ្ឍមុខងារថ្មីៗ។'
              : 'All tools are 100% free and open. Your generous donation helps keep servers, bypasses, and updates alive.'}
          </p>
        </div>

        {/* The KHQR Card component */}
        <div className="flex justify-center my-2">
          <KhqrCard darkMode={darkMode} lang={lang} />
        </div>

        {/* Developer Contact Note */}
        <div className="mt-4 pt-3 border-t border-[#1d2b3d] text-center space-y-2">
          <div className="text-[11px] text-slate-400">
            {isKm ? 'បានឧបត្ថម្ភរួចហើយ? ផ្ញើសារមកខ្ញុំតាម Telegram' : 'Donated? Say hi or suggest a new tool on Telegram:'}
          </div>
          <a
            href="https://t.me/eangseavfou"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#162232] hover:bg-[#1e2f45] border border-[#273a52] text-xs font-mono font-bold text-cyan-400 transition-colors"
          >
            <Send className="w-3.5 h-3.5" />
            <span>@eangseavfou</span>
          </a>
        </div>
      </div>
    </div>
  );
};
