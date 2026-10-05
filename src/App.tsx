/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { NexusHub4Boxes } from './components/NexusHub4Boxes';
import { Hero } from './components/Hero';
import { AppSimulator } from './components/AppSimulator';
import { HowItWorksSimple } from './components/HowItWorksSimple';
import { FeaturesSimple } from './components/FeaturesSimple';
import { AboutDeveloper } from './components/AboutDeveloper';
import { DownloadSimple } from './components/DownloadSimple';
import { DownloadModal } from './components/DownloadModal';
import { DonateModal } from './components/DonateModal';
import { ComingSoonTool } from './components/ComingSoonTool';
import { Footer } from './components/Footer';
import { Language } from './i18n/translations';
import { NEXUS_TOOLS } from './config/tools';
import { Heart } from 'lucide-react';

export default function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [lang, setLang] = useState<Language>('en');
  const [downloadModalOpen, setDownloadModalOpen] = useState(false);
  const [donateModalOpen, setDonateModalOpen] = useState(false);
  
  // Initial state is 'hub'
  const [activeToolId, setActiveToolId] = useState<string>('hub');

  const toggleLang = () => {
    setLang(prev => (prev === 'en' ? 'km' : 'en'));
  };

  const jumpToSimulator = () => {
    const el = document.getElementById('simulator');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const jumpToCreator = () => {
    setActiveToolId('hub');
    setTimeout(() => {
      const el = document.getElementById('about');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const isKm = lang === 'km';
  const currentTool = NEXUS_TOOLS.find(t => t.id === activeToolId);

  return (
    <div className={`min-h-screen w-full max-w-full transition-colors duration-200 ${
      darkMode ? 'bg-[#0a0d14] text-slate-100' : 'bg-slate-50 text-slate-900'
    }`}>
      {/* Top Navbar */}
      <Navbar
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        onOpenDownloadModal={() => setDownloadModalOpen(true)}
        lang={lang}
        onToggleLang={toggleLang}
        activeToolId={activeToolId}
        onSelectTool={(id) => {
          setActiveToolId(id);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* Main Container: Mobile has 16px horizontal edge padding (12px on 320px), desktop unchanged */}
      <main className="w-full max-w-full px-3 min-[360px]:px-4 sm:px-5 lg:px-0 pb-10 sm:pb-6 md:pb-0 box-border">
        {activeToolId === 'hub' ? (
          /* MAIN VIEW: 4 BIG DIV BOXES + CREATOR & DEVELOPER SECTION (ONLY HERE) */
          <div className="animate-in fade-in duration-200">
            <NexusHub4Boxes
              activeToolId={activeToolId}
              onSelectTool={(id) => {
                setActiveToolId(id);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              lang={lang}
              onOpenDownloadModal={() => setDownloadModalOpen(true)}
            />

            {/* CREATOR & DEVELOPER: Displayed on the Main One Only */}
            <AboutDeveloper
              darkMode={darkMode}
              lang={lang}
            />
          </div>
        ) : activeToolId === 'hongguo-dl' ? (
          /* HONGGUO DL TOOL VIEW */
          <div className="animate-in fade-in duration-300">
            {/* Clean Hero with generous top spacing and clean back button */}
            <Hero
              darkMode={darkMode}
              onOpenDownloadModal={() => setDownloadModalOpen(true)}
              onJumpToSimulator={jumpToSimulator}
              onBackToHub={() => {
                setActiveToolId('hub');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              lang={lang}
            />

            {/* Real Desktop App UI (Front & Center) */}
            <AppSimulator 
              externalDarkMode={darkMode} 
              lang={lang}
              onToggleLang={toggleLang}
            />

            {/* Simple 3-Step Guide */}
            <HowItWorksSimple
              darkMode={darkMode}
              lang={lang}
            />

            {/* 3 Core Features */}
            <FeaturesSimple
              darkMode={darkMode}
              lang={lang}
            />

            {/* Simple Download Section */}
            <DownloadSimple
              darkMode={darkMode}
              lang={lang}
            />

            {/* Clean Button Card to see Creator & Developer (Not showing full About Me everywhere) */}
            <div className="py-10 px-4 border-t border-[#18202d] bg-[#070a10]">
              <div className="max-w-xl mx-auto p-4 sm:p-5 rounded-2xl bg-[#0f1522] border border-[#223347] flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-2xl overflow-hidden bg-[#182436] border border-[#c6f135]/50 shrink-0">
                    <img
                      src="https://avatars.githubusercontent.com/u/106633880?v=4"
                      alt="Seavfou Eang"
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                  <div>
                    <div className="text-[10px] font-mono font-bold text-[#c6f135] uppercase tracking-wider">
                      {isKm ? 'អ្នកបង្កើតកម្មវិធី' : 'Creator & Developer'}
                    </div>
                    <div className="text-sm font-bold text-white">
                      Seavfou Eang (@seavfoueang-coc)
                    </div>
                    <div className="text-[11px] text-slate-400">
                      {isKm ? 'ស្ថាបត្យករ NEXUS TOOL Suite' : 'Developer of NEXUS TOOL Suite'}
                    </div>
                  </div>
                </div>

                <button
                  onClick={jumpToCreator}
                  className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-[#c6f135] hover:bg-[#b5e028] text-black text-xs font-bold transition-all shadow-md active:scale-95 cursor-pointer whitespace-nowrap text-center"
                >
                  {isKm ? 'មើលព័ត៌មានអ្នកបង្កើត →' : 'View Creator Profile →'}
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* Other Tool Showcase (e.g. Douyin Extractor, Kuaishou Tool) */
          <div className="animate-in fade-in duration-300">
            {currentTool && (
              <ComingSoonTool
                tool={currentTool}
                onSelectHongguo={() => {
                  setActiveToolId('hongguo-dl');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                onBackToHub={() => {
                  setActiveToolId('hub');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                darkMode={darkMode}
                lang={lang}
              />
            )}

            {/* Clean Button Card to see Creator & Developer */}
            <div className="py-10 px-4 border-t border-[#18202d] bg-[#070a10]">
              <div className="max-w-xl mx-auto p-4 sm:p-5 rounded-2xl bg-[#0f1522] border border-[#223347] flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-2xl overflow-hidden bg-[#182436] border border-[#c6f135]/50 shrink-0">
                    <img
                      src="https://avatars.githubusercontent.com/u/106633880?v=4"
                      alt="Seavfou Eang"
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                  <div>
                    <div className="text-[10px] font-mono font-bold text-[#c6f135] uppercase tracking-wider">
                      {isKm ? 'អ្នកបង្កើតកម្មវិធី' : 'Creator & Developer'}
                    </div>
                    <div className="text-sm font-bold text-white">
                      Seavfou Eang (@seavfoueang-coc)
                    </div>
                    <div className="text-[11px] text-slate-400">
                      {isKm ? 'ស្ថាបត្យករ NEXUS TOOL Suite' : 'Developer of NEXUS TOOL Suite'}
                    </div>
                  </div>
                </div>

                <button
                  onClick={jumpToCreator}
                  className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-[#c6f135] hover:bg-[#b5e028] text-black text-xs font-bold transition-all shadow-md active:scale-95 cursor-pointer whitespace-nowrap text-center"
                >
                  {isKm ? 'មើលព័ត៌មានអ្នកបង្កើត →' : 'View Creator Profile →'}
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Clean Footer */}
      <Footer
        darkMode={darkMode}
        onOpenDownloadModal={() => setDownloadModalOpen(true)}
        lang={lang}
      />

      {/* Floating Donate Button (Desktop: Spacious Pill; Mobile: Compact 44px FAB safely tucked away) */}
      <button
        onClick={() => setDonateModalOpen(true)}
        aria-label="Donate or Support the Creator"
        className="hidden md:flex fixed bottom-5 right-5 z-40 items-center gap-2 px-4 py-2.5 rounded-full bg-gradient-to-r from-rose-500 via-rose-600 to-amber-500 text-white font-bold text-xs shadow-2xl shadow-rose-500/35 hover:shadow-rose-500/60 hover:scale-105 active:scale-95 transition-all cursor-pointer border border-white/25 group"
      >
        <Heart className="w-4 h-4 fill-white text-white group-hover:scale-110 transition-transform animate-pulse" />
        <span className="tracking-wide">{isKm ? 'ឧបត្ថម្ភ (Donate)' : 'Donate / Support'}</span>
      </button>

      {/* Mobile Compact Donate FAB: 44px round, placed safely so it never covers card text or buttons */}
      <button
        onClick={() => setDonateModalOpen(true)}
        aria-label="Donate or Support the Creator"
        className="md:hidden fixed bottom-4 right-4 z-40 w-11 h-11 rounded-full bg-gradient-to-r from-rose-500 via-rose-600 to-amber-500 text-white flex items-center justify-center shadow-xl shadow-rose-500/30 border border-white/30 active:scale-90 transition-transform cursor-pointer"
      >
        <Heart className="w-5 h-5 fill-white text-white" />
      </button>

      {/* Floating Donate Modal */}
      <DonateModal
        isOpen={donateModalOpen}
        onClose={() => setDonateModalOpen(false)}
        darkMode={darkMode}
        lang={lang}
      />

      {/* Download Modal */}
      <DownloadModal
        isOpen={downloadModalOpen}
        onClose={() => setDownloadModalOpen(false)}
        darkMode={darkMode}
        lang={lang}
      />
    </div>
  );
}
