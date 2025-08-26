'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { ArrowRight, Mail, Lock, User } from 'lucide-react';
import Header from '@/components/header';
import Footer from '@/components/footer';
import { useRouter } from 'next/navigation';

const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type RegisterForm = z.infer<typeof registerSchema>;

export default function Register() {
  const router = useRouter();
  const { register, handleSubmit, formState: { errors } } = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
  });

  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: RegisterForm) => {
    setLoading(true);

    // build payload: only send fields the API expects (omit confirmPassword)
    const payload = {
      name: data.name,
      email: data.email,
      password: data.password,
    };

    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      // parse response safely
      const json = await res.json().catch(() => ({}));

      if (res.ok) {
        // success (201 or 200)
        // optional: show a small message (you can remove alert if you prefer silent redirect)
        // alert('Account created successfully!');
        // redirect to login page
        router.push('/login');
      } else {
        // server returned an error (400/409/500)
        const message = json?.message || json?.error || 'Registration failed';
        alert(message);
      }
    } catch (err) {
      console.error('Register request failed:', err);
      alert('Something went wrong. Check console for details.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-grow flex items-center justify-center px-4 py-20">
        <div className="w-full max-w-md">
          <div className="bg-card p-8 rounded-2xl shadow-lg">
            <h1 className="text-3xl font-bold text-center mb-8">Create Account</h1>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <input
                    {...register('name')}
                    type="text"
                    className="w-full px-4 py-3 rounded-lg border bg-background focus:outline-none focus:ring-2 focus:ring-orange-500 pl-10"
                    placeholder="Enter your full name"
                    disabled={loading}
                  />
                  <User className="w-5 h-5 text-muted-foreground absolute left-3 top-3.5" />
                </div>
                {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>}
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <input
                    {...register('email')}
                    type="email"
                    className="w-full px-4 py-3 rounded-lg border bg-background focus:outline-none focus:ring-2 focus:ring-orange-500 pl-10"
                    placeholder="Enter your email"
                    disabled={loading}
                  />
                  <Mail className="w-5 h-5 text-muted-foreground absolute left-3 top-3.5" />
                </div>
                {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>}
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    {...register('password')}
                    type="password"
                    className="w-full px-4 py-3 rounded-lg border bg-background focus:outline-none focus:ring-2 focus:ring-orange-500 pl-10"
                    placeholder="Create a password"
                    disabled={loading}
                  />
                  <Lock className="w-5 h-5 text-muted-foreground absolute left-3 top-3.5" />
                </div>
                {errors.password && <p className="mt-1 text-sm text-red-500">{errors.password.message}</p>}
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-2">
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    {...register('confirmPassword')}
                    type="password"
                    className="w-full px-4 py-3 rounded-lg border bg-background focus:outline-none focus:ring-2 focus:ring-orange-500 pl-10"
                    placeholder="Confirm your password"
                    disabled={loading}
                  />
                  <Lock className="w-5 h-5 text-muted-foreground absolute left-3 top-3.5" />
                </div>
                {errors.confirmPassword && <p className="mt-1 text-sm text-red-500">{errors.confirmPassword.message}</p>}
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className={`w-full ${loading ? 'bg-orange-300' : 'bg-orange-500 hover:bg-orange-600'} text-white py-3 rounded-lg font-semibold transition flex items-center justify-center gap-2`}
              >
                {loading ? 'Creating...' : 'Create Account'} <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            <p className="mt-6 text-center text-sm text-muted-foreground">
              Already have an account?{' '}
              <Link href="/login" className="text-orange-500 hover:text-orange-600 font-semibold">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
