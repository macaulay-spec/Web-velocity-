// ─── Register Page ─────────────────────────────────────────────────────
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
import { registerWithEmail, loginWithGoogle, loginWithGitHub } from '@/services/auth.service';

export default function RegisterPage() {
  const router = useRouter();
  const { setUser } = useAuthStore();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await registerWithEmail(email, password, name);
      setUser(res.user);
      router.push(ROUTES.HOME);
    } catch {
      setError('Registration failed. Please try again.');
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
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <AppIcon size="lg" />
          </div>
          <h1 className="text-2xl font-bold text-white">Create Account</h1>
          <p className="text-zinc-400 mt-2">Join JagFlix today</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            id="name"
            label="Full Name"
            placeholder="John Doe"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
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
            placeholder="Create a strong password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={8}
          />

          {error && (
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-sm text-red-400">
              {error}
            </motion.p>
          )}

          <Button type="submit" className="w-full" size="lg" loading={loading}>
            Create Account
          </Button>
        </form>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-zinc-800" />
          </div>
          <div className="relative flex justify-center text-xs">
            <span className="bg-zinc-950 px-4 text-zinc-500">or continue with</span>
          </div>
        </div>

        <div className="space-y-3">
          <Button variant="outline" className="w-full" size="lg" onClick={loginWithGoogle}>
            Continue with Google
          </Button>
          <Button variant="outline" className="w-full" size="lg" onClick={loginWithGitHub}>
            Continue with GitHub
          </Button>
        </div>

        <div className="text-center mt-6">
          <p className="text-sm text-zinc-500">
            Already have an account?{' '}
            <Link href={ROUTES.LOGIN} className="text-jagflix-400 hover:text-jagflix-300 transition-colors font-medium">
              Sign in
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
