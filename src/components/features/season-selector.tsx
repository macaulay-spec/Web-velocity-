'use client';

import { useState } from 'react';
import Image from 'next/image';
import { cn, getImageUrl, formatRuntime } from '@/lib/utils';
import { ChevronDown, Play, Clock } from 'lucide-react';

export function SeasonSelector({ seasons }: { seasons: any[] }) {
  const [activeSeason, setActiveSeason] = useState(0);
  const [expandedEpisode, setExpandedEpisode] = useState<string | null>(null);
  const currentSeason = seasons[activeSeason];

  if (!seasons?.length) return null;

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <h3 className="text-lg font-semibold text-white">Episodes</h3>
        <div className="relative">
          <select value={activeSeason} onChange={(e) => setActiveSeason(Number(e.target.value))}
            className="appearance-none bg-zinc-900 border border-zinc-800 text-white rounded-xl px-4 py-2 pr-10 text-sm focus:outline-none focus:border-jagflix-500">
            {seasons.map((s: any, i: number) => (
              <option key={s.id || i} value={i}>{s.name || `Season ${s.number || i + 1}`}</option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 pointer-events-none" />
        </div>
      </div>

      {currentSeason?.overview && <p className="text-sm text-zinc-400">{currentSeason.overview}</p>}

      <div className="space-y-2">
        {(currentSeason?.episodes || []).map((episode: any, index: number) => (
          <button key={episode.id || index} onClick={() => setExpandedEpisode(expandedEpisode === episode.id ? null : episode.id)}
            className={cn('w-full flex items-start gap-4 p-3 rounded-xl transition-all text-left hover:bg-white/5 border border-transparent',
              expandedEpisode === episode.id && 'bg-white/5 border-zinc-800')}>
            <div className="relative w-32 aspect-video rounded-lg overflow-hidden bg-zinc-800 shrink-0">
              {episode.image && <Image src={getImageUrl(episode.image)} alt={episode.title} fill className="object-cover" sizes="128px" />}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity bg-black/40">
                <Play className="w-8 h-8 text-white fill-white" />
              </div>
            </div>
            <div className="flex-1 min-w-0 text-left">
              <div className="flex items-start justify-between gap-2">
                <h4 className="text-sm font-medium text-white">{episode.number}. {episode.title}</h4>
                {episode.runtime && <span className="flex items-center gap-1 text-xs text-zinc-500 shrink-0"><Clock className="w-3 h-3" />{formatRuntime(episode.runtime)}</span>}
              </div>
              {episode.overview && <p className={cn('text-xs text-zinc-500 mt-1 leading-relaxed', expandedEpisode !== episode.id && 'line-clamp-1')}>{episode.overview}</p>}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
