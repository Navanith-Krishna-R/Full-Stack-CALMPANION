'use client';

import React, { useState } from 'react';
import { BookOpen, Calendar, User, ArrowRight } from 'lucide-react';
import { format } from 'date-fns';
import Header from '@/components/header';
import Footer from '@/components/footer';

// Static blog data
const BLOG_POSTS = [
  {
    id: '1',
    title: 'Understanding Anxiety: A Comprehensive Guide',
    content: 'Anxiety is a natural response to stress, but when it becomes overwhelming, it can affect our daily lives...',
    category: 'Mental Health Tips',
    created_at: '2024-03-20T10:00:00Z',
    author: 'Dr. Sarah Johnson'
  },
  {
    id: '2',
    title: 'My Journey to Mental Wellness',
    content: 'Three years ago, I found myself at a crossroads. The pressure of work, relationships, and personal expectations had taken its toll...',
    category: 'Personal Stories',
    created_at: '2024-03-19T15:30:00Z',
    author: 'Michael Chen'
  },
  {
    id: '3',
    title: 'The Science Behind Meditation',
    content: 'Recent studies have shown that regular meditation practice can have significant positive effects on mental health...',
    category: 'Research & News',
    created_at: '2024-03-18T09:15:00Z',
    author: 'Dr. Emily Martinez'
  }
];

const categories = [
  'Mental Health Tips',
  'Personal Stories',
  'Professional Advice',
  'Wellness Practices',
  'Research & News'
];

export default function Blogs() {
  const [selectedCategory, setSelectedCategory] = useState<string>('');

  const filteredBlogs = selectedCategory
    ? BLOG_POSTS.filter(blog => blog.category === selectedCategory)
    : BLOG_POSTS;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="pt-32 pb-16 px-4 bg-gradient-to-b from-orange-50 to-white dark:from-orange-950 dark:to-background">
          <div className="max-w-7xl mx-auto text-center">
            <BookOpen className="w-16 h-16 text-orange-500 mx-auto mb-6" />
            <h1 className="text-5xl font-bold mb-6">
              Mental Health Blog
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Explore insights, stories, and expert advice from our community of mental health professionals and advocates.
            </p>
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
                    ? 'bg-orange-500 text-white' 
                    : 'bg-muted hover:bg-orange-100 dark:hover:bg-orange-900'
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
                      ? 'bg-orange-500 text-white' 
                      : 'bg-muted hover:bg-orange-100 dark:hover:bg-orange-900'
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
            {filteredBlogs.length === 0 ? (
              <div className="text-center text-muted-foreground">
                No blog posts found {selectedCategory && `in ${selectedCategory}`}.
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredBlogs.map((blog) => (
                  <article key={blog.id} className="bg-card rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition">
                    <div className="p-6">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                        <span className="bg-orange-100 dark:bg-orange-900 text-orange-500 px-3 py-1 rounded-full">
                          {blog.category}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {format(new Date(blog.created_at), 'MMM d, yyyy')}
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
                            {blog.author}
                          </span>
                        </div>
                        <button className="text-orange-500 hover:text-orange-600 transition flex items-center gap-1">
                          Read More <ArrowRight className="w-4 h-4" />
                        </button>
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