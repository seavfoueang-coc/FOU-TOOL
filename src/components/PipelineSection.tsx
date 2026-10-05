import React, { useState } from 'react';
import { PIPELINE_STAGES } from '../data/mockData';
import { ArrowRight, Terminal, ShieldAlert, Layers } from 'lucide-react';
import { Language, TRANSLATIONS } from '../i18n/translations';

interface PipelineSectionProps {
  darkMode: boolean;
  lang: Language;
}

export const PipelineSection: React.FC<PipelineSectionProps> = ({ darkMode, lang }) => {
  const [selectedStageIndex, setSelectedStageIndex] = useState(0);
  const currentStage = PIPELINE_STAGES[selectedStageIndex];
  const t = TRANSLATIONS[lang];

  return (
    <section id="pipeline" className={`py-20 border-t ${
      darkMode ? 'bg-[#090c12] border-[#18202d]' : 'bg-slate-50 border-slate-200'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#c6f135] uppercase tracking-wider mb-2 font-mono">
            <span>{t.pipelineKicker}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4 text-balance text-white">
            {t.pipelineTitle}
          </h2>
          <p className="text-slate-400 text-base leading-relaxed text-balance">
            {t.pipelineDesc}
          </p>
        </div>

        {/* Five stage segmented step selector */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-2.5 mb-8">
          {PIPELINE_STAGES.map((stage, idx) => {
            const isSelected = selectedStageIndex === idx;
            return (
              <button
                key={stage.step}
                onClick={() => setSelectedStageIndex(idx)}
                className={`p-3.5 text-left rounded-2xl transition-all border ${
                  isSelected
                    ? 'bg-[#c6f135]/15 border-[#c6f135] text-[#c6f135] shadow-lg shadow-[#c6f135]/10'
                    : darkMode
                      ? 'bg-[#111722] border-[#1e2a3c] text-slate-400 hover:text-white hover:bg-[#161f2e]'
                      : 'bg-white border-slate-200 text-slate-600 hover:text-slate-900'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-mono font-bold opacity-75">STAGE {stage.step}</span>
                  {isSelected && <span className="w-2 h-2 rounded-full bg-[#c6f135]"></span>}
                </div>
                <div className="text-xs font-bold text-slate-200 truncate">
                  {stage.name.split('&')[0]}
                </div>
              </button>
            );
          })}
        </div>

        {/* Detailed stage inspector */}
        <div className={`rounded-3xl border p-6 md:p-8 transition-colors ${
          darkMode ? 'bg-[#0e1420] border-[#1e2a3c] shadow-xl' : 'bg-white border-slate-200 shadow-sm'
        }`}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Descriptive info & resilience */}
            <div className="lg:col-span-5 space-y-6">
              <div>
                <div className="text-xs font-mono text-[#c6f135] font-bold mb-1">
                  STAGE {currentStage.step} OF 05
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">
                  {currentStage.name}
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  {currentStage.shortSummary}
                </p>
              </div>

              <div className="space-y-4 text-xs">
                <div className="p-4 rounded-2xl bg-[#111722] border border-[#1f2c3e]">
                  <div className="font-bold text-white mb-1.5 flex items-center gap-2">
                    <Layers className="w-4 h-4 text-[#c6f135]" />
                    <span>{t.stageMechanism}</span>
                  </div>
                  <p className="text-slate-400 leading-relaxed">
                    {currentStage.technicalMechanism}
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-[#111722] border border-[#1f2c3e]">
                  <div className="font-bold text-white mb-1.5 flex items-center gap-2">
                    <ShieldAlert className="w-4 h-4 text-amber-400" />
                    <span>{t.stageFallback}</span>
                  </div>
                  <p className="text-slate-400 leading-relaxed">
                    {currentStage.fallbackStrategy}
                  </p>
                </div>
              </div>

              {/* Data transformations */}
              <div className="pt-2 border-t border-[#1f2c3e]">
                <div className="text-xs font-bold text-slate-400 mb-2 font-mono">IO CONTRACT</div>
                <div className="space-y-2 text-xs font-mono">
                  <div className="p-3 rounded-xl bg-[#111722] border border-[#1f2c3e] flex items-start gap-2">
                    <span className="text-slate-500 font-bold shrink-0">{t.stageInput}:</span>
                    <span className="text-slate-300 break-all">{currentStage.inputOutput.input}</span>
                  </div>
                  <div className="p-3 rounded-xl bg-[#111722] border border-[#1f2c3e] flex items-start gap-2">
                    <span className="text-[#c6f135] font-bold shrink-0">{t.stageOutput}:</span>
                    <span className="text-slate-200 break-all">{currentStage.inputOutput.output}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Code Snippet / Protocol Inspector */}
            <div className="lg:col-span-7">
              <div className="rounded-2xl overflow-hidden border border-[#1e2a3c] bg-[#070a10]">
                <div className="px-4 py-2.5 bg-[#0f1522] border-b border-[#1e2a3c] flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2 text-slate-300 font-mono">
                    <Terminal className="w-3.5 h-3.5 text-[#c6f135]" />
                    <span>pipeline-stage-{currentStage.step}.ts</span>
                  </div>
                  <span className="text-[11px] text-slate-500 font-mono">TypeScript / Node.js</span>
                </div>
                <div className="p-5 overflow-x-auto text-xs font-mono leading-relaxed text-slate-300">
                  <pre>{currentStage.codeSnippet}</pre>
                </div>
              </div>

              {/* Footer step switcher */}
              <div className="mt-4 p-4 rounded-2xl bg-[#111722] border border-[#1f2c3e] flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#c6f135]"></span>
                  <span className="text-slate-300 font-medium">Auto-Recovery:</span>
                  <span className="text-slate-400">Exponential backoff (3 retries)</span>
                </div>
                <button
                  onClick={() => setSelectedStageIndex((selectedStageIndex + 1) % PIPELINE_STAGES.length)}
                  className="inline-flex items-center gap-1.5 text-[#c6f135] hover:underline font-bold transition-all"
                >
                  <span>Next Stage</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
