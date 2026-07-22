'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useRef, useEffect } from 'react';
import { products, categories } from '@/data';

export default function HomePage() {
  const vitrinProducts = products.slice(0, 8);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Otomatik kaydırma ve sonsuz döngü mantığı
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    let intervalId: NodeJS.Timeout;

    const startAutoScroll = () => {
      intervalId = setInterval(() => {
        if (!container) return;
        const { scrollLeft, scrollWidth, clientWidth } = container;
        
        // Eğer sona geldiyse başa dön, gelmediyse bir sonraki karta kaydır
        if (scrollLeft + clientWidth >= scrollWidth - 10) {
          container.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          container.scrollBy({ left: 350, behavior: 'smooth' });
        }
      }, 3500); // 3.5 saniyede bir kaydırır
    };

    startAutoScroll();

    // Kullanıcı fare ile üzerine gelince otomatik kaydırmayı durdur
    const handleMouseEnter = () => clearInterval(intervalId);
    const handleMouseLeave = () => startAutoScroll();

    container.addEventListener('mouseenter', handleMouseEnter);
    container.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      clearInterval(intervalId);
      if (container) {
        container.removeEventListener('mouseenter', handleMouseEnter);
        container.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, []);

  // Ok butonları için kaydırma fonksiyonları
  const scrollLeftHandler = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -350, behavior: 'smooth' });
    }
  };

  const scrollRightHandler = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 350, behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* 1. BÖLÜM: Tam Ekran Sinematik Video Hero Alanı */}
      <section className="relative w-full h-screen -mt-24 lg:-mt-32 flex items-center justify-center overflow-hidden bg-black">
        
        <video 
          autoPlay 
          loop 
          muted 
          playsInline 
          className="absolute inset-0 w-full h-full object-cover z-0 opacity-90 pointer-events-none"
        >
          <source src="/videos/veluxe.mp4" type="video/mp4" />
          Tarayıcınız video etiketini desteklemiyor.
        </video>

        <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/80 via-[#050505]/30 to-[#050505]/90 z-10 pointer-events-none"></div>
        
        <div className="relative z-30 flex flex-col items-center text-center px-4 max-w-4xl mx-auto mt-16 pointer-events-auto">
          <h1 className="text-4xl md:text-5xl lg:text-7xl text-white font-serif font-light tracking-tight mb-6 drop-shadow-xl text-balance">
            Zamansız Zarafet ve Konfor
          </h1>
          
          <p className="text-xs md:text-sm text-gray-300 font-light tracking-[0.25em] uppercase mb-10 drop-shadow-md max-w-2xl leading-relaxed">
            Premium malzemeler ve kusursuz işçilik ile yaşam alanlarınıza değer katan modern tasarımları keşfedin.
          </p>
          
          {/* YÖNLENDİRME 1: Koleksiyonlar sayfasına gider */}
          <Link 
            href="/koleksiyonlar"
            className="group relative overflow-hidden bg-transparent border border-white/70 hover:border-white text-white py-4 px-10 text-[11px] tracking-[0.2em] uppercase font-medium transition-all duration-500 cursor-pointer"
          >
            <span className="relative z-10 transition-colors duration-500 group-hover:text-black">Koleksiyonu İncele</span>
            <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out z-0"></div>
          </Link>
        </div>

        {/* YÖNLENDİRME 2: Seçkin Modeller bölümüne (aşağıya) kaydırır */}
        <a 
          href="#seckin-modeller" 
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2 animate-bounce cursor-pointer group pointer-events-auto"
        >
          <span className="text-[9px] uppercase tracking-[0.3em] text-white/50 group-hover:text-white transition-colors duration-300">Keşfet</span>
          <svg className="w-5 h-5 text-white/50 group-hover:text-white transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </a>
      </section>

      {/* 2. BÖLÜM: Otomatik Kayan ve Oklarla/Mouse ile Kontrol Edilebilen Koleksiyon Carousel'i */}
      <section className="py-24 md:py-32 bg-white overflow-hidden">
        <div className="max-w-[1920px] mx-auto px-4 sm:px-8 xl:px-24">
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
            <div>
              <span className="text-[10px] uppercase tracking-[0.3em] text-gray-400 font-medium block mb-3">Tasarım Dünyası</span>
              <h2 className="text-2xl md:text-4xl font-serif font-light text-gray-900 tracking-tight">Koleksiyonlarımızı Keşfedin</h2>
            </div>
            
            {/* Navigasyon Ok Butonları */}
            <div className="flex items-center gap-3">
              <button 
                onClick={scrollLeftHandler}
                aria-label="Önceki Koleksiyon"
                className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center text-gray-800 hover:bg-black hover:text-white hover:border-black transition-all duration-300 cursor-pointer"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button 
                onClick={scrollRightHandler}
                aria-label="Sonraki Koleksiyon"
                className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center text-gray-800 hover:bg-black hover:text-white hover:border-black transition-all duration-300 cursor-pointer"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>

          {/* Kaydırılabilir Alan */}
          <div 
            ref={scrollContainerRef}
            className="flex overflow-x-auto gap-6 md:gap-10 pb-6 snap-x snap-mandatory scrollbar-hide cursor-grab active:cursor-grabbing select-none"
          >
            {categories.map((cat: any, idx) => (
              <Link 
                key={cat.id} 
                href={`/${cat.slug}`}
                className="w-[85vw] sm:w-[50vw] md:w-[400px] lg:w-[30vw] shrink-0 snap-center group relative aspect-[4/5] bg-[#f7f7f5] overflow-hidden flex flex-col justify-end p-8 md:p-12 border border-gray-100/60"
              >
                {cat.image && (
                  <Image 
                    src={cat.image} 
                    alt={cat.title} 
                    fill 
                    sizes="(max-width: 768px) 85vw, 33vw"
                    className="object-cover transition-transform duration-[2000ms] ease-out group-hover:scale-110 pointer-events-none" 
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-95 transition-opacity duration-500 z-10"></div>
                <span className="absolute top-8 left-8 text-[12px] text-white/70 tracking-widest font-mono z-20">
                  0{idx + 1}
                </span>
                <div className="relative z-20 transform group-hover:-translate-y-3 transition-transform duration-700">
                  <h3 className="text-2xl md:text-3xl font-serif font-light text-white leading-snug mb-4">
                    {cat.title}
                  </h3>
                  <span className="inline-flex items-center text-[10px] uppercase tracking-[0.2em] text-white/80 group-hover:text-white border-b border-white/30 group-hover:border-white pb-1 transition-colors">
                    İncele <span className="ml-2 transform group-hover:translate-x-2 transition-transform duration-500">&rarr;</span>
                  </span>
                </div>
              </Link>
            ))}
          </div>

        </div>
      </section>

      {/* 3. BÖLÜM: Vitrin Ürünleri */}
      <section id="seckin-modeller" className="py-24 bg-[#faf9f5] border-t border-gray-100 scroll-mt-24">
        <div className="max-w-[1920px] mx-auto px-4 sm:px-8 xl:px-24">
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
            <div>
              <span className="text-[10px] uppercase tracking-[0.3em] text-gray-400 font-medium block mb-3">Özenle Tasarlandı</span>
              <h2 className="text-2xl md:text-4xl font-serif font-light text-gray-900 tracking-tight">Seçkin Modeller</h2>
            </div>
            
            {/* YÖNLENDİRME 3: Tüm koleksiyonu gör butonu */}
            <Link 
              href="/koleksiyonlar" 
              className="text-[10px] uppercase tracking-[0.25em] font-medium text-gray-900 border-b border-gray-900 pb-1 hover:opacity-60 transition-opacity"
            >
              Tüm Koleksiyonu Gör &rarr;
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
            {vitrin.map((product, i) => ( // Düzeltilmiş referans
              <Link 
                key={`${product.slug}-${i}`} 
                href={`/urun/${product.slug}`} 
                className="group flex flex-col cursor-pointer bg-white p-4 md:p-6 border border-gray-100 shadow-[0_2px_15px_rgba(0,0,0,0.02)]"
              >
                <div className="relative w-full aspect-[4/3] bg-[#f9f9f9] mb-6 overflow-hidden">
                  {product.images && product.images.length > 0 ? (
                    <Image src={product.images[0]} alt={product.title} fill sizes="(max-width: 768px) 100vw, 25vw" className="object-cover transition-transform duration-[2000ms] ease-out group-hover:scale-[1.03]" />
                  ) : (
                    <div className="flex items-center justify-center w-full h-full text-gray-300">Görsel Yok</div>
                  )}
                </div>
                <div className="flex flex-col flex-grow justify-between">
                  <div>
                    <h3 className="text-base text-gray-900 font-serif font-light tracking-wide leading-snug group-hover:opacity-70 transition-opacity line-clamp-1">
                      {product.title}
                    </h3>
                    <p className="text-[10px] text-gray-400 mt-2 uppercase tracking-[0.2em] font-medium">
                      {product.sku}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>

        </div>
      </section>

      {/* 4. BÖLÜM: Marka Değeri */}
      <section className="py-28 bg-[#151515] text-white">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-8 text-center">
          <span className="text-[10px] uppercase tracking-[0.3em] text-gray-400 block mb-4">Veluxe İşçiliği</span>
          <h2 className="text-3xl md:text-5xl font-serif font-light mb-8 text-balance">
            Sanat ile Konforun Buluştuğu Nokta
          </h2>
          <p className="text-sm md:text-base text-gray-400 font-light max-w-2xl mx-auto leading-relaxed mb-12">
            Her bir parça; fırınlanmış gürgen iskeletler, yüksek DNS soft süngerler ve birinci sınıf ithal derilerle tamamen size özel olarak el işçiliğiyle üretilir.
          </p>
          <Link 
            href="/iletisim" 
            className="inline-block bg-white text-black py-4 px-10 text-[11px] uppercase tracking-[0.2em] font-medium hover:bg-gray-100 transition-colors"
          >
            Özel Tasarım Talebi
          </Link>
        </div>
      </section>
    </>
  );
}