'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '../../components/Navbar';

export default function CheckoutSuccess() {
  const router = useRouter();

  useEffect(() => {
    // Clear the cart after successful checkout
    localStorage.removeItem('cart');
  }, []);

  return (
    <>
      <Navbar />
      <div className="container py-5 text-center">
        <div className="display-1 text-success mb-4">✓</div>
        <h1 className="mb-4">Order Successful!</h1>
        <p className="lead mb-4">
          Thank you for your purchase. We&apos;ll send you an email confirmation shortly.
        </p>
        <div className="d-flex justify-content-center gap-3">
          <button
            className="btn btn-primary"
            onClick={() => router.push('/profile')}
          >
            View Order History
          </button>
          <button
            className="btn btn-secondary"
            onClick={() => router.push('/listing')}
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </>
  );
}
