// ─── Media Service ──────────────────────────────────────────────────────
import { apiClient } from '@/lib/api-client';
import type { MediaData } from '@/types/api';

export async function getMedia(itemId: string, season?: number, episode?: number): Promise<MediaData> {
  const response = await apiClient.get<{ data: MediaData }>('/api/media', {
    params: {
      id: itemId,
      ...(season !== undefined && { season }),
      ...(episode !== undefined && { episode }),
    },
  });
  return response.data;
}
