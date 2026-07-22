import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // 1. Eski WooCommerce Sepet, Ödeme ve Hesap Sayfaları (Artık yok)
      { source: '/sepet', destination: '/', permanent: true },
      { source: '/odeme', destination: '/', permanent: true },
      { source: '/my-account', destination: '/', permanent: true },
      { source: '/my-account-2', destination: '/', permanent: true },
      { source: '/magaza', destination: '/koleksiyonlar', permanent: true },
      { source: '/magaza/:path*', destination: '/koleksiyonlar', permanent: true },

      // 2. Eski Renk Filtreleri ve Arşivleri (Örn: /renkler/bordo/... -> /koleksiyonlar)
      { source: '/renkler/:path*', destination: '/koleksiyonlar', permanent: true },

      // 3. WordPress Sistem Kalıntıları, Tema ve Eklenti Yolları (404/5xx Hatalarını Önler)
      { source: '/wp-content/:path*', destination: '/', permanent: true },
      { source: '/wp-includes/:path*', destination: '/', permanent: true },
      { source: '/:path*.php', destination: '/', permanent: true },

      // 4. RSS Feed Uzantıları
      { source: '/:path*/feed', destination: '/', permanent: true },

      // 5. Uncategorized ve Eski Kategoriler
      { source: '/urun-kategori/uncategorized', destination: '/koleksiyonlar', permanent: true },
    ];
  },
};

export default nextConfig;