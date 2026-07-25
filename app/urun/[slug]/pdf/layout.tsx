import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Ürün Kataloğu PDF | Veluxe',
  robots: {
    index: false,
    follow: false,
    nocache: true,
  },
};

export default function PdfLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}