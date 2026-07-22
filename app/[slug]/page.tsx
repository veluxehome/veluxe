import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { categories, products, blogs } from '@/data';
import Link from 'next/link';
import Image from 'next/image';

// NEXT.JS 15 UYUMLU PROMISE YAPISI
type PageProps = {
  params: Promise<any>;
};

// 1. DİNAMİK SEO META ETİKETLERİ
export async function generateMetadata(props: PageProps): Promise<Metadata> {
  const resolvedParams = await props.params;
  
  // Klasör adı [Slug] (büyük) veya [slug] (küçük) olsa bile URL'yi hatasız yakalar
  const currentSlug = resolvedParams.slug || resolvedParams.Slug || resolvedParams.categorySlug;
  
  const category = categories.find((c) => c.slug === currentSlug);
  if (category) {
    return {
      title: `${category.title} Modelleri | Veluxe Premium`,
      description: `${category.title} koleksiyonumuzdaki lüks ve modern tasarımları keşfedin.`,
    };
  }

  const blog = blogs.find((b) => b.slug === currentSlug);
  if (blog) {
    return {
      title: `${blog.title} | Veluxe Blog`,
      description: blog.excerpt,
      openGraph: {
        title: blog.title,
        description: blog.excerpt,
        images: [blog.coverImage],
        type: 'article',
      }
    };
  }

  return { title: 'Sayfa Bulunamadı | Veluxe' };
}

// 2. SAYFA OLUŞTURUCU
export default async function DynamicRootPage(props: PageProps) {
  const resolvedParams = await props.params;
  
  // Klasör adı [Slug] (büyük) veya [slug] (küçük) olsa bile URL'yi hatasız yakalar
  const currentSlug = resolvedParams.slug || resolvedParams.Slug || resolvedParams.categorySlug;

  // --- A) KATEGORİ İSE ÇALIŞACAK KISIM ---
  const category = categories.find((c) => c.slug === currentSlug);
  if (category) {
    const categoryProducts = products.filter(p => p.categorySlug === category.slug);
    
    return (
      <div className="max-w-[1920px] mx-auto px-4 sm:px-8 xl:px-24 py-12 md:py-20">
        <div className="mb-12 md:mb-20 text-center">
          <h1 className="text-3xl md:text-5xl font-serif font-light text-gray-900 mb-4">{category.title}</h1>
          <p className="text-sm text-gray-500 font-light tracking-[0.2em] uppercase">Premium Koleksiyon</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-16">
          {categoryProducts.map((product) => (
            <Link key={product.slug} href={`/urun/${product.slug}`} className="group flex flex-col cursor-pointer">
              <div className="relative w-full aspect-[4/3] bg-[#f9f9f9] mb-5 overflow-hidden border border-gray-100">
                 {product.images && product.images.length > 0 ? (
                   <Image src={product.images[0]} alt={product.title} fill sizes="(max-width: 768px) 100vw, 320px" className="object-cover transition-transform duration-[2000ms] ease-out group-hover:scale-[1.02]" />
                 ) : (
                    <div className="flex items-center justify-center w-full h-full text-gray-300">Görsel Yok</div>
                 )}
              </div>
              <h4 className="text-sm text-gray-900 font-serif font-light tracking-wide truncate">{product.title}</h4>
              <p className="text-[10px] text-gray-400 mt-1.5 uppercase tracking-[0.2em] font-medium">{product.sku}</p>
            </Link>
          ))}
        </div>
      </div>
    );
  }

  // --- B) BLOG İSE ÇALIŞACAK KISIM ---
  const blog = blogs.find((b) => b.slug === currentSlug);
  if (blog) {
    const jsonLd = {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: blog.title,
      image: [blog.coverImage],
      datePublished: blog.date,
      author: { '@type': 'Organization', name: 'Veluxe Premium' },
      description: blog.excerpt,
    };

    return (
      <>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <article className="max-w-4xl mx-auto px-4 sm:px-8 py-12 md:py-20">
          
          <nav className="flex items-center justify-center gap-2 text-[10px] uppercase tracking-[0.2em] font-medium text-gray-400 mb-10">
            <Link href="/" className="hover:text-gray-900 transition-colors">Anasayfa</Link>
            <span className="text-gray-300">/</span>
            <Link href="/blog" className="hover:text-gray-900 transition-colors">Blog</Link>
            <span className="text-gray-300">/</span>
            <span className="text-gray-900 truncate max-w-[200px]">{blog.title}</span>
          </nav>

          <header className="text-center mb-16">
            <time className="text-[10px] tracking-[0.3em] text-gray-400 uppercase font-medium mb-4 block">
              {new Date(blog.date).toLocaleDateString('tr-TR', { year: 'numeric', month: 'long', day: 'numeric' })}
            </time>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-serif font-light text-gray-900 leading-[1.2] mb-8 text-balance">
              {blog.title}
            </h1>
            {blog.coverImage && (
              <div className="relative w-full aspect-[21/9] bg-[#f9f9f9] overflow-hidden mt-12 border border-gray-100">
                <Image src={blog.coverImage} alt={blog.title} fill sizes="100vw" className="object-cover" priority />
              </div>
            )}
          </header>

          <div 
            className="text-sm md:text-[1.05rem] text-gray-600 font-light leading-relaxed [&>h2]:text-2xl [&>h2]:font-serif [&>h2]:text-gray-900 [&>h2]:mt-12 [&>h2]:mb-6 [&>h3]:text-xl [&>h3]:font-serif [&>h3]:text-gray-900 [&>h3]:mt-10 [&>h3]:mb-4 [&>p]:mb-6 [&>ul]:list-disc [&>ul]:pl-6 [&>ul]:mb-6 [&>ol]:list-decimal [&>ol]:pl-6 [&>ol]:mb-6 [&>li]:mb-2 [&>strong]:font-medium [&>strong]:text-gray-900 [&>a]:text-[#c25b19] [&>a]:underline"
            dangerouslySetInnerHTML={{ __html: blog.content.replace(/\\n/g, '<br/>').replace(/\n/g, '<br/>') }}
          />
        </article>
      </>
    );
  }

  // C) HİÇBİRİ DEĞİLSE 404
  notFound();
}