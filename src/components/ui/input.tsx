// ─── Input Component ───────────────────────────────────────────────────
'use client';

import { forwardRef, type InputHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  label?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, error, label, id, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={id}
            className="block text-sm font-medium text-zinc-300 mb-2"
          >
            {label}
          </label>
        )}
        <input
          type={type}
          id={id}
          className={cn(
            'flex h-12 w-full rounded-xl border bg-zinc-900/50 px-4 py-3 text-sm text-white',
            'placeholder:text-zinc-500',
            'border-zinc-800 focus:border-jagflix-500 focus:ring-1 focus:ring-jagflix-500',
            'transition-all duration-200',
            'file:border-0 file:bg-transparent file:text-sm file:font-medium',
            'disabled:cursor-not-allowed disabled:opacity-50',
            error && 'border-red-500 focus:border-red-500 focus:ring-red-500',
            className
          )}
          ref={ref}
          {...props}
        />
        {error && (
          <p className="mt-1.5 text-xs text-red-400">{error}</p>
        )}
      </div>
    );
  }
);
Input.displayName = 'Input';

export { Input };
