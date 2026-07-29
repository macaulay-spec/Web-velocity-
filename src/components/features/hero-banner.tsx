'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { getImageUrl, formatRating, truncate } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Play, Info, Star, ChevronLeft, ChevronRight } from 'lucide-react';

interface HeroBannerItem {
  id: string;
  title: string;
  description?: string;
  image?: string;
  backdrop?: string;
  poster?: string;
  type?: string;
  rating?: number;
  year?: number;
}

export function HeroBanner({ items, autoPlayInterval = 8000 }: { items: HeroBannerItem[]; autoPlayInterval?: number }) {
  const [current, setCurrent] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);

  const next = useCallback(() => setCurrent(p => (p + 1) % items.length), [items.length]);
  const prev = useCallback(() => setCurrent(p => (p - 1 + items.length) % items.length), [items.length]);

  useEffect(() => {
    if (!autoPlay || items.length <= 1) return;
    const t = setInterval(next, autoPlayInterval);
    return () => clearInterval(t);
  }, [autoPlay, next, autoPlayInterval, items.length]);

  if (!items?.length) return null;

  const item = items[current];
  const imgSrc = getImageUrl(item.backdrop || item.image || item.poster);

  return (
    <section className="relative w-full h-[80vh] min-h-[500px] max-h-[900px]">
      <AnimatePresence mode="wait">
        <motion.div key={item.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.7 }} className="absolute inset-0">
          <Image src={imgSrc} alt={item.title} fill className="object-cover" priority sizes="100vw" />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-zinc-950/80 via-zinc-950/20 to-transparent" />
        </motion.div>
      </AnimatePresence>

      <div className="absolute inset-0 flex items-end">
        <div className="max-w-[1920px] mx-auto w-full px-4 sm:px-6 lg:px-8 pb-20 lg:pb-32">
          <AnimatePresence mode="wait">
            <motion.div key={item.id} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -30 }} transition={{ duration: 0.5, delay: 0.2 }} className="max-w-2xl">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-white leading-tight drop-shadow-xl">{item.title}</h1>
              <div className="flex items-center gap-3 mt-4">
                {item.year && <span className="text-sm text-zinc-300 font-medium">{item.year}</span>}
                {item.rating && <Badge variant="default" size="sm" className="gap-1"><Star className="w-3.5 h-3.5 fill-jagflix-500 text-jagflix-500" />{formatRating(item.rating)}</Badge>}
                <Badge variant="outline" size="sm">{item.type === 'movie' ? 'Movie' : 'Series'}</Badge>
              </div>
              {item.description && <p className="mt-4 text-sm sm:text-base text-zinc-300 leading-relaxed line-clamp-3 max-w-xl">{truncate(item.description, 200)}</p>}
              <div className="flex items-center gap-3 mt-6">
                <Link href={item.type === 'movie' ? `/movie/${item.id}` : `/series/${item.id}`}>
                  <Button size="lg" leftIcon={<Play className="w-5 h-5 fill-white" />}>Watch Now</Button>
                </Link>
                <Link href={item.type === 'movie' ? `/movie/${item.id}` : `/series/${item.id}`}>
                  <Button variant="glass" size="lg" leftIcon={<Info className="w-5 h-5" />}>More Info</Button>
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {items.length > 1 && (
        <>
          <button onClick={prev} className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/50 backdrop-blur-sm text-white hover:bg-white/20 transition-all z-10">
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button onClick={next} className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/50 backdrop-blur-sm text-white hover:bg-white/20 transition-all z-10">
            <ChevronRight className="w-6 h-6" />
          </button>
        </>
      )}
      {items.length > 1 && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2">
          {items.map((_, i) => (
            <button key={i} onClick={() => { setCurrent(i); setAutoPlay(false); setTimeout(() => setAutoPlay(true), 10000); }}
              className={cn('rounded-full transition-all duration-300', i === current ? 'w-8 h-2 bg-jagflix-500' : 'w-2 h-2 bg-white/40 hover:bg-white/60')} />
          ))}
        </div>
      )}
    </section>
  );
}
