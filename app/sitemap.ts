import { MetadataRoute } from 'next';
import { products, categories, blogs } from '@/data';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.veluxe.com.tr';

  // 1. Ürünlerin Linkleri
  const productUrls = products.map((product) => ({
    url: `${baseUrl}/urun/${product.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  // 2. Kategorilerin Linkleri
  const categoryUrls = categories.map((category) => ({
    url: `${baseUrl}/${category.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }));

  // 3. Blog Yazılarının Linkleri
  const blogUrls = blogs.map((blog) => ({
    url: `${baseUrl}/${blog.slug}`,
    lastModified: new Date(blog.date),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  // 4. Sabit Sayfalar ve Tüm Linkleri Birleştirme
  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/koleksiyonlar`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/iletisim`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    ...categoryUrls,
    ...productUrls,
    ...blogUrls,
  ];
}