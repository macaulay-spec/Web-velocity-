// ─── User Service ───────────────────────────────────────────────────────
import type { User, UserProfile, UserSettings, WatchlistItem, UserRating, Review } from '@/types/api';

const API_BASE = '/api';

// ─── Profiles ──────────────────────────────────────────────────────────
export async function getProfiles(userId: string): Promise<UserProfile[]> {
  const response = await fetch(`${API_BASE}/user/profiles?userId=${userId}`);
  if (!response.ok) throw new Error('Failed to fetch profiles');
  return response.json();
}

export async function createProfile(profile: Omit<UserProfile, 'id'>): Promise<UserProfile> {
  const response = await fetch(`${API_BASE}/user/profiles`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(profile),
  });
  if (!response.ok) throw new Error('Failed to create profile');
  return response.json();
}

export async function updateProfile(profile: UserProfile): Promise<UserProfile> {
  const response = await fetch(`${API_BASE}/user/profiles/${profile.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(profile),
  });
  if (!response.ok) throw new Error('Failed to update profile');
  return response.json();
}

export async function deleteProfile(profileId: string): Promise<void> {
  const response = await fetch(`${API_BASE}/user/profiles/${profileId}`, {
    method: 'DELETE',
  });
  if (!response.ok) throw new Error('Failed to delete profile');
}

// ─── Watchlist ─────────────────────────────────────────────────────────
export async function getWatchlist(userId: string): Promise<WatchlistItem[]> {
  const response = await fetch(`${API_BASE}/watchlist?userId=${userId}`);
  if (!response.ok) throw new Error('Failed to fetch watchlist');
  return response.json();
}

export async function addToWatchlist(item: Omit<WatchlistItem, 'id' | 'addedAt'>): Promise<WatchlistItem> {
  const response = await fetch(`${API_BASE}/watchlist`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(item),
  });
  if (!response.ok) throw new Error('Failed to add to watchlist');
  return response.json();
}

export async function removeFromWatchlist(itemId: string, userId: string): Promise<void> {
  const response = await fetch(`${API_BASE}/watchlist/${itemId}?userId=${userId}`, {
    method: 'DELETE',
  });
  if (!response.ok) throw new Error('Failed to remove from watchlist');
}

export async function isInWatchlist(itemId: string, userId: string): Promise<boolean> {
  const response = await fetch(`${API_BASE}/watchlist/check?itemId=${itemId}&userId=${userId}`);
  if (!response.ok) throw new Error('Failed to check watchlist');
  const data = await response.json();
  return data.inWatchlist;
}

// ─── Ratings ──────────────────────────────────────────────────────────
export async function getRating(itemId: string): Promise<UserRating | null> {
  const response = await fetch(`${API_BASE}/user/rating?itemId=${itemId}`);
  if (!response.ok) throw new Error('Failed to fetch rating');
  return response.json();
}

export async function setRating(rating: Omit<UserRating, 'timestamp'>): Promise<UserRating> {
  const response = await fetch(`${API_BASE}/user/rating`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(rating),
  });
  if (!response.ok) throw new Error('Failed to set rating');
  return response.json();
}

// ─── Reviews ───────────────────────────────────────────────────────────
export async function getReviews(itemId: string): Promise<Review[]> {
  const response = await fetch(`${API_BASE}/user/reviews?itemId=${itemId}`);
  if (!response.ok) throw new Error('Failed to fetch reviews');
  return response.json();
}

export async function createReview(review: Omit<Review, 'id' | 'createdAt' | 'updatedAt' | 'likes'>): Promise<Review> {
  const response = await fetch(`${API_BASE}/user/reviews`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(review),
  });
  if (!response.ok) throw new Error('Failed to create review');
  return response.json();
}

// ─── Settings ──────────────────────────────────────────────────────────
export async function getSettings(userId: string): Promise<UserSettings> {
  const response = await fetch(`${API_BASE}/user/settings?userId=${userId}`);
  if (!response.ok) throw new Error('Failed to fetch settings');
  return response.json();
}

export async function updateSettings(settings: Partial<UserSettings> & { userId: string }): Promise<UserSettings> {
  const response = await fetch(`${API_BASE}/user/settings`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(settings),
  });
  if (!response.ok) throw new Error('Failed to update settings');
  return response.json();
}
