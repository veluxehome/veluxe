"use client";
import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';

export default function ProductGallery({ images, title }: { images: string[], title: string }) {
  const [mainImage, setMainImage] = useState(images[0]);
  useEffect(() => {
    if (images.length > 0) setMainImage(images[0]);
  }, [images]);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const currentIndex = images.indexOf(mainImage);

  const showNext = useCallback((e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setMainImage(images[(currentIndex + 1) % images.length]);
  }, [currentIndex, images]);

  const showPrev = useCallback((e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setMainImage(images[(currentIndex - 1 + images.length) % images.length]);
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

  const onTouchStartEvent = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMoveEvent = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEndEvent = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const minSwipeDistance = 50;
    if (distance > minSwipeDistance) showNext();
    if (distance < -minSwipeDistance) showPrev();
  };

  return (
    <>
      <div className="flex flex-col md:flex-row gap-4 lg:gap-8 items-start h-full">
        
        {/* Küçük resimler (Tek resim olsa bile düzeni korumak için her zaman render edilir) */}
        <div className="flex md:flex-col gap-4 overflow-x-auto md:overflow-y-auto scrollbar-hide order-2 md:order-1 w-full md:w-28 lg:w-32 shrink-0 pb-4 md:pb-0 md:max-h-[450px] xl:max-h-[650px]">
          {images.map((img, index) => (
            <button
              key={index}
              onClick={() => setMainImage(img)}
              className={`relative w-24 h-24 md:w-full md:h-24 lg:h-28 shrink-0 bg-[#f9f9f9] overflow-hidden transition-all duration-500 ${
                mainImage === img 
                  ? 'border border-porto-secondary/50 shadow-sm opacity-100' 
                  : 'border border-transparent opacity-50 hover:opacity-100 hover:border-gray-300'
              }`}
            >
              <Image src={img} alt={`${title} - ${index + 1}`} fill sizes="(max-width: 768px) 25vw, 10vw" className="object-cover"/>
            </button>
          ))}
        </div>

        {/* Ana Büyük Resim */}
        <div 
          className="relative w-full aspect-[4/3] xl:aspect-[16/11] flex-1 bg-[#f9f9f9] cursor-zoom-in group overflow-hidden order-1 md:order-2 border border-porto-secondary/10 hover:border-porto-secondary/30 transition-colors duration-700"
          onClick={() => setIsLightboxOpen(true)}
        >
          <Image
            src={mainImage}
            alt={title}
            fill
            priority
            // Hafif ve yavaş zoom efekti buraya eklendi
            className="object-cover object-center transition-transform duration-[2000ms] ease-out group-hover:scale-[1.02]"
            sizes="(max-width: 1024px) 100vw, 75vw"
          />
        </div>
      </div>

      {/* Lightbox */}
      {isLightboxOpen && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#050505]/95 backdrop-blur-md p-4 md:p-12 cursor-zoom-out transition-opacity duration-500"
          onClick={() => setIsLightboxOpen(false)}
          onTouchStart={onTouchStartEvent}
          onTouchMove={onTouchMoveEvent}
          onTouchEnd={onTouchEndEvent}
        >
          <button 
            className="absolute top-6 right-6 md:top-10 md:right-10 w-12 h-12 flex items-center justify-center text-white/50 hover:text-white transition-colors z-[110]"
            onClick={(e) => { e.stopPropagation(); setIsLightboxOpen(false); }}
            title="Kapat (ESC)"
          >
            <svg className="w-8 h-8 md:w-10 md:h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={0.75} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Oklar sadece 1'den fazla resim varsa çıkar */}
          {images.length > 1 && (
            <>
              <button className="absolute left-2 md:left-8 top-1/2 -translate-y-1/2 w-16 h-16 md:w-24 md:h-24 hidden sm:flex items-center justify-center text-white/50 hover:text-white transition-all duration-300 z-10 cursor-pointer group" onClick={showPrev}>
                <svg className="w-12 h-12 md:w-16 md:h-16 transition-transform duration-300 group-hover:-translate-x-2" fill="none" stroke="currentColor" viewBox="0 0 40 40">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={0.75} d="M32 20H8 M8 20l8-8 M8 20l8 8" />
                </svg>
              </button>
              <button className="absolute right-2 md:right-8 top-1/2 -translate-y-1/2 w-16 h-16 md:w-24 md:h-24 hidden sm:flex items-center justify-center text-white/50 hover:text-white transition-all duration-300 z-10 cursor-pointer group" onClick={showNext}>
                <svg className="w-12 h-12 md:w-16 md:h-16 transition-transform duration-300 group-hover:translate-x-2" fill="none" stroke="currentColor" viewBox="0 0 40 40">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={0.75} d="M8 20h24 M32 20l-8-8 M32 20l-8 8" />
                </svg>
              </button>
            </>
          )}

          {/* Hatalı kod yerine doğru Lightbox resmi eklendi */}
          <div className="relative w-full h-full max-w-7xl max-h-[90vh] cursor-default" onClick={(e) => e.stopPropagation()}>
            <Image src={mainImage} alt={title} fill className="object-contain select-none" sizes="100vw" draggable={false} />
          </div>
        </div>
      )}
    </>
  );
}