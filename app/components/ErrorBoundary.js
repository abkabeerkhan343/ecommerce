'use client';

import { useEffect } from 'react';

export default function ErrorBoundary({
  error,
  reset,
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Error:', error);
  }, [error]);

  return (
    <div className="container py-5 text-center">
      <div className="alert alert-danger">
        <h2>Something went wrong!</h2>
        <p>{error.message || 'An unexpected error occurred'}</p>
        <button
          className="btn btn-primary mt-3"
          onClick={reset}
        >
          Try again
        </button>
      </div>
    </div>
  );
}
