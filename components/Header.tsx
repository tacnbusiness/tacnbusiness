'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-blue-600 shadow fixed w-full top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-white text-xl sm:text-2xl font-bold tracking-wide">
          tacnbusiness
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium text-white">
          <Link href="/" className="hover:underline">Home</Link>
          <Link href="/list-business" className="hover:underline">List Business</Link>
          <Link href="/pricing" className="hover:underline">Pricing</Link>
          <Link href="/profile" className="hover:underline">Profile</Link>
        </nav>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-white focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle Menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {menuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Overlay */}
      {menuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-40"
          onClick={() => setMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Mobile Navigation */}
      <nav
        className={`fixed top-14 right-0 h-[calc(100vh-56px)] w-64 bg-blue-600 shadow-md text-sm text-white transform transition-transform duration-300 ease-in-out z-50
          ${menuOpen ? 'translate-x-0 pointer-events-auto' : 'translate-x-full pointer-events-none'}`}
      >
        <button
          onClick={() => setMenuOpen(false)}
          className="p-4 text-white focus:outline-none text-2xl font-bold"
          aria-label="Close Menu"
        >
          &times;
        </button>

        <div className="flex flex-col px-4 space-y-2">
          <Link href="/" className="block hover:underline" onClick={() => setMenuOpen(false)}>Home</Link>
          <Link href="/list-business" className="block hover:underline" onClick={() => setMenuOpen(false)}>List Business</Link>
          <Link href="/pricing" className="block hover:underline" onClick={() => setMenuOpen(false)}>Pricing</Link>
          <Link href="/profile" className="block hover:underline" onClick={() => setMenuOpen(false)}>Profile</Link>
        </div>
      </nav>
    </header>
  );
}
