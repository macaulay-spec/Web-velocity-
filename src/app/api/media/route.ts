// ─── Media API Route ───────────────────────────────────────────────────
import { NextRequest, NextResponse } from 'next/server';
import { fetchZST, ZSTError, isApiKeyConfigured } from '@/lib/zst-api';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  if (!id) {
    return NextResponse.json({ success: false, error: 'ID parameter is required' }, { status: 400 });
  }
  try {
    if (!isApiKeyConfigured()) {
      return NextResponse.json({ success: false, error: 'API key not configured.' }, { status: 503 });
    }
    const data = await fetchZST('/api/media', {
      params: {
        id,
        season: searchParams.get('season') || undefined,
        episode: searchParams.get('episode') || undefined,
      },
      revalidate: 86400,
    });
    return NextResponse.json({ success: true, data: (data as Record<string, unknown>).data || data });
  } catch (error) {
    if (error instanceof ZSTError) {
      return NextResponse.json({ success: false, error: error.message }, { status: error.statusCode });
    }
    console.error('Media API error:', error);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}
