import { NextRequest, NextResponse } from 'next/server';
import { getItemDetailsData } from '@/lib/zst-api';

export async function GET(request: NextRequest) {
  const id = new URL(request.url).searchParams.get('id');
  if (!id) return NextResponse.json({ success: false, error: 'ID required' }, { status: 400 });
  try {
    const data = await getItemDetailsData(id);
    return NextResponse.json({ success: true, data });
  } catch (e) {
    return NextResponse.json({ success: false, error: String(e) }, { status: 500 });
  }
}
