"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { menuItems } from '@/data';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState<'tr' | 'en'>('tr');
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 30);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
  }, [isMobileMenuOpen]);

  useEffect(() => {
    if (document.cookie.includes('googtrans=/tr/en') || document.cookie.includes('googtrans=/auto/en')) {
      setCurrentLang('en');
    }

    if (!document.getElementById('google-translate-script')) {
      (window as any).googleTranslateElementInit = () => {
        new (window as any).google.translate.TranslateElement(
          { 
            pageLanguage: 'tr', 
            includedLanguages: 'en,tr',
            autoDisplay: false 
          },
          'google_translate_element'
        );
      };

      const script = document.createElement('script');
      script.id = 'google-translate-script';
      script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  useEffect(() => {
    if (currentLang === 'en') {
      const timeoutId = setTimeout(() => {
        const combo = document.querySelector('.goog-te-combo') as HTMLSelectElement;
        if (combo) {
          combo.value = 'en';
          combo.dispatchEvent(new Event('change'));
        }
      }, 500); 
      return () => clearTimeout(timeoutId);
    }
  }, [pathname, currentLang]);

  const switchLanguage = (lang: 'tr' | 'en') => {
    if (lang === currentLang) return;

    if (lang === 'tr') {
      document.cookie = "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${window.location.hostname};`;
      window.location.reload();
    } else {
      const combo = document.querySelector('.goog-te-combo') as HTMLSelectElement;
      if (combo) {
        combo.value = lang;
        combo.dispatchEvent(new Event('change'));
        setCurrentLang(lang);
      } else {
        document.cookie = `googtrans=/tr/${lang}; path=/;`;
        document.cookie = `googtrans=/tr/${lang}; path=/; domain=${window.location.hostname};`;
        window.location.reload();
      }
    }
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        iframe.goog-te-banner-frame { display: none !important; }
        body { top: 0 !important; position: static !important; }
        .goog-te-balloon-frame { display: none !important; }
        #goog-gt-tt { display: none !important; }
        .goog-text-highlight { background-color: transparent !important; box-shadow: none !important; }
      `}} />
      <div id="google_translate_element" className="hidden"></div>

      {/* MASAÜSTÜ VE MOBİL HEADER */}
      <header 
        className={`fixed w-full max-w-[100vw] overflow-x-hidden top-0 z-[60] transition-all duration-500 border-b ${
          isScrolled 
            ? 'bg-white/95 backdrop-blur-md border-gray-100 py-4 shadow-sm' 
            : 'bg-white border-transparent py-6 lg:py-8'
        }`}
      >
        <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-8 xl:px-16 flex items-center justify-between">
          
          {/* Logo - Kesinlikle Sola Yaslı */}
          <div className="flex items-center shrink-0">
            <Link href="/" className="relative h-8 sm:h-10 w-40 sm:w-52 transition-transform duration-500 hover:scale-105 origin-left block">
              <Image 
                src="/images/logo/logo.webp" 
                alt="Veluxe Logo" 
                fill 
                className="object-contain object-left" 
                priority
              />
            </Link>
          </div>

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

            <div className="flex items-center gap-3 ml-2 border-l border-gray-200 pl-8 text-[10px] tracking-widest font-medium notranslate">
              <button 
                onClick={() => switchLanguage('tr')} 
                className={`${currentLang === 'tr' ? 'text-gray-900' : 'text-gray-400 hover:text-gray-900'} transition-colors uppercase`}
              >
                TR
              </button>
              <span className="text-gray-300">/</span>
              <button 
                onClick={() => switchLanguage('en')} 
                className={`${currentLang === 'en' ? 'text-gray-900' : 'text-gray-400 hover:text-gray-900'} transition-colors uppercase`}
              >
                EN
              </button>
            </div>
          </nav>

          {/* Mobil Menü İkonu - Kesinlikle Sağa Yaslı */}
          <button 
            className="lg:hidden p-2 text-gray-900 shrink-0 ml-auto"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

        </div>
      </header>


      {/* MOBİL MENÜ ALANI */}
      <div 
        className={`fixed inset-0 z-[70] bg-black/20 backdrop-blur-sm transition-opacity duration-500 lg:hidden ${
          isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsMobileMenuOpen(false)}
      />

      <div 
        className={`fixed top-0 right-0 h-full w-full bg-[#f9f8f4] z-[80] transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] lg:hidden flex flex-col ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex justify-between items-center px-6 py-5 bg-white shadow-[0_2px_10px_rgba(0,0,0,0.02)] relative z-10">
          <Link href="/" className="relative h-6 w-32 shrink-0" onClick={() => setIsMobileMenuOpen(false)}>
            <Image src="/images/logo/logo.webp" alt="Veluxe" fill className="object-contain object-left" />
          </Link>
          <button onClick={() => setIsMobileMenuOpen(false)} className="p-1 -mr-1 text-gray-900 hover:rotate-90 transition-transform duration-300 shrink-0 ml-auto">
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
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

        <div className="px-6 pb-10 pt-4 mt-auto">
          <Link 
            href="/koleksiyonlar" 
            onClick={() => setIsMobileMenuOpen(false)} 
            className="flex justify-center items-center w-full bg-[#151515] hover:bg-black text-white py-4 text-[10px] tracking-[0.2em] font-medium uppercase transition-colors"
          >
            Tüm Koleksiyonlar
          </Link>
          
          <div className="flex justify-center items-center gap-3 mt-6 text-[10px] tracking-widest font-medium notranslate">
            <button 
              onClick={() => { switchLanguage('tr'); setIsMobileMenuOpen(false); }} 
              className={`${currentLang === 'tr' ? 'text-gray-900' : 'text-gray-400 hover:text-gray-900'} transition-colors uppercase`}
            >
              TR
            </button>
            <span className="text-gray-300">|</span>
            <button 
              onClick={() => { switchLanguage('en'); setIsMobileMenuOpen(false); }} 
              className={`${currentLang === 'en' ? 'text-gray-900' : 'text-gray-400 hover:text-gray-900'} transition-colors uppercase`}
            >
              EN
            </button>
          </div>
        </div>

      </div>
    </>
  );
}