// ─── Trending Service ───────────────────────────────────────────────────
import { apiClient } from '@/lib/api-client';
import type { TrendingItem, HotContentItem } from '@/types/api';

export async function getTrending(): Promise<TrendingItem[]> {
  const response = await apiClient.get<{ data: TrendingItem[] }>('/api/trending');
  return response.data;
}

export async function getHotMoviesSeries(): Promise<HotContentItem[]> {
  const response = await apiClient.get<{ data: HotContentItem[] }>('/api/hot-movies-series');
  return response.data;
}
