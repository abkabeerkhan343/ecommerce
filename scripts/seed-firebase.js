const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');
const serviceAccount = require('../app/firebase/serviceAccount.json');

// Initialize Firebase Admin
const app = initializeApp({
  credential: cert(serviceAccount),
  databaseURL: `https://${serviceAccount.project_id}.firebaseio.com`
});

const db = getFirestore(app);

// Sample product data
const products = [
  {
    name: 'Premium Wireless Headphones',
    description: 'High-quality wireless headphones with active noise cancellation, 30-hour battery life, and premium sound quality. Perfect for music lovers and professionals.',
    price: 199.99,
    category: 'electronics',
    imageUrl: 'https://picsum.photos/400/300?random=1',
    featured: true,
    inStock: true,
    rating: 4.5,
    reviewCount: 128
  },
  {
    name: 'Smart Fitness Watch',
    description: 'Advanced fitness tracking watch with heart rate monitoring, GPS, sleep tracking, and 7-day battery life. Compatible with iOS and Android.',
    price: 149.99,
    category: 'electronics',
    imageUrl: 'https://picsum.photos/400/301?random=2',
    featured: true,
    inStock: true,
    rating: 4.3,
    reviewCount: 89
  },
  {
    name: 'Designer Leather Bag',
    description: 'Elegant handcrafted leather bag made from premium materials. Perfect for work, travel, or everyday use. Available in multiple colors.',
    price: 299.99,
    category: 'clothing',
    imageUrl: 'https://picsum.photos/400/302?random=3',
    featured: true,
    inStock: true,
    rating: 4.7,
    reviewCount: 156
  },
  {
    name: 'Organic Coffee Blend',
    description: 'Premium organic coffee blend sourced from sustainable farms. Rich, full-bodied flavor with notes of chocolate and caramel.',
    price: 24.99,
    category: 'home',
    imageUrl: 'https://picsum.photos/400/303?random=4',
    featured: false,
    inStock: true,
    rating: 4.4,
    reviewCount: 67
  },
  {
    name: 'Bestselling Novel',
    description: 'Award-winning contemporary fiction novel that has captured readers worldwide. A compelling story of love, loss, and redemption.',
    price: 16.99,
    category: 'books',
    imageUrl: 'https://picsum.photos/400/304?random=5',
    featured: false,
    inStock: true,
    rating: 4.6,
    reviewCount: 234
  },
  {
    name: 'Yoga Mat Premium',
    description: 'Eco-friendly yoga mat made from natural materials. Non-slip surface, extra thick cushioning, and includes carrying strap.',
    price: 79.99,
    category: 'sports',
    imageUrl: 'https://picsum.photos/400/305?random=6',
    featured: false,
    inStock: true,
    rating: 4.2,
    reviewCount: 43
  },
  {
    name: 'Wireless Gaming Mouse',
    description: 'High-precision gaming mouse with customizable RGB lighting, programmable buttons, and ultra-fast response time.',
    price: 89.99,
    category: 'electronics',
    imageUrl: 'https://picsum.photos/400/306?random=7',
    featured: false,
    inStock: true,
    rating: 4.5,
    reviewCount: 92
  },
  {
    name: 'Casual Cotton T-Shirt',
    description: 'Comfortable 100% cotton t-shirt in various colors. Perfect fit and soft texture for everyday wear.',
    price: 19.99,
    category: 'clothing',
    imageUrl: 'https://picsum.photos/400/307?random=8',
    featured: false,
    inStock: true,
    rating: 4.1,
    reviewCount: 78
  },
  {
    name: 'Essential Oils Set',
    description: 'Complete set of therapeutic grade essential oils including lavender, eucalyptus, peppermint, and tea tree.',
    price: 49.99,
    category: 'home',
    imageUrl: 'https://picsum.photos/400/308?random=9',
    featured: false,
    inStock: true,
    rating: 4.3,
    reviewCount: 56
  },
  {
    name: 'Programming Guide',
    description: 'Comprehensive guide to modern web development. Covers JavaScript, React, Node.js, and deployment strategies.',
    price: 39.99,
    category: 'books',
    imageUrl: 'https://picsum.photos/400/309?random=10',
    featured: false,
    inStock: true,
    rating: 4.8,
    reviewCount: 145
  },
  {
    name: 'Running Shoes',
    description: 'Professional running shoes with advanced cushioning technology, breathable mesh upper, and durable rubber sole.',
    price: 129.99,
    category: 'sports',
    imageUrl: 'https://picsum.photos/400/310?random=11',
    featured: false,
    inStock: true,
    rating: 4.4,
    reviewCount: 203
  },
  {
    name: 'Board Game Collection',
    description: 'Classic board game collection perfect for family game nights. Includes 5 popular games in one package.',
    price: 59.99,
    category: 'toys',
    imageUrl: 'https://picsum.photos/400/311?random=12',
    featured: false,
    inStock: true,
    rating: 4.6,
    reviewCount: 87
  }
];

async function seedProducts() {
  try {
    console.log('Starting to seed Firestore with products...');
    
    for (const product of products) {
      await db.collection('products').add(product);
      console.log(`Added product: ${product.name}`);
    }
    
    console.log('Successfully seeded all products!');
    console.log(`Total products added: ${products.length}`);
    
  } catch (error) {
    console.error('Error seeding products:', error);
  } finally {
    process.exit();
  }
}

seedProducts();