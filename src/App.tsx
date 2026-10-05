/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AppSimulator } from './components/AppSimulator';
import { HowItWorksSimple } from './components/HowItWorksSimple';
import { FeaturesSimple } from './components/FeaturesSimple';
import { AboutDeveloper } from './components/AboutDeveloper';
import { DownloadSimple } from './components/DownloadSimple';
import { DownloadModal } from './components/DownloadModal';
import { Footer } from './components/Footer';
import { Language } from './i18n/translations';

export default function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [lang, setLang] = useState<Language>('en');
  const [downloadModalOpen, setDownloadModalOpen] = useState(false);

  const toggleLang = () => {
    setLang(prev => (prev === 'en' ? 'km' : 'en'));
  };

  const jumpToSimulator = () => {
    const el = document.getElementById('simulator');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-200 ${
      darkMode ? 'bg-[#0a0d14] text-slate-100' : 'bg-slate-50 text-slate-900'
    }`}>
      {/* Top Navbar */}
      <Navbar
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        onOpenDownloadModal={() => setDownloadModalOpen(true)}
        lang={lang}
        onToggleLang={toggleLang}
      />

      <main>
        {/* Clean Hero (With 100% Free badge and no underline) */}
        <Hero
          darkMode={darkMode}
          onOpenDownloadModal={() => setDownloadModalOpen(true)}
          onJumpToSimulator={jumpToSimulator}
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

        {/* 3 Core Features (100% Free, Fast Multi-Download, Auto-Decryption) */}
        <FeaturesSimple
          darkMode={darkMode}
          lang={lang}
        />

        {/* About the Developer (Seavfou Eang / @seavfoueang-coc) */}
        <AboutDeveloper
          darkMode={darkMode}
          lang={lang}
        />

        {/* Simple Download Section */}
        <DownloadSimple
          darkMode={darkMode}
          lang={lang}
        />
      </main>

      {/* Clean Footer */}
      <Footer
        darkMode={darkMode}
        onOpenDownloadModal={() => setDownloadModalOpen(true)}
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
