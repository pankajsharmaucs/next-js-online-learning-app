'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { loadRazorpayScript } from '@/utlis/loadRazorpay';
import { getLogginedUserData } from '@/utlis/checkAdminLogin';

interface PaymentProps {
  class_name?: string;
  subject_name?: string;
  type: 'class' | 'subject' | 'monthly' | 'yearly';
  price: number;
}

export default function RazorpayButton({ price, class_name, subject_name, type }: PaymentProps) {
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    if (!price) return alert('Price not available');
    setLoading(true);
    const razorpayLoaded = await loadRazorpayScript();

    if (!razorpayLoaded) {
      alert('Razorpay failed to load. Try again later.');
      setLoading(false);
      return;
    }

    try {

      const user = await getLogginedUserData();
      const userEmail = user?.email;
      if (!userEmail) return;

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
        amount: price,
        currency: 'INR',
        name: 'Your Platform Name',
        description: `${type.charAt(0).toUpperCase() + type.slice(1)} Purchase`,
        image: '/assets/common/logo2.jpg',
        handler: async function (response: any) {
          if (response.razorpay_payment_id) {
            await axios.post(`${process.env.NEXT_PUBLIC_PAYMENT_CONTROL}`, {
              razorpay_payment_id: response.razorpay_payment_id,
              user_id: userEmail,
              class_id: class_name,
              subject_id: subject_name,
              type,
            });

            window.location.href = '/thank-you';
          }
        },
        prefill: {
          name: 'Test User',
          email: 'test@example.com',
          contact: '9999999999',
        },
        notes: {
          address: 'User Address',
        },
        theme: {
          color: '#17ca96',
        },
      };

      const razorpay = new (window as any).Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error('Payment error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button onClick={handleClick} disabled={loading || price === null} className="e-btn2 e-btn-7 w-100">
      {loading ? 'Processing...' : `Buy Now ₹${price}`}
    </button>
  );
}
