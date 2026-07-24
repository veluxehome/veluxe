import Link from 'next/link';
import { categories, products, blogs } from '@/data';

export const metadata = {
  title: 'Site Haritası | Veluxe Premium',
  description: 'Veluxe Premium web sitesi haritası. Tüm koleksiyonlarımıza, yasal sayfalara, lüks deri ürünlerimize ve blog yazılarımıza buradan kolayca ulaşabilirsiniz.',
};

export default function SitemapPage() {
  return (
    <div className="max-w-[1400px] mx-auto px-4 sm:px-8 xl:px-24 py-16 md:py-24">
      
      {/* BREADCRUMB VE BAŞLIK */}
      <div className="text-center mb-16 md:mb-20">
        <nav className="flex items-center justify-center gap-2 text-[10px] uppercase tracking-[0.2em] font-medium text-gray-400 mb-8">
          <Link href="/" className="hover:text-gray-900 transition-colors">Anasayfa</Link>
          <span className="text-gray-300">/</span>
          <span className="text-gray-900">Site Haritası</span>
        </nav>
        
        <h1 className="text-3xl md:text-5xl font-serif font-light text-gray-900 mb-4">Site Haritası</h1>
        <p className="text-sm text-gray-500 font-light tracking-[0.2em] uppercase">Veluxe Premium</p>
      </div>

      <div className="space-y-20">
        
        {/* 1. BÖLÜM: KURUMSAL VE YASAL SAYFALAR */}
        <section>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24 bg-[#fdfcfb] p-8 md:p-12 border border-gray-100 shadow-sm">
            
            {/* Kurumsal */}
            <div>
              <h2 className="text-sm uppercase tracking-[0.2em] font-medium text-gray-900 border-b border-gray-200 pb-4 mb-6">
                Kurumsal
              </h2>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-5 text-sm font-light text-gray-600">
                <li><Link href="/" className="hover:text-[#c25b19] transition-colors flex items-center gap-3"><span className="text-[#c25b19] text-[8px]">■</span> Anasayfa</Link></li>
                <li><Link href="/koleksiyonlar" className="hover:text-[#c25b19] transition-colors flex items-center gap-3"><span className="text-[#c25b19] text-[8px]">■</span> Koleksiyonlar</Link></li>
                <li><Link href="/kurumsal" className="hover:text-[#c25b19] transition-colors flex items-center gap-3"><span className="text-[#c25b19] text-[8px]">■</span> Hakkımızda</Link></li>
                <li><Link href="/iletisim" className="hover:text-[#c25b19] transition-colors flex items-center gap-3"><span className="text-[#c25b19] text-[8px]">■</span> İletişim</Link></li>
                <li><Link href="/blog" className="hover:text-[#c25b19] transition-colors flex items-center gap-3"><span className="text-[#c25b19] text-[8px]">■</span> Blog</Link></li>
              </ul>
            </div>

            {/* Yasal Sayfalar */}
            <div>
              <h2 className="text-sm uppercase tracking-[0.2em] font-medium text-gray-900 border-b border-gray-200 pb-4 mb-6">
                Yasal Bilgilendirme
              </h2>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-5 text-sm font-light text-gray-600">
                <li><Link href="/yardim#mesafeli-satis" className="hover:text-[#c25b19] transition-colors flex items-center gap-3"><span className="text-[#c25b19] text-[8px]">■</span> Mesafeli Satış Sözleşmesi</Link></li>
                <li><Link href="/yardim#iade" className="hover:text-[#c25b19] transition-colors flex items-center gap-3"><span className="text-[#c25b19] text-[8px]">■</span> İptal ve İade Koşulları</Link></li>
                <li><Link href="/yardim#gizlilik-politikasi" className="hover:text-[#c25b19] transition-colors flex items-center gap-3"><span className="text-[#c25b19] text-[8px]">■</span> Gizlilik Politikası</Link></li>
                <li><Link href="/yardim#kullanim-kosullari" className="hover:text-[#c25b19] transition-colors flex items-center gap-3"><span className="text-[#c25b19] text-[8px]">■</span> Kullanım Koşulları</Link></li>
                <li><Link href="/yardim#kvkk" className="hover:text-[#c25b19] transition-colors flex items-center gap-3"><span className="text-[#c25b19] text-[8px]">■</span> KVKK Aydınlatma Metni</Link></li>
              </ul>
            </div>

          </div>
        </section>

        {/* 2. BÖLÜM: KOLEKSİYONLAR VE ÜRÜNLER (DİNAMİK) */}
        <section>
          <div className="mb-12 text-center">
            <h2 className="text-2xl font-serif font-light text-gray-900 mb-4">Koleksiyonlar ve Modeller</h2>
            <div className="w-12 h-px bg-gray-300 mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16 px-4">
            {categories.map((category) => {
              const categoryProducts = products.filter(p => p.categorySlug === category.slug);
              return (
                <div key={category.slug} className="group">
                  <h3 className="text-lg font-serif text-gray-900 border-b border-gray-100 pb-3 mb-5 group-hover:border-gray-300 transition-colors">
                    <Link href={`/${category.slug}`} className="hover:text-[#c25b19] transition-colors">
                      {category.title}
                    </Link>
                  </h3>
                  <ul className="space-y-4 text-sm font-light text-gray-600">
                    {categoryProducts.map((product) => (
                      <li key={product.slug}>
                        <Link href={`/urun/${product.slug}`} className="hover:text-[#c25b19] transition-colors block truncate">
                          {product.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </section>

        {/* 3. BÖLÜM: BLOG YAZILARI (DİNAMİK) */}
        <section>
          <div className="mb-12 text-center">
            <h2 className="text-2xl font-serif font-light text-gray-900 mb-4">Blog ve İçerikler</h2>
            <div className="w-12 h-px bg-gray-300 mx-auto"></div>
          </div>
          
          <div className="bg-[#fdfcfb] p-8 md:p-12 border border-gray-100 shadow-sm">
            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-6 text-sm font-light text-gray-600">
              {blogs.map((blog) => (
                <li key={blog.slug} className="flex items-start">
                  <span className="text-[#c25b19] mt-1.5 mr-3 text-[10px]">■</span>
                  <Link href={`/${blog.slug}`} className="hover:text-[#c25b19] transition-colors block leading-relaxed">
                    {blog.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>

      </div>
    </div>
  );
}