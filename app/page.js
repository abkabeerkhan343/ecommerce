'use client';

import Image from 'next/image';
import Link from 'next/link';
import Navbar from './components/Navbar';
import ProductCard from './components/ProductCard';


const featuredProducts = [
  {
    id: '1',
    name: 'Premium Wireless Headphones',
    description: 'High-quality wireless headphones with noise cancellation',
    price: 199.99,
    imageUrl: 'https://picsum.photos/400/300',
    category: 'electronics',
    featured: true,
  },
  {
    id: '2',
    name: 'Smart Fitness Watch',
    description: 'Track your fitness goals with this advanced smartwatch',
    price: 149.99,
    imageUrl: 'https://picsum.photos/400/301',
    category: 'electronics',
    featured: true,
  },
  {
    id: '3',
    name: 'Designer Leather Bag',
    description: 'Elegant leather bag for everyday use',
    price: 299.99,
    imageUrl: 'https://picsum.photos/400/302',
    category: 'fashion',
    featured: true,
  },
];

export default function Home() {
  return (
    <main>
      <Navbar />
      
      {/* Hero Section */}
      <section className="hero-section py-5 mb-5" style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white'
      }}>
        <div className="container text-center">
          <h1 className="display-4 fw-bold mb-4">Welcome to Our Store</h1>
          <p className="lead mb-4">Discover amazing products at unbeatable prices</p>
          <Link href="/listing" className="btn btn-light btn-lg">
            Shop Now <i className="bi bi-arrow-right ms-2"></i>
          </Link>
        </div>
      </section>

      <div className="container py-5">
        <div className="row mb-5">
          <div className="col-md-8 mx-auto text-center">
            <h2 className="fw-bold mb-3">Featured Products</h2>
            <p className="text-muted">Check out our hand-picked selection of premium products</p>
          </div>
        </div>
        
        <div className="row g-4">
          {featuredProducts.map(product => (
            <div key={product.id} className="col-lg-4 col-md-6">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
        
        {/* Features Section */}
        <div className="row mt-5 pt-5">
          <div className="col-md-4 text-center mb-4">
            <div className="feature-icon bg-primary text-white rounded-circle mx-auto mb-3 d-flex align-items-center justify-content-center" style={{width: '80px', height: '80px'}}>
              <i className="bi bi-truck fs-3"></i>
            </div>
            <h5>Free Shipping</h5>
            <p className="text-muted">Free shipping on orders over $50</p>
          </div>
          <div className="col-md-4 text-center mb-4">
            <div className="feature-icon bg-success text-white rounded-circle mx-auto mb-3 d-flex align-items-center justify-content-center" style={{width: '80px', height: '80px'}}>
              <i className="bi bi-shield-check fs-3"></i>
            </div>
            <h5>Secure Payment</h5>
            <p className="text-muted">100% secure and encrypted payments</p>
          </div>
          <div className="col-md-4 text-center mb-4">
            <div className="feature-icon bg-info text-white rounded-circle mx-auto mb-3 d-flex align-items-center justify-content-center" style={{width: '80px', height: '80px'}}>
              <i className="bi bi-arrow-return-left fs-3"></i>
            </div>
            <h5>Easy Returns</h5>
            <p className="text-muted">30-day return policy for all items</p>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="bg-dark text-white py-5 mt-5">
        <div className="container">
          <div className="row">
            <div className="col-md-4 mb-4">
              <h5 className="text-primary">E-Commerce Store</h5>
              <p className="text-white">Your trusted partner for quality products and exceptional service.</p>
              <div className="d-flex gap-3">
                <a href="#" className="text-white"><i className="bi bi-facebook"></i></a>
                <a href="#" className="text-white"><i className="bi bi-twitter"></i></a>
                <a href="#" className="text-white"><i className="bi bi-instagram"></i></a>
                <a href="#" className="text-white"><i className="bi bi-linkedin"></i></a>
              </div>
            </div>
            <div className="col-md-2 mb-4">
              <h6 className="text-white">Shop</h6>
              <ul className="list-unstyled">
                <li><Link href="/categories/electronics" className="text-white ">Electronics</Link></li>
                <li><Link href="/categories/fashion" className="text-white ">Fashion</Link></li>
                <li><Link href="/categories/books" className="text-white ">Books</Link></li>
                <li><Link href="/categories/sports" className="text-white ">Sports</Link></li>
              </ul>
            </div>
            <div className="col-md-2 mb-4">
              <h6 className="text-white">Support</h6>
              <ul className="list-unstyled">
                <li><a href="#" className="text-white ">Help Center</a></li>
                <li><a href="#" className="text-white ">Contact Us</a></li>
                <li><a href="#" className="text-white ">Shipping</a></li>
                <li><a href="#" className="text-white ">Returns</a></li>
              </ul>
            </div>
            <div className="col-md-2 mb-4">
              <h6 className="text-white">Company</h6>
              <ul className="list-unstyled">
                <li><a href="#" className="text-white ">About</a></li>
                <li><a href="#" className="text-white ">Careers</a></li>
                <li><a href="#" className="text-white ">Press</a></li>
                <li><a href="#" className="text-white ">Blog</a></li>
              </ul>
            </div>
            <div className="col-md-2 mb-4">
              <h6 className="text-white">Legal</h6>
              <ul className="list-unstyled">
                <li><a href="#" className="text-white ">Privacy</a></li>
                <li><a href="#" className="text-white ">Terms</a></li>
                <li><a href="#" className="text-white ">Cookies</a></li>
                <li><a href="#" className="text-white ">Security</a></li>
              </ul>
            </div>
          </div>
          <hr className="my-4" />
          <div className="text-center">
            <p className="text-white mb-0">&copy; 2025 E-Commerce Store. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
