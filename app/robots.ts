import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/wp-content/', 
        '/wp-includes/', 
        '/sepet/', 
        '/odeme/', 
        '/my-account/', 
        '/*?attribute_pa_*', 
        '/*?gridcookie=*'
      ],
    },
    sitemap: 'https://www.veluxe.com.tr/sitemap.xml',
  };
}