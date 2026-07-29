import { NextRequest, NextResponse } from 'next/server';
import { searchContentData } from '@/lib/zst-api';

export async function GET(request: NextRequest) {
  const query = new URL(request.url).searchParams.get('query');
  const type = new URL(request.url).searchParams.get('type') || undefined;
  if (!query) return NextResponse.json({ success: false, error: 'Query is required' }, { status: 400 });
  try {
    const data = await searchContentData(query, type);
    return NextResponse.json({ success: true, ...data });
  } catch (e) {
    return NextResponse.json({ success: false, error: String(e), data: [] }, { status: 500 });
  }
}
