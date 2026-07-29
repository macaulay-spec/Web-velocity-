// ─── UI Store ──────────────────────────────────────────────────────────
import { create } from 'zustand';

type ModalType = 'search' | 'profile' | 'settings' | 'share' | 'download' | null;

interface UIState {
  // Sidebar / Navigation
  sidebarOpen: boolean;
  mobileNavOpen: boolean;

  // Modal
  activeModal: ModalType;
  modalData: unknown;

  // Search
  searchOpen: boolean;

  // Notifications
  toast: { message: string; type: 'success' | 'error' | 'info' } | null;

  // Scroll
  scrollY: number;

  // Actions
  setSidebarOpen: (open: boolean) => void;
  toggleSidebar: () => void;
  setMobileNavOpen: (open: boolean) => void;
  openModal: (modal: ModalType, data?: unknown) => void;
  closeModal: () => void;
  setSearchOpen: (open: boolean) => void;
  showToast: (message: string, type: 'success' | 'error' | 'info') => void;
  hideToast: () => void;
  setScrollY: (y: number) => void;
}

export const useUIStore = create<UIState>((set) => ({
  sidebarOpen: false,
  mobileNavOpen: false,
  activeModal: null,
  modalData: null,
  searchOpen: false,
  toast: null,
  scrollY: 0,

  setSidebarOpen: (open) => set({ sidebarOpen: open }),
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
  setMobileNavOpen: (open) => set({ mobileNavOpen: open }),

  openModal: (modal, data) =>
    set({ activeModal: modal, modalData: data }),

  closeModal: () =>
    set({ activeModal: null, modalData: null }),

  setSearchOpen: (open) => set({ searchOpen: open }),

  showToast: (message, type) =>
    set({ toast: { message, type } }),

  hideToast: () => set({ toast: null }),

  setScrollY: (y) => set({ scrollY: y }),
}));
