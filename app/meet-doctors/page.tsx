'use client';

import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import { Star, MapPin, Calendar, Clock } from 'lucide-react';
import Header from '@/components/header';
import Footer from '@/components/footer';

interface Doctor {
  id: number;
  name: string;
  specialty: string;
  rating: number;
  reviews: number;
  location: string;
  experience: string;
  availability: string;
  bio: string;
  initials: string;
  accent: string;
}

const doctors: Doctor[] = [
  {
    id: 1,
    name: 'Dr. Sarah Johnson',
    specialty: 'Clinical Psychologist',
    rating: 4.9,
    reviews: 128,
    location: 'New York, NY',
    experience: '12 years experience',
    availability: 'Next available: Mon',
    bio: 'Specializes in anxiety, CBT, and stress management for adults.',
    initials: 'SJ',
    accent: 'bg-sage-200 text-sage-800',
  },
  {
    id: 2,
    name: 'Dr. Michael Chen',
    specialty: 'Psychiatrist',
    rating: 4.8,
    reviews: 95,
    location: 'San Francisco, CA',
    experience: '9 years experience',
    availability: 'Next available: Wed',
    bio: 'Focused on mood disorders and medication management.',
    initials: 'MC',
    accent: 'bg-sky-200 text-sage-800',
  },
  {
    id: 3,
    name: 'Dr. Emily Martinez',
    specialty: 'Therapist',
    rating: 4.9,
    reviews: 156,
    location: 'Chicago, IL',
    experience: '7 years experience',
    availability: 'Next available: Tue',
    bio: 'Works with families and couples through relationship transitions.',
    initials: 'EM',
    accent: 'bg-lavender-200 text-sage-800',
  },
  {
    id: 4,
    name: 'Dr. James Wilson',
    specialty: 'Mental Health Counselor',
    rating: 4.7,
    reviews: 89,
    location: 'Los Angeles, CA',
    experience: '15 years experience',
    availability: 'Next available: Thu',
    bio: 'Experienced in trauma-informed care and grief counseling.',
    initials: 'JW',
    accent: 'bg-sage-200 text-sage-800',
  },
];

export default function MeetDoctors() {
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return doctors;
    return doctors.filter(
      (d) => d.name.toLowerCase().includes(q) || d.specialty.toLowerCase().includes(q)
    );
  }, [query]);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="pt-36 pb-16 px-6 bg-organic-gradient">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-5xl font-display font-medium mb-6">
              Meet Our Mental Health Professionals
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              Connect with experienced therapists, counselors, and psychiatrists dedicated to your mental well-being.
            </p>
            <div className="flex justify-center">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by name or specialty"
                className="w-full max-w-md px-4 py-3 rounded-full border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                aria-label="Search professionals by name or specialty"
              />
            </div>
          </div>
        </section>

        {/* Doctors Grid */}
        <section className="py-16 px-6">
          <div className="max-w-7xl mx-auto">
            {filtered.length === 0 ? (
              <p className="text-center text-muted-foreground">No professionals match &ldquo;{query}&rdquo;.</p>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filtered.map((doctor) => (
                  <div key={doctor.id} className="glow-card bg-card p-6 rounded-2xl border border-border">
                    <div className="flex gap-4">
                      <div
                        className={`w-20 h-20 shrink-0 rounded-2xl flex items-center justify-center text-2xl font-display font-semibold ${doctor.accent}`}
                        aria-hidden
                      >
                        {doctor.initials}
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold leading-tight">{doctor.name}</h3>
                        <p className="text-muted-foreground text-sm mb-2">{doctor.specialty}</p>
                        <div className="flex items-center gap-1 text-sm">
                          <Star className="w-4 h-4 text-amber-400 fill-current" />
                          <span className="font-semibold">{doctor.rating}</span>
                          <span className="text-muted-foreground">({doctor.reviews} reviews)</span>
                        </div>
                      </div>
                    </div>

                    <p className="text-sm text-muted-foreground mt-4">{doctor.bio}</p>

                    <div className="mt-4 pt-4 border-t border-border space-y-2 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2"><MapPin className="w-4 h-4 shrink-0" /> {doctor.location}</div>
                      <div className="flex items-center gap-2"><Clock className="w-4 h-4 shrink-0" /> {doctor.experience}</div>
                      <div className="flex items-center gap-2"><Calendar className="w-4 h-4 shrink-0" /> {doctor.availability}</div>
                    </div>

                    <Link href="/book-appointment" className="mt-5 block">
                      <button className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-full bg-primary text-primary-foreground font-semibold hover:bg-sage-800 transition">
                        <Calendar className="w-4 h-4" /> Schedule
                      </button>
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 px-6 bg-mist/60 dark:bg-secondary/30">
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-3xl font-display font-medium mb-4">
              Can&apos;t find what you&apos;re looking for?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Book an initial consultation and we&apos;ll help match you with the right professional.
            </p>
            <Link
              href="/book-appointment"
              className="inline-block bg-primary text-primary-foreground px-8 py-3.5 rounded-full font-semibold hover:bg-sage-800 transition"
            >
              Book a Consultation
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
