'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Calendar as CalendarIcon, Clock, ArrowRight, ArrowLeft, CheckCircle2, Stethoscope } from 'lucide-react';
import { format } from 'date-fns';
import { Calendar } from '@/components/ui/calendar';
import Header from '@/components/header';
import Footer from '@/components/footer';
import { useUser } from '@/context/UserContext';

const timeSlots = [
  '09:00 AM', '10:00 AM', '11:00 AM',
  '02:00 PM', '03:00 PM', '04:00 PM'
];

const appointmentTypes = [
  { id: 'initial', name: 'Initial Consultation', duration: '60 min', price: '₹1500' },
  { id: 'followup', name: 'Follow-up Session', duration: '45 min', price: '₹1000' },
  { id: 'urgent', name: 'Urgent Care', duration: '30 min', price: '₹1200' }
];

const STEPS = ['Type', 'Date & Time', 'Confirm'];

export default function BookAppointment() {
  const { userEmail, loading: userLoading } = useUser();
  const [step, setStep] = useState(0);
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [notes, setNotes] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const selectedTypeInfo = appointmentTypes.find((t) => t.id === selectedType);

  const canAdvance = step === 0 ? !!selectedType : step === 1 ? !!date && !!selectedTime : true;

  const handleBooking = async () => {
    setLoading(true);
    setErrorMessage('');

    try {
      const res = await fetch('/api/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          date: date?.toISOString(),
          time: selectedTime,
          type: selectedType,
          notes
        })
      });

      const result = await res.json();

      if (!res.ok) {
        setErrorMessage(result.message || 'Booking failed');
      } else {
        setSuccess(true);
      }
    } catch (err) {
      console.error(err);
      setErrorMessage('Server error, please try again');
    }

    setLoading(false);
  };

  const resetForm = () => {
    setStep(0);
    setDate(undefined);
    setSelectedTime(null);
    setSelectedType(null);
    setNotes('');
    setSuccess(false);
  };

  if (!userLoading && !userEmail) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Header />
        <main className="flex-grow flex items-center justify-center px-4 py-32 text-center">
          <div className="max-w-md">
            <Stethoscope className="w-16 h-16 text-primary mx-auto mb-6" />
            <h1 className="text-3xl font-display font-medium mb-4">Log in to book an appointment</h1>
            <p className="text-muted-foreground mb-8">
              You need an account so we know who to confirm this appointment for.
            </p>
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
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-grow">
        <section className="pt-36 pb-16 px-6 bg-organic-gradient">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-5xl font-display font-medium mb-6">Book Your Appointment</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Schedule a session with our mental health professionals at your convenience.
            </p>
          </div>
        </section>

        <section className="py-16 px-6">
          <div className="max-w-2xl mx-auto">
            <div className="bg-card rounded-3xl shadow-lg border border-border p-8">
              {success ? (
                <div className="text-center py-6">
                  <CheckCircle2 className="w-14 h-14 text-primary mx-auto mb-6" />
                  <h2 className="text-2xl font-display font-medium mb-2">Appointment requested</h2>
                  <p className="text-muted-foreground mb-4">
                    Your {selectedTypeInfo?.name.toLowerCase()} request for{' '}
                    {date && format(date, 'MMMM d, yyyy')} at {selectedTime} has been sent to our team.
                  </p>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-semibold bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-200 mb-8">
                    Status: Pending
                  </span>
                  <div className="flex flex-wrap gap-4 justify-center">
                    <Link href="/appointments" className="px-6 py-3 rounded-full bg-primary text-primary-foreground font-semibold hover:bg-sage-800 transition">
                      View My Appointments
                    </Link>
                    <button onClick={resetForm} className="px-6 py-3 rounded-full border border-border font-semibold hover:border-primary hover:text-primary transition">
                      Book Another
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  {/* Step indicator */}
                  <div className="flex items-center justify-between mb-10">
                    {STEPS.map((label, i) => (
                      <div key={label} className="flex-1 flex items-center">
                        <div className="flex flex-col items-center gap-2 flex-1">
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-colors ${
                              i < step ? 'bg-primary text-primary-foreground' :
                              i === step ? 'bg-secondary text-primary border-2 border-primary' :
                              'bg-secondary text-muted-foreground'
                            }`}
                          >
                            {i < step ? <CheckCircle2 className="w-4 h-4" /> : i + 1}
                          </div>
                          <span className={`text-xs font-medium ${i === step ? 'text-foreground' : 'text-muted-foreground'}`}>{label}</span>
                        </div>
                        {i < STEPS.length - 1 && (
                          <div className={`h-0.5 flex-1 mx-1 -mt-5 ${i < step ? 'bg-primary' : 'bg-border'}`} />
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Step 0: Type */}
                  {step === 0 && (
                    <div className="space-y-4">
                      <h2 className="text-xl font-semibold mb-4">Choose appointment type</h2>
                      {appointmentTypes.map((type) => (
                        <button
                          key={type.id}
                          onClick={() => setSelectedType(type.id)}
                          className={`glow-card w-full p-4 rounded-xl border-2 text-left
                            ${selectedType === type.id
                              ? 'glow-card-active border-primary bg-secondary'
                              : 'border-border hover:border-primary/50'
                            }`}
                        >
                          <div className="flex justify-between items-center">
                            <div>
                              <h3 className="font-semibold">{type.name}</h3>
                              <p className="text-sm text-muted-foreground">{type.duration}</p>
                            </div>
                            <div className="text-lg font-semibold text-primary">{type.price}</div>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Step 1: Date & Time */}
                  {step === 1 && (
                    <div>
                      <h2 className="text-xl font-semibold mb-4 flex items-center gap-2"><CalendarIcon className="w-5 h-5 text-primary" /> Select a date</h2>
                      <Calendar mode="single" selected={date} onSelect={setDate} className="rounded-md border shadow-sm mb-6" />
                      {date && (
                        <>
                          <h3 className="font-semibold mb-4 flex items-center gap-2">
                            <Clock className="w-4 h-4" />
                            Available times for {format(date, 'MMMM d, yyyy')}
                          </h3>
                          <div className="grid grid-cols-2 gap-3">
                            {timeSlots.map((time) => (
                              <button
                                key={time}
                                onClick={() => setSelectedTime(time)}
                                className={`p-3 rounded-lg border-2 text-center font-medium transition
                                  ${selectedTime === time
                                    ? 'border-primary bg-secondary text-primary'
                                    : 'border-border hover:border-primary/50'
                                  }`}
                              >
                                {time}
                              </button>
                            ))}
                          </div>
                        </>
                      )}
                    </div>
                  )}

                  {/* Step 2: Confirm */}
                  {step === 2 && (
                    <div>
                      <h2 className="text-xl font-semibold mb-4">Additional notes &amp; confirm</h2>
                      <div className="bg-mist dark:bg-secondary/40 rounded-xl p-4 mb-6 space-y-1 text-sm">
                        <p><span className="text-muted-foreground">Type:</span> <span className="font-medium">{selectedTypeInfo?.name}</span></p>
                        <p><span className="text-muted-foreground">Date:</span> <span className="font-medium">{date && format(date, 'MMMM d, yyyy')}</span></p>
                        <p><span className="text-muted-foreground">Time:</span> <span className="font-medium">{selectedTime}</span></p>
                      </div>
                      <label className="block text-sm font-medium text-muted-foreground mb-2">Additional Notes (optional)</label>
                      <textarea
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        className="w-full px-4 py-3 rounded-lg border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                        rows={4}
                        placeholder="Any specific concerns or requirements..."
                      />
                      {errorMessage && <p className="text-red-500 mt-4 text-sm">{errorMessage}</p>}
                    </div>
                  )}

                  {/* Navigation */}
                  <div className="flex justify-between mt-8 pt-6 border-t border-border">
                    <button
                      onClick={() => setStep((s) => Math.max(0, s - 1))}
                      disabled={step === 0}
                      className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-border font-semibold text-foreground hover:border-primary disabled:opacity-40 disabled:cursor-not-allowed transition"
                    >
                      <ArrowLeft className="w-4 h-4" /> Back
                    </button>
                    {step < STEPS.length - 1 ? (
                      <button
                        onClick={() => setStep((s) => s + 1)}
                        disabled={!canAdvance}
                        className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-primary text-primary-foreground font-semibold hover:bg-sage-800 disabled:opacity-50 disabled:cursor-not-allowed transition"
                      >
                        Next <ArrowRight className="w-4 h-4" />
                      </button>
                    ) : (
                      <button
                        onClick={handleBooking}
                        disabled={loading}
                        className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-primary text-primary-foreground font-semibold hover:bg-sage-800 disabled:opacity-60 transition"
                      >
                        {loading ? 'Booking…' : 'Confirm Booking'} <ArrowRight className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
