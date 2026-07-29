// ─── Content Row (Shelf) ───────────────────────────────────────────────
'use client';

import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { MovieCard } from './movie-card';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { HomepageItem, TrendingItem } from '@/types/api';

type ContentItem = HomepageItem | TrendingItem;

interface ContentRowProps {
  title: string;
  items: ContentItem[];
  viewAllHref?: string;
  loading?: boolean;
  error?: string;
}

export function ContentRow({ title, items, viewAllHref, loading, error }: ContentRowProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return;
    const scrollAmount = scrollRef.current.clientWidth * 0.75;
    const newScrollLeft = direction === 'left'
      ? scrollRef.current.scrollLeft - scrollAmount
      : scrollRef.current.scrollLeft + scrollAmount;

    scrollRef.current.scrollTo({
      left: newScrollLeft,
      behavior: 'smooth',
    });
  };

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
  };

  if (error) {
    return (
      <section className="py-8">
        <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl lg:text-2xl font-bold text-white mb-6">{title}</h2>
          <div className="text-zinc-500 text-sm">Unable to load content</div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-6 lg:py-8 relative group/shelf">
      <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-4 lg:mb-6">
          <motion.h2
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-xl lg:text-2xl font-bold text-white"
          >
            {title}
          </motion.h2>
          {viewAllHref && (
            <Button variant="ghost" size="sm" className="text-jagflix-400 hover:text-jagflix-300">
              View All
            </Button>
          )}
        </div>
      </div>

      {/* Scroll Container */}
      <div className="relative">
        {/* Left Arrow */}
        {canScrollLeft && (
          <button
            onClick={() => scroll('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-3 rounded-r-2xl bg-zinc-950/80 backdrop-blur-sm text-white hover:bg-zinc-900 transition-all duration-200 opacity-0 group-hover/shelf:opacity-100"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
        )}

        {/* Right Arrow */}
        {canScrollRight && (
          <button
            onClick={() => scroll('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-3 rounded-l-2xl bg-zinc-950/80 backdrop-blur-sm text-white hover:bg-zinc-900 transition-all duration-200 opacity-0 group-hover/shelf:opacity-100"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        )}

        {/* Items */}
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex gap-3 lg:gap-4 overflow-x-auto scrollbar-hide px-4 sm:px-6 lg:px-8 pb-4"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {loading
            ? Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="w-[160px] sm:w-[180px] md:w-[200px] flex-shrink-0">
                  <div className="aspect-[2/3] rounded-xl bg-zinc-800/80 animate-pulse" />
                  <div className="mt-2.5 space-y-2">
                    <div className="h-4 bg-zinc-800/80 rounded animate-pulse w-3/4" />
                    <div className="h-3 bg-zinc-800/80 rounded animate-pulse w-1/2" />
                  </div>
                </div>
              ))
            : items.map((item, index) => (
                <MovieCard
                  key={item.id}
                  item={item}
                  index={index}
                  variant="default"
                />
              ))}
        </div>
      </div>
    </section>
  );
}
