'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../contexts/AuthContext';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase/firebase';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Navbar() {
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    // Initialize Bootstrap JavaScript
    require('bootstrap/dist/js/bootstrap.bundle.min.js');
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      router.push('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark" style={{ 
      background: 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    }}>
      <div className="container">
        <a className="navbar-brand fw-bold" href="/">
          <i className="bi bi-shop me-2"></i>E-Commerce Store
        </a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <a className="nav-link" href="/">
                <i className="bi bi-house me-1"></i>Home
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/listing">
                <i className="bi bi-grid me-1"></i>Products
              </a>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown">
                <i className="bi bi-tag me-1"></i>Categories
              </a>
              <ul className="dropdown-menu">
                <li><a className="dropdown-item" href="/categories/electronics">Electronics</a></li>
                <li><a className="dropdown-item" href="/categories/fashion">Fashion</a></li>
                <li><a className="dropdown-item" href="/categories/books">Books</a></li>
                <li><a className="dropdown-item" href="/categories/sports">Sports</a></li>
                <li><hr className="dropdown-divider" /></li>
                <li><a className="dropdown-item" href="/listing">All Products</a></li>
              </ul>
            </li>
          </ul>
          
          <div className="d-flex align-items-center gap-3">
            {/* Search Bar */}
            <form className="d-flex me-3" style={{ minWidth: '250px' }}>
              <input className="form-control me-2" type="search" placeholder="Search products..." />
              <button className="btn btn-outline-light" type="submit">
                <i className="bi bi-search"></i>
              </button>
            </form>

            {/* Cart Button */}
            <button 
              className="btn btn-light position-relative me-2" 
              onClick={() => router.push('/cart')}
            >
              <i className="bi bi-cart3"></i>
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                3
              </span>
            </button>

            {/* User Authentication */}
            {user ? (
              <div className="dropdown">
                <button className="btn btn-light dropdown-toggle d-flex align-items-center" 
                        type="button" data-bs-toggle="dropdown">
                  <i className="bi bi-person-circle me-2"></i>
                  {user.displayName || user.email?.split('@')[0]}
                </button>
                <ul className="dropdown-menu dropdown-menu-end">
                  <li><h6 className="dropdown-header">Welcome back!</h6></li>
                  <li><a className="dropdown-item" href="/profile">
                    <i className="bi bi-person me-2"></i>My Profile
                  </a></li>
                  <li><a className="dropdown-item" href="/orders">
                    <i className="bi bi-bag me-2"></i>My Orders
                  </a></li>
                  <li><a className="dropdown-item" href="/wishlist">
                    <i className="bi bi-heart me-2"></i>Wishlist
                  </a></li>
                  <li><hr className="dropdown-divider" /></li>
                  <li>
                    <button className="dropdown-item" onClick={handleSignOut}>
                      <i className="bi bi-box-arrow-right me-2"></i>Sign Out
                    </button>
                  </li>
                </ul>
              </div>
            ) : (
              <div className="d-flex gap-2">
                <button className="btn btn-outline-light" onClick={() => router.push('/auth/login')}>
                  <i className="bi bi-box-arrow-in-right me-2"></i>Sign In
                </button>
                <button className="btn btn-light" onClick={() => router.push('/auth/register')}>
                  <i className="bi bi-person-plus me-2"></i>Sign Up
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}