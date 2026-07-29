// ─── Search Page ───────────────────────────────────────────────────────
'use client';

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { MainLayout } from '@/components/layout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { SearchResultSkeleton } from '@/components/ui/skeleton';
import { getImageUrl, formatRating } from '@/lib/utils';
import { Search, SlidersHorizontal, Star, Film, Tv, X } from 'lucide-react';
import type { SearchResult, SearchFilters } from '@/types/api';

const SORT_OPTIONS = [
  { value: 'newest', label: 'Newest' },
  { value: 'oldest', label: 'Oldest' },
  { value: 'most_popular', label: 'Most Popular' },
  { value: 'highest_rated', label: 'Highest Rated' },
];

const TYPE_OPTIONS = [
  { value: 'all', label: 'All' },
  { value: 'movie', label: 'Movies' },
  { value: 'series', label: 'Series' },
];

export default function SearchPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const queryParam = searchParams.get('q') || '';

  const [query, setQuery] = useState(queryParam);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [filters, setFilters] = useState<SearchFilters>({
    query: queryParam,
    type: 'all',
    sort: 'most_popular',
    page: 1,
  });
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    setQuery(queryParam);
    setFilters((prev) => ({ ...prev, query: queryParam, page: 1 }));
  }, [queryParam]);

  useEffect(() => {
    if (!filters.query) return;

    async function doSearch() {
      setLoading(true);
      try {
        const params = new URLSearchParams();
        params.set('query', filters.query);
        if (filters.type && filters.type !== 'all') params.set('type', filters.type);
        if (filters.sort) params.set('sort', filters.sort);
        if (filters.page) params.set('page', String(filters.page));
        if (filters.genre) params.set('genre', String(filters.genre));
        if (filters.year) params.set('year', String(filters.year));
        if (filters.language) params.set('language', filters.language);

        const response = await fetch(`/api/search?${params.toString()}`);
        const data = await response.json();

        if (filters.page && filters.page > 1) {
          setResults((prev) => [...prev, ...(data.data || [])]);
        } else {
          setResults(data.data || []);
        }
        setHasMore(data.hasMore || false);
      } catch {
        setResults([]);
      } finally {
        setLoading(false);
      }
    }

    doSearch();
  }, [filters]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    router.push(`/search?q=${encodeURIComponent(query)}`);
    setFilters((prev) => ({ ...prev, query, page: 1 }));
  };

  const loadMore = () => {
    setFilters((prev) => ({ ...prev, page: (prev.page || 1) + 1 }));
  };

  return (
    <MainLayout>
      <div className="min-h-screen pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Search Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <form onSubmit={handleSearch} className="relative max-w-2xl">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search movies, series, and more..."
                className="w-full h-14 pl-12 pr-12 bg-zinc-900 border border-zinc-800 rounded-2xl text-white text-lg placeholder:text-zinc-500 focus:outline-none focus:border-jagflix-500 focus:ring-1 focus:ring-jagflix-500 transition-all"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-white/10 transition-colors"
                >
                  <X className="w-5 h-5 text-zinc-400" />
                </button>
              )}
            </form>
          </motion.div>

          {/* Filters Bar */}
          <div className="flex items-center gap-4 mb-6 flex-wrap">
            {TYPE_OPTIONS.map((option) => (
              <button
                key={option.value}
                onClick={() => setFilters((prev) => ({ ...prev, type: option.value as 'all' | 'movie' | 'series', page: 1 }))}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                  filters.type === option.value
                    ? 'bg-jagflix-500 text-white shadow-lg shadow-jagflix-500/25'
                    : 'bg-zinc-900 text-zinc-400 hover:text-white hover:bg-zinc-800 border border-zinc-800'
                }`}
              >
                {option.label}
              </button>
            ))}

            <div className="flex-1" />

            <select
              value={filters.sort}
              onChange={(e) => setFilters((prev) => ({ ...prev, sort: e.target.value as SearchFilters['sort'], page: 1 }))}
              className="bg-zinc-900 border border-zinc-800 text-zinc-300 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-jagflix-500"
            >
              {SORT_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>

            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`p-2.5 rounded-xl border transition-all ${
                showFilters
                  ? 'bg-jagflix-500/10 border-jagflix-500/30 text-jagflix-400'
                  : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white'
              }`}
            >
              <SlidersHorizontal className="w-5 h-5" />
            </button>
          </div>

          {/* Results */}
          <div className="space-y-4">
            {loading && results.length === 0 ? (
              Array.from({ length: 6 }).map((_, i) => (
                <SearchResultSkeleton key={i} />
              ))
            ) : results.length > 0 ? (
              <>
                <p className="text-sm text-zinc-500 mb-4">
                  Found {results.length} results
                  {filters.page && filters.page > 1 ? ' (showing more)' : ''}
                </p>
                <div className="space-y-2">
                  {results.map((result, index) => (
                    <motion.div
                      key={result.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.03 }}
                    >
                      <Link
                        href={result.type === 'movie' ? `/movie/${result.id}` : `/series/${result.id}`}
                        className="flex items-center gap-4 p-4 rounded-xl hover:bg-white/5 transition-all duration-200 group border border-transparent hover:border-zinc-800"
                      >
                        <div className="relative w-20 h-28 rounded-lg overflow-hidden bg-zinc-800 flex-shrink-0">
                          <Image
                            src={getImageUrl(result.poster)}
                            alt={result.title}
                            fill
                            className="object-cover"
                            sizes="80px"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-base font-semibold text-white group-hover:text-jagflix-400 transition-colors">
                            {result.title}
                          </h3>
                          <div className="flex items-center gap-3 mt-2">
                            {result.year && (
                              <span className="text-sm text-zinc-500">{result.year}</span>
                            )}
                            <Badge variant="outline" size="sm">
                              {result.type === 'movie' ? (
                                <><Film className="w-3 h-3 mr-1" />Movie</>
                              ) : (
                                <><Tv className="w-3 h-3 mr-1" />Series</>
                              )}
                            </Badge>
                            {result.rating && (
                              <span className="flex items-center gap-1 text-sm text-zinc-500">
                                <Star className="w-3.5 h-3.5 text-jagflix-500" />
                                {formatRating(result.rating)}
                              </span>
                            )}
                          </div>
                          {result.overview && (
                            <p className="text-sm text-zinc-500 mt-2 line-clamp-2">
                              {result.overview}
                            </p>
                          )}
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </div>

                {hasMore && (
                  <div className="flex justify-center pt-4">
                    <Button
                      variant="outline"
                      onClick={loadMore}
                      loading={loading}
                    >
                      Load More
                    </Button>
                  </div>
                )}
              </>
            ) : filters.query ? (
              <div className="text-center py-20">
                <Search className="w-12 h-12 text-zinc-700 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-zinc-400">No results found</h3>
                <p className="text-sm text-zinc-600 mt-2">
                  Try different keywords or filters
                </p>
              </div>
            ) : (
              <div className="text-center py-20">
                <Search className="w-16 h-16 text-zinc-800 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-zinc-500">
                  Search for your favorite content
                </h3>
                <p className="text-sm text-zinc-700 mt-2">
                  Movies, series, and more await
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
