// ─── Loading Spinner ───────────────────────────────────────────────────
'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { AppIcon } from './app-icon';

interface LoadingSpinnerProps {
  fullScreen?: boolean;
  text?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function LoadingSpinner({ fullScreen = false, text, size = 'md' }: LoadingSpinnerProps) {
  const content = (
    <div className="flex flex-col items-center justify-center gap-6">
      <AppIcon size={size} animate showText={false} />
      
      {/* Pulsing dots */}
      <div className="flex items-center gap-2">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="w-2 h-2 rounded-full bg-jagflix-500"
            animate={{
              scale: [0.5, 1, 0.5],
              opacity: [0.3, 1, 0.3],
            }}
            transition={{
              duration: 1.2,
              repeat: Infinity,
              delay: i * 0.2,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      {text && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-sm text-zinc-400 font-medium"
        >
          {text}
        </motion.p>
      )}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-[9999] bg-zinc-950 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          {content}
        </motion.div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center py-20">
      {content}
    </div>
  );
}

// ─── Inline Loading ────────────────────────────────────────────────────
export function InlineLoading({ className }: { className?: string }) {
  return (
    <div className={cn('flex items-center gap-2', className)}>
      <motion.div
        className="w-4 h-4 border-2 border-zinc-700 border-t-jagflix-500 rounded-full"
        animate={{ rotate: 360 }}
        transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
      />
      <span className="text-sm text-zinc-400">Loading...</span>
    </div>
  );
}
