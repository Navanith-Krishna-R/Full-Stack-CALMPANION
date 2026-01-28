'use client';

import React from 'react';
import { Heart, Shield, Users, Award, Globe, Sparkles } from 'lucide-react';
import Header from '@/components/header';
import Footer from '@/components/footer';

export default function About() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="pt-32 pb-16 px-4 bg-gradient-to-b from-orange-50 to-white dark:from-orange-950 dark:to-background">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-6">
              About <span className="text-orange-500">Calmpanion</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Empowering individuals on their mental health journey through compassionate support and innovative solutions.
            </p>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-16 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
                <p className="text-lg text-muted-foreground mb-6">
                  At Calmpanion, we believe that everyone deserves access to quality mental health support. Our mission is to break down barriers to mental healthcare and create a supportive community where individuals can thrive.
                </p>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <Heart className="w-6 h-6 text-orange-500 mt-1" />
                    <div>
                      <h3 className="font-semibold">Compassionate Care</h3>
                      <p className="text-muted-foreground">Providing empathetic support to every individual</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Shield className="w-6 h-6 text-orange-500 mt-1" />
                    <div>
                      <h3 className="font-semibold">Safe Space</h3>
                      <p className="text-muted-foreground">Creating a secure environment for healing and growth</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Users className="w-6 h-6 text-orange-500 mt-1" />
                    <div>
                      <h3 className="font-semibold">Community Support</h3>
                      <p className="text-muted-foreground">Building connections that foster understanding</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-orange-100 dark:bg-orange-900/20 p-8 rounded-2xl">
                <h3 className="text-2xl font-bold mb-4">Our Impact</h3>
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-orange-500 mb-2">10k+</div>
                    <div className="text-sm text-muted-foreground">Users Helped</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-orange-500 mb-2">500+</div>
                    <div className="text-sm text-muted-foreground">Mental Health Professionals</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-orange-500 mb-2">24/7</div>
                    <div className="text-sm text-muted-foreground">Support Available</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-orange-500 mb-2">95%</div>
                    <div className="text-sm text-muted-foreground">Satisfaction Rate</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-16 px-4 bg-muted/50">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Our Core Values</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-card p-6 rounded-xl shadow-sm">
                <Award className="w-12 h-12 text-orange-500 mb-4" />
                <h3 className="text-xl font-semibold mb-2">Excellence</h3>
                <p className="text-muted-foreground">Committed to providing the highest quality mental health support and resources.</p>
              </div>
              <div className="bg-card p-6 rounded-xl shadow-sm">
                <Globe className="w-12 h-12 text-orange-500 mb-4" />
                <h3 className="text-xl font-semibold mb-2">Accessibility</h3>
                <p className="text-muted-foreground">Making mental health support available to everyone, everywhere.</p>
              </div>
              <div className="bg-card p-6 rounded-xl shadow-sm">
                <Sparkles className="w-12 h-12 text-orange-500 mb-4" />
                <h3 className="text-xl font-semibold mb-2">Innovation</h3>
                <p className="text-muted-foreground">Continuously improving our services through technology and research.</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}