"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/types'; 

export default function ProductCard({ product }: { product: Product }) {
  const [activeImg, setActiveImg] = useState(
    product.images && product.images.length > 0 ? product.images[0] : ''
  );

  const [isHovered, setIsHovered] = useState(false);
  const [hoverIndex, setHoverIndex] = useState(0);

  const uniqueColors = product.colors
    ? product.colors.filter((color: any, index: number, self: any[]) => 
        index === self.findIndex((c) => c.name === color.name)
      )
    : [];

  const displayColors = uniqueColors.slice(0, 4);
  const extraColorsCount = uniqueColors.length - 4;

  // GÜNCELLENEN KISIM: Üzerine gelince anında değişme mantığı
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isHovered && product.images && product.images.length > 1) {
      // 1. Adım: Fare geldiği an beklemeden HEMEN ikinci görsele (index 1) geç
      setHoverIndex(1);
      
      // 2. Adım: Kalan görselleri 1.2 saniyede bir döndürmeye devam et
      interval = setInterval(() => {
        setHoverIndex((prev) => (prev + 1) % product.images.length);
      }, 1200);
      
    } else {
      // Fare çekildiğinde ilk görsele geri dön
      setHoverIndex(0); 
    }
    
    return () => clearInterval(interval);
  }, [isHovered, product.images]);

  const currentDisplayImage = isHovered && product.images && product.images.length > 1 
    ? product.images[hoverIndex] 
    : activeImg;

  return (
    <div className="group flex flex-col cursor-pointer min-w-0 w-full max-w-full overflow-hidden">
      <Link 
        href={`/urun/${product.slug}`} 
        className="relative w-full aspect-[4/3] bg-[#f9f9f9] mb-4 md:mb-5 overflow-hidden border border-gray-100 block"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {currentDisplayImage ? (
          <Image 
            src={currentDisplayImage} 
            alt={product.title} 
            fill 
            sizes="(max-width: 768px) 50vw, 33vw"
            className="object-cover transition-transform duration-[2000ms] ease-out group-hover:scale-[1.02]" 
          />
        ) : (
          <div className="flex items-center justify-center w-full h-full text-gray-300">Görsel Yok</div>
        )}
      </Link>
      
      <Link href={`/urun/${product.slug}`} className="block min-w-0 w-full">
        <h4 className="text-sm text-gray-900 font-serif font-light tracking-wide truncate">
          {product.title}
        </h4>
        <p className="text-[10px] text-gray-400 mt-1.5 uppercase tracking-[0.2em] font-medium truncate">
          {product.sku}
        </p>
      </Link>

      {displayColors.length > 0 && (
        <div className="flex flex-wrap items-center gap-1.5 mt-3 min-w-0 w-full">
          {displayColors.map((color: any, idx: number) => (
            <div
              key={idx}
              title={color.name}
              onMouseEnter={() => {
                if (color.image) setActiveImg(color.image);
              }}
              onMouseLeave={() => {
                if (product.images && product.images.length > 0) setActiveImg(product.images[0]);
              }}
              className="w-4 h-4 rounded-full border border-gray-200 cursor-pointer transition-transform hover:scale-110 shrink-0"
              style={{ backgroundColor: color.hex }}
            >
              <span className="sr-only">{color.name}</span>
            </div>
          ))}
          
          {extraColorsCount > 0 && (
            <span className="text-[9px] md:text-[10px] text-gray-400 ml-0.5 font-medium tracking-wider truncate">
              +{extraColorsCount} Renk
            </span>
          )}
        </div>
      )}
    </div>
  );
}