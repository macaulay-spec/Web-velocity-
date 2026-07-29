// ─── Badge Component ───────────────────────────────────────────────────
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors',
  {
    variants: {
      variant: {
        default: 'bg-jagflix-500/20 text-jagflix-400 border border-jagflix-500/30',
        secondary: 'bg-zinc-800 text-zinc-300 border border-zinc-700',
        destructive: 'bg-red-500/20 text-red-400 border border-red-500/30',
        success: 'bg-green-500/20 text-green-400 border border-green-500/30',
        warning: 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30',
        outline: 'bg-transparent text-zinc-400 border border-zinc-700',
        premium: 'bg-gradient-to-r from-jagflix-500/20 to-purple-500/20 text-transparent bg-clip-text bg-gradient-to-r from-jagflix-400 to-purple-400 border border-jagflix-500/30',
      },
      size: {
        sm: 'px-2 py-0.5 text-[10px]',
        default: 'px-2.5 py-0.5 text-xs',
        lg: 'px-3 py-1 text-sm',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, size, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant, size }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
