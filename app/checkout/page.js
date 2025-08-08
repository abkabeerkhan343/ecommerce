'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { auth, db } from '../firebase/firebase';
import { collection, addDoc } from 'firebase/firestore';
import Navbar from '../components/Navbar';
import AuthGuard from '../components/AuthGuard';

export default function Checkout() {
  const router = useRouter();
  const [cartItems, setCartItems] = useState([]);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    cardNumber: '',
    expiryDate: '',
    cvv: ''
  });

  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const user = auth.currentUser;
      if (!user) {
        throw new Error('User not authenticated');
      }

      // Create order in Firestore
      const orderData = {
        userId: user.uid,
        items: cartItems,
        total: calculateTotal(),
        shippingAddress: {
          firstName: formData.firstName,
          lastName: formData.lastName,
          address: formData.address,
          city: formData.city,
          state: formData.state,
          zipCode: formData.zipCode
        },
        status: 'pending',
        date: new Date().toISOString()
      };

      await addDoc(collection(db, 'orders'), orderData);

      // Clear cart
      localStorage.removeItem('cart');

      // Redirect to success page
      router.push('/checkout/success');
    } catch (error) {
      console.error('Error processing order:', error);
      alert('Failed to process order. Please try again.');
    }
  };

  if (cartItems.length === 0) {
    return (
      <>
        <Navbar />
        <div className="container py-5">
          <div className="alert alert-info">
            Your cart is empty.{' '}
            <a href="/listing" className="alert-link">Continue shopping</a>
          </div>
        </div>
      </>
    );
  }

  return (
    <AuthGuard>
      <Navbar />
      <div className="container py-5">
        <h1 className="mb-4">Checkout</h1>
        <div className="row">
          <div className="col-md-8">
            <form onSubmit={handleSubmit}>
              <div className="card mb-4">
                <div className="card-body">
                  <h3 className="card-title">Shipping Information</h3>
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label className="form-label">First Name</label>
                      <input
                        type="text"
                        name="firstName"
                        className="form-control"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Last Name</label>
                      <input
                        type="text"
                        name="lastName"
                        className="form-control"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="col-12">
                      <label className="form-label">Email</label>
                      <input
                        type="email"
                        name="email"
                        className="form-control"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="col-12">
                      <label className="form-label">Address</label>
                      <input
                        type="text"
                        name="address"
                        className="form-control"
                        value={formData.address}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">City</label>
                      <input
                        type="text"
                        name="city"
                        className="form-control"
                        value={formData.city}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="col-md-4">
                      <label className="form-label">State</label>
                      <input
                        type="text"
                        name="state"
                        className="form-control"
                        value={formData.state}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="col-md-2">
                      <label className="form-label">Zip Code</label>
                      <input
                        type="text"
                        name="zipCode"
                        className="form-control"
                        value={formData.zipCode}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="card mb-4">
                <div className="card-body">
                  <h3 className="card-title">Payment Information</h3>
                  <div className="row g-3">
                    <div className="col-12">
                      <label className="form-label">Card Number</label>
                      <input
                        type="text"
                        name="cardNumber"
                        className="form-control"
                        value={formData.cardNumber}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Expiry Date</label>
                      <input
                        type="text"
                        name="expiryDate"
                        className="form-control"
                        placeholder="MM/YY"
                        value={formData.expiryDate}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">CVV</label>
                      <input
                        type="text"
                        name="cvv"
                        className="form-control"
                        value={formData.cvv}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>

              <button type="submit" className="btn btn-primary btn-lg w-100">
                Place Order
              </button>
            </form>
          </div>

          <div className="col-md-4">
            <div className="card">
              <div className="card-body">
                <h3 className="card-title">Order Summary</h3>
                {cartItems.map(item => (
                  <div key={item.id} className="d-flex justify-content-between mb-2">
                    <span>{item.name} x {item.quantity}</span>
                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
                <hr />
                <div className="d-flex justify-content-between">
                  <strong>Total:</strong>
                  <strong>${calculateTotal().toFixed(2)}</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AuthGuard>
  );
}
