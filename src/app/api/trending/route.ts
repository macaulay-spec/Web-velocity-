// ─── Trending API Route ────────────────────────────────────────────────
import { NextResponse } from 'next/server';

const ZST_API = 'https://api.zstlab.cyou';
const API_KEY = process.env.ZST_API_KEY || '';

export async function GET() {
  try {
    const response = await fetch(`${ZST_API}/api/trending`, {
      headers: {
        'x-api-key': API_KEY,
        'Content-Type': 'application/json',
      },
      next: { revalidate: 600 }, // 10 min cache
    });

    if (!response.ok) {
      return NextResponse.json(
        { success: false, error: 'Failed to fetch trending' },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json({ success: true, data: data.data || data });
  } catch (error) {
    console.error('Trending API error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
