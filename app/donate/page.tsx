'use client';

import React, { useState } from 'react';
import { Heart, ArrowRight, Coffee, Gift, Coins, Info } from 'lucide-react';
import Header from '@/components/header';
import Footer from '@/components/footer';

export default function Donate() {
  const donationAmounts = [10, 25, 50, 100];
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState<number | ''>('');
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const addAmount = (amount: number) => {
    setSelectedAmount(amount);
    setCustomAmount(amount);
    setError('');
  };

  const handleSubmit = () => {
    const amount = selectedAmount || customAmount;
    if (!amount || amount <= 0) {
      setError('Please choose or enter a valid donation amount.');
      return;
    }
    setError('');
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="pt-36 pb-16 px-6 bg-organic-gradient">
          <div className="max-w-7xl mx-auto text-center">
            <Heart className="w-14 h-14 text-primary mx-auto mb-6" />
            <h1 className="text-5xl font-display font-medium mb-6">Support Our Mission</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              CALMPANION is built to keep mental wellness resources accessible. Every contribution helps.
            </p>
          </div>
        </section>

        {/* Donation Options */}
        <section className="py-16 px-6">
          <div className="max-w-3xl mx-auto">
            <div className="bg-card p-8 rounded-3xl shadow-lg border border-border">
              {submitted ? (
                <div className="text-center py-6">
                  <div className="w-14 h-14 mx-auto rounded-full bg-secondary flex items-center justify-center mb-6">
                    <Heart className="w-7 h-7 text-primary" />
                  </div>
                  <h2 className="text-2xl font-display font-medium mb-3">Thank you for wanting to help</h2>
                  <p className="text-muted-foreground max-w-md mx-auto mb-2">
                    Online payments aren&apos;t connected yet, so no charge has been made — this is a
                    placeholder flow while that integration is being set up.
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Reach out via the <a href="/about" className="text-primary font-semibold">about page</a> if you&apos;d like to contribute directly in the meantime.
                  </p>
                </div>
              ) : (
                <>
                  <h2 className="text-2xl font-display font-medium mb-6">Choose an Amount</h2>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    {donationAmounts.map((amount) => (
                      <button
                        onClick={() => addAmount(amount)}
                        key={amount}
                        className={`p-4 border-2 rounded-xl text-center transition group ${
                          selectedAmount === amount
                            ? 'bg-primary text-primary-foreground border-primary'
                            : 'border-border text-foreground hover:border-primary'
                        }`}
                      >
                        <div className="text-2xl font-bold">₹{amount}</div>
                        <div className={`text-sm ${selectedAmount === amount ? 'text-white/85' : 'text-muted-foreground'}`}>
                          One-time
                        </div>
                      </button>
                    ))}
                  </div>

                  <div className="mb-6">
                    <label className="block text-sm font-medium text-muted-foreground mb-2">
                      Custom Amount
                    </label>
                    <div className="relative">
                      <span className="absolute left-4 top-3.5 text-muted-foreground">₹</span>
                      <input
                        type="number"
                        min="1"
                        value={customAmount}
                        onChange={(e) => {
                          const value = parseFloat(e.target.value);
                          setCustomAmount(value > 0 ? value : '');
                          setSelectedAmount(null);
                          setError('');
                        }}
                        className="w-full px-4 py-3 rounded-lg border bg-background focus:outline-none focus:ring-2 focus:ring-primary pl-8"
                        placeholder="Enter amount"
                      />
                    </div>
                  </div>

                  <div className="flex items-start gap-2 text-xs text-muted-foreground mb-6 bg-mist dark:bg-secondary/40 p-3 rounded-lg">
                    <Info className="w-4 h-4 shrink-0 mt-0.5" />
                    <span>Payments are not yet processed by a live payment provider. This flow is transparent about that rather than pretending to complete a charge.</span>
                  </div>

                  {error && <p className="text-sm text-red-500 mb-4">{error}</p>}

                  <button
                    className="w-full bg-primary text-primary-foreground py-3.5 rounded-full font-semibold hover:bg-sage-800 transition flex items-center justify-center gap-2"
                    onClick={handleSubmit}
                  >
                    Continue <ArrowRight className="w-4 h-4" />
                  </button>
                </>
              )}
            </div>
          </div>
        </section>

        {/* Where it could go */}
        <section className="py-16 px-6 bg-mist/60 dark:bg-secondary/30">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-display font-medium text-center mb-12">
              Where contributions could go
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-card p-6 rounded-2xl shadow-sm border border-border">
                <Coffee className="w-10 h-10 text-primary mb-4" />
                <h3 className="text-lg font-semibold mb-2">Hosting &amp; Infrastructure</h3>
                <p className="text-muted-foreground text-sm">Keeping the platform fast, secure, and available.</p>
              </div>
              <div className="bg-card p-6 rounded-2xl shadow-sm border border-border">
                <Gift className="w-10 h-10 text-primary mb-4" />
                <h3 className="text-lg font-semibold mb-2">Content &amp; Resources</h3>
                <p className="text-muted-foreground text-sm">Commissioning well-reviewed articles and guides.</p>
              </div>
              <div className="bg-card p-6 rounded-2xl shadow-sm border border-border">
                <Coins className="w-10 h-10 text-primary mb-4" />
                <h3 className="text-lg font-semibold mb-2">Accessibility</h3>
                <p className="text-muted-foreground text-sm">Making the platform available to more people, for free.</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
