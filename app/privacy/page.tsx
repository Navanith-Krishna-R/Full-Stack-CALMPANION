'use client';

import React from 'react';
import { Lock, Database, ShieldCheck, Mail, Globe, User } from 'lucide-react';
import Header from '@/components/header';
import Footer from '@/components/footer';

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="pt-32 pb-16 px-4 bg-gradient-to-b from-orange-50 to-white dark:from-orange-950 dark:to-background">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-6">
              Privacy Policy
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              At <span className="text-orange-500">Calmpanion</span>, your privacy is our top priority.  
              This Privacy Policy explains how we collect, use, and safeguard your information.
            </p>
          </div>
        </section>

        {/* Privacy Sections */}
        <section className="py-16 px-4">
          <div className="max-w-5xl mx-auto space-y-12">

            {/* Information Collection */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <Database className="w-7 h-7 text-orange-500" />
                <h2 className="text-2xl font-bold">1. Information We Collect</h2>
              </div>
              <p className="text-muted-foreground mb-4">
                We may collect the following types of information:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li><strong>Personal Information</strong> – name, email address, phone number, account details.</li>
                <li><strong>Usage Data</strong> – interactions with the app, features used, and preferences.</li>
                <li><strong>Health-Related Data</strong> – information you voluntarily provide regarding your well-being.</li>
              </ul>
            </div>

            {/* How We Use Data */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <User className="w-7 h-7 text-orange-500" />
                <h2 className="text-2xl font-bold">2. How We Use Your Data</h2>
              </div>
              <p className="text-muted-foreground mb-4">
                Your data is used to improve your experience and ensure safe use of our services. Specifically:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>Personalize your experience and provide relevant resources.</li>
                <li>Enable secure login and account management.</li>
                <li>Improve app features through analytics and feedback.</li>
                <li>Communicate updates, offers, or important notifications.</li>
              </ul>
            </div>

            {/* Security */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <ShieldCheck className="w-7 h-7 text-orange-500" />
                <h2 className="text-2xl font-bold">3. Security of Your Information</h2>
              </div>
              <p className="text-muted-foreground">
                We use industry-standard encryption, secure servers, and strict protocols to protect your information. 
                While we take all reasonable measures, no method of transmission over the internet is 100% secure.
              </p>
            </div>

            {/* Sharing & Third Parties */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <Globe className="w-7 h-7 text-orange-500" />
                <h2 className="text-2xl font-bold">4. Sharing with Third Parties</h2>
              </div>
              <p className="text-muted-foreground">
                We do not sell or rent your data. Information may only be shared with trusted third-party 
                service providers (e.g., hosting, analytics) under strict confidentiality agreements.
              </p>
            </div>

            {/* User Rights */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <Lock className="w-7 h-7 text-orange-500" />
                <h2 className="text-2xl font-bold">5. Your Rights</h2>
              </div>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>Access, update, or delete your personal information.</li>
                <li>Withdraw consent for data processing at any time.</li>
                <li>Request a copy of the data we hold about you.</li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <Mail className="w-7 h-7 text-orange-500" />
                <h2 className="text-2xl font-bold">6. Contact Us</h2>
              </div>
              <p className="text-muted-foreground">
                If you have any questions about this Privacy Policy, please contact us at:  
                <span className="block font-semibold text-orange-500 mt-2">support@calmpanion.com</span>
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

