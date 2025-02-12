'use client';

import React, { useState } from 'react';
import { Calendar as CalendarIcon, Clock, MapPin, ArrowRight } from 'lucide-react';
import { format } from 'date-fns';
import { Calendar } from '@/components/ui/calendar';
import Header from '@/components/header';
import Footer from '@/components/footer';

const timeSlots = [
  "09:00 AM", "10:00 AM", "11:00 AM",
  "02:00 PM", "03:00 PM", "04:00 PM"
];

const appointmentTypes = [
  {
    id: 'initial',
    name: 'Initial Consultation',
    duration: '60 min',
    price: '$150'
  },
  {
    id: 'followup',
    name: 'Follow-up Session',
    duration: '45 min',
    price: '$100'
  },
  {
    id: 'urgent',
    name: 'Urgent Care',
    duration: '30 min',
    price: '$120'
  }
];

export default function BookAppointment() {
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="pt-32 pb-16 px-4">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-6">
              Book Your Appointment
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Schedule a session with our mental health professionals at your convenience.
            </p>
          </div>
        </section>

        {/* Booking Section */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12">
              {/* Calendar and Time Selection */}
              <div className="space-y-8">
                <div className="bg-card p-6 rounded-2xl shadow-lg">
                  <h2 className="text-2xl font-bold mb-6">Select Date & Time</h2>
                  
                  <div className="mb-6">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      className="rounded-md border"
                    />
                  </div>

                  {date && (
                    <div>
                      <h3 className="font-semibold mb-4 flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        Available Times for {format(date, 'MMMM d, yyyy')}
                      </h3>
                      <div className="grid grid-cols-2 gap-3">
                        {timeSlots.map((time) => (
                          <button
                            key={time}
                            onClick={() => setSelectedTime(time)}
                            className={`p-3 rounded-lg border-2 text-center transition
                              ${selectedTime === time
                                ? 'border-orange-500 bg-orange-50 dark:bg-orange-950'
                                : 'border-border hover:border-orange-500'
                              }`}
                          >
                            {time}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Appointment Type and Details */}
              <div className="space-y-8">
                <div className="bg-card p-6 rounded-2xl shadow-lg">
                  <h2 className="text-2xl font-bold mb-6">Appointment Type</h2>
                  
                  <div className="space-y-4 mb-8">
                    {appointmentTypes.map((type) => (
                      <button
                        key={type.id}
                        onClick={() => setSelectedType(type.id)}
                        className={`w-full p-4 rounded-lg border-2 text-left transition
                          ${selectedType === type.id
                            ? 'border-orange-500 bg-orange-50 dark:bg-orange-950'
                            : 'border-border hover:border-orange-500'
                          }`}
                      >
                        <div className="flex justify-between items-center">
                          <div>
                            <h3 className="font-semibold">{type.name}</h3>
                            <p className="text-sm text-muted-foreground">{type.duration}</p>
                          </div>
                          <div className="text-lg font-semibold">{type.price}</div>
                        </div>
                      </button>
                    ))}
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-muted-foreground mb-2">
                        Additional Notes
                      </label>
                      <textarea
                        className="w-full px-4 py-3 rounded-lg border bg-background focus:outline-none focus:ring-2 focus:ring-orange-500"
                        rows={4}
                        placeholder="Any specific concerns or requirements..."
                      />
                    </div>

                    <button
                      disabled={!date || !selectedTime || !selectedType}
                      className="w-full bg-orange-500 text-white py-3 rounded-lg font-semibold hover:bg-orange-600 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      Confirm Booking <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Location Info */}
                <div className="bg-muted/50 p-6 rounded-2xl">
                  <div className="flex items-start gap-4">
                    <MapPin className="w-6 h-6 text-orange-500 mt-1" />
                    <div>
                      <h3 className="font-semibold mb-2">Location Options</h3>
                      <p className="text-muted-foreground">
                        Choose between in-person visits at our clinic or convenient online video consultations from the comfort of your home.
                      </p>
                    </div>
                  </div>
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