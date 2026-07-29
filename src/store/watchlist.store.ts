// ─── Watchlist Store ────────────────────────────────────────────────────
import { create } from 'zustand';
import type { WatchlistItem } from '@/types/api';

interface WatchlistState {
  items: WatchlistItem[];
  isLoading: boolean;
  error: string | null;

  setItems: (items: WatchlistItem[]) => void;
  addItem: (item: WatchlistItem) => void;
  removeItem: (itemId: string) => void;
  isInList: (itemId: string) => boolean;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clear: () => void;
}

export const useWatchlistStore = create<WatchlistState>((set, get) => ({
  items: [],
  isLoading: false,
  error: null,

  setItems: (items) => set({ items, isLoading: false }),
  addItem: (item) => set((state) => ({ items: [item, ...state.items] })),
  removeItem: (itemId) =>
    set((state) => ({ items: state.items.filter((i) => i.itemId !== itemId) })),
  isInList: (itemId) => get().items.some((i) => i.itemId === itemId),
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error, isLoading: false }),
  clear: () => set({ items: [], isLoading: false, error: null }),
}));
