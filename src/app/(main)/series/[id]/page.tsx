'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { MainLayout } from '@/components/layout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { SeasonSelector } from '@/components/features/season-selector';
import { getImageUrl, formatRating } from '@/lib/utils';
import { Play, Plus, Heart, Share2, Calendar, Star, ChevronLeft, Layers } from 'lucide-react';

export default function SeriesDetailsPage() {
  const params = useParams();
  const id = params.id as string;
  const [details, setDetails] = useState<any>(null);
  const [recs, setRecs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    Promise.all([
      fetch(`/api/item-details?id=${id}`).then(r => r.json()),
      fetch(`/api/recommendations?id=${id}`).then(r => r.json()),
    ]).then(([d, r]) => {
      if (d?.data) setDetails(d.data);
      if (r?.data) setRecs(r.data);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, [id]);

  if (!details && loading) return <MainLayout><div className="min-h-screen" /></MainLayout>;
  if (!details) return (
    <MainLayout>
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center"><h1 className="text-2xl font-bold text-white mb-3">Not found</h1><Link href="/"><Button>Go Home</Button></Link></div>
      </div>
    </MainLayout>
  );

  return (
    <MainLayout showFooter={false}>
      <div className="relative w-full h-[50vh] min-h-[400px]">
        <Image src={getImageUrl(details.backdrop)} alt={details.title} fill className="object-cover" priority sizes="100vw" />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-zinc-950/80 to-transparent" />
        <div className="absolute top-24 left-4 sm:left-8">
          <Link href="/"><Button variant="glass" size="iconSm"><ChevronLeft className="w-5 h-5" /></Button></Link>
        </div>
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-48 pb-16">
        <div className="flex flex-col md:flex-row gap-6 md:gap-10">
          <div className="w-48 md:w-72 shrink-0 mx-auto md:mx-0">
            <div className="relative aspect-[2/3] rounded-2xl overflow-hidden shadow-2xl shadow-black/50">
              <Image src={getImageUrl(details.poster)} alt={details.title} fill className="object-cover" sizes="288px" />
            </div>
          </div>
          <div className="flex-1 pt-0 md:pt-16">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">{details.title}</h1>
            {details.tagline && <p className="text-lg text-zinc-400 mt-2 italic">{details.tagline}</p>}
            <div className="flex flex-wrap items-center gap-3 mt-4">
              {details.year && <Badge variant="outline" size="lg" className="gap-1"><Calendar className="w-4 h-4" />{details.year}</Badge>}
              {details.rating && <Badge variant="default" size="lg" className="gap-1"><Star className="w-4 h-4 fill-jagflix-500 text-jagflix-500" />{formatRating(details.rating)}</Badge>}
              {details.seasons?.length > 0 && <Badge variant="secondary" size="lg" className="gap-1"><Layers className="w-4 h-4" />{details.seasons.length} Seasons</Badge>}
            </div>
            {details.genres?.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-4">
                {details.genres.map((g: any) => <Badge key={g.id} variant="secondary">{g.name}</Badge>)}
              </div>
            )}
            {details.synopsis && <p className="mt-6 text-base text-zinc-300 leading-relaxed max-w-3xl">{details.synopsis}</p>}
            <div className="flex flex-wrap items-center gap-3 mt-8">
              <Link href={`/watch/${details.id}`}><Button size="xl" leftIcon={<Play className="w-5 h-5 fill-white" />}>Watch Now</Button></Link>
              <Button variant="glass" size="xl" leftIcon={<Plus className="w-5 h-5" />}>Watchlist</Button>
              <Button variant="ghost" size="iconLg"><Heart className="w-5 h-5" /></Button>
              <Button variant="ghost" size="iconLg"><Share2 className="w-5 h-5" /></Button>
            </div>
          </div>
        </div>
        {details.seasons?.length > 0 && (
          <div className="mt-12"><SeasonSelector seasons={details.seasons} /></div>
        )}
        {recs.length > 0 && (
          <div className="mt-12">
            <h2 className="text-xl font-bold text-white mb-6">You May Also Like</h2>
            <div className="flex gap-4 overflow-x-auto pb-4">
              {recs.map((item: any) => (
                <Link key={item.id} href={`/series/${item.id}`} className="w-[160px] shrink-0 group">
                  <div className="aspect-[2/3] rounded-xl overflow-hidden bg-zinc-900 relative">
                    <Image src={getImageUrl(item.poster)} alt={item.title} fill className="object-cover transition-all group-hover:scale-110" sizes="160px" />
                  </div>
                  <p className="text-sm text-white mt-2 truncate group-hover:text-jagflix-400">{item.title}</p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
}
