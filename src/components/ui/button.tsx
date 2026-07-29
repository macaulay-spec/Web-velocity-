// ─── Button Component ──────────────────────────────────────────────────
'use client';

import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-xl text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-jagflix-500 focus-visible:ring-offset-2 focus-visible:ring-offset-black disabled:pointer-events-none disabled:opacity-50 select-none',
  {
    variants: {
      variant: {
        default: 'bg-jagflix-500 text-white hover:bg-jagflix-600 shadow-lg shadow-jagflix-500/25',
        destructive: 'bg-red-600 text-white hover:bg-red-700 shadow-lg shadow-red-600/25',
        outline: 'border border-zinc-700 bg-transparent text-zinc-300 hover:bg-zinc-800 hover:text-white',
        secondary: 'bg-zinc-800 text-white hover:bg-zinc-700',
        ghost: 'text-zinc-400 hover:text-white hover:bg-white/10',
        link: 'text-jagflix-400 underline-offset-4 hover:underline',
        premium: 'bg-gradient-to-r from-jagflix-500 to-purple-600 text-white hover:from-jagflix-600 hover:to-purple-700 shadow-lg shadow-jagflix-500/25',
        glass: 'bg-white/10 backdrop-blur-xl border border-white/10 text-white hover:bg-white/20',
      },
      size: {
        default: 'h-10 px-5 py-2',
        sm: 'h-9 px-3 rounded-lg text-xs',
        lg: 'h-12 px-8 rounded-xl text-base',
        xl: 'h-14 px-10 rounded-2xl text-lg',
        icon: 'h-10 w-10 rounded-xl',
        iconSm: 'h-8 w-8 rounded-lg',
        iconLg: 'h-12 w-12 rounded-xl',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, loading, leftIcon, rightIcon, children, disabled, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';

    return (
      <motion.div
        whileTap={{ scale: 0.97 }}
        className="inline-block"
      >
        <Comp
          className={cn(buttonVariants({ variant, size, className }))}
          ref={ref}
          disabled={disabled || loading}
          {...props}
        >
          {loading ? (
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
          ) : leftIcon ? (
            <span className="mr-2">{leftIcon}</span>
          ) : null}
          {children}
          {rightIcon && !loading && (
            <span className="ml-2">{rightIcon}</span>
          )}
        </Comp>
      </motion.div>
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
