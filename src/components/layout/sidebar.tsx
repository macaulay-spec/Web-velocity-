// ─── Sidebar Component ─────────────────────────────────────────────────
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useUIStore } from '@/store/ui.store';
import { ROUTES } from '@/constants';
import {
  Home,
  Compass,
  Heart,
  Flame,
  Film,
  Tv,
  TrendingUp,
  Star,
  Clock,
  Download,
  Settings,
  HelpCircle,
  X,
} from 'lucide-react';

const sidebarLinks = [
  { section: 'Menu', items: [
    { href: ROUTES.HOME, label: 'Home', icon: Home },
    { href: ROUTES.BROWSE, label: 'Browse', icon: Compass },
    { href: ROUTES.SEARCH, label: 'Search', icon: Compass },
    { href: ROUTES.MY_LIST, label: 'My List', icon: Heart },
  ]},
  { section: 'Discover', items: [
    { href: '/trending', label: 'Trending', icon: TrendingUp },
    { href: '/popular', label: 'Popular', icon: Star },
    { href: '/top-rated', label: 'Top Rated', icon: Star },
    { href: ROUTES.FOOTBALL, label: 'Football', icon: Flame },
  ]},
  { section: 'Library', items: [
    { href: '/movies', label: 'Movies', icon: Film },
    { href: '/series', label: 'Series', icon: Tv },
    { href: '/continue-watching', label: 'Continue Watching', icon: Clock },
    { href: '/downloads', label: 'Downloads', icon: Download },
  ]},
  { section: 'Support', items: [
    { href: ROUTES.SETTINGS, label: 'Settings', icon: Settings },
    { href: '/help', label: 'Help', icon: HelpCircle },
  ]},
];

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
          />

          {/* Sidebar */}
          <motion.aside
            initial={{ x: -320 }}
            animate={{ x: 0 }}
            exit={{ x: -320 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed left-0 top-0 bottom-0 w-72 z-50 bg-zinc-950/95 backdrop-blur-2xl border-r border-zinc-800/50 shadow-2xl"
          >
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-zinc-800/50">
                <Link href={ROUTES.HOME} className="flex items-center gap-2" onClick={onClose}>
                  <div className="w-8 h-8 bg-gradient-to-br from-jagflix-500 to-purple-600 rounded-xl flex items-center justify-center">
                    <span className="text-white font-bold">J</span>
                  </div>
                  <span className="text-xl font-bold text-white">
                    Jag<span className="text-jagflix-500">Flix</span>
                  </span>
                </Link>
                <button
                  onClick={onClose}
                  className="p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-white/10 transition-all"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Navigation */}
              <nav className="flex-1 overflow-y-auto p-4 space-y-6">
                {sidebarLinks.map((section) => (
                  <div key={section.section}>
                    <h3 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider px-3 mb-2">
                      {section.section}
                    </h3>
                    <div className="space-y-1">
                      {section.items.map((item) => {
                        const isActive = pathname === item.href;
                        const Icon = item.icon;
                        return (
                          <Link
                            key={item.href}
                            href={item.href}
                            onClick={onClose}
                            className={cn(
                              'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200',
                              isActive
                                ? 'text-white bg-jagflix-500/10 border border-jagflix-500/20'
                                : 'text-zinc-400 hover:text-white hover:bg-white/5'
                            )}
                          >
                            <Icon className={cn('w-4 h-4', isActive && 'text-jagflix-500')} />
                            {item.label}
                            {isActive && (
                              <motion.div
                                layoutId="sidebar-active"
                                className="ml-auto w-1.5 h-1.5 rounded-full bg-jagflix-500"
                              />
                            )}
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </nav>

              {/* Footer */}
              <div className="p-4 border-t border-zinc-800/50">
                <div className="text-xs text-zinc-600 text-center">
                  &copy; 2026 JagFlix. All rights reserved.
                </div>
              </div>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
