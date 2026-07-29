// ─── JagFlix Middleware ────────────────────────────────────────────────
// Security headers, auth guards, and request processing

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Routes that require authentication
const protectedRoutes = [
  '/my-list',
  '/profile',
  '/settings',
  '/admin',
];

// Routes that are auth-only (no access when logged in)
const authRoutes = [
  '/login',
  '/register',
];

// API routes that require authentication
const protectedApiRoutes = [
  '/api/user',
  '/api/history',
  '/api/watchlist',
];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Get auth token from cookies
  const authToken = request.cookies.get('auth_token')?.value;

  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );
  const isAuthRoute = authRoutes.some((route) => pathname.startsWith(route));
  const isProtectedApi = protectedApiRoutes.some((route) =>
    pathname.startsWith(route)
  );

  // Redirect to login if accessing protected route without auth
  if (isProtectedRoute && !authToken) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Redirect to home if accessing auth routes while authenticated
  if (isAuthRoute && authToken) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  // API auth check
  if (isProtectedApi && !authToken) {
    return NextResponse.json(
      { error: 'Authentication required' },
      { status: 401 }
    );
  }

  // Security headers
  const response = NextResponse.next();

  response.headers.set('X-DNS-Prefetch-Control', 'on');
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set('X-XSS-Protection', '1; mode=block');

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     * - sw.js (service worker)
     * - manifest.json
     */
    '/((?!_next/static|_next/image|favicon.ico|public|sw.js|manifest.json|placeholder-poster.svg).*)',
  ],
};
