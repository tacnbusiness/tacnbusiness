// components/Header.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-md fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-14">
        <Link href="/" className="text-xl font-bold text-blue-600">
          tacnbusiness.com
        </Link>

        <nav className="hidden md:flex space-x-6">
          <Link href="/" className="hover:text-blue-700">
            Home
          </Link>
          <Link href="/list-business" className="hover:text-blue-700">
            List Business
          </Link>
          <Link href="/pricing" className="hover:text-blue-700">
            Pricing
          </Link>
          <Link href="/profile" className="hover:text-blue-700">
            Profile
          </Link>
        </nav>

        <button
          className="md:hidden p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <svg
            className="h-6 w-6 text-gray-700"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            {menuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {menuOpen && (
        <nav className="md:hidden bg-white border-t border-gray-200 px-4 py-2 space-y-1 shadow-lg">
          <Link href="/" className="block py-2 hover:text-blue-700">
            Home
          </Link>
          <Link href="/list-business" className="block py-2 hover:text-blue-700">
            List Business
          </Link>
          <Link href="/pricing" className="block py-2 hover:text-blue-700">
            Pricing
          </Link>
          <Link href="/profile" className="block py-2 hover:text-blue-700">
            Profile
          </Link>
        </nav>
      )}
    </header>
  );
}
