'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="relative border-t border-border bg-mist/60 dark:bg-secondary/40">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-[1.4fr_1fr_1fr_1fr] gap-12">
          {/* Brand + mission */}
          <div className="space-y-4 max-w-sm">
            <Link href="/" className="flex items-center gap-2 w-fit">
              <Image src="/logos/websiteLogo.svg" alt="" width={32} height={32} aria-hidden />
              <span className="text-xl font-display font-semibold text-foreground">CALMPANION</span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              A calmer space for your mental wellbeing — resources, self-assessments, and professional
              support, held in one trustworthy place.
            </p>
          </div>

          {/* Explore */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-4 tracking-wide uppercase">Explore</h3>
            <ul className="space-y-3 text-sm">
              <li><Link href="/survey" className="text-muted-foreground hover:text-primary transition">Assessment</Link></li>
              <li><Link href="/meet-doctors" className="text-muted-foreground hover:text-primary transition">Doctors</Link></li>
              <li><Link href="/blogs" className="text-muted-foreground hover:text-primary transition">Blog</Link></li>
              <li><Link href="/book-appointment" className="text-muted-foreground hover:text-primary transition">Appointments</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-4 tracking-wide uppercase">Company</h3>
            <ul className="space-y-3 text-sm">
              <li><Link href="/about" className="text-muted-foreground hover:text-primary transition">About</Link></li>
              <li><Link href="/donate" className="text-muted-foreground hover:text-primary transition">Donate</Link></li>
              <li><Link href="/jobs" className="text-muted-foreground hover:text-primary transition">Jobs</Link></li>
              <li><Link href="/docs" className="text-muted-foreground hover:text-primary transition">Docs</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-4 tracking-wide uppercase">Legal</h3>
            <ul className="space-y-3 text-sm">
              <li><Link href="/terms" className="text-muted-foreground hover:text-primary transition">Terms &amp; Conditions</Link></li>
              <li><Link href="/privacy" className="text-muted-foreground hover:text-primary transition">Privacy Policy</Link></li>
              <li><Link href="/cookies" className="text-muted-foreground hover:text-primary transition">Cookie Policy</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground text-center sm:text-left">
            © {new Date().getFullYear()} CALMPANION. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground flex items-center gap-1.5">
            Created with <Heart className="w-3.5 h-3.5 text-primary fill-sage-500" aria-hidden /> by{' '}
            <span className="font-medium text-foreground">Navanith Krishna R</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
