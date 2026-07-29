// ─── Auth Provider ─────────────────────────────────────────────────────
'use client';

import { useEffect, type ReactNode } from 'react';
import { useAuthStore } from '@/store/auth.store';
import { getSession } from '@/services/auth.service';

export function AuthProvider({ children }: { children: ReactNode }) {
  const { setUser, setError, logout } = useAuthStore();

  useEffect(() => {
    async function init() {
      try {
        const user = await getSession();
        if (user) {
          setUser(user);
        } else {
          logout();
        }
      } catch {
        logout();
      }
    }
    init();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return <>{children}</>;
}
