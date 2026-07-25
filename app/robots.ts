import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // 1. Merchant Center ve Arama Motoru Botu İçin Tam İzin
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: [
          '/sepet/', 
          '/odeme/', 
          '/my-account/',
          '/*/pdf'
        ],
      },
      // 2. Görsel Botu İçin Tam İzin (Ürün resimlerinin Merchant Center'a gitmesi için şart)
      {
        userAgent: 'Googlebot-image',
        allow: '/',
      },
      // 3. Diğer Tüm Botlar İçin Genel Kurallar (wp-content engeli kaldırıldı)
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/sepet/', 
          '/odeme/', 
          '/my-account/', 
          '/*?attribute_pa_*', 
          '/*?gridcookie=*',
          '/*/pdf'
        ],
      }
    ],
    sitemap: 'https://www.veluxe.com.tr/sitemap.xml',
  };
}