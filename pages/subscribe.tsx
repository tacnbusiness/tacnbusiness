import React, { useEffect, useState } from 'react';
import { useSession } from '@supabase/auth-helpers-react';
import { useRouter } from 'next/router';
import PaystackButton from '../components/PaystackButton';
import { supabase } from '../lib/supabaseClient';

export default function SubscribePage() {
  const session = useSession();
  const router = useRouter();
  const [message, setMessage] = useState('');

  // Redirect if not logged in
  useEffect(() => {
    if (session === null) {
      router.push('/login'); // You can change this to your actual login path
    }
  }, [session]);

  if (!session) {
    return <p>Checking session...</p>; // Optional loading state
  }

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
