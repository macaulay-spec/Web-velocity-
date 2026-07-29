'use client';

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { MainLayout } from '@/components/layout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { getImageUrl, formatRating } from '@/lib/utils';
import { Search, Star, Film, Tv, X } from 'lucide-react';

const TYPE_OPTIONS = [
  { value: 'all', label: 'All' },
  { value: 'movie', label: 'Movies' },
  { value: 'series', label: 'Series' },
];

export default function SearchPage() {
  const sp = useSearchParams();
  const router = useRouter();
  const qParam = sp.get('q') || '';
  const [query, setQuery] = useState(qParam);
  const [results, setResults] = useState<any[]>([]);
  const [type, setType] = useState('all');
  const [loading, setLoading] = useState(false);

  useEffect(() => { setQuery(qParam); }, [qParam]);

  useEffect(() => {
    if (!query.trim()) { setResults([]); return; }
    setLoading(true);
    fetch(`/api/search?query=${encodeURIComponent(query)}&type=${type !== 'all' ? type : ''}`)
      .then(r => r.json())
      .then(d => { setResults(d?.data || []); })
      .catch(() => setResults([]))
      .finally(() => setLoading(false));
  }, [query, type]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    router.push(`/search?q=${encodeURIComponent(query)}`);
  };

  return (
    <MainLayout>
      <div className="min-h-screen pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <form onSubmit={handleSubmit} className="relative max-w-2xl mb-6">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
            <input type="text" value={query} onChange={(e) => setQuery(e.target.value)}
              placeholder="Search movies and series..."
              className="w-full h-14 pl-12 pr-12 bg-zinc-900 border border-zinc-800 rounded-2xl text-white text-lg placeholder:text-zinc-500 focus:outline-none focus:border-jagflix-500 focus:ring-1 focus:ring-jagflix-500 transition-all"
            />
            {query && (
              <button type="button" onClick={() => setQuery('')} className="absolute right-4 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-white/10">
                <X className="w-5 h-5 text-zinc-400" />
              </button>
            )}
          </form>

          <div className="flex items-center gap-3 mb-6">
            {TYPE_OPTIONS.map(o => (
              <button key={o.value} onClick={() => setType(o.value)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${type === o.value ? 'bg-jagflix-500 text-white' : 'bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800'}`}>
                {o.label}
              </button>
            ))}
          </div>

          {loading ? (
            <div className="space-y-3">
              {[1,2,3,4].map(i => (
                <div key={i} className="flex gap-4 p-4 animate-pulse">
                  <div className="w-20 h-28 rounded-lg bg-zinc-800 shrink-0" />
                  <div className="flex-1 space-y-3">
                    <div className="h-5 bg-zinc-800 rounded w-1/2" />
                    <div className="h-3 bg-zinc-800 rounded w-1/3" />
                    <div className="h-3 bg-zinc-800 rounded w-2/3" />
                  </div>
                </div>
              ))}
            </div>
          ) : results.length > 0 ? (
            <div className="space-y-2">
              <p className="text-sm text-zinc-500 mb-4">{results.length} results</p>
              {results.map((r: any) => (
                <Link key={r.id} href={r.type === 'movie' ? `/movie/${r.id}` : `/series/${r.id}`}
                  className="flex items-center gap-4 p-4 rounded-xl hover:bg-white/5 transition-all border border-transparent hover:border-zinc-800 group">
                  <div className="relative w-20 h-28 rounded-lg overflow-hidden bg-zinc-800 shrink-0">
                    <Image src={getImageUrl(r.poster)} alt={r.title} fill className="object-cover" sizes="80px" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base font-semibold text-white group-hover:text-jagflix-400 transition-colors">{r.title}</h3>
                    <div className="flex items-center gap-3 mt-2">
                      {r.year && <span className="text-sm text-zinc-500">{r.year}</span>}
                      <Badge variant="outline" size="sm">
                        {r.type === 'movie' ? <><Film className="w-3 h-3 mr-1" />Movie</> : <><Tv className="w-3 h-3 mr-1" />Series</>}
                      </Badge>
                      {r.rating && <span className="flex items-center gap-1 text-sm text-zinc-500"><Star className="w-3.5 h-3.5 text-jagflix-500" />{formatRating(r.rating)}</span>}
                    </div>
                    {r.overview && <p className="text-sm text-zinc-500 mt-2 line-clamp-2">{r.overview}</p>}
                  </div>
                </Link>
              ))}
            </div>
          ) : query ? (
            <div className="text-center py-20">
              <Search className="w-16 h-16 text-zinc-800 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-zinc-400">No results found</h3>
            </div>
          ) : (
            <div className="text-center py-20">
              <Search className="w-16 h-16 text-zinc-800 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-zinc-500">Search for your favorite content</h3>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
}
