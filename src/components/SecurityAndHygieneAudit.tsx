import React, { useState } from 'react';
import { SECURITY_AUDIT_DATA } from '../data/mockData';
import { ShieldCheck, AlertTriangle, AlertOctagon, CheckCircle2 } from 'lucide-react';
import { Language, TRANSLATIONS } from '../i18n/translations';

interface SecurityAndHygieneAuditProps {
  darkMode: boolean;
  lang: Language;
}

export const SecurityAndHygieneAudit: React.FC<SecurityAndHygieneAuditProps> = ({ darkMode, lang }) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [testFilename, setTestFilename] = useState('CON: Reborn_Empress / Ep:01? "VIP" <Uncut>.mp4');
  const t = TRANSLATIONS[lang];

  const categories = ['All', 'Electron Security', 'Download Engine', 'Code Protection', 'Project Hygiene'];

  const filteredItems = activeCategory === 'All' 
    ? SECURITY_AUDIT_DATA 
    : SECURITY_AUDIT_DATA.filter(i => i.category === activeCategory);

  // Real-time Windows filename sanitizer demo
  const sanitizeName = (raw: string) => {
    let cleaned = raw.replace(/[<>:"/\\|?*]/g, '_');
    const reservedRegex = /^(CON|PRN|AUX|NUL|COM[1-9]|LPT[1-9])(\..*)?$/i;
    if (reservedRegex.test(cleaned)) {
      cleaned = `Safe_${cleaned}`;
    }
    cleaned = cleaned.replace(/[. ]+$/, '');
    return cleaned || 'untitled_file.mp4';
  };

  const sanitizedResult = sanitizeName(testFilename);

  return (
    <section id="security" className={`py-20 border-t ${
      darkMode ? 'bg-[#090c12] border-[#18202d]' : 'bg-slate-50 border-slate-200'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-10">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#c6f135] uppercase tracking-wider mb-2 font-mono">
            <span>{t.auditKicker}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4 text-balance text-white">
            {t.auditTitle}
          </h2>
          <p className="text-slate-400 text-base leading-relaxed text-balance">
            {t.auditDesc}
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap items-center gap-2 mb-8">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 text-xs font-semibold rounded-xl transition-all border ${
                activeCategory === cat
                  ? 'bg-[#c6f135] text-black border-[#c6f135] font-bold shadow-md shadow-[#c6f135]/20'
                  : darkMode
                    ? 'border-[#1e2a3c] bg-[#111722] text-slate-400 hover:text-white hover:bg-[#161f2e]'
                    : 'border-slate-300 bg-white text-slate-700 hover:bg-slate-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Audit Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-14">
          {filteredItems.map((item, idx) => {
            const isCritical = item.status === 'critical';
            const isWarning = item.status === 'warning';
            const isPassed = item.status === 'passed';

            return (
              <div
                key={idx}
                className={`p-6 rounded-3xl border transition-all ${
                  isCritical 
                    ? 'bg-rose-950/20 border-rose-900/60 shadow-lg shadow-rose-950/20' 
                    : isWarning
                      ? 'bg-amber-950/15 border-amber-900/50'
                      : darkMode 
                        ? 'bg-[#0e1420] border-[#1e2a3c]' 
                        : 'bg-white border-slate-200'
                }`}
              >
                {/* Header status */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-xs font-mono text-slate-500 uppercase font-semibold">
                    {item.category}
                  </span>

                  <span className={`inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-xs font-semibold ${
                    isCritical
                      ? 'bg-rose-500/20 text-rose-400 border border-rose-500/40'
                      : isWarning
                        ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                        : 'bg-[#c6f135]/20 text-[#c6f135] border border-[#c6f135]/40'
                  }`}>
                    {isCritical && <AlertOctagon className="w-3.5 h-3.5" />}
                    {isWarning && <AlertTriangle className="w-3.5 h-3.5" />}
                    {isPassed && <CheckCircle2 className="w-3.5 h-3.5" />}
                    <span className="capitalize">{item.status}</span>
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white mb-2 leading-snug">
                  {item.title}
                </h3>

                <p className="text-sm text-slate-300 mb-4 leading-relaxed">
                  {item.description}
                </p>

                <div className="p-4 rounded-2xl bg-[#111722] border border-[#1f2c3e] text-xs font-mono text-slate-400 space-y-1">
                  <div className="text-[11px] font-bold text-slate-200 font-sans">Technical Context:</div>
                  <div className="leading-relaxed break-words">{item.technicalDetails}</div>
                </div>

                {item.remediation && (
                  <div className="mt-3 p-3.5 rounded-2xl bg-rose-950/30 border border-rose-800/40 text-xs text-rose-200">
                    <strong className="block mb-1 text-rose-300 font-sans font-semibold">{t.remediation}:</strong>
                    <span className="leading-relaxed font-mono">{item.remediation}</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Interactive Filename Sanitizer Widget */}
        <div className={`p-6 sm:p-8 rounded-3xl border transition-colors ${
          darkMode ? 'bg-[#0e1420] border-[#1e2a3c] shadow-xl' : 'bg-white border-slate-200 shadow-sm'
        }`}>
          <div className="max-w-2xl mb-6">
            <div className="text-xs font-mono text-[#c6f135] font-bold mb-1">
              WINDOWS SUBSYSTEM TESTING
            </div>
            <h3 className="text-xl font-bold text-white mb-1">
              {t.sanitizerTitle}
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              {t.sanitizerDesc}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-300 block">
                Raw Input Filename:
              </label>
              <input
                type="text"
                value={testFilename}
                onChange={e => setTestFilename(e.target.value)}
                className={`w-full px-4 py-3 text-xs font-mono rounded-xl border focus:outline-none focus:ring-1 focus:ring-[#c6f135] ${
                  darkMode ? 'bg-[#111722] border-[#243348] text-white' : 'bg-slate-50 border-slate-300 text-slate-800'
                }`}
              />
              <div className="flex gap-3 pt-1">
                <button
                  onClick={() => setTestFilename('CON: Episode 01.mp4')}
                  className="text-xs text-[#c6f135] hover:underline font-mono"
                >
                  Test "CON"
                </button>
                <button
                  onClick={() => setTestFilename('Who is the Heir?: Part 1/2 <Special>.mp4')}
                  className="text-xs text-[#c6f135] hover:underline font-mono"
                >
                  Test Slashes & Colons
                </button>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-[#090c12] border border-[#1b2536] font-mono text-xs">
              <div className="text-slate-500 text-[11px] mb-1">Sanitized Disk Target:</div>
              <div className="text-[#c6f135] font-bold text-sm break-all">
                {sanitizedResult}
              </div>
              <div className="mt-2 text-[10px] text-slate-400 leading-relaxed">
                ✓ Colons, question marks, and slashes replaced with underscores.<br/>
                ✓ DOS reserved names (`CON`, `PRN`, `AUX`) prefixed with `Safe_`.<br/>
                ✓ Trailing periods and spaces safely trimmed.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
