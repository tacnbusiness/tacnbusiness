// app/dashboard/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'; // Changed from next/router to next/navigation
import Link from 'next/link';
import { supabase } from '../../lib/supabaseClient';

export default function Dashboard() {
  const router = useRouter();
  const [userEmail, setUserEmail] = useState<string | null>(null);

  useEffect(() => {
    const getSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        router.push('/login');
      } else {
        setUserEmail(session.user.email ?? null);
      }
    };

    getSession();
  }, [router]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/login');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-10 rounded-xl shadow-md text-center space-y-4">
        <h1 className="text-3xl font-bold">Welcome to Your Dashboard</h1>
        {userEmail && <p className="text-gray-700">Logged in as <strong>{userEmail}</strong></p>}

        <div className="space-y-2">
          <Link href="/profile" className="text-blue-600 hover:underline">
            Go to Profile
          </Link>
          <br />
          <Link href="/add-business" className="text-blue-600 hover:underline">
            Add Your Business
          </Link>
          <br />
          <Link href="/my-businesses" className="text-blue-600 hover:underline">
            Manage My Businesses
          </Link>
        </div>

        <button
          onClick={handleLogout}
          className="mt-4 bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
