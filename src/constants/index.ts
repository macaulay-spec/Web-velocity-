// ─── JagFlix Constants ─────────────────────────────────────────────────

export const APP_NAME = 'JagFlix';
export const APP_TAGLINE = 'Premium Streaming Experience';
export const APP_DESCRIPTION = 'Discover, stream, and enjoy premium content curated just for you.';

// Route paths
export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  SEARCH: '/search',
  BROWSE: '/browse',
  MY_LIST: '/my-list',
  PROFILE: '/profile',
  SETTINGS: '/settings',
  FOOTBALL: '/football',
  ADMIN: '/admin',
  MOVIE: (id: string) => `/movie/${id}`,
  SERIES: (id: string) => `/series/${id}`,
  WATCH: (id: string) => `/watch/${id}`,
} as const;

// Storage keys
export const STORAGE_KEYS = {
  AUTH_TOKEN: 'jagflix_auth_token',
  REFRESH_TOKEN: 'jagflix_refresh_token',
  USER: 'jagflix_user',
  THEME: 'jagflix_theme',
  LANGUAGE: 'jagflix_language',
  PLAYBACK_SPEED: 'jagflix_playback_speed',
  SUBTITLE_PREFERENCES: 'jagflix_subtitle_prefs',
  RECENT_SEARCHES: 'jagflix_recent_searches',
  CONTINUE_WATCHING: 'jagflix_continue_watching',
  GUEST_SESSION: 'jagflix_guest_session',
} as const;

// Content types
export const CONTENT_TYPES = {
  MOVIE: 'movie',
  SERIES: 'series',
  ALL: 'all',
} as const;

// Sort options
export const SORT_OPTIONS = {
  NEWEST: 'newest',
  OLDEST: 'oldest',
  MOST_POPULAR: 'most_popular',
  HIGHEST_RATED: 'highest_rated',
} as const;

// Quality labels
export const QUALITY_LABELS: Record<string, string> = {
  '1080p': 'Full HD',
  '720p': 'HD',
  '480p': 'SD',
  '360p': 'Low',
  '4K': '4K Ultra HD',
};

// Country codes to names
export const COUNTRY_NAMES: Record<string, string> = {
  US: 'United States',
  GB: 'United Kingdom',
  KR: 'South Korea',
  JP: 'Japan',
  IN: 'India',
  FR: 'France',
  DE: 'Germany',
  ES: 'Spain',
  IT: 'Italy',
  CA: 'Canada',
  AU: 'Australia',
  CN: 'China',
  TW: 'Taiwan',
  HK: 'Hong Kong',
  TH: 'Thailand',
  PH: 'Philippines',
  ID: 'Indonesia',
  MY: 'Malaysia',
  SG: 'Singapore',
  VN: 'Vietnam',
};

// Language codes to names
export const LANGUAGE_NAMES: Record<string, string> = {
  en: 'English',
  es: 'Spanish',
  fr: 'French',
  de: 'German',
  it: 'Italian',
  pt: 'Portuguese',
  ja: 'Japanese',
  ko: 'Korean',
  zh: 'Chinese',
  hi: 'Hindi',
  ar: 'Arabic',
  ru: 'Russian',
  tr: 'Turkish',
  th: 'Thai',
  vi: 'Vietnamese',
};

// Genre IDs to names (common)
export const GENRE_NAMES: Record<number, string> = {
  28: 'Action',
  12: 'Adventure',
  16: 'Animation',
  35: 'Comedy',
  80: 'Crime',
  99: 'Documentary',
  18: 'Drama',
  10751: 'Family',
  14: 'Fantasy',
  36: 'History',
  27: 'Horror',
  10402: 'Music',
  9648: 'Mystery',
  10749: 'Romance',
  878: 'Sci-Fi',
  10770: 'TV Movie',
  53: 'Thriller',
  10752: 'War',
  37: 'Western',
  10759: 'Action & Adventure',
  10762: 'Kids',
  10763: 'News',
  10764: 'Reality',
  10765: 'Sci-Fi & Fantasy',
  10766: 'Soap',
  10767: 'Talk',
  10768: 'War & Politics',
};

// Keyboard shortcuts
export const KEYBOARD_SHORTCUTS = {
  TOGGLE_PLAY: ['Space', 'k'],
  FULLSCREEN: ['f', 'F11'],
  MUTE: ['m'],
  VOLUME_UP: ['ArrowUp'],
  VOLUME_DOWN: ['ArrowDown'],
  SEEK_FORWARD: ['ArrowRight', 'l'],
  SEEK_BACKWARD: ['ArrowLeft', 'j'],
  PICTURE_IN_PICTURE: ['i'],
  SUBTITLES: ['s'],
  QUALITY: ['q'],
  ESCAPE: ['Escape'],
} as const;

// Animation durations
export const ANIMATION = {
  fast: 0.15,
  normal: 0.3,
  slow: 0.5,
  spring: { type: 'spring' as const, stiffness: 300, damping: 30 },
  springLight: { type: 'spring' as const, stiffness: 200, damping: 20 },
} as const;
