// ─── Theme Provider ────────────────────────────────────────────────────
'use client';

import { useEffect, useState, type ReactNode } from 'react';
import { useSettingsStore } from '@/store/settings.store';
import { STORAGE_KEYS } from '@/constants';

export function ThemeProvider({ children }: { children: ReactNode }) {
  const { settings } = useSettingsStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const root = document.documentElement;
    const theme = settings.theme || 'dark';

    root.classList.remove('light', 'dark');
    root.classList.add(theme);

    // Set color scheme meta
    const meta = document.querySelector('meta[name="color-scheme"]');
    if (meta) {
      meta.setAttribute('content', theme);
    }
  }, [settings.theme, mounted]);

  // Apply initial theme from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem(STORAGE_KEYS.THEME) as 'dark' | 'light' | null;
    if (savedTheme && savedTheme !== settings.theme) {
      useSettingsStore.getState().updateSettings({ theme: savedTheme });
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (!mounted) {
    return <div style={{ visibility: 'hidden' }}>{children}</div>;
  }

  return <>{children}</>;
}
