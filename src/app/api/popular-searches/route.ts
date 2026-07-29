import { NextResponse } from 'next/server';

const popular = [
  { id: 'ps1', query: 'Dune', count: 1500 },
  { id: 'ps2', query: 'Oppenheimer', count: 1200 },
  { id: 'ps3', query: 'The Batman', count: 980 },
  { id: 'ps4', query: 'Interstellar', count: 2100 },
  { id: 'ps5', query: 'Stranger Things', count: 1850 },
  { id: 'ps6', query: 'Breaking Bad', count: 1600 },
  { id: 'ps7', query: 'John Wick', count: 890 },
  { id: 'ps8', query: 'Game of Thrones', count: 2400 },
];

export async function GET() {
  return NextResponse.json({ success: true, data: popular });
}
