import React, { useState } from 'react';
import { Download, Moon, Sun, Languages, ChevronDown, Check, Zap, Layers, Grid, ArrowLeft, Menu, X, Heart, Send } from 'lucide-react';
import { Language, TRANSLATIONS } from '../i18n/translations';
import { NEXUS_TOOLS, NexusTool } from '../config/tools';
import { FouToolLogo } from './FouToolLogo';
import { HongguoLogo } from './HongguoLogo';

interface NavbarProps {
  darkMode: boolean;
  setDarkMode: (val: boolean) => void;
  onOpenDownloadModal: () => void;
  lang: Language;
  onToggleLang: () => void;
  activeToolId: string;
  onSelectTool: (id: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  darkMode,
  setDarkMode,
  onOpenDownloadModal,
  lang,
  onToggleLang,
  activeToolId,
  onSelectTool,
}) => {
  const t = TRANSLATIONS[lang];
  const [toolsDropdownOpen, setToolsDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const currentTool = NEXUS_TOOLS.find(t => t.id === activeToolId);
  const isKm = lang === 'km';

  const handleToolSelect = (id: string) => {
    onSelectTool(id);
    setToolsDropdownOpen(false);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className={`sticky top-0 z-50 w-full transition-colors border-b backdrop-blur-md ${
      darkMode 
        ? 'bg-[#0a0d14]/95 border-[#19212e] text-slate-100' 
        : 'bg-white/95 border-slate-200 text-slate-900'
    }`}>
      {/* Main Nav Container: 60-64px height, 16px horizontal gutters */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-[60px] sm:h-16 flex items-center justify-between gap-3 w-full">
        {/* Left Side: Brand Logo + Desktop Project Selector */}
        <div className="flex items-center gap-3 min-w-0">
          {/* Main Brand: FOU TOOL (Main website title image) */}
          <button 
            onClick={() => handleToolSelect('hub')}
            className="text-left flex items-center group cursor-pointer shrink-0 focus:outline-none"
            title="Return to FOU TOOL Hub"
          >
            <FouToolLogo size={34} showText={true} />
          </button>

          {/* Desktop Project Switcher Pill Dropdown (Preserved for >= 768px / Desktop) */}
          <div className="hidden md:block relative shrink min-w-0">
            <button
              onClick={() => setToolsDropdownOpen(!toolsDropdownOpen)}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#141b26] hover:bg-[#1b2536] border border-[#273549] text-xs font-bold text-slate-200 transition-all cursor-pointer whitespace-nowrap"
              title="Switch Tool"
            >
              {activeToolId === 'hub' ? (
                <Grid className="w-3.5 h-3.5 text-[#c6f135] shrink-0" />
              ) : activeToolId === 'hongguo-dl' ? (
                <HongguoLogo size={16} />
              ) : (
                <span className="w-2 h-2 rounded-full bg-[#c6f135] animate-pulse shrink-0" />
              )}
              <span className="font-mono text-[11px] truncate max-w-[120px] lg:max-w-none">
                {activeToolId === 'hub' 
                  ? (isKm ? 'ប្រអប់ទាំង ៤' : '4 Tools Hub') 
                  : (currentTool?.name || 'Tools')}
              </span>
              <ChevronDown className="w-3 h-3 text-slate-400 shrink-0" />
            </button>

            {/* Desktop Dropdown Menu */}
            {toolsDropdownOpen && (
              <>
                <div 
                  className="fixed inset-0 z-40 bg-black/20" 
                  onClick={() => setToolsDropdownOpen(false)} 
                />
                <div className="absolute left-0 mt-2 w-72 rounded-2xl bg-[#0f1521] border border-[#24344a] shadow-2xl shadow-black/80 p-2 z-50 space-y-1 animate-in fade-in zoom-in-95 duration-150">
                  {/* Home / Hub option */}
                  <button
                    onClick={() => handleToolSelect('hub')}
                    className={`w-full text-left p-2.5 rounded-xl transition-all flex items-center justify-between gap-2 cursor-pointer ${
                      activeToolId === 'hub'
                        ? 'bg-[#182333] border border-[#c6f135]/40 text-white'
                        : 'hover:bg-[#141d2b] text-slate-300'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <Grid className="w-4 h-4 text-[#c6f135] shrink-0" />
                      <div>
                        <div className="text-xs font-bold text-white whitespace-nowrap">
                          {isKm ? 'ប្រអប់ឧបករណ៍ទាំង ៤ (Hub)' : 'All Tools Hub (4 Boxes)'}
                        </div>
                        <div className="text-[10px] text-slate-400">
                          {isKm ? 'ទំព័រដើមនៃ FOU TOOL' : 'Main launcher portal'}
                        </div>
                      </div>
                    </div>
                    {activeToolId === 'hub' && <Check className="w-3.5 h-3.5 text-[#c6f135] shrink-0" />}
                  </button>

                  <div className="px-2.5 py-1 text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500 border-t border-[#1b2636] mt-1 pt-1.5">
                    {isKm ? 'ជ្រើសរើសឧបករណ៍' : 'INDIVIDUAL TOOLS'}
                  </div>

                  {NEXUS_TOOLS.map((tool) => {
                    const isSelected = tool.id === activeToolId;
                    return (
                      <button
                        key={tool.id}
                        onClick={() => handleToolSelect(tool.id)}
                        className={`w-full text-left p-2.5 rounded-xl transition-all flex items-start justify-between gap-2 cursor-pointer ${
                          isSelected 
                            ? 'bg-[#182333] border border-[#c6f135]/40 text-white' 
                            : 'hover:bg-[#141d2b] text-slate-300'
                        }`}
                      >
                        <div className="flex items-start gap-2.5">
                          {tool.id === 'hongguo-dl' ? (
                            <HongguoLogo size={24} className="mt-0.5 shrink-0" />
                          ) : (
                            <div className="w-6 h-6 rounded-lg bg-[#192434] flex items-center justify-center text-[10px] font-bold text-slate-300 mt-0.5 shrink-0">
                              {tool.name.slice(0, 2)}
                            </div>
                          )}
                          <div>
                            <div className="flex items-center gap-1.5">
                              <span className="text-xs font-bold text-white whitespace-nowrap">{tool.name}</span>
                              {tool.status === 'active' && (
                                <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-[#c6f135]/20 text-[#c6f135] font-bold">
                                  Active
                                </span>
                              )}
                            </div>
                            <div className="text-[10px] text-slate-400 line-clamp-1 mt-0.5">
                              {tool.shortDesc}
                            </div>
                          </div>
                        </div>

                        {isSelected && <Check className="w-3.5 h-3.5 text-[#c6f135] shrink-0 mt-0.5" />}
                      </button>
                    );
                  })}
                </div>
              </>
            )}
          </div>
        </div>

        {/* Center: Desktop Nav Links (Preserved for desktop >= 1280px) */}
        {activeToolId === 'hongguo-dl' && (
          <nav className="hidden xl:flex items-center gap-5 text-xs font-semibold text-slate-400">
            <a href="#simulator" className="hover:text-[#c6f135] transition-colors whitespace-nowrap py-1">
              {t.navApp}
            </a>
            <a href="#how-it-works" className="hover:text-[#c6f135] transition-colors whitespace-nowrap py-1">
              {t.navHowItWorks}
            </a>
            <a href="#features" className="hover:text-[#c6f135] transition-colors whitespace-nowrap py-1">
              {t.navFeatures}
            </a>
            <button 
              onClick={() => {
                onSelectTool('hub');
                setTimeout(() => {
                  const el = document.getElementById('about');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }, 100);
              }}
              className="hover:text-[#c6f135] transition-colors whitespace-nowrap py-1 cursor-pointer"
            >
              {t.navAbout}
            </button>
            <a href="#download" className="hover:text-[#c6f135] transition-colors whitespace-nowrap py-1">
              {t.navDownload}
            </a>
          </nav>
        )}

        {/* Right Side: Desktop Controls (Preserved for >= 768px) */}
        <div className="hidden md:flex items-center gap-2 shrink-0">
          {/* Back to Hub button if currently inside a tool */}
          {activeToolId !== 'hub' && (
            <button
              onClick={() => handleToolSelect('hub')}
              className="text-xs font-bold px-3 py-1.5 rounded-xl bg-[#141b26] hover:bg-[#1f2c3e] border border-[#26374d] text-[#c6f135] inline-flex items-center gap-1.5 cursor-pointer whitespace-nowrap transition-all hover:scale-102 active:scale-95 shadow-sm"
              title="Return to FOU TOOL Hub"
            >
              <ArrowLeft className="w-3.5 h-3.5 shrink-0" />
              <span>{isKm ? 'ឧបករណ៍ទាំងអស់' : 'All Tools'}</span>
            </button>
          )}

          {/* Language Toggle */}
          <button
            onClick={onToggleLang}
            className={`px-2.5 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 border transition-all cursor-pointer whitespace-nowrap ${
              darkMode 
                ? 'border-[#263449] bg-[#141b26] text-slate-200 hover:border-[#c6f135]/60 hover:text-[#c6f135]' 
                : 'border-slate-300 bg-white text-slate-800'
            }`}
          >
            <Languages className="w-3.5 h-3.5 text-[#c6f135] shrink-0" />
            <span>{lang === 'km' ? 'ខ្មែរ' : 'EN'}</span>
          </button>

          {/* Theme */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            aria-label="Toggle theme"
            className={`p-2 rounded-xl transition-colors border cursor-pointer shrink-0 ${
              darkMode 
                ? 'border-[#263449] bg-[#141b26] text-slate-300 hover:text-white' 
                : 'border-slate-200 bg-slate-100 text-slate-700'
            }`}
          >
            {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* Download CTA (active when Hongguo DL is selected) */}
          {activeToolId === 'hongguo-dl' && (
            <button
              onClick={onOpenDownloadModal}
              className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-bold text-black bg-[#c6f135] hover:bg-[#b5e028] rounded-xl shadow-md transition-all active:scale-95 whitespace-nowrap cursor-pointer shrink-0"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{t.getForWindows}</span>
            </button>
          )}
        </div>

        {/* Mobile Header Right: Language switcher displayed directly on mobile + Hub back button + Hamburger */}
        <div className="flex md:hidden items-center gap-1.5 sm:gap-2 shrink-0">
          {activeToolId !== 'hub' && (
            <button
              onClick={() => handleToolSelect('hub')}
              className="h-9 px-2 sm:px-2.5 rounded-lg bg-[#141b26] border border-[#273549] text-[11px] font-bold text-[#c6f135] flex items-center gap-1 active:scale-95 transition-all shadow-sm shrink-0"
              title="Back to All Tools"
            >
              <ArrowLeft className="w-3 h-3 shrink-0" />
              <span>Hub</span>
            </button>
          )}

          {/* Language Toggle Button directly visible on small devices */}
          <button
            onClick={onToggleLang}
            aria-label="Toggle Language"
            className={`h-9 px-2 sm:px-2.5 rounded-xl text-xs font-semibold flex items-center gap-1 sm:gap-1.5 border transition-all cursor-pointer whitespace-nowrap active:scale-95 shrink-0 ${
              darkMode 
                ? 'border-[#263449] bg-[#141b26] text-slate-200 hover:border-[#c6f135]/60 hover:text-[#c6f135]' 
                : 'border-slate-300 bg-white text-slate-800'
            }`}
          >
            <Languages className="w-3.5 h-3.5 text-[#c6f135] shrink-0" />
            <span className="font-mono text-[11px] font-bold">{lang === 'km' ? 'ខ្មែរ' : 'EN'}</span>
          </button>

          {/* Clean Hamburger Menu Button (touch target) */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`w-9 sm:w-10 h-9 sm:h-10 rounded-xl flex items-center justify-center transition-all cursor-pointer border active:scale-95 shrink-0 ${
              mobileMenuOpen
                ? 'bg-[#182333] border-[#c6f135]/60 text-[#c6f135]'
                : 'bg-[#141b26] border-[#25354a] text-slate-200 hover:text-white'
            }`}
            aria-label="Toggle Mobile Menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* MOBILE COMPACT MENU / DROPDOWN (< 768px) */}
      {mobileMenuOpen && (
        <>
          {/* Backdrop overlay */}
          <div 
            className="fixed inset-0 top-[60px] sm:top-16 z-40 bg-black/70 backdrop-blur-sm md:hidden animate-in fade-in duration-150"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Drawer content */}
          <div className="absolute top-full left-0 right-0 z-50 bg-[#0d121c] border-b border-[#213044] px-4 py-5 shadow-2xl space-y-4 max-h-[calc(100vh-68px)] overflow-y-auto md:hidden animate-in slide-in-from-top-2 duration-200">
            {/* Header: Current Active Status */}
            <div className="flex items-center justify-between pb-3 border-b border-[#1b2536]">
              <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 font-bold">
                {isKm ? 'ជ្រើសរើសឧបករណ៍' : 'TOOLS HUB'}
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#c6f135]/20 text-[#c6f135] font-bold">
                FOU TOOL Suite
              </span>
            </div>

            {/* Tool Selector List */}
            <div className="space-y-1.5">
              {/* Return to 4 Boxes Hub */}
              <button
                onClick={() => handleToolSelect('hub')}
                className={`w-full text-left p-3 rounded-xl flex items-center justify-between gap-3 transition-all cursor-pointer min-h-[48px] ${
                  activeToolId === 'hub'
                    ? 'bg-[#192434] border border-[#c6f135]/60 text-white shadow-sm'
                    : 'bg-[#101724] border border-[#1d293b] text-slate-300 hover:bg-[#151f2e]'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-8 h-8 rounded-lg bg-[#090d14] flex items-center justify-center shrink-0 border border-[#233348]">
                    <Grid className="w-4 h-4 text-[#c6f135]" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs font-bold text-white truncate">
                      {isKm ? 'ប្រអប់ឧបករណ៍ទាំង ៤ (Hub)' : 'All Tools Hub (4 Boxes)'}
                    </div>
                    <div className="text-[10px] text-slate-400 truncate">
                      {isKm ? 'ទំព័រដើមនៃ FOU TOOL' : 'Main launcher portal'}
                    </div>
                  </div>
                </div>
                {activeToolId === 'hub' && <Check className="w-4 h-4 text-[#c6f135] shrink-0" />}
              </button>

              {/* 4 Tool Items */}
              {NEXUS_TOOLS.map((tool) => {
                const isSelected = tool.id === activeToolId;
                return (
                  <button
                    key={tool.id}
                    onClick={() => handleToolSelect(tool.id)}
                    className={`w-full text-left p-3 rounded-xl flex items-center justify-between gap-3 transition-all cursor-pointer min-h-[48px] ${
                      isSelected
                        ? 'bg-[#192434] border border-[#c6f135]/60 text-white shadow-sm'
                        : 'bg-[#101724] border border-[#1d293b] text-slate-300 hover:bg-[#151f2e]'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-8 h-8 rounded-lg bg-[#090d14] flex items-center justify-center shrink-0 border border-[#233348]">
                        {tool.id === 'hongguo-dl' ? (
                          <HongguoLogo size={20} />
                        ) : (
                          <span className="text-[10px] font-bold text-slate-300">{tool.name.slice(0, 2)}</span>
                        )}
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs font-bold text-white truncate">{tool.name}</span>
                          {tool.status === 'active' && (
                            <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-[#c6f135]/20 text-[#c6f135] font-bold shrink-0">
                              Ready
                            </span>
                          )}
                        </div>
                        <div className="text-[10px] text-slate-400 truncate mt-0.5">
                          {isKm && tool.khmerDesc ? tool.khmerDesc : tool.shortDesc}
                        </div>
                      </div>
                    </div>
                    {isSelected && <Check className="w-4 h-4 text-[#c6f135] shrink-0" />}
                  </button>
                );
              })}
            </div>

            {/* Quick Action when Hongguo DL is active */}
            {activeToolId === 'hongguo-dl' && (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenDownloadModal();
                }}
                className="w-full min-h-[48px] py-2.5 px-4 rounded-xl bg-[#c6f135] hover:bg-[#b5e028] text-black font-bold text-xs flex items-center justify-center gap-2 active:scale-95 shadow-md cursor-pointer transition-all"
              >
                <Download className="w-4 h-4 shrink-0" />
                <span>{t.getForWindows}</span>
              </button>
            )}

            {/* Preferences Section: Language & Theme */}
            <div className="pt-3 border-t border-[#1b2536] space-y-3">
              <div className="text-[11px] font-mono uppercase tracking-wider text-slate-400 font-bold">
                {isKm ? 'ការកំណត់' : 'PREFERENCES'}
              </div>

              <div className="grid grid-cols-2 gap-2">
                {/* Language Toggle Button */}
                <button
                  onClick={onToggleLang}
                  className="min-h-[44px] px-3 py-2 rounded-xl bg-[#141c28] border border-[#243347] flex items-center justify-center gap-2 text-xs font-bold text-slate-200 active:scale-95 transition-all cursor-pointer"
                >
                  <Languages className="w-4 h-4 text-[#c6f135] shrink-0" />
                  <span>{lang === 'km' ? 'ភាសា: ខ្មែរ' : 'Language: EN'}</span>
                </button>

                {/* Theme Toggle Button */}
                <button
                  onClick={() => setDarkMode(!darkMode)}
                  className="min-h-[44px] px-3 py-2 rounded-xl bg-[#141c28] border border-[#243347] flex items-center justify-center gap-2 text-xs font-bold text-slate-200 active:scale-95 transition-all cursor-pointer"
                >
                  {darkMode ? <Sun className="w-4 h-4 text-amber-300 shrink-0" /> : <Moon className="w-4 h-4 text-indigo-300 shrink-0" />}
                  <span>{darkMode ? 'Dark Mode' : 'Light Mode'}</span>
                </button>
              </div>

              {/* Telegram Support Link */}
              <a
                href="https://t.me/eangseavfou"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full min-h-[44px] px-3 py-2 rounded-xl bg-[#121a26] border border-[#223348] text-xs font-medium text-slate-300 hover:text-white flex items-center justify-center gap-2 transition-all active:scale-95 no-underline"
              >
                <Send className="w-3.5 h-3.5 text-[#2aabee] shrink-0" />
                <span>{isKm ? 'ទាក់ទងតាម Telegram (@eangseavfou)' : 'Contact Developer (@eangseavfou)'}</span>
              </a>
            </div>
          </div>
        </>
      )}
    </header>
  );
};
