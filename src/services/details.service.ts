// ─── Item Details Service ───────────────────────────────────────────────
import { apiClient } from '@/lib/api-client';
import type { ItemDetails, Recommendation } from '@/types/api';

export async function getItemDetails(itemId: string): Promise<ItemDetails> {
  const response = await apiClient.get<{ data: ItemDetails }>('/api/item-details', {
    params: { id: itemId },
  });
  return response.data;
}

export async function getRecommendations(itemId: string): Promise<Recommendation[]> {
  const response = await apiClient.get<{ data: Recommendation[] }>('/api/recommendations', {
    params: { id: itemId },
  });
  return response.data;
}
