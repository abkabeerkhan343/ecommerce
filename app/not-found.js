import Link from 'next/link';
import Navbar from './components/Navbar';

export default function NotFound() {
  return (
    <>
      <Navbar />
      <div className="container py-5 text-center">
        <h1 className="display-1 mb-4">404</h1>
        <h2 className="mb-4">Page Not Found</h2>
        <p className="lead mb-4">
          Sorry, we couldn&apos;t find the page you&apos;re looking for.
        </p>
        <Link href="/" className="btn btn-primary">
          Return Home
        </Link>
      </div>
    </>
  );
}
