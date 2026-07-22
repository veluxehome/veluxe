"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { menuItems } from '@/data';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // Scroll efektini yakalama
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 30);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Mobilde menü açıldığında arkaplanın kaymasını engelle
  useEffect(() => {
    if (isMobileMenuOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
  }, [isMobileMenuOpen]);

  return (
    <>
      {/* MASAÜSTÜ HEADER */}
      <header 
        className={`fixed w-full top-0 z-[60] transition-all duration-500 border-b ${
          isScrolled 
            ? 'bg-white/95 backdrop-blur-md border-gray-100 py-4 shadow-sm' 
            : 'bg-white border-transparent py-6 lg:py-8'
        }`}
      >
        <div className="max-w-[1920px] mx-auto px-4 sm:px-8 xl:px-16 flex items-center justify-between">
          
          <div className="flex items-center">
            <Link href="/" className="relative h-8 sm:h-10 w-40 sm:w-52 transition-transform duration-500 hover:scale-105 origin-left">
              <Image 
                src="/images/logo/logo.webp" 
                alt="Veluxe Logo" 
                fill 
                className="object-contain object-left" 
                priority
              />
            </Link>
          </div>

          {/* Masaüstü Navigasyon */}
          <nav className="hidden lg:flex items-center gap-10">
            {menuItems.map((item) => {
              const isActive = pathname === `/${item.slug}`;
              return (
                <Link 
                  key={item.name} 
                  href={`/${item.slug}`} 
                  className="relative text-[11px] uppercase tracking-[0.15em] font-medium text-gray-700 hover:text-gray-900 transition-colors py-1 group"
                >
                  {item.name}
                  <span 
                    className={`absolute left-0 -bottom-1 h-[1px] bg-gray-900 transition-all duration-300 ${
                      isActive ? 'w-full' : 'w-0 group-hover:w-full'
                    }`}
                  ></span>
                </Link>
              );
            })}
          </nav>

          {/* Mobil Menü Tetikleyici İkon */}
          <button 
            className="lg:hidden p-2 -mr-2 text-gray-900"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

        </div>
      </header>


      {/* MOBİL MENÜ ALANI */}
      
      {/* 1. Flu Arkaplan (Tam ekrana geçildiği için görünmeyecek olsa da geçiş animasyonu için korunuyor) */}
      <div 
        className={`fixed inset-0 z-[70] bg-black/20 backdrop-blur-sm transition-opacity duration-500 lg:hidden ${
          isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsMobileMenuOpen(false)}
      />

      {/* 2. Tam Ekran Açılan Panel (w-full ile ekranı kaplar) */}
      <div 
        className={`fixed top-0 right-0 h-full w-full bg-[#f9f8f4] z-[80] transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] lg:hidden flex flex-col ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Üst Bar (Beyaz Arkaplanlı) */}
        <div className="flex justify-between items-center px-6 py-5 bg-white shadow-[0_2px_10px_rgba(0,0,0,0.02)] relative z-10">
          <Link href="/" className="relative h-6 w-32" onClick={() => setIsMobileMenuOpen(false)}>
            <Image src="/images/logo/logo.webp" alt="Veluxe" fill className="object-contain object-left" />
          </Link>
          <button onClick={() => setIsMobileMenuOpen(false)} className="p-1 -mr-1 text-gray-900 hover:rotate-90 transition-transform duration-300">
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        {/* Menü Linkleri (Doğrudan menuItems üzerinden oluşturulur) */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {menuItems.map((item) => {
            const isActive = pathname === `/${item.slug}`;
            return (
              <Link 
                key={item.name}
                href={`/${item.slug}`} 
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block py-4 border-b border-gray-200/70 text-[11px] tracking-[0.15em] uppercase font-medium transition-colors ${
                  isActive ? 'text-gray-900' : 'text-gray-500 hover:text-gray-900'
                }`}
              >
                {item.name}
              </Link>
            )
          })}
        </div>

        {/* Alt Buton ve Dil Seçeneği (Korundu) */}
        <div className="px-6 pb-10 pt-4 mt-auto">
          <a href="#" className="flex justify-center items-center w-full bg-[#151515] hover:bg-black text-white py-4 text-[10px] tracking-[0.2em] font-medium uppercase transition-colors">
            E-Katalog
          </a>
          <div className="flex justify-center items-center gap-3 mt-6 text-[10px] tracking-widest font-medium">
            <button className="text-gray-900 transition-colors">TR</button>
            <span className="text-gray-300">|</span>
            <button className="text-gray-400 hover:text-gray-900 transition-colors">EN</button>
          </div>
        </div>

      </div>
    </>
  );
}