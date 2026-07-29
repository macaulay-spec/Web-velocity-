// ─── Main Layout ───────────────────────────────────────────────────────
'use client';

import { type ReactNode } from 'react';
import { Navbar } from './navbar';
import { Footer } from './footer';
import { MobileNav } from './mobile-nav';
import { Sidebar } from './sidebar';
import { useUIStore } from '@/store/ui.store';
import { SearchOverlay } from '@/components/features/search-overlay';

interface MainLayoutProps {
  children: ReactNode;
  showFooter?: boolean;
}

export function MainLayout({ children, showFooter = true }: MainLayoutProps) {
  const { sidebarOpen, setSidebarOpen } = useUIStore();

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <Navbar />
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <MobileNav />
      <SearchOverlay />

      <main className="relative">
        {children}
      </main>

      {showFooter && <Footer />}
    </div>
  );
}
