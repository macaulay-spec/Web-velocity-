// ─── Homepage Service ──────────────────────────────────────────────────
import { apiClient } from '@/lib/api-client';
import type { HomepageData } from '@/types/api';

export async function getHomepage(): Promise<HomepageData> {
  const response = await apiClient.get<{ data: HomepageData }>('/api/homepage');
  return response.data;
}
