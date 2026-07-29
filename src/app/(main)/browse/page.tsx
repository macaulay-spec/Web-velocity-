// ─── Browse Page ───────────────────────────────────────────────────────
'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MainLayout } from '@/components/layout';
import { ContentRow } from '@/components/features/content-row';
import { LoadingSpinner } from '@/components/features/loading-spinner';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import type { HomepageItem } from '@/types/api';

export default function BrowsePage() {
  const [movies, setMovies] = useState<HomepageItem[]>([]);
  const [series, setSeries] = useState<HomepageItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        const [hotRes, trendingRes] = await Promise.all([
          fetch('/api/hot-movies-series'),
          fetch('/api/trending'),
        ]);
        const hotJson = await hotRes.json();
        const trendingJson = await trendingRes.json();

        const allItems = [...(hotJson.data || []), ...(trendingJson.data || [])];
        setMovies(allItems.filter((i: HomepageItem) => i.type === 'movie'));
        setSeries(allItems.filter((i: HomepageItem) => i.type === 'series'));
      } catch {
        // Silent fail
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  return (
    <MainLayout>
      <div className="pt-24 pb-16">
        <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h1
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-3xl lg:text-4xl font-bold text-white mb-8"
          >
            Browse Content
          </motion.h1>

          <Tabs defaultValue="all">
            <TabsList>
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="movies">Movies</TabsTrigger>
              <TabsTrigger value="series">Series</TabsTrigger>
            </TabsList>

            <TabsContent value="all">
              {loading ? (
                <LoadingSpinner text="Loading content..." />
              ) : (
                <div className="space-y-8">
                  <ContentRow title="Movies" items={movies.slice(0, 20)} />
                  <ContentRow title="Series" items={series.slice(0, 20)} />
                </div>
              )}
            </TabsContent>

            <TabsContent value="movies">
              {loading ? (
                <LoadingSpinner text="Loading movies..." />
              ) : (
                <ContentRow title="Movies" items={movies} />
              )}
            </TabsContent>

            <TabsContent value="series">
              {loading ? (
                <LoadingSpinner text="Loading series..." />
              ) : (
                <ContentRow title="Series" items={series} />
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </MainLayout>
  );
}
