// ─── Genre Badges ──────────────────────────────────────────────────────
import { Badge } from '@/components/ui/badge';
import type { Genre } from '@/types/api';
import { GENRE_NAMES } from '@/constants';

interface GenreBadgesProps {
  genres?: Genre[];
  genreIds?: number[];
  limit?: number;
  size?: 'sm' | 'default' | 'lg';
}

export function GenreBadges({ genres, genreIds, limit = 4, size = 'default' }: GenreBadgesProps) {
  const resolvedGenres = genres?.length
    ? genres
    : genreIds?.map((id) => ({ id, name: GENRE_NAMES[id] || `Genre ${id}` })) || [];

  const displayGenres = resolvedGenres.slice(0, limit);

  return (
    <div className="flex flex-wrap gap-2">
      {displayGenres.map((genre) => (
        <Badge key={genre.id} variant="secondary" size={size}>
          {genre.name}
        </Badge>
      ))}
    </div>
  );
}
