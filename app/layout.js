import { Geist, Geist_Mono } from "next/font/google";
import { AuthProvider } from "./contexts/AuthContext";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "E-Commerce Store - Your One-Stop Shop",
  description: "Discover amazing products at unbeatable prices. Shop electronics, fashion, books, and more with free shipping on orders over $50.",
  keywords: "e-commerce, online shopping, electronics, fashion, books, sports",
  authors: [{ name: "E-Commerce Store" }],
  openGraph: {
    title: "E-Commerce Store - Your One-Stop Shop",
    description: "Discover amazing products at unbeatable prices",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
