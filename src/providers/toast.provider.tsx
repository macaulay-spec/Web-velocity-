// ─── Toast Provider ────────────────────────────────────────────────────
'use client';

import { useEffect, type ReactNode } from 'react';
import { useUIStore } from '@/store/ui.store';
import { X, CheckCircle, AlertCircle, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

function ToastIcon({ type }: { type: 'success' | 'error' | 'info' }) {
  switch (type) {
    case 'success':
      return <CheckCircle className="w-5 h-5 text-green-400" />;
    case 'error':
      return <AlertCircle className="w-5 h-5 text-red-400" />;
    case 'info':
      return <Info className="w-5 h-5 text-blue-400" />;
  }
}

export function ToastProvider({ children }: { children: ReactNode }) {
  const { toast, hideToast } = useUIStore();

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(hideToast, 4000);
      return () => clearTimeout(timer);
    }
  }, [toast, hideToast]);

  return (
    <>
      {children}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 50, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: 20, x: '-50%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className={cn(
              'fixed bottom-6 left-1/2 z-[9999]',
              'flex items-center gap-3 px-5 py-3 rounded-xl',
              'bg-zinc-900/95 backdrop-blur-xl border border-zinc-800',
              'shadow-2xl shadow-black/50'
            )}
          >
            <ToastIcon type={toast.type} />
            <span className="text-sm text-white font-medium">{toast.message}</span>
            <button
              onClick={hideToast}
              className="p-1 rounded-lg hover:bg-white/10 transition-colors"
            >
              <X className="w-4 h-4 text-zinc-400" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
