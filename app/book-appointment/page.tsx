'use client';

import React, { useState } from 'react';
import { Calendar as CalendarIcon, Clock, MapPin, ArrowRight } from 'lucide-react';
import { format } from 'date-fns';
import { Calendar } from '@/components/ui/calendar';
import Header from '@/components/header';
import Footer from '@/components/footer';
import { useUser } from '@/context/UserContext'; // For logged-in user

const timeSlots = [
  "09:00 AM", "10:00 AM", "11:00 AM",
  "02:00 PM", "03:00 PM", "04:00 PM"
];

const appointmentTypes = [
  { id: 'initial', name: 'Initial Consultation', duration: '60 min', price: '₹1500' },
  { id: 'followup', name: 'Follow-up Session', duration: '45 min', price: '₹1000' },
  { id: 'urgent', name: 'Urgent Care', duration: '30 min', price: '₹1200' }
];

export default function BookAppointment() {
  const { userEmail } = useUser(); // get logged-in user's email
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [notes, setNotes] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const handleBooking = async () => {
    if (!userEmail) {
      setErrorMessage('Please login to book an appointment.');
      return;
    }

    setLoading(true);
    setErrorMessage('');
    setSuccessMessage('');

    try {
      const res = await fetch('/api/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userEmail,
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
        setSuccessMessage('Appointment booked successfully!');
        // Reset selections
        setDate(undefined);
        setSelectedTime(null);
        setSelectedType(null);
        setNotes('');
      }
    } catch (err) {
      console.error(err);
      setErrorMessage('Server error, please try again');
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-orange-50 via-white to-orange-100 dark:from-orange-950 dark:via-background dark:to-orange-900">
      <Header />

      <main className="flex-grow">
        <section className="pt-32 pb-16 px-4 bg-orange-500 text-white shadow-md">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-6 drop-shadow-lg">Book Your Appointment</h1>
            <p className="text-xl max-w-2xl mx-auto opacity-90">
              Schedule a session with our mental health professionals at your convenience.
            </p>
          </div>
        </section>

        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12">
            
            {/* Calendar & Time */}
            <div className="space-y-8">
              <div className="bg-white dark:bg-card p-6 rounded-2xl shadow-xl border">
                <h2 className="text-2xl font-bold mb-6 text-orange-600">Select Date & Time</h2>
                
                <Calendar mode="single" selected={date} onSelect={setDate} className="rounded-md border shadow-sm mb-6" />

                {date && (
                  <>
                    <h3 className="font-semibold mb-4 flex items-center gap-2 text-orange-600">
                      <Clock className="w-4 h-4" />
                      Available Times for {format(date, 'MMMM d, yyyy')}
                    </h3>
                    <div className="grid grid-cols-2 gap-3">
                      {timeSlots.map(time => (
                        <button
                          key={time}
                          onClick={() => setSelectedTime(time)}
                          className={`p-3 rounded-lg border-2 text-center font-medium transition
                            ${selectedTime === time
                              ? 'border-orange-500 bg-orange-100 dark:bg-orange-900 text-orange-700 dark:text-orange-200'
                              : 'border-border hover:border-orange-500 hover:bg-orange-50 dark:hover:bg-orange-950'
                            }`}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Appointment Type & Notes */}
            <div className="space-y-8">
              <div className="bg-white dark:bg-card p-6 rounded-2xl shadow-xl border">
                <h2 className="text-2xl font-bold mb-6 text-orange-600">Appointment Type</h2>
                
                <div className="space-y-4 mb-8">
                  {appointmentTypes.map(type => (
                    <button
                      key={type.id}
                      onClick={() => setSelectedType(type.id)}
                      className={`w-full p-4 rounded-lg border-2 text-left transition
                        ${selectedType === type.id
                          ? 'border-orange-500 bg-orange-100 dark:bg-orange-900 text-orange-700 dark:text-orange-200'
                          : 'border-border hover:border-orange-500 hover:bg-orange-50 dark:hover:bg-orange-950'
                        }`}
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="font-semibold">{type.name}</h3>
                          <p className="text-sm text-muted-foreground">{type.duration}</p>
                        </div>
                        <div className="text-lg font-semibold text-orange-600">{type.price}</div>
                      </div>
                    </button>
                  ))}
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-muted-foreground mb-2">Additional Notes</label>
                    <textarea
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      className="w-full px-4 py-3 rounded-lg border bg-background focus:outline-none focus:ring-2 focus:ring-orange-500"
                      rows={4}
                      placeholder="Any specific concerns or requirements..."
                    />
                  </div>

                  {errorMessage && <p className="text-red-500">{errorMessage}</p>}
                  {successMessage && <p className="text-green-600">{successMessage}</p>}

                  <button
                    onClick={handleBooking}
                    disabled={!date || !selectedTime || !selectedType || loading}
                    className="w-full bg-orange-500 text-white py-3 rounded-lg font-semibold hover:bg-orange-600 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {loading ? 'Booking...' : 'Confirm Booking'}
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
