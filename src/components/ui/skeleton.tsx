// ─── Skeleton Component ────────────────────────────────────────────────
import { cn } from '@/lib/utils';

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'card' | 'text' | 'circle' | 'hero';
}

function Skeleton({ className, variant = 'default', ...props }: SkeletonProps) {
  const variantClasses = {
    default: 'rounded-xl',
    card: 'rounded-2xl',
    text: 'rounded-lg h-4',
    circle: 'rounded-full',
    hero: 'rounded-3xl',
  };

  return (
    <div
      className={cn(
        'animate-pulse bg-zinc-800/80',
        variantClasses[variant],
        className
      )}
      {...props}
    />
  );
}

// ─── Pre-built skeleton components ─────────────────────────────────────

function MovieCardSkeleton() {
  return (
    <div className="space-y-3">
      <Skeleton variant="card" className="aspect-[2/3] w-full" />
      <div className="space-y-2 px-1">
        <Skeleton variant="text" className="w-3/4" />
        <Skeleton variant="text" className="w-1/2 h-3" />
      </div>
    </div>
  );
}

function HeroSkeleton() {
  return (
    <div className="relative w-full h-[80vh] min-h-[500px]">
      <Skeleton variant="hero" className="w-full h-full" />
      <div className="absolute bottom-20 left-10 space-y-4 w-1/2">
        <Skeleton variant="text" className="w-2/3 h-10" />
        <Skeleton variant="text" className="w-full h-4" />
        <Skeleton variant="text" className="w-3/4 h-4" />
        <div className="flex gap-3 pt-2">
          <Skeleton className="w-32 h-12" />
          <Skeleton className="w-32 h-12" />
        </div>
      </div>
    </div>
  );
}

function DetailSkeleton() {
  return (
    <div className="min-h-screen">
      <Skeleton variant="hero" className="w-full h-[60vh] rounded-none" />
      <div className="max-w-7xl mx-auto px-6 -mt-32 relative z-10">
        <div className="flex gap-8">
          <Skeleton variant="card" className="w-72 aspect-[2/3] shrink-0" />
          <div className="flex-1 space-y-4 pt-8">
            <Skeleton variant="text" className="w-1/2 h-10" />
            <Skeleton variant="text" className="w-1/3 h-5" />
            <div className="space-y-2 pt-4">
              <Skeleton variant="text" className="w-full h-4" />
              <Skeleton variant="text" className="w-full h-4" />
              <Skeleton variant="text" className="w-2/3 h-4" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SearchResultSkeleton() {
  return (
    <div className="flex gap-4 p-4">
      <Skeleton variant="card" className="w-24 aspect-[2/3] shrink-0" />
      <div className="flex-1 space-y-3">
        <Skeleton variant="text" className="w-1/2 h-6" />
        <Skeleton variant="text" className="w-1/3 h-4" />
        <Skeleton variant="text" className="w-full h-3" />
        <Skeleton variant="text" className="w-3/4 h-3" />
      </div>
    </div>
  );
}

function ShelveSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="space-y-4">
      <Skeleton variant="text" className="w-48 h-7" />
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {Array.from({ length: count }).map((_, i) => (
          <MovieCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}

export { Skeleton, MovieCardSkeleton, HeroSkeleton, DetailSkeleton, SearchResultSkeleton, ShelveSkeleton };
