import React from 'react';
import { NEXUS_TOOLS, NexusTool } from '../config/tools';
import { ArrowRight, Zap, ExternalLink } from 'lucide-react';
import { Language } from '../i18n/translations';
import { HongguoLogo } from './HongguoLogo';
import { FouToolLogo } from './FouToolLogo';

interface NexusHub4BoxesProps {
  activeToolId: string;
  onSelectTool: (id: string) => void;
  lang: Language;
  onOpenDownloadModal: () => void;
}

export const NexusHub4Boxes: React.FC<NexusHub4BoxesProps> = ({
  activeToolId,
  onSelectTool,
  lang,
}) => {
  const isKm = lang === 'km';

  const getToolIcon = (id: string) => {
    switch (id) {
      case 'hongguo-dl':
        return <HongguoLogo size={24} />;
      case 'douyin-extractor':
        return (
          <span className="text-cyan-400 font-black text-xs font-mono tracking-tighter">
            DY
          </span>
        );
      case 'kuaishou-tool':
        return (
          <span className="text-purple-400 font-black text-xs font-mono tracking-tighter">
            KS
          </span>
        );
      case 'request-tool':
      default:
        return (
          <span className="text-amber-400 font-black text-xs font-mono tracking-tighter">
            +
          </span>
        );
    }
  };

  const handleCardClick = (tool: NexusTool) => {
    if (tool.id === 'request-tool') {
      window.open('https://t.me/eangseavfou', '_blank');
      return;
    }
    onSelectTool(tool.id);
    if (tool.id === 'hongguo-dl') {
      const el = document.getElementById('hongguo-workspace');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <section className="pt-4 sm:pt-8 lg:pt-10 pb-8 sm:pb-12 border-b border-[#18212e] bg-gradient-to-b from-[#070a10] to-[#0a0e16] w-full max-w-full box-border">
      <div className="w-full max-w-7xl mx-auto lg:px-8 box-border">
        {/* Compact Mobile-First Hub Header */}
        <div className="text-center max-w-2xl mx-auto mb-5 sm:mb-8 lg:mb-10 px-1 flex flex-col items-center">
          {/* Logo icon 52-60px on mobile */}
          <div className="mb-2.5 sm:mb-3.5 hover:scale-105 transition-transform shrink-0">
            <FouToolLogo size={56} showText={false} />
          </div>

          {/* Badge: Compact & subtle */}
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full bg-[#141c28] border border-[#26374d] text-[10px] sm:text-xs font-mono font-bold text-[#c6f135] mb-2 sm:mb-3 shadow-sm max-w-full truncate">
            <Zap className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-[#c6f135] shrink-0" />
            <span className="truncate">FOU TOOL SUITE · BY SEAVFOU EANG</span>
          </div>

          {/* Heading: ~28px on mobile, larger on tablet/desktop */}
          <h1 className="text-[28px] sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight mb-2 sm:mb-3">
            {isKm ? (
              <>បណ្តុំឧបករណ៍ <span className="text-[#c6f135]">FOU TOOL</span></>
            ) : (
              <>FOU TOOL <span className="text-[#c6f135]">Developer Suite</span></>
            )}
          </h1>

          {/* Description: 2-3 lines max */}
          <p className="text-[13px] sm:text-sm lg:text-base text-slate-400 leading-relaxed max-w-lg mx-auto line-clamp-3 sm:line-clamp-none">
            {isKm
              ? 'ជ្រើសរើសប្រអប់ឧបករណ៍ណាមួយខាងក្រោម ដើម្បីបើកដំណើរការកម្មវិធី ឬពិនិត្យព័ត៌មានលម្អិត។'
              : 'Choose any of the 4 tools below to launch the live app, inspect architecture, or download.'}
          </p>
        </div>

        {/* 
          Tool Grid:
          - Mobile: 1-column stack with 16px gap (Tool 01, Tool 02, Tool 03, Tool 04)
          - Desktop (>= 1024px): 2-column grid exactly like original design
          - Exact 16px spacing maintained between card and screen edge
        */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6 w-full box-border">
          {NEXUS_TOOLS.map((tool, idx) => {
            const isSelected = tool.id === activeToolId;
            const isHongguo = tool.id === 'hongguo-dl';

            return (
              <div
                key={tool.id}
                onClick={() => handleCardClick(tool)}
                className={`relative w-full min-w-0 box-border rounded-2xl lg:rounded-3xl p-4 sm:p-5 lg:p-7 transition-all duration-200 cursor-pointer flex flex-col justify-between border-2 group overflow-hidden ${
                  isSelected
                    ? 'bg-[#121926] border-[#c6f135] shadow-2xl shadow-[#c6f135]/15'
                    : 'bg-[#0f1521] border-[#1d293b] hover:border-slate-500/60 hover:bg-[#131b2a] shadow-lg'
                }`}
              >
                <div>
                  {/* Card Header: Icon + Category/Number on left, Status badge aligned top-right (no collision) */}
                  <div className="flex items-start justify-between gap-2.5 mb-3 sm:mb-4">
                    <div className="flex items-center gap-2.5 sm:gap-3 min-w-0 flex-1">
                      <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-[#090d14] border border-[#202d40] flex items-center justify-center shadow-inner group-hover:scale-105 transition-transform shrink-0">
                        {getToolIcon(tool.id)}
                      </div>
                      <div className="min-w-0 flex-1">
                        <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-wider text-slate-400 font-bold block truncate">
                          {tool.category}
                        </span>
                        <span className="text-[11px] sm:text-xs font-mono font-bold text-slate-300">
                          TOOL 0{idx + 1}
                        </span>
                      </div>
                    </div>

                    <div className="shrink-0 ml-2 pt-0.5">
                      <span className={`text-[10px] sm:text-[11px] font-mono px-2.5 py-1 rounded-full border font-bold whitespace-nowrap block ${tool.badgeColor}`}>
                        {isKm && tool.khmerTag ? tool.khmerTag : tool.tag}
                      </span>
                    </div>
                  </div>

                  {/* Tool Title: 21-23px on mobile */}
                  <h2 className="text-[22px] sm:text-2xl font-black text-white tracking-tight mb-1.5 sm:mb-2 group-hover:text-white flex items-center gap-2 leading-snug">
                    <span className="break-words">{isKm && tool.khmerName ? tool.khmerName : tool.name}</span>
                    {isSelected && (
                      <span className="w-2 h-2 rounded-full bg-[#c6f135] animate-ping shrink-0" />
                    )}
                  </h2>

                  {/* Tool Description: 14px comfortable line-height */}
                  <p className="text-[14px] text-slate-300 leading-relaxed mb-3 sm:mb-4">
                    {isKm && tool.khmerDesc ? tool.khmerDesc : tool.shortDesc}
                  </p>

                  {/* Compact Feature List: Clean vertical list with ✓ in #c6f135 */}
                  <div className="space-y-1.5 mb-4 pt-2.5 border-t border-[#18212e]">
                    {tool.highlights.map((h, i) => (
                      <div key={i} className="text-[12px] sm:text-[13px] text-slate-300 flex items-center gap-2 font-mono">
                        <span className="text-[#c6f135] font-bold text-xs shrink-0">✓</span>
                        <span className="truncate">{h.replace(/^✓\s*/, '')}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card Button: Full width, min 48px height, 14-15px text, large touch target */}
                <div className="pt-1">
                  {isHongguo ? (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCardClick(tool);
                      }}
                      className={`w-full min-h-[48px] h-12 py-2.5 px-4 rounded-xl text-[14px] sm:text-[15px] font-bold transition-all flex items-center justify-center gap-2 active:scale-[0.98] shadow-md cursor-pointer text-center leading-snug ${
                        isSelected
                          ? 'bg-[#c6f135] text-black hover:bg-[#b5e028] shadow-[#c6f135]/20'
                          : 'bg-[#182333] hover:bg-[#202e42] text-[#c6f135] border border-[#293a52]'
                      }`}
                    >
                      <span>{isKm ? 'បើកដំណើរការ HONGGUO DL' : 'Launch HONGGUO DL (Active Now)'}</span>
                      <ArrowRight className="w-4 h-4 shrink-0" />
                    </button>
                  ) : tool.id === 'request-tool' ? (
                    <a
                      href="https://t.me/eangseavfou"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="w-full min-h-[48px] h-12 py-2.5 px-4 rounded-xl text-[14px] sm:text-[15px] font-bold bg-[#1a2433] hover:bg-[#223044] border border-[#2b3d56] text-amber-300 transition-all flex items-center justify-center gap-2 active:scale-[0.98] cursor-pointer text-center leading-snug no-underline"
                    >
                      <span>{isKm ? 'ផ្ញើសំណើតាម Telegram' : 'Send Proposal via Telegram'}</span>
                      <ExternalLink className="w-4 h-4 shrink-0" />
                    </a>
                  ) : (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCardClick(tool);
                      }}
                      className="w-full min-h-[48px] h-12 py-2.5 px-4 rounded-xl text-[14px] sm:text-[15px] font-bold bg-[#141c28] hover:bg-[#1c2738] border border-[#243347] text-slate-200 transition-all flex items-center justify-center gap-2 active:scale-[0.98] cursor-pointer text-center leading-snug"
                    >
                      <span>{isKm ? 'មើលព័ត៌មានលម្អិត' : 'Inspect Preview'}</span>
                      <ArrowRight className="w-4 h-4 text-slate-400 shrink-0" />
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
