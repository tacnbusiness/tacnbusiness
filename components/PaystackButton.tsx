import React from 'react';
import { usePaystackPayment } from 'react-paystack';

interface PaystackButtonProps {
  email: string;
  amount: number; // amount in kobo
  onSuccess: (response: any) => void;
  onClose?: () => void;
}

const PaystackButton: React.FC<PaystackButtonProps> = ({ email, amount, onSuccess, onClose }) => {
  const publicKey = process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY!;

  const config = {
    reference: new Date().getTime().toString(),
    email,
    amount,
    publicKey,
  };

  const initializePayment = usePaystackPayment(config);

  const handleClick = () => {
    initializePayment({
      onSuccess: (response: any) => {
        onSuccess(response);
      },
      onClose: () => {
        if (onClose) onClose();
      }
    });
  };

  return (
    <button onClick={handleClick} style={{ padding: '10px 20px', cursor: 'pointer' }}>
      Pay Subscription
    </button>
  );
};

export default PaystackButton;
