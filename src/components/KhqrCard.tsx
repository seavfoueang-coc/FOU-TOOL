import React, { useState, useEffect, useRef } from 'react';
import { Copy, Check, Upload, Image as ImageIcon, QrCode } from 'lucide-react';
import { Language } from '../i18n/translations';

interface KhqrCardProps {
  darkMode: boolean;
  lang: Language;
}

export const KhqrCard: React.FC<KhqrCardProps> = ({ darkMode, lang }) => {
  const [copied, setCopied] = useState(false);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [imageError, setImageError] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const isKm = lang === 'km';

  // Candidate paths where the user can place their KHQR image
  const candidatePaths = ['/khqr.png', '/khqr.jpg', '/khqr.jpeg', '/images/khqr.png', '/images/khqr.jpg'];

  useEffect(() => {
    // 1. Check if user already uploaded in browser
    const stored = localStorage.getItem('hongguo_khqr_user_img');
    if (stored) {
      setImageSrc(stored);
      return;
    }

    // 2. Try loading candidate image paths from /public folder
    let active = true;
    const testImage = (index: number) => {
      if (index >= candidatePaths.length) {
        if (active) setImageError(true);
        return;
      }

      const img = new Image();
      img.src = candidatePaths[index];
      img.onload = () => {
        if (active) {
          setImageSrc(candidatePaths[index]);
          setImageError(false);
        }
      };
      img.onerror = () => {
        testImage(index + 1);
      };
    };

    testImage(0);

    return () => {
      active = false;
    };
  }, []);

  const handleCopyName = () => {
    navigator.clipboard.writeText('SEAVFOU EANG');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleFile = (file: File) => {
    if (!file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      if (result) {
        setImageSrc(result);
        setImageError(false);
        localStorage.setItem('hongguo_khqr_user_img', result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  return (
    <div className="w-full flex flex-col items-center">
      {/* Hidden file input */}
      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])} 
        accept="image/*" 
        className="hidden" 
      />

      {imageSrc && !imageError ? (
        /* Real KHQR Image Display (High-Res, Cleanly Framed) */
        <div 
          onClick={() => fileInputRef.current?.click()}
          className="relative w-full max-w-[280px] rounded-2xl overflow-hidden bg-white shadow-2xl border-2 border-slate-200 cursor-pointer group transition-transform hover:scale-[1.01]"
          title="Click to replace with another image"
        >
          <img 
            src={imageSrc} 
            alt="SEAVFOU EANG KHQR" 
            className="w-full h-auto object-contain block"
            onError={() => setImageError(true)}
          />

          {/* Hover overlay allowing user to click and update if they wish */}
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center text-white text-xs font-semibold gap-1.5 transition-opacity">
            <Upload className="w-5 h-5 text-[#c6f135]" />
            <span>{isKm ? 'ចុចដើម្បីប្តូររូបភាព' : 'Click to change image'}</span>
          </div>
        </div>
      ) : (
        /* Placeholder / Drop Zone when image is not yet in public folder */
        <div 
          onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`w-full max-w-[280px] aspect-[3/4] rounded-2xl border-2 border-dashed flex flex-col items-center justify-center p-6 text-center cursor-pointer transition-all ${
            isDragging 
              ? 'border-[#c6f135] bg-[#c6f135]/10' 
              : 'border-[#273549] bg-[#141b26] hover:border-[#c6f135]/60 hover:bg-[#182232]'
          }`}
        >
          <div className="w-14 h-14 rounded-2xl bg-[#1c2738] flex items-center justify-center mb-3 text-[#c6f135]">
            <QrCode className="w-7 h-7" />
          </div>

          <h5 className="text-sm font-bold text-white mb-1">
            {isKm ? 'ដាក់រូបភាព KHQR របស់អ្នក' : 'Add Your Real KHQR Image'}
          </h5>

          <p className="text-[11px] text-slate-400 leading-relaxed mb-3">
            {isKm 
              ? 'ទម្លាក់រូបភាពនៅទីនេះ ឬដាក់ឯកសារក្នុង' 
              : 'Drop your image here or put in'}{' '}
            <code className="text-[#c6f135] font-mono text-[10px] block mt-1 bg-black/30 px-2 py-0.5 rounded">
              public/khqr.png
            </code>
          </p>

          <span className="px-3 py-1.5 rounded-lg bg-[#c6f135] text-black text-xs font-bold shadow flex items-center gap-1.5">
            <Upload className="w-3.5 h-3.5" />
            <span>{isKm ? 'ជ្រើសរើសរូបភាព' : 'Browse File'}</span>
          </span>
        </div>
      )}

      {/* Copy Account Name Button */}
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
