import { Metadata } from 'next';

// Default metadata for the application
export const defaultMetadata: Metadata = {
  title: {
    default: 'E-Commerce Store',
    template: '%s | E-Commerce Store',
  },
  description: 'Find amazing products at great prices',
  keywords: ['ecommerce', 'shop', 'online store', 'products'],
  authors: [{ name: 'Your Name' }],
  viewport: 'width=device-width, initial-scale=1',
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-icon.png',
  },
  manifest: '/site.webmanifest',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://your-domain.com',
    siteName: 'E-Commerce Store',
    images: [{
      url: '/og-image.jpg',
      width: 1200,
      height: 630,
      alt: 'E-Commerce Store',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'E-Commerce Store',
    description: 'Find amazing products at great prices',
    images: ['/twitter-image.jpg'],
  },
};
