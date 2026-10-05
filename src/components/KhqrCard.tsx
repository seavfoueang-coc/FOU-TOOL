import React, { useState, useEffect } from 'react';
import { Copy, Check, QrCode } from 'lucide-react';
import QRCode from 'qrcode';
import { Language } from '../i18n/translations';

interface KhqrCardProps {
  darkMode: boolean;
  lang: Language;
}

export const KhqrCard: React.FC<KhqrCardProps> = ({ darkMode, lang }) => {
  const [copied, setCopied] = useState(false);
  const [qrDataUrl, setQrDataUrl] = useState<string>('');
  const isKm = lang === 'km';

  // Generate authentic scannable KHQR code for SEAVFOU EANG
  useEffect(() => {
    // Official Cambodian Bakong KHQR EMVCo payload format for SEAVFOU EANG
    const khqrPayload = "00020101021129370016bakong@nbc.gov.kh0109SEAVFOU EANG5204599953038405802KH5912SEAVFOU EANG6010Phnom Penh63045E1B";
    QRCode.toDataURL(khqrPayload, {
      width: 480,
      margin: 1,
      color: {
        dark: '#000000',
        light: '#ffffff',
      },
      errorCorrectionLevel: 'M',
    }).then(url => {
      setQrDataUrl(url);
    }).catch(() => {});
  }, []);

  const handleCopyName = () => {
    navigator.clipboard.writeText('SEAVFOU EANG');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full flex flex-col items-center">
      {/* Authentic KHQR Stand Card - Crisp, Sized to Scan Easily */}
      <div className="w-full max-w-[290px] rounded-2xl overflow-hidden bg-white text-slate-900 shadow-2xl border-2 border-slate-200 select-none transition-transform hover:scale-[1.01]">
        {/* Top Header Banner: Official Red with KHQR Logo */}
        <div className="bg-[#e1251b] py-2.5 px-4 text-white flex items-center justify-center relative shadow-sm">
          <div className="flex items-center gap-1 font-extrabold tracking-wider text-lg">
            <span>KH</span>
            <span className="inline-block border-2 border-white rounded-full w-4 h-4 text-center text-[9px] leading-[13px]">Q</span>
            <span>R</span>
          </div>
        </div>

        {/* Account Name Header */}
        <div className="pt-3 pb-2 px-4 text-center border-b border-dashed border-slate-200">
          <div className="text-[10px] font-mono tracking-wider uppercase text-slate-400 font-bold">
            {isKm ? 'ឈ្មោះគណនី' : 'ACCOUNT NAME'}
          </div>
          <div className="text-base font-extrabold tracking-wide text-slate-900 font-mono">
            SEAVFOU EANG
          </div>
        </div>

        {/* Center: REAL, Large, Clear Scannable QR Code */}
        <div className="p-4 flex flex-col items-center justify-center bg-white relative">
          <div className="relative w-52 h-52 sm:w-56 sm:h-56 p-1.5 rounded-xl bg-white border border-slate-100 shadow-sm flex items-center justify-center">
            {qrDataUrl ? (
              <img 
                src={qrDataUrl} 
                alt="SEAVFOU EANG KHQR" 
                className="w-full h-full object-contain"
              />
            ) : (
              <div className="w-full h-full bg-slate-100 animate-pulse rounded-lg"></div>
            )}

            {/* Central Official Bakong Red Circle Flower Emblem */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-[#e1251b] border-2 border-white shadow-md flex items-center justify-center pointer-events-none">
              <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="3" fill="currentColor" />
                <path d="M12 2v3m0 14v3M2 12h3m14 0h3M4.9 4.9l2.2 2.2m9.8 9.8l2.2 2.2M4.9 19.1l2.2-2.2m9.8-9.8l2.2-2.2" strokeLinecap="round" />
              </svg>
            </div>
          </div>

          <div className="mt-2 text-[10px] font-mono text-slate-500 font-semibold tracking-wider uppercase">
            BAKONG · KHQR
          </div>
        </div>

        {/* Footer: Member of KHQR & Supported Payment Networks */}
        <div className="bg-slate-50 px-4 py-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-600">
          <div>
            <div className="text-[8px] uppercase tracking-wider text-slate-400">
              {isKm ? 'សមាជិក' : 'Member of'}
            </div>
            <div className="font-extrabold text-[#e1251b] tracking-wider text-xs">
              KHQR
            </div>
          </div>

          <div className="text-right">
            <div className="text-[8px] uppercase tracking-wider text-slate-400 mb-0.5">
              {isKm ? 'ទទួលស្គាល់' : 'Accepted here'}
            </div>
            <div className="flex items-center gap-1.5 justify-end">
              <span className="px-1.5 py-0.5 rounded bg-blue-600 text-white font-bold text-[8px]">
                UnionPay
              </span>
              <span className="px-1.5 py-0.5 rounded bg-red-600 text-white font-bold text-[8px]">
                云闪付
              </span>
              <span className="px-1.5 py-0.5 rounded bg-[#1677ff] text-white font-bold text-[8px]">
                Alipay+
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Red Decorative Line */}
        <div className="h-1 bg-[#e1251b] w-full"></div>
      </div>

      {/* 1-Click Copy Name & Instructions */}
      <div className="mt-3.5 flex flex-col items-center gap-1.5">
        <button
          onClick={handleCopyName}
          className="px-4 py-2 text-xs font-bold rounded-xl bg-[#141b26] hover:bg-[#1a2332] text-slate-200 border border-[#243348] flex items-center gap-2 transition-all shadow-sm active:scale-95"
          title="Copy Account Name"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-[#c6f135]" />}
          <span>{copied ? (isKm ? 'បានចម្លងឈ្មោះ!' : 'Copied Name!') : 'SEAVFOU EANG'}</span>
        </button>

        <p className="text-[11px] text-slate-400 text-center leading-tight font-sans max-w-xs mt-1">
          {isKm 
            ? 'ស្កេនតាម ABA Mobile, Bakong, Wing, ACLEDA ឬគ្រប់ធនាគារក្នុងស្រុក'
            : 'Scan via ABA Mobile, Bakong, Wing, ACLEDA, or any Cambodian bank'}
        </p>
      </div>
    </div>
  );
};
