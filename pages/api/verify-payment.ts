// pages/api/verify-payment.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '../../lib/supabaseClient';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { reference, userId } = req.body;

  if (!reference || !userId) {
    return res.status(400).json({ error: 'Missing reference or userId' });
  }

  const secretKey = process.env.PAYSTACK_SECRET_KEY!;
  
  try {
    const response = await fetch(`https://api.paystack.co/transaction/verify/${reference}`, {
      headers: {
        Authorization: `Bearer ${secretKey}`,
      },
    });
    const data = await response.json();

    if (data.status && data.data.status === 'success') {
      // Update subscription status in Supabase
      const { error } = await supabase
        .from('subscriptions') // create this table with userId, status, plan, etc.
        .upsert({
          user_id: userId,
          status: 'active',
          plan: 'basic', // You can customize this based on your plans
          paid_at: new Date().toISOString(),
          reference,
        });

      if (error) {
        return res.status(500).json({ error: 'Failed to update subscription in DB' });
      }

      return res.status(200).json({ success: true });
    } else {
      return res.status(400).json({ error: 'Payment verification failed' });
    }
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
}
