// ─── Error Page ────────────────────────────────────────────────────────
'use client';

import { Button } from '@/components/ui/button';
import { AppIcon } from '@/components/features/app-icon';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-4">
      <div className="text-center max-w-md">
        <AppIcon size="lg" />
        <h1 className="text-2xl font-bold text-white mt-6 mb-2">Something went wrong</h1>
        <p className="text-zinc-400 mb-2">
          An unexpected error occurred. Please try again.
        </p>
        <p className="text-xs text-zinc-700 mb-8">
          {error.message || 'Unknown error'}
        </p>
        <div className="flex items-center justify-center gap-3">
          <Button onClick={reset}>Try Again</Button>
          <Button variant="outline" onClick={() => (window.location.href = '/')}>
            Go Home
          </Button>
        </div>
      </div>
    </div>
  );
}
