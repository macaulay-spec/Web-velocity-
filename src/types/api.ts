// ─── JagFlix API Types ──────────────────────────────────────────────────
// Strongly typed interfaces for ZST Labs API responses

// ─── Generic API Response ───────────────────────────────────────────────
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  currentPage: number;
  totalPages: number;
  totalResults: number;
  hasMore: boolean;
}

// ─── Homepage ───────────────────────────────────────────────────────────
export interface HeroBanner {
  id: string;
  title: string;
  description?: string;
  image: string;
  backdrop: string;
  type: 'movie' | 'series';
  rating?: number;
  year?: number;
}

export interface HomepageSection {
  id: string;
  title: string;
  type: 'trending' | 'popular' | 'top_rated' | 'recent' | 'recommended' | 'continue_watching' | 'genre' | 'custom';
  items: HomepageItem[];
  layout?: 'shelf' | 'grid' | 'hero' | 'card';
  genreId?: number;
}

export interface HomepageItem {
  id: string;
  title: string;
  type: 'movie' | 'series';
  poster: string;
  backdrop?: string;
  overview?: string;
  rating?: number;
  year?: number;
  genres?: Genre[];
  mediaType?: string;
}

export interface HomepageData {
  hero: HeroBanner[];
  sections: HomepageSection[];
}

// ─── Item Details ──────────────────────────────────────────────────────
export interface Genre {
  id: number;
  name: string;
}

export interface CastMember {
  id: string;
  name: string;
  character?: string;
  image?: string;
  order?: number;
}

export interface CrewMember {
  id: string;
  name: string;
  job: string;
  department?: string;
  image?: string;
}

export interface Season {
  id: string;
  number: number;
  name: string;
  overview?: string;
  episodes: Episode[];
  poster?: string;
  airDate?: string;
}

export interface Episode {
  id: string;
  number: number;
  title: string;
  overview?: string;
  runtime?: number;
  image?: string;
  airDate?: string;
  rating?: number;
}

export interface Trailer {
  id: string;
  title: string;
  url: string;
  thumbnail?: string;
}

export interface ItemDetails {
  id: string;
  title: string;
  type: 'movie' | 'series';
  description?: string;
  synopsis?: string;
  poster: string;
  backdrop?: string;
  rating?: number;
  year?: number;
  runtime?: number;
  genres?: Genre[];
  cast?: CastMember[];
  crew?: CrewMember[];
  director?: string;
  writers?: string[];
  seasons?: Season[];
  trailers?: Trailer[];
  maturityRating?: string;
  status?: string;
  language?: string;
  country?: string;
  releaseDate?: string;
  tagline?: string;
  voteCount?: number;
}

// ─── Media ──────────────────────────────────────────────────────────────
export interface MediaSource {
  url: string;
  quality: string;
  type: 'hls' | 'mp4';
  size?: number;
  label?: string;
}

export interface Subtitle {
  id: string;
  url: string;
  language: string;
  label: string;
  type: 'srt' | 'vtt';
}

export interface DownloadSource {
  url: string;
  quality: string;
  size: number;
  type: 'mp4' | 'mkv';
}

export interface MediaData {
  sources: MediaSource[];
  subtitles: Subtitle[];
  downloads?: DownloadSource[];
  thumbnails?: string;
}

// ─── Search ─────────────────────────────────────────────────────────────
export interface SearchFilters {
  query: string;
  type?: 'movie' | 'series' | 'all';
  genre?: number;
  year?: number;
  language?: string;
  rating?: number;
  country?: string;
  sort?: 'newest' | 'oldest' | 'most_popular' | 'highest_rated';
  page?: number;
}

export interface SearchResult {
  id: string;
  title: string;
  type: 'movie' | 'series';
  poster: string;
  backdrop?: string;
  overview?: string;
  rating?: number;
  year?: number;
  genres?: Genre[];
  mediaType?: string;
}

// ─── Trending ───────────────────────────────────────────────────────────
export interface TrendingItem {
  id: string;
  title: string;
  type: 'movie' | 'series';
  poster: string;
  backdrop?: string;
  rating?: number;
  year?: number;
  overview?: string;
  rank?: number;
}

// ─── Hot/Popular ────────────────────────────────────────────────────────
export interface HotContentItem {
  id: string;
  title: string;
  type: 'movie' | 'series';
  poster: string;
  backdrop?: string;
  rating?: number;
  year?: number;
  overview?: string;
  genres?: Genre[];
}

// ─── Recommendations ────────────────────────────────────────────────────
export interface Recommendation {
  id: string;
  title: string;
  type: 'movie' | 'series';
  poster: string;
  backdrop?: string;
  rating?: number;
  year?: number;
  overview?: string;
  reason?: string;
}

// ─── Popular Searches ──────────────────────────────────────────────────
export interface PopularSearch {
  id: string;
  query: string;
  count: number;
  type?: 'movie' | 'series';
}

// ─── Football ──────────────────────────────────────────────────────────
export interface FootballMatch {
  id: string;
  homeTeam: string;
  awayTeam: string;
  homeScore?: number;
  awayScore?: number;
  status: 'live' | 'upcoming' | 'finished' | 'halftime';
  date: string;
  time: string;
  league: string;
  streams: FootballStream[];
  minute?: number;
  venue?: string;
}

export interface FootballStream {
  id: string;
  url: string;
  quality: string;
  language: string;
  type: 'hls' | 'mp4';
}

// ─── User ───────────────────────────────────────────────────────────────
export interface User {
  id: string;
  email?: string;
  name?: string;
  image?: string;
  provider?: 'email' | 'google' | 'github' | 'guest';
  createdAt: string;
  updatedAt: string;
}

export interface UserProfile {
  id: string;
  userId: string;
  name: string;
  image?: string;
  type: 'adult' | 'child';
  pin?: string;
  isDefault: boolean;
}

// ─── Watch History ──────────────────────────────────────────────────────
export interface WatchHistory {
  id: string;
  userId: string;
  itemId: string;
  itemType: 'movie' | 'series';
  title: string;
  poster: string;
  progress: number; // 0-100 percentage
  duration: number; // total duration in seconds
  watchedAt: string;
  seasonNumber?: number;
  episodeNumber?: number;
  episodeId?: string;
}

// ─── Playback Progress ─────────────────────────────────────────────────
export interface PlaybackProgress {
  itemId: string;
  itemType: 'movie' | 'series';
  currentTime: number;
  duration: number;
  timestamp: string;
  seasonNumber?: number;
  episodeNumber?: number;
  episodeId?: string;
}

// ─── Watchlist ──────────────────────────────────────────────────────────
export interface WatchlistItem {
  id: string;
  itemId: string;
  itemType: 'movie' | 'series';
  title: string;
  poster: string;
  backdrop?: string;
  rating?: number;
  year?: number;
  addedAt: string;
}

// ─── Rating ─────────────────────────────────────────────────────────────
export interface UserRating {
  itemId: string;
  itemType: 'movie' | 'series';
  rating: number; // 1-10
  timestamp: string;
}

export interface Review {
  id: string;
  userId: string;
  userName: string;
  userImage?: string;
  itemId: string;
  itemType: 'movie' | 'series';
  rating: number;
  content: string;
  createdAt: string;
  updatedAt: string;
  likes: number;
}

// ─── Notification ──────────────────────────────────────────────────────
export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  read: boolean;
  createdAt: string;
  link?: string;
}

// ─── Settings ───────────────────────────────────────────────────────────
export interface UserSettings {
  theme: 'dark' | 'light';
  language: string;
  autoplay: boolean;
  autoplayNext: boolean;
  subtitleLanguage: string;
  subtitleSize: 'small' | 'medium' | 'large';
  subtitleColor: string;
  subtitleBackground: boolean;
  playbackSpeed: number;
  defaultQuality: string;
  notifications: boolean;
  emailNotifications: boolean;
  matureContent: boolean;
  autoplayPreviews: boolean;
  wifiOnlyDownload: boolean;
  dataSaver: boolean;
}
