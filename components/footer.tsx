'use client';

import React from 'react';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-background border-t border-border">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company Links */}
          <div className="space-y-4">
            <Link href="/about" className="text-muted-foreground hover:text-foreground transition block">
              About
            </Link>
            <Link href="/jobs" className="text-muted-foreground hover:text-foreground transition block">
              Jobs
            </Link>
            <Link href="/docs" className="text-muted-foreground hover:text-foreground transition block">
              Docs
            </Link>
          </div>

          {/* Legal Links */}
          <div className="space-y-4">
            <Link href="/terms" className="text-muted-foreground hover:text-foreground transition block">
              Terms and Conditions
            </Link>
            <Link href="/privacy" className="text-muted-foreground hover:text-foreground transition block">
              Privacy policy
            </Link>
            <Link href="/cookies" className="text-muted-foreground hover:text-foreground transition block">
              Cookie policy
              </Link>

          </div>

          {/* Mission Statement */}
          <div className="space-y-4">
            <p className="text-muted-foreground">
              "Discover peace, support, and resources for your mental health journey with CALMPANION. 
              Empowering you to find calmness amidst life's challenges."
            </p>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-border">
          <p className="text-muted-foreground text-center">
            ©{new Date().getFullYear()} CALMPANION. All rights reserved
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;