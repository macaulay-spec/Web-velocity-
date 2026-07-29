// ─── useKeyboardShortcuts Hook ─────────────────────────────────────────
'use client';

import { useEffect } from 'react';
import { KEYBOARD_SHORTCUTS } from '@/constants';

type ShortcutMap = Record<string, () => void>;

export function useKeyboardShortcuts(shortcuts: ShortcutMap, enabled: boolean = true) {
  useEffect(() => {
    if (!enabled) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore when typing in inputs
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement ||
        e.target instanceof HTMLSelectElement
      ) {
        return;
      }

      const key = e.key;

      // Check all shortcuts
      for (const [action, keys] of Object.entries(KEYBOARD_SHORTCUTS)) {
        if ((keys as readonly string[]).includes(key)) {
          const handler = shortcuts[action];
          if (handler) {
            e.preventDefault();
            handler();
            return;
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [shortcuts, enabled]);
}
