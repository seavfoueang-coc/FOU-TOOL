import React, { useState, useEffect } from 'react';
import { SAMPLE_SERIES } from '../data/mockData';
import { DramaSeries, DownloadTask, HistoryItem } from '../types/app';
import { Language, TRANSLATIONS } from '../i18n/translations';
import { 
  Search, Download, Clock, Activity, Settings, ExternalLink, 
  Clipboard, Film, Sliders, Play, Pause, XCircle, CheckCircle2, 
  Folder, RefreshCw, Check, Eye, Sun, Moon, Send, ArrowRight
} from 'lucide-react';

interface AppSimulatorProps {
  externalDarkMode: boolean;
  lang: Language;
  onToggleLang?: () => void;
}

export const AppSimulator: React.FC<AppSimulatorProps> = ({ 
  externalDarkMode, 
  lang,
  onToggleLang 
}) => {
  const t = TRANSLATIONS[lang];

  // App internal state
  const [internalDarkMode, setInternalDarkMode] = useState(true);
  const [activeTab, setActiveTab] = useState<'discover' | 'transfers' | 'history' | 'log' | 'preferences'>('discover');
  
  // Discover view states
  const [hasInspected, setHasInspected] = useState(false);
  const [inputUrl, setInputUrl] = useState('https://hongguoduanju.com/detail?series_id=7391840291');
  const [currentSeries, setCurrentSeries] = useState<DramaSeries>(SAMPLE_SERIES[0]);
  const [isParsing, setIsParsing] = useState(false);
  const [selectedEpisodes, setSelectedEpisodes] = useState<number[]>([1, 2, 3, 4, 5, 6]);

  // Transfers queue state
  const [tasks, setTasks] = useState<DownloadTask[]>([
    {
      id: 'task-1',
      seriesId: SAMPLE_SERIES[0].id,
      seriesTitle: SAMPLE_SERIES[0].title,
      episodeNumber: 1,
      progress: 100,
      downloadSpeed: '0 MB/s',
      totalBytes: 19300000,
      downloadedBytes: 19300000,
      status: 'completed',
      partFile: 'EP001_Banquet_Betrayal.part',
      targetFile: 'EP001 - Banquet Betrayal.mp4',
      sourceType: 'mobile_api',
      retryCount: 0,
    },
    {
      id: 'task-2',
      seriesId: SAMPLE_SERIES[0].id,
      seriesTitle: SAMPLE_SERIES[0].title,
      episodeNumber: 2,
      progress: 88,
      downloadSpeed: '8.4 MB/s',
      totalBytes: 21400000,
      downloadedBytes: 18832000,
      status: 'decrypting',
      partFile: 'EP002_Awakening_at_Dusk.part',
      targetFile: 'EP002 - Awakening at Dusk.mp4',
      sourceType: 'mobile_api',
      retryCount: 0,
    },
    {
      id: 'task-3',
      seriesId: SAMPLE_SERIES[0].id,
      seriesTitle: SAMPLE_SERIES[0].title,
      episodeNumber: 3,
      progress: 54,
      downloadSpeed: '7.1 MB/s',
      totalBytes: 20500000,
      downloadedBytes: 11070000,
      status: 'downloading',
      partFile: 'EP003_Unraveling_the_Poison.part',
      targetFile: 'EP003 - Unraveling the Poison.mp4',
      sourceType: 'mobile_api',
      retryCount: 0,
    },
  ]);

  // History state
  const [history, setHistory] = useState<HistoryItem[]>([
    {
      id: 'hist-1',
      seriesTitle: SAMPLE_SERIES[0].title,
      episodeNumber: 1,
      filePath: 'D:\\HongguoDramas\\The Reborn Empress of Jiangnan\\EP001 - Banquet Betrayal.mp4',
      fileSizeMb: 19.3,
      completedAt: 'Just now',
      duration: '01:42',
      resolution: '1080p 60fps',
    },
  ]);

  // System logs
  const [logs, setLogs] = useState<string[]>([
    '[10:42:01] [Core] HONGGUO DL Engine v1.4.2 started in sandboxed V8 bytecode VM',
    '[10:42:02] [Auth] Generated synthetic Android device ID: a6f9b8c01d423e88',
    '[10:42:05] [Scraper] Connected to hongguoduanju.com/series/7391840291 (Status: 200 OK)',
    '[10:42:06] [Scraper] Parsed catalog: "The Reborn Empress of Jiangnan", 80 episodes indexed',
    '[10:42:10] [Engine] Worker pool initialized with concurrency limit: 2 parallel streams',
    '[10:42:15] [Crypto] Derived AES XOR transformation key from mobile payload header',
    '[10:42:20] [Transfer] EP001 decrypted and committed to disk. Byte completeness verified.',
  ]);

  // Settings
  const [concurrency, setConcurrency] = useState<number>(2);
  const [downloadFolder, setDownloadFolder] = useState('D:\\HongguoDramas');
  const [autoDecrypt, setAutoDecrypt] = useState(true);
  const [selectedQuality, setSelectedQuality] = useState<'1080p' | '720p'>('1080p');

  // Video preview modal
  const [previewingItem, setPreviewingItem] = useState<HistoryItem | null>(null);

  // Live progress simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setTasks(prevTasks => {
        return prevTasks.map(t => {
          if (t.status === 'downloading') {
            const nextProgress = Math.min(100, t.progress + Math.floor(Math.random() * 8) + 4);
            if (nextProgress >= 100) {
              return {
                ...t,
                progress: 100,
                status: 'decrypting',
                downloadSpeed: 'Decrypting...',
              };
            }
            return {
              ...t,
              progress: nextProgress,
              downloadSpeed: `${(6.0 + Math.random() * 3.5).toFixed(1)} MB/s`,
            };
          } else if (t.status === 'decrypting') {
            const shouldFinish = Math.random() > 0.45;
            if (shouldFinish) {
              const newHistItem: HistoryItem = {
                id: `hist-${Date.now()}-${t.episodeNumber}`,
                seriesTitle: t.seriesTitle,
                episodeNumber: t.episodeNumber,
                filePath: `${downloadFolder}\\${t.seriesTitle}\\${t.targetFile}`,
                fileSizeMb: Number((t.totalBytes / (1024 * 1024)).toFixed(1)),
                completedAt: 'Just now',
                duration: '01:45',
                resolution: '1080p',
              };
              setHistory(h => [newHistItem, ...h.filter(item => !(item.seriesTitle === t.seriesTitle && item.episodeNumber === t.episodeNumber))]);
              setLogs(l => [`[${new Date().toLocaleTimeString()}] [Transfer] Saved ${t.targetFile} to ${downloadFolder}`, ...l.slice(0, 40)]);
              return {
                ...t,
                status: 'completed',
                downloadSpeed: '0 MB/s',
              };
            }
          }
          return t;
        });
      });
    }, 1200);

    return () => clearInterval(interval);
  }, [downloadFolder]);

  // Inspect link handler
  const handleInspect = () => {
    setIsParsing(true);
    setLogs(l => [`[${new Date().toLocaleTimeString()}] [Scraper] Handshaking with URL: ${inputUrl}`, ...l]);
    setTimeout(() => {
      const match = SAMPLE_SERIES.find(s => inputUrl.includes(s.id) || s.sampleUrl === inputUrl) || SAMPLE_SERIES[0];
      setCurrentSeries(match);
      setHasInspected(true);
      setIsParsing(false);
      setLogs(l => [`[${new Date().toLocaleTimeString()}] [Scraper] Parsed: "${match.title}" (${match.totalEpisodes} episodes)`, ...l]);
    }, 600);
  };

  const handlePaste = async () => {
    try {
      if (navigator.clipboard) {
        const text = await navigator.clipboard.readText();
        if (text) setInputUrl(text);
      }
    } catch {
      setInputUrl(SAMPLE_SERIES[1].sampleUrl);
    }
  };

  // Toggle episode
  const toggleEpisode = (epNum: number) => {
    if (selectedEpisodes.includes(epNum)) {
      setSelectedEpisodes(selectedEpisodes.filter(n => n !== epNum));
    } else {
      setSelectedEpisodes([...selectedEpisodes, epNum].sort((a, b) => a - b));
    }
  };

  // Start downloads
  const startDownloadBatch = () => {
    const newTasks: DownloadTask[] = selectedEpisodes.map(epNum => {
      const ep = currentSeries.episodes.find(e => e.episodeNumber === epNum);
      const isAlreadyCompleted = history.some(h => h.seriesTitle === currentSeries.title && h.episodeNumber === epNum);
      
      return {
        id: `task-${Date.now()}-${epNum}`,
        seriesId: currentSeries.id,
        seriesTitle: currentSeries.title,
        episodeNumber: epNum,
        progress: isAlreadyCompleted ? 100 : 0,
        downloadSpeed: isAlreadyCompleted ? 'Skipped' : 'Connecting...',
        totalBytes: (ep?.fileSizeMb || 20) * 1024 * 1024,
        downloadedBytes: isAlreadyCompleted ? (ep?.fileSizeMb || 20) * 1024 * 1024 : 0,
        status: isAlreadyCompleted ? 'completed' : 'downloading',
        partFile: `EP${String(epNum).padStart(3, '0')}_${(ep?.title || 'Episode').replace(/[^a-zA-Z0-9]/g, '_')}.part`,
        targetFile: `EP${String(epNum).padStart(3, '0')} - ${(ep?.title || 'Episode').replace(/[^a-zA-Z0-9 ]/g, '')}.mp4`,
        sourceType: 'mobile_api',
        retryCount: 0,
      };
    });

    setTasks(prev => [...newTasks, ...prev.filter(t => !selectedEpisodes.includes(t.episodeNumber))]);
    setActiveTab('transfers');
    setLogs(l => [`[${new Date().toLocaleTimeString()}] [Queue] Added ${selectedEpisodes.length} episodes to transfer queue`, ...l]);
  };

  const activeDownloadingCount = tasks.filter(t => t.status === 'downloading' || t.status === 'decrypting').length;

  return (
    <section id="simulator" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Section Header */}
      <div className="max-w-3xl mb-8">
        <div className="flex items-center gap-2 text-xs font-semibold text-[#c6f135] uppercase tracking-wider mb-2">
          <span>{lang === 'km' ? 'ផ្ទាំងកម្មវិធីជាក់ស្ដែង' : 'Interactive App Sandbox'}</span>
          <span aria-hidden="true">·</span>
          <span>{lang === 'km' ? 'កូពីតាមចំណុចប្រទាក់ពិត 1:1' : '1:1 Pixel-Accurate UI Mirror'}</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4 text-balance">
          {lang === 'km' ? 'បទពិសោធន៍ផ្ទាល់ជាមួយ HONGGUO DL' : 'Experience HONGGUO DL exactly as it runs on Windows.'}
        </h2>
        <p className="text-slate-400 text-base leading-relaxed text-balance">
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
        <div className={`h-10 border-b px-4 flex items-center justify-between select-none ${
          internalDarkMode ? 'bg-[#0a0d14] border-[#18202d]' : 'bg-slate-100 border-slate-200'
        }`}>
          <div className="flex items-center gap-2.5">
            <div className="w-4 h-4 rounded-sm bg-[#161f2e] border border-[#c6f135]/60 flex items-center justify-center text-[9px] font-bold text-[#c6f135]">
              HG
            </div>
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
        <div className={`h-16 px-6 border-b flex items-center justify-between ${
          internalDarkMode ? 'bg-[#0a0d14] border-[#18202d]' : 'bg-slate-50 border-slate-200'
        }`}>
          {/* Logo Lockup matching screenshot */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#141b26] border border-[#c6f135]/40 flex items-center justify-center shadow-inner relative">
              <span className="font-extrabold text-sm text-[#c6f135] tracking-tighter">HG</span>
              <span className="absolute bottom-1 right-1 w-1.5 h-1.5 rounded-full bg-[#c6f135]"></span>
            </div>
            <div>
              <div className="text-base font-extrabold tracking-tight flex items-center gap-1.5">
                <span className="text-white">HONGGUO</span>
                <span className="text-[#c6f135]">DL</span>
              </div>
              <div className="text-[10px] font-medium tracking-widest uppercase text-slate-500 font-mono">
                {t.brandSubtitle}
              </div>
            </div>
          </div>

          {/* Top Right Controls: Status pill + Theme toggle + Language */}
          <div className="flex items-center gap-3">
            <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium border ${
              internalDarkMode ? 'bg-[#141b26] border-[#222d3d] text-slate-300' : 'bg-white border-slate-200 text-slate-700'
            }`}>
              <span className={`w-2 h-2 rounded-full ${activeDownloadingCount > 0 ? 'bg-[#c6f135] animate-pulse' : 'bg-[#c6f135]'}`}></span>
              <span>{activeDownloadingCount > 0 ? `${activeDownloadingCount} ${t.statusActive}` : t.statusReady}</span>
            </div>

            <button
              onClick={() => setInternalDarkMode(!internalDarkMode)}
              title="Toggle simulator theme"
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/60 transition-colors"
            >
              {internalDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Main Body: Sidebar + Main Stage */}
        <div className="grid grid-cols-1 md:grid-cols-12 min-h-[640px]">
          {/* Sidebar */}
          <div className={`md:col-span-3 border-r p-4 flex flex-col justify-between ${
            internalDarkMode ? 'bg-[#0a0d14] border-[#18202d]' : 'bg-slate-50 border-slate-200'
          }`}>
            <div className="space-y-6">
              <div>
                <div className="text-[11px] font-bold text-slate-500 uppercase tracking-widest px-3 mb-2 font-mono">
                  {t.workspace}
                </div>

                <div className="space-y-1.5">
                  {/* Discover Button - Signature Lime Active Pill */}
                  <button
                    onClick={() => setActiveTab('discover')}
                    className={`w-full text-left px-4 py-3 rounded-2xl text-sm font-semibold flex items-center gap-3 transition-all ${
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
                    className={`w-full text-left px-4 py-3 rounded-2xl text-sm font-medium flex items-center justify-between transition-all ${
                      activeTab === 'transfers'
                        ? 'bg-[#c6f135] text-black shadow-lg shadow-[#c6f135]/25 font-bold'
                        : internalDarkMode
                          ? 'text-slate-400 hover:text-slate-200 hover:bg-[#141b26]'
                          : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Download className="w-4 h-4 shrink-0" />
                      <span>{t.tabTransfers}</span>
                    </div>
                    {activeDownloadingCount > 0 && (
                      <span className={`px-2 py-0.5 rounded-full text-xs font-mono ${
                        activeTab === 'transfers' ? 'bg-black text-[#c6f135]' : 'bg-[#c6f135] text-black font-bold'
                      }`}>
                        {activeDownloadingCount}
                      </span>
                    )}
                  </button>

                  {/* History Button */}
                  <button
                    onClick={() => setActiveTab('history')}
                    className={`w-full text-left px-4 py-3 rounded-2xl text-sm font-medium flex items-center justify-between transition-all ${
                      activeTab === 'history'
                        ? 'bg-[#c6f135] text-black shadow-lg shadow-[#c6f135]/25 font-bold'
                        : internalDarkMode
                          ? 'text-slate-400 hover:text-slate-200 hover:bg-[#141b26]'
                          : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Clock className="w-4 h-4 shrink-0" />
                      <span>{t.tabHistory}</span>
                    </div>
                    <span className="text-xs font-mono text-slate-500">{history.length}</span>
                  </button>

                  {/* System Log Button */}
                  <button
                    onClick={() => setActiveTab('log')}
                    className={`w-full text-left px-4 py-3 rounded-2xl text-sm font-medium flex items-center gap-3 transition-all ${
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
                    className={`w-full text-left px-4 py-3 rounded-2xl text-sm font-medium flex items-center gap-3 transition-all ${
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

            {/* Sidebar Bottom: Creator pill & run status */}
            <div className="space-y-3 pt-6">
              {/* Creator Card */}
              <div className={`p-3 rounded-2xl border flex items-center gap-3 ${
                internalDarkMode ? 'bg-[#111722] border-[#1d2737]' : 'bg-white border-slate-200'
              }`}>
                <div className="w-8 h-8 rounded-full bg-[#2aabee] flex items-center justify-center text-white shrink-0 shadow-md">
                  <Send className="w-4 h-4 ml-0.5" />
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
          <div className="md:col-span-9 p-6 md:p-8 flex flex-col justify-between overflow-y-auto">
            {/* VIEW: DISCOVER (Exact match to the provided screenshot) */}
            {activeTab === 'discover' && (
              <div className="space-y-6">
                {/* Header Text */}
                <div>
                  <div className="text-[11px] font-mono font-bold tracking-widest uppercase text-slate-500 mb-2">
                    {t.shortDramaOffline}
                  </div>
                  <h3 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mb-2">
                    {t.appHeadline}
                  </h3>
                  <p className="text-sm text-slate-400 max-w-2xl leading-relaxed">
                    {t.appDescription}
                  </p>
                </div>

                {/* Search Bar / Input Card */}
                <div className="space-y-2.5">
                  <div className={`p-1.5 rounded-2xl border flex flex-col sm:flex-row items-center gap-2 transition-all ${
                    internalDarkMode 
                      ? 'bg-[#111722] border-[#202b3d] focus-within:border-[#c6f135]/70' 
                      : 'bg-white border-slate-300 focus-within:border-[#c6f135]'
                  }`}>
                    <div className="flex items-center gap-3 pl-3 w-full sm:w-auto flex-1">
                      <Search className="w-5 h-5 text-slate-500 shrink-0" />
                      <input
                        type="text"
                        value={inputUrl}
                        onChange={e => setInputUrl(e.target.value)}
                        placeholder={t.inputPlaceholder}
                        className="w-full bg-transparent text-xs sm:text-sm font-mono text-slate-100 placeholder-slate-500 focus:outline-none"
                      />
                    </div>

                    <div className="flex items-center gap-2 w-full sm:w-auto justify-end pr-1 pb-1 sm:pb-0">
                      <button
                        onClick={() => window.open('https://hongguoduanju.com', '_blank')}
                        className="px-3.5 py-2 text-xs font-semibold rounded-xl bg-[#161f2e] hover:bg-[#1d293d] text-slate-300 flex items-center gap-1.5 border border-[#263449] transition-colors"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span>{t.btnOpenWebsite}</span>
                      </button>

                      <button
                        onClick={handlePaste}
                        className="px-3.5 py-2 text-xs font-semibold rounded-xl bg-[#161f2e] hover:bg-[#1d293d] text-slate-300 flex items-center gap-1.5 border border-[#263449] transition-colors"
                      >
                        <Clipboard className="w-3.5 h-3.5" />
                        <span>{t.btnPaste}</span>
                      </button>

                      <button
                        onClick={handleInspect}
                        disabled={isParsing}
                        className="px-5 py-2 text-xs font-bold rounded-xl bg-[#c6f135] hover:bg-[#b5e028] text-black flex items-center gap-1.5 shadow-md shadow-[#c6f135]/20 transition-all active:scale-95 disabled:opacity-50"
                      >
                        {isParsing ? (
                          <RefreshCw className="w-4 h-4 animate-spin" />
                        ) : (
                          <Search className="w-4 h-4" />
                        )}
                        <span>{t.btnInspect}</span>
                      </button>
                    </div>
                  </div>

                  {/* Quality & Parallel indicator */}
                  <div className="flex items-center gap-2 text-xs font-mono text-slate-500 px-2">
                    <Sliders className="w-3.5 h-3.5 text-slate-400" />
                    <span>{t.bestQualityParallel}</span>
                  </div>
                </div>

                {/* Discover Canvas: Initial Hero State OR Inspected Series Grid */}
                {!hasInspected ? (
                  /* Initial State Container - Direct match to screenshot! */
                  <div className="relative rounded-3xl border border-[#1b2536] bg-[#0b0e14] p-8 sm:p-12 text-center overflow-hidden">
                    {/* Subtle grid background pattern */}
                    <div 
                      className="absolute inset-0 opacity-[0.08] pointer-events-none"
                      style={{
                        backgroundImage: `linear-gradient(#c6f135 1px, transparent 1px), linear-gradient(to right, #c6f135 1px, transparent 1px)`,
                        backgroundSize: '32px 32px'
                      }}
                    />

                    {/* Glowing Center Film Icon */}
                    <div className="relative z-10 flex flex-col items-center">
                      <div className="w-20 h-20 rounded-2xl bg-[#121924] border border-[#c6f135]/40 flex items-center justify-center mb-6 shadow-[0_0_40px_rgba(198,241,53,0.15)]">
                        <Film className="w-9 h-9 text-[#c6f135]" />
                      </div>

                      <div className="text-[11px] font-mono font-bold tracking-widest text-slate-500 uppercase mb-2">
                        {t.startHere}
                      </div>

                      <h4 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-2">
                        {t.startHeroTitle}
                      </h4>

                      <p className="text-xs sm:text-sm text-slate-400 max-w-md mx-auto mb-10 leading-relaxed">
                        {t.startHeroDesc}
                      </p>

                      {/* 3 Steps Cards */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-3xl text-left">
                        {/* Step 1 */}
                        <div className="p-5 rounded-2xl bg-[#111722] border border-[#1f2c3e] relative">
                          <div className="flex items-center justify-between mb-3">
                            <span className="text-xs font-mono font-bold text-[#c6f135]">01</span>
                            <div className="w-7 h-7 rounded-full bg-[#1b2738] flex items-center justify-center text-[#c6f135]">
                              <Clipboard className="w-3.5 h-3.5" />
                            </div>
                          </div>
                          <div className="font-bold text-sm text-white mb-1">{t.step1Title}</div>
                          <div className="text-xs text-slate-400 leading-relaxed">{t.step1Desc}</div>
                        </div>

                        {/* Step 2 */}
                        <div className="p-5 rounded-2xl bg-[#111722] border border-[#1f2c3e] relative">
                          <div className="flex items-center justify-between mb-3">
                            <span className="text-xs font-mono font-bold text-[#c6f135]">02</span>
                            <div className="w-7 h-7 rounded-full bg-[#1b2738] flex items-center justify-center text-[#c6f135]">
                              <Sliders className="w-3.5 h-3.5" />
                            </div>
                          </div>
                          <div className="font-bold text-sm text-white mb-1">{t.step2Title}</div>
                          <div className="text-xs text-slate-400 leading-relaxed">{t.step2Desc}</div>
                        </div>

                        {/* Step 3 */}
                        <div className="p-5 rounded-2xl bg-[#111722] border border-[#1f2c3e] relative">
                          <div className="flex items-center justify-between mb-3">
                            <span className="text-xs font-mono font-bold text-[#c6f135]">03</span>
                            <div className="w-7 h-7 rounded-full bg-[#1b2738] flex items-center justify-center text-[#c6f135]">
                              <Download className="w-3.5 h-3.5" />
                            </div>
                          </div>
                          <div className="font-bold text-sm text-white mb-1">{t.step3Title}</div>
                          <div className="text-xs text-slate-400 leading-relaxed">{t.step3Desc}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  /* Inspected Series View */
                  <div className="space-y-5">
                    {/* Series Overview Card */}
                    <div className="p-5 rounded-2xl bg-[#111722] border border-[#1f2c3e] flex flex-col sm:flex-row gap-5 items-start">
                      <div className={`w-24 h-32 rounded-xl bg-gradient-to-br ${currentSeries.coverGradient} shadow-xl shrink-0 flex flex-col justify-between p-3 text-white`}>
                        <span className="text-[10px] font-mono opacity-80">红果</span>
                        <div>
                          <div className="text-xs font-bold leading-tight">{currentSeries.chineseTitle.slice(0, 6)}</div>
                          <div className="text-[10px] opacity-75">{currentSeries.totalEpisodes} Eps</div>
                        </div>
                      </div>

                      <div className="flex-1 space-y-2">
                        <div className="flex items-center justify-between">
                          <h4 className="text-lg font-bold text-white">
                            {currentSeries.chineseTitle}
                            <span className="text-xs font-normal text-slate-400 ml-2">({currentSeries.title})</span>
                          </h4>
                          <button
                            onClick={() => setHasInspected(false)}
                            className="text-xs text-slate-400 hover:text-white underline font-mono"
                          >
                            Reset
                          </button>
                        </div>

                        <p className="text-xs text-slate-300 leading-relaxed line-clamp-2">
                          {currentSeries.description}
                        </p>

                        <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400 pt-1">
                          <span>{t.rating}: <strong className="text-[#c6f135] font-mono">{currentSeries.rating}</strong></span>
                          <span>·</span>
                          <span>{t.studio}: <strong className="text-slate-200">{currentSeries.author}</strong></span>
                          <span>·</span>
                          <span>{t.totalEpisodes}: <strong className="text-slate-200 font-mono">{currentSeries.totalEpisodes}</strong></span>
                        </div>
                      </div>
                    </div>

                    {/* Batch Actions & Grid */}
                    <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setSelectedEpisodes(currentSeries.episodes.map(e => e.episodeNumber))}
                          className="px-3.5 py-1.5 text-xs font-semibold rounded-xl bg-[#161f2e] border border-[#273549] text-slate-200 hover:bg-[#1f2c3e]"
                        >
                          {t.selectAll} ({currentSeries.totalEpisodes})
                        </button>
                        <button
                          onClick={() => setSelectedEpisodes(currentSeries.episodes.filter(e => e.isFree).map(e => e.episodeNumber))}
                          className="px-3.5 py-1.5 text-xs font-semibold rounded-xl bg-[#161f2e] border border-[#273549] text-slate-200 hover:bg-[#1f2c3e]"
                        >
                          {t.selectFree} (1–{currentSeries.freeEpisodes})
                        </button>
                        <button
                          onClick={() => setSelectedEpisodes([])}
                          className="px-3.5 py-1.5 text-xs font-semibold rounded-xl border border-transparent text-slate-400 hover:text-white"
                        >
                          {t.clearSelection}
                        </button>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className="text-xs font-mono text-slate-400">
                          {t.selectedCount}: <strong className="text-[#c6f135]">{selectedEpisodes.length}</strong>
                        </span>
                        <button
                          onClick={startDownloadBatch}
                          disabled={selectedEpisodes.length === 0}
                          className="px-5 py-2 text-xs font-bold rounded-xl bg-[#c6f135] hover:bg-[#b5e028] text-black shadow-md shadow-[#c6f135]/20 flex items-center gap-2 disabled:opacity-50"
                        >
                          <Download className="w-3.5 h-3.5" />
                          <span>{t.downloadSelected} ({selectedEpisodes.length})</span>
                        </button>
                      </div>
                    </div>

                    {/* Episode Tiles Grid */}
                    <div className="p-4 rounded-2xl bg-[#0e141f] border border-[#1b2536] max-h-64 overflow-y-auto">
                      <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-2">
                        {currentSeries.episodes.map(ep => {
                          const isSelected = selectedEpisodes.includes(ep.episodeNumber);
                          const isDownloaded = history.some(h => h.seriesTitle === currentSeries.title && h.episodeNumber === ep.episodeNumber);

                          return (
                            <button
                              key={ep.episodeNumber}
                              onClick={() => toggleEpisode(ep.episodeNumber)}
                              className={`p-2.5 rounded-xl text-center text-xs font-mono transition-all border relative ${
                                isSelected
                                  ? 'bg-[#c6f135] text-black font-bold border-[#c6f135] shadow-sm'
                                  : isDownloaded
                                    ? 'bg-emerald-950/40 border-emerald-800 text-emerald-300'
                                    : 'bg-[#141b26] border-[#222d3d] text-slate-300 hover:border-slate-600'
                              }`}
                            >
                              <div className="font-bold">EP {ep.episodeNumber}</div>
                              <div className="text-[10px] opacity-75 mt-0.5 truncate">
                                {isDownloaded ? t.downloadedBadge : ep.isFree ? t.freeEpisodeBadge : t.vipEpisodeBadge}
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* VIEW: TRANSFERS */}
            {activeTab === 'transfers' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-white">{t.activeTasksTitle} ({tasks.length})</h3>
                    <p className="text-xs text-slate-400 mt-0.5">
                      {concurrency} workers · HTTP Range resume (.part)
                    </p>
                  </div>
                  <button
                    onClick={() => setTasks([])}
                    className="px-3.5 py-1.5 text-xs text-slate-400 hover:text-white border border-[#273549] rounded-xl"
                  >
                    {t.clearQueue}
                  </button>
                </div>

                {tasks.length === 0 ? (
                  <div className="p-16 text-center border border-dashed border-[#1f2c3e] rounded-3xl text-slate-500 text-xs">
                    <Download className="w-10 h-10 mx-auto mb-3 text-slate-600" />
                    <span>{t.noActiveTasks}</span>
                  </div>
                ) : (
                  <div className="space-y-3 max-h-[460px] overflow-y-auto pr-1">
                    {tasks.map(task => (
                      <div key={task.id} className="p-4 rounded-2xl bg-[#111722] border border-[#1f2c3e]">
                        <div className="flex items-center justify-between text-xs mb-2">
                          <div className="flex items-center gap-2">
                            <span className="font-mono font-bold text-[#c6f135]">EP {String(task.episodeNumber).padStart(3, '0')}</span>
                            <span className="font-medium text-slate-200 truncate max-w-xs">{task.targetFile}</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="font-mono text-slate-400">{task.downloadSpeed}</span>
                            <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                              task.status === 'completed' 
                                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                                : task.status === 'decrypting'
                                  ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                                  : 'bg-[#c6f135]/20 text-[#c6f135] border border-[#c6f135]/30'
                            }`}>
                              {task.status === 'completed' ? t.statusCompleted : task.status === 'decrypting' ? t.statusDecrypting : t.statusStreaming}
                            </span>
                            <button
                              onClick={() => setTasks(tasks.filter(t => t.id !== task.id))}
                              className="text-slate-500 hover:text-rose-400"
                            >
                              <XCircle className="w-4 h-4" />
                            </button>
                          </div>
                        </div>

                        {/* Progress Bar */}
                        <div className="w-full bg-[#1b2536] h-2 rounded-full overflow-hidden mb-2">
                          <div 
                            className={`h-full transition-all duration-300 ${
                              task.status === 'completed' ? 'bg-emerald-400' : task.status === 'decrypting' ? 'bg-amber-400' : 'bg-[#c6f135]'
                            }`}
                            style={{ width: `${task.progress}%` }}
                          />
                        </div>
                        <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                          <span>{task.partFile}</span>
                          <span>{task.progress}% of ~{(task.totalBytes / (1024 * 1024)).toFixed(1)} MB</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* VIEW: HISTORY */}
            {activeTab === 'history' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-white">{t.historyTitle} ({history.length})</h3>
                  <button
                    onClick={() => alert(`Windows Explorer: ${downloadFolder}`)}
                    className="px-4 py-2 text-xs font-semibold rounded-xl bg-[#161f2e] border border-[#273549] text-slate-200 hover:bg-[#1f2c3e] flex items-center gap-2"
                  >
                    <Folder className="w-3.5 h-3.5 text-[#c6f135]" />
                    <span>{t.openFolder}</span>
                  </button>
                </div>

                {history.length === 0 ? (
                  <div className="p-16 text-center border border-dashed border-[#1f2c3e] rounded-3xl text-slate-500 text-xs">
                    <Folder className="w-10 h-10 mx-auto mb-3 text-slate-600" />
                    <span>{t.noHistory}</span>
                  </div>
                ) : (
                  <div className="space-y-2.5 max-h-[460px] overflow-y-auto pr-1">
                    {history.map(item => (
                      <div key={item.id} className="p-4 rounded-2xl bg-[#111722] border border-[#1f2c3e] flex items-center justify-between text-xs">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-[#182333] border border-[#273549] text-[#c6f135] flex items-center justify-center shrink-0">
                            <Film className="w-5 h-5" />
                          </div>
                          <div>
                            <div className="font-bold text-white text-sm">
                              EP {String(item.episodeNumber).padStart(3, '0')} · {item.seriesTitle}
                            </div>
                            <div className="text-[11px] text-slate-500 font-mono truncate max-w-sm sm:max-w-md mt-0.5">
                              {item.filePath}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-4">
                          <div className="text-right font-mono text-[11px] text-slate-400">
                            <div>{item.fileSizeMb} MB</div>
                            <div className="text-emerald-400">{item.resolution}</div>
                          </div>
                          <button
                            onClick={() => setPreviewingItem(item)}
                            className="px-3.5 py-1.5 text-xs font-semibold rounded-xl bg-[#1c2738] hover:bg-[#25344a] text-slate-200 border border-[#2b3c54] flex items-center gap-1.5"
                          >
                            <Eye className="w-3.5 h-3.5 text-[#c6f135]" />
                            <span>{t.previewPlayback}</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* VIEW: SYSTEM LOG */}
            {activeTab === 'log' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-white">{t.systemLogTitle}</h3>
                    <p className="text-xs text-slate-400 mt-0.5">{t.logInfo}</p>
                  </div>
                  <button
                    onClick={() => setLogs([])}
                    className="px-3.5 py-1.5 text-xs text-slate-400 hover:text-white border border-[#273549] rounded-xl"
                  >
                    {t.clearLog}
                  </button>
                </div>

                <div className="p-4 rounded-2xl bg-[#090c12] border border-[#1b2536] font-mono text-xs text-slate-300 max-h-[460px] overflow-y-auto space-y-1.5">
                  {logs.map((log, idx) => (
                    <div key={idx} className="leading-relaxed">
                      <span className="text-[#c6f135]">{log.split(' ')[0]}</span>{' '}
                      <span className="text-slate-400">{log.slice(log.indexOf(' ') + 1)}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* VIEW: PREFERENCES */}
            {activeTab === 'preferences' && (
              <div className="space-y-5">
                <div>
                  <h3 className="text-xl font-bold text-white">{t.preferencesTitle}</h3>
                  <p className="text-xs text-slate-400 mt-0.5">Custom paths and worker configuration.</p>
                </div>

                <div className="space-y-4 text-xs">
                  <div className="p-5 rounded-2xl bg-[#111722] border border-[#1f2c3e] space-y-2">
                    <label className="font-bold text-white block">{t.outputDirectory}</label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={downloadFolder}
                        onChange={e => setDownloadFolder(e.target.value)}
                        className="flex-1 px-3.5 py-2.5 bg-[#0a0d14] border border-[#273549] rounded-xl font-mono text-slate-200 focus:outline-none"
                      />
                      <button
                        onClick={() => alert('Folder picker dialog')}
                        className="px-4 py-2.5 bg-[#161f2e] border border-[#273549] rounded-xl text-slate-200"
                      >
                        {t.browseFolder}
                      </button>
                    </div>
                  </div>

                  <div className="p-5 rounded-2xl bg-[#111722] border border-[#1f2c3e] space-y-2">
                    <div className="flex justify-between items-center">
                      <label className="font-bold text-white">{t.concurrencyLabel}</label>
                      <span className="font-mono text-[#c6f135] font-bold">{concurrency} Parallel</span>
                    </div>
                    <input
                      type="range"
                      min={1}
                      max={4}
                      value={concurrency}
                      onChange={e => setConcurrency(Number(e.target.value))}
                      className="w-full accent-[#c6f135]"
                    />
                  </div>

                  <div className="p-5 rounded-2xl bg-[#111722] border border-[#1f2c3e] flex items-center justify-between">
                    <div>
                      <div className="font-bold text-white">{t.drmDecryptionLabel}</div>
                      <div className="text-[11px] text-slate-400">{t.drmDecryptionDesc}</div>
                    </div>
                    <input
                      type="checkbox"
                      checked={autoDecrypt}
                      onChange={e => setAutoDecrypt(e.target.checked)}
                      className="w-4 h-4 accent-[#c6f135] rounded"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Video Preview Modal simulation */}
      {previewingItem && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#0b0e14] border border-[#1f2c3e] rounded-3xl max-w-lg w-full p-6 text-white shadow-2xl relative">
            <button
              onClick={() => setPreviewingItem(null)}
              className="absolute top-5 right-5 text-slate-400 hover:text-white"
            >
              ✕
            </button>
            <div className="text-xs text-[#c6f135] font-mono mb-2 font-bold">
              {previewingItem.resolution} · DECRYPTED H.264 MP4
            </div>
            <h3 className="text-lg font-bold mb-1">
              EP {previewingItem.episodeNumber} - {previewingItem.seriesTitle}
            </h3>
            <p className="text-xs text-slate-400 mb-4 font-mono truncate">
              {previewingItem.filePath}
            </p>

            <div className="w-full aspect-video rounded-2xl bg-black border border-[#1e293b] flex items-center justify-center relative overflow-hidden group">
              <div className="w-14 h-14 rounded-full bg-[#c6f135] flex items-center justify-center text-black shadow-xl cursor-pointer hover:scale-105 transition-transform">
                <Play className="w-6 h-6 ml-0.5 fill-black" />
              </div>
              <div className="absolute bottom-3 left-4 right-4 flex justify-between text-xs font-mono text-slate-400">
                <span>00:15 / {previewingItem.duration}</span>
                <span className="text-emerald-400">Clean Bitstream</span>
              </div>
            </div>

            <div className="mt-5 flex justify-end">
              <button
                onClick={() => setPreviewingItem(null)}
                className="px-5 py-2 text-xs font-bold bg-[#1a2332] hover:bg-[#253246] text-white rounded-xl"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
