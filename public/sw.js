// ─── JagFlix Service Worker ────────────────────────────────────────────
// PWA offline support and caching

const CACHE_NAME = 'jagflix-v1';
const STATIC_CACHE = 'jagflix-static-v1';
const IMAGE_CACHE = 'jagflix-images-v1';
const API_CACHE = 'jagflix-api-v1';

const STATIC_ASSETS = [
  '/',
  '/offline',
  '/manifest.json',
  '/placeholder-poster.svg',
];

// Install event
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE).then((cache) => {
      return cache.addAll(STATIC_ASSETS);
    })
  );
  self.skipWaiting();
});

// Activate event
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== STATIC_CACHE && name !== IMAGE_CACHE && name !== API_CACHE)
          .map((name) => caches.delete(name))
      );
    })
  );
  self.clients.claim();
});

// Helper to determine if request is cacheable
function isCacheable(url: string): boolean {
  return url.startsWith('http') && !url.includes('chrome-extension');
}

// Fetch event with cache strategies
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-cacheable requests
  if (!isCacheable(request.url)) return;

  // API requests - Network first, fallback to cache
  if (url.pathname.startsWith('/api/')) {
    event.respondWith(networkFirst(request, API_CACHE));
    return;
  }

  // Image requests - Cache first
  if (request.destination === 'image') {
    event.respondWith(cacheFirst(request, IMAGE_CACHE));
    return;
  }

  // Navigation requests - Network first, fallback to offline page
  if (request.mode === 'navigate') {
    event.respondWith(
      networkFirst(request, STATIC_CACHE).catch(() => {
        return caches.match('/offline');
      })
    );
    return;
  }

  // Static assets - Cache first
  event.respondWith(cacheFirst(request, STATIC_CACHE));
});

// Cache first strategy
async function cacheFirst(request: Request, cacheName: string) {
  const cached = await caches.match(request);
  if (cached) return cached;

  try {
    const response = await fetch(request);
    if (response.ok) {
      const cache = await caches.open(cacheName);
      cache.put(request, response.clone());
    }
    return response;
  } catch {
    return new Response('Offline', { status: 503 });
  }
}

// Network first strategy
async function networkFirst(request: Request, cacheName: string) {
  try {
    const response = await fetch(request);
    if (response.ok) {
      const cache = await caches.open(cacheName);
      cache.put(request, response.clone());
    }
    return response;
  } catch {
    const cached = await caches.match(request);
    if (cached) return cached;
    return new Response(JSON.stringify({ error: 'Offline' }), {
      status: 503,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
