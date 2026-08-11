'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { format } from 'date-fns';
import { CalendarClock, Clock, CheckCircle2, XCircle, Stethoscope, AlertTriangle } from 'lucide-react';
import Header from '@/components/header';
import Footer from '@/components/footer';
import { useUser } from '@/context/UserContext';

type AppointmentStatus = 'PENDING' | 'ACCEPTED' | 'REJECTED';

interface Appointment {
  id: string;
  type: string;
  date: string;
  time: string;
  notes: string | null;
  status: AppointmentStatus;
  createdAt: string;
}

const APPOINTMENT_TYPE_LABELS: Record<string, string> = {
  initial: 'Initial Consultation',
  followup: 'Follow-up Session',
  urgent: 'Urgent Care',
};

const STATUS_CONFIG: Record<AppointmentStatus, { label: string; className: string; icon: typeof Clock }> = {
  PENDING: { label: 'Pending', className: 'bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-200', icon: Clock },
  ACCEPTED: { label: 'Accepted', className: 'bg-sage-100 text-sage-800 dark:bg-sage-900/50 dark:text-sage-200', icon: CheckCircle2 },
  REJECTED: { label: 'Rejected', className: 'bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-200', icon: XCircle },
};

export default function MyAppointments() {
  const { userEmail, loading: userLoading } = useUser();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [status, setStatus] = useState<'loading' | 'loaded' | 'error'>('loading');

  useEffect(() => {
    if (!userEmail) return;
    setStatus('loading');
    fetch('/api/appointments', { cache: 'no-store' })
      .then((res) => {
        if (!res.ok) throw new Error('Failed to load');
        return res.json();
      })
      .then((data) => {
        setAppointments(data.appointments ?? []);
        setStatus('loaded');
      })
      .catch(() => setStatus('error'));
  }, [userEmail]);

  if (!userLoading && !userEmail) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Header />
        <main className="flex-grow flex items-center justify-center px-4 py-32 text-center">
          <div className="max-w-md">
            <Stethoscope className="w-16 h-16 text-primary mx-auto mb-6" />
            <h1 className="text-3xl font-display font-medium mb-4">Log in to view your appointments</h1>
            <Link
              href="/login"
              className="inline-block bg-primary text-primary-foreground px-6 py-3 rounded-full font-semibold hover:bg-sage-800 transition"
            >
              Log In
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-grow">
        <section className="pt-36 pb-16 px-6 bg-organic-gradient">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl font-display font-medium mb-6">My Appointments</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Track the status of your appointment requests.
            </p>
          </div>
        </section>

        <section className="py-16 px-6">
          <div className="max-w-4xl mx-auto">
            {status === 'loading' && (
              <div className="space-y-4">
                {[...Array(2)].map((_, i) => (
                  <div key={i} className="h-28 rounded-2xl bg-card border border-border animate-pulse" />
                ))}
              </div>
            )}

            {status === 'error' && (
              <div className="glow-card bg-card border border-border rounded-2xl p-10 text-center">
                <AlertTriangle className="w-8 h-8 text-red-500 mx-auto mb-3" />
                <p className="text-muted-foreground">Couldn&apos;t load your appointments. Please try again shortly.</p>
              </div>
            )}

            {status === 'loaded' && appointments.length === 0 && (
              <div className="glow-card bg-card border border-border rounded-2xl p-10 text-center">
                <CalendarClock className="w-8 h-8 text-muted-foreground mx-auto mb-3" />
                <p className="text-muted-foreground mb-6">You haven&apos;t booked any appointments yet.</p>
                <Link
                  href="/book-appointment"
                  className="inline-block bg-primary text-primary-foreground px-6 py-3 rounded-full font-semibold hover:bg-sage-800 transition"
                >
                  Book an Appointment
                </Link>
              </div>
            )}

            {status === 'loaded' && appointments.length > 0 && (
              <div className="space-y-4">
                {appointments.map((a) => {
                  const config = STATUS_CONFIG[a.status];
                  return (
                    <div key={a.id} className="glow-card bg-card border border-border rounded-2xl p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div>
                        <h3 className="font-semibold text-lg mb-1">{APPOINTMENT_TYPE_LABELS[a.type] ?? a.type}</h3>
                        <p className="text-sm text-muted-foreground">
                          {format(new Date(a.date), 'MMMM d, yyyy')} at {a.time}
                        </p>
                        {a.notes && <p className="text-sm text-muted-foreground italic mt-1">&ldquo;{a.notes}&rdquo;</p>}
                      </div>
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-semibold w-fit ${config.className}`}>
                        <config.icon className="w-4 h-4" /> {config.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
