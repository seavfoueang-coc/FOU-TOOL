export interface NexusTool {
  id: string;
  name: string;
  khmerName?: string;
  shortDesc: string;
  khmerDesc?: string;
  status: 'active' | 'in_progress' | 'coming_soon' | 'request';
  tag: string;
  khmerTag?: string;
  version?: string;
  category: string;
  badgeColor: string;
  accentBorder: string;
  accentBg: string;
  accentText: string;
  highlights: string[];
}

export const NEXUS_TOOLS: NexusTool[] = [
  {
    id: 'hongguo-dl',
    name: 'HONGGUO DL',
    khmerName: 'HONGGUO DL (红果短剧)',
    shortDesc: 'Windows desktop short drama parser, stream DRM decryptor & batch MP4 downloader.',
    khmerDesc: 'កម្មវិធីកុំព្យូទ័រ Windows សម្រាប់ទាញយក និងដោះលេខកូដរឿងភាគខ្លី Hongguo ដោយស្វ័យប្រវត្តិ។',
    status: 'active',
    tag: 'Active & Ready · v1.0.0',
    khmerTag: 'ដំណើរការពេញលេញ · v1.0.0',
    version: 'v1.0.0',
    category: 'Windows Desktop (.exe)',
    badgeColor: 'bg-[#c6f135]/20 text-[#c6f135] border-[#c6f135]/40',
    accentBorder: 'hover:border-[#c6f135]/80 border-[#c6f135]/30',
    accentBg: 'bg-[#c6f135]',
    accentText: 'text-[#c6f135]',
    highlights: ['✓ 100% Free · No Ads', '✓ Standalone .exe Installer', '✓ Offline Decryption']
  },
  {
    id: 'douyin-extractor',
    name: 'DOUYIN EXTRACTOR',
    khmerName: 'DOUYIN EXTRACTOR (抖音解析)',
    shortDesc: 'High-speed batch video & audio media parser with clean zero-watermark extraction.',
    khmerDesc: 'ឧបករណ៍ទាញយកវីដេអូ និងសំឡេង Douyin ដោយគ្មានសញ្ញា Watermark ក្នុងល្បឿនលឿន។',
    status: 'in_progress',
    tag: 'In Development',
    khmerTag: 'កំពុងអភិវឌ្ឍន៍',
    version: 'v0.9-alpha',
    category: 'Media Utility',
    badgeColor: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40',
    accentBorder: 'hover:border-cyan-400/80 border-cyan-500/30',
    accentBg: 'bg-cyan-400',
    accentText: 'text-cyan-400',
    highlights: ['✓ No Watermark Extraction', '✓ Multi-Thread Fetcher', '✓ 1080p Full HD']
  },
  {
    id: 'kuaishou-tool',
    name: 'KUAISHOU TOOL',
    khmerName: 'KUAISHOU TOOL (快手工具)',
    shortDesc: 'High-speed stream harvester and album media archiver for Windows and Web.',
    khmerDesc: 'ឧបករណ៍ប្រមូល និងទាញយកវីដេអូ ក៏ដូចជារូបភាពពី Kuaishou យ៉ាងរហ័ស។',
    status: 'coming_soon',
    tag: 'Coming Soon',
    khmerTag: 'ឆាប់ៗនេះ',
    version: 'Planning',
    category: 'Media Downloader',
    badgeColor: 'bg-purple-500/20 text-purple-300 border-purple-500/40',
    accentBorder: 'hover:border-purple-400/80 border-purple-500/30',
    accentBg: 'bg-purple-400',
    accentText: 'text-purple-400',
    highlights: ['✓ Stream Harvester', '✓ Photo Album Saver', '✓ Batch Export']
  },
  {
    id: 'request-tool',
    name: 'REQUEST A TOOL',
    khmerName: 'ស្នើសុំឧបករណ៍ថ្មី',
    shortDesc: 'Need a custom parser, scraper, or automation tool? Send your proposal to Seavfou.',
    khmerDesc: 'ត្រូវការឧបករណ៍ថ្មី ឬកម្មវិធីជំនួយជាក់លាក់ណាមួយ? ផ្ញើសំណើផ្ទាល់ទៅកាន់ Seavfou Eang។',
    status: 'request',
    tag: 'Community & Ideas',
    khmerTag: 'គំនិត និងសំណូមពរ',
    version: 'Open',
    category: 'Custom Engineering',
    badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
    accentBorder: 'hover:border-amber-400/80 border-amber-500/30',
    accentBg: 'bg-amber-400',
    accentText: 'text-amber-400',
    highlights: ['✓ Direct Telegram Contact', '✓ Tailored Desktop Tools', '✓ Fast Turnaround']
  }
];
