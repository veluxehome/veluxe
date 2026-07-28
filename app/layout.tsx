import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingButtons from "@/components/FloatingButtons";
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from "@vercel/speed-insights/next";
import Script from 'next/script';

const inter = Inter({ subsets: ["latin"], display: 'swap', preload: true });
const playfair = Playfair_Display({ subsets: ["latin"], variable: '--font-playfair', display: 'swap', preload: true });

export const metadata: Metadata = {
  metadataBase: new URL('https://www.veluxe.com.tr'),
  title: "Hakiki Deri Koltuk & Gerçek Deri Koltuk Modelleri | Veluxe",
  description: "Özel tasarım hakiki deri koltuk takımları, chester ve berjer modelleri. %100 gerçek deri, el işçiliği ve fırınlanmış gürgen iskeletle lüksü evinize taşıyın.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <head>
        <Script
          strategy="lazyOnload"
          src="https://www.googletagmanager.com/gtag/js?id=G-C2E9WXKQMP"
        />
        <Script
          id="google-gtag"
          strategy="lazyOnload"
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
      {/* KRİTİK DÜZELTME: overflow-x-hidden yerine overflow-x-clip kullanıldı */}
      <body className={`${inter.className} ${playfair.variable} bg-white text-gray-900 antialiased overflow-x-clip w-full max-w-[100vw]`}>
        <Header />
        
        {/* KRİTİK DÜZELTME: flex flex-col kaldırıldı, overflow-x-hidden yerine overflow-x-clip kullanıldı */}
        <main className="min-h-screen pt-24 lg:pt-32 w-full max-w-[100vw] overflow-x-clip block">
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