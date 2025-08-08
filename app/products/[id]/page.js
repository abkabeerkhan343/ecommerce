import { Metadata } from 'next';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/app/firebase/firebase';
import Image from 'next/image';
import Navbar from '@/app/components/Navbar';

// Dynamic metadata generation
export async function generateMetadata({ params: { id } }) {
  const product = await getProduct(id);
  
  return {
    title: product?.name || 'Product Details',
    description: product?.description || 'Product description',
    openGraph: {
      title: product?.name || 'Product Details',
      description: product?.description || 'Product description',
      type: 'website',
      images: [product?.imageUrl || '/placeholder.jpg'],
    }
  };
}

async function getProduct(id) {
  try {
    const docRef = doc(db, 'products', id);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return {
        id: docSnap.id,
        ...docSnap.data()
      };
    }
    return null;
  } catch (error) {
    console.error('Error fetching product:', error);
    return null;
  }
}

// JSON-LD structured data
function generateStructuredData(product) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    image: product.imageUrl,
    offers: {
      '@type': 'Offer',
      price: product.price,
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock'
    }
  };
}

export default async function ProductDetail({ params: { id } }) {
  const product = await getProduct(id);

  if (!product) {
    return <div>Product not found</div>;
  }

  const structuredData = generateStructuredData(product);

  return (
    <main>
      <Navbar />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <div className="container py-5">
        <div className="row">
          <div className="col-md-6">
            <div style={{ position: 'relative', width: '100%', height: '400px' }}>
              <Image
                src={product.imageUrl || '/placeholder.jpg'}
                alt={product.name}
                fill
                style={{ objectFit: 'cover' }}
                loading="lazy"
              />
            </div>
          </div>
          <div className="col-md-6">
            <h1 className="mb-4">{product.name}</h1>
            <p className="text-muted">{product.description}</p>
            <h2 className="h4 mb-4">${product.price}</h2>
            <button className="btn btn-primary">Add to Cart</button>
          </div>
        </div>
      </div>
    </main>
  );
}
