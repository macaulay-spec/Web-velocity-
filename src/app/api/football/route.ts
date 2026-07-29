// ─── Football API Route ────────────────────────────────────────────────
import { NextResponse } from 'next/server';
import { fetchZST, ZSTError, isApiKeyConfigured } from '@/lib/zst-api';

export async function GET() {
  try {
    if (!isApiKeyConfigured()) {
      return NextResponse.json({ success: false, error: 'API key not configured.' }, { status: 503 });
    }
    const data = await fetchZST('/api/football', { revalidate: 60 });
    return NextResponse.json({ success: true, data: (data as Record<string, unknown>).data || data });
  } catch (error) {
    if (error instanceof ZSTError) {
      return NextResponse.json({ success: false, error: error.message }, { status: error.statusCode });
    }
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}
