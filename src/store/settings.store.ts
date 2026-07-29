// ─── Settings Store ─────────────────────────────────────────────────────
import { create } from 'zustand';
import type { UserSettings } from '@/types/api';
import { STORAGE_KEYS } from '@/constants';

const defaultSettings: UserSettings = {
  theme: 'dark',
  language: 'en',
  autoplay: true,
  autoplayNext: true,
  subtitleLanguage: 'en',
  subtitleSize: 'medium',
  subtitleColor: '#ffffff',
  subtitleBackground: true,
  playbackSpeed: 1,
  defaultQuality: 'auto',
  notifications: true,
  emailNotifications: false,
  matureContent: false,
  autoplayPreviews: true,
  wifiOnlyDownload: false,
  dataSaver: false,
};

interface SettingsState {
  settings: UserSettings;
  isLoading: boolean;

  setSettings: (settings: UserSettings) => void;
  updateSettings: (partial: Partial<UserSettings>) => void;
  resetSettings: () => void;
  setLoading: (loading: boolean) => void;
}

export const useSettingsStore = create<SettingsState>((set) => ({
  settings: defaultSettings,
  isLoading: false,

  setSettings: (settings) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEYS.THEME, settings.theme);
    }
    set({ settings, isLoading: false });
  },

  updateSettings: (partial) =>
    set((state) => {
      const newSettings = { ...state.settings, ...partial };
      if (typeof window !== 'undefined' && partial.theme) {
        localStorage.setItem(STORAGE_KEYS.THEME, partial.theme);
      }
      return { settings: newSettings };
    }),

  resetSettings: () => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEYS.THEME, defaultSettings.theme);
    }
    set({ settings: defaultSettings });
  },

  setLoading: (isLoading) => set({ isLoading }),
}));
