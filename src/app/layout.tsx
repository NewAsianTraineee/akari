import type { Metadata } from "next";
import Link from "next/link";
import { Cinzel, Jost } from "next/font/google";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Cursor } from "@/components/ui/Cursor";
import { restaurant } from "@/data/restaurant";
import "./globals.css";

const cinzel = Cinzel({
  subsets: ["latin"],
  variable: "--font-cinzel",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const jost = Jost({
  subsets: ["latin"],
  variable: "--font-jost",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(restaurant.url),
  title: {
    default: `${restaurant.name} — Lyxig bilverkstad i ${restaurant.city}`,
    template: `%s — ${restaurant.name} Bilverkstad`,
  },
  description: restaurant.description,
  openGraph: {
    type: "website",
    siteName: `${restaurant.name} Bilverkstad`,
    title: `${restaurant.name} — Lyxig bilverkstad & servicecenter`,
    description: restaurant.description,
    images: [{ url: "/images/hero/hero.jpg", width: 1600, height: 1067 }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${restaurant.name} — Lyxig bilverkstad & servicecenter`,
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
    "@type": "AutoRepair",
    name: `${restaurant.name} Bilverkstad`,
    description: restaurant.description,
    address: {
      "@type": "PostalAddress",
      streetAddress: restaurant.address,
      addressLocality: "Stockholm",
      addressCountry: "SE",
    },
    telephone: restaurant.phone,
    email: restaurant.email,
    url: restaurant.url,
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "07:00",
        closes: "17:00",
      },
    ],
    priceRange: "$$$",
  };

  return (
    <html lang="sv" className={`${cinzel.variable} ${jost.variable}`}>
      <body className="grain">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Link
          href="/#intro"
          className="absolute left-4 top-4 z-[320] -translate-y-full rounded-full border border-gold/40 bg-noir px-4 py-2 text-sm text-ivory transition-transform focus:translate-y-0"
        >
          Hoppa till innehåll
        </Link>
        <Navbar />
        <main>{children}</main>
        <Footer />
        <Cursor />
      </body>
    </html>
  );
}
