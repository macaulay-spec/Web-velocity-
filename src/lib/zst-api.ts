// ─── ZST Labs API Client ──────────────────────────────────────────────
// Server-side only. Never exposed to the browser.
// Falls back to sample data when API is unreachable.

import {
  sampleHomepage, sampleTrending, sampleHotContent,
  sampleSearchResults, getSampleDetails, sampleMedia,
  sampleRecommendations, sampleFootball,
} from './sample-data';

const ZST_API = 'https://api.zstlab.cyou';
const API_KEY = process.env.ZST_API_KEY || 'zst_v4GBeAXhssVr3NdCUhLI9p1ZMZlO8BoTzCyQCHS1';

/**
 * Fetch from ZST Labs API with sample data fallback.
 * The app ALWAYS renders content even when the API is down.
 */
async function fetchZST(endpoint: string, options: { params?: Record<string, string | undefined>; revalidate?: number } = {}) {
  const url = new URL(`${ZST_API}${endpoint}`);
  if (options.params) {
    Object.entries(options.params).forEach(([k, v]) => {
      if (v) url.searchParams.set(k, v);
    });
  }
  const res = await fetch(url.toString(), {
    headers: { 'x-api-key': API_KEY, 'Content-Type': 'application/json', 'Accept': 'application/json' },
    next: { revalidate: options.revalidate || 300 },
  });
  if (!res.ok) throw new Error(`ZST API error: ${res.status}`);
  const json = await res.json();
  // Handle wrapped response { data: ... } or direct response
  return json?.data ?? json;
}

// ─── Public API functions ─────────────────────────────────────────────

export async function getHomepageData() {
  try {
    const data = await fetchZST('/api/homepage', { revalidate: 300 });
    return { hero: data?.hero || sampleHomepage.hero, sections: data?.sections || sampleHomepage.sections };
  } catch { return sampleHomepage; }
}

export async function getTrendingData() {
  try { const d = await fetchZST('/api/trending', { revalidate: 600 }); return Array.isArray(d) ? d : sampleTrending; }
  catch { return sampleTrending; }
}

export async function getHotContentData() {
  try { const d = await fetchZST('/api/hot-movies-series', { revalidate: 600 }); return Array.isArray(d) ? d : sampleHotContent; }
  catch { return sampleHotContent; }
}

export async function getItemDetailsData(id: string) {
  const sample = getSampleDetails(id) || {};
  try { const d = await fetchZST('/api/item-details', { params: { id }, revalidate: 86400 }); return d || sample; }
  catch { return sample; }
}

export async function getMediaData(id: string, season?: string, episode?: string) {
  try { const d = await fetchZST('/api/media', { params: { id, season, episode }, revalidate: 86400 }); return d || sampleMedia; }
  catch { return sampleMedia; }
}

export async function getRecommendationsData(id: string) {
  try { const d = await fetchZST('/api/recommendations', { params: { id }, revalidate: 1800 }); return Array.isArray(d) ? d : sampleRecommendations; }
  catch { return sampleRecommendations; }
}

export async function searchContentData(query: string, type?: string) {
  try {
    const d = await fetchZST('/api/search', { params: { query, type: type !== 'all' ? type : undefined, page: '1' }, revalidate: 300 });
    const items = Array.isArray(d) ? d : [];
    return { data: items, hasMore: items.length > 10 };
  } catch {
    const filtered = sampleSearchResults.filter(i => i.title.toLowerCase().includes(query.toLowerCase()));
    return { data: filtered, hasMore: false };
  }
}

export async function getFootballData() {
  try { const d = await fetchZST('/api/football', { revalidate: 60 }); return Array.isArray(d) ? d : sampleFootball; }
  catch { return sampleFootball; }
}
