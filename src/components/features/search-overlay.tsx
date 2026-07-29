// ─── Search Overlay ────────────────────────────────────────────────────
'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useUIStore } from '@/store/ui.store';
import { useDebounce, useIntersectionObserver } from '@/hooks';
import { getImageUrl } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, X, TrendingUp, Clock, Star, Film, Tv } from 'lucide-react';
import { ROUTES, STORAGE_KEYS } from '@/constants';

interface SearchResult {
  id: string;
  title: string;
  type: 'movie' | 'series';
  poster: string;
  year?: number;
  rating?: number;
}

export function SearchOverlay() {
  const router = useRouter();
  const { searchOpen, setSearchOpen } = useUIStore();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [popularSearches] = useState<string[]>([
    'Dune', 'Oppenheimer', 'The Batman', 'John Wick', 'Interstellar',
    'Breaking Bad', 'Game of Thrones', 'Stranger Things', 'The Witcher',
  ]);
  const [isSearching, setIsSearching] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const debouncedQuery = useDebounce(query, 400);

  // Load recent searches
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const saved = localStorage.getItem(STORAGE_KEYS.RECENT_SEARCHES);
    if (saved) setRecentSearches(JSON.parse(saved));
  }, []);

  // Focus input on open
  useEffect(() => {
    if (searchOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      setQuery('');
      setResults([]);
    }
  }, [searchOpen]);

  // Search on debounced query change
  useEffect(() => {
    if (!debouncedQuery.trim()) {
      setResults([]);
      return;
    }

    async function doSearch() {
      setIsSearching(true);
      try {
        const response = await fetch(`/api/search?query=${encodeURIComponent(debouncedQuery)}`);
        const data = await response.json();
        setResults(data.data || []);
      } catch {
        setResults([]);
      } finally {
        setIsSearching(false);
      }
    }
    doSearch();
  }, [debouncedQuery]);

  const saveRecentSearch = (searchQuery: string) => {
    if (!searchQuery.trim()) return;
    const updated = [searchQuery, ...recentSearches.filter(s => s !== searchQuery)].slice(0, 10);
    setRecentSearches(updated);
    localStorage.setItem(STORAGE_KEYS.RECENT_SEARCHES, JSON.stringify(updated));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    saveRecentSearch(query);
    setSearchOpen(false);
    router.push(`${ROUTES.SEARCH}?q=${encodeURIComponent(query)}`);
  };

  const handleResultClick = (result: SearchResult) => {
    saveRecentSearch(result.title);
    setSearchOpen(false);
  };

  return (
    <AnimatePresence>
      {searchOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSearchOpen(false)}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100]"
          />

          {/* Search Panel */}
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed top-0 left-0 right-0 z-[101] bg-zinc-950/95 backdrop-blur-2xl border-b border-zinc-800/50 shadow-2xl"
          >
            <div className="max-w-4xl mx-auto px-4 py-6">
              {/* Search Input */}
              <form onSubmit={handleSubmit} className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
                <input
                  ref={inputRef}
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

              {/* Content Area */}
              <div className="mt-6 max-h-[60vh] overflow-y-auto">
                {/* Search Results */}
                {query && (
                  <div className="space-y-2">
                    {isSearching ? (
                      <div className="flex items-center gap-3 py-8 justify-center">
                        <div className="w-5 h-5 border-2 border-zinc-700 border-t-jagflix-500 rounded-full animate-spin" />
                        <span className="text-sm text-zinc-400">Searching...</span>
                      </div>
                    ) : results.length > 0 ? (
                      results.map((result) => (
                        <Link
                          key={result.id}
                          href={result.type === 'movie' ? `/movie/${result.id}` : `/series/${result.id}`}
                          onClick={() => handleResultClick(result)}
                          className="flex items-center gap-4 p-3 rounded-xl hover:bg-white/5 transition-all duration-200 group"
                        >
                          <div className="relative w-12 h-16 rounded-lg overflow-hidden bg-zinc-800 flex-shrink-0">
                            <Image
                              src={getImageUrl(result.poster)}
                              alt={result.title}
                              fill
                              className="object-cover"
                              sizes="48px"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="text-sm font-medium text-white truncate group-hover:text-jagflix-400 transition-colors">
                              {result.title}
                            </h4>
                            <div className="flex items-center gap-2 mt-1">
                              {result.year && (
                                <span className="text-xs text-zinc-500">{result.year}</span>
                              )}
                              <Badge variant="outline" size="sm">
                                {result.type === 'movie' ? <Film className="w-3 h-3 mr-1" /> : <Tv className="w-3 h-3 mr-1" />}
                                {result.type === 'movie' ? 'Movie' : 'Series'}
                              </Badge>
                              {result.rating && (
                                <span className="flex items-center gap-1 text-xs text-zinc-500">
                                  <Star className="w-3 h-3 text-jagflix-500" />
                                  {result.rating.toFixed(1)}
                                </span>
                              )}
                            </div>
                          </div>
                        </Link>
                      ))
                    ) : (
                      <div className="text-center py-8">
                        <p className="text-zinc-500">No results found for &ldquo;{query}&rdquo;</p>
                      </div>
                    )}
                  </div>
                )}

                {/* Recent Searches */}
                {!query && recentSearches.length > 0 && (
                  <div>
                    <h3 className="text-sm font-semibold text-zinc-400 mb-3 flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      Recent Searches
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {recentSearches.map((search) => (
                        <button
                          key={search}
                          onClick={() => setQuery(search)}
                          className="px-4 py-2 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 rounded-xl text-sm text-zinc-300 transition-all"
                        >
                          {search}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Popular Searches */}
                {!query && recentSearches.length === 0 && (
                  <div>
                    <h3 className="text-sm font-semibold text-zinc-400 mb-3 flex items-center gap-2">
                      <TrendingUp className="w-4 h-4" />
                      Popular Searches
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {popularSearches.map((search) => (
                        <button
                          key={search}
                          onClick={() => setQuery(search)}
                          className="px-4 py-2 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 rounded-xl text-sm text-zinc-300 transition-all"
                        >
                          {search}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Close hint */}
              <div className="mt-4 text-center">
                <button
                  onClick={() => setSearchOpen(false)}
                  className="text-xs text-zinc-600 hover:text-zinc-400 transition-colors"
                >
                  Press ESC to close
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
