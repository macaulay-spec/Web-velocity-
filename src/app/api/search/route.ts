// ─── Search API Route ──────────────────────────────────────────────────
import { NextRequest, NextResponse } from 'next/server';
import { fetchZST, ZSTError, isApiKeyConfigured } from '@/lib/zst-api';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('query');

  if (!query) {
    return NextResponse.json(
      { success: false, error: 'Query parameter is required' },
      { status: 400 }
    );
  }

  try {
    if (!isApiKeyConfigured()) {
      return NextResponse.json(
        { success: false, error: 'API key not configured. Set ZST_API_KEY environment variable.' },
        { status: 503 }
      );
    }

    const data = await fetchZST('/api/search', {
      params: {
        query,
        type: searchParams.get('type') || undefined,
        genre: searchParams.get('genre') || undefined,
        year: searchParams.get('year') || undefined,
        language: searchParams.get('language') || undefined,
        rating: searchParams.get('rating') || undefined,
        country: searchParams.get('country') || undefined,
        sort: searchParams.get('sort') || undefined,
        page: searchParams.get('page') || '1',
      },
      revalidate: 300,
    });

    const result = (data as Record<string, unknown>).data || data;
    return NextResponse.json({ success: true, data: result });
  } catch (error) {
    if (error instanceof ZSTError) {
      return NextResponse.json(
        { success: false, error: error.message },
        { status: error.statusCode }
      );
    }
    console.error('Search API error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
