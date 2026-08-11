'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { PenSquare, Image as ImageIcon, Link as LinkIcon, ArrowRight, CheckCircle2 } from 'lucide-react';
import Header from '@/components/header';
import Footer from '@/components/footer';
import { useUser } from '@/context/UserContext';

export default function WriteBlog() {
  const { userEmail, loading: userLoading } = useUser();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const categories = [
    'Mental Health Tips',
    'Personal Stories',
    'Professional Advice',
    'Wellness Practices',
    'Research & News'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);

    try {
      const res = await fetch('/api/blogs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, content, category }),
      });
      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setError(data.message || 'Could not publish your post. Please try again.');
        return;
      }

      setSuccess(true);
      setTitle('');
      setContent('');
      setCategory('');
    } catch (err) {
      console.error(err);
      setError('Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (!userLoading && !userEmail) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Header />
        <main className="flex-grow flex items-center justify-center px-4 py-32 text-center">
          <div className="max-w-md">
            <PenSquare className="w-16 h-16 text-primary mx-auto mb-6" />
            <h1 className="text-3xl font-bold mb-4">Log in to write a post</h1>
            <p className="text-muted-foreground mb-8">
              You need an account to share your story with the CALMPANION community.
            </p>
            <Link
              href="/login"
              className="inline-block bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold hover:bg-sage-800 transition"
            >
              Log In
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="pt-32 pb-16 px-4">
          <div className="max-w-7xl mx-auto text-center">
            <PenSquare className="w-16 h-16 text-primary mx-auto mb-6" />
            <h1 className="text-5xl font-bold mb-6">
              Share Your Story
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Your experiences and insights can help others on their mental health journey.
            </p>
          </div>
        </section>

        {/* Blog Editor Section */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-card p-8 rounded-2xl shadow-lg">
              {success ? (
                <div className="text-center py-8">
                  <CheckCircle2 className="w-14 h-14 text-primary mx-auto mb-6" />
                  <h2 className="text-2xl font-bold mb-2">Post published!</h2>
                  <p className="text-muted-foreground mb-8">Your story is now live on the CALMPANION blog.</p>
                  <div className="flex flex-wrap gap-4 justify-center">
                    <Link href="/blogs" className="px-6 py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-sage-800 transition">
                      View Blog
                    </Link>
                    <button
                      onClick={() => setSuccess(false)}
                      className="px-6 py-3 rounded-lg border-2 border-sage-500 text-primary font-semibold hover:bg-sage-50 dark:hover:bg-sage-950 transition"
                    >
                      Write Another
                    </button>
                  </div>
                </div>
              ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Title */}
                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-2">
                    Blog Title
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border bg-background focus:outline-none focus:ring-2 focus:ring-sage-500"
                    placeholder="Enter a compelling title..."
                    required
                  />
                </div>

                {/* Category */}
                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-2">
                    Category
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border bg-background focus:outline-none focus:ring-2 focus:ring-sage-500"
                    required
                  >
                    <option value="">Select a category</option>
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                {/* Editor Toolbar */}
                <div className="flex gap-2 border-t border-b border-border py-3">
                  <button
                    type="button"
                    className="p-2 rounded hover:bg-muted transition"
                    title="Add Image"
                  >
                    <ImageIcon className="w-5 h-5" />
                  </button>
                  <button
                    type="button"
                    className="p-2 rounded hover:bg-muted transition"
                    title="Add Link"
                  >
                    <LinkIcon className="w-5 h-5" />
                  </button>
                </div>

                {/* Content */}
                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-2">
                    Blog Content
                  </label>
                  <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border bg-background focus:outline-none focus:ring-2 focus:ring-sage-500"
                    rows={12}
                    placeholder="Share your thoughts..."
                    required
                  />
                </div>

                {/* Guidelines */}
                <div className="bg-muted/50 p-4 rounded-lg">
                  <h3 className="font-semibold mb-2">Content Guidelines:</h3>
                  <ul className="text-sm text-muted-foreground space-y-2">
                    <li>• Be respectful and supportive in your writing</li>
                    <li>• Avoid sharing personally identifiable information</li>
                    <li>• Include trigger warnings when discussing sensitive topics</li>
                    <li>• Back up claims with credible sources when possible</li>
                  </ul>
                </div>

                {error && <p className="text-sm text-red-500">{error}</p>}

                {/* Submit Button */}
                <div className="flex justify-end gap-4">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="px-6 py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-sage-800 transition flex items-center gap-2 disabled:opacity-60"
                  >
                    {submitting ? 'Publishing…' : 'Publish'} <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </form>
              )}
            </div>
          </div>
        </section>

        {/* Tips Section */}
        <section className="py-16 px-4 bg-muted/50">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Writing Tips</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-card p-6 rounded-xl shadow-sm">
                <h3 className="text-xl font-semibold mb-4">Be Authentic</h3>
                <p className="text-muted-foreground">Share your genuine experiences and emotions. Your authenticity helps others relate to your story.</p>
              </div>
              <div className="bg-card p-6 rounded-xl shadow-sm">
                <h3 className="text-xl font-semibold mb-4">Stay Focused</h3>
                <p className="text-muted-foreground">Keep your writing clear and focused on one main topic. This helps readers better understand your message.</p>
              </div>
              <div className="bg-card p-6 rounded-xl shadow-sm">
                <h3 className="text-xl font-semibold mb-4">Offer Hope</h3>
                <p className="text-muted-foreground">While sharing challenges, include positive insights or lessons learned to inspire and encourage others.</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}