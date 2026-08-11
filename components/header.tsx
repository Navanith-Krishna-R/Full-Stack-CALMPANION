'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { ModeToggle } from '@/components/mode-toggle';
import { useUser } from '@/context/UserContext';

const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/docs', label: 'Resources' },
  { href: '/meet-doctors', label: 'Doctors' },
  { href: '/blogs', label: 'Blog' },
  { href: '/about', label: 'About' },
];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user, userEmail, isAdmin, logout } = useUser();
  const firstName = user?.name?.trim().split(' ')[0] || userEmail?.split('@')[0];
  const pathname = usePathname();

  // Showing/hiding these links is a UX nicety only — /appointments and
  // /admin independently enforce their own access server-side regardless
  // of whether a link to them is visible here.
  const navLinks = [
    ...NAV_LINKS,
    ...(userEmail ? [{ href: '/appointments', label: 'My Appointments' }] : []),
    ...(isAdmin ? [{ href: '/admin', label: 'Admin' }] : []),
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  const handleLogout = async () => {
    await logout();
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-background/80 backdrop-blur-lg shadow-sm border-b border-border'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 shrink-0 group">
          <Image src="/logos/websiteLogo.svg" alt="CALMPANION" width={34} height={34} priority />
          <span className="text-xl font-display font-semibold text-foreground group-hover:text-primary transition-colors">
            CALMPANION
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1" aria-label="Primary">
          {navLinks.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  active ? 'text-primary bg-secondary' : 'text-foreground/80 hover:text-primary hover:bg-secondary/70'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Desktop Buttons */}
        <div className="hidden md:flex items-center gap-3">
          <ModeToggle />
          {!userEmail ? (
            <>
              <Link
                href="/login"
                className="px-4 py-2 text-sm font-semibold text-foreground/80 hover:text-primary transition-colors"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="px-5 py-2.5 text-sm bg-primary text-primary-foreground font-semibold rounded-full hover:bg-sage-800 transition-colors shadow-sm"
              >
                Get Started
              </Link>
            </>
          ) : (
            <>
              <span className="text-sm text-muted-foreground">Hi, {firstName}</span>
              <button
                onClick={handleLogout}
                className="px-4 py-2 text-sm font-semibold rounded-full border border-border text-foreground/80 hover:border-destructive hover:text-destructive transition-colors"
              >
                Logout
              </button>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 -mr-2 text-foreground"
          onClick={() => setIsMenuOpen((v) => !v)}
          aria-expanded={isMenuOpen}
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
        >
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-[max-height,opacity] duration-300 ease-out ${
          isMenuOpen ? 'max-h-[28rem] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="bg-background border-t border-border px-6 py-6">
          <nav className="flex flex-col gap-1" aria-label="Mobile">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-3 py-3 rounded-lg text-base font-medium text-foreground hover:bg-secondary transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="mt-4 pt-4 border-t border-border flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Theme</span>
            <ModeToggle />
          </div>

          <div className="mt-4 flex flex-col gap-3">
            {!userEmail ? (
              <>
                <Link
                  href="/login"
                  className="w-full text-center px-4 py-3 rounded-full border border-border font-semibold text-foreground hover:border-primary hover:text-primary transition-colors"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="w-full text-center px-4 py-3 rounded-full bg-primary text-primary-foreground font-semibold hover:bg-sage-800 transition-colors"
                >
                  Get Started
                </Link>
              </>
            ) : (
              <>
                <span className="text-center text-sm text-muted-foreground">Hi, {firstName}</span>
                <button
                  onClick={handleLogout}
                  className="w-full text-center px-4 py-3 rounded-full border border-border font-semibold text-foreground hover:border-destructive hover:text-destructive transition-colors"
                >
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
