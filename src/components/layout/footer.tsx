// ─── Footer Component ──────────────────────────────────────────────────
import Link from 'next/link';
import { APP_NAME, ROUTES } from '@/constants';
import { Film, Tv, Heart, HelpCircle, Shield, Mail } from 'lucide-react';

const footerLinks = {
  Browse: [
    { label: 'Movies', href: '/movies', icon: Film },
    { label: 'Series', href: '/series', icon: Tv },
    { label: 'Trending', href: '/trending', icon: Heart },
    { label: 'Football', href: ROUTES.FOOTBALL, icon: Tv },
  ],
  Support: [
    { label: 'Help Center', href: '/help', icon: HelpCircle },
    { label: 'Privacy', href: '/privacy', icon: Shield },
    { label: 'Contact', href: '/contact', icon: Mail },
  ],
};

export function Footer() {
  return (
    <footer className="border-t border-zinc-800/50 bg-zinc-950/80 backdrop-blur-sm">
      <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-2 lg:col-span-1">
            <Link href={ROUTES.HOME} className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-jagflix-500 to-purple-600 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold">J</span>
              </div>
              <span className="text-xl font-bold text-white">
                Jag<span className="text-jagflix-500">Flix</span>
              </span>
            </Link>
            <p className="text-sm text-zinc-500 leading-relaxed max-w-xs">
              Premium streaming experience. Discover, stream, and enjoy premium content curated just for you.
            </p>
          </div>

          {/* Link Groups */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="text-sm font-semibold text-white mb-4">{title}</h3>
              <ul className="space-y-3">
                {links.map((link) => {
                  const Icon = link.icon;
                  return (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="flex items-center gap-2 text-sm text-zinc-500 hover:text-zinc-300 transition-colors duration-200"
                      >
                        <Icon className="w-3.5 h-3.5" />
                        {link.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}

          {/* Social / App Store */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-4">Get the App</h3>
            <div className="space-y-3">
              <button className="w-full px-4 py-3 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 rounded-xl text-sm text-zinc-300 transition-all duration-200 flex items-center gap-2">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/></svg>
                App Store
              </button>
              <button className="w-full px-4 py-3 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 rounded-xl text-sm text-zinc-300 transition-all duration-200 flex items-center gap-2">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 01-.61-.92V2.734a1 1 0 01.609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.199l2.807 1.626a1 1 0 010 1.732l-2.807 1.626L15.206 12l2.492-2.492zM5.864 2.658L16.8 8.99l-2.302 2.302-8.634-8.634z"/></svg>
                Google Play
              </button>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-zinc-800/50 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-zinc-600">
            &copy; {new Date().getFullYear()} {APP_NAME}. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-xs text-zinc-600">
            <Link href="/privacy" className="hover:text-zinc-400 transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-zinc-400 transition-colors">Terms</Link>
            <Link href="/cookies" className="hover:text-zinc-400 transition-colors">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
