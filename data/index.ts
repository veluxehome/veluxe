import { Category, BlogPost } from '@/types';
import { products as exportedProducts } from './exported-products'; 
import { blogs as exportedBlogs } from './exported-blogs';

export const products = exportedProducts;

export const menuItems = [
  { name: 'Anasayfa', slug: '' },
  { name: 'Chester Koltuk', slug: 'chester-koltuk-takimlari' },
  { name: 'Modern Koltuk', slug: 'modern-koltuk-takimlari' },
  { name: 'Koltuk Takımları', slug: 'koltuk-takimlari' },
  { name: 'Köşe Koltuk', slug: 'kose-koltuk-takimlari' },
  { name: 'Berjer Modelleri', slug: 'berjer-modelleri' },
  { name: 'Puf Modelleri', slug: 'puf-modelleri' },
  { name: 'İletişim', slug: 'iletisim' },
];

// TİP HATASI ÇÖZÜMÜ EKLENDİ
export const categories: (Category & { image?: string })[] = [
  { 
    id: 'c1', 
    title: 'Chester Koltuk', 
    slug: 'chester-koltuk-takimlari',
    image: products.find(p => p.categorySlug === 'chester-koltuk-takimlari')?.images[0] || ''
  },
  { 
    id: 'c2', 
    title: 'Modern Koltuk', 
    slug: 'modern-koltuk-takimlari',
    image: products.find(p => p.categorySlug === 'modern-koltuk-takimlari')?.images[0] || ''
  },
  { 
    id: 'c3', 
    title: 'Koltuk Takımları', 
    slug: 'koltuk-takimlari',
    image: products.find(p => p.categorySlug === 'koltuk-takimlari')?.images[0] || ''
  },
  { 
    id: 'c4', 
    title: 'Köşe Koltuk', 
    slug: 'kose-koltuk-takimlari',
    image: products.find(p => p.categorySlug === 'kose-koltuk-takimlari')?.images[0] || ''
  },
  { 
    id: 'c5', 
    title: 'Berjer Modelleri', 
    slug: 'berjer-modelleri',
    image: products.find(p => p.categorySlug === 'berjer-modelleri')?.images[0] || ''
  },
  { 
    id: 'c6', 
    title: 'Puf Modelleri', 
    slug: 'puf-modelleri',
    image: products.find(p => p.categorySlug === 'puf-modelleri')?.images[0] || ''
  },
];

export const blogs: BlogPost[] = exportedBlogs;