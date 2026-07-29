// ─── Navbar Component ──────────────────────────────────────────────────
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useUIStore } from '@/store/ui.store';
import { useAuthStore } from '@/store/auth.store';
import { ROUTES } from '@/constants';
import {
  Search,
  Bell,
  Menu,
  User,
  ChevronDown,
  LogOut,
  Settings,
  Heart,
  Clock,
  Flame,
  Film,
  Tv,
  Home,
  Compass,
} from 'lucide-react';

const navLinks = [
  { href: ROUTES.HOME, label: 'Home', icon: Home },
  { href: ROUTES.BROWSE, label: 'Browse', icon: Compass },
  { href: ROUTES.MY_LIST, label: 'My List', icon: Heart },
  { href: ROUTES.FOOTBALL, label: 'Football', icon: Flame },
];

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const { searchOpen, setSearchOpen, setMobileNavOpen } = useUIStore();
  const { user, isAuthenticated } = useAuthStore();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 200, damping: 30 }}
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
        scrolled
          ? 'bg-zinc-950/90 backdrop-blur-xl border-b border-zinc-800/50 shadow-xl shadow-black/10'
          : 'bg-gradient-to-b from-black/80 via-black/40 to-transparent'
      )}
    >
      <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Left Section */}
          <div className="flex items-center gap-8">
            {/* Logo */}
            <Link href={ROUTES.HOME} className="flex items-center gap-2 group">
              <div className="relative w-8 h-8 lg:w-10 lg:h-10">
                <div className="absolute inset-0 bg-gradient-to-br from-jagflix-500 to-purple-600 rounded-xl rotate-45 group-hover:rotate-[135deg] transition-all duration-500" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-white font-bold text-sm lg:text-base">J</span>
                </div>
              </div>
              <span className="text-xl lg:text-2xl font-bold text-white tracking-tight">
                Jag<span className="text-jagflix-500">Flix</span>
              </span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                const Icon = link.icon;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      'relative flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200',
                      isActive
                        ? 'text-white bg-white/10'
                        : 'text-zinc-400 hover:text-white hover:bg-white/5'
                    )}
                  >
                    <Icon className="w-4 h-4" />
                    {link.label}
                    {isActive && (
                      <motion.div
                        layoutId="nav-active"
                        className="absolute bottom-0 left-2 right-2 h-0.5 bg-jagflix-500 rounded-full"
                      />
                    )}
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-2 lg:gap-3">
            {/* Search */}
            <button
              onClick={() => setSearchOpen(true)}
              className="p-2.5 rounded-xl text-zinc-400 hover:text-white hover:bg-white/10 transition-all duration-200"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Notifications */}
            <button className="relative p-2.5 rounded-xl text-zinc-400 hover:text-white hover:bg-white/10 transition-all duration-200">
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-jagflix-500 rounded-full" />
            </button>

            {/* Profile */}
            {isAuthenticated ? (
              <div className="relative group">
                <button className="flex items-center gap-2 p-2 rounded-xl hover:bg-white/10 transition-all duration-200">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-jagflix-500 to-purple-600 flex items-center justify-center">
                    <User className="w-4 h-4 text-white" />
                  </div>
                  <ChevronDown className="w-4 h-4 text-zinc-400 group-hover:rotate-180 transition-transform duration-200 hidden sm:block" />
                </button>

                {/* Dropdown */}
                <div className="absolute right-0 top-full mt-2 w-56 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 translate-y-2 group-hover:translate-y-0">
                  <div className="bg-zinc-900/95 backdrop-blur-xl border border-zinc-800 rounded-xl p-2 shadow-2xl">
                    <Link
                      href={ROUTES.PROFILE}
                      className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-zinc-300 hover:text-white hover:bg-white/5 transition-all"
                    >
                      <User className="w-4 h-4" />
                      Profile
                    </Link>
                    <Link
                      href={ROUTES.MY_LIST}
                      className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-zinc-300 hover:text-white hover:bg-white/5 transition-all"
                    >
                      <Heart className="w-4 h-4" />
                      My List
                    </Link>
                    <Link
                      href="/history"
                      className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-zinc-300 hover:text-white hover:bg-white/5 transition-all"
                    >
                      <Clock className="w-4 h-4" />
                      History
                    </Link>
                    <Link
                      href={ROUTES.SETTINGS}
                      className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-zinc-300 hover:text-white hover:bg-white/5 transition-all"
                    >
                      <Settings className="w-4 h-4" />
                      Settings
                    </Link>
                    <div className="h-px bg-zinc-800 my-1" />
                    <button className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all w-full">
                      <LogOut className="w-4 h-4" />
                      Sign Out
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <Link
                href={ROUTES.LOGIN}
                className="px-5 py-2.5 bg-jagflix-500 hover:bg-jagflix-600 text-white text-sm font-medium rounded-xl transition-all duration-200 shadow-lg shadow-jagflix-500/25"
              >
                Sign In
              </Link>
            )}

            {/* Mobile Menu */}
            <button
              onClick={() => setMobileNavOpen(true)}
              className="lg:hidden p-2.5 rounded-xl text-zinc-400 hover:text-white hover:bg-white/10 transition-all duration-200"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}
