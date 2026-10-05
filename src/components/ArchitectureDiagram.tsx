import React, { useState } from 'react';
import { ArrowDown } from 'lucide-react';
import { Language, TRANSLATIONS } from '../i18n/translations';

interface ArchitectureDiagramProps {
  darkMode: boolean;
  lang: Language;
}

export const ArchitectureDiagram: React.FC<ArchitectureDiagramProps> = ({ darkMode, lang }) => {
  const [activeNode, setActiveNode] = useState<string | null>('bridge');
  const t = TRANSLATIONS[lang];

  const nodes = [
    {
      id: 'renderer',
      title: lang === 'km' ? 'Renderer ដាច់ដោយឡែក (React)' : 'Sandboxed Renderer (React)',
      type: lang === 'km' ? 'ស្រទាប់ UI' : 'UI Layer',
      desc: lang === 'km' 
        ? 'ដំណើរការ React UI, ការរុករក Discover, បញ្ជីភាគ និងការជូនដំណឹង។ ដាច់ដោយឡែកពី Node.js APIs (nodeIntegration: false)។'
        : 'Runs the modern React user interface, Discover search, multi-episode selection grid, and toast notifications. Strictly isolated from Node.js APIs.',
    },
    {
      id: 'bridge',
      title: lang === 'km' ? 'របាំងសុវត្ថិភាព ContextBridge IPC' : 'ContextBridge IPC Boundary',
      type: lang === 'km' ? 'របាំងសុវត្ថិភាព' : 'Security Barrier',
      desc: lang === 'km'
        ? 'ផ្លូវតែមួយគត់រវាង Renderer និងប្រព័ន្ធកុំព្យូទ័រ។ អនុញ្ញាតតែមុខងារសុវត្ថិភាពដែលបានកំណត់ប៉ុណ្ណោះ។'
        : 'The only conduit between the untrusted renderer and native OS capabilities. Exposes explicit async methods: parseSeries(), startDownload(), openDirectory().',
    },
    {
      id: 'main',
      title: lang === 'km' ? 'ដំណើរការចម្បង Electron Main' : 'Electron Main Process',
      type: lang === 'km' ? 'ម៉ាស៊ីនស្នូល' : 'Runtime Core',
      desc: lang === 'km'
        ? 'ចងក្រងជា V8 bytecode (.jsc) តាមរយៈ Bytenode។ គ្រប់គ្រងកម្មវិធី ទប់ស្កាត់ផ្ទាំងមិនច្បាស់លាស់ និងបើក Workers។'
        : 'Compiled to raw V8 bytecode (.jsc) via Bytenode. Manages application lifecycle, window policies (blocks popups/webviews), and initiates background download workers.',
    },
    {
      id: 'workers',
      title: lang === 'km' ? 'ក្រុមទាញយកទន្ទឹមគ្នា (១–៤)' : 'Downloader Worker Pool (1–4)',
      type: lang === 'km' ? 'ម៉ាស៊ីនបណ្ដាញ' : 'Network Engine',
      desc: lang === 'km'
        ? 'ទាញយកវីដេអូដោយត្រាប់តាមទូរស័ព្ទ Android។ សរសេរជាឯកសារ .part ជាមួយ HTTP Range header។'
        : 'Fetches video streams using synthetic Android mobile device fingerprints. Writes chunks to .part files using HTTP Range headers to support instant resumption.',
    },
    {
      id: 'decryptor',
      title: lang === 'km' ? 'ប្រព័ន្ធដោះលេខកូដ និង Remux' : 'DRM Decryptor & Remux',
      type: lang === 'km' ? 'ប្រព័ន្ធគ្រីបតូ' : 'Crypto Subsystem',
      desc: lang === 'km'
        ? 'ដោះលេខកូដ XOR/AES ក្នុងអង្គចងចាំ និងប្រើ FFmpeg ដើម្បីកែសម្រួល MP4 container ឱ្យត្រឹមត្រូវ។'
        : 'Recovers custom cryptographic keys from Hongguo mobile API signatures, strips encryption envelopes in memory, and triggers bundled FFmpeg for stream timestamp correction.',
    },
    {
      id: 'disk',
      title: lang === 'km' ? 'ប្រព័ន្ធផ្ទុកឯកសារ Windows & ប្រវត្តិ' : 'Windows File System & History',
      type: lang === 'km' ? 'ទិន្នន័យ & ថត' : 'Storage & DB',
      desc: lang === 'km'
        ? 'រៀបចំដាក់ក្នុងថតរឿងភាគនីមួយៗ (D:\\HongguoDramas\\[Series]\) សម្អាតតួអក្សរហាមឃាត់ និងកត់ត្រាចូល SQLite។'
        : 'Organizes downloaded episodes into dedicated series directories (D:\\HongguoDramas\\[Series]\), strips illegal NTFS characters, and commits metadata into SQLite history.',
    },
  ];

  return (
    <section id="architecture" className={`py-20 border-t ${
      darkMode ? 'bg-[#0a0d14] border-[#18202d]' : 'bg-white border-slate-200'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#c6f135] uppercase tracking-wider mb-2 font-mono">
            <span>{t.archKicker}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4 text-balance text-white">
            {t.archTitle}
          </h2>
          <p className="text-slate-400 text-base leading-relaxed text-balance">
            {t.archDesc}
          </p>
        </div>

        {/* Visual Architecture Topology Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {/* Column 1: Client UI */}
          <div className="space-y-4">
            <div className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#c6f135]"></span>
              <span>Layer 1: UI</span>
            </div>

            <div 
              onClick={() => setActiveNode('renderer')}
              className={`p-5 rounded-3xl border cursor-pointer transition-all ${
                activeNode === 'renderer'
                  ? 'border-[#c6f135] bg-[#c6f135]/10 shadow-lg shadow-[#c6f135]/15'
                  : 'border-[#1e2a3c] bg-[#111722] hover:border-slate-600'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-white">Renderer Process</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-400">Sandboxed</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                React UI · Discover · Transfers · History · System Log
              </p>
            </div>

            <div className="flex justify-center text-slate-600">
              <ArrowDown className="w-5 h-5" />
            </div>

            <div 
              onClick={() => setActiveNode('bridge')}
              className={`p-5 rounded-3xl border cursor-pointer transition-all ${
                activeNode === 'bridge'
                  ? 'border-[#c6f135] bg-[#c6f135]/10 shadow-lg shadow-[#c6f135]/15'
                  : 'border-[#1e2a3c] bg-[#111722] hover:border-slate-600'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-white">ContextBridge IPC</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#c6f135]/20 text-[#c6f135]">Secure Whitelist</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Guards all IPC calls. Denies arbitrary Node access; only exposes validated methods.
              </p>
            </div>
          </div>

          {/* Column 2: Orchestration */}
          <div className="space-y-4">
            <div className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-400"></span>
              <span>Layer 2: Core</span>
            </div>

            <div 
              onClick={() => setActiveNode('main')}
              className={`p-5 rounded-3xl border cursor-pointer transition-all ${
                activeNode === 'main'
                  ? 'border-[#c6f135] bg-[#c6f135]/10 shadow-lg shadow-[#c6f135]/15'
                  : 'border-[#1e2a3c] bg-[#111722] hover:border-slate-600'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-white">Electron Main Core</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/20 text-amber-400">V8 Bytecode</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Bytenode runtime · Window navigation blocking · Worker pool governor
              </p>
            </div>

            <div className="flex justify-center text-slate-600">
              <ArrowDown className="w-5 h-5" />
            </div>

            <div 
              onClick={() => setActiveNode('workers')}
              className={`p-5 rounded-3xl border cursor-pointer transition-all ${
                activeNode === 'workers'
                  ? 'border-[#c6f135] bg-[#c6f135]/10 shadow-lg shadow-[#c6f135]/15'
                  : 'border-[#1e2a3c] bg-[#111722] hover:border-slate-600'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-white">Worker Pool (1–4)</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-400">HTTP Range</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Streams chunks into .part files with automatic token refresh on 403.
              </p>
            </div>
          </div>

          {/* Column 3: Decryption & Storage */}
          <div className="space-y-4">
            <div className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              <span>Layer 3: Processing & Disk</span>
            </div>

            <div 
              onClick={() => setActiveNode('decryptor')}
              className={`p-5 rounded-3xl border cursor-pointer transition-all ${
                activeNode === 'decryptor'
                  ? 'border-[#c6f135] bg-[#c6f135]/10 shadow-lg shadow-[#c6f135]/15'
                  : 'border-[#1e2a3c] bg-[#111722] hover:border-slate-600'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-white">Crypto Decryptor</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-500/20 text-purple-400">AES / FFmpeg</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Derives transformation keys from mobile payload; FFmpeg remux fallback.
              </p>
            </div>

            <div className="flex justify-center text-slate-600">
              <ArrowDown className="w-5 h-5" />
            </div>

            <div 
              onClick={() => setActiveNode('disk')}
              className={`p-5 rounded-3xl border cursor-pointer transition-all ${
                activeNode === 'disk'
                  ? 'border-[#c6f135] bg-[#c6f135]/10 shadow-lg shadow-[#c6f135]/15'
                  : 'border-[#1e2a3c] bg-[#111722] hover:border-slate-600'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-white">Windows Storage</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-400">Sanitized</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Dedicated series directories · Skip existing files · SQLite history index
              </p>
            </div>
          </div>
        </div>

        {/* Selected Node Details Box */}
        {activeNode && (
          <div className="p-6 rounded-3xl border border-[#1e2a3c] bg-[#0e1420] flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-[#c6f135] uppercase font-bold">
                  {nodes.find(n => n.id === activeNode)?.type}
                </span>
                <span aria-hidden="true" className="text-slate-600">·</span>
                <h4 className="text-base font-bold text-white">
                  {nodes.find(n => n.id === activeNode)?.title}
                </h4>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed max-w-3xl">
                {nodes.find(n => n.id === activeNode)?.desc}
              </p>
            </div>

            <div className="shrink-0 font-mono text-xs">
              <span className="px-3.5 py-1.5 rounded-xl bg-[#111722] border border-[#1f2c3e] text-[#c6f135]">
                Status: Operational
              </span>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
