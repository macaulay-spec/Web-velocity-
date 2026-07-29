// ─── User History Service ──────────────────────────────────────────────
import type { WatchHistory, PlaybackProgress } from '@/types/api';

const API_BASE = '/api';

export async function getWatchHistory(userId: string): Promise<WatchHistory[]> {
  const response = await fetch(`${API_BASE}/history?userId=${userId}`);
  if (!response.ok) throw new Error('Failed to fetch watch history');
  return response.json();
}

export async function getContinueWatching(userId: string): Promise<WatchHistory[]> {
  const response = await fetch(`${API_BASE}/history/continue?userId=${userId}`);
  if (!response.ok) throw new Error('Failed to fetch continue watching');
  return response.json();
}

export async function savePlaybackProgress(progress: PlaybackProgress): Promise<void> {
  const response = await fetch(`${API_BASE}/history/progress`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(progress),
  });
  if (!response.ok) throw new Error('Failed to save progress');
}

export async function deleteWatchHistory(historyId: string): Promise<void> {
  const response = await fetch(`${API_BASE}/history/${historyId}`, {
    method: 'DELETE',
  });
  if (!response.ok) throw new Error('Failed to delete history item');
}

export async function clearAllHistory(userId: string): Promise<void> {
  const response = await fetch(`${API_BASE}/history/clear`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userId }),
  });
  if (!response.ok) throw new Error('Failed to clear history');
}
