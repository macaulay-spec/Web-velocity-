'use client';

import { useEffect, type ReactNode } from 'react';
import { useAuthStore } from '@/store/auth.store';
import { STORAGE_KEYS } from '@/constants';

export function AuthProvider({ children }: { children: ReactNode }) {
  const { setUser, logout } = useAuthStore();

  useEffect(() => {
    const token = localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
    if (!token) { logout(); return; }
    fetch('/api/auth/session', { headers: { Authorization: `Bearer ${token}` } })
      .then(r => r.json())
      .then(data => { if (data?.id) setUser(data); else logout(); })
      .catch(() => logout());
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return <>{children}</>;
}
