// ─── Media API Route ───────────────────────────────────────────────────
import { NextRequest, NextResponse } from 'next/server';

const ZST_API = 'https://api.zstlab.cyou';
const API_KEY = process.env.ZST_API_KEY || '';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  const season = searchParams.get('season');
  const episode = searchParams.get('episode');

  if (!id) {
    return NextResponse.json(
      { success: false, error: 'ID parameter is required' },
      { status: 400 }
    );
  }

  try {
    const params = new URLSearchParams({ id });
    if (season) params.set('season', season);
    if (episode) params.set('episode', episode);

    const response = await fetch(`${ZST_API}/api/media?${params.toString()}`, {
      headers: {
        'x-api-key': API_KEY,
        'Content-Type': 'application/json',
      },
      next: { revalidate: 86400 },
    });

    if (!response.ok) {
      return NextResponse.json(
        { success: false, error: 'Failed to fetch media' },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json({ success: true, data: data.data || data });
  } catch (error) {
    console.error('Media API error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
