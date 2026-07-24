"use client";
import { use, useEffect } from 'react';
import Image from 'next/image';
import { products, categories } from '@/data';

export default function ProductPdfPage(props: { params: Promise<{ slug: string }> }) {
  const params = use(props.params);
  const product = products.find((p) => p.slug === params.slug);

  useEffect(() => {
    if (product) {
      // Tarayıcının resimleri yüklemesi için 1 saniye bekleyip yazdırma ekranını tetikliyoruz
      const timer = setTimeout(() => {
        window.print();
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [product]);

  if (!product) return null;

  const category = categories.find(c => c.slug === product.categorySlug);
  // Sadece ilk 4 resmi al, 4'ten azsa olduğu kadar
  const topImages = product.images.slice(0, 4);

  const formatHTML = (htmlString: string) => {
    if (!htmlString) return { __html: '' };
    const cleanString = htmlString.replace(/\\n/g, '<br/>').replace(/\n/g, '<br/>');
    return { __html: cleanString };
  };

  return (
    // z-[99999] ile sitenin header ve footer'ını arka planda bırakıp ekranı tamamen kaplarız
    // Ana kapsayıcıya "pdf-wrapper" ID'sini verdik ki CSS'te onu yüzen butonlardan ayırt edebilelim
    <div id="pdf-wrapper" className="fixed inset-0 z-[99999] bg-white overflow-y-auto print:static print:overflow-visible font-sans text-black">
      
      {/* CSS: Yazdırma esnasında layout.tsx'den gelen Header, Footer ve YÜZEN BUTONLARI tamamen gizler */}
      <style dangerouslySetInnerHTML={{ __html: `
        @media print {
          @page { margin: 12mm; }
          body { -webkit-print-color-adjust: exact; print-color-adjust: exact; background: white; }
          header, footer, nav { display: none !important; }
          
          /* Sitedeki WhatsApp, Yukarı Çık vb. yüzen butonları yazdırırken tamamen gizler */
          .fixed:not(#pdf-wrapper),
          .sticky:not(#pdf-wrapper),
          [style*="position: fixed"]:not(#pdf-wrapper),
          [style*="position: sticky"]:not(#pdf-wrapper) { 
            display: none !important; 
          }
        }
      `}} />
      
      <div className="max-w-[210mm] mx-auto bg-white p-8 md:p-12 print:p-0">
         
         {/* 1. KISIM: LOGO VE ÜRÜN BİLGİSİ */}
         <div className="flex justify-between items-center border-b-2 border-gray-900 pb-6 mb-8">
           <div className="relative h-10 w-48">
             <Image src="/images/logo/logo.webp" alt="Veluxe Logo" fill className="object-contain object-left" />
           </div>
           <div className="text-right">
             <h1 className="text-2xl font-serif text-gray-900">{product.title}</h1>
             <p className="text-xs uppercase tracking-widest text-gray-500 mt-1">{category?.title} | SKU: {product.sku}</p>
           </div>
         </div>

         {/* 2. KISIM: İLK 4 GÖRSEL (Izgara Yapısı) */}
         <div className={`grid gap-4 mb-10 ${topImages.length > 1 ? 'grid-cols-2' : 'grid-cols-1'}`}>
           {topImages.map((img, idx) => (
             <div key={idx} className="relative aspect-[4/3] bg-gray-50 border border-gray-100">
               <Image src={img} alt={`${product.title} Görsel ${idx + 1}`} fill className="object-cover" />
             </div>
           ))}
         </div>

         {/* 3. KISIM: AÇIKLAMALAR */}
         <div className="mb-10">
           <h2 className="text-sm font-bold uppercase tracking-widest text-gray-900 mb-4 border-b border-gray-200 pb-2">
             Tasarım Detayları
           </h2>
           <div 
             className="text-sm text-gray-700 leading-relaxed [&>b]:font-bold [&>strong]:font-bold mb-6"
             dangerouslySetInnerHTML={formatHTML(product.shortDescription)}
           />
           
           {product.longDescription && (
             <div 
               className="text-xs text-gray-600 leading-relaxed [&>h2]:text-sm [&>h2]:font-bold [&>h2]:mt-4 [&>h2]:mb-2 [&>p]:mb-3"
               dangerouslySetInnerHTML={{ __html: product.longDescription }}
             />
           )}
         </div>

         {/* 4. KISIM: TEKNİK BİLGİLER */}
         <div className="grid grid-cols-2 gap-4 mb-10 bg-gray-50 p-6 border border-gray-100 break-inside-avoid">
           {Object.entries(product.features).map(([key, value]) => (
             <div key={key}>
               <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">
                 {key === 'dimensions' ? 'Ölçüler' : key === 'material' ? 'Malzeme' : key === 'legs' ? 'Ayaklar' : key === 'sponge' ? 'Sünger' : key === 'frame' ? 'İskelet' : key}
               </h4>
               <p className="text-xs text-gray-900">{value as string}</p>
             </div>
           ))}
         </div>

         {/* 5. KISIM: İLETİŞİM (FOOTER) */}
         <div className="mt-auto border-t-2 border-gray-900 pt-6 flex justify-between items-center text-xs text-gray-600 break-inside-avoid">
           <div>
             <strong className="text-gray-900 block mb-1">Veluxe Home & Living / Premium Mobilya</strong>
             Küçükbakkalköy Mah. Ali Ay Sok. Orkide Apartmanı No:3/1 Ataşehir, İstanbul / Türkiye
           </div>
           <div className="text-right">
             <span className="block text-gray-900">T: +90 542 489 58 26</span>
             <span className="block text-gray-900">M: info@veluxe.com.tr</span>
             <span className="block text-gray-400 mt-1">www.veluxe.com.tr</span>
           </div>
         </div>

      </div>
    </div>
  );
}