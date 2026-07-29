'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { getImageUrl, formatRating } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { ChevronLeft, ChevronRight, Play, Star } from 'lucide-react';

export function ContentRow({ title, items, viewAllHref }: { title: string; items: any[]; viewAllHref?: string }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const scroll = (d: 'left' | 'right') => {
    if (!scrollRef.current) return;
    const amt = scrollRef.current.clientWidth * 0.75;
    scrollRef.current.scrollBy({ left: d === 'left' ? -amt : amt, behavior: 'smooth' });
  };

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
  };

  if (!items?.length) return null;

  return (
    <section className="py-6 lg:py-8 group/shelf">
      <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-4 lg:mb-6">
          <h2 className="text-xl lg:text-2xl font-bold text-white">{title}</h2>
        </div>
      </div>
      <div className="relative">
        {canScrollLeft && (
          <button onClick={() => scroll('left')} className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-3 rounded-r-2xl bg-zinc-950/80 backdrop-blur-sm text-white hover:bg-zinc-900 transition-all opacity-0 group-hover/shelf:opacity-100">
            <ChevronLeft className="w-5 h-5" />
          </button>
        )}
        {canScrollRight && (
          <button onClick={() => scroll('right')} className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-3 rounded-l-2xl bg-zinc-950/80 backdrop-blur-sm text-white hover:bg-zinc-900 transition-all opacity-0 group-hover/shelf:opacity-100">
            <ChevronRight className="w-5 h-5" />
          </button>
        )}
        <div ref={scrollRef} onScroll={handleScroll} className="flex gap-3 lg:gap-4 overflow-x-auto scrollbar-hide px-4 sm:px-6 lg:px-8 pb-4"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          {items.map((item: any, i: number) => (
            <MovieCard key={item.id || i} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function MovieCard({ item, index = 0 }: { item: any; index?: number }) {
  const href = item.type === 'movie' ? `/movie/${item.id}` : `/series/${item.id}`;
  const isSeries = item.type === 'series';

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: index * 0.05 }}
      className="w-[160px] sm:w-[180px] md:w-[200px] shrink-0 group">
      <Link href={href} className="block">
        <div className="relative overflow-hidden rounded-xl aspect-[2/3] bg-zinc-900">
          <Image src={getImageUrl(item.poster)} alt={item.title} fill className="object-cover transition-all duration-500 group-hover:scale-110 group-hover:brightness-75" sizes="(max-width: 640px) 160px, (max-width: 768px) 180px, 200px" />
          {item.rating && (
            <div className="absolute top-2 left-2">
              <Badge variant="default" size="sm" className="gap-1">
                <Star className="w-3 h-3 fill-jagflix-500 text-jagflix-500" />
                {formatRating(item.rating)}
              </Badge>
            </div>
          )}
          {isSeries && <div className="absolute top-2 right-2"><Badge variant="secondary" size="sm">Series</Badge></div>}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300">
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <div className="w-full py-2.5 bg-jagflix-500 hover:bg-jagflix-600 text-white text-sm font-medium rounded-lg flex items-center justify-center gap-2 transition-all shadow-lg shadow-jagflix-500/25">
                <Play className="w-4 h-4 fill-white" /> Play
              </div>
            </div>
          </div>
        </div>
        <div className="mt-2.5 px-0.5">
          <h3 className="text-sm font-medium text-white truncate group-hover:text-jagflix-400 transition-colors">{item.title}</h3>
          <div className="flex items-center gap-2 mt-1">
            {item.year && <span className="text-xs text-zinc-500">{item.year}</span>}
            {item.rating && <span className="flex items-center gap-1 text-xs text-zinc-500"><Star className="w-3 h-3 text-jagflix-500" />{formatRating(item.rating)}</span>}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
