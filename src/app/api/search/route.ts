// ─── Search API Route ──────────────────────────────────────────────────
import { NextRequest, NextResponse } from 'next/server';

const ZST_API = 'https://api.zstlab.cyou';
const API_KEY = process.env.ZST_API_KEY || '';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('query');
  const type = searchParams.get('type');
  const genre = searchParams.get('genre');
  const year = searchParams.get('year');
  const language = searchParams.get('language');
  const rating = searchParams.get('rating');
  const country = searchParams.get('country');
  const sort = searchParams.get('sort');
  const page = searchParams.get('page') || '1';

  if (!query) {
    return NextResponse.json(
      { success: false, error: 'Query parameter is required' },
      { status: 400 }
    );
  }

  try {
    const params = new URLSearchParams({ query, page });
    if (type) params.set('type', type);
    if (genre) params.set('genre', genre);
    if (year) params.set('year', year);
    if (language) params.set('language', language);
    if (rating) params.set('rating', rating);
    if (country) params.set('country', country);
    if (sort) params.set('sort', sort);

    const response = await fetch(`${ZST_API}/api/search?${params.toString()}`, {
      headers: {
        'x-api-key': API_KEY,
        'Content-Type': 'application/json',
      },
      next: { revalidate: 300 },
    });

    if (!response.ok) {
      return NextResponse.json(
        { success: false, error: 'Search failed' },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json({ success: true, ...(data.data ? { data: data.data } : data) });
  } catch (error) {
    console.error('Search API error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
