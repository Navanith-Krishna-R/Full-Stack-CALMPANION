'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';
import { ModeToggle } from '@/components/mode-toggle';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full bg-background shadow-md py-3 px-6 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-3">
          <Image src="/logos/websiteLogo.svg" alt="Calmpanion Logo" width={40} height={40} />
          <Link href="/" className="text-foreground hover:text-orange-500">
            <h1 className="text-2xl font-bold">CALMPANION</h1>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-6">
          <Link href="/about" className="text-foreground font-medium hover:text-orange-500">
            About
          </Link>
          <Link href="/donate" className="text-foreground font-medium hover:text-orange-500">
            Donate
          </Link>
        </nav>

        {/* Desktop Buttons */}
        <div className="hidden md:flex items-center space-x-3">
          <ModeToggle />
          <Link
            href="/login"
            className="border border-orange-500 px-4 py-2 text-orange-500 font-semibold rounded-lg hover:bg-orange-500 hover:text-white transition"
          >
            Login
          </Link>
          <Link
            href="/register"
            className="bg-orange-500 px-4 py-2 text-white font-semibold rounded-lg hover:bg-orange-600 transition"
          >
            Register
          </Link>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-background border-t border-border p-4 md:hidden">
            <nav className="flex flex-col space-y-4">
            <ModeToggle />
              <Link
                href="/about"
                className="text-foreground font-medium hover:text-orange-500 px-2 py-1"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              <Link
                href="/donate"
                className="text-foreground font-medium hover:text-orange-500 px-2 py-1"
                onClick={() => setIsMenuOpen(false)}
              >
                Donate
              </Link>
              <div className="pt-4 border-t border-border">
                <Link
                  href="/login"
                  className="block w-full text-center border border-orange-500 px-4 py-2 text-orange-500 font-semibold rounded-lg hover:bg-orange-500 hover:text-white transition mb-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="block w-full text-center bg-orange-500 px-4 py-2 text-white font-semibold rounded-lg hover:bg-orange-600 transition"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Register
                </Link>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;