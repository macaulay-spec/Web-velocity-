// ─── useMediaSession Hook ──────────────────────────────────────────────
'use client';

import { useEffect } from 'react';

interface MediaSessionInfo {
  title: string;
  artist?: string;
  album?: string;
  artwork?: Array<{ src: string; sizes: string; type: string }>;
}

export function useMediaSession(
  info: MediaSessionInfo | null,
  callbacks: {
    onPlay?: () => void;
    onPause?: () => void;
    onSeekForward?: () => void;
    onSeekBackward?: () => void;
    onNextTrack?: () => void;
    onPreviousTrack?: () => void;
  } = {}
) {
  useEffect(() => {
    if (!('mediaSession' in navigator) || !info) return;

    navigator.mediaSession.metadata = new MediaMetadata({
      title: info.title,
      artist: info.artist || '',
      album: info.album || '',
      artwork: info.artwork || [],
    });

    const handlers: [MediaSessionAction, MediaSessionActionHandler][] = [
      ['play', () => callbacks.onPlay?.()],
      ['pause', () => callbacks.onPause?.()],
      ['seekforward', () => callbacks.onSeekForward?.()],
      ['seekbackward', () => callbacks.onSeekBackward?.()],
      ['nexttrack', () => callbacks.onNextTrack?.()],
      ['previoustrack', () => callbacks.onPreviousTrack?.()],
    ];

    handlers.forEach(([action, handler]) => {
      try {
        navigator.mediaSession.setActionHandler(action, handler);
      } catch {
        // Action not supported
      }
    });

    return () => {
      handlers.forEach(([action]) => {
        try {
          navigator.mediaSession.setActionHandler(action, null);
        } catch {
          // Ignore
        }
      });
    };
  }, [info, callbacks]);
}
