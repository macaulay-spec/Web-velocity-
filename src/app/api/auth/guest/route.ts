// ─── Guest Session API Route ───────────────────────────────────────────
import { NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';

export async function POST() {
  try {
    const guestUser = {
      id: uuidv4(),
      name: 'Guest',
      email: null,
      image: null,
      provider: 'guest' as const,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const token = uuidv4();

    return NextResponse.json({
      user: guestUser,
      token,
      refreshToken: uuidv4(),
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create guest session' },
      { status: 500 }
    );
  }
}
