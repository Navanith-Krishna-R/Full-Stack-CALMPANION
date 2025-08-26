'use client';

import React from 'react';
import { Shield } from 'lucide-react';
import Header from '@/components/header';
import Footer from '@/components/footer';

export default function CookiePolicy() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="pt-32 pb-16 px-4 bg-gradient-to-b from-orange-50 to-white dark:from-orange-950 dark:to-background">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-6">
              Cookie <span className="text-orange-500">Policy</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              This Cookie Policy explains how Calmpanion uses cookies and similar technologies on our website.
            </p>
          </div>
        </section>

        {/* Policy Details */}
        <section className="py-16 px-4">
          <div className="max-w-5xl mx-auto space-y-8">
            <div className="flex items-start gap-4">
              <Shield className="w-6 h-6 text-orange-500 mt-1" />
              <div>
                <h2 className="text-2xl font-bold mb-2">What Are Cookies?</h2>
                <p className="text-muted-foreground">
                  Cookies are small text files stored on your device when you visit websites. They help us improve your browsing experience and remember your preferences.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Shield className="w-6 h-6 text-orange-500 mt-1" />
              <div>
                <h2 className="text-2xl font-bold mb-2">How We Use Cookies</h2>
                <p className="text-muted-foreground">
                  We use cookies to:
                </p>
                <ul className="list-disc list-inside text-muted-foreground">
                  <li>Remember your login and preferences.</li>
                  <li>Analyze website usage and improve our services.</li>
                  <li>Deliver personalized content and recommendations.</li>
                </ul>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Shield className="w-6 h-6 text-orange-500 mt-1" />
              <div>
                <h2 className="text-2xl font-bold mb-2">Managing Cookies</h2>
                <p className="text-muted-foreground">
                  You can manage or disable cookies via your browser settings. Note that disabling cookies may affect the functionality of our website.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Shield className="w-6 h-6 text-orange-500 mt-1" />
              <div>
                <h2 className="text-2xl font-bold mb-2">Consent</h2>
                <p className="text-muted-foreground">
                  By using our website, you consent to the use of cookies as described in this policy.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
