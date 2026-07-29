// ─── Login Page ────────────────────────────────────────────────────────
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { AppIcon } from '@/components/features/app-icon';
import { ROUTES } from '@/constants';
import { useAuthStore } from '@/store/auth.store';
import { loginWithEmail, loginWithGoogle, loginWithGitHub, createGuestSession } from '@/services/auth.service';
import { Mail, Lock, Globe, Key, LogIn } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const { setUser } = useAuthStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await loginWithEmail(email, password);
      setUser(res.user);
      router.push(ROUTES.HOME);
    } catch {
      setError('Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  const handleGuest = async () => {
    setLoading(true);
    try {
      const res = await createGuestSession();
      setUser(res.user);
      router.push(ROUTES.HOME);
    } catch {
      setError('Failed to create guest session');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center p-4">
      <div className="absolute inset-0 bg-gradient-to-b from-jagflix-500/5 to-transparent pointer-events-none" />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md relative z-10"
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <AppIcon size="lg" />
          </div>
          <h1 className="text-2xl font-bold text-white">Welcome back</h1>
          <p className="text-zinc-400 mt-2">Sign in to continue watching</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            id="email"
            type="email"
            label="Email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Input
            id="password"
            type="password"
            label="Password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {error && (
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-sm text-red-400">
              {error}
            </motion.p>
          )}

          <Button type="submit" className="w-full" size="lg" loading={loading}>
            Sign In
          </Button>
        </form>

        {/* Divider */}
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-zinc-800" />
          </div>
          <div className="relative flex justify-center text-xs">
            <span className="bg-zinc-950 px-4 text-zinc-500">or continue with</span>
          </div>
        </div>

        {/* Social Buttons */}
        <div className="space-y-3">
          <Button variant="outline" className="w-full" size="lg" onClick={loginWithGoogle} leftIcon={<Globe className="w-5 h-5" />}>
            Continue with Google
          </Button>
          <Button variant="outline" className="w-full" size="lg" onClick={loginWithGitHub} leftIcon={<Key className="w-5 h-5" />}>
            Continue with GitHub
          </Button>
          <Button variant="glass" className="w-full" size="lg" onClick={handleGuest} leftIcon={<LogIn className="w-5 h-5" />}>
            Continue as Guest
          </Button>
        </div>

        {/* Footer Links */}
        <div className="text-center mt-6 space-y-2">
          <p className="text-sm text-zinc-500">
            Don&apos;t have an account?{' '}
            <Link href={ROUTES.REGISTER} className="text-jagflix-400 hover:text-jagflix-300 transition-colors font-medium">
              Sign up
            </Link>
          </p>
          <Link href="/forgot-password" className="text-xs text-zinc-600 hover:text-zinc-400 transition-colors">
            Forgot password?
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
