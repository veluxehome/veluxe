// data/index.ts
import { Category, Product, BlogPost } from '@/types';

export const categories: Category[] = [
  {
    id: 'c1',
    title: 'Chester Koltuk Takımları',
    slug: 'chester-koltuk-takimlari',
  },
  {
    id: 'c2',
    title: 'Modern Koltuk',
    slug: 'modern-koltuk',
  }
];

// data/index.ts (ilgili kısım)

export const products: Product[] = [
  {
    id: 'p1',
    sku: 'VX-036',
    title: 'Ambra İtalyan Deri Chester Koltuk',
    slug: 'ambra-italyan-deri-chester-koltuk',
    categorySlug: 'modern-koltuk', // Kategorisi Modern Koltuk
    images: [
      '/images/products/ambra/ambra-sahneli.webp', 
      '/images/products/ambra/ambra-1.webp', 
      '/images/products/ambra/ambra-2.webp',
      '/images/products/ambra/ambra-3.webp'
    ],
    shortDescription: 'Hakiki deriden vazgeçemeyenlerin tercihi Ambra. Yaşam alanınıza değer katan modern tasarımıyla evinizin veya ofisinizin baş köşesine layık.',
    features: {
      material: '%100 Orijinal İthal Dana Derisinden Üretilmiştir.',
      legs: 'Ahşap Tornado Ayaklar',
      sponge: 'Konfor Tercihi İçin 35 DNS Soft Sünger Kullanılmıştır.',
      frame: 'Fırınlanmış Gürgen Ağacı'
    },
    colors: [
      { name: 'Taba', hex: '#b35d20', slug: 'ambra-italyan-deri-chester-koltuk' },
      { name: 'Siyah', hex: '#000000', slug: 'ambra-italyan-deri-chester-koltuk-siyah' }
    ]
  },
  {
    id: 'p1-siyah',
    sku: 'VX-036-B',
    title: 'Ambra İtalyan Deri Chester Koltuk (Siyah)',
    slug: 'ambra-italyan-deri-chester-koltuk-siyah',
    canonicalSlug: 'ambra-italyan-deri-chester-koltuk', // SEO: Asıl ürüne işaret eder
    categorySlug: 'modern-koltuk',
    images: [
      '/images/products/ambra/ambra-black-1.webp' // Tek resim
    ],
    shortDescription: 'Siyahın asaleti ile Ambra. Yaşam alanınıza değer katan modern tasarımıyla evinizin veya ofisinizin baş köşesine layık.',
    features: {
      material: '%100 Orijinal İthal Dana Derisinden Üretilmiştir.',
      legs: 'Siyah Mat Metal Ayaklar',
      sponge: '35 DNS Soft Sünger.',
    },
    colors: [
      { name: 'Taba', hex: '#b35d20', slug: 'ambra-italyan-deri-chester-koltuk' },
      { name: 'Siyah', hex: '#000000', slug: 'ambra-italyan-deri-chester-koltuk-siyah' }
    ]
  }
];

export const blogs: BlogPost[] = [
  {
    id: 'b1',
    title: 'Bahçeşehir Koltuk Döşeme ve Tamiri',
    slug: 'bahcesehir-koltuk-doseme',
    date: '2026-07-21',
    excerpt: 'Bahçeşehir bölgesinde eski koltuklarınızı nasıl yenileyebileceğinize dair ipuçları.',
    content: '<p>İçerik buraya gelecek...</p>',
    coverImage: '/images/blog/bahcesehir-doseme.jpg'
  }
];