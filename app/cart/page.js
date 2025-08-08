'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const router = useRouter();

  useEffect(() => {
    // Load cart items from localStorage
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, []);

  const removeFromCart = (productId) => {
    const updatedCart = cartItems.filter(item => item.id !== productId);
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) return;
    
    const updatedCart = cartItems.map(item => 
      item.id === productId ? { ...item, quantity: newQuantity } : item
    );
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  return (
    <div className="container py-5">
      <h1 className="mb-4">Shopping Cart</h1>
      {cartItems.length === 0 ? (
        <div className="alert alert-info">
          Your cart is empty. <a href="/listing" className="alert-link">Continue shopping</a>
        </div>
      ) : (
        <>
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Total</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map(item => (
                  <tr key={item.id}>
                    <td>{item.name}</td>
                    <td>${item.price}</td>
                    <td>
                      <div className="input-group w-75">
                        <button 
                          className="btn btn-outline-secondary"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        >
                          -
                        </button>
                        <input 
                          type="number" 
                          className="form-control text-center"
                          value={item.quantity}
                          readOnly
                        />
                        <button 
                          className="btn btn-outline-secondary"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td>${(item.price * item.quantity).toFixed(2)}</td>
                    <td>
                      <button 
                        className="btn btn-danger btn-sm"
                        onClick={() => removeFromCart(item.id)}
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan="3" className="text-end"><strong>Total:</strong></td>
                  <td colSpan="2"><strong>${getTotalPrice().toFixed(2)}</strong></td>
                </tr>
              </tfoot>
            </table>
          </div>
          <div className="d-flex justify-content-between">
            <button 
              className="btn btn-secondary"
              onClick={() => router.push('/listing')}
            >
              Continue Shopping
            </button>
            <button 
              className="btn btn-primary"
              onClick={() => alert('Checkout functionality not implemented')}
            >
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
}
