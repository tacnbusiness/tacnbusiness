// components/SubscribeClient.tsx
'use client'; // for Next.js 13+, optional but safe

import React, { useEffect, useState } from 'react';
import { useSession } from '@supabase/auth-helpers-react';
import { useRouter } from 'next/router';
import PaystackButton from '../components/PaystackButton';

export default function SubscribeClient() {
  const session = useSession();
  const router = useRouter();
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (session === null) {
      router.push('/login');
    }
  }, [session]);

  if (!session) return <p>Checking session...</p>;

  const user = session.user;

  const handleSuccess = async (reference: string) => {
    const res = await fetch('/api/verify-payment', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ reference, userId: user.id }),
    });
    const data = await res.json();
    setMessage(data.success ? 'Subscription successful! 🎉' : 'Subscription verification failed.');
  };

  const handleClose = () => setMessage('Payment closed.');

  return (
    <div>
      <h1>Subscribe for TACNBUSINESS</h1>
      <p>Subscription price: ₦5,000 (500000 kobo)</p>

      <PaystackButton
        email={user.email!}
        amount={500000}
        onSuccess={handleSuccess}
        onClose={handleClose}
      />

      {message && <p>{message}</p>}
    </div>
  );
}
