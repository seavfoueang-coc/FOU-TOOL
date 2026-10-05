import React from 'react';
import { ArrowLeft, Clock, Send, Sparkles, Zap, Shield, CheckCircle2 } from 'lucide-react';
import { NexusTool } from '../config/tools';
import { Language } from '../i18n/translations';

interface ComingSoonToolProps {
  tool: NexusTool;
  onSelectHongguo: () => void;
  onBackToHub?: () => void;
  darkMode: boolean;
  lang: Language;
}

export const ComingSoonTool: React.FC<ComingSoonToolProps> = ({
  tool,
  onSelectHongguo,
  onBackToHub,
  darkMode,
  lang
}) => {
  const isKm = lang === 'km';

  return (
    <div className="w-full max-w-4xl mx-auto lg:px-8 pt-6 sm:pt-14 pb-14 text-center box-border">
      {/* Navigation buttons: Back to Hub + Switch to Active Tool */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5 sm:gap-3 mb-6 sm:mb-8 max-w-sm sm:max-w-none mx-auto w-full">
        {onBackToHub && (
          <button
            onClick={onBackToHub}
            className="w-full sm:w-auto min-h-[44px] inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-[#111722] hover:bg-[#192434] border border-[#223348] text-xs font-semibold text-slate-300 hover:text-white transition-all hover:scale-102 active:scale-95 shadow cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-[#c6f135]" />
            <span>{isKm ? 'ត្រឡប់ទៅឧបករណ៍ទាំងអស់' : '← Back to All Tools (Hub)'}</span>
          </button>
        )}

        <button
          onClick={onSelectHongguo}
          className="w-full sm:w-auto min-h-[44px] inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-[#141b26] hover:bg-[#1b2536] border border-[#263549] text-xs font-bold text-[#c6f135] transition-all hover:scale-102 active:scale-95 shadow-md cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>{isKm ? 'បើក HONGGUO DL (ដំណើរការស្រាប់)' : 'Switch to HONGGUO DL (Active Now)'}</span>
        </button>
      </div>

      {/* Main Preview Card */}
      <div className="p-4 sm:p-8 lg:p-12 rounded-2xl sm:rounded-3xl bg-[#111722] border border-[#1f2c3e] shadow-2xl relative overflow-hidden text-left max-w-2xl mx-auto">
        <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/5 blur-3xl pointer-events-none rounded-full" />

        <div className="flex flex-wrap items-center justify-between gap-2.5 mb-3 sm:mb-4">
          <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-wider text-slate-400 font-bold">
            {tool.category}
          </span>
          <span className={`text-[10px] sm:text-[11px] font-mono px-2.5 py-0.5 rounded-full border font-bold ${tool.badgeColor}`}>
            {tool.tag}
          </span>
        </div>

        <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight mb-2">
          {tool.name}
        </h2>

        <p className="text-sm sm:text-base text-slate-300 leading-relaxed mb-6">
          {tool.shortDesc}
        </p>

        {/* Development Status Box */}
        <div className="p-4 rounded-2xl bg-[#090d14] border border-[#1c293a] space-y-3 mb-6">
          <div className="flex items-center gap-2 text-xs font-bold text-cyan-400">
            <Clock className="w-4 h-4" />
            <span>
              {isKm ? 'កំពុងអភិវឌ្ឍន៍ដោយ Seavfou Eang' : 'Currently in Development by Seavfou Eang'}
            </span>
          </div>

          <p className="text-xs text-slate-400 leading-relaxed">
            {isKm 
              ? 'ឧបករណ៍នេះកំពុងត្រូវបានរៀបចំកូដ និងសាកល្បងដោយប្រុងប្រយ័ត្ន។ កំណែដំបូងនឹងត្រូវដាក់ឱ្យដំណើរការនៅលើ NEXUS TOOL ក្នុងពេលឆាប់ៗនេះ។'
              : 'This module is actively being engineered and vibe-coded. It will be launched right here in the NEXUS TOOL suite.'}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 border-t border-[#182333] text-xs text-slate-300">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>100% Free · Zero Ads</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>Offline First Processing</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>Bilingual: EN & Khmer</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-[#c6f135] shrink-0" />
              <span>Vibe Coded Architecture</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={onSelectHongguo}
            className="px-5 py-3 rounded-xl bg-[#c6f135] hover:bg-[#b5e028] text-black text-xs font-bold shadow-lg transition-all active:scale-95 flex items-center gap-2"
          >
            <span>{isKm ? 'មើល HONGGUO DL (ដំណើរការពេញលេញ)' : 'View HONGGUO DL (Fully Functional)'}</span>
          </button>

          <a
            href="https://t.me/eangseavfou"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-3 rounded-xl bg-[#16202e] hover:bg-[#1f2c3e] border border-[#263449] text-slate-200 text-xs font-bold transition-all flex items-center gap-2"
          >
            <Send className="w-3.5 h-3.5 text-[#2aabee]" />
            <span>{isKm ? 'ស្នើសុំមុខងារតាម Telegram' : 'Suggest Features on Telegram'}</span>
          </a>
        </div>
      </div>
    </div>
  );
};
