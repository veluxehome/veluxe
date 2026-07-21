"use client";
import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';

export default function ProductGallery({ images, title }: { images: string[], title: string }) {
  const [mainImage, setMainImage] = useState(images[0]);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const currentIndex = images.indexOf(mainImage);

  const showNext = useCallback((e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const nextIndex = (currentIndex + 1) % images.length;
    setMainImage(images[nextIndex]);
  }, [currentIndex, images]);

  const showPrev = useCallback((e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const prevIndex = (currentIndex - 1 + images.length) % images.length;
    setMainImage(images[prevIndex]);
  }, [currentIndex, images]);

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

  return (
    <>
      <div className="flex flex-col gap-3">
        {/* Ana Yüzen Görsel */}
        <div 
          className="relative w-full aspect-[4/3] md:aspect-[4/3.2] bg-[#F4F4F4] cursor-zoom-in group transition-colors duration-700 hover:bg-[#EAEAEA]"
          onClick={() => setIsLightboxOpen(true)}
        >
          <Image
            src={mainImage}
            alt={title}
            fill
            priority
            className="object-contain p-8 md:p-12 transition-transform duration-1000 ease-out group-hover:scale-105 mix-blend-multiply"
            sizes="(max-width: 1024px) 100vw, 65vw"
          />
          
          {/* Lüks Büyüteç İpucu */}
          <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
            <span className="text-[10px] tracking-[0.3em] uppercase text-gray-500 font-medium">
              Görseli Büyüt +
            </span>
          </div>
        </div>

        {/* 4'lü Kusursuz Grid (Alta Tam Sığan Küçük Resimler) */}
        {images.length > 1 && (
          <div className="grid grid-cols-4 gap-3">
            {images.map((img, index) => (
              <button
                key={index}
                onClick={() => setMainImage(img)}
                // aspect-square ile tam kare yapıyoruz, border-b ile lüks bir vurgu veriyoruz
                className={`relative w-full aspect-square transition-all duration-500 bg-[#F4F4F4] ${
                  mainImage === img 
                    ? 'opacity-100 border-b-2 border-gray-900 shadow-sm' 
                    : 'opacity-40 hover:opacity-100 border-b-2 border-transparent'
                }`}
              >
                <Image 
                  src={img} 
                  alt={`${title} - Görsel ${index + 1}`} 
                  fill 
                  className="object-contain mix-blend-multiply p-2 sm:p-4" 
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox (Popup) - Aynen kalıyor */}
      {isLightboxOpen && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-xl p-4 md:p-12 transition-opacity duration-500"
          onClick={() => setIsLightboxOpen(false)}
        >
          <button className="absolute top-6 right-6 md:top-10 md:right-10 text-white/40 hover:text-white transition-colors z-50 p-2" onClick={() => setIsLightboxOpen(false)}>
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
          
          {images.length > 1 && (
            <button className="absolute left-4 md:left-12 top-1/2 -translate-y-1/2 text-white/30 hover:text-white transition-colors z-50 p-4" onClick={showPrev}>
              <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15 19l-7-7 7-7" /></svg>
            </button>
          )}

          <div className="relative w-full h-full max-w-7xl max-h-[90vh]" onClick={(e) => e.stopPropagation()}>
            <Image src={mainImage} alt={title} fill className="object-contain" sizes="100vw" />
          </div>

          {images.length > 1 && (
            <button className="absolute right-4 md:right-12 top-1/2 -translate-y-1/2 text-white/30 hover:text-white transition-colors z-50 p-4" onClick={showNext}>
              <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 5l7 7-7 7" /></svg>
            </button>
          )}
        </div>
      )}
    </>
  );
}