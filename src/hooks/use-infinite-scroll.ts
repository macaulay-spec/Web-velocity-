// ─── useInfiniteScroll Hook ────────────────────────────────────────────
'use client';

import { useCallback, useRef } from 'react';
import { config } from '@/config';

export function useInfiniteScroll(
  onLoadMore: () => void,
  hasMore: boolean,
  isLoading: boolean
) {
  const observer = useRef<IntersectionObserver | null>(null);

  const lastElementRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (isLoading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && hasMore) {
            onLoadMore();
          }
        },
        {
          rootMargin: `${config.pagination.infiniteScrollThreshold}px`,
        }
      );

      if (node) observer.current.observe(node);
    },
    [isLoading, hasMore, onLoadMore]
  );

  return lastElementRef;
}
