// ─── Auth Store ─────────────────────────────────────────────────────────
import { create } from 'zustand';
import type { User, UserProfile } from '@/types/api';

interface AuthState {
  user: User | null;
  profiles: UserProfile[];
  activeProfile: UserProfile | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;

  setUser: (user: User | null) => void;
  setProfiles: (profiles: UserProfile[]) => void;
  setActiveProfile: (profile: UserProfile | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  profiles: [],
  activeProfile: null,
  isAuthenticated: false,
  isLoading: true,
  error: null,

  setUser: (user) =>
    set({ user, isAuthenticated: !!user, isLoading: false }),

  setProfiles: (profiles) =>
    set({ profiles }),

  setActiveProfile: (profile) =>
    set({ activeProfile: profile }),

  setLoading: (isLoading) =>
    set({ isLoading }),

  setError: (error) =>
    set({ error, isLoading: false }),

  logout: () =>
    set({
      user: null,
      profiles: [],
      activeProfile: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
    }),
}));
