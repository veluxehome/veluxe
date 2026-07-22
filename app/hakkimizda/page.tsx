import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Kurumsal | Veluxe Premium',
  description: 'Veluxe Home & Living kurumsal hikayesi, üretim felsefesi ve kalite anlayışı.',
};

export default function CorporatePage() {
  return (
    <main className="max-w-[1920px] mx-auto pt-16 pb-24 md:pt-24 md:pb-32">
      
      {/* BAŞLIK ALANI */}
      <div className="px-4 sm:px-8 xl:px-24 mb-20 md:mb-32 text-center max-w-4xl mx-auto">
        <span className="text-[10px] uppercase tracking-[0.3em] text-gray-400 font-medium block mb-4">Hakkımızda</span>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-light text-gray-900 tracking-tight mb-6">
          Zarafetin ve Ustalığın Hikayesi
        </h1>
        <p className="text-sm md:text-base text-gray-500 font-light leading-relaxed">
          Veluxe Home & Living olarak, yaşam alanlarınızı sıradanlıktan kurtaran, estetik ve konforun kusursuz bir dengeyle buluştuğu zamansız mobilyalar tasarlıyoruz.
        </p>
      </div>

      {/* 1. BÖLÜM: Sol Görsel, Sağ Metin */}
      <div className="px-4 sm:px-8 xl:px-24 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center mb-24 md:mb-32">
        <div className="w-full flex justify-center bg-[#f9f9f9] border border-gray-100 p-3 md:p-6">
          <img
            src="/wp-content/uploads/2024/07/shop49-about-1.jpg"
            alt="Veluxe Üretim Felsefesi"
            className="max-w-full h-auto shadow-sm"
          />
        </div>
        <div className="flex flex-col justify-center">
          <span className="text-[10px] uppercase tracking-[0.25em] text-gray-400 font-medium block mb-6">Tutkuyla Şekillenen Detaylar</span>
          <h2 className="text-3xl md:text-4xl font-serif font-light text-gray-900 mb-8 leading-snug">
            Sıradan Bir Mobilya Değil, <br /> Geleceğe Bırakılan Bir Miras
          </h2>
          <p className="text-sm text-gray-500 font-light leading-relaxed mb-6">
            Her bir Veluxe tasarımı, usta zanaatkarlarımızın elinde özenle hayat bulur. Modoko'daki üretim tesisimizde, modern teknolojinin hassasiyetini geleneksel el işçiliğinin sıcaklığıyla birleştiriyoruz. Tasarımlarımız, trendlerin ötesine geçerek yıllarca estetiğini koruyacak bir vizyonla çizilir.
          </p>
          <p className="text-sm text-gray-500 font-light leading-relaxed">
            Amacımız sadece bir oturma alanı yaratmak değil; ailenizle birikecek anılara şahitlik edecek, yıllar geçtikçe değerine değer katacak karakterli parçalar üretmektir. Hakiki deri ve premium İtalyan kumaş seçimlerimiz, bu kalıcı vizyonun en temel yansımasıdır.
          </p>
        </div>
      </div>

      {/* 2. BÖLÜM: Sol Metin, Sağ Görsel */}
      <div className="px-4 sm:px-8 xl:px-24 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center mb-24 md:mb-32">
        <div className="flex flex-col justify-center order-2 lg:order-1">
          <span className="text-[10px] uppercase tracking-[0.25em] text-gray-400 font-medium block mb-6">Kalite Standartlarımız</span>
          <h2 className="text-3xl md:text-4xl font-serif font-light text-gray-900 mb-8 leading-snug">
            Ödün Verilmeyen Malzeme Kalitesi
          </h2>
          <p className="text-sm text-gray-500 font-light leading-relaxed mb-6">
            Görünmeyen kısımlarda bile mükemmelliği hedefliyoruz. İskeletlerimizde yalnızca fırınlanmış birinci sınıf gürgen ağacı kullanıyor, böylece esneme veya ses yapma gibi problemleri tamamen ortadan kaldırıyoruz. Dayanıklılık bizim için bir vaat değil, standarttır.
          </p>
          <p className="text-sm text-gray-500 font-light leading-relaxed mb-8">
            Oturum konforunun kalbinde ise 35 Dansite HR (High Resilience) yüksek elastikiyetli süngerler yer alır. Bu sayede koltuklarımız, yıllar süren kullanımdan sonra bile ilk günkü formunu ve ortopedik yapısını koruyarak bedeninizi kusursuzca destekler.
          </p>
          <Link
            href="/iletisim"
            className="inline-flex items-center text-[10px] uppercase tracking-[0.2em] font-medium text-gray-900 border-b border-gray-900 pb-1 w-max hover:opacity-60 transition-opacity"
          >
            Atölyemizle İletişime Geçin &rarr;
          </Link>
        </div>
        <div className="w-full flex justify-center bg-[#f9f9f9] border border-gray-100 p-3 md:p-6 order-1 lg:order-2">
          <img
            src="/wp-content/uploads/2024/07/shop49-about-2.jpg"
            alt="Veluxe Malzeme Kalitesi"
            className="max-w-full h-auto shadow-sm"
          />
        </div>
      </div>

      {/* 3. BÖLÜM: Tam Genişlikte Görsel ve Misyon */}
      <div className="px-4 sm:px-8 xl:px-24">
        <div className="w-full flex justify-center bg-[#f9f9f9] border border-gray-100 p-3 md:p-6 mb-16">
          <img
            src="/wp-content/uploads/2024/07/shop49-about-3.jpg"
            alt="Veluxe Tasarım Vizyonu"
            className="max-w-full h-auto shadow-sm"
          />
        </div>
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-serif font-light text-gray-900 mb-6">
            Lüks, Detaylarda Gizlidir
          </h2>
          <p className="text-sm text-gray-500 font-light leading-relaxed">
            Veluxe markası taşıyan her bir ürün, evinizin mimari yapısına ve sizin kişisel zevkinize göre özelleştirilebilir... Ataşehir'deki merkez ofisimizden ve Modoko'daki üretim bandımızdan çıkan her tasarım, evinize teslim edilene kadar titiz bir kalite kontrol sürecinden geçer. Biz, gerçek lüksün kusursuzlukta ve şeffaflıkta yattığına inanıyoruz.
          </p>
        </div>
      </div>

    </main>
  );
}