// ─── Football Service ───────────────────────────────────────────────────
import { apiClient } from '@/lib/api-client';
import type { FootballMatch } from '@/types/api';

export async function getFootballMatches(): Promise<FootballMatch[]> {
  const response = await apiClient.get<{ data: FootballMatch[] }>('/api/football');
  return response.data;
}
