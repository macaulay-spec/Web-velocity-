// ─── Cast Carousel ─────────────────────────────────────────────────────
'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { getImageUrl } from '@/lib/utils';
import type { CastMember } from '@/types/api';

interface CastCarouselProps {
  cast: CastMember[];
}

export function CastCarousel({ cast }: CastCarouselProps) {
  if (!cast?.length) return null;

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-white">Cast</h3>
      <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide" style={{ scrollbarWidth: 'none' }}>
        {cast.map((member, index) => (
          <motion.div
            key={member.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="flex flex-col items-center gap-2 min-w-[100px]"
          >
            <div className="relative w-16 h-16 rounded-full overflow-hidden bg-zinc-800 ring-2 ring-zinc-700 hover:ring-jagflix-500 transition-all duration-200">
              {member.image ? (
                <Image
                  src={getImageUrl(member.image)}
                  alt={member.name}
                  fill
                  className="object-cover"
                  sizes="64px"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-zinc-500 text-lg font-bold">
                  {member.name.charAt(0)}
                </div>
              )}
            </div>
            <div className="text-center">
              <p className="text-xs font-medium text-white truncate max-w-[100px]">
                {member.name}
              </p>
              {member.character && (
                <p className="text-[10px] text-zinc-500 truncate max-w-[100px]">
                  {member.character}
                </p>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
