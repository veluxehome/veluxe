import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingButtons from "@/components/FloatingButtons";
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from "@vercel/speed-insights/next";
import Script from 'next/script';

const inter = Inter({ subsets: ["latin"] });
const playfair = Playfair_Display({ subsets: ["latin"], variable: '--font-playfair' });

export const metadata: Metadata = {
  title: "Veluxe | Premium Koltuk Tasarımları",
  description: "Modern, Chester ve lüks koltuk takımları.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <head>
        {/* Google tag (gtag.js) */}
        <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-C2E9WXKQMP"
        />
        <Script
          id="google-gtag"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              
              // Google Analytics
              gtag('config', 'G-C2E9WXKQMP');
              
              // Google Ads
              gtag('config', 'AW-16761042328');
            `,
          }}
        />

        {/* Local SEO - Schema.org Yapısal Veri (LocalBusiness) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FurnitureStore",
              "name": "Veluxe",
              "image": "https://www.veluxe.com.tr/wp-content/uploads/2024/10/ambra-sahneli.png",
              "@id": "https://www.veluxe.com.tr",
              "url": "https://www.veluxe.com.tr",
              "telephone": "+902165768826",
              "email": "info@veluxe.com.tr",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Küçükbakkalköy Mah. Ali Ay Sok. Orkide Apartmanı No:3/1",
                "addressLocality": "Ataşehir",
                "addressRegion": "İstanbul",
                "postalCode": "34750",
                "addressCountry": "TR"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": 40.9820,
                "longitude": 29.1100
              },
              "openingHoursSpecification": {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": [
                  "Monday",
                  "Tuesday",
                  "Wednesday",
                  "Thursday",
                  "Friday",
                  "Saturday"
                ],
                "opens": "09:00",
                "closes": "19:00"
              }
            })
          }}
        />
      </head>
      <body className={`${inter.className} ${playfair.variable} bg-white text-gray-900 antialiased`}>
        <Header />
        
        {/* Header üstte sabit kaldığı için içeriklerin ezilmemesi adına pt-24 (padding-top) eklendi */}
        <main className="min-h-screen pt-24 lg:pt-32">
          {children}
        </main>
        
        <Footer />
        <FloatingButtons />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}