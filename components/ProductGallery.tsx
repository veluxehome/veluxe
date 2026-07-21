"use client";
import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';

export default function ProductGallery({ images, title }: { images: string[], title: string }) {
  const [mainImage, setMainImage] = useState(images[0]);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  // Mevcut resmin sırasını bul
  const currentIndex = images.indexOf(mainImage);

  // Sonraki resme geç
  const showNext = useCallback((e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const nextIndex = (currentIndex + 1) % images.length;
    setMainImage(images[nextIndex]);
  }, [currentIndex, images]);

  // Önceki resme geç
  const showPrev = useCallback((e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const prevIndex = (currentIndex - 1 + images.length) % images.length;
    setMainImage(images[prevIndex]);
  }, [currentIndex, images]);

  // Klavyeden yön tuşları ve ESC ile kontrol
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isLightboxOpen) return;
      if (e.key === 'ArrowRight') showNext();
      if (e.key === 'ArrowLeft') showPrev();
      if (e.key === 'Escape') setIsLightboxOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isLightboxOpen, showNext, showPrev]);

  // Arka plan kaydırmayı engelle
  useEffect(() => {
    if (isLightboxOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isLightboxOpen]);

  return (
    <>
      <div className="flex flex-col gap-6">
        {/* Ana Büyük Resim */}
        <div 
          className="relative w-full aspect-[4/3] md:aspect-[4/4] bg-white p-3 sm:p-5 border border-gray-100 shadow-[0_8px_30px_-12px_rgba(105,138,159,0.15)] cursor-zoom-in group transition-all duration-500 hover:shadow-[0_12px_40px_-12px_rgba(223,118,81,0.2)] hover:border-porto-secondary/30"
          onClick={() => setIsLightboxOpen(true)}
        >
          <div className="relative w-full h-full overflow-hidden bg-[#fafafa]">
            <Image
              src={mainImage}
              alt={title}
              fill
              priority
              className="object-cover object-center transition-transform duration-1000 ease-out group-hover:scale-105"
              sizes="(max-width: 1024px) 100vw, 65vw"
            />
          </div>
          
          <div className="absolute bottom-8 right-8 bg-white/95 p-3.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 shadow-lg">
            <svg className="w-5 h-5 text-porto-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
            </svg>
          </div>
        </div>

        {/* Küçük Resimler */}
        {images.length > 1 && (
          <div className="flex gap-4 overflow-x-auto pb-4 pt-1 scrollbar-hide">
            {images.map((img, index) => (
              <button
                key={index}
                onClick={() => setMainImage(img)}
                className={`relative w-28 h-28 flex-shrink-0 transition-all duration-300 bg-white p-1.5 ${
                  mainImage === img 
                    ? 'border-2 border-porto-primary shadow-md opacity-100' 
                    : 'border border-gray-200 shadow-sm opacity-50 hover:opacity-100 hover:border-porto-secondary/50'
                }`}
              >
                <div className="relative w-full h-full overflow-hidden bg-[#fafafa]">
                  <Image src={img} alt={`${title} - Görsel ${index + 1}`} fill className="object-cover" />
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox (Galeri Gezinmeli & Nötr Arka Planlı) */}
      {isLightboxOpen && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 md:p-12 transition-opacity"
          onClick={() => setIsLightboxOpen(false)}
        >
          {/* Kapat Butonu */}
          <button 
            className="absolute top-6 right-6 md:top-8 md:right-8 text-white/60 hover:text-white transition-colors z-50 p-2"
            onClick={() => setIsLightboxOpen(false)}
            title="Kapat (ESC)"
          >
            <svg className="w-8 h-8 md:w-10 md:h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          
          {/* Önceki Butonu (Sadece 1'den fazla resim varsa görünür) */}
          {images.length > 1 && (
            <button 
              className="absolute left-2 md:left-8 top-1/2 -translate-y-1/2 text-white/60 hover:text-white transition-colors z-50 p-2"
              onClick={showPrev}
              title="Önceki"
            >
              <svg className="w-10 h-10 md:w-14 md:h-14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          )}

          <div 
            className="relative w-full h-full max-w-6xl max-h-[85vh] bg-transparent" 
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={mainImage}
              alt={title}
              fill
              className="object-contain"
              sizes="100vw"
            />
          </div>

          {/* Sonraki Butonu */}
          {images.length > 1 && (
            <button 
              className="absolute right-2 md:right-8 top-1/2 -translate-y-1/2 text-white/60 hover:text-white transition-colors z-50 p-2"
              onClick={showNext}
              title="Sonraki"
            >
              <svg className="w-10 h-10 md:w-14 md:h-14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          )}
        </div>
      )}
    </>
  );
}