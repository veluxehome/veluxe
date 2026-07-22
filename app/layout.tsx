import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingButtons from "@/components/FloatingButtons";
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from "@vercel/speed-insights/next"

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