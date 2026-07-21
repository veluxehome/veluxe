import Link from 'next/link';
import { Product } from '@/types';
import ProductGallery from './ProductGallery';

export default function ProductTemplate({ product }: { product: Product }) {
  const waMessage = encodeURIComponent(`Merhaba, ${product.title} (Kod: ${product.sku}) hakkında fiyat ve detaylı bilgi almak istiyorum.`);
  const waUrl = `https://wa.me/905555555555?text=${waMessage}`;

  return (
    <div className="max-w-[1500px] mx-auto px-4 sm:px-8 lg:px-16 py-16 md:py-24">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-32">
        
        {/* Sol: Yüzen Görsel Galerisi */}
        <div className="lg:col-span-7">
          <ProductGallery images={product.images} title={product.title} />
        </div>

        {/* Sağ: Sessiz ve Lüks Detaylar */}
        <div className="lg:col-span-5 flex flex-col justify-center pt-8 lg:pt-0">
          
          <p className="text-[10px] text-porto-secondary mb-6 uppercase tracking-[0.3em] font-semibold">
            SKU: {product.sku}
          </p>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-[#1a1a1a] tracking-tight leading-[1.1] mb-8 font-serif">
            {product.title}
          </h1>

          <p className="text-base text-gray-500 font-light leading-relaxed mb-8">
            {product.shortDescription}
          </p>

          {/* LÜKS ÖLÇÜ BANDI - YENİ EKLENEN KISIM */}
          {product.features.dimensions && (
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 py-5 border-y border-gray-100 mb-12 group">
              <div className="flex items-center gap-3">
                {/* Minimalist Mimari Cetvel İkonu */}
                <svg className="w-4 h-4 text-gray-300 group-hover:text-porto-secondary transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 8h16M4 16h16M8 4v4m8-4v4m-8 8v4m8-4v4" />
                </svg>
                <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-[0.2em]">
                  Net Ölçüler
                </span>
              </div>
              
              <div className="h-4 w-px bg-gray-200 hidden sm:block"></div>
              
              <div className="text-sm text-gray-800 font-light tracking-wider">
                {/* Slash (/) işaretlerini gri yaparak ölçüleri öne çıkarıyoruz */}
                {product.features.dimensions.split('/').map((part, i, arr) => (
                  <span key={i}>
                    {part.trim()}
                    {i < arr.length - 1 && <span className="mx-2 text-gray-300 font-thin">/</span>}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Renk Seçenekleri */}
          <div className="mb-14">
            <h3 className="text-[10px] font-semibold text-gray-400 mb-6 uppercase tracking-[0.2em]">
              Renk Seçenekleri
            </h3>
            <div className="flex items-center gap-5">
              {product.colors.map((color) => (
                <Link 
                  key={color.name} 
                  href={`/${color.slug}`}
                  title={color.name}
                  className={`w-10 h-10 rounded-full border border-gray-200 transition-all duration-300 hover:scale-110 flex items-center justify-center ${
                    product.slug === color.slug ? 'ring-1 ring-offset-4 ring-gray-900' : ''
                  }`}
                  style={{ backgroundColor: color.hex }}
                >
                  <span className="sr-only">{color.name}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Lüks CTA Butonları */}
          <div className="flex flex-col sm:flex-row gap-4 mb-20">
            <a 
              href={waUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex-1 bg-[#1a1a1a] hover:bg-black text-white text-center py-4 px-8 text-xs uppercase tracking-[0.2em] transition-all duration-300"
            >
              WhatsApp İle Sor
            </a>
            <button 
              className="flex-1 bg-transparent border border-gray-300 hover:border-gray-900 text-gray-900 text-center py-4 px-8 text-xs uppercase tracking-[0.2em] transition-all duration-300"
            >
              Teklif İste
            </button>
          </div>

          {/* İnce Çizgili Minimalist Özellikler */}
          <div className="border-t border-gray-200 pt-12">
            <ul className="space-y-6">
              {/* filter ile 'dimensions' değerini tablodan çıkarıyoruz ki iki kez görünmesin */}
              {Object.entries(product.features)
                .filter(([key]) => key !== 'dimensions')
                .map(([key, value]) => (
                <li key={key} className="flex flex-col sm:flex-row sm:items-baseline">
                  <span className="w-full sm:w-1/3 text-gray-400 text-[11px] font-semibold uppercase tracking-[0.15em] mb-1 sm:mb-0">
                    {key === 'material' ? 'Malzeme' : 
                     key === 'legs' ? 'Ayaklar' : 
                     key === 'sponge' ? 'Sünger' : 
                     key === 'frame' ? 'İskelet' : key}
                  </span>
                  <span className="w-full sm:w-2/3 text-gray-800 text-sm font-light leading-relaxed">
                    {value}
                  </span>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>
    </div>
  );
}