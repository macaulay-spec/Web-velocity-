// ─── useImagePreload Hook ──────────────────────────────────────────────
'use client';

import { useState, useEffect } from 'react';

export function useImagePreload(src: string | undefined | null): boolean {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!src) {
      setLoaded(false);
      return;
    }

    setLoaded(false);
    const img = new Image();
    img.onload = () => setLoaded(true);
    img.onerror = () => setLoaded(false);
    img.src = src;

    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [src]);

  return loaded;
}
