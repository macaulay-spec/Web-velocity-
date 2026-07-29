// ─── Movie Details Page ────────────────────────────────────────────────
'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { MainLayout } from '@/components/layout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { DetailSkeleton } from '@/components/ui/skeleton';
import { CastCarousel } from '@/features/details/cast-carousel';
import { ContentRow } from '@/components/features/content-row';
import { GenreBadges } from '@/components/features/genre-badges';
import { RatingStars } from '@/components/features/rating-stars';
import { getImageUrl, formatRuntime, formatRating, truncate } from '@/lib/utils';
import {
  Play,
  Plus,
  Heart,
  Share2,
  Clock,
  Calendar,
  Star,
  Film,
  ChevronLeft,
} from 'lucide-react';
import type { ItemDetails, Recommendation } from '@/types/api';

export default function MovieDetailsPage() {
  const params = useParams();
  const id = params.id as string;

  const [details, setDetails] = useState<ItemDetails | null>(null);
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    async function loadDetails() {
      try {
        setLoading(true);
        setError(null);

        const [detailsRes, recsRes] = await Promise.all([
          fetch(`/api/item-details?id=${id}`),
          fetch(`/api/recommendations?id=${id}`),
        ]);

        const detailsJson = await detailsRes.json();
        const recsJson = await recsRes.json();

        if (detailsJson.data) setDetails(detailsJson.data);
        if (recsJson.data) setRecommendations(recsJson.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load details');
      } finally {
        setLoading(false);
      }
    }

    loadDetails();
  }, [id]);

  if (loading) {
    return (
      <MainLayout showFooter={false}>
        <DetailSkeleton />
      </MainLayout>
    );
  }

  if (error || !details) {
    return (
      <MainLayout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-white mb-3">Content Not Found</h1>
            <p className="text-zinc-400 mb-6">{error || 'The requested content could not be loaded.'}</p>
            <Link href="/">
              <Button>Go Home</Button>
            </Link>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout showFooter={false}>
      {/* Backdrop */}
      <div className="relative w-full h-[50vh] min-h-[400px]">
        <Image
          src={getImageUrl(details.backdrop)}
          alt={details.title}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-zinc-950/80 to-transparent" />

        {/* Back Button */}
        <div className="absolute top-24 left-4 sm:left-8">
          <Link href="/">
            <Button variant="glass" size="iconSm">
              <ChevronLeft className="w-5 h-5" />
            </Button>
          </Link>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-48 pb-16">
        <div className="flex flex-col md:flex-row gap-6 md:gap-10">
          {/* Poster */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="w-48 md:w-72 shrink-0 mx-auto md:mx-0"
          >
            <div className="relative aspect-[2/3] rounded-2xl overflow-hidden shadow-2xl shadow-black/50">
              <Image
                src={getImageUrl(details.poster)}
                alt={details.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 192px, 288px"
              />
            </div>
          </motion.div>

          {/* Info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex-1 pt-0 md:pt-16"
          >
            {/* Title */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
              {details.title}
            </h1>

            {/* Tagline */}
            {details.tagline && (
              <p className="text-lg text-zinc-400 mt-2 italic">{details.tagline}</p>
            )}

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-3 mt-4">
              {details.year && (
                <Badge variant="outline" size="lg" className="gap-1">
                  <Calendar className="w-4 h-4" />
                  {details.year}
                </Badge>
              )}
              {details.runtime && (
                <Badge variant="outline" size="lg" className="gap-1">
                  <Clock className="w-4 h-4" />
                  {formatRuntime(details.runtime)}
                </Badge>
              )}
              {details.rating && (
                <Badge variant="default" size="lg" className="gap-1">
                  <Star className="w-4 h-4 fill-jagflix-500 text-jagflix-500" />
                  {formatRating(details.rating)}
                </Badge>
              )}
              {details.maturityRating && (
                <Badge variant="secondary" size="lg">
                  {details.maturityRating}
                </Badge>
              )}
            </div>

            {/* Genres */}
            {details.genres && details.genres.length > 0 && (
              <div className="mt-4">
                <GenreBadges genres={details.genres} size="default" />
              </div>
            )}

            {/* Synopsis */}
            {details.synopsis && (
              <p className="mt-6 text-base text-zinc-300 leading-relaxed max-w-3xl">
                {details.synopsis}
              </p>
            )}

            {/* Actions */}
            <div className="flex flex-wrap items-center gap-3 mt-8">
              <Link href={`/watch/${details.id}`}>
                <Button size="xl" leftIcon={<Play className="w-5 h-5 fill-white" />}>
                  Watch Now
                </Button>
              </Link>
              <Button variant="glass" size="xl" leftIcon={<Plus className="w-5 h-5" />}>
                Watchlist
              </Button>
              <Button variant="ghost" size="iconLg">
                <Heart className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="iconLg">
                <Share2 className="w-5 h-5" />
              </Button>
            </div>

            {/* Rating */}
            {details.rating && (
              <div className="mt-6">
                <RatingStars rating={details.rating} size="lg" />
              </div>
            )}

            {/* Details Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 mt-8">
              {details.director && (
                <div>
                  <h4 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">Director</h4>
                  <p className="text-sm text-white mt-1">{details.director}</p>
                </div>
              )}
              {details.language && (
                <div>
                  <h4 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">Language</h4>
                  <p className="text-sm text-white mt-1">{details.language}</p>
                </div>
              )}
              {details.country && (
                <div>
                  <h4 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">Country</h4>
                  <p className="text-sm text-white mt-1">{details.country}</p>
                </div>
              )}
              {details.releaseDate && (
                <div>
                  <h4 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">Release Date</h4>
                  <p className="text-sm text-white mt-1">{details.releaseDate}</p>
                </div>
              )}
              {details.status && (
                <div>
                  <h4 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">Status</h4>
                  <p className="text-sm text-white mt-1">{details.status}</p>
                </div>
              )}
            </div>
          </motion.div>
        </div>

        {/* Cast */}
        {details.cast && details.cast.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-12"
          >
            <CastCarousel cast={details.cast} />
          </motion.div>
        )}

        {/* Recommendations */}
        {recommendations.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12"
          >
            <ContentRow
              title="You May Also Like"
              items={recommendations}
              viewAllHref={`/recommendations?id=${id}`}
            />
          </motion.div>
        )}
      </div>
    </MainLayout>
  );
}
