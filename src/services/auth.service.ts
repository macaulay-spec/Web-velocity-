// ─── Auth Service ───────────────────────────────────────────────────────
import type { User } from '@/types/api';
import { STORAGE_KEYS } from '@/constants';

const API_BASE = '/api/auth';

export interface AuthResponse {
  user: User;
  token: string;
  refreshToken?: string;
}

// ─── Guest Session ────────────────────────────────────────────────────
export async function createGuestSession(): Promise<AuthResponse> {
  const response = await fetch(`${API_BASE}/guest`, { method: 'POST' });
  if (!response.ok) throw new Error('Failed to create guest session');
  const data = await response.json();
  localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, data.token);
  if (data.refreshToken) localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, data.refreshToken);
  return data;
}

// ─── Email Auth ────────────────────────────────────────────────────────
export async function loginWithEmail(email: string, password: string): Promise<AuthResponse> {
  const response = await fetch(`${API_BASE}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  if (!response.ok) throw new Error('Invalid credentials');
  const data = await response.json();
  localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, data.token);
  if (data.refreshToken) localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, data.refreshToken);
  return data;
}

export async function registerWithEmail(email: string, password: string, name: string): Promise<AuthResponse> {
  const response = await fetch(`${API_BASE}/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password, name }),
  });
  if (!response.ok) throw new Error('Registration failed');
  const data = await response.json();
  localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, data.token);
  if (data.refreshToken) localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, data.refreshToken);
  return data;
}

// ─── OAuth ─────────────────────────────────────────────────────────────
export function loginWithGoogle() {
  window.location.href = `${API_BASE}/google`;
}

export function loginWithGitHub() {
  window.location.href = `${API_BASE}/github`;
}

// ─── Session ───────────────────────────────────────────────────────────
export async function getSession(): Promise<User | null> {
  const token = localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
  if (!token) return null;

  try {
    const response = await fetch(`${API_BASE}/session`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!response.ok) throw new Error('Session expired');
    return response.json();
  } catch {
    localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
    localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
    return null;
  }
}

export async function logout(): Promise<void> {
  const token = localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
  if (token) {
    try {
      await fetch(`${API_BASE}/logout`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
      });
    } catch {
      // Ignore logout errors
    }
  }
  localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
  localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
  localStorage.removeItem(STORAGE_KEYS.USER);
}

export function getToken(): string | null {
  return localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
}
