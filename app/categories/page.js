import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebase/firebase';
import Navbar from '../components/Navbar';
import Link from 'next/link';

// Pre-defined categories
const categories = [
  { id: 'electronics', name: 'Electronics', icon: '💻' },
  { id: 'clothing', name: 'Clothing', icon: '👕' },
  { id: 'books', name: 'Books', icon: '📚' },
  { id: 'home', name: 'Home & Garden', icon: '🏠' },
  { id: 'sports', name: 'Sports', icon: '⚽' },
  { id: 'toys', name: 'Toys', icon: '🎮' }
];

async function getCategoryCount(categoryId) {
  try {
    const q = query(
      collection(db, 'products'),
      where('category', '==', categoryId)
    );
    const snapshot = await getDocs(q);
    return snapshot.size;
  } catch (error) {
    console.error(`Error fetching count for category ${categoryId}:`, error);
    return 0;
  }
}

export default async function Categories() {
  // Get product counts for each category
  const categoriesWithCount = await Promise.all(
    categories.map(async (category) => ({
      ...category,
      count: await getCategoryCount(category.id)
    }))
  );

  return (
    <>
      <Navbar />
      <div className="container py-5">
        <h1 className="text-center mb-5">Product Categories</h1>
        <div className="row g-4">
          {categoriesWithCount.map(category => (
            <div key={category.id} className="col-md-4">
              <Link 
                href={`/categories/${category.id}`}
                className="text-decoration-none"
              >
                <div className="card h-100 hover-shadow">
                  <div className="card-body text-center">
                    <div className="display-4 mb-3">{category.icon}</div>
                    <h2 className="h5 card-title">{category.name}</h2>
                    <p className="card-text text-muted">
                      {category.count} {category.count === 1 ? 'product' : 'products'}
                    </p>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
