'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { auth } from '../firebase/firebase';

export default function AuthGuard({ children }) {
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) {
        router.push('/login');
      }
    });

    return () => unsubscribe();
  }, [router]);

  return children;
}
