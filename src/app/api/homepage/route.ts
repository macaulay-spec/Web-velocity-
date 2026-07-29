// ─── Homepage API Route ────────────────────────────────────────────────
import { NextResponse } from 'next/server';
import { fetchZST, ZSTError, isApiKeyConfigured } from '@/lib/zst-api';

export async function GET() {
  try {
    if (!isApiKeyConfigured()) {
      return NextResponse.json(
        { success: false, error: 'API key not configured. Set ZST_API_KEY environment variable.' },
        { status: 503 }
      );
    }

    const data = await fetchZST('/api/homepage', { revalidate: 300 });
    return NextResponse.json({ success: true, data: (data as Record<string, unknown>).data || data });
  } catch (error) {
    if (error instanceof ZSTError) {
      return NextResponse.json(
        { success: false, error: error.message },
        { status: error.statusCode }
      );
    }
    console.error('Homepage API error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
