// ─── Offline Page ──────────────────────────────────────────────────────
'use client';

import { WifiOff } from 'lucide-react';
import { AppIcon } from '@/components/features/app-icon';

export default function OfflinePage() {
  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-4">
      <div className="text-center max-w-md">
        <AppIcon size="md" showText />
        <div className="mt-8 mb-6">
          <WifiOff className="w-16 h-16 text-zinc-700 mx-auto" />
        </div>
        <h1 className="text-2xl font-bold text-white mb-2">You&apos;re Offline</h1>
        <p className="text-zinc-400 mb-8">
          Check your internet connection and try again. Some downloaded content may still be available.
        </p>
        <button
          onClick={() => window.location.reload()}
          className="px-6 py-3 bg-jagflix-500 hover:bg-jagflix-600 text-white font-medium rounded-xl transition-all duration-200"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}
