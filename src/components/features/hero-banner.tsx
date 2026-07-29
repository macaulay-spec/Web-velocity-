// ─── Hero Banner ───────────────────────────────────────────────────────
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
import type { HeroBanner as HeroBannerType } from '@/types/api';

interface HeroBannerProps {
  items: HeroBannerType[];
  autoPlayInterval?: number;
}

export function HeroBanner({ items, autoPlayInterval = 8000 }: HeroBannerProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const current = items[currentIndex];

  const goTo = useCallback((index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  }, []);

  const next = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % items.length);
  }, [items.length]);

  const prev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
  }, [items.length]);

  // Auto-play
  useEffect(() => {
    if (!isAutoPlaying || items.length <= 1) return;
    const interval = setInterval(next, autoPlayInterval);
    return () => clearInterval(interval);
  }, [isAutoPlaying, next, autoPlayInterval, items.length]);

  if (!items.length) return null;

  return (
    <section className="relative w-full h-[80vh] min-h-[500px] max-h-[900px]">
      <AnimatePresence mode="wait">
        <motion.div
          key={current.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7 }}
          className="absolute inset-0"
        >
          {/* Backdrop */}
          <Image
            src={getImageUrl(current.backdrop)}
            alt={current.title}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />

          {/* Gradient Overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-zinc-950/80 via-zinc-950/20 to-transparent" />
        </motion.div>
      </AnimatePresence>

      {/* Content */}
      <div className="absolute inset-0 flex items-end">
        <div className="max-w-[1920px] mx-auto w-full px-4 sm:px-6 lg:px-8 pb-20 lg:pb-32">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="max-w-2xl"
            >
              {/* Title */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-white leading-tight drop-shadow-xl">
                {current.title}
              </h1>

              {/* Meta */}
              <div className="flex items-center gap-3 mt-4">
                {current.year && (
                  <span className="text-sm text-zinc-300 font-medium">{current.year}</span>
                )}
                {current.rating && (
                  <Badge variant="default" size="sm" className="gap-1">
                    <Star className="w-3.5 h-3.5 fill-jagflix-500 text-jagflix-500" />
                    {formatRating(current.rating)}
                  </Badge>
                )}
                <Badge variant="outline" size="sm">
                  {current.type === 'movie' ? 'Movie' : 'Series'}
                </Badge>
              </div>

              {/* Description */}
              {current.description && (
                <p className="mt-4 text-sm sm:text-base text-zinc-300 leading-relaxed line-clamp-3 max-w-xl">
                  {truncate(current.description, 200)}
                </p>
              )}

              {/* Actions */}
              <div className="flex items-center gap-3 mt-6">
                <Link href={current.type === 'movie' ? `/movie/${current.id}` : `/series/${current.id}`}>
                  <Button size="lg" leftIcon={<Play className="w-5 h-5 fill-white" />}>
                    Watch Now
                  </Button>
                </Link>
                <Button variant="glass" size="lg" leftIcon={<Info className="w-5 h-5" />}>
                  More Info
                </Button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Navigation Arrows */}
      {items.length > 1 && (
        <>
          <button
            onClick={prev}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/50 backdrop-blur-sm text-white hover:bg-white/20 transition-all duration-200 opacity-0 hover:opacity-100 group-hover:opacity-100"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={next}
            className="absolute right-4 top=1/2 -translate-y-1/2 p-3 rounded-full bg-black/50 backdrop-blur-sm text-white hover:bg-white/20 transition-all duration-200 opacity-0 hover:opacity-100 group-hover:opacity-100"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </>
      )}

      {/* Dots */}
      {items.length > 1 && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2">
          {items.map((_, index) => (
            <button
              key={index}
              onClick={() => goTo(index)}
              className={cn(
                'rounded-full transition-all duration-300',
                index === currentIndex
                  ? 'w-8 h-2 bg-jagflix-500'
                  : 'w-2 h-2 bg-white/40 hover:bg-white/60'
              )}
            />
          ))}
        </div>
      )}
    </section>
  );
}
