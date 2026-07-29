'use client';

import { useState, useEffect } from 'react';
import { MainLayout } from '@/components/layout';
import { HeroBanner } from '@/components/features/hero-banner';
import { ContentRow } from '@/components/features/content-row';
import { LoadingSpinner } from '@/components/features/loading-spinner';

export default function HomePage() {
  const [hero, setHero] = useState<unknown[]>([]);
  const [sections, setSections] = useState<unknown[]>([]);
  const [trending, setTrending] = useState<unknown[]>([]);
  const [hot, setHot] = useState<unknown[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const [hRes, tRes, hotRes] = await Promise.all([
          fetch('/api/homepage').then(r => r.json()),
          fetch('/api/trending').then(r => r.json()),
          fetch('/api/hot-movies-series').then(r => r.json()),
        ]);

        if (hRes?.data?.hero) setHero(hRes.data.hero);
        if (hRes?.data?.sections) setSections(hRes.data.sections);
        if (tRes?.data) setTrending(tRes.data);
        if (hotRes?.data) setHot(hotRes.data);
      } catch {
        // Fallback will show whatever loaded
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  return (
    <MainLayout>
      {loading ? (
        <div className="min-h-screen"><LoadingSpinner fullScreen text="Loading JagFlix..." /></div>
      ) : (
        <>
          {hero.length > 0 && <HeroBanner items={hero as any} />}
          <div className="relative z-10 -mt-32 space-y-4 pb-16">
            {sections.map((sec: any) => (
              <ContentRow key={sec.id} title={sec.title} items={sec.items || []} />
            ))}
            {trending.length > 0 && <ContentRow title="Trending Now" items={trending as any} />}
            {hot.length > 0 && <ContentRow title="Popular on JagFlix" items={hot as any} />}
          </div>
        </>
      )}
    </MainLayout>
  );
}
