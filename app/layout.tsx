import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });
const playfair = Playfair_Display({ subsets: ["latin"], variable: '--font-playfair' });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr">
      {/* İki fontu da body class'ına dahil ediyoruz */}
      <body className={`${inter.className} ${playfair.variable}`}>
        {children}
      </body>
    </html>
  );
}