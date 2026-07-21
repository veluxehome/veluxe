// types/index.ts

export interface Category {
  id: string;
  title: string;
  slug: string;
  description?: string;
  coverImage?: string;
}

export interface Product {
  id: string;
  sku: string;
  title: string;
  slug: string; // Örn: ambra-italyan-deri-modern-koltuk-taba
  canonicalSlug?: string; // Ana ürün slug'ı (Farklı renkler için ana ürünü işaret edecek)
  categorySlug: string;
  images: string[]; // 1000x1000 boyutundaki public klasör yolları
  shortDescription: string;
  features: {
    material?: string;
    legs?: string;
    dimensions?: string;
    frame?: string;
    sponge?: string;
  };
  colors: {
    name: string;
    hex: string;
    slug: string; // Renk değiştiğinde yönlendirilecek URL
  }[];
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  date: string;
  excerpt: string;
  content: string; // İleride MDX'e geçirildiğinde burası kullanılacak
  coverImage: string;
}