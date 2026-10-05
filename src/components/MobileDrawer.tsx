import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { Check, Download, Grid, Languages, Moon, Send, Sun, X } from 'lucide-react';
import { Language } from '../i18n/translations';
import { NEXUS_TOOLS } from '../config/tools';
import { FouToolLogo } from './FouToolLogo';
import { HongguoLogo } from './HongguoLogo';

interface MobileDrawerProps {
  open: boolean;
  onClose: () => void;
  darkMode: boolean;
  setDarkMode: (val: boolean) => void;
  lang: Language;
  onToggleLang: () => void;
  activeToolId: string;
  onSelectTool: (id: string) => void;
  onOpenDownloadModal: () => void;
  downloadLabel: string;
  /** Element to return focus to when the drawer closes (the hamburger button). */
  returnFocusRef: React.RefObject<HTMLButtonElement | null>;
}

const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

/**
 * Right-side slide-out navigation for < 768px.
 * Rendered through a portal: the sticky header uses backdrop-filter, which would
 * otherwise become the containing block for `position: fixed` children.
 */
export const MobileDrawer: React.FC<MobileDrawerProps> = ({
  open,
  onClose,
  darkMode,
  setDarkMode,
  lang,
  onToggleLang,
  activeToolId,
  onSelectTool,
  onOpenDownloadModal,
  downloadLabel,
  returnFocusRef,
}) => {
  const panelRef = useRef<HTMLDivElement>(null);
  const isKm = lang === 'km';

  // Body scroll lock, Escape to close, focus management + simple focus trap
  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const firstFocusable = panelRef.current?.querySelector<HTMLElement>(FOCUSABLE);
    firstFocusable?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }
      if (e.key !== 'Tab' || !panelRef.current) return;
      const items = Array.from(panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE));
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener('keydown', onKey);

    const returnEl = returnFocusRef.current;
    return () => {
      document.body.style.overflow = prevOverflow;
      document.removeEventListener('keydown', onKey);
      returnEl?.focus();
    };
  }, [open, onClose, returnFocusRef]);

  // Close automatically if the viewport grows past the mobile breakpoint
  useEffect(() => {
    if (!open) return;
    const mq = window.matchMedia('(min-width: 768px)');
    const onChange = (e: MediaQueryListEvent) => e.matches && onClose();
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, [open, onClose]);

  const panel = darkMode
    ? 'bg-[#0d121c] border-[#213044] text-slate-100'
    : 'bg-white border-slate-200 text-slate-900';
  const divider = darkMode ? 'border-[#1b2536]' : 'border-slate-200';
  const sectionLabel = 'text-[11px] font-mono uppercase tracking-wider font-bold text-slate-400';
  const itemBase =
    'w-full min-w-0 text-left p-3 rounded-xl flex items-center justify-between gap-3 transition-colors cursor-pointer min-h-[48px] border';
  const itemState = (selected: boolean) =>
    selected
      ? darkMode
        ? 'bg-[#192434] border-[#c6f135]/60'
        : 'bg-lime-50 border-lime-500/60'
      : darkMode
        ? 'bg-[#101724] border-[#1d293b] hover:bg-[#151f2e]'
        : 'bg-slate-50 border-slate-200 hover:bg-slate-100';
  const titleText = darkMode ? 'text-white' : 'text-slate-900';
  const subText = darkMode ? 'text-slate-400' : 'text-slate-500';
  const iconTile = darkMode ? 'bg-[#090d14] border-[#233348]' : 'bg-white border-slate-200';
  const checkColor = darkMode ? 'text-[#c6f135]' : 'text-lime-600';
  const accentText = darkMode ? 'text-[#c6f135]' : 'text-lime-700';

  const select = (id: string) => {
    onSelectTool(id);
    onClose();
  };

  const segment = (active: boolean) =>
    `flex-1 min-w-0 min-h-[40px] px-2 rounded-lg text-xs font-bold transition-colors cursor-pointer truncate ${
      active
        ? 'bg-[#c6f135] text-black shadow-sm'
        : darkMode
          ? 'text-slate-300 hover:text-white'
          : 'text-slate-600 hover:text-slate-900'
    }`;

  return createPortal(
    <div className="md:hidden" aria-hidden={!open}>
      {/* Backdrop */}
      <div
        onClick={onClose}
        className={`fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm transition-opacity duration-300 motion-reduce:transition-none ${
          open ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      />

      {/* Panel */}
      <div
        ref={panelRef}
        id="mobile-drawer"
        role="dialog"
        aria-modal="true"
        aria-label={isKm ? 'ម៉ឺនុយ' : 'Navigation menu'}
        className={`fixed inset-y-0 right-0 z-[70] w-80 max-w-[85%] flex flex-col border-l shadow-2xl transition-[transform,visibility] duration-300 ease-out motion-reduce:transition-none ${panel} ${
          open ? 'translate-x-0 visible' : 'translate-x-full invisible'
        }`}
      >
        {/* Drawer header (kept dark so the white FOU TOOL wordmark stays legible in light mode) */}
        <div className="h-[60px] shrink-0 px-4 flex items-center justify-between gap-3 border-b bg-[#0a0d14] border-[#19212e]">
          <FouToolLogo size={30} showText={true} />
          <button
            onClick={onClose}
            aria-label="Close menu"
            className="w-10 h-10 shrink-0 rounded-xl border flex items-center justify-center cursor-pointer transition-colors bg-[#141b26] border-[#25354a] text-slate-200 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable body */}
        <div className="flex-1 min-h-0 overflow-y-auto overscroll-contain px-4 py-5 space-y-6">
          {/* Tools Hub selector */}
          <section aria-labelledby="drawer-tools-label" className="space-y-2">
            <div className="flex items-center justify-between gap-2">
              <h2 id="drawer-tools-label" className={sectionLabel}>
                {isKm ? 'ជ្រើសរើសឧបករណ៍' : 'Tools Hub'}
              </h2>
              <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#c6f135]/20 font-bold shrink-0 ${accentText}`}>
                {NEXUS_TOOLS.length} tools
              </span>
            </div>

            <ul className="space-y-1.5">
              <li>
                <button
                  onClick={() => select('hub')}
                  aria-current={activeToolId === 'hub' ? 'page' : undefined}
                  className={`${itemBase} ${itemState(activeToolId === 'hub')}`}
                >
                  <span className="flex items-center gap-3 min-w-0">
                    <span className={`w-8 h-8 rounded-lg border flex items-center justify-center shrink-0 ${iconTile}`}>
                      <Grid className="w-4 h-4 text-[#9cc21a]" />
                    </span>
                    <span className="min-w-0">
                      <span className={`block text-xs font-bold truncate ${titleText}`}>
                        {isKm ? 'ប្រអប់ឧបករណ៍ទាំង ៤ (Hub)' : 'All Tools Hub'}
                      </span>
                      <span className={`block text-[10px] truncate ${subText}`}>
                        {isKm ? 'ទំព័រដើមនៃ FOU TOOL' : 'Main launcher portal'}
                      </span>
                    </span>
                  </span>
                  {activeToolId === 'hub' && <Check className={`w-4 h-4 shrink-0 ${checkColor}`} />}
                </button>
              </li>

              {NEXUS_TOOLS.map((tool) => {
                const selected = tool.id === activeToolId;
                return (
                  <li key={tool.id}>
                    <button
                      onClick={() => select(tool.id)}
                      aria-current={selected ? 'page' : undefined}
                      className={`${itemBase} ${itemState(selected)}`}
                    >
                      <span className="flex items-center gap-3 min-w-0">
                        <span className={`w-8 h-8 rounded-lg border flex items-center justify-center shrink-0 ${iconTile}`}>
                          {tool.id === 'hongguo-dl' ? (
                            <HongguoLogo size={20} />
                          ) : (
                            <span className={`text-[10px] font-bold ${subText}`}>{tool.name.slice(0, 2)}</span>
                          )}
                        </span>
                        <span className="min-w-0">
                          <span className="flex items-center gap-1.5 min-w-0">
                            <span className={`text-xs font-bold truncate ${titleText}`}>{tool.name}</span>
                            {tool.status === 'active' && (
                              <span className={`text-[9px] font-mono px-1.5 rounded bg-[#c6f135]/20 font-bold shrink-0 ${accentText}`}>
                                Ready
                              </span>
                            )}
                          </span>
                          <span className={`block text-[10px] truncate mt-0.5 ${subText}`}>
                            {isKm && tool.khmerDesc ? tool.khmerDesc : tool.shortDesc}
                          </span>
                        </span>
                      </span>
                      {selected && <Check className={`w-4 h-4 shrink-0 ${checkColor}`} />}
                    </button>
                  </li>
                );
              })}
            </ul>

            {activeToolId === 'hongguo-dl' && (
              <button
                onClick={() => {
                  onClose();
                  onOpenDownloadModal();
                }}
                className="w-full min-h-[48px] mt-2 px-4 rounded-xl bg-[#c6f135] hover:bg-[#b5e028] text-black font-bold text-xs flex items-center justify-center gap-2 cursor-pointer transition-colors"
              >
                <Download className="w-4 h-4 shrink-0" />
                <span className="truncate">{downloadLabel}</span>
              </button>
            )}
          </section>

          {/* Preferences */}
          <section aria-labelledby="drawer-prefs-label" className={`pt-5 border-t space-y-4 ${divider}`}>
            <h2 id="drawer-prefs-label" className={sectionLabel}>
              {isKm ? 'ការកំណត់' : 'Preferences'}
            </h2>

            {/* Language toggle (segmented) */}
            <div className="space-y-2">
              <div className={`flex items-center gap-2 text-xs font-semibold ${subText}`}>
                <Languages className="w-4 h-4 text-[#9cc21a] shrink-0" />
                <span id="drawer-lang-label">{isKm ? 'ភាសា' : 'Language'}</span>
              </div>
              <div
                role="radiogroup"
                aria-labelledby="drawer-lang-label"
                className={`flex gap-1 p-1 rounded-xl border ${darkMode ? 'bg-[#101724] border-[#1d293b]' : 'bg-slate-100 border-slate-200'}`}
              >
                <button role="radio" aria-checked={lang === 'en'} onClick={() => lang !== 'en' && onToggleLang()} className={segment(lang === 'en')}>
                  English
                </button>
                <button role="radio" aria-checked={lang === 'km'} onClick={() => lang !== 'km' && onToggleLang()} className={segment(lang === 'km')}>
                  ខ្មែរ
                </button>
              </div>
            </div>

            {/* Theme switch */}
            <button
              role="switch"
              aria-checked={darkMode}
              onClick={() => setDarkMode(!darkMode)}
              className={`w-full min-h-[48px] px-3 rounded-xl border flex items-center justify-between gap-3 cursor-pointer transition-colors ${
                darkMode ? 'bg-[#101724] border-[#1d293b]' : 'bg-slate-50 border-slate-200'
              }`}
            >
              <span className={`flex items-center gap-2 min-w-0 text-xs font-semibold ${titleText}`}>
                {darkMode ? <Moon className="w-4 h-4 text-indigo-300 shrink-0" /> : <Sun className="w-4 h-4 text-amber-500 shrink-0" />}
                <span className="truncate">
                  {darkMode ? (isKm ? 'ផ្ទៃងងឹត' : 'Dark mode') : isKm ? 'ផ្ទៃភ្លឺ' : 'Light mode'}
                </span>
              </span>
              <span
                aria-hidden="true"
                className={`relative w-10 h-6 rounded-full shrink-0 transition-colors ${darkMode ? 'bg-[#c6f135]' : 'bg-slate-300'}`}
              >
                <span
                  className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform motion-reduce:transition-none ${
                    darkMode ? 'translate-x-4' : 'translate-x-0'
                  }`}
                />
              </span>
            </button>
          </section>
        </div>

        {/* Footer: contact */}
        <div className={`shrink-0 p-4 border-t ${divider}`}>
          <a
            href="https://t.me/eangseavfou"
            target="_blank"
            rel="noopener noreferrer"
            className={`w-full min-h-[44px] px-3 rounded-xl border text-xs font-medium flex items-center justify-center gap-2 no-underline transition-colors ${
              darkMode
                ? 'bg-[#121a26] border-[#223348] text-slate-300 hover:text-white'
                : 'bg-slate-50 border-slate-200 text-slate-700 hover:text-slate-900'
            }`}
          >
            <Send className="w-3.5 h-3.5 text-[#2aabee] shrink-0" />
            <span className="truncate">{isKm ? 'ទាក់ទងតាម Telegram' : 'Contact developer'} (@eangseavfou)</span>
          </a>
        </div>
      </div>
    </div>,
    document.body
  );
};
