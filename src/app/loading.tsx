// ─── Global Loading ────────────────────────────────────────────────────
import { AppIcon } from '@/components/features/app-icon';

export default function Loading() {
  return (
    <div className="fixed inset-0 z-[9999] bg-zinc-950 flex items-center justify-center">
      <div className="flex flex-col items-center gap-6">
        <AppIcon size="xl" animate showText />
      </div>
    </div>
  );
}
