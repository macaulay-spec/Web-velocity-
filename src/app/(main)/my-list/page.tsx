// ─── My List Page ─────────────────────────────────────────────────────
'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MainLayout } from '@/components/layout';
import { MovieCard } from '@/components/features/movie-card';
import { LoadingSpinner } from '@/components/features/loading-spinner';
import { Heart, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import type { WatchlistItem } from '@/types/api';

export default function MyListPage() {
  const [items, setItems] = useState<WatchlistItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        const res = await fetch('/api/watchlist?userId=demo');
        const data = await res.json();
        setItems(data || []);
      } catch {
        setItems([]);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  return (
    <MainLayout>
      <div className="pt-24 pb-16 min-h-screen">
        <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-4 mb-8"
          >
            <Link href="/" className="p-2 rounded-xl hover:bg-white/5 transition-colors">
              <ArrowLeft className="w-5 h-5 text-zinc-400" />
            </Link>
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold text-white">My List</h1>
              <p className="text-zinc-500 mt-1">Your saved movies and series</p>
            </div>
          </motion.div>

          {loading ? (
            <LoadingSpinner text="Loading your list..." />
          ) : items.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
              {items.map((item, index) => (
                <MovieCard
                  key={item.id}
                  item={{
                    id: item.itemId,
                    title: item.title,
                    type: item.itemType,
                    poster: item.poster,
                    backdrop: item.backdrop,
                    rating: item.rating,
                    year: item.year,
                  }}
                  index={index}
                />
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-20"
            >
              <Heart className="w-16 h-16 text-zinc-800 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-zinc-500">Your list is empty</h3>
              <p className="text-zinc-700 mt-2 mb-6">
                Add movies and series to your watchlist
              </p>
              <Link
                href="/browse"
                className="inline-flex items-center px-6 py-3 bg-jagflix-500 hover:bg-jagflix-600 text-white rounded-xl transition-colors"
              >
                Browse Content
              </Link>
            </motion.div>
          )}
        </div>
      </div>
    </MainLayout>
  );
}
