// ─── Search Service ─────────────────────────────────────────────────────
import { apiClient } from '@/lib/api-client';
import type { SearchResult, SearchFilters } from '@/types/api';

export interface SearchResponse {
  data: SearchResult[];
  currentPage: number;
  totalPages: number;
  totalResults: number;
  hasMore: boolean;
}

export async function searchContent(filters: SearchFilters): Promise<SearchResponse> {
  const response = await apiClient.get<SearchResponse>('/api/search', {
    params: {
      query: filters.query,
      type: filters.type !== 'all' ? filters.type : undefined,
      genre: filters.genre,
      year: filters.year,
      language: filters.language,
      rating: filters.rating,
      country: filters.country,
      sort: filters.sort,
      page: filters.page || 1,
    },
  });
  return response;
}

export async function getPopularSearches() {
  const response = await apiClient.get<{ data: Array<{ id: string; query: string; count: number }> }>('/api/popular-searches');
  return response.data;
}
