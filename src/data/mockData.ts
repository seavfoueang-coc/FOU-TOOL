import { DramaSeries, SecurityAuditItem } from '../types/app';

export const SAMPLE_SERIES: DramaSeries[] = [
  {
    id: '7391840291',
    title: 'The Reborn Empress of Jiangnan',
    chineseTitle: '重生之凤权天下 (江南绝恋)',
    coverGradient: 'from-amber-600 via-rose-700 to-slate-900',
    tagList: ['Rebirth', 'Palace Intrigue', 'Female Lead', 'Historical', 'High Drama'],
    totalEpisodes: 80,
    freeEpisodes: 10,
    rating: '9.6',
    author: 'Starry Sky Media',
    description: 'After betrayal at the imperial banquet, Lady Shen awakens ten years earlier on the night before her family was framed. Armed with future foresight and ruthless composure, she turns the tables on her deceitful court rivals.',
    sampleUrl: 'https://hongguoduanju.com/series/7391840291?source=share_app',
    episodes: Array.from({ length: 80 }, (_, i) => {
      const epNum = i + 1;
      const isFree = epNum <= 10;
      return {
        episodeNumber: epNum,
        title: `Episode ${epNum}: ${epNum === 1 ? 'Banquet Betrayal' : epNum === 2 ? 'Awakening at Dusk' : epNum === 3 ? 'Unraveling the Poison' : epNum === 4 ? 'Court Alliance' : epNum === 5 ? 'Silk Guild Coup' : `Chapter ${epNum}`}`,
        videoId: `vid_hg_${7391840291}_${epNum.toString().padStart(3, '0')}`,
        duration: '01:42',
        isFree,
        resolution: isFree ? '1080p' : '1080p',
        fileSizeMb: Math.round(18 + (epNum % 5) * 2.8),
      };
    }),
  },
  {
    id: '7408219452',
    title: 'Supreme Son-in-Law: Dragon Awoken',
    chineseTitle: '至尊狂婿：潜龙出渊',
    coverGradient: 'from-emerald-700 via-teal-800 to-slate-950',
    tagList: ['Urban Fantasy', 'Hidden Identity', 'Revenge', 'Action', 'Billionaire'],
    totalEpisodes: 65,
    freeEpisodes: 8,
    rating: '9.4',
    author: 'Phoenix Flame Drama',
    description: 'Mocked as a penniless househusband for three long years, Chen Feng reveals his true identity as the Dragon Sovereign when his wife\'s company faces hostile takeover by the city\'s top syndicate.',
    sampleUrl: 'https://hongguoduanju.com/series/7408219452?from=feed',
    episodes: Array.from({ length: 65 }, (_, i) => {
      const epNum = i + 1;
      const isFree = epNum <= 8;
      return {
        episodeNumber: epNum,
        title: `Episode ${epNum}: ${epNum === 1 ? 'Silent Sufferer' : epNum === 2 ? 'The Black Card' : epNum === 3 ? 'Three Families Kneel' : `Chapter ${epNum}`}`,
        videoId: `vid_hg_${7408219452}_${epNum.toString().padStart(3, '0')}`,
        duration: '01:55',
        isFree,
        resolution: '1080p',
        fileSizeMb: Math.round(21 + (epNum % 4) * 3.2),
      };
    }),
  },
  {
    id: '7419033819',
    title: 'The Hidden Billionaire Bride',
    chineseTitle: '顾少的替嫁甜妻',
    coverGradient: 'from-rose-600 via-pink-700 to-indigo-950',
    tagList: ['Sweet Romance', 'CEO Drama', 'Contract Marriage', 'Modern Urban'],
    totalEpisodes: 50,
    freeEpisodes: 12,
    rating: '9.8',
    author: 'Mocha Studio',
    description: 'Substituted for her runaway twin sister to marry the wheelchair-bound heir of Gu Corporation, Jiang Ning discovers her cold husband can secretly walk—and has fallen deeply for her spirited wit.',
    sampleUrl: 'https://hongguoduanju.com/series/7419033819',
    episodes: Array.from({ length: 50 }, (_, i) => {
      const epNum = i + 1;
      const isFree = epNum <= 12;
      return {
        episodeNumber: epNum,
        title: `Episode ${epNum}: ${epNum === 1 ? 'Veiled Bride' : epNum === 2 ? 'The Stand-in Contract' : epNum === 3 ? 'Midnight Reveal' : `Chapter ${epNum}`}`,
        videoId: `vid_hg_${7419033819}_${epNum.toString().padStart(3, '0')}`,
        duration: '01:38',
        isFree,
        resolution: '1080p',
        fileSizeMb: Math.round(16 + (epNum % 6) * 2.1),
      };
    }),
  },
];

export interface PipelineStage {
  step: string;
  name: string;
  shortSummary: string;
  technicalMechanism: string;
  fallbackStrategy: string;
  codeSnippet: string;
  inputOutput: {
    input: string;
    output: string;
  };
}

export const PIPELINE_STAGES: PipelineStage[] = [
  {
    step: '01',
    name: 'Load & Metadata Scraping',
    shortSummary: 'Parses the target series page on hongguoduanju.com for catalog details.',
    technicalMechanism: 'Extracts server-rendered JSON state (`__INITIAL_STATE__`) and HTML DOM to retrieve title, promotional poster, episodic video ID array, tags, and total episode count.',
    fallbackStrategy: 'If desktop SSR is obfuscated, switches to mobile web headers with cookie validation to fetch the canonical series payload.',
    codeSnippet: `// 1. Fetch & parse series catalog\nconst res = await fetch(\`https://hongguoduanju.com/series/\${seriesId}\`, {\n  headers: { 'User-Agent': UA_DESKTOP, 'Accept-Language': 'zh-CN,zh;q=0.9' }\n});\nconst html = await res.text();\nconst seriesInfo = parseInitialState(html); \n// Returns: { title, coverUrl, episodeList: [{ epIndex, videoId }] }`,
    inputOutput: {
      input: 'URL or Series ID: 7391840291',
      output: 'Parsed schema: 80 episodes, cover URL, author, tags, video IDs',
    },
  },
  {
    step: '02',
    name: 'Video Stream Discovery',
    shortSummary: 'Queries Hongguo mobile-app API using forged Android device fingerprints.',
    technicalMechanism: 'Dispatches authenticated RPC calls to the Hongguo mobile backend using randomized Android `device_id`, `openudid`, and app version params to obtain full 1080p stream URLs.',
    fallbackStrategy: 'Web Player Fallback: If mobile API returns rate limits or authentication walls, seamlessly downgrades to the official web player token for free episodes at 720p resolution.',
    codeSnippet: `// 2. Mobile API handshake with synthetic device fingerprint\nconst payload = {\n  device_id: generateSyntheticAndroidId(),\n  version_code: "6.1.4",\n  item_id: episode.videoId,\n};\nconst streamRes = await fetch(HG_APP_API_ENDPOINT, {\n  headers: { 'X-Tt-Token': token, 'User-Agent': 'okhttp/3.14.9' },\n  body: JSON.stringify(payload)\n});\n// Returns encrypted MP4 CDN stream URL`,
    inputOutput: {
      input: 'Episode Video ID + Synthetic Android Fingerprint',
      output: 'High-speed CDN stream URL (1080p encrypted / 720p direct)',
    },
  },
  {
    step: '03',
    name: 'Multi-Threaded Download Engine',
    shortSummary: 'Transfers 1–4 episodes concurrently with HTTP Range resume.',
    technicalMechanism: 'Streams payload into local `.part` temporary files. Inspects `Content-Range` headers to resume broken downloads seamlessly without re-downloading existing chunks.',
    fallbackStrategy: 'Differentiates transient socket blips from expired CDN links: if 403 Forbidden is received, automatically regenerates a fresh signed CDN URL and resumes from exact byte offset.',
    codeSnippet: `// 3. Resumable chunk streaming with .part file verification\nconst existingBytes = fs.existsSync(partPath) ? fs.statSync(partPath).size : 0;\nconst stream = got.stream(cdnUrl, {\n  headers: { 'Range': \`bytes=\${existingBytes}-\` },\n  retry: { limit: 3, statusCodes: [408, 500, 502, 503, 504] }\n});\nstream.pipe(fs.createWriteStream(partPath, { flags: 'a' }));`,
    inputOutput: {
      input: 'CDN Stream URL + Destination `.part` path',
      output: 'Complete raw downloaded bitstream with integrity check',
    },
  },
  {
    step: '04',
    name: 'Stream Decryption & Demuxing',
    shortSummary: 'Resolves cryptographic stream keys and strips DRM payload.',
    technicalMechanism: 'Analyzes video container header offset, derives XOR/AES transformation vector from API metadata, and removes encryption in-memory or via buffered pipe.',
    fallbackStrategy: 'FFmpeg Subprocess Backup: If byte-level remux produces non-standard AAC/H.264 timestamps, invokes bundled FFmpeg with `-c copy -movflags +faststart` to sanitize the MP4 container.',
    codeSnippet: `// 4. In-memory decryption & container repack\nconst rawBuffer = fs.readFileSync(partPath);\nconst decryptedBuffer = decryptByteStream(rawBuffer, encryptionKey);\nif (verifyMp4AtomHeader(decryptedBuffer)) {\n  fs.writeFileSync(finalMp4Path, decryptedBuffer);\n} else {\n  await runFfmpegRemux(partPath, finalMp4Path, keyString);\n}`,
    inputOutput: {
      input: 'Encrypted `.part` binary stream',
      output: 'Standard H.264/AAC MP4 playable on any device or TV',
    },
  },
  {
    step: '05',
    name: 'Catalog Archival & History',
    shortSummary: 'Organizes episodes into structured series directories on Windows.',
    technicalMechanism: 'Sanitizes series and episode titles against Windows reserved filenames (`CON`, `PRN`, `AUX`, colon, slash, question mark). Appends entry to internal SQLite history index.',
    fallbackStrategy: 'Collision Prevention: Pre-flight disk scans skip existing episodes automatically so batch runs never overwrite completed work.',
    codeSnippet: `// 5. Windows path sanitizer & history recording\nconst safeDirName = sanitizeWindowsFilename(series.title); // Strips < > : " / \\ | ? *\nconst targetDir = path.join(settings.downloadDir, safeDirName);\nfs.mkdirSync(targetDir, { recursive: true });\n\nconst safeFileName = \`EP\${String(epNum).padStart(3, '0')} - \${sanitizeWindowsFilename(epTitle)}.mp4\`;\nrecordToHistoryDb({ seriesId, epNum, path: path.join(targetDir, safeFileName) });`,
    inputOutput: {
      input: 'Decrypted MP4 + Metadata',
      output: 'Final path: `D:\\HongguoDramas\\至尊狂婿\\EP001 - 潜龙出渊.mp4`',
    },
  },
];

export const SECURITY_AUDIT_DATA: SecurityAuditItem[] = [
  {
    category: 'Electron Security',
    status: 'passed',
    title: 'Isolated & Sandboxed Renderer Architecture',
    description: 'The frontend renderer is fully quarantined with context isolation enabled and Node.js integration disabled.',
    technicalDetails: '`contextIsolation: true`, `nodeIntegration: false`, and `sandbox: true` are enforced. IPC communication is restricted to explicit, validated whitelist methods exposed via `contextBridge.exposeInMainWorld`.',
  },
  {
    category: 'Electron Security',
    status: 'passed',
    title: 'Strict Navigation & Popup Defense',
    description: 'Blocked all untrusted navigation, window.open calls, and embedded webviews.',
    technicalDetails: 'Window open handlers return `{ action: "deny" }`. New webContents navigation is intercepted and external links are strictly vetted against an allowlist before delegating to `shell.openExternal`.',
  },
  {
    category: 'Download Engine',
    status: 'passed',
    title: 'Resilient Resume & Partial State Handling',
    description: 'All downloads write to `.part` files with HTTP Range header verification and file size validation.',
    technicalDetails: 'Supports mid-flight abort and process resume. Distinguishes temporary network drops (retried with exponential backoff) from expired signed CDN links (refreshes video token before resuming byte position).',
  },
  {
    category: 'Download Engine',
    status: 'passed',
    title: 'Windows File System Defensive Sanitization',
    description: 'Thorough sanitization of illegal characters and reserved device names.',
    technicalDetails: 'Escapes standard reserved characters (`/ \\ : * ? " < > |`) and proactively blocks DOS legacy reserved filenames (`CON`, `PRN`, `AUX`, `NUL`, `COM1-9`, `LPT1-9`) which cause NTFS / Windows Explorer crashes.',
  },
  {
    category: 'Code Protection',
    status: 'passed',
    title: 'V8 Bytecode Compilation via Bytenode',
    description: 'Production JavaScript is compiled into raw V8 bytecode rather than distributed as minified JS.',
    technicalDetails: 'Core business logic is packaged as `.jsc` bytecode files loaded via V8 virtual machine context, significantly raising the reverse-engineering barrier compared to standard Electron apps.',
  },
  {
    category: 'Code Protection',
    status: 'critical',
    title: 'Vulnerability: Unpacked Plaintext Source in _restore/ Directory',
    description: 'A debugging artifact folder containing uncompiled source code was inadvertently shipped alongside the release package.',
    technicalDetails: 'While main process files were compiled to V8 bytecode, the build script left an uncleaned `_restore/` directory in the installation tree containing plain JavaScript files, completely nullifying the bytecode protection.',
    remediation: 'Ensure `_restore/`, `.map` sourcemaps, and staging cache directories are excluded in `electron-builder.yml` via the `files` directive.',
  },
  {
    category: 'Code Protection',
    status: 'warning',
    title: 'Vulnerability: Asar Integrity Checking Fuse Disabled',
    description: 'The Electron Fuse for ASAR cryptographic integrity validation is turned off.',
    technicalDetails: '`EnableEmbeddedAsarIntegrityValidation` is set to false, allowing arbitrary tampering or injection of code into the `app.asar` archive without triggering signature verification failure on startup.',
    remediation: 'Enable the fuse using `@electron/fuses` during packaging: `runFuses({ EnableEmbeddedAsarIntegrityValidation: true, OnlyLoadAppFromAsar: true })`.',
  },
  {
    category: 'Project Hygiene',
    status: 'warning',
    title: 'Missing Source for Main & Preload Processes in Repository',
    description: 'Version control only contains pre-built distribution bundles without source TypeScript files.',
    technicalDetails: 'The Git repository excludes the `/src/main` and `/src/preload` directories via `.gitignore`. Rebuilding or patching security patches requires de-compiling the binary bundle rather than standard CI/CD compilation.',
    remediation: 'Check in the original TypeScript source code for main and preload processes with CI/CD build scripts while keeping sensitive signing keys in secure environment secrets.',
  },
];
