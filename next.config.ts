import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // 1. Eski WooCommerce Sepet, Ödeme ve Hesap Sayfaları
      { source: '/sepet', destination: '/', permanent: true },
      { source: '/odeme', destination: '/', permanent: true },
      { source: '/my-account', destination: '/', permanent: true },
      { source: '/my-account-2', destination: '/', permanent: true },
      { source: '/magaza', destination: '/koleksiyonlar', permanent: true },
      { source: '/magaza/:path*', destination: '/koleksiyonlar', permanent: true },

      // 2. Eski Renk Filtreleri
      { source: '/renkler/:path*', destination: '/koleksiyonlar', permanent: true },

      // 3. PHP dosyaları ve RSS feed kalıntıları
      { source: '/:path*.php', destination: '/', permanent: true },
      { source: '/:path*/feed', destination: '/', permanent: true },
    ];
  },
  images: {
    unoptimized: true,
  },
};

export default nextConfig;