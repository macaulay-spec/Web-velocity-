// ─── Football Page ─────────────────────────────────────────────────────
'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MainLayout } from '@/components/layout';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { LoadingSpinner } from '@/components/features/loading-spinner';
import { Flame, Tv, Play, Clock, MapPin } from 'lucide-react';
import Link from 'next/link';
import type { FootballMatch } from '@/types/api';

const statusColors: Record<string, string> = {
  live: 'bg-red-500 animate-pulse',
  upcoming: 'bg-jagflix-500',
  finished: 'bg-zinc-600',
  halftime: 'bg-yellow-500 animate-pulse',
};

export default function FootballPage() {
  const [matches, setMatches] = useState<FootballMatch[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        const res = await fetch('/api/football');
        const data = await res.json();
        setMatches(data.data || []);
      } catch {
        setMatches([]);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  return (
    <MainLayout>
      <div className="pt-24 pb-16 min-h-screen">
        <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-4 mb-8"
          >
            <div className="p-3 rounded-2xl bg-gradient-to-br from-green-500/20 to-green-600/10 border border-green-500/20">
              <Flame className="w-6 h-6 text-green-400" />
            </div>
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold text-white">Football</h1>
              <p className="text-zinc-500 mt-1">Live matches and streams</p>
            </div>
          </motion.div>

          {loading ? (
            <LoadingSpinner text="Loading matches..." />
          ) : matches.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {matches.map((match, index) => (
                <motion.div
                  key={match.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-5 hover:bg-zinc-900 transition-all duration-200 group"
                >
                  {/* Status */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${statusColors[match.status] || 'bg-zinc-600'}`} />
                      <span className="text-xs font-medium uppercase text-zinc-400">
                        {match.status}
                        {match.minute && match.status === 'live' && ` • ${match.minute}'`}
                      </span>
                    </div>
                    <span className="text-xs text-zinc-600">{match.league}</span>
                  </div>

                  {/* Teams & Score */}
                  <div className="space-y-3 mb-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-white">{match.homeTeam}</span>
                      {match.homeScore !== undefined && (
                        <span className="text-2xl font-bold text-white">{match.homeScore}</span>
                      )}
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-white">{match.awayTeam}</span>
                      {match.awayScore !== undefined && (
                        <span className="text-2xl font-bold text-white">{match.awayScore}</span>
                      )}
                    </div>
                  </div>

                  {/* Info */}
                  <div className="flex items-center gap-3 text-xs text-zinc-600 mb-4">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {match.time}
                    </span>
                    {match.venue && (
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {match.venue}
                      </span>
                    )}
                  </div>

                  {/* Streams */}
                  {match.streams && match.streams.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {match.streams.map((stream) => (
                        <Link
                          key={stream.id}
                          href={stream.url}
                          target="_blank"
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 rounded-lg text-xs text-zinc-300 transition-colors"
                        >
                          <Play className="w-3 h-3" />
                          {stream.quality}
                        </Link>
                      ))}
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <Flame className="w-16 h-16 text-zinc-800 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-zinc-500">No matches available</h3>
              <p className="text-sm text-zinc-700 mt-2">
                Check back later for live football matches
              </p>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
}
