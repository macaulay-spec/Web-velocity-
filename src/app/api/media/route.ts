import { NextRequest, NextResponse } from 'next/server';
import { getMediaData } from '@/lib/zst-api';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  if (!id) return NextResponse.json({ success: false, error: 'ID required' }, { status: 400 });
  try {
    const data = await getMediaData(id, searchParams.get('season') || undefined, searchParams.get('episode') || undefined);
    return NextResponse.json({ success: true, data });
  } catch (e) {
    return NextResponse.json({ success: false, error: String(e) }, { status: 500 });
  }
}
