import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Cursor } from "@/components/ui/Cursor";
import { restaurant } from "@/data/restaurant";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant",
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(restaurant.url),
  title: {
    default: `${restaurant.name} — Omakase · Contemporary Japanese · ${restaurant.city}`,
    template: `%s — ${restaurant.name}`,
  },
  description: restaurant.description,
  openGraph: {
    type: "website",
    siteName: restaurant.name,
    title: `${restaurant.name} — Omakase · Contemporary Japanese`,
    description: restaurant.description,
    images: [{ url: "/images/hero/hero.jpg", width: 1600, height: 2000 }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${restaurant.name} — Omakase · Contemporary Japanese`,
    description: restaurant.description,
    images: ["/images/hero/hero.jpg"],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    name: restaurant.name,
    servesCuisine: "Japanese · Sushi · Omakase",
    description: restaurant.description,
    address: {
      "@type": "PostalAddress",
      streetAddress: restaurant.address,
      addressLocality: restaurant.city,
      addressCountry: "SE",
    },
    telephone: restaurant.phone,
    email: restaurant.email,
    url: restaurant.url,
    openingHours: ["Tu-Th 17:00-23:00", "Fr-Sa 17:00-00:00"],
    acceptsReservations: "True",
    priceRange: "$$$",
  };

  return (
    <html lang="en" className={`${cormorant.variable} ${inter.variable}`}>
      <body className="grain">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <a
          href="#intro"
          className="absolute left-4 top-4 z-[320] -translate-y-full rounded-full border border-gold/40 bg-noir px-4 py-2 text-sm text-ivory transition-transform focus:translate-y-0"
        >
          Skip to content
        </a>
        <Navbar />
        <main>{children}</main>
        <Footer />
        <Cursor />
      </body>
    </html>
  );
}