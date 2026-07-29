// ─── useScrollPosition Hook ────────────────────────────────────────────
'use client';

import { useEffect } from 'react';
import { useUIStore } from '@/store/ui.store';

export function useScrollPosition() {
  const setScrollY = useUIStore((s) => s.setScrollY);
  const scrollY = useUIStore((s) => s.scrollY);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [setScrollY]);

  return scrollY;
}
