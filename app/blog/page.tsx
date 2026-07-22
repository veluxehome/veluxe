import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { blogs } from '@/data';

export const metadata: Metadata = {
  title: 'Blog & Tasarım Rehberi | Veluxe Premium',
  description: 'Lüks mobilya dekorasyonu, deri koltuk bakımı ve iç mimari trendleri hakkında uzman rehberler.',
};

export default function BlogListPage() {
  // Yazıları tarihe göre yeniden eskiye sıralıyoruz
  const sortedBlogs = [...blogs].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div className="max-w-[1920px] mx-auto px-4 sm:px-8 xl:px-24 py-16 md:py-24">
      <div className="text-center max-w-3xl mx-auto mb-20">
        <span className="text-[10px] uppercase tracking-[0.3em] text-gray-400 font-medium block mb-4">Yaşam & Stil</span>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-light text-gray-900 tracking-tight mb-6">
          Tasarım Rehberi
        </h1>
        <p className="text-gray-500 font-light leading-relaxed">
          Lüks mobilya dünyasından haberler, deri bakımı sırları ve ilham veren dekorasyon fikirleri.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
        {sortedBlogs.map((blog) => (
          <article key={blog.id} className="group flex flex-col">
            <Link href={`/${blog.slug}`} className="relative w-full aspect-[4/3] bg-[#f9f9f9] mb-6 overflow-hidden block border border-gray-100">
              <Image 
                src={blog.coverImage} 
                alt={blog.title} 
                fill 
                sizes="(max-width: 768px) 100vw, 33vw" 
                className="object-cover transition-transform duration-[2000ms] ease-out group-hover:scale-[1.03]" 
              />
            </Link>
            <div className="flex flex-col flex-grow">
              <time className="text-[9px] tracking-[0.2em] text-gray-400 uppercase font-medium mb-3">
                {new Date(blog.date).toLocaleDateString('tr-TR', { year: 'numeric', month: 'long', day: 'numeric' })}
              </time>
              <Link href={`/${blog.slug}`}>
                <h2 className="text-xl font-serif font-light text-gray-900 leading-snug mb-3 group-hover:opacity-70 transition-opacity">
                  {blog.title}
                </h2>
              </Link>
              <p className="text-sm text-gray-500 font-light leading-relaxed line-clamp-3 mb-6">
                {blog.excerpt}
              </p>
              <Link href={`/${blog.slug}`} className="mt-auto inline-flex items-center text-[10px] uppercase tracking-[0.2em] font-medium text-gray-900 border-b border-gray-900 pb-1 w-max hover:opacity-60 transition-opacity">
                Devamını Oku &rarr;
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}