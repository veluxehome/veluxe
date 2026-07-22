import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { categories } from '@/data';

export const metadata: Metadata = {
  title: 'Koleksiyonlar | Veluxe Premium',
  description: 'Veluxe lüks mobilya koleksiyonlarını ve zamansız tasarımlarımızı keşfedin.',
};

export default function CollectionsPage() {
  return (
    <div className="max-w-[1920px] mx-auto px-4 sm:px-8 xl:px-24 py-16 md:py-24">
      
      {/* BAŞLIK ALANI */}
      <div className="text-center max-w-3xl mx-auto mb-20 md:mb-32">
        <span className="text-[10px] uppercase tracking-[0.3em] text-gray-400 font-medium block mb-4">Tasarımlarımız</span>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-light text-gray-900 tracking-tight mb-6">
          Premium Koleksiyonlar
        </h1>
        <p className="text-gray-500 font-light leading-relaxed">
          Yaşam alanlarınıza değer katacak, el işçiliği ve üstün kaliteli malzemelerle üretilmiş zamansız mobilya konseptlerini inceleyin.
        </p>
      </div>

      {/* DEVASA KOLEKSİYON GRİDİ */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
        {categories.map((category: any, index) => (
          <Link 
            key={category.id} 
            href={`/${category.slug}`}
            className="group relative aspect-square md:aspect-[4/3] bg-[#f9f9f9] overflow-hidden flex flex-col justify-center items-center text-center p-8 border border-gray-100"
          >
            {category.image && (
              <Image 
                src={category.image} 
                alt={category.title} 
                fill 
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover transition-transform duration-[3000ms] ease-out group-hover:scale-105" 
              />
            )}
            
            {/* Karartma Perdesi */}
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-colors duration-700 z-10"></div>
            
            {/* İçerik */}
            <div className="relative z-20 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-700">
              <span className="text-[10px] uppercase tracking-[0.4em] text-white/70 block mb-4">
                0{index + 1}
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-light text-white mb-6 tracking-wide drop-shadow-lg">
                {category.title}
              </h2>
              <span className="inline-block border border-white/50 text-white py-3 px-8 text-[10px] uppercase tracking-[0.2em] group-hover:bg-white group-hover:text-black transition-all duration-500">
                Seriyi İncele
              </span>
            </div>
          </Link>
        ))}
      </div>
      
    </div>
  );
}