const { onRequest, onCall } = require('firebase-functions/v2/https');
const { onDocumentCreated } = require('firebase-functions/v2/firestore');
const { initializeApp } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');
const { getAuth } = require('firebase-admin/auth');

initializeApp();
const db = getFirestore();
const auth = getAuth();

// Cloud Function: Get featured products
exports.getFeaturedProducts = onCall(async (request) => {
  try {
    const snapshot = await db.collection('products')
      .where('featured', '==', true)
      .limit(3)
      .get();
    
    const products = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    
    return { products };
  } catch (error) {
    throw new Error('Failed to fetch featured products');
  }
});

// Cloud Function: Search products with advanced filtering
exports.searchProducts = onCall(async (request) => {
  const { query, category, priceMin, priceMax } = request.data;
  
  try {
    let ref = db.collection('products');
    
    // Apply filters
    if (category && category !== 'all') {
      ref = ref.where('category', '==', category);
    }
    
    if (query) {
      ref = ref.where('name', '>=', query)
               .where('name', '<=', query + '\uf8ff');
    }
    
    const snapshot = await ref.get();
    let products = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    
    // Client-side price filtering (Firestore doesn't support multiple range queries)
    if (priceMin !== undefined || priceMax !== undefined) {
      products = products.filter(product => {
        const price = product.price;
        return (priceMin === undefined || price >= priceMin) &&
               (priceMax === undefined || price <= priceMax);
      });
    }
    
    return { products };
  } catch (error) {
    throw new Error('Search failed');
  }
});

// Cloud Function: Add to favorites (requires authentication)
exports.addToFavorites = onCall(async (request) => {
  if (!request.auth) {
    throw new Error('Must be authenticated');
  }
  
  const { productId } = request.data;
  const userId = request.auth.uid;
  
  try {
    await db.collection('favorites').doc(`${userId}_${productId}`).set({
      userId,
      productId,
      createdAt: new Date()
    });
    
    return { success: true };
  } catch (error) {
    throw new Error('Failed to add to favorites');
  }
});

// Cloud Function: Remove from favorites
exports.removeFromFavorites = onCall(async (request) => {
  if (!request.auth) {
    throw new Error('Must be authenticated');
  }
  
  const { productId } = request.data;
  const userId = request.auth.uid;
  
  try {
    await db.collection('favorites').doc(`${userId}_${productId}`).delete();
    return { success: true };
  } catch (error) {
    throw new Error('Failed to remove from favorites');
  }
});

// Cloud Function: Get user favorites
exports.getUserFavorites = onCall(async (request) => {
  if (!request.auth) {
    throw new Error('Must be authenticated');
  }
  
  const userId = request.auth.uid;
  
  try {
    const favoritesSnapshot = await db.collection('favorites')
      .where('userId', '==', userId)
      .get();
    
    const productIds = favoritesSnapshot.docs.map(doc => doc.data().productId);
    
    if (productIds.length === 0) {
      return { products: [] };
    }
    
    // Get product details for favorites
    const productsSnapshot = await db.collection('products')
      .where('__name__', 'in', productIds)
      .get();
    
    const products = productsSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    
    return { products };
  } catch (error) {
    throw new Error('Failed to fetch favorites');
  }
});

// Firestore trigger: Update user profile on first login
exports.onUserCreate = onDocumentCreated('users/{userId}', async (event) => {
  const userData = event.data.data();
  const userId = event.params.userId;
  
  try {
    // Initialize user preferences
    await db.collection('users').doc(userId).update({
      preferences: {
        notifications: true,
        newsletter: true
      },
      createdAt: new Date()
    });
    
    console.log(`User profile initialized for ${userId}`);
  } catch (error) {
    console.error('Error initializing user profile:', error);
  }
});

// HTTP Function: Generate sitemap
exports.generateSitemap = onRequest(async (req, res) => {
  try {
    const productsSnapshot = await db.collection('products').get();
    const products = productsSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    
    const baseUrl = 'https://your-domain.com'; // Replace with actual domain
    
    let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${baseUrl}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${baseUrl}/listing</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${baseUrl}/categories</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <priority>0.8</priority>
  </url>`;
    
    products.forEach(product => {
      sitemap += `
  <url>
    <loc>${baseUrl}/products/${product.id}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <priority>0.7</priority>
  </url>`;
    });
    
    sitemap += '\n</urlset>';
    
    res.set('Content-Type', 'application/xml');
    res.send(sitemap);
  } catch (error) {
    res.status(500).send('Error generating sitemap');
  }
});