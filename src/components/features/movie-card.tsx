// ─── Movie Card Component ──────────────────────────────────────────────
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { getImageUrl, formatRating } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Play, Heart, Star, Clock } from 'lucide-react';
import type { HomepageItem, TrendingItem, SearchResult, Recommendation } from '@/types/api';

type CardItem = HomepageItem | TrendingItem | SearchResult | Recommendation;

interface MovieCardProps {
  item: CardItem;
  index?: number;
  showIndex?: boolean;
  variant?: 'default' | 'compact' | 'wide' | 'hero';
  progress?: number;
  onPlay?: () => void;
}

export function MovieCard({
  item,
  index = 0,
  showIndex = false,
  variant = 'default',
  progress,
  onPlay,
}: MovieCardProps) {
  const href = item.type === 'movie' ? `/movie/${item.id}` : `/series/${item.id}`;
  const isSeries = item.type === 'series';

  const variants = {
    default: 'w-[160px] sm:w-[180px] md:w-[200px]',
    compact: 'w-[130px] sm:w-[150px]',
    wide: 'w-[240px] sm:w-[280px] md:w-[320px]',
    hero: 'w-full',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className={cn('group relative flex-shrink-0', variants[variant])}
    >
      <Link href={href} className="block">
        <div className="relative overflow-hidden rounded-xl aspect-[2/3] bg-zinc-900">
          {/* Image */}
          <Image
            src={getImageUrl(item.poster)}
            alt={item.title}
            fill
            className="object-cover transition-all duration-500 group-hover:scale-110 group-hover:brightness-75"
            sizes="(max-width: 640px) 160px, (max-width: 768px) 180px, 200px"
          />

          {/* Rating Badge */}
          {item.rating && (
            <div className="absolute top-2 left-2">
              <Badge variant="default" size="sm" className="gap-1">
                <Star className="w-3 h-3 fill-jagflix-500 text-jagflix-500" />
                {formatRating(item.rating)}
              </Badge>
            </div>
          )}

          {/* Type Badge */}
          {isSeries && (
            <div className="absolute top-2 right-2">
              <Badge variant="secondary" size="sm">Series</Badge>
            </div>
          )}

          {/* Index */}
          {showIndex && index !== undefined && (
            <div className="absolute bottom-2 left-2">
              <span className="text-3xl font-black text-white/80 drop-shadow-lg">
                {String(index + 1).padStart(2, '0')}
              </span>
            </div>
          )}

          {/* Hover Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300">
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  onPlay?.();
                }}
                className="w-full py-2.5 bg-jagflix-500 hover:bg-jagflix-600 text-white text-sm font-medium rounded-lg flex items-center justify-center gap-2 transition-all duration-200 shadow-lg shadow-jagflix-500/25"
              >
                <Play className="w-4 h-4 fill-white" />
                Play
              </button>
            </div>
          </div>

          {/* Progress Bar */}
          {progress !== undefined && progress > 0 && (
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-zinc-800">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5 }}
                className="h-full bg-jagflix-500 rounded-r-full"
              />
            </div>
          )}
        </div>

        {/* Info */}
        <div className="mt-2.5 px-0.5">
          <h3 className="text-sm font-medium text-white truncate group-hover:text-jagflix-400 transition-colors duration-200">
            {item.title}
          </h3>
          <div className="flex items-center gap-2 mt-1">
            {item.year && (
              <span className="text-xs text-zinc-500">{item.year}</span>
            )}
            {item.rating && (
              <span className="flex items-center gap-1 text-xs text-zinc-500">
                <Star className="w-3 h-3 text-jagflix-500" />
                {formatRating(item.rating)}
              </span>
            )}
          </div>
        </div>
      </Link>

      {/* Watchlist Button */}
      <button className="absolute top-2 right-2 p-2 rounded-lg bg-black/50 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-200 hover:bg-white/20 z-10">
        <Heart className="w-4 h-4 text-white" />
      </button>
    </motion.div>
  );
}
