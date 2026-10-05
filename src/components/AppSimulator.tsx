import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Download, 
  Clock, 
  Activity, 
  Settings, 
  ExternalLink, 
  Clipboard, 
  Sliders, 
  Check, 
  RefreshCw, 
  Film, 
  Folder, 
  Eye, 
  Play, 
  Pause, 
  XCircle, 
  Trash2, 
  Moon, 
  Sun,
  ShieldCheck,
  Send,
  Zap
} from 'lucide-react';
import { Language, TRANSLATIONS } from '../i18n/translations';
import { SAMPLE_SERIES } from '../data/mockData';
import { DramaSeries } from '../types/app';
import { HongguoLogo } from './HongguoLogo';

interface AppSimulatorProps {
  externalDarkMode: boolean;
  lang: Language;
  onToggleLang?: () => void;
}

interface TransferTask {
  id: string;
  seriesTitle: string;
  episodeNumber: number;
  progress: number;
  speed: string;
  status: 'downloading' | 'decrypting' | 'completed' | 'paused';
  fileSize: string;
  downloadedBytes: string;
}

interface HistoryItem {
  id: string;
  seriesTitle: string;
  episodeRange: string;
  completedAt: string;
  fileCount: number;
  totalSize: string;
}

export const AppSimulator: React.FC<AppSimulatorProps> = ({
  externalDarkMode,
  lang,
}) => {
  const t = TRANSLATIONS[lang];

  // Simulator Internal State
  const [internalDarkMode, setInternalDarkMode] = useState(true);
  const [activeTab, setActiveTab] = useState<'discover' | 'transfers' | 'history' | 'log' | 'preferences'>('discover');
  const [inputUrl, setInputUrl] = useState('https://hongguoduanju.com/detail?series_id=7391840291');
  const [isParsing, setIsParsing] = useState(false);
  const [hasInspected, setHasInspected] = useState(false);
  const [currentSeries, setCurrentSeries] = useState<DramaSeries>(SAMPLE_SERIES[0]);
  const [selectedEpisodes, setSelectedEpisodes] = useState<number[]>([1, 2, 3, 4, 5]);

  // Tasks in Transfers
  const [tasks, setTasks] = useState<TransferTask[]>([
    {
      id: 't-1',
      seriesTitle: '顾总的隐婚甜妻 (Sweet Secret Bride)',
      episodeNumber: 1,
      progress: 100,
      speed: '0 KB/s',
      status: 'completed',
      fileSize: '42.8 MB',
      downloadedBytes: '42.8 MB',
    },
    {
      id: 't-2',
      seriesTitle: '顾总的隐婚甜妻 (Sweet Secret Bride)',
      episodeNumber: 2,
      progress: 68,
      speed: '3.4 MB/s',
      status: 'downloading',
      fileSize: '45.1 MB',
      downloadedBytes: '30.6 MB',
    },
    {
      id: 't-3',
      seriesTitle: '顾总的隐婚甜妻 (Sweet Secret Bride)',
      episodeNumber: 3,
      progress: 24,
      speed: '2.8 MB/s',
      status: 'downloading',
      fileSize: '39.7 MB',
      downloadedBytes: '9.5 MB',
    },
  ]);

  // History Items
  const [history, setHistory] = useState<HistoryItem[]>([
    {
      id: 'h-1',
      seriesTitle: '顾总的隐婚甜妻',
      episodeRange: 'Ep 01 – 15',
      completedAt: 'Today, 10:14 AM',
      fileCount: 15,
      totalSize: '624.5 MB',
    },
    {
      id: 'h-2',
      seriesTitle: '重生成首富的继承人',
      episodeRange: 'Ep 01 – 30',
      completedAt: 'Yesterday, 04:22 PM',
      fileCount: 30,
      totalSize: '1.2 GB',
    },
    {
      id: 'h-3',
      seriesTitle: '战神回归都市',
      episodeRange: 'Ep 01 – 10',
      completedAt: 'Oct 03, 2026',
      fileCount: 10,
      totalSize: '412.0 MB',
    },
  ]);

  // System Logs
  const [logs, setLogs] = useState<string[]>([
    '[10:42:01] [Core] HONGGUO DL Engine v1.0.0 started in sandboxed Windows runtime',
    '[10:42:02] [Network] Custom bypass headers initialized for hongguoduanju.com',
    '[10:42:02] [Storage] Output directory confirmed: C:\\Users\\User\\Videos\\Hongguo',
    '[10:42:15] [Parser] Inspected series_id=7391840291 (80 Episodes detected)',
    '[10:42:18] [Worker 1] Downloaded episode 01 (SHA-256 integrity verified)',
    '[10:42:19] [Decryptor] AES-128-CBC payload unlocked, clean MP4 remux complete',
    '[10:42:22] [Worker 2] Downloading episode 02 (68% - 3.4 MB/s)',
  ]);

  // Toast / feedback message
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync external dark mode
  useEffect(() => {
    setInternalDarkMode(externalDarkMode);
  }, [externalDarkMode]);

  // Show Toast
  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  // Simulated Paste
  const handlePaste = () => {
    setInputUrl('https://hongguoduanju.com/detail?series_id=7391840291');
    triggerToast('Pasted Hongguo series link');
  };

  // Simulated Inspect Action
  const handleInspect = () => {
    setIsParsing(true);
    setTimeout(() => {
      setIsParsing(false);
      setHasInspected(true);
      setCurrentSeries(SAMPLE_SERIES[0]);
      triggerToast(`Successfully parsed 80 episodes!`);
      setLogs(prev => [
        `[${new Date().toLocaleTimeString()}] [Parser] Parsed series ID: 7391840291 with 80 episodes`,
        ...prev
      ]);
    }, 900);
  };

  // Toggle Episode selection
  const toggleEpisode = (epNum: number) => {
    if (selectedEpisodes.includes(epNum)) {
      setSelectedEpisodes(selectedEpisodes.filter(e => e !== epNum));
    } else {
      setSelectedEpisodes([...selectedEpisodes, epNum].sort((a, b) => a - b));
    }
  };

  // Start Download
  const handleStartDownload = () => {
    if (selectedEpisodes.length === 0) {
      triggerToast('Please select at least 1 episode');
      return;
    }

    const newTasks: TransferTask[] = selectedEpisodes.slice(0, 3).map((ep, idx) => ({
      id: `task-${Date.now()}-${ep}`,
      seriesTitle: currentSeries.chineseTitle,
      episodeNumber: ep,
      progress: idx === 0 ? 30 : idx === 1 ? 12 : 5,
      speed: `${(2.5 + Math.random() * 2).toFixed(1)} MB/s`,
      status: 'downloading',
      fileSize: `${(38 + Math.random() * 8).toFixed(1)} MB`,
      downloadedBytes: '12.4 MB',
    }));

    setTasks([...newTasks, ...tasks]);
    setActiveTab('transfers');
    triggerToast(`Added ${selectedEpisodes.length} episodes to Transfer Queue!`);
    setLogs(prev => [
      `[${new Date().toLocaleTimeString()}] [TransferQueue] Added ${selectedEpisodes.length} episodes for batch export`,
      ...prev
    ]);
  };

  const activeDownloadingCount = tasks.filter(t => t.status === 'downloading' || t.status === 'decrypting').length;

  return (
    <section id="simulator" className="py-14 sm:py-20 w-full max-w-5xl mx-auto lg:px-8 box-border">
      {/* Section Header */}
      <div className="max-w-2xl mb-8">
        <div className="flex items-center gap-2 text-xs font-semibold text-[#c6f135] uppercase tracking-wider mb-2 font-mono">
          <span>{lang === 'km' ? 'ផ្ទាំងកម្មវិធីជាក់ស្ដែង' : 'Interactive App Sandbox'}</span>
          <span aria-hidden="true">·</span>
          <span>{lang === 'km' ? 'កូពីតាមចំណុចប្រទាក់ពិត 1:1' : '1:1 Pixel-Accurate UI Mirror'}</span>
        </div>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight mb-3 text-white leading-tight">
          {lang === 'km' ? 'បទពិសោធន៍ផ្ទាល់ជាមួយ HONGGUO DL' : 'Experience HONGGUO DL exactly as it runs on Windows.'}
        </h2>
        <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
          {lang === 'km' 
            ? 'ចំណុចប្រទាក់ពិតប្រាកដដែលបានបង្កើតឡើង៖ ការរុករក Discover ជាមួយប៊ូតុង Inspect ពណ៌បៃតងខ្ចី ការទាញយក Transfers និងកំណត់ត្រាប្រព័ន្ធ។'
            : 'Explore the authentic custom dark design system: electric lime Discover navigation, multi-worker Transfers queue, real-time System logs, and Windows Explorer export.'}
        </p>
      </div>

      {/* The Simulated Desktop Window - Faithful to the Screenshot */}
      <div className={`rounded-2xl border transition-all duration-300 shadow-2xl overflow-hidden ${
        internalDarkMode 
          ? 'bg-[#0d1117] border-[#1f2737] text-slate-100' 
          : 'bg-white border-slate-300 text-slate-800'
      }`}>
        {/* Windows Titlebar */}
        <div className={`h-9 border-b px-4 flex items-center justify-between select-none ${
          internalDarkMode ? 'bg-[#0a0d14] border-[#18202d]' : 'bg-slate-100 border-slate-200'
        }`}>
          <div className="flex items-center gap-2">
            <HongguoLogo size={18} />
            <span className="text-xs font-semibold tracking-wide text-slate-300">
              HONGGUO DL
            </span>
          </div>

          <div className="flex items-center gap-3 text-xs text-slate-400">
            <span className="cursor-pointer hover:text-white">─</span>
            <span className="cursor-pointer hover:text-white">□</span>
            <span className="cursor-pointer hover:text-rose-400">✕</span>
          </div>
        </div>

        {/* Top Header Row inside App */}
        <div className={`h-14 sm:h-16 px-4 sm:px-6 border-b flex items-center justify-between ${
          internalDarkMode ? 'bg-[#0a0d14] border-[#18202d]' : 'bg-slate-50 border-slate-200'
        }`}>
          {/* Logo Lockup matching screenshot */}
          <div className="flex items-center gap-3 min-w-0">
            <div className="shrink-0 flex items-center">
              <HongguoLogo size={36} />
            </div>
            <div className="min-w-0">
              <div className="text-sm sm:text-base font-extrabold tracking-tight flex items-center gap-1 leading-none">
                <span className="text-white">HONGGUO</span>
                <span className="text-[#c6f135]">DL</span>
              </div>
              <div className="text-[9px] font-medium tracking-widest uppercase text-slate-500 font-mono mt-0.5 truncate">
                {t.brandSubtitle}
              </div>
            </div>
          </div>

          {/* Top Right Controls: Status pill + Theme toggle */}
          <div className="flex items-center gap-2.5 shrink-0">
            <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${
              internalDarkMode ? 'bg-[#141b26] border-[#222d3d] text-slate-300' : 'bg-white border-slate-200 text-slate-700'
            }`}>
              <span className={`w-2 h-2 rounded-full ${activeDownloadingCount > 0 ? 'bg-[#c6f135] animate-pulse' : 'bg-[#c6f135]'}`}></span>
              <span className="text-[11px] sm:text-xs">{activeDownloadingCount > 0 ? `${activeDownloadingCount} ${t.statusActive}` : t.statusReady}</span>
            </div>

            <button
              onClick={() => setInternalDarkMode(!internalDarkMode)}
              title="Toggle simulator theme"
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/60 transition-colors cursor-pointer"
            >
              {internalDarkMode ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>

        {/* Main Body: Sidebar + Main Stage */}
        <div className="grid grid-cols-1 md:grid-cols-12 min-h-[580px]">
          {/* Sidebar: Horizontal scrollable strip on mobile, vertical 1:1 Windows software sidebar on desktop */}
          <div className={`md:col-span-3 border-b md:border-b-0 md:border-r p-3 sm:p-4 flex flex-col justify-between ${
            internalDarkMode ? 'bg-[#0a0d14] border-[#18202d]' : 'bg-slate-50 border-slate-200'
          }`}>
            <div className="space-y-3 md:space-y-5">
              <div>
                <div className="hidden md:block text-[10px] font-bold text-slate-500 uppercase tracking-widest px-3 mb-2 font-mono">
                  {t.workspace}
                </div>

                <div className="flex flex-wrap md:flex-col md:flex-nowrap gap-1.5">
                  {/* Discover Button - Signature Lime Active Pill */}
                  <button
                    onClick={() => setActiveTab('discover')}
                    className={`whitespace-nowrap shrink-0 md:w-full text-left px-3 sm:px-3.5 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2.5 transition-all cursor-pointer ${
                      activeTab === 'discover'
                        ? 'bg-[#c6f135] text-black shadow-lg shadow-[#c6f135]/25 font-bold'
                        : internalDarkMode
                          ? 'text-slate-400 hover:text-slate-200 hover:bg-[#141b26]'
                          : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200'
                    }`}
                  >
                    <Search className="w-4 h-4 shrink-0" />
                    <span>{t.tabDiscover}</span>
                  </button>

                  {/* Transfers Button */}
                  <button
                    onClick={() => setActiveTab('transfers')}
                    className={`whitespace-nowrap shrink-0 md:w-full text-left px-3 sm:px-3.5 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-medium flex items-center justify-between gap-2 transition-all cursor-pointer ${
                      activeTab === 'transfers'
                        ? 'bg-[#c6f135] text-black shadow-lg shadow-[#c6f135]/25 font-bold'
                        : internalDarkMode
                          ? 'text-slate-400 hover:text-slate-200 hover:bg-[#141b26]'
                          : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Download className="w-4 h-4 shrink-0" />
                      <span>{t.tabTransfers}</span>
                    </div>
                    {activeDownloadingCount > 0 && (
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono ${
                        activeTab === 'transfers' ? 'bg-black text-[#c6f135]' : 'bg-[#c6f135] text-black font-bold'
                      }`}>
                        {activeDownloadingCount}
                      </span>
                    )}
                  </button>

                  {/* History Button */}
                  <button
                    onClick={() => setActiveTab('history')}
                    className={`whitespace-nowrap shrink-0 md:w-full text-left px-3 sm:px-3.5 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-medium flex items-center justify-between gap-2 transition-all cursor-pointer ${
                      activeTab === 'history'
                        ? 'bg-[#c6f135] text-black shadow-lg shadow-[#c6f135]/25 font-bold'
                        : internalDarkMode
                          ? 'text-slate-400 hover:text-slate-200 hover:bg-[#141b26]'
                          : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Clock className="w-4 h-4 shrink-0" />
                      <span>{t.tabHistory}</span>
                    </div>
                    <span className="text-[11px] font-mono text-slate-500">{history.length}</span>
                  </button>

                  {/* System Log Button */}
                  <button
                    onClick={() => setActiveTab('log')}
                    className={`whitespace-nowrap shrink-0 md:w-full text-left px-3 sm:px-3.5 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-medium flex items-center gap-2.5 transition-all cursor-pointer ${
                      activeTab === 'log'
                        ? 'bg-[#c6f135] text-black shadow-lg shadow-[#c6f135]/25 font-bold'
                        : internalDarkMode
                          ? 'text-slate-400 hover:text-slate-200 hover:bg-[#141b26]'
                          : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200'
                    }`}
                  >
                    <Activity className="w-4 h-4 shrink-0" />
                    <span>{t.tabSystemLog}</span>
                  </button>

                  {/* Preferences Button */}
                  <button
                    onClick={() => setActiveTab('preferences')}
                    className={`whitespace-nowrap shrink-0 md:w-full text-left px-3 sm:px-3.5 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-medium flex items-center gap-2.5 transition-all cursor-pointer ${
                      activeTab === 'preferences'
                        ? 'bg-[#c6f135] text-black shadow-lg shadow-[#c6f135]/25 font-bold'
                        : internalDarkMode
                          ? 'text-slate-400 hover:text-slate-200 hover:bg-[#141b26]'
                          : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200'
                    }`}
                  >
                    <Settings className="w-4 h-4 shrink-0" />
                    <span>{t.tabPreferences}</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Sidebar Bottom: Creator pill & run status (Desktop only) */}
            <div className="hidden md:block space-y-3 pt-5">
              {/* Creator Card */}
              <div className={`p-2.5 rounded-xl border flex items-center gap-2.5 ${
                internalDarkMode ? 'bg-[#111722] border-[#1d2737]' : 'bg-white border-slate-200'
              }`}>
                <div className="w-7 h-7 rounded-full bg-[#2aabee] flex items-center justify-center text-white shrink-0 shadow-sm">
                  <Send className="w-3.5 h-3.5 ml-0.5" />
                </div>
                <div>
                  <div className="text-[9px] font-mono tracking-wider uppercase text-slate-500">
                    {t.createdBy}
                  </div>
                  <div className="text-xs font-bold text-slate-200 font-mono">
                    {t.authorHandle}
                  </div>
                </div>
              </div>

              {/* Status indicator line */}
              <div className="flex items-center gap-2 text-[10px] text-slate-500 font-mono px-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>{t.runsOnPc}</span>
              </div>
            </div>
          </div>

          {/* Main Stage Content */}
          <div className="md:col-span-9 p-4 sm:p-6 flex flex-col justify-between overflow-y-auto">
            {/* VIEW: DISCOVER (Exact match to the provided screenshot) */}
            {activeTab === 'discover' && (
              <div className="space-y-5">
                {/* Header Text */}
                <div>
                  <div className="text-[10px] font-mono font-bold tracking-widest uppercase text-slate-500 mb-1">
                    {t.shortDramaOffline}
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight mb-1">
                    {t.appHeadline}
                  </h3>
                  <p className="text-xs text-slate-400 max-w-xl">
                    {t.appDescription}
                  </p>
                </div>

                {/* Search Bar / Input Card */}
                <div className="space-y-2">
                  <div className={`p-1.5 rounded-2xl border flex flex-col sm:flex-row items-stretch sm:items-center gap-2 transition-all ${
                    internalDarkMode 
                      ? 'bg-[#111722] border-[#202b3d] focus-within:border-[#c6f135]/70' 
                      : 'bg-white border-slate-300 focus-within:border-[#c6f135]'
                  }`}>
                    <div className="flex items-center gap-2 pl-2 sm:pl-3 w-full sm:w-auto flex-1">
                      <Search className="w-4 h-4 text-slate-500 shrink-0" />
                      <input
                        type="text"
                        value={inputUrl}
                        onChange={e => setInputUrl(e.target.value)}
                        placeholder={t.inputPlaceholder}
                        className="w-full bg-transparent text-xs font-mono text-slate-100 placeholder-slate-500 focus:outline-none min-w-0"
                      />
                    </div>

                    <div className="flex items-center gap-1.5 justify-end pr-1">
                      <button
                        onClick={() => window.open('https://hongguoduanju.com', '_blank')}
                        className="px-2.5 py-1.5 text-[11px] font-semibold rounded-xl bg-[#161f2e] hover:bg-[#1d293d] text-slate-300 flex items-center gap-1 border border-[#263449] transition-colors cursor-pointer"
                      >
                        <ExternalLink className="w-3 h-3" />
                        <span>{t.btnOpenWebsite}</span>
                      </button>

                      <button
                        onClick={handlePaste}
                        className="px-2.5 py-1.5 text-[11px] font-semibold rounded-xl bg-[#161f2e] hover:bg-[#1d293d] text-slate-300 flex items-center gap-1 border border-[#263449] transition-colors cursor-pointer"
                      >
                        <Clipboard className="w-3 h-3" />
                        <span>{t.btnPaste}</span>
                      </button>

                      <button
                        onClick={handleInspect}
                        disabled={isParsing}
                        className="px-4 py-1.5 text-[11px] font-bold rounded-xl bg-[#c6f135] hover:bg-[#b5e028] text-black flex items-center gap-1 shadow-md shadow-[#c6f135]/20 transition-all active:scale-95 disabled:opacity-50 cursor-pointer"
                      >
                        {isParsing ? (
                          <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                        ) : (
                          <Search className="w-3.5 h-3.5" />
                        )}
                        <span>{t.btnInspect}</span>
                      </button>
                    </div>
                  </div>

                  {/* Quality & Parallel indicator */}
                  <div className="flex items-center gap-2 text-[11px] font-mono text-slate-500 px-1">
                    <Sliders className="w-3 h-3 text-slate-400" />
                    <span>{t.bestQualityParallel}</span>
                  </div>
                </div>

                {/* Discover Canvas: Initial Hero State OR Inspected Series Grid */}
                {!hasInspected ? (
                  /* Initial State Container - Faithful compact mirror to screenshot */
                  <div className="relative rounded-2xl border border-[#1b2536] bg-[#0b0e14] p-6 sm:p-8 text-center overflow-hidden">
                    {/* Subtle grid background pattern */}
                    <div 
                      className="absolute inset-0 opacity-[0.06] pointer-events-none"
                      style={{
                        backgroundImage: `linear-gradient(#c6f135 1px, transparent 1px), linear-gradient(to right, #c6f135 1px, transparent 1px)`,
                        backgroundSize: '24px 24px'
                      }}
                    />

                    {/* Glowing Center Film Icon */}
                    <div className="relative z-10 flex flex-col items-center">
                      <div className="w-14 h-14 rounded-2xl bg-[#121924] border border-[#c6f135]/40 flex items-center justify-center mb-4 shadow-[0_0_30px_rgba(198,241,53,0.12)]">
                        <Film className="w-7 h-7 text-[#c6f135]" />
                      </div>

                      <div className="text-[10px] font-mono font-bold tracking-widest text-slate-500 uppercase mb-1">
                        {t.startHere}
                      </div>

                      <h4 className="text-xl sm:text-2xl font-black text-white tracking-tight mb-1">
                        {t.startHeroTitle}
                      </h4>

                      <p className="text-xs text-slate-400 max-w-sm mx-auto mb-6 leading-relaxed">
                        {t.startHeroDesc}
                      </p>

                      {/* 3 Steps Cards */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 w-full text-left">
                        {/* Step 1 */}
                        <div className="p-3.5 rounded-xl bg-[#111722] border border-[#1f2c3e] relative">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-[11px] font-mono font-bold text-[#c6f135]">01</span>
                            <div className="w-6 h-6 rounded-full bg-[#1b2738] flex items-center justify-center text-[#c6f135]">
                              <Clipboard className="w-3 h-3" />
                            </div>
                          </div>
                          <div className="font-bold text-xs text-white mb-0.5">{t.step1Title}</div>
                          <div className="text-[11px] text-slate-400 leading-relaxed">{t.step1Desc}</div>
                        </div>

                        {/* Step 2 */}
                        <div className="p-3.5 rounded-xl bg-[#111722] border border-[#1f2c3e] relative">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-[11px] font-mono font-bold text-[#c6f135]">02</span>
                            <div className="w-6 h-6 rounded-full bg-[#1b2738] flex items-center justify-center text-[#c6f135]">
                              <Sliders className="w-3 h-3" />
                            </div>
                          </div>
                          <div className="font-bold text-xs text-white mb-0.5">{t.step2Title}</div>
                          <div className="text-[11px] text-slate-400 leading-relaxed">{t.step2Desc}</div>
                        </div>

                        {/* Step 3 */}
                        <div className="p-3.5 rounded-xl bg-[#111722] border border-[#1f2c3e] relative">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-[11px] font-mono font-bold text-[#c6f135]">03</span>
                            <div className="w-6 h-6 rounded-full bg-[#1b2738] flex items-center justify-center text-[#c6f135]">
                              <Download className="w-3 h-3" />
                            </div>
                          </div>
                          <div className="font-bold text-xs text-white mb-0.5">{t.step3Title}</div>
                          <div className="text-[11px] text-slate-400 leading-relaxed">{t.step3Desc}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  /* Inspected Series View */
                  <div className="space-y-4">
                    {/* Series Overview Card */}
                    <div className="p-4 rounded-2xl bg-[#111722] border border-[#1f2c3e] flex flex-col sm:flex-row gap-4 items-start">
                      <div className={`w-20 h-28 rounded-xl bg-gradient-to-br ${currentSeries.coverGradient} shadow-xl shrink-0 flex flex-col justify-between p-2.5 text-white`}>
                        <span className="text-[9px] font-mono opacity-80">红果</span>
                        <div>
                          <div className="text-[11px] font-bold leading-tight">{currentSeries.chineseTitle.slice(0, 6)}</div>
                          <div className="text-[9px] opacity-75">{currentSeries.totalEpisodes} Eps</div>
                        </div>
                      </div>

                      <div className="flex-1 space-y-1.5">
                        <div className="flex items-center justify-between">
                          <h4 className="text-base font-bold text-white">
                            {currentSeries.chineseTitle}
                            <span className="text-xs font-normal text-slate-400 ml-2">({currentSeries.title})</span>
                          </h4>
                          <button
                            onClick={() => setHasInspected(false)}
                            className="text-xs text-slate-400 hover:text-white underline font-mono cursor-pointer"
                          >
                            Reset
                          </button>
                        </div>

                        <p className="text-xs text-slate-300 leading-relaxed line-clamp-2">
                          {currentSeries.description}
                        </p>

                        <div className="flex flex-wrap items-center gap-2.5 text-xs text-slate-400 pt-1">
                          <span>{t.rating}: <strong className="text-[#c6f135] font-mono">{currentSeries.rating}</strong></span>
                          <span>·</span>
                          <span>{t.studio}: <strong className="text-slate-200">{currentSeries.author}</strong></span>
                          <span>·</span>
                          <span>{t.totalEpisodes}: <strong className="text-slate-200 font-mono">{currentSeries.totalEpisodes}</strong></span>
                        </div>
                      </div>
                    </div>

                    {/* Batch Actions & Grid */}
                    <div className="flex flex-wrap items-center justify-between gap-2.5 pt-1">
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => setSelectedEpisodes(currentSeries.episodes.map(e => e.episodeNumber))}
                          className="px-3 py-1 text-xs font-semibold rounded-lg bg-[#161f2e] border border-[#273549] text-slate-200 hover:bg-[#1f2c3e] cursor-pointer"
                        >
                          {t.selectAll} ({currentSeries.totalEpisodes})
                        </button>
                        <button
                          onClick={() => setSelectedEpisodes(currentSeries.episodes.filter(e => e.isFree).map(e => e.episodeNumber))}
                          className="px-3 py-1 text-xs font-semibold rounded-lg bg-[#161f2e] border border-[#273549] text-slate-200 hover:bg-[#1f2c3e] cursor-pointer"
                        >
                          {t.selectFree} (1–{currentSeries.freeEpisodes})
                        </button>
                        <button
                          onClick={() => setSelectedEpisodes([])}
                          className="px-2.5 py-1 text-xs font-semibold rounded-lg border border-transparent text-slate-400 hover:text-white cursor-pointer"
                        >
                          {lang === 'km' ? 'ដោះចេញទាំងអស់' : 'Deselect All'}
                        </button>
                      </div>

                      <div className="text-xs font-mono text-slate-400">
                        {t.selectedCount}: <span className="text-[#c6f135] font-bold">{selectedEpisodes.length}</span> / {currentSeries.totalEpisodes}
                      </div>
                    </div>

                    {/* Episode Numbers Grid */}
                    <div className="max-h-56 overflow-y-auto p-2.5 rounded-xl bg-[#0b0e14] border border-[#1b2536]">
                      <div className="grid grid-cols-5 sm:grid-cols-8 md:grid-cols-10 gap-1.5">
                        {currentSeries.episodes.map(ep => {
                          const isSelected = selectedEpisodes.includes(ep.episodeNumber);
                          return (
                            <button
                              key={ep.episodeNumber}
                              onClick={() => toggleEpisode(ep.episodeNumber)}
                              className={`h-9 rounded-lg text-xs font-mono font-bold transition-all relative flex items-center justify-center cursor-pointer ${
                                isSelected
                                  ? 'bg-[#c6f135] text-black shadow-sm font-black'
                                  : ep.isFree
                                    ? 'bg-[#141d2a] text-slate-200 border border-[#202d40] hover:border-slate-500'
                                    : 'bg-[#0f1520] text-slate-400 border border-[#192230] hover:border-slate-600'
                              }`}
                            >
                              <span>{ep.episodeNumber < 10 ? `0${ep.episodeNumber}` : ep.episodeNumber}</span>
                              {ep.isFree && !isSelected && (
                                <span className="absolute top-1 right-1 w-1 h-1 rounded-full bg-emerald-400"></span>
                              )}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Action Bar */}
                    <div className="pt-2 flex items-center justify-end gap-3">
                      <button
                        onClick={handleStartDownload}
                        disabled={selectedEpisodes.length === 0}
                        className="w-full sm:w-auto px-6 py-2.5 text-xs font-bold rounded-xl bg-[#c6f135] hover:bg-[#b5e028] text-black flex items-center justify-center gap-2 shadow-lg shadow-[#c6f135]/25 active:scale-95 disabled:opacity-40 cursor-pointer"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>{t.downloadSelected} ({selectedEpisodes.length})</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* VIEW: TRANSFERS QUEUE */}
            {activeTab === 'transfers' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-white tracking-tight">{t.tabTransfers}</h3>
                    <p className="text-xs text-slate-400">{lang === 'km' ? 'បញ្ជីទាញយកសកម្ម' : 'Active download tasks'}</p>
                  </div>
                  <button
                    onClick={() => {
                      setTasks([]);
                      triggerToast('Cleared transfer list');
                    }}
                    className="text-xs font-mono text-slate-400 hover:text-white underline cursor-pointer"
                  >
                    Clear All
                  </button>
                </div>

                <div className="space-y-2.5">
                  {tasks.length === 0 ? (
                    <div className="p-12 text-center rounded-2xl bg-[#0b0e14] border border-[#1b2536]">
                      <Download className="w-8 h-8 mx-auto mb-2 text-slate-600" />
                      <div className="text-xs text-slate-400 font-mono">No active downloads in queue</div>
                    </div>
                  ) : (
                    tasks.map(task => (
                      <div
                        key={task.id}
                        className="p-3.5 rounded-xl bg-[#111722] border border-[#1f2c3e] space-y-2"
                      >
                        <div className="flex items-center justify-between text-xs">
                          <div className="font-bold text-white flex items-center gap-2">
                            <span>{task.seriesTitle}</span>
                            <span className="font-mono text-[#c6f135]">Ep {task.episodeNumber < 10 ? `0${task.episodeNumber}` : task.episodeNumber}</span>
                          </div>
                          <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full font-bold ${
                            task.status === 'completed'
                              ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                              : 'bg-[#c6f135]/20 text-[#c6f135] border border-[#c6f135]/30 animate-pulse'
                          }`}>
                            {task.status.toUpperCase()}
                          </span>
                        </div>

                        {/* Progress Bar */}
                        <div className="w-full bg-[#182333] h-1.5 rounded-full overflow-hidden">
                          <div
                            className={`h-full transition-all duration-300 ${
                              task.status === 'completed' ? 'bg-emerald-400' : 'bg-[#c6f135]'
                            }`}
                            style={{ width: `${task.progress}%` }}
                          />
                        </div>

                        <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
                          <span>{task.downloadedBytes} / {task.fileSize} ({task.progress}%)</span>
                          <span>{task.speed}</span>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}

            {/* VIEW: HISTORY */}
            {activeTab === 'history' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-white tracking-tight">{t.tabHistory}</h3>
                    <p className="text-xs text-slate-400">{lang === 'km' ? 'ប្រវត្តិនៃការទាញយកកន្លងមក' : 'Completed downloads and exports'}</p>
                  </div>
                  <button
                    onClick={() => triggerToast('Opened folder: C:\\Users\\User\\Videos\\Hongguo')}
                    className="px-3 py-1 text-xs font-semibold rounded-lg bg-[#161f2e] border border-[#273549] text-slate-200 hover:bg-[#1f2c3e] flex items-center gap-1.5 cursor-pointer"
                  >
                    <Folder className="w-3.5 h-3.5 text-[#c6f135]" />
                    <span>Open Output Folder</span>
                  </button>
                </div>

                <div className="space-y-2">
                  {history.map(item => (
                    <div
                      key={item.id}
                      className="p-3 rounded-xl bg-[#111722] border border-[#1f2c3e] flex items-center justify-between gap-3 text-xs"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-8 h-8 rounded-lg bg-[#162130] flex items-center justify-center text-[#c6f135] shrink-0">
                          <Film className="w-4 h-4" />
                        </div>
                        <div className="min-w-0">
                          <div className="font-bold text-white truncate">{item.seriesTitle}</div>
                          <div className="text-[11px] text-slate-400 font-mono [overflow-wrap:anywhere]">
                            {item.episodeRange} · {item.fileCount} MP4 files · {item.totalSize}
                          </div>
                        </div>
                      </div>
                      <span className="text-[11px] font-mono text-slate-500 shrink-0">{item.completedAt}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* VIEW: SYSTEM LOG */}
            {activeTab === 'log' && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-white tracking-tight">{t.tabSystemLog}</h3>
                  <button
                    onClick={() => triggerToast('Logs exported to console.txt')}
                    className="text-xs text-[#c6f135] hover:underline font-mono cursor-pointer"
                  >
                    Export Log
                  </button>
                </div>

                <div className="p-3 rounded-xl bg-[#090d14] border border-[#1a2538] font-mono text-xs text-slate-300 space-y-1.5 max-h-72 overflow-y-auto">
                  {logs.map((log, i) => (
                    <div key={i} className="leading-relaxed">
                      <span className="text-[#c6f135]">{log.slice(0, 10)}</span>
                      <span>{log.slice(10)}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* VIEW: PREFERENCES */}
            {activeTab === 'preferences' && (
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-white tracking-tight">{t.tabPreferences}</h3>
                
                <div className="space-y-3">
                  <div className="p-3.5 rounded-xl bg-[#111722] border border-[#1f2c3e] flex items-center justify-between">
                    <div>
                      <div className="text-xs font-bold text-white">Default Download Path</div>
                      <div className="text-[11px] font-mono text-slate-400">C:\Users\User\Videos\Hongguo</div>
                    </div>
                    <button
                      onClick={() => triggerToast('Selected folder: C:\\Users\\User\\Videos\\Hongguo')}
                      className="px-3 py-1 text-xs font-semibold rounded-lg bg-[#161f2e] border border-[#273549] text-slate-200 cursor-pointer"
                    >
                      Browse
                    </button>
                  </div>

                  <div className="p-3.5 rounded-xl bg-[#111722] border border-[#1f2c3e] flex items-center justify-between">
                    <div>
                      <div className="text-xs font-bold text-white">Max Parallel Streams</div>
                      <div className="text-[11px] text-slate-400">2 workers (recommended for network stability)</div>
                    </div>
                    <span className="text-xs font-mono font-bold text-[#c6f135] px-2 py-0.5 rounded bg-[#161f2e] border border-[#273549]">
                      2
                    </span>
                  </div>

                  <div className="p-3.5 rounded-xl bg-[#111722] border border-[#1f2c3e] flex items-center justify-between">
                    <div>
                      <div className="text-xs font-bold text-white">Auto AES Decryption</div>
                      <div className="text-[11px] text-slate-400">Decodes raw encrypted chunks into normal MP4</div>
                    </div>
                    <span className="text-xs font-mono font-bold text-emerald-400">ENABLED</span>
                  </div>
                </div>
              </div>
            )}

            {/* Toast Notification */}
            {toastMessage && (
              <div className="fixed bottom-6 right-6 z-50 px-4 py-2 rounded-xl bg-[#c6f135] text-black font-bold text-xs shadow-2xl animate-in fade-in slide-in-from-bottom-2 duration-200">
                {toastMessage}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
