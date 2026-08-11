'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { BookOpen, Calendar, User, ArrowRight, PenSquare } from 'lucide-react';
import { format } from 'date-fns';
import Header from '@/components/header';
import Footer from '@/components/footer';

interface BlogPost {
  id: string;
  title: string;
  content: string;
  category: string;
  createdAt: string;
  author: { name: string };
}

const categories = [
  'Mental Health Tips',
  'Personal Stories',
  'Professional Advice',
  'Wellness Practices',
  'Research & News'
];

export default function Blogs() {
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [status, setStatus] = useState<'loading' | 'loaded' | 'error'>('loading');

  useEffect(() => {
    const controller = new AbortController();

    setStatus('loading');
    const query = selectedCategory ? `?category=${encodeURIComponent(selectedCategory)}` : '';
    fetch(`/api/blogs${query}`, { signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error('Failed to load posts');
        return res.json();
      })
      .then((data) => {
        setPosts(data.posts ?? []);
        setStatus('loaded');
      })
      .catch((err) => {
        if (err.name === 'AbortError') return;
        console.error(err);
        setStatus('error');
      });

    return () => controller.abort();
  }, [selectedCategory]);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="pt-32 pb-16 px-4 bg-gradient-to-b from-sage-50 to-white dark:from-sage-950 dark:to-background">
          <div className="max-w-7xl mx-auto text-center">
            <BookOpen className="w-16 h-16 text-primary mx-auto mb-6" />
            <h1 className="text-5xl font-bold mb-6">
              Mental Health Blog
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              Explore insights, stories, and expert advice from our community of mental health professionals and advocates.
            </p>
            <Link
              href="/write-blog"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold hover:bg-sage-800 transition"
            >
              <PenSquare className="w-4 h-4" /> Share Your Story
            </Link>
          </div>
        </section>

        {/* Category Filter */}
        <section className="py-8 px-4 border-b">
          <div className="max-w-7xl mx-auto">
            <div className="flex gap-4 overflow-x-auto pb-4">
              <button
                onClick={() => setSelectedCategory('')}
                className={`px-4 py-2 rounded-full whitespace-nowrap transition
                  ${!selectedCategory
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted hover:bg-sage-100 dark:hover:bg-sage-900'
                  }`}
              >
                All Posts
              </button>
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full whitespace-nowrap transition
                    ${selectedCategory === category
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted hover:bg-sage-100 dark:hover:bg-sage-900'
                    }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Blog Posts Grid */}
        <section className="py-16 px-4">
          <div className="max-w-7xl mx-auto">
            {status === 'loading' && (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="bg-card rounded-2xl shadow-lg overflow-hidden animate-pulse h-64" />
                ))}
              </div>
            )}

            {status === 'error' && (
              <div className="text-center text-muted-foreground">
                Something went wrong loading posts. Please try again shortly.
              </div>
            )}

            {status === 'loaded' && posts.length === 0 && (
              <div className="text-center text-muted-foreground">
                No blog posts found {selectedCategory && `in ${selectedCategory}`} yet.{' '}
                <Link href="/write-blog" className="text-primary hover:text-sage-800 font-semibold">Be the first to write one.</Link>
              </div>
            )}

            {status === 'loaded' && posts.length > 0 && (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {posts.map((blog) => (
                  <article key={blog.id} className="glow-card bg-card rounded-2xl border border-border overflow-hidden">
                    <div className="p-6">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                        <span className="bg-sage-100 dark:bg-sage-900 text-primary px-3 py-1 rounded-full">
                          {blog.category}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {format(new Date(blog.createdAt), 'MMM d, yyyy')}
                        </span>
                      </div>

                      <h2 className="text-xl font-bold mb-4 line-clamp-2">
                        {blog.title}
                      </h2>

                      <p className="text-muted-foreground mb-6 line-clamp-3">
                        {blog.content}
                      </p>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">
                            {blog.author?.name ?? 'Anonymous'}
                          </span>
                        </div>
                        <Link href={`/blogs/${blog.id}`} className="text-primary hover:text-sage-800 transition flex items-center gap-1">
                          Read More <ArrowRight className="w-4 h-4" />
                        </Link>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
