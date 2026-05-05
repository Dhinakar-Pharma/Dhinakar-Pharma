import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Dhinakar Pharma | Leading Pharmaceutical Company in Hyderabad",
    template: "%s | Dhinakar Pharma"
  },
  description: "Dhinakar Pharma is a premier pharmaceutical company in Hyderabad, India, dedicated to pioneering health with precision through high-quality clinical and medical products.",
  keywords: ["Dhinakar Pharma", "Pharma Company Hyderabad", "Pharmaceuticals India", "Medical Products", "Healthcare Solutions Hyderabad"],
  openGraph: {
    title: "Dhinakar Pharma | Pioneering Health with Precision",
    description: "Leading pharmaceutical company based in Hyderabad, India, delivering excellence in healthcare.",
    url: "https://dhinakarpharma.in",
    siteName: "Dhinakar Pharma",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "Dhinakar Pharma Logo",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dhinakar Pharma | Pharmaceutical Excellence",
    description: "Pioneering health with precision through clinical expertise.",
    images: ["/logo.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfair.variable} h-full antialiased`}
    >
      <body className="font-sans antialiased bg-white text-gray-900 overflow-x-hidden min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow pt-20 md:pt-24">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
