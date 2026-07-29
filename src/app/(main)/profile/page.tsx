// ─── Profile Page ──────────────────────────────────────────────────────
'use client';

import { motion } from 'framer-motion';
import { MainLayout } from '@/components/layout';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { useAuthStore } from '@/store/auth.store';
import { getInitials } from '@/lib/utils';
import { ROUTES } from '@/constants';
import Link from 'next/link';
import {
  User,
  Settings,
  Heart,
  Clock,
  Star,
  LogOut,
  ChevronRight,
  Film,
  Tv,
} from 'lucide-react';

export default function ProfilePage() {
  const { user, logout } = useAuthStore();

  const stats = [
    { label: 'Watchlist', value: '0', icon: Heart },
    { label: 'Movies Watched', value: '0', icon: Film },
    { label: 'Series Watched', value: '0', icon: Tv },
    { label: 'Reviews', value: '0', icon: Star },
  ];

  return (
    <MainLayout>
      <div className="pt-24 pb-16 min-h-screen">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Profile Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col sm:flex-row items-center sm:items-start gap-6 mb-10"
          >
            <Avatar className="w-24 h-24 ring-4 ring-zinc-800">
              <AvatarImage src={user?.image} />
              <AvatarFallback className="text-2xl">
                {user?.name ? getInitials(user.name) : 'U'}
              </AvatarFallback>
            </Avatar>
            <div className="text-center sm:text-left">
              <h1 className="text-2xl lg:text-3xl font-bold text-white">
                {user?.name || 'Guest User'}
              </h1>
              <p className="text-zinc-400 mt-1">{user?.email || 'Guest session'}</p>
              <div className="flex items-center gap-3 mt-4 justify-center sm:justify-start">
                <Link href={ROUTES.SETTINGS}>
                  <Button variant="outline" size="sm" leftIcon={<Settings className="w-4 h-4" />}>
                    Settings
                  </Button>
                </Link>
                <Button
                  variant="ghost"
                  size="sm"
                  leftIcon={<LogOut className="w-4 h-4" />}
                  onClick={logout}
                  className="text-red-400 hover:text-red-300"
                >
                  Sign Out
                </Button>
              </div>
            </div>
          </motion.div>

          {/* Stats Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10"
          >
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <div
                  key={stat.label}
                  className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-5 text-center hover:bg-zinc-900 transition-colors"
                >
                  <Icon className="w-6 h-6 text-jagflix-500 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-white">{stat.value}</p>
                  <p className="text-xs text-zinc-500 mt-1">{stat.label}</p>
                </div>
              );
            })}
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-2"
          >
            {[
              { href: ROUTES.MY_LIST, label: 'My List', icon: Heart, desc: 'Movies and series you saved' },
              { href: '/history', label: 'Watch History', icon: Clock, desc: 'Content you have watched' },
              { href: ROUTES.SETTINGS, label: 'Account Settings', icon: Settings, desc: 'Manage your account' },
            ].map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="flex items-center gap-4 p-4 rounded-xl bg-zinc-900/30 border border-zinc-800/50 hover:bg-zinc-900 hover:border-zinc-700 transition-all duration-200 group"
                >
                  <div className="p-3 rounded-xl bg-zinc-800/50 group-hover:bg-jagflix-500/10 transition-colors">
                    <Icon className="w-5 h-5 text-zinc-400 group-hover:text-jagflix-500 transition-colors" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-medium text-white">{link.label}</h3>
                    <p className="text-xs text-zinc-500">{link.desc}</p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-zinc-600 group-hover:text-zinc-400 transition-colors" />
                </Link>
              );
            })}
          </motion.div>
        </div>
      </div>
    </MainLayout>
  );
}
