// ─── JagFlix API Client ────────────────────────────────────────────────
// Server-side API client for ZST Labs API
// NEVER expose API key to the browser

import { config } from '@/config';

export class ApiClientError extends Error {
  constructor(
    message: string,
    public statusCode?: number,
    public originalError?: unknown
  ) {
    super(message);
    this.name = 'ApiClientError';
  }
}

interface RequestOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  params?: Record<string, string | number | boolean | undefined>;
  body?: unknown;
  cache?: RequestCache;
  revalidate?: number;
  headers?: Record<string, string>;
}

/**
 * Server-side API client for ZST Labs API.
 * This runs ONLY in Route Handlers and Server Components.
 */
async function fetchApi<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
  const { method = 'GET', params, body, cache, revalidate, headers } = options;

  // Build URL with query params
  const url = new URL(`${config.api.baseUrl}${endpoint}`);
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        url.searchParams.set(key, String(value));
      }
    });
  }

  // Build fetch options
  const fetchOptions: RequestInit = {
    method,
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': config.api.key,
      'User-Agent': 'JagFlix/1.0',
      ...headers,
    },
  };

  if (body && method !== 'GET') {
    fetchOptions.body = JSON.stringify(body);
  }

  // Cache strategy
  if (cache) fetchOptions.cache = cache;
  if (revalidate !== undefined) {
    (fetchOptions as Record<string, unknown>).next = { revalidate };
  }

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), config.api.timeout);
    fetchOptions.signal = controller.signal;

    const response = await fetch(url.toString(), fetchOptions);
    clearTimeout(timeoutId);

    if (!response.ok) {
      const errorText = await response.text().catch(() => 'Unknown error');
      throw new ApiClientError(
        `API request failed: ${response.status} ${response.statusText}`,
        response.status,
        errorText
      );
    }

    const data = await response.json();
    return data as T;
  } catch (error) {
    if (error instanceof ApiClientError) throw error;
    if (error instanceof Error && error.name === 'AbortError') {
      throw new ApiClientError('Request timed out', undefined, error);
    }
    throw new ApiClientError(
      'Network request failed',
      undefined,
      error instanceof Error ? error.message : error
    );
  }
}

/**
 * Retry wrapper with exponential backoff
 */
async function fetchWithRetry<T>(
  endpoint: string,
  options: RequestOptions = {}
): Promise<T> {
  const maxRetries = config.api.retryCount;
  let lastError: Error | null = null;

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await fetchApi<T>(endpoint, options);
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error));

      // Don't retry on 4xx errors (client errors)
      if (error instanceof ApiClientError && error.statusCode && error.statusCode >= 400 && error.statusCode < 500) {
        throw error;
      }

      if (attempt < maxRetries) {
        const delay = config.api.retryDelay * Math.pow(2, attempt);
        await new Promise((resolve) => setTimeout(resolve, delay));
      }
    }
  }

  throw lastError || new ApiClientError('Request failed after retries');
}

// ─── Public API ─────────────────────────────────────────────────────────

export const apiClient = {
  get: <T>(endpoint: string, options?: RequestOptions) =>
    fetchWithRetry<T>(endpoint, { ...options, method: 'GET' }),

  post: <T>(endpoint: string, body?: unknown, options?: RequestOptions) =>
    fetchWithRetry<T>(endpoint, { ...options, method: 'POST', body }),

  put: <T>(endpoint: string, body?: unknown, options?: RequestOptions) =>
    fetchWithRetry<T>(endpoint, { ...options, method: 'PUT', body }),

  delete: <T>(endpoint: string, options?: RequestOptions) =>
    fetchWithRetry<T>(endpoint, { ...options, method: 'DELETE' }),
};
