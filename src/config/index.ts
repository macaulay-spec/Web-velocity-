// ─── JagFlix Configuration ───────────────────────────────────────────────
// Central configuration for the entire application

export const config = {
  app: {
    name: 'JagFlix',
    tagline: 'Premium Streaming Experience',
    description: 'Discover, stream, and enjoy premium content curated just for you.',
    url: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
  },

  api: {
    baseUrl: 'https://api.zstlab.cyou',
    key: process.env.ZST_API_KEY || 'zst_v4GBeAXhssVr3NdCUhLI9p1ZMZlO8BoTzCyQCHS1',
    timeout: 15000,
    retryCount: 3,
    retryDelay: 1000,
  },

  cache: {
    homepage: 5 * 60 * 1000, // 5 minutes
    trending: 10 * 60 * 1000, // 10 minutes
    recommendations: 30 * 60 * 1000, // 30 minutes
    itemDetails: 24 * 60 * 60 * 1000, // 24 hours
    images: 7 * 24 * 60 * 60 * 1000, // 7 days
    search: 5 * 60 * 1000, // 5 minutes
  },

  pagination: {
    defaultPageSize: 20,
    maxPageSize: 100,
    infiniteScrollThreshold: 200,
  },

  player: {
    defaultQuality: 'auto' as const,
    qualities: ['1080p', '720p', '480p', '360p'] as const,
    playbackSpeeds: [0.25, 0.5, 0.75, 1, 1.25, 1.5, 2] as const,
    subtitleSizes: ['small', 'medium', 'large'] as const,
    skipIntroDuration: 15, // seconds
    skipCreditsDuration: 30, // seconds
  },

  auth: {
    sessionMaxAge: 30 * 24 * 60 * 60, // 30 days
    guestSessionMaxAge: 24 * 60 * 60, // 24 hours
  },

  storage: {
    prefix: 'jagflix_',
    dbName: 'JagFlixDB',
    dbVersion: 1,
  },

  limits: {
    maxProfiles: 5,
    maxWatchlistItems: 500,
    maxFavorites: 500,
    maxRecentSearches: 20,
    maxDownloadItems: 50,
    reviewMaxLength: 1000,
  },

  theme: {
    defaultTheme: 'dark' as const,
    themes: ['dark', 'light'] as const,
  },

  breakpoints: {
    mobile: 640,
    tablet: 768,
    desktop: 1024,
    wide: 1280,
    ultrawide: 1536,
  },
} as const;

export type Config = typeof config;
