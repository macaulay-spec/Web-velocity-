// ─── JagFlix Utility Functions ──────────────────────────────────────────
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/** Merge Tailwind classes with conflict resolution */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Format runtime (minutes → "2h 15m") */
export function formatRuntime(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  if (hours === 0) return `${mins}m`;
  if (mins === 0) return `${hours}h`;
  return `${hours}h ${mins}m`;
}

/** Format date to relative or absolute */
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return 'Yesterday';
  if (diffDays < 7) return `${diffDays} days ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
  if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;

  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

/** Format rating to single decimal */
export function formatRating(rating: number): string {
  return rating.toFixed(1);
}

/** Format vote count */
export function formatVoteCount(count: number): string {
  if (count >= 1_000_000) return `${(count / 1_000_000).toFixed(1)}M`;
  if (count >= 1_000) return `${(count / 1_000).toFixed(1)}K`;
  return count.toString();
}

/** Format file size */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
}

/** Truncate text with ellipsis */
export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trimEnd() + '…';
}

/** Generate initials from name */
export function getInitials(name: string): string {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

/** Debounce function */
export function debounce<T extends (...args: unknown[]) => unknown>(
  fn: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delay);
  };
}

/** Generate random ID */
export function generateId(): string {
  return crypto.randomUUID?.() ?? Math.random().toString(36).slice(2, 11);
}

/** Get image URL with fallback */
export function getImageUrl(
  url: string | undefined | null,
  fallback: string = '/placeholder-poster.svg'
): string {
  if (!url || url.trim() === '') return fallback;
  if (url.startsWith('http')) return url;
  return url;
}

/** Parse quality from string */
export function parseQuality(quality: string): number {
  const match = quality.match(/(\d+)/);
  return match ? parseInt(match[1], 10) : 0;
}

/** Sort sources by quality (highest first) */
export function sortSourcesByQuality<T extends { quality: string }>(sources: T[]): T[] {
  return [...sources].sort((a, b) => parseQuality(b.quality) - parseQuality(a.quality));
}

/** Check if running on client */
export const isClient = typeof window !== 'undefined';

/** Check if running on server */
export const isServer = !isClient;

/** Get locale from language code */
export function getLocale(language: string): string {
  const map: Record<string, string> = {
    en: 'en-US',
    es: 'es-ES',
    fr: 'fr-FR',
    de: 'de-DE',
    it: 'it-IT',
    pt: 'pt-BR',
    ja: 'ja-JP',
    ko: 'ko-KR',
    zh: 'zh-CN',
    hi: 'hi-IN',
    ar: 'ar-SA',
    ru: 'ru-RU',
    tr: 'tr-TR',
    th: 'th-TH',
    vi: 'vi-VN',
  };
  return map[language] || 'en-US';
}

/** Calculate progress percentage */
export function calculateProgress(current: number, total: number): number {
  if (total <= 0) return 0;
  return Math.min(100, Math.round((current / total) * 100));
}

/** Format seconds to time string (HH:MM:SS or MM:SS) */
export function formatTime(seconds: number): string {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor(seconds % 60);
  if (h > 0) return `${h}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  return `${m}:${s.toString().padStart(2, '0')}`;
}

/** Generate array of numbers */
export function range(start: number, end: number): number[] {
  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
}

/** Check if a value is a Promise */
export function isPromise<T>(value: unknown): value is Promise<T> {
  return value instanceof Promise;
}
