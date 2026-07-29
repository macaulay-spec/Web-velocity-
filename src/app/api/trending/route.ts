import { NextResponse } from 'next/server';
import { getTrendingData } from '@/lib/zst-api';

export async function GET() {
  try {
    const data = await getTrendingData();
    return NextResponse.json({ success: true, data });
  } catch (e) {
    return NextResponse.json({ success: false, error: String(e) }, { status: 500 });
  }
}
