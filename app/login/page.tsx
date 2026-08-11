'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { ArrowRight, Mail, Lock, Eye, EyeOff } from 'lucide-react';
import Header from '@/components/header';
import Footer from '@/components/footer';
import { useRouter } from 'next/navigation';
import { useUser } from '@/context/UserContext';

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

type LoginForm = z.infer<typeof loginSchema>;

export default function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  });

  const [apiError, setApiError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const { refresh } = useUser();

  const onSubmit = async (data: LoginForm) => {
    setApiError('');
    setLoading(true);
    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (!res.ok) {
        setApiError(result.message || 'Login failed');
        setLoading(false);
        return;
      }

      // The server just set an httpOnly session cookie; re-fetch the
      // session so the rest of the app (header, protected pages) sees it.
      await refresh();
      router.push('/');
    } catch (err) {
      console.error(err);
      setApiError('Server error, please try again');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <main className="flex-grow flex items-center justify-center px-4 py-32 bg-organic-gradient">
        <div className="w-full max-w-md">
          <div className="bg-card p-8 rounded-3xl shadow-lg border border-border">
            <h1 className="text-3xl font-display font-medium text-center mb-2">Welcome Back</h1>
            <p className="text-center text-sm text-muted-foreground mb-8">Sign in to continue your journey.</p>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <input
                    {...register('email')}
                    type="email"
                    className="w-full px-4 py-3 rounded-lg border bg-background focus:outline-none focus:ring-2 focus:ring-primary pl-10"
                    placeholder="Enter your email"
                  />
                  <Mail className="w-5 h-5 text-muted-foreground absolute left-3 top-3.5" />
                </div>
                {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    {...register('password')}
                    type={showPassword ? 'text' : 'password'}
                    className="w-full px-4 py-3 rounded-lg border bg-background focus:outline-none focus:ring-2 focus:ring-primary pl-10 pr-10"
                    placeholder="Enter your password"
                  />
                  <Lock className="w-5 h-5 text-muted-foreground absolute left-3 top-3.5" />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute right-3 top-3.5 text-muted-foreground hover:text-foreground"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {errors.password && <p className="mt-1 text-sm text-red-500">{errors.password.message}</p>}
              </div>

              {apiError && <p className="text-red-500 text-sm mt-2">{apiError}</p>}

              <div className="flex items-center justify-end">
                <Link href="/forgot-password" className="text-sm text-primary hover:text-sage-800">
                  Forgot password?
                </Link>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-primary text-primary-foreground py-3 rounded-full font-semibold hover:bg-sage-800 transition flex items-center justify-center gap-2 disabled:opacity-60"
              >
                {loading ? 'Signing in…' : 'Sign In'} <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            <p className="mt-6 text-center text-sm text-muted-foreground">
              Don&apos;t have an account?{' '}
              <Link href="/register" className="text-primary hover:text-sage-800 font-semibold">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
