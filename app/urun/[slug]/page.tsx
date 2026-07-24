import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { products } from '@/data';
import ProductTemplate from '@/components/ProductTemplate';

export async function generateStaticParams() {
  return products.map((product) => ({
    slug: product.slug,
  }));
}

// Dinamik SEO Meta Etiketleri
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);
  
  if (!product) return { title: 'Ürün Bulunamadı | Veluxe' };

  // HTML etiketlerini temizleyerek pürüzsüz bir meta açıklaması oluşturuyoruz
  const cleanDescription = product.shortDescription.replace(/<[^>]*>?/gm, '').replace(/\\n/g, ' ').substring(0, 160);

  return {
    title: `${product.title} - Hakiki Deri Koltuk | Veluxe`,
    description: `${product.title}. Fırınlanmış gürgen iskelet ve gerçek deri garantisiyle üretilen özel tasarım deri koltuk. Mekanınıza özel ölçü ve renk seçenekleriyle.`,
    openGraph: {
      title: product.title,
      description: cleanDescription,
      images: product.images && product.images.length > 0 ? [product.images[0]] : [],
      type: 'website',
    },
    alternates: {
      canonical: `https://www.veluxe.com.tr/urun/${product.slug}`
    }
  };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);
  
  if (!product) {
    notFound();
  }

  // Google için JSON-LD Yapısal Veri (Zengin Sonuçlar)
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.title,
    image: product.images && product.images.length > 0 ? product.images[0] : '',
    description: product.shortDescription.replace(/<[^>]*>?/gm, ''),
    sku: product.sku,
    brand: {
      '@type': 'Brand',
      name: 'Veluxe'
    },
    offers: {
      '@type': 'Offer',
      availability: 'https://schema.org/InStock',
      priceCurrency: 'TRY',
      price: '0.00', // Fiyatlarınız özel olduğu için 0 tutuyoruz
      url: `https://www.veluxe.com.tr/urun/${product.slug}`
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ProductTemplate product={product} />
    </>
  );
}