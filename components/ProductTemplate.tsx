import Link from 'next/link';
import { Product } from '@/types';
import ProductGallery from './ProductGallery';

export default function ProductTemplate({ product }: { product: Product }) {
  const waMessage = encodeURIComponent(`Merhaba, ${product.title} (Kod: ${product.sku}) hakkında fiyat ve detaylı bilgi almak istiyorum.`);
  const waUrl = `https://wa.me/905555555555?text=${waMessage}`;

  return (
    <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12 py-16 md:py-24">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
        
        {/* Sol Taraf: Görseller */}
        <div className="lg:col-span-7">
          <ProductGallery images={product.images} title={product.title} />
        </div>

        {/* Sağ Taraf: Detaylar */}
        <div className="lg:col-span-5 flex flex-col justify-center">
          
          {/* SKU - Secondary Renk */}
          <p className="text-xs text-porto-secondary mb-4 uppercase tracking-[0.2em] font-medium">
            SKU: {product.sku}
          </p>
          
          {/* Başlık - Primary Renk ile daha yumuşak ve şık */}
          <h1 className="text-4xl md:text-5xl font-light text-[#2d3a43] tracking-tight leading-tight mb-8 font-serif">
            {product.title}
          </h1>

          <p className="text-lg text-gray-500 font-light leading-relaxed mb-10">
            {product.shortDescription}
          </p>

          {/* Renk Seçenekleri */}
          <div className="mb-12">
            <h3 className="text-xs font-semibold text-porto-primary mb-5 uppercase tracking-[0.15em]">
              Renk Seçenekleri
            </h3>
            <div className="flex items-center gap-4">
              {product.colors.map((color) => (
                <Link 
                  key={color.name} 
                  href={`/${color.slug}`}
                  title={color.name}
                  className={`w-12 h-12 rounded-full border border-gray-200 shadow-sm transition-all duration-300 hover:scale-105 flex items-center justify-center ${
                    product.slug === color.slug ? 'ring-2 ring-offset-4 ring-porto-secondary' : ''
                  }`}
                  style={{ backgroundColor: color.hex }}
                >
                  <span className="sr-only">{color.name}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* CTA Butonları */}
          <div className="flex flex-col xl:flex-row gap-4 mb-16">
            <a 
              href={waUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex-1 bg-[#25D366] hover:bg-[#20b858] text-white text-center py-4 px-8 text-sm uppercase tracking-[0.1em] font-medium transition-colors shadow-md shadow-[#25D366]/20"
            >
              WhatsApp İle Sor
            </a>
            {/* Teklif Formu Butonu - Primary Renk */}
            <button 
              className="flex-1 bg-porto-primary hover:bg-[#567487] text-white text-center py-4 px-8 text-sm uppercase tracking-[0.1em] font-medium transition-colors shadow-md shadow-porto-primary/20"
            >
              Teklif Formu
            </button>
          </div>

          {/* Minimalist Özellikler Tablosu */}
          <div className="border-t border-gray-200 pt-10">
            <h3 className="text-xs font-semibold text-porto-primary mb-6 uppercase tracking-[0.15em]">
              Teknik Özellikler
            </h3>
            <ul className="space-y-4">
              {Object.entries(product.features).map(([key, value]) => (
                <li key={key} className="flex flex-col sm:flex-row sm:items-baseline border-b border-gray-100 pb-4 last:border-0 group">
                  <span className="w-full sm:w-1/3 text-gray-400 group-hover:text-porto-secondary transition-colors duration-300 text-sm font-medium uppercase tracking-wider mb-1 sm:mb-0">
                    {key === 'material' ? 'Malzeme' : 
                     key === 'legs' ? 'Ayaklar' : 
                     key === 'sponge' ? 'Sünger' : 
                     key === 'frame' ? 'İskelet' : 
                     key === 'dimensions' ? 'Ölçüler' : key}
                  </span>
                  <span className="w-full sm:w-2/3 text-gray-700 text-sm font-light leading-relaxed">
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