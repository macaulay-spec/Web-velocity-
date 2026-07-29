// ─── Rating Stars ──────────────────────────────────────────────────────
'use client';

import { useState } from 'react';
import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

interface RatingStarsProps {
  rating: number;
  maxRating?: number;
  size?: 'sm' | 'md' | 'lg';
  interactive?: boolean;
  onRate?: (rating: number) => void;
  showValue?: boolean;
}

export function RatingStars({
  rating,
  maxRating = 10,
  size = 'md',
  interactive = false,
  onRate,
  showValue = true,
}: RatingStarsProps) {
  const [hoverRating, setHoverRating] = useState(0);
  const stars = 5;
  const starRating = (rating / maxRating) * stars;
  const displayRating = hoverRating || starRating;

  const sizes = {
    sm: { star: 'w-3.5 h-3.5', text: 'text-xs' },
    md: { star: 'w-5 h-5', text: 'text-sm' },
    lg: { star: 'w-6 h-6', text: 'text-base' },
  };

  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center">
        {Array.from({ length: stars }).map((_, index) => {
          const filled = index < Math.floor(displayRating);
          const partial = !filled && index < displayRating;
          const percentage = partial ? (displayRating - index) * 100 : 0;

          return (
            <button
              key={index}
              type="button"
              disabled={!interactive}
              onMouseEnter={() => interactive && setHoverRating(index + 1)}
              onMouseLeave={() => interactive && setHoverRating(0)}
              onClick={() => interactive && onRate?.((index + 1) * (maxRating / stars))}
              className={cn(
                'relative transition-transform',
                interactive && 'cursor-pointer hover:scale-110'
              )}
            >
              <Star
                className={cn(
                  sizes[size].star,
                  'transition-colors',
                  filled ? 'text-jagflix-500 fill-jagflix-500' : 'text-zinc-700'
                )}
              />
              {partial && (
                <div
                  className="absolute inset-0 overflow-hidden"
                  style={{ width: `${percentage}%` }}
                >
                  <Star className={cn(sizes[size].star, 'text-jagflix-500 fill-jagflix-500')} />
                </div>
              )}
            </button>
          );
        })}
      </div>
      {showValue && (
        <span className={cn(sizes[size].text, 'text-zinc-400 font-medium')}>
          {rating.toFixed(1)}
        </span>
      )}
    </div>
  );
}
