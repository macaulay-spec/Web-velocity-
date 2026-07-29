'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { MainLayout } from '@/components/layout';
import { LoadingSpinner } from '@/components/features/loading-spinner';
import { getImageUrl, formatRating } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Heart, Star } from 'lucide-react';

export default function MyListPage() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/watchlist?userId=demo').then(r => r.json())
      .then(d => setItems(d || []))
      .catch(() => setItems([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <MainLayout>
      <div className="pt-24 pb-16 min-h-screen">
        <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-3xl lg:text-4xl font-bold text-white mb-2">My List</h1>
            <p className="text-zinc-500 mb-8">Your saved movies and series</p>
          </motion.div>

          {loading ? <LoadingSpinner text="Loading..." /> :
           items.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
              {items.map((item: any) => (
                <Link key={item.id} href={item.itemType === 'movie' ? `/movie/${item.itemId}` : `/series/${item.itemId}`} className="group">
                  <div className="relative aspect-[2/3] rounded-xl overflow-hidden bg-zinc-900">
                    <Image src={getImageUrl(item.poster)} alt={item.title} fill className="object-cover transition-all group-hover:scale-110" sizes="200px" />
                    {item.rating && <Badge variant="default" size="sm" className="absolute top-2 left-2"><Star className="w-3 h-3 fill-jagflix-500" />{formatRating(item.rating)}</Badge>}
                  </div>
                  <p className="text-sm text-white mt-2 truncate group-hover:text-jagflix-400">{item.title}</p>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <Heart className="w-16 h-16 text-zinc-800 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-zinc-500">Your list is empty</h3>
              <p className="text-zinc-700 mt-2 mb-6">Add movies and series to your watchlist</p>
              <Link href="/browse" className="inline-flex items-center px-6 py-3 bg-jagflix-500 hover:bg-jagflix-600 text-white rounded-xl transition-colors">Browse Content</Link>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
}
