import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { categories } from '@/data';

export const metadata: Metadata = {
  title: 'Deri Koltuk Tamiri ve Yenileme Süreçleri | Veluxe Premium',
  description: 'Yıpranan, çizilen veya solan hakiki deri koltuklarınız için profesyonel tamir, bakım ve atölye yenileme hizmetlerimizi keşfedin.',
};

export default function LeatherRepairPage() {
  return (
    <main className="max-w-[1920px] mx-auto pt-16 pb-24 md:pt-24 md:pb-32">
      
      {/* BREADCRUMB */}
      <nav className="flex items-center justify-center gap-2 text-[10px] uppercase tracking-[0.2em] font-medium text-gray-400 mb-10 px-4">
        <Link href="/" className="hover:text-gray-900 transition-colors">Anasayfa</Link>
        <span className="text-gray-300">/</span>
        <span className="text-gray-900">Deri Koltuk Tamiri</span>
      </nav>

      {/* MAKALENİN BAŞLIĞI */}
      <header className="px-4 sm:px-8 xl:px-24 mb-16 md:mb-24 text-center max-w-4xl mx-auto">
        <span className="text-[10px] uppercase tracking-[0.3em] text-gray-400 font-medium block mb-4">Ustalık & Restorasyon</span>
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-serif font-light text-gray-900 tracking-tight mb-6 leading-tight">
          Deri Koltuk Tamiri Hakkında Bilmeniz Gerekenler
        </h1>
        <p className="text-sm md:text-base text-gray-500 font-light leading-relaxed">
          Zarafetin simgesi hakiki deri mobilyalarınızın ömrünü uzatmak, ilk günkü ihtişamını ve konforunu geri kazandırmak için atölye süreçlerimizle tanışın.
        </p>
      </header>

      {/* MAKALE İÇERİĞİ (Giriş) */}
      <section className="px-4 sm:px-8 xl:px-24 max-w-4xl mx-auto mb-20 md:mb-28 text-sm md:text-[1.05rem] text-gray-600 font-light leading-relaxed space-y-6">
        <p>
          Deri koltuklar, şık ve zarif bir görünüme sahip olmaları nedeniyle çok fazla tercih edilen mobilyalardandır. Ancak zamanla yıpranabilir, yırtılabilir, çizilebilir ya da deforme olabilirler. Bu yazımızda, deri koltuk tamiri hakkında bilmeniz gereken temel bilgileri ve önerileri bulabilirsiniz.
        </p>

        <h2 className="text-2xl font-serif font-light text-gray-900 pt-6 mb-4">Deri Koltukların Sorunları Nelerdir?</h2>
        <p>Hakiki deri koltukların kullanımında karşılaşılan en yaygın sorunlar şunlardır:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Çizikler ve Yırtıklar:</strong> Sert objeler, evcil hayvanlar ya da tırnaklar deriyi çizebilir ya da yırtabilir.</li>
          <li><strong>Renk Solması:</strong> Güneşe maruz kalan gerçek deri koltuklar zamanla renk kaybı yaşar.</li>
          <li><strong>Leke ve Kir:</strong> Dökülen içecekler ya da yağ lekeleri deriye zarar verebilir.</li>
          <li><strong>Kabarma ve Dökülme:</strong> Hakiki deri malzeme, çok kuru ya da nemli ortamlarda kabarabilir veya dökülebilir.</li>
        </ul>

        <h2 className="text-2xl font-serif font-light text-gray-900 pt-6 mb-4">Deri Koltuk Tamiri Yöntemleri</h2>
        <div className="space-y-4">
          <div>
            <h3 className="font-medium text-gray-900 mb-1">Çizik ve Yırtıkları Onarma:</h3>
            <p>Ufak çizikler için deri tamir kiti kullanabilirsiniz. Bu kitlerde genellikle dolgu malzemesi ve deri boyası bulunur. Daha büyük yırtıklar için profesyonel yardım almanız gerekebilir.</p>
          </div>
          <div>
            <h3 className="font-medium text-gray-900 mb-1">Renk Yenileme:</h3>
            <p>Deri boyama setleriyle solmuş bölgeleri yenileyebilirsiniz. Doğru renk tonunu seçmek çok önemlidir. Boyamadan önce deri yüzeyi temizlemeyi ve zımpara ile hazırlamayı unutmayın.</p>
          </div>
          <div>
            <h3 className="font-medium text-gray-900 mb-1">Leke Temizleme:</h3>
            <p>Deri özelliğine uygun temizlik ürünleri kullanın. Yağ lekeleri için karbonat gibi emici maddelerden yararlanabilirsiniz.</p>
          </div>
          <div>
            <h3 className="font-medium text-gray-900 mb-1">Koruma ve Bakım:</h3>
            <p>Deri koltuklarınızı neme karşı korumak için deri kremi kullanın. Haftalık temizliğini yaparak yıpranmanın önünü alabilirsiniz.</p>
          </div>
        </div>
      </section>

      {/* VİTRİN / SÜREÇ BÖLÜMÜ (Atölye Aşamaları) */}
      <section className="bg-[#f9f9f9] py-20 md:py-28 border-y border-gray-100 mb-20 md:mb-28">
        <div className="max-w-5xl mx-auto px-4 sm:px-8">
          <span className="text-[10px] uppercase tracking-[0.3em] text-gray-400 font-medium block mb-3 text-center">Adım Adım Restorasyon</span>
          <h2 className="text-3xl font-serif font-light text-gray-900 text-center mb-16 tracking-tight">
            Deri Koltukların Tamiri Nasıl Yapılıyor?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-8 border border-gray-100 flex flex-col justify-between">
              <span className="text-xs font-mono text-gray-400 mb-4 block">01</span>
              <h3 className="font-serif text-lg text-gray-900 mb-2">Ön Analiz ve WhatsApp</h3>
              <p className="text-xs text-gray-500 font-light leading-relaxed">Bakım, onarım veya yenileme ihtiyacı olan deri koltuklarınızın resimlerini bize WhatsApp üzerinden gönderiyorsunuz. Uzmanlarımız koltuklarınızın yenilenip yenilenemeyeceğini analiz ediyor.</p>
            </div>

            <div className="bg-white p-8 border border-gray-100 flex flex-col justify-between">
              <span className="text-xs font-mono text-gray-400 mb-4 block">02</span>
              <h3 className="font-serif text-lg text-gray-900 mb-2">Hakiki Deri Seçimi</h3>
              <p className="text-xs text-gray-500 font-light leading-relaxed">Mağazamıza ya da ofisimize gelerek yenilemede kullanılacak birinci sınıf hakiki deri seçimini yapıyor, fiyatlandırma onayından sonra sürecin %50 kapora adımı tamamlanıyor.</p>
            </div>

            <div className="bg-white p-8 border border-gray-100 flex flex-col justify-between">
              <span className="text-xs font-mono text-gray-400 mb-4 block">03</span>
              <h3 className="font-serif text-lg text-gray-900 mb-2">Ücretsiz Lojistik ve Söküm</h3>
              <p className="text-xs text-gray-500 font-light leading-relaxed">Sizin belirlediğiniz zaman aralığında eskimiş deri koltuklarınız adresinizden ücretsiz olarak alınıyor ve atölyemize getirilerek tamamen sökülüyor.</p>
            </div>

            <div className="bg-white p-8 border border-gray-100 flex flex-col justify-between">
              <span className="text-xs font-mono text-gray-400 mb-4 block">04</span>
              <h3 className="font-serif text-lg text-gray-900 mb-2">İskelet ve Boya Bakımı</h3>
              <p className="text-xs text-gray-500 font-light leading-relaxed">Ahşap ve metal aksamlar kontrol edilerek gerekli tamirler yapılıyor. İskelet sağlamlaştırıldıktan sonra görünür kısımlardaki ahşap yüzeyler özenle boyanıyor.</p>
            </div>

            <div className="bg-white p-8 border border-gray-100 flex flex-col justify-between">
              <span className="text-xs font-mono text-gray-400 mb-4 block">05</span>
              <h3 className="font-serif text-lg text-gray-900 mb-2">35 DNS Sünger Takviyesi</h3>
              <p className="text-xs text-gray-500 font-light leading-relaxed">Tüm süngerler 35 DNS kalitede ve seçtiğiniz yumuşaklık oranında yüksek kaliteli HR süngerlerle değiştirilerek ilk günkü oturum konforu sağlanıyor.</p>
            </div>

            <div className="bg-white p-8 border border-gray-100 flex flex-col justify-between">
              <span className="text-xs font-mono text-gray-400 mb-4 block">06</span>
              <h3 className="font-serif text-lg text-gray-900 mb-2">Dikiş, Kaplama ve Teslimat</h3>
              <p className="text-xs text-gray-500 font-light leading-relaxed">Katalogdan beğenmiş olduğunuz hakiki deri ile kaplama tamamlanıyor. Kendi araçlarımızla, tamamen ücretsiz olarak adresinize güvenle teslim ediliyor.</p>
            </div>
          </div>
        </div>
      </section>

      {/* SONUÇ VE ÖNERİLER */}
      <section className="px-4 sm:px-8 xl:px-24 max-w-4xl mx-auto mb-20 text-sm md:text-[1.05rem] text-gray-600 font-light leading-relaxed space-y-6">
        <h2 className="text-2xl font-serif font-light text-gray-900 pt-2 mb-4">Deri Koltukların Bakımında Dikkat Edilmesi Gerekenler</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>Koltuğunuzu direkt güneş ışığından koruyun.</li>
          <li>Keskin objelerden uzak tutarak yüzeyin zarar görmesini engelleyin.</li>
          <li>Nem oranı dengeli bir ortamda kullanın.</li>
        </ul>
        <p className="pt-4">
          Deri koltuk tamiri, hem estetik hem de fonksiyonel olarak mobilyanızı yenilemenin etkili bir yoludur. Doğru yöntemler ve düzenli bakımla koltuklarınızı uzun yıllar boyunca kullanabilirsiniz.
        </p>

        <div className="bg-[#151515] text-white p-8 md:p-12 text-center mt-12">
          <h3 className="text-2xl font-serif font-light mb-4">Profesyonel Yardım Almak İsterseniz</h3>
          <p className="text-gray-400 text-xs md:text-sm font-light mb-8 max-w-xl mx-auto">
            Derin yırtıklar, yoğun deformasyonlar veya anahtar teslim hakiki deri yenileme hizmeti için profesyonel ekibimizle hemen iletişime geçebilirsiniz.
          </p>
          <a 
            href="https://api.whatsapp.com/send/?phone=905424895826&text=Merhaba%3B+deri+koltuk+tamiri+için+bilgi+almak+istiyorum." 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-block bg-[#25D366] hover:bg-[#1ebd5b] text-white py-4 px-8 text-xs uppercase tracking-[0.2em] font-medium transition-colors"
          >
            WhatsApp ile Fotoğraf Gönderin
          </a>
        </div>
      </section>

      {/* KATEGORİLER (Sayfanın Altında 3'lü Grid Düzeni) */}
      <section className="mt-28 pt-16 border-t border-gray-100">
        <div className="max-w-[1920px] mx-auto px-4 sm:px-8 xl:px-24 mb-12">
          <div className="flex justify-between items-end">
            <h3 className="text-xs md:text-sm font-semibold text-gray-900 uppercase tracking-[0.2em]">
              Modern Deri Koltuk Modellerimizi İnceleyin
            </h3>
            <Link href="/koleksiyonlar" className="text-[10px] uppercase tracking-[0.2em] text-gray-400 hover:text-gray-900 transition-colors">
              Tümünü Gör &rarr;
            </Link>
          </div>
        </div>
        
        <div className="max-w-[1920px] mx-auto px-4 sm:px-8 xl:px-24 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((cat: any) => (
            <Link 
              key={cat.id} 
              href={`/${cat.slug}`} 
              className="group cursor-pointer block"
            >
              <div className="relative w-full aspect-[4/3] bg-[#f9f9f9] mb-4 overflow-hidden border border-gray-100">
                {cat.image ? (
                  <Image src={cat.image} alt={cat.title} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover transition-transform duration-[2000ms] ease-out group-hover:scale-[1.03]" />
                ) : null}
              </div>
              <h4 className="text-base text-gray-900 font-serif font-light tracking-wide">
                {cat.title}
              </h4>
              <span className="text-[10px] text-gray-400 mt-1 uppercase tracking-[0.2em] inline-block">
                Koleksiyonu İncele &rarr;
              </span>
            </Link>
          ))}
        </div>
      </section>

    </main>
  );
}