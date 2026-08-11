'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Mail, ArrowLeft } from 'lucide-react';
import Header from '@/components/header';
import Footer from '@/components/footer';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'sent' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setMessage('');
    try {
      const res = await fetch('/api/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      setMessage(data.message);
      setStatus(res.ok ? 'sent' : 'error');
    } catch (err) {
      console.error(err);
      setMessage('Something went wrong. Please try again.');
      setStatus('error');
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-grow flex items-center justify-center px-4 py-32">
        <div className="w-full max-w-md">
          <div className="bg-card p-8 rounded-2xl shadow-lg border border-border">
            <h1 className="text-2xl font-display font-medium mb-2">Forgot your password?</h1>
            <p className="text-sm text-muted-foreground mb-6">
              Enter the email on your account and we&apos;ll send you a link to reset it.
            </p>

            {status === 'sent' ? (
              <div className="text-center py-4">
                <div className="w-12 h-12 mx-auto rounded-full bg-secondary flex items-center justify-center mb-4">
                  <Mail className="w-5 h-5 text-primary" />
                </div>
                <p className="text-sm text-foreground">{message}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="relative">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full px-4 py-3 pl-10 rounded-lg border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={status === 'loading'}
                  />
                  <Mail className="w-5 h-5 text-muted-foreground absolute left-3 top-3.5" />
                </div>

                {status === 'error' && <p className="text-sm text-red-500">{message}</p>}

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full bg-primary text-primary-foreground py-3 rounded-lg font-semibold hover:bg-sage-800 transition disabled:opacity-60"
                >
                  {status === 'loading' ? 'Sending…' : 'Send Reset Link'}
                </button>
              </form>
            )}

            <Link href="/login" className="mt-6 flex items-center justify-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition">
              <ArrowLeft className="w-4 h-4" /> Back to login
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
