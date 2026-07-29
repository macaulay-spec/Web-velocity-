// ─── JagFlix Homepage ──────────────────────────────────────────────────
'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MainLayout } from '@/components/layout';
import { HeroBanner } from '@/components/features/hero-banner';
import { ContentRow } from '@/components/features/content-row';
import { LoadingSpinner } from '@/components/features/loading-spinner';
import type { HomepageData, TrendingItem, HotContentItem } from '@/types/api';

export default function HomePage() {
  const [homepageData, setHomepageData] = useState<HomepageData | null>(null);
  const [trending, setTrending] = useState<TrendingItem[]>([]);
  const [hotContent, setHotContent] = useState<HotContentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadHomepage() {
      try {
        setLoading(true);
        setError(null);

        const [homepageRes, trendingRes, hotRes] = await Promise.all([
          fetch('/api/homepage'),
          fetch('/api/trending'),
          fetch('/api/hot-movies-series'),
        ]);

        const homepageJson = await homepageRes.json();
        const trendingJson = await trendingRes.json();
        const hotJson = await hotRes.json();

        if (homepageJson.data) setHomepageData(homepageJson.data);
        if (trendingJson.data) setTrending(trendingJson.data);
        if (hotJson.data) setHotContent(hotJson.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load content');
      } finally {
        setLoading(false);
      }
    }

    loadHomepage();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-950">
        <LoadingSpinner fullScreen text="Loading JagFlix..." />
      </div>
    );
  }

  if (error && !homepageData) {
    return (
      <MainLayout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center max-w-md">
            <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-jagflix-500 to-purple-600 rounded-3xl rotate-45 flex items-center justify-center">
              <span className="text-white font-black text-3xl -rotate-45">J</span>
            </div>
            <h1 className="text-2xl font-bold text-white mb-3">Unable to Load Content</h1>
            <p className="text-zinc-400 mb-6">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-jagflix-500 hover:bg-jagflix-600 text-white rounded-xl transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      {/* Hero Banner */}
      {homepageData?.hero && homepageData.hero.length > 0 && (
        <HeroBanner items={homepageData.hero} />
      )}

      {/* Content Sections */}
      <div className="relative z-10 -mt-32 space-y-4 pb-16">
        {/* Continue Watching */}
        {homepageData?.sections?.map((section) => (
          <ContentRow
            key={section.id}
            title={section.title}
            items={section.items || []}
            viewAllHref={section.type === 'genre' ? `/genre/${section.genreId}` : undefined}
          />
        ))}

        {/* Trending */}
        {trending.length > 0 && (
          <ContentRow
            title="Trending Now"
            items={trending}
            viewAllHref="/trending"
          />
        )}

        {/* Hot Content */}
        {hotContent.length > 0 && (
          <ContentRow
            title="Popular on JagFlix"
            items={hotContent}
            viewAllHref="/popular"
          />
        )}
      </div>

      {/* Footer Note */}
      <div className="text-center pb-8">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-xs text-zinc-700"
        >
          Powered by ZST Labs API
        </motion.p>
      </div>
    </MainLayout>
  );
}
