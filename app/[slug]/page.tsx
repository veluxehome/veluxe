import { categories, products, blogs } from '@/data';
import ProductTemplate from '@/components/ProductTemplate';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  const categoryPaths = categories.map((c) => ({ slug: c.slug }));
  const productPaths = products.map((p) => ({ slug: p.slug }));
  const blogPaths = blogs.map((b) => ({ slug: b.slug }));

  return [...categoryPaths, ...productPaths, ...blogPaths];
}

// 1. Fonksiyonu 'async' yapıyoruz ve type tanımını 'Promise' olarak değiştiriyoruz
export default async function SlugPage({ params }: { params: Promise<{ slug: string }> }) {
  // 2. 'params' objesini await ile bekleyerek içindeki slug değerini alıyoruz
  const { slug } = await params;

  // 1. Önce Ürünleri Kontrol Et
  const product = products.find((p) => p.slug === slug);
  if (product) {
    return <ProductTemplate product={product} />;
  }

  // 2. Kategori Kontrolü (Şimdilik yer tutucu)
  const category = categories.find((c) => c.slug === slug);
  if (category) {
    return <div className="p-10 text-2xl">Kategori Sayfası Yapım Aşamasında: {category.title}</div>;
  }

  // 3. Blog Kontrolü (Şimdilik yer tutucu)
  const blog = blogs.find((b) => b.slug === slug);
  if (blog) {
    return <div className="p-10 text-2xl">Blog Sayfası Yapım Aşamasında: {blog.title}</div>;
  }

  // Eşleşme yoksa 404 sayfasına yönlendir
  notFound();
}