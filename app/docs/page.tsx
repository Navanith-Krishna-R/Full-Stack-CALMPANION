'use client';

import React from 'react';
import Header from '@/components/header';
import Footer from '@/components/footer';
import { BookOpen, FileText, HelpCircle } from 'lucide-react';

export default function Docs() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="pt-32 pb-16 px-4 bg-gradient-to-b from-orange-50 to-white dark:from-orange-950 dark:to-background">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-6">
              Calmpanion <span className="text-orange-500">Docs</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Simple guides, quick tips, and answers to help you make the most of Calmpanion.
            </p>
          </div>
        </section>

        {/* Docs Sections */}
        <section className="py-16 px-4">
          <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
            <div className="bg-card p-6 rounded-xl shadow-sm">
              <BookOpen className="w-12 h-12 text-orange-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Getting Started</h3>
              <p className="text-muted-foreground">
                Create your account and begin your mental wellness journey in minutes.
              </p>
            </div>
            <div className="bg-card p-6 rounded-xl shadow-sm">
              <FileText className="w-12 h-12 text-orange-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Guides</h3>
              <p className="text-muted-foreground">
                Step-by-step walkthroughs to explore features and use tools effectively.
              </p>
            </div>
            <div className="bg-card p-6 rounded-xl shadow-sm">
              <HelpCircle className="w-12 h-12 text-orange-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2">FAQ</h3>
              <p className="text-muted-foreground">
                Quick answers to common questions and simple troubleshooting help.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
