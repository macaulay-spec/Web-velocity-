// ─── ZST Labs API Helper ──────────────────────────────────────────────
// Centralized API client for ZST Labs to avoid duplication across route handlers

const ZST_API = 'https://api.zstlab.cyou';

// API key embedded for direct deployment — environment variable takes precedence
const API_KEY = process.env.ZST_API_KEY || 'zst_v4GBeAXhssVr3NdCUhLI9p1ZMZlO8BoTzCyQCHS1';

export class ZSTError extends Error {
  constructor(
    message: string,
    public statusCode: number = 500,
    public details?: unknown
  ) {
    super(message);
    this.name = 'ZSTError';
  }
}

/**
 * Check if API key is configured
 */
export function isApiKeyConfigured(): boolean {
  return API_KEY.length > 0;
}

/**
 * Fetch from ZST Labs API with unified error handling
 */
export async function fetchZST<T = unknown>(
  endpoint: string,
  options: {
    params?: Record<string, string | undefined>;
    revalidate?: number;
  } = {}
): Promise<T> {
  const { params, revalidate = 300 } = options;

  if (!isApiKeyConfigured()) {
    throw new ZSTError(
      'ZST API key is missing or invalid.',
      503
    );
  }

  // Build URL with query params
  const url = new URL(`${ZST_API}${endpoint}`);
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        url.searchParams.set(key, value);
      }
    });
  }

  const fetchOptions: RequestInit = {
    headers: {
      'x-api-key': API_KEY,
      'Content-Type': 'application/json',
    },
    next: { revalidate },
  };

  const response = await fetch(url.toString(), fetchOptions);

  if (!response.ok) {
    const errorText = await response.text().catch(() => 'Unknown error');
    throw new ZSTError(
      `ZST API error (${response.status}): ${errorText}`,
      response.status,
      errorText
    );
  }

  const data = await response.json();
  return data as T;
}
