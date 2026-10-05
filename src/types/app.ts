export interface DramaSeries {
  id: string;
  title: string;
  chineseTitle: string;
  coverGradient: string;
  tagList: string[];
  totalEpisodes: number;
  freeEpisodes: number;
  rating: string;
  author: string;
  description: string;
  sampleUrl: string;
  episodes: DramaEpisode[];
}

export interface DramaEpisode {
  episodeNumber: number;
  title: string;
  videoId: string;
  duration: string;
  isFree: boolean;
  resolution: '1080p' | '720p';
  fileSizeMb: number;
}

export type DownloadStatus = 'idle' | 'queued' | 'downloading' | 'decrypting' | 'completed' | 'paused' | 'error';

export interface DownloadTask {
  id: string;
  seriesId: string;
  seriesTitle: string;
  episodeNumber: number;
  progress: number; // 0 - 100
  downloadSpeed: string; // e.g. "4.2 MB/s"
  totalBytes: number;
  downloadedBytes: number;
  status: DownloadStatus;
  partFile: string;
  targetFile: string;
  sourceType: 'mobile_api' | 'web_player_fallback';
  retryCount: number;
  errorMessage?: string;
}

export interface HistoryItem {
  id: string;
  seriesTitle: string;
  episodeNumber: number;
  filePath: string;
  fileSizeMb: number;
  completedAt: string;
  duration: string;
  resolution: string;
}

export interface SecurityAuditItem {
  category: 'Electron Security' | 'Download Engine' | 'Code Protection' | 'Project Hygiene';
  status: 'passed' | 'warning' | 'critical';
  title: string;
  description: string;
  technicalDetails: string;
  remediation?: string;
}
