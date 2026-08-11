'use client';

import React from 'react';
import { Heart, Shield, Users, Award, Globe, Sparkles, Code2 } from 'lucide-react';
import Header from '@/components/header';
import Footer from '@/components/footer';

export default function About() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="pt-36 pb-16 px-6 bg-organic-gradient">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-5xl font-display font-medium mb-6">
              About <span className="text-primary">CALMPANION</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              A calmer space for your mental wellbeing — built to make support easier to reach, and easier to trust.
            </p>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-20 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-display font-medium mb-6">Our Mission</h2>
                <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                  CALMPANION exists to make the first step toward mental wellness feel less intimidating —
                  self-assessments you can take privately, professionals you can book directly, and a
                  community you can read and write for, all in one calm place.
                </p>
                <div className="space-y-5">
                  <div className="flex items-start gap-4">
                    <Heart className="w-6 h-6 text-primary mt-1 shrink-0" />
                    <div>
                      <h3 className="font-semibold">Compassionate Care</h3>
                      <p className="text-muted-foreground text-sm">Providing empathetic support to every individual.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Shield className="w-6 h-6 text-primary mt-1 shrink-0" />
                    <div>
                      <h3 className="font-semibold">Safe Space</h3>
                      <p className="text-muted-foreground text-sm">Private by design — your data belongs to you.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Users className="w-6 h-6 text-primary mt-1 shrink-0" />
                    <div>
                      <h3 className="font-semibold">Community Support</h3>
                      <p className="text-muted-foreground text-sm">Building connections that foster understanding.</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-mist dark:bg-secondary/40 p-8 rounded-3xl">
                <h3 className="text-2xl font-display font-medium mb-4">Our Approach</h3>
                <div className="space-y-5">
                  <div>
                    <div className="font-semibold text-primary mb-1">Informational, not diagnostic</div>
                    <p className="text-sm text-muted-foreground">Self-assessments help you reflect — they never replace a licensed professional.</p>
                  </div>
                  <div>
                    <div className="font-semibold text-primary mb-1">Privacy-first</div>
                    <p className="text-sm text-muted-foreground">Appointments and results are visible only to you, always.</p>
                  </div>
                  <div>
                    <div className="font-semibold text-primary mb-1">Built to grow honestly</div>
                    <p className="text-sm text-muted-foreground">We&apos;d rather ship fewer, real features than dress up placeholders as finished ones.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-20 px-6 bg-mist/60 dark:bg-secondary/30">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-display font-medium text-center mb-12">Our Core Values</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-card p-6 rounded-2xl shadow-sm border border-border">
                <Award className="w-10 h-10 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">Excellence</h3>
                <p className="text-muted-foreground text-sm">Committed to providing the highest quality mental health support and resources.</p>
              </div>
              <div className="bg-card p-6 rounded-2xl shadow-sm border border-border">
                <Globe className="w-10 h-10 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">Accessibility</h3>
                <p className="text-muted-foreground text-sm">Making mental health support available to everyone, everywhere.</p>
              </div>
              <div className="bg-card p-6 rounded-2xl shadow-sm border border-border">
                <Sparkles className="w-10 h-10 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">Innovation</h3>
                <p className="text-muted-foreground text-sm">Continuously improving our services through technology and research.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Creator Section */}
        <section className="py-20 px-6">
          <div className="max-w-3xl mx-auto text-center">
            <div className="w-16 h-16 mx-auto rounded-full bg-secondary flex items-center justify-center mb-6">
              <Code2 className="w-7 h-7 text-primary" />
            </div>
            <h2 className="text-2xl font-display font-medium mb-3">Built by</h2>
            <p className="text-xl font-semibold text-foreground mb-2">Navanith Krishna R</p>
            <p className="text-muted-foreground max-w-xl mx-auto">
              CALMPANION is designed and engineered end-to-end — from the MongoDB-backed API to the
              interface you&apos;re using now — as a mental wellness product built with care.
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
