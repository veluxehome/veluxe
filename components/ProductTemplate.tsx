"use client";
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/types';
import { products, categories } from '@/data';
import { productPrices, MaterialType } from '@/data/prices';
import ProductGallery from './ProductGallery';

export default function ProductTemplate({ product }: { product: Product }) {
  const [selectedColor, setSelectedColor] = useState<any>(null);
  const [selectedMaterial, setSelectedMaterial] = useState<MaterialType>('hakikiDeri');
  
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [formStatus, setFormStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const relatedSliderRef = useRef<HTMLDivElement>(null);

  const materialNames: Record<MaterialType, string> = {
    hakikiDeri: 'Hakiki Deri',
    suniDeri: 'Suni Deri',
    kumash: 'Kumaş'
  };

  const productPriceObj = productPrices[product.sku] || { hakikiDeri: "0 TL", suniDeri: "0 TL", kumash: "0 TL" };
  const currentPrice = productPriceObj[selectedMaterial];
  const showPrice = currentPrice && currentPrice !== "0 TL";
  const hasAnyPrice = Object.values(productPriceObj).some(p => p && p !== "0 TL");

  const waMessage = encodeURIComponent(`Merhaba, ${product.title} (Kod: ${product.sku})${hasAnyPrice ? ` - [${materialNames[selectedMaterial]}]` : ''} hakkında fiyat ve detaylı bilgi almak istiyorum.`);
  const waUrl = `https://wa.me/905424895826?text=${waMessage}`;

  const productSchema = {
    "@context": "https://schema.org/",
    "@type": "Product",
    "name": hasAnyPrice ? `${product.title} (${materialNames[selectedMaterial]})` : product.title,
    "image": product.images.map(img => `https://veluxe.com.tr${img}`),
    "description": product.shortDescription.replace(/<[^>]*>?/gm, ''),
    "sku": hasAnyPrice ? `${product.sku}-${selectedMaterial}` : product.sku,
    "brand": {
      "@type": "Brand",
      "name": "Veluxe"
    },
    "offers": {
      "@type": "Offer",
      "priceCurrency": "TRY",
      "price": showPrice ? currentPrice.replace(/[^0-9]/g, '') : "0",
      "availability": "https://schema.org/InStock"
    }
  };

  const relatedProducts = products
    .filter(p => p.categorySlug === product.categorySlug && p.slug !== product.slug)
    .slice(0, 15);
    
  const category = categories.find(c => c.slug === product.categorySlug);

  const uniqueColors = product.colors.filter((color: any, index: number, self: any[]) => 
    index === self.findIndex((c) => c.name === color.name)
  );

  const displayImages = selectedColor && selectedColor.image 
    ? [selectedColor.image, ...product.images.filter(img => img !== selectedColor.image)]
    : product.images;

  const formatHTML = (htmlString: string) => {
    if (!htmlString) return { __html: '' };
    const cleanString = htmlString.replace(/\\n/g, '<br/>').replace(/\n/g, '<br/>');
    return { __html: cleanString };
  };

  const handleQuoteSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('loading');
    try {
      const res = await fetch('/api/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          ...formData, 
          productTitle: product.title, 
          productSku: product.sku,
          selectedMaterial: hasAnyPrice ? materialNames[selectedMaterial] : 'Belirtilmedi',
          price: hasAnyPrice ? currentPrice : 'Fiyat Sorunuz'
        })
      });
      if (res.ok) {
        setFormStatus('success');
        setFormData({ name: '', email: '', phone: '', message: '' });
      } else {
        setFormStatus('error');
      }
    } catch {
      setFormStatus('error');
    }
  };

  const scrollNext = () => {
    if (relatedSliderRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = relatedSliderRef.current;
      const maxScroll = scrollWidth - clientWidth;
      
      if (scrollLeft >= maxScroll - 10) {
        relatedSliderRef.current.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        const scrollAmount = window.innerWidth < 768 ? 276 : 352;
        relatedSliderRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      }
    }
  };

  const scrollPrev = () => {
    if (relatedSliderRef.current) {
      const scrollAmount = window.innerWidth < 768 ? 276 : 352;
      relatedSliderRef.current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    if (relatedProducts.length > 0) {
      const interval = setInterval(() => {
        scrollNext();
      }, 4000); 
      return () => clearInterval(interval); 
    }
  }, [relatedProducts.length]);

  return (
    <>
      <script 
        type="application/ld+json" 
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }} 
      />

      <div className="max-w-[1920px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-24 py-8 md:py-16 w-full max-w-full">
        
        <nav className="flex flex-wrap md:flex-nowrap items-center gap-x-2 gap-y-1 text-[10px] uppercase tracking-[0.2em] font-medium text-gray-400 mb-10 border-b border-gray-100 pb-4 w-full max-w-full overflow-hidden">
          <Link href="/" className="hover:text-gray-900 transition-colors whitespace-nowrap shrink-0">Anasayfa</Link>
          <span className="text-gray-300 shrink-0">/</span>
          {category ? (
            <>
              <Link href={`/${category.slug}`} className="hover:text-gray-900 transition-colors whitespace-nowrap shrink-0">{category.title}</Link>
              <span className="text-gray-300 shrink-0">/</span>
            </>
          ) : null}
          <span className="text-gray-900 truncate min-w-0 flex-1">{product.title}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 xl:gap-20 items-start relative w-full max-w-full min-w-0">
          
          <div className="lg:col-span-7 xl:col-span-8 order-1 min-w-0 max-w-full w-full">
            <ProductGallery images={displayImages} title={product.title} />
          </div>

          <div className="lg:col-span-5 xl:col-span-4 flex flex-col lg:sticky lg:top-32 pt-4 order-2 lg:row-span-2 min-w-0 max-w-full w-full">
            
            <div className="mb-4 border-b border-gray-100 pb-3">
              <p className="text-[10px] text-gray-400 uppercase tracking-[0.25em] font-medium">
                SKU: {product.sku}
              </p>
            </div>
            
            <h1 className="text-2xl md:text-3xl lg:text-[1.75rem] xl:text-[1.5rem] font-normal text-gray-900 tracking-tight leading-[1.3] mb-6 font-serif text-balance break-words">
              {product.title}
            </h1>

            {/* iOS ÇÖZÜMÜ: overscroll-x-contain */}
            <div 
              className="text-sm text-gray-500 font-light leading-relaxed mb-8 break-words [&>b]:font-semibold [&>b]:text-gray-900 [&>strong]:font-semibold [&>strong]:text-gray-900 w-full max-w-full overflow-x-auto overscroll-x-contain"
              dangerouslySetInnerHTML={formatHTML(product.shortDescription)}
            />

            {hasAnyPrice && (
              <div className="mb-8 bg-gray-50/50 p-4 border border-gray-100 w-full max-w-full">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-[10px] font-medium text-gray-500 uppercase tracking-[0.2em]">
                    Kaplama Türü
                  </h3>
                  {showPrice && (
                    <span className="text-xs font-serif font-medium text-gray-900 tracking-wide">
                      {currentPrice}
                    </span>
                  )}
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'hakikiDeri', label: 'Hakiki Deri' },
                    { id: 'suniDeri', label: 'Suni Deri' },
                    { id: 'kumash', label: 'Kumaş' },
                  ].map((mat) => (
                    <button
                      key={mat.id}
                      onClick={() => setSelectedMaterial(mat.id as MaterialType)}
                      className={`py-2 px-1 text-[9px] uppercase tracking-[0.1em] font-medium border transition-all text-center cursor-pointer ${
                        selectedMaterial === mat.id 
                          ? 'border-gray-900 bg-gray-900 text-white shadow-sm' 
                          : 'border-gray-200 bg-white text-gray-700 hover:border-gray-400'
                      }`}
                    >
                      {mat.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {product.features.dimensions && (
              <div className="flex items-center gap-3 py-4 border-y border-gray-100 mb-8 w-full max-w-full">
                <svg className="w-5 h-5 text-gray-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 8h16M4 16h16M8 4v4m8-4v4m-8 8v4m8-4v4" />
                </svg>
                <div className="text-sm text-gray-700 font-light tracking-wide break-words min-w-0">
                  {product.features.dimensions}
                </div>
              </div>
            )}

            <div className="mb-12">
              <h3 className="text-[10px] font-medium text-gray-400 mb-4 capitalize tracking-[0.2em]">
                Renk Seçenekleri
              </h3>
              <div className="flex items-center gap-3 flex-wrap">
                {uniqueColors.map((color: any, index: number) => (
                  <button 
                    key={index} 
                    title={color.name}
                    onClick={() => setSelectedColor(color)}
                    className={`w-7 h-7 rounded-full border border-gray-200 transition-all hover:scale-110 flex items-center justify-center cursor-pointer ${
                      selectedColor?.name === color.name ? 'ring-1 ring-offset-4 ring-gray-900' : ''
                    }`}
                    style={{ backgroundColor: color.hex }}
                  >
                    <span className="sr-only">{color.name}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-4 mb-16 w-full max-w-full">
              <div className="flex flex-col sm:flex-row gap-4 w-full">
                <a 
                  href={waUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex-1 bg-[#25D366] hover:bg-[#1ebd5b] text-white text-center py-4 px-6 text-xs uppercase tracking-[0.2em] font-medium transition-colors truncate"
                >
                  WhatsApp'tan Sor
                </a>
                <button 
                  onClick={() => document.getElementById('teklif-formu')?.scrollIntoView({ behavior: 'smooth' })}
                  className="flex-1 bg-[#111] hover:bg-black text-white text-center py-4 px-6 text-xs uppercase tracking-[0.2em] font-medium transition-colors cursor-pointer"
                >
                  Teklif İste
                </button>
              </div>
              
              <Link 
                href={`/urun/${product.slug}/pdf`} 
                target="_blank"
                className="flex items-center justify-center gap-3 w-full border border-gray-200 hover:border-gray-900 text-gray-700 hover:text-gray-900 bg-[#fbfbfb] hover:bg-white text-center py-4 px-6 text-xs uppercase tracking-[0.2em] font-medium transition-all"
              >
                <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <span className="truncate">Ürün Kartını PDF Olarak İndir</span>
              </Link>
            </div>

            <div className="border-t border-gray-100 pt-10 w-full max-w-full">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-8 w-full">
                {Object.entries(product.features)
                  .filter(([key]) => key !== 'dimensions')
                  .map(([key, value]) => (
                    <div key={key} className="flex gap-4 w-full">
                      <div className="shrink-0 mt-1">
                        {key === 'material' && <svg className="w-5 h-5 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>}
                        {key === 'legs' && <svg className="w-5 h-5 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 6h16M4 10h16M4 14h16M4 18h16" /></svg>}
                        {key === 'sponge' && <svg className="w-5 h-5 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" /></svg>}
                        {key === 'frame' && <svg className="w-5 h-5 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest mb-1.5">
                          {key === 'material' ? 'Malzeme' : key === 'legs' ? 'Ayaklar' : key === 'sponge' ? 'Sünger' : key === 'frame' ? 'İskelet' : key}
                        </h4>
                        <p className="text-xs text-gray-700 font-light leading-relaxed break-words">
                          {key === 'material' && hasAnyPrice ? materialNames[selectedMaterial] : value}
                        </p>
                      </div>
                    </div>
                ))}
              </div>
            </div>

          </div>

          <div className="lg:col-span-7 xl:col-span-8 order-3 min-w-0 w-full max-w-full">
            
            {/* iOS ÇÖZÜMÜ: overscroll-x-contain */}
            {product.longDescription && (
              <div className="mb-16 w-full max-w-full overflow-x-auto overscroll-x-contain pb-4">
                <div 
                  className="text-sm md:text-base text-gray-600 font-light leading-relaxed break-words min-w-full [&>h2]:text-2xl [&>h2]:font-serif [&>h2]:text-gray-900 [&>h2]:mt-10 [&>h2]:mb-4 [&>p]:mb-6 [&_*]:max-w-full [&_*]:!h-auto"
                  dangerouslySetInnerHTML={{ __html: product.longDescription }}
                />
              </div>
            )}

            {product.faqs && product.faqs.length > 0 && (
              <div className="mb-8 w-full max-w-full">
                <h3 className="text-2xl font-serif font-light text-gray-900 mb-8">
                  Sıkça Sorulan Sorular
                </h3>
                <div className="space-y-4">
                  {product.faqs.map((faq, index) => (
                    <details key={index} className="group border border-gray-100 bg-[#fbfbfb] p-6 rounded-sm [&_summary::-webkit-details-marker]:hidden w-full max-w-full">
                      <summary className="flex cursor-pointer items-center justify-between gap-1.5 text-gray-900">
                        <h4 className="font-serif text-lg font-light break-words pr-4 flex-1 min-w-0">{faq.question}</h4>
                        <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                        </span>
                      </summary>
                      <p className="mt-4 leading-relaxed text-gray-600 font-light text-sm break-words">
                        {faq.answer}
                      </p>
                    </details>
                  ))}
                </div>
              </div>
            )}

          </div>
        </div>

        {/* DİĞER ÜRÜNLER ALANI */}
        {relatedProducts.length > 0 && (
          <div className="mt-20 md:mt-32 pt-12 border-t border-gray-100 w-full min-w-0 max-w-full">
            <div className="flex justify-between items-center mb-8 px-2">
              <h3 className="text-xs md:text-sm font-semibold text-gray-900 uppercase tracking-[0.2em] truncate">
                İlginizi Çekebilecek Diğer Modeller
              </h3>
              
              <div className="flex gap-2 shrink-0">
                <button 
                  onClick={scrollPrev} 
                  className="w-9 h-9 flex items-center justify-center border border-gray-200 hover:border-gray-900 text-gray-500 hover:text-gray-900 transition-colors bg-white cursor-pointer" 
                  aria-label="Önceki"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button 
                  onClick={scrollNext} 
                  className="w-9 h-9 flex items-center justify-center border border-gray-200 hover:border-gray-900 text-gray-500 hover:text-gray-900 transition-colors bg-white cursor-pointer" 
                  aria-label="Sonraki"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
            
            {/* iOS ÇÖZÜMÜ: overscroll-x-contain eklendi */}
            <div 
              ref={relatedSliderRef}
              className="flex gap-4 md:gap-8 overflow-x-auto overscroll-x-contain pb-8 snap-x snap-mandatory px-2 w-full max-w-full [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
            >
              {relatedProducts.map((rp) => (
                <RelatedProductCard key={rp.slug} rp={rp} />
              ))}
            </div>
          </div>
        )}

        {/* TEKLİF FORMU */}
        <div id="teklif-formu" className="mt-20 md:mt-32 pt-20 border-t border-gray-100 grid grid-cols-1 md:grid-cols-3 gap-16 xl:gap-24 w-full min-w-0 max-w-full">
          
          <div className="md:col-span-1 min-w-0 w-full">
            <span className="text-[10px] uppercase tracking-[0.3em] text-gray-400 font-medium block mb-3">İletişime Geçin</span>
            <h2 className="text-2xl md:text-3xl font-serif font-light text-gray-900 tracking-tight mb-6">
              Özel Teklif İsteyin
            </h2>
            <p className="text-sm text-gray-500 font-light leading-relaxed mb-8">
              <strong>{product.title}</strong> modeli için özel ölçü, kumaş/deri tercihi veya proje bazlı toplu alımlarınız için detaylı fiyat teklifi alabilirsiniz.
            </p>
            <div className="flex flex-col gap-4">
              <a href="tel:+905424895826" className="text-sm text-gray-900 font-light hover:underline block truncate">T: +90 542 489 58 26</a>
              <a href="mailto:info@veluxe.com.tr" className="text-sm text-gray-900 font-light hover:underline block truncate">M: info@veluxe.com.tr</a>
            </div>
          </div>

          <div className="md:col-span-2 lg:col-span-2 max-w-3xl min-w-0 w-full">
            <form onSubmit={handleQuoteSubmit} className="flex flex-col gap-6 w-full">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
                <input 
                  type="text" 
                  placeholder="Adınız Soyadınız *" 
                  required 
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full bg-transparent border-b border-gray-200 py-4 px-0 text-sm focus:outline-none focus:border-gray-900 transition-colors placeholder:text-gray-400 font-light"
                />
                <input 
                  type="tel" 
                  placeholder="Telefon Numaranız *" 
                  required 
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  className="w-full bg-transparent border-b border-gray-200 py-4 px-0 text-sm focus:outline-none focus:border-gray-900 transition-colors placeholder:text-gray-400 font-light"
                />
              </div>
              <input 
                type="email" 
                placeholder="E-posta Adresiniz *" 
                required 
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full bg-transparent border-b border-gray-200 py-4 px-0 text-sm focus:outline-none focus:border-gray-900 transition-colors placeholder:text-gray-400 font-light"
              />
              <textarea 
                placeholder="Özel talepleriniz veya iletmek istediğiniz mesaj..." 
                rows={4}
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
                className="w-full bg-transparent border-b border-gray-200 py-4 px-0 text-sm focus:outline-none focus:border-gray-900 transition-colors placeholder:text-gray-400 font-light resize-none"
              ></textarea>
              
              <button 
                type="submit" 
                disabled={formStatus === 'loading'}
                className="mt-4 bg-[#111] hover:bg-black text-white text-center py-5 px-8 text-xs uppercase tracking-[0.2em] font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed self-start"
              >
                {formStatus === 'loading' ? 'Gönderiliyor...' : 'Teklif Talebini Gönder'}
              </button>

              {formStatus === 'success' && (
                <p className="text-sm text-green-600 font-light mt-2 bg-green-50 p-4 border border-green-100">
                  Talebiniz başarıyla iletildi. En kısa sürede dönüş yapılacaktır.
                </p>
              )}
              {formStatus === 'error' && (
                <p className="text-sm text-red-600 font-light mt-2 bg-red-50 p-4 border border-red-100">
                  Bir hata oluştu. Lütfen doğrudan WhatsApp üzerinden iletişime geçiniz.
                </p>
              )}
            </form>
          </div>
        </div>

      </div>
    </>
  );
}

function RelatedProductCard({ rp }: { rp: Product }) {
  const [activeImg, setActiveImg] = useState(rp.images && rp.images.length > 0 ? rp.images[0] : '');

  const uniqueColors = rp.colors
    ? rp.colors.filter((color: any, index: number, self: any[]) => 
        index === self.findIndex((c) => c.name === color.name)
      )
    : [];
    
  const displayColors = uniqueColors.slice(0, 4);
  const extraColorsCount = uniqueColors.length - 4;

  return (
    <div className="w-[260px] md:w-[320px] shrink-0 snap-start group cursor-pointer flex flex-col min-w-0">
      <Link 
        href={`/urun/${rp.slug}`} 
        className="block relative w-full aspect-[4/3] bg-[#f9f9f9] mb-4 overflow-hidden border border-gray-100 group-hover:border-gray-300 transition-colors"
      >
        {activeImg ? (
          <Image 
            src={activeImg} 
            alt={rp.title} 
            fill 
            sizes="(max-width: 768px) 100vw, 320px" 
            className="object-cover transition-transform duration-[2000ms] ease-out group-hover:scale-[1.02]" 
          />
        ) : (
            <div className="flex items-center justify-center w-full h-full text-gray-300">Görsel Yok</div>
        )}
      </Link>
      
      <Link href={`/urun/${rp.slug}`} className="block">
        <h4 className="text-sm text-gray-900 font-serif font-light tracking-wide truncate">
          {rp.title}
        </h4>
        <p className="text-[10px] text-gray-400 mt-1.5 uppercase tracking-[0.2em] font-medium">
          {rp.sku}
        </p>
      </Link>
      
      {displayColors.length > 0 && (
        <div className="flex items-center gap-2 mt-3">
          {displayColors.map((color: any, idx: number) => (
            <div
              key={idx}
              title={color.name}
              onMouseEnter={() => {
                if (color.image) setActiveImg(color.image);
              }}
              onMouseLeave={() => {
                if (rp.images && rp.images.length > 0) setActiveImg(rp.images[0]);
              }}
              className="w-4 h-4 rounded-full border border-gray-200 cursor-pointer transition-transform hover:scale-110"
              style={{ backgroundColor: color.hex }}
            >
              <span className="sr-only">{color.name}</span>
            </div>
          ))}
          {extraColorsCount > 0 && (
            <span className="text-[10px] text-gray-400 ml-1 font-medium tracking-wider">
              +{extraColorsCount} Renk
            </span>
          )}
        </div>
      )}
    </div>
  );
}