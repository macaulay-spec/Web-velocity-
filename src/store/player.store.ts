// ─── Player Store ──────────────────────────────────────────────────────
import { create } from 'zustand';
import type { MediaSource, Subtitle, DownloadSource } from '@/types/api';
import { STORAGE_KEYS } from '@/constants';

interface PlayerState {
  // Current playback
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  isMuted: boolean;
  playbackSpeed: number;
  isFullscreen: boolean;
  isPiP: boolean;

  // Sources
  sources: MediaSource[];
  currentSource: MediaSource | null;
  subtitles: Subtitle[];
  currentSubtitle: Subtitle | null;
  downloads: DownloadSource[];

  // UI
  controlsVisible: boolean;
  isBuffering: boolean;
  isError: boolean;
  errorMessage: string | null;

  // Settings
  subtitleSize: string;
  subtitleColor: string;
  subtitleBackground: boolean;

  // Actions
  setPlaying: (playing: boolean) => void;
  setCurrentTime: (time: number) => void;
  setDuration: (duration: number) => void;
  setVolume: (volume: number) => void;
  setMuted: (muted: boolean) => void;
  setPlaybackSpeed: (speed: number) => void;
  setFullscreen: (fullscreen: boolean) => void;
  setPiP: (pip: boolean) => void;
  setSources: (sources: MediaSource[]) => void;
  setCurrentSource: (source: MediaSource | null) => void;
  setSubtitles: (subtitles: Subtitle[]) => void;
  setCurrentSubtitle: (subtitle: Subtitle | null) => void;
  setDownloads: (downloads: DownloadSource[]) => void;
  setControlsVisible: (visible: boolean) => void;
  setBuffering: (buffering: boolean) => void;
  setError: (error: string | null) => void;
  reset: () => void;
}

const defaultPlaybackSpeed = (() => {
  if (typeof window === 'undefined') return 1;
  return parseFloat(localStorage.getItem(STORAGE_KEYS.PLAYBACK_SPEED) || '1');
})();

export const usePlayerStore = create<PlayerState>((set) => ({
  isPlaying: false,
  currentTime: 0,
  duration: 0,
  volume: 1,
  isMuted: false,
  playbackSpeed: defaultPlaybackSpeed,
  isFullscreen: false,
  isPiP: false,

  sources: [],
  currentSource: null,
  subtitles: [],
  currentSubtitle: null,
  downloads: [],

  controlsVisible: true,
  isBuffering: false,
  isError: false,
  errorMessage: null,

  subtitleSize: 'medium',
  subtitleColor: '#ffffff',
  subtitleBackground: true,

  setPlaying: (playing) => set({ isPlaying: playing }),
  setCurrentTime: (time) => set({ currentTime: time }),
  setDuration: (duration) => set({ duration }),
  setVolume: (volume) => set({ volume, isMuted: volume === 0 }),
  setMuted: (muted) => set({ isMuted: muted }),
  setPlaybackSpeed: (speed) => {
    localStorage.setItem(STORAGE_KEYS.PLAYBACK_SPEED, String(speed));
    set({ playbackSpeed: speed });
  },
  setFullscreen: (fullscreen) => set({ isFullscreen: fullscreen }),
  setPiP: (pip) => set({ isPiP: pip }),
  setSources: (sources) => set({ sources }),
  setCurrentSource: (source) => set({ currentSource: source }),
  setSubtitles: (subtitles) => set({ subtitles }),
  setCurrentSubtitle: (subtitle) => set({ currentSubtitle: subtitle }),
  setDownloads: (downloads) => set({ downloads }),
  setControlsVisible: (visible) => set({ controlsVisible: visible }),
  setBuffering: (buffering) => set({ isBuffering: buffering }),
  setError: (error) => set({ isError: !!error, errorMessage: error }),
  reset: () => set({
    isPlaying: false,
    currentTime: 0,
    duration: 0,
    sources: [],
    currentSource: null,
    subtitles: [],
    currentSubtitle: null,
    downloads: [],
    isBuffering: false,
    isError: false,
    errorMessage: null,
  }),
}));
