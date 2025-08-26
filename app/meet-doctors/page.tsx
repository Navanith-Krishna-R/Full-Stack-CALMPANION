'use client';

import React from 'react';
import Link from 'next/link';
import { Star, MapPin, Calendar, ArrowRight } from 'lucide-react';
import Header from '@/components/header';
import Footer from '@/components/footer';

const doctors = [
  {
    id: 1,
    name: "Dr. Sarah Johnson",
    specialty: "Clinical Psychologist",
    rating: 4.9,
    reviews: 128,
    location: "New York, NY",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=300&h=300"
  },
  {
    id: 2,
    name: "Dr. Michael Chen",
    specialty: "Psychiatrist",
    rating: 4.8,
    reviews: 95,
    location: "San Francisco, CA",
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=300&h=300"
  },
  {
    id: 3,
    name: "Dr. Emily Martinez",
    specialty: "Therapist",
    rating: 4.9,
    reviews: 156,
    location: "Chicago, IL",
    image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=300&h=300"
  },
  {
    id: 4,
    name: "Dr. James Wilson",
    specialty: "Mental Health Counselor",
    rating: 4.7,
    reviews: 89,
    location: "Los Angeles, CA",
    image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=300&h=300"
  }
];

export default function MeetDoctors() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="pt-32 pb-16 px-4">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-6">
              Meet Our Mental Health Professionals
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              Connect with experienced therapists, counselors, and psychiatrists dedicated to your mental well-being.
            </p>
            <div className="flex justify-center gap-4">
              <input
                type="text"
                placeholder="Search by name or specialty"
                className="w-full max-w-md px-4 py-3 rounded-lg border bg-background focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
              <button className="bg-orange-500 px-6 py-3 text-white font-semibold rounded-lg hover:bg-orange-600 transition">
                Search
              </button>
            </div>
          </div>
        </section>

        {/* Doctors Grid */}
        <section className="py-16 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {doctors.map((doctor) => (
                <div key={doctor.id} className="bg-card p-6 rounded-2xl shadow-lg">
                  <div className="flex gap-4">
                    <img
                      src={doctor.image}
                      alt={doctor.name}
                      className="w-24 h-24 rounded-lg object-cover"
                    />
                    <div>
                      <h3 className="text-xl font-bold">{doctor.name}</h3>
                      <p className="text-muted-foreground mb-2">{doctor.specialty}</p>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="font-semibold">{doctor.rating}</span>
                        <span className="text-muted-foreground">({doctor.reviews} reviews)</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-4 pt-4 border-t border-border">
                    <div className="flex items-center gap-2 text-muted-foreground mb-4">
                      <MapPin className="w-4 h-4" />
                      {doctor.location}
                    </div>
                    <div className="flex gap-2">
                      <Link href="/book-appointment">
                      <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg border-2 border-orange-500 text-orange-500 font-semibold hover:bg-orange-50 dark:hover:bg-orange-950 transition">
                        <Calendar className="w-4 h-4" /> Schedule
                      </button>
                      </Link>
                      <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-orange-500 text-white font-semibold hover:bg-orange-600 transition">
                        View Profile <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 px-4 bg-muted/50">
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">
              Can't find what you're looking for?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              We have more mental health professionals available. Let us help you find the perfect match.
            </p>
            <button className="bg-orange-500 px-8 py-3 text-white font-semibold rounded-lg hover:bg-orange-600 transition">
              View All Professionals
            </button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}