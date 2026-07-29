// ─── Recommendations API Route ─────────────────────────────────────────
import { NextRequest, NextResponse } from 'next/server';

const ZST_API = 'https://api.zstlab.cyou';
const API_KEY = process.env.ZST_API_KEY || '';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  if (!id) {
    return NextResponse.json(
      { success: false, error: 'ID parameter is required' },
      { status: 400 }
    );
  }

  try {
    const response = await fetch(`${ZST_API}/api/recommendations?id=${id}`, {
      headers: {
        'x-api-key': API_KEY,
        'Content-Type': 'application/json',
      },
      next: { revalidate: 1800 }, // 30 min cache
    });

    if (!response.ok) {
      return NextResponse.json(
        { success: false, error: 'Failed to fetch recommendations' },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json({ success: true, data: data.data || data });
  } catch (error) {
    console.error('Recommendations API error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
