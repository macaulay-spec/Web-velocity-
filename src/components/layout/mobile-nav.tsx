// ─── Mobile Navigation ─────────────────────────────────────────────────
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useUIStore } from '@/store/ui.store';
import { ROUTES } from '@/constants';
import { Home, Compass, Heart, Flame, Search, X } from 'lucide-react';

export function MobileNav() {
  const pathname = usePathname();
  const { mobileNavOpen, setMobileNavOpen } = useUIStore();

  const mobileLinks = [
    { href: ROUTES.HOME, label: 'Home', icon: Home },
    { href: ROUTES.BROWSE, label: 'Browse', icon: Compass },
    { href: ROUTES.SEARCH, label: 'Search', icon: Search },
    { href: ROUTES.MY_LIST, label: 'My List', icon: Heart },
    { href: ROUTES.FOOTBALL, label: 'Football', icon: Flame },
  ];

  return (
    <AnimatePresence>
      {mobileNavOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMobileNavOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed right-0 top-0 bottom-0 w-80 z-50 bg-zinc-950/95 backdrop-blur-2xl border-l border-zinc-800/50 shadow-2xl lg:hidden"
          >
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between p-6 border-b border-zinc-800/50">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-gradient-to-br from-jagflix-500 to-purple-600 rounded-xl flex items-center justify-center">
                    <span className="text-white font-bold">J</span>
                  </div>
                  <span className="text-xl font-bold text-white">
                    Jag<span className="text-jagflix-500">Flix</span>
                  </span>
                </div>
                <button
                  onClick={() => setMobileNavOpen(false)}
                  className="p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-white/10 transition-all"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <nav className="flex-1 p-4 space-y-1">
                {mobileLinks.map((link) => {
                  const isActive = pathname === link.href;
                  const Icon = link.icon;
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setMobileNavOpen(false)}
                      className={cn(
                        'flex items-center gap-4 px-4 py-3.5 rounded-xl text-base font-medium transition-all duration-200',
                        isActive
                          ? 'text-white bg-jagflix-500/10 border border-jagflix-500/20'
                          : 'text-zinc-400 hover:text-white hover:bg-white/5'
                      )}
                    >
                      <Icon className={cn('w-5 h-5', isActive && 'text-jagflix-500')} />
                      {link.label}
                    </Link>
                  );
                })}
              </nav>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
