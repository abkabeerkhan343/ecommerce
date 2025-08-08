'use client';

import { useEffect, useState } from 'react';
import { auth, db } from '../firebase/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import Navbar from '../components/Navbar';
import AuthGuard from '../components/AuthGuard';

export default function Profile() {
  const [orders, setOrders] = useState([]);
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
        fetchOrders(user.uid);
      }
    });

    return () => unsubscribe();
  }, []);

  const fetchOrders = async (userId) => {
    try {
      const q = query(
        collection(db, 'orders'),
        where('userId', '==', userId)
      );
      const querySnapshot = await getDocs(q);
      const orderData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setOrders(orderData);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const handleLogout = async () => {
    try {
      await auth.signOut();
      router.push('/');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <AuthGuard>
      <Navbar />
      <div className="container py-5">
        <div className="row">
          <div className="col-md-4">
            <div className="card mb-4">
              <div className="card-body">
                <h3 className="card-title">Profile Information</h3>
                {user && (
                  <>
                    <p className="card-text"><strong>Email:</strong> {user.email}</p>
                    <p className="card-text">
                      <strong>Member since:</strong>{' '}
                      {new Date(user.metadata.creationTime).toLocaleDateString()}
                    </p>
                    <button className="btn btn-danger" onClick={handleLogout}>
                      Logout
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
          <div className="col-md-8">
            <h3 className="mb-4">Order History</h3>
            {orders.length === 0 ? (
              <div className="alert alert-info">
                You haven't placed any orders yet.{' '}
                <a href="/listing" className="alert-link">Start shopping</a>
              </div>
            ) : (
              <div className="list-group">
                {orders.map(order => (
                  <div key={order.id} className="list-group-item">
                    <div className="d-flex w-100 justify-content-between">
                      <h5 className="mb-1">Order #{order.id}</h5>
                      <small>{new Date(order.date).toLocaleDateString()}</small>
                    </div>
                    <p className="mb-1">Total: ${order.total}</p>
                    <small>Status: {order.status}</small>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </AuthGuard>
  );
}
