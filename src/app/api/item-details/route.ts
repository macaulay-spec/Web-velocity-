// ─── Item Details API Route ────────────────────────────────────────────
import { NextRequest, NextResponse } from 'next/server';
import { fetchZST, ZSTError, isApiKeyConfigured } from '@/lib/zst-api';

export async function GET(request: NextRequest) {
  const id = new URL(request.url).searchParams.get('id');
  if (!id) {
    return NextResponse.json({ success: false, error: 'ID parameter is required' }, { status: 400 });
  }
  try {
    if (!isApiKeyConfigured()) {
      return NextResponse.json({ success: false, error: 'API key not configured.' }, { status: 503 });
    }
    const data = await fetchZST('/api/item-details', { params: { id }, revalidate: 86400 });
    return NextResponse.json({ success: true, data: (data as Record<string, unknown>).data || data });
  } catch (error) {
    if (error instanceof ZSTError) {
      return NextResponse.json({ success: false, error: error.message }, { status: error.statusCode });
    }
    console.error('Details API error:', error);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}
