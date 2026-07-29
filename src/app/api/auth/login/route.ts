// ─── Login API Route ───────────────────────────────────────────────────
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    // In production, validate against database
    // For now, return mock response for development
    return NextResponse.json({
      user: {
        id: 'user_' + Math.random().toString(36).slice(2),
        email,
        name: email.split('@')[0],
        provider: 'email',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      token: 'token_' + Math.random().toString(36).slice(2),
      refreshToken: 'refresh_' + Math.random().toString(36).slice(2),
    });
  } catch {
    return NextResponse.json(
      { error: 'Invalid request' },
      { status: 400 }
    );
  }
}
