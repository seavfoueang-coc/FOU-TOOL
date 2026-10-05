import React from 'react';
import { NEXUS_TOOLS, NexusTool } from '../config/tools';
import { Layers, Sparkles, CheckCircle2, Clock } from 'lucide-react';
import { Language } from '../i18n/translations';

interface ToolSelectorBarProps {
  activeToolId: string;
  onSelectTool: (id: string) => void;
  lang: Language;
}

export const ToolSelectorBar: React.FC<ToolSelectorBarProps> = ({
  activeToolId,
  onSelectTool,
  lang
}) => {
  const isKm = lang === 'km';

  return (
    <div className="w-full bg-[#0a0d14] border-b border-[#18212e] py-2.5 px-4">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2.5">
        <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
          <Layers className="w-3.5 h-3.5 text-[#c6f135]" />
          <span className="font-bold text-slate-300">
            {isKm ? 'ឧបករណ៍ NEXUS TOOL:' : 'NEXUS TOOL SUITE:'}
          </span>
          <span className="text-[10px] text-slate-500 hidden md:inline">
            {isKm ? 'ជ្រើសរើសដើម្បីប្តូរគម្រោង' : 'Choose a project to inspect'}
          </span>
        </div>

        {/* Horizontal tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto py-0.5 no-scrollbar">
          {NEXUS_TOOLS.map((tool) => {
            const isActive = tool.id === activeToolId;
            return (
              <button
                key={tool.id}
                onClick={() => onSelectTool(tool.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 cursor-pointer ${
                  isActive
                    ? 'bg-[#c6f135] text-black shadow-md scale-102 font-extrabold'
                    : 'bg-[#141b26] hover:bg-[#1c2637] text-slate-300 border border-[#243347]'
                }`}
              >
                {tool.status === 'active' ? (
                  <span className={`w-2 h-2 rounded-full ${isActive ? 'bg-black' : 'bg-[#c6f135] animate-pulse'}`} />
                ) : (
                  <Clock className={`w-3 h-3 ${isActive ? 'text-black' : 'text-slate-400'}`} />
                )}
                <span>{tool.name}</span>
                {tool.status === 'active' ? (
                  <span className={`text-[9px] font-mono px-1.5 py-0.2 rounded-full ${
                    isActive ? 'bg-black/20 text-black' : 'bg-[#c6f135]/20 text-[#c6f135]'
                  }`}>
                    {isKm ? 'ដំណើរការ' : 'Active'}
                  </span>
                ) : (
                  <span className={`text-[9px] font-mono px-1.5 py-0.2 rounded-full ${
                    isActive ? 'bg-black/20 text-black' : 'bg-slate-800 text-slate-400'
                  }`}>
                    {isKm ? 'ឆាប់ៗ' : 'Soon'}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
