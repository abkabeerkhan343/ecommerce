'use client';

import { useEffect, useState } from 'react';
import { db } from '../firebase/firebase';
import { collection, getDocs } from 'firebase/firestore';
import Navbar from '../components/Navbar';
import ProductCard from '../components/ProductCard';

export default function ProductListPage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'products'));
        const productList = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProducts(productList);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <>
      <Navbar />
      
      {/* Hero Section */}
      <section className="hero-section bg-gradient bg-primary text-white py-5">
        <div className="container text-center">
          <h1 className="display-5 fw-bold mb-3">All Products</h1>
          <p className="lead mb-4">Discover our complete collection of amazing products</p>
          <div className="row justify-content-center">
            <div className="col-12 col-md-8 col-lg-6">
              <div className="input-group">
                <input type="text" className="form-control" placeholder="Search products..." />
                <button className="btn btn-light" type="button">
                  <i className="bi bi-search"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Grid */}
      <div className="container py-5">
        {products.length > 0 ? (
          <div className="row g-4">
            {products.map(product => (
              <div key={product.id} className="col-12 col-sm-6 col-md-4 col-lg-3">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-5">
            <i className="bi bi-box-seam display-1 text-muted mb-4"></i>
            <h3 className="text-muted">No Products Available</h3>
            <p className="text-muted">Please check your Firebase configuration and ensure the database is seeded with products.</p>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-dark py-5 mt-5">
        <div className="container">
          <div className="row gy-4">
            <div className="col-12 col-md-4">
              <h5 className="text-white">E-Commerce Store</h5>
              <p className="text-muted">Your one-stop shop for everything awesome.</p>
            </div>
            <div className="col-6 col-md-2">
              <h6 className="text-white">Shop</h6>
              <ul className="list-unstyled text-muted">
                <li><a href="#" className="text-decoration-none text-muted">Men</a></li>
                <li><a href="#" className="text-decoration-none text-muted">Women</a></li>
              </ul>
            </div>
            <div className="col-6 col-md-2">
              <h6 className="text-white">Help</h6>
              <ul className="list-unstyled text-muted">
                <li><a href="#" className="text-decoration-none text-muted">Support</a></li>
                <li><a href="#" className="text-decoration-none text-muted">FAQs</a></li>
              </ul>
            </div>
            <div className="col-6 col-md-2">
              <h6 className="text-white">Company</h6>
              <ul className="list-unstyled text-muted">
                <li><a href="#" className="text-decoration-none text-muted">About</a></li>
                <li><a href="#" className="text-decoration-none text-muted">Contact</a></li>
              </ul>
            </div>
            <div className="col-6 col-md-2">
              <h6 className="text-white">Social</h6>
              <ul className="list-unstyled text-muted">
                <li><a href="#" className="text-decoration-none text-muted">Facebook</a></li>
                <li><a href="#" className="text-decoration-none text-muted">Twitter</a></li>
              </ul>
            </div>
          </div>
          <hr className="my-4 border-light" />
          <div className="text-center">
            <p className="text-white mb-0">&copy; 2024 E-Commerce Store. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </>
  );
}
