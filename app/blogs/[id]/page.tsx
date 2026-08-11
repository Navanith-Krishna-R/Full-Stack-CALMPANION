'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Calendar, User, ArrowLeft } from 'lucide-react';
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

export default function BlogPostPage() {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [status, setStatus] = useState<'loading' | 'loaded' | 'not-found' | 'error'>('loading');

  useEffect(() => {
    setStatus('loading');
    fetch(`/api/blogs/${id}`)
      .then(async (res) => {
        if (res.status === 404) {
          setStatus('not-found');
          return;
        }
        if (!res.ok) throw new Error('Failed to load post');
        const data = await res.json();
        setPost(data.post);
        setStatus('loaded');
      })
      .catch((err) => {
        console.error(err);
        setStatus('error');
      });
  }, [id]);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-grow px-4 pt-32 pb-20">
        <div className="max-w-3xl mx-auto">
          <Link href="/blogs" className="inline-flex items-center gap-2 text-primary hover:text-sage-800 mb-8">
            <ArrowLeft className="w-4 h-4" /> Back to Blog
          </Link>

          {status === 'loading' && <div className="h-64 bg-card rounded-2xl animate-pulse" />}

          {(status === 'not-found' || status === 'error') && (
            <div className="text-center py-16 text-muted-foreground">
              {status === 'not-found' ? "This post doesn't exist or hasn't been published." : 'Something went wrong loading this post.'}
            </div>
          )}

          {status === 'loaded' && post && (
            <article className="bg-card rounded-2xl shadow-lg p-8">
              <span className="bg-sage-100 dark:bg-sage-900 text-primary px-3 py-1 rounded-full text-sm">
                {post.category}
              </span>
              <h1 className="text-3xl md:text-4xl font-bold mt-4 mb-4">{post.title}</h1>
              <div className="flex items-center gap-4 text-sm text-muted-foreground mb-8">
                <span className="flex items-center gap-1"><User className="w-4 h-4" /> {post.author?.name ?? 'Anonymous'}</span>
                <span className="flex items-center gap-1"><Calendar className="w-4 h-4" /> {format(new Date(post.createdAt), 'MMMM d, yyyy')}</span>
              </div>
              <div className="prose dark:prose-invert max-w-none whitespace-pre-wrap text-foreground">
                {post.content}
              </div>
            </article>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
