'use client';

import { useEffect, useState } from 'react';
import { db } from '../../firebase/firebase';
import { collection, getDocs } from 'firebase/firestore';
import ProductCard from '../../components/ProductCard';
import Navbar from '../../components/Navbar';

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
        console.error('Error fetching products:', error.message);
      }
    };

    fetchProducts();
  }, []);

  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <section className="bg-blue-600 text-white py-12 text-center">
        <h1 className="text-4xl font-bold mb-2">All Products</h1>
        <p className="text-lg mb-6">Discover our complete collection of amazing products</p>
        <div className="max-w-xl mx-auto px-4">
          <div className="flex">
            <input
              type="text"
              placeholder="Search products..."
              className="w-full p-3 rounded-l-md outline-none text-black"
            />
            <button className="bg-white text-blue-600 p-3 rounded-r-md">
              <i className="bi bi-search"></i>
            </button>
          </div>
        </div>
      </section>

      {/* Product Grid */}
      <div className="max-w-7xl mx-auto px-4 py-10">
        {products.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {products.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 text-gray-400">
            <i className="bi bi-box-seam text-5xl mb-4"></i>
            <h3 className="text-xl font-semibold">No Products Available</h3>
            <p>Check Firebase configuration or seed the database.</p>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-10 mt-10">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 px-4">
          <div>
            <h4 className="text-xl font-semibold mb-2">E-Commerce Store</h4>
            <p className="text-gray-400">Your one-stop shop for everything awesome.</p>
          </div>
          <div>
            <h5 className="font-semibold mb-2">Shop</h5>
            <ul className="space-y-1 text-gray-400">
              <li><a href="#">Men</a></li>
              <li><a href="#">Women</a></li>
            </ul>
          </div>
          <div>
            <h5 className="font-semibold mb-2">Help</h5>
            <ul className="space-y-1 text-gray-400">
              <li><a href="#">Support</a></li>
              <li><a href="#">FAQs</a></li>
            </ul>
          </div>
          <div>
            <h5 className="font-semibold mb-2">Social</h5>
            <ul className="space-y-1 text-gray-400">
              <li><a href="#">Facebook</a></li>
              <li><a href="#">Twitter</a></li>
            </ul>
          </div>
        </div>
        <div className="text-center mt-8 text-gray-500 text-sm">
          &copy; 2024 E-Commerce Store. All rights reserved.
        </div>
      </footer>
    </>
  );
}
