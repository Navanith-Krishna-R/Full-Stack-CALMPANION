'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Heart, Shield, Users, BookOpen, Stethoscope, Calendar, ClipboardList, PenSquare, Newspaper } from 'lucide-react';
import Header from '@/components/header';
import Footer from '@/components/footer';

// Fallback news data
const FALLBACK_NEWS = [
  {
    title: "New Study Shows Benefits of Mindfulness Meditation",
    description: "Research indicates regular mindfulness practice can significantly reduce stress and anxiety levels. The study, conducted over 12 months, shows promising results for mental health improvement.",
    url: "https://www.who.int/news-room/fact-sheets/detail/mental-health-strengthening-our-response",
    urlToImage: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=1000",
    publishedAt: "2024-03-20T10:00:00Z",
    source: { name: "Health Journal" }
  },
  {
    title: "Mental Health Awareness Month Initiatives Announced",
    description: "Organizations worldwide launch new programs to support mental health awareness and education. These initiatives aim to reduce stigma and improve access to mental health resources.",
    url: "https://www.who.int/news-room/fact-sheets/detail/mental-health-strengthening-our-response",
    urlToImage: "https://images.unsplash.com/photo-1493836512294-502baa1986e2?auto=format&fit=crop&q=80&w=1000",
    publishedAt: "2024-03-19T15:30:00Z",
    source: { name: "Mental Health Today" }
  },
  {
    title: "Workplace Mental Health Programs Show Positive Results",
    description: "Companies implementing mental health support programs report increased productivity and employee satisfaction. Expert recommendations for creating mentally healthy workplaces.",
    url: "https://www.who.int/news-room/fact-sheets/detail/mental-health-strengthening-our-response",
    urlToImage: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=1000",
    publishedAt: "2024-03-18T09:15:00Z",
    source: { name: "Business Health Weekly" }
  }
];

interface NewsArticle {
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  source: {
    name: string;
  };
}

export default function Home() {
  const [news, setNews] = useState<NewsArticle[]>(FALLBACK_NEWS);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const apiKey = process.env.NEXT_PUBLIC_NEWS_API_KEY;
        
        // Only attempt to fetch if API key is available
        if (!apiKey) {
          console.log('News API key not found, using fallback data');
          return;
        }

        const response = await fetch('https://newsapi.org/v2/everything?' + new URLSearchParams({
          q: 'mental health',
          language: 'en',
          sortBy: 'publishedAt',
          pageSize: '3',
          apiKey
        }));
        
        if (!response.ok) throw new Error('News fetch failed');
        
        const data = await response.json();
        if (data.articles?.length > 0) {
          setNews(data.articles);
        }
      } catch (error) {
        console.log('Using fallback news data');
        // We're already using fallback data as initial state
      }
    };

    fetchNews();
  }, []);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="pt-32 pb-16 px-4">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
              Your Personal Mental Health
              <span className="text-orange-500"> Companion</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              Join thousands of people who trust Calmpanion to guide them through their mental health journey with personalized support and expert resources.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                href="/register"
                className="bg-orange-500 px-6 py-3 text-white font-semibold rounded-lg hover:bg-orange-600 transition flex items-center justify-center gap-2"
              >
                Get Started <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/about"
                className="border border-orange-500 px-6 py-3 text-orange-500 font-semibold rounded-lg hover:bg-orange-500 hover:text-white transition"
              >
                Learn More
              </Link>
            </div>
          </div>
        </section>

        {/* Circular Icons Section */}
        <section className="py-16 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-3 gap-12">
              <div className="text-center">
                <div className="w-48 h-48 mx-auto border-2 rounded-full flex items-center justify-center mb-6">
                  <BookOpen className="w-16 h-16 text-orange-500" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Expert Resources</h3>
                <p className="text-muted-foreground">
                  Access a wealth of professionally curated articles, guides, and resources to support your mental wellness journey
                </p>
              </div>
              <div className="text-center">
                <div className="w-48 h-48 mx-auto border-2 rounded-full flex items-center justify-center mb-6">
                  <Stethoscope className="w-16 h-16 text-orange-500" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Professional Care</h3>
                <p className="text-muted-foreground">
                  Connect with licensed therapists and mental health professionals who provide personalized care and support
                </p>
              </div>
              <div className="text-center">
                <div className="w-48 h-48 mx-auto border-2 rounded-full flex items-center justify-center mb-6">
                  <Calendar className="w-16 h-16 text-orange-500" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Easy Scheduling</h3>
                <p className="text-muted-foreground">
                  Book appointments at your convenience with our user-friendly scheduling system and flexible time slots
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Action Cards Section */}
        <section className="py-16 px-4 bg-muted/50">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              <Link href="/survey" className="group">
                <div className="bg-blue-500 rounded-2xl p-8 text-white transition-transform transform hover:scale-105">
                  <div className="flex justify-between items-center">
                    <h3 className="text-2xl font-bold">SURVEY</h3>
                    <ArrowRight className="w-6 h-6 transform group-hover:translate-x-2 transition-transform" />
                  </div>
                  <div className="mt-4">
                    <ClipboardList className="w-12 h-12 opacity-80" />
                  </div>
                </div>
              </Link>
              <Link href="/write-blog" className="group">
                <div className="bg-green-500 rounded-2xl p-8 text-white transition-transform transform hover:scale-105">
                  <div className="flex justify-between items-center">
                    <h3 className="text-2xl font-bold">WRITE BLOG</h3>
                    <ArrowRight className="w-6 h-6 transform group-hover:translate-x-2 transition-transform" />
                  </div>
                  <div className="mt-4">
                    <PenSquare className="w-12 h-12 opacity-80" />
                  </div>
                </div>
              </Link>
              <Link href="/book-appointment" className="group">
                <div className="bg-red-500 rounded-2xl p-8 text-white transition-transform transform hover:scale-105">
                  <div className="flex justify-between items-center">
                    <h3 className="text-2xl font-bold">BOOK APPOINTMENT</h3>
                    <ArrowRight className="w-6 h-6 transform group-hover:translate-x-2 transition-transform" />
                  </div>
                  <div className="mt-4">
                    <Calendar className="w-12 h-12 opacity-80" />
                  </div>
                </div>
              </Link>
              <Link href="/meet-doctors" className="group">
                <div className="bg-yellow-500 rounded-2xl p-8 text-white transition-transform transform hover:scale-105">
                  <div className="flex justify-between items-center">
                    <h3 className="text-2xl font-bold">MEET DOCTORS</h3>
                    <ArrowRight className="w-6 h-6 transform group-hover:translate-x-2 transition-transform" />
                  </div>
                  <div className="mt-4">
                    <Stethoscope className="w-12 h-12 opacity-80" />
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </section>

        {/* Mental Health News Section */}
        <section className="py-16 px-4 bg-gradient-to-b from-orange-50 to-white dark:from-orange-950 dark:to-background">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <Newspaper className="w-16 h-16 text-orange-500 mx-auto mb-6" />
              <h2 className="text-3xl font-bold mb-4">Latest Mental Health News</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Stay informed with the latest developments and research in mental health
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {news.map((article, index) => (
                <article key={index} className="bg-card rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition">
                  {article.urlToImage && (
                    <div className="relative h-48">
                      <img
                        src={article.urlToImage}
                        alt={article.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <div className="text-sm text-orange-500 mb-2">{article.source.name}</div>
                    <h3 className="text-xl font-bold mb-2 line-clamp-2">{article.title}</h3>
                    <p className="text-muted-foreground mb-4 line-clamp-3">{article.description}</p>
                    <a
                      href={article.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-orange-500 hover:text-orange-600 transition flex items-center gap-1"
                    >
                      Read More <ArrowRight className="w-4 h-4" />
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 px-4 bg-muted/50">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-foreground mb-12">
              Why Choose Calmpanion?
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <FeatureCard
                icon={<Heart className="w-8 h-8 text-orange-500" />}
                title="Personalized Support"
                description="Get tailored mental health resources and guidance based on your unique needs and preferences."
              />
              <FeatureCard
                icon={<Shield className="w-8 h-8 text-orange-500" />}
                title="Safe & Confidential"
                description="Your privacy is our priority. All your data is encrypted and protected with the highest security standards."
              />
              <FeatureCard
                icon={<Users className="w-8 h-8 text-orange-500" />}
                title="Community Support"
                description="Connect with others who understand your journey in our moderated, supportive community."
              />
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 px-4">
          <div className="max-w-7xl mx-auto bg-orange-500 rounded-2xl p-8 md:p-12 text-center text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Start Your Journey Today
            </h2>
            <p className="text-lg mb-8 max-w-2xl mx-auto">
              Take the first step towards better mental health. Join Calmpanion and get the support you deserve.
            </p>
            <Link
              href="/register"
              className="bg-white text-orange-500 px-8 py-3 rounded-lg font-semibold hover:bg-orange-50 transition inline-flex items-center gap-2"
            >
              Get Started <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

function FeatureCard({ icon, title, description }: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="bg-background p-6 rounded-xl shadow-sm">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-semibold text-foreground mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
}