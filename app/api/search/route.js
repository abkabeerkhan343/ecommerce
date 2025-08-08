import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../firebase/firebase';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const searchQuery = searchParams.get('q');

  if (!searchQuery) {
    return new Response(JSON.stringify({ error: 'Search query is required' }), {
      status: 400,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  try {
    const q = query(
      collection(db, 'products'),
      where('name', '>=', searchQuery),
      where('name', '<=', searchQuery + '\uf8ff')
    );

    const querySnapshot = await getDocs(q);
    const products = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    return new Response(JSON.stringify({ products }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error searching products:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
