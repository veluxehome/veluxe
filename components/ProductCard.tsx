"use client";
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/types'; 

export default function ProductCard({ product }: { product: Product }) {
  const [activeImg, setActiveImg] = useState(
    product.images && product.images.length > 0 ? product.images[0] : ''
  );

  // Aynı isimdeki renklerin tekrarlanmasını önlüyoruz
  const uniqueColors = product.colors
    ? product.colors.filter((color: any, index: number, self: any[]) => 
        index === self.findIndex((c) => c.name === color.name)
      )
    : [];

  const displayColors = uniqueColors.slice(0, 4);
  const extraColorsCount = uniqueColors.length - 4;

  return (
    <div className="group flex flex-col cursor-pointer">
      <Link 
        href={`/urun/${product.slug}`} 
        className="relative w-full aspect-[4/3] bg-[#f9f9f9] mb-5 overflow-hidden border border-gray-100 block"
      >
        {activeImg ? (
          <Image 
            src={activeImg} 
            alt={product.title} 
            fill 
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover transition-transform duration-[2000ms] ease-out group-hover:scale-[1.02]" 
          />
        ) : (
          <div className="flex items-center justify-center w-full h-full text-gray-300">Görsel Yok</div>
        )}
      </Link>
      
      <Link href={`/urun/${product.slug}`} className="block">
        <h4 className="text-sm text-gray-900 font-serif font-light tracking-wide truncate">
          {product.title}
        </h4>
        <p className="text-[10px] text-gray-400 mt-1.5 uppercase tracking-[0.2em] font-medium">
          {product.sku}
        </p>
      </Link>

      {/* RENK PALETİ VE HOVER ETKİSİ */}
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
                if (product.images && product.images.length > 0) setActiveImg(product.images[0]);
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