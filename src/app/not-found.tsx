// ─── 404 Page ──────────────────────────────────────────────────────────
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-4">
      <div className="text-center max-w-md">
        <div className="w-24 h-24 mx-auto mb-8 bg-gradient-to-br from-jagflix-500 to-purple-600 rounded-3xl rotate-45 flex items-center justify-center">
          <span className="text-white font-black text-4xl -rotate-45">?</span>
        </div>
        <h1 className="text-6xl font-black text-white mb-4">404</h1>
        <h2 className="text-xl font-semibold text-zinc-300 mb-2">Page Not Found</h2>
        <p className="text-zinc-500 mb-8">
          The page you are looking for does not exist or has been moved.
        </p>
        <Link
          href="/"
          className="inline-flex items-center px-6 py-3 bg-jagflix-500 hover:bg-jagflix-600 text-white font-medium rounded-xl transition-all duration-200 shadow-lg shadow-jagflix-500/25"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
}
