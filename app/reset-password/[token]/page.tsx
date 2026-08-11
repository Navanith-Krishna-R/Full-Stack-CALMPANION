'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Lock } from 'lucide-react';
import Header from '@/components/header';
import Footer from '@/components/footer';

export default function ResetPassword() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const router = useRouter();
  const { token } = useParams<{ token: string }>();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password.length < 8) {
      setStatus('error');
      setMessage('Password must be at least 8 characters.');
      return;
    }
    if (password !== confirmPassword) {
      setStatus('error');
      setMessage("Passwords don't match.");
      return;
    }

    setStatus('loading');
    setMessage('');

    try {
      const res = await fetch(`/api/reset-password/${token}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      const data = await res.json();

      if (res.ok) {
        setStatus('success');
        setMessage(data.message);
        setTimeout(() => router.push('/login'), 2000);
      } else {
        setStatus('error');
        setMessage(data.message || 'This reset link is invalid or has expired.');
      }
    } catch (err) {
      console.error(err);
      setStatus('error');
      setMessage('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-grow flex items-center justify-center px-4 py-32">
        <div className="w-full max-w-md">
          <div className="bg-card p-8 rounded-2xl shadow-lg border border-border">
            <h1 className="text-2xl font-display font-medium mb-6">Reset Password</h1>

            {status === 'success' ? (
              <div className="text-center space-y-4 py-4">
                <p className="text-sm text-foreground">{message}</p>
                <p className="text-sm text-muted-foreground">Redirecting you to login…</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="relative">
                  <input
                    type="password"
                    placeholder="New password"
                    className="w-full px-4 py-3 pl-10 rounded-lg border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength={8}
                    disabled={status === 'loading'}
                  />
                  <Lock className="w-5 h-5 text-muted-foreground absolute left-3 top-3.5" />
                </div>
                <div className="relative">
                  <input
                    type="password"
                    placeholder="Confirm new password"
                    className="w-full px-4 py-3 pl-10 rounded-lg border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    minLength={8}
                    disabled={status === 'loading'}
                  />
                  <Lock className="w-5 h-5 text-muted-foreground absolute left-3 top-3.5" />
                </div>
                {status === 'error' && <p className="text-sm text-red-500">{message}</p>}
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full bg-primary text-primary-foreground py-3 rounded-lg font-semibold hover:bg-sage-800 transition disabled:opacity-60"
                >
                  {status === 'loading' ? 'Updating…' : 'Update Password'}
                </button>
              </form>
            )}

            {status === 'error' && (
              <p className="mt-4 text-center text-sm">
                <Link href="/forgot-password" className="text-primary hover:text-sage-800 font-semibold">
                  Request a new reset link
                </Link>
              </p>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
