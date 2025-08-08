'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function ProductCard({ product }) {
  const router = useRouter();

  return (
    <div className="card product-card h-100 shadow-sm">
      <div style={{ position: 'relative', width: '100%', height: '250px' }}>
        <Image
          src={product.imageUrl || '/placeholder.jpg'}
          alt={product.name}
          fill
          className="product-image"
          style={{ objectFit: 'cover' }}
          loading="lazy"
        />
        {product.featured && (
          <div className="position-absolute top-0 end-0 m-3">
            <span className="badge bg-danger">Featured</span>
          </div>
        )}
      </div>
      <div className="card-body d-flex flex-column">
        <div className="mb-2">
          <span className="badge bg-secondary text-uppercase">{product.category}</span>
        </div>
        <h5 className="card-title fw-bold">{product.name}</h5>
        <p className="card-text text-muted small flex-grow-1">{product.description}</p>
        <div className="mt-auto">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <span className="h5 mb-0 text-primary fw-bold">${product.price}</span>
            <div className="text-warning">
              <i className="bi bi-star-fill"></i>
              <i className="bi bi-star-fill"></i>
              <i className="bi bi-star-fill"></i>
              <i className="bi bi-star-fill"></i>
              <i className="bi bi-star"></i>
              <small className="text-muted ms-1">(4.0)</small>
            </div>
          </div>
          <div className="d-grid gap-2">
            <button
              className="btn btn-primary"
              onClick={() => router.push(`/products/${product.id}`)}
            >
              <i className="bi bi-eye me-2"></i>View Details
            </button>
            <button className="btn btn-outline-success">
              <i className="bi bi-cart-plus me-2"></i>Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}