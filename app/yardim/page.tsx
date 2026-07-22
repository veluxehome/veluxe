"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function HelpPage() {
  const [activeTab, setActiveTab] = useState('odeme');
  const [copiedText, setCopiedText] = useState<string | null>(null);

  const tabs = [
    { id: 'odeme', label: 'Ödeme Seçenekleri' },
    { id: 'teslimat', label: 'Teslimat Seçenekleri' },
    { id: 'garanti', label: 'Garanti Koşulları' },
    { id: 'kvkk', label: 'KVKK Politikası' },
    { id: 'mesafeli-satis', label: 'Mesafeli Satış Sözleşmesi' },
    { id: 'iade', label: 'İade Koşulları' },
  ];

  // URL Hash desteği (#garanti, #odeme vb.)
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash && tabs.some(t => t.id === hash)) {
        setActiveTab(hash);
      }
    };
    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const handleTabChange = (id: string) => {
    setActiveTab(id);
    window.history.pushState(null, '', `#${id}`);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(text);
    setTimeout(() => setCopiedText(null), 2000);
  };

  return (
    <main className="max-w-[1920px] mx-auto pt-16 pb-24 md:pt-24 md:pb-32">
      
      {/* BREADCRUMB */}
      <nav className="flex items-center justify-center gap-2 text-[10px] uppercase tracking-[0.2em] font-medium text-gray-400 mb-8 px-4">
        <Link href="/" className="hover:text-gray-900 transition-colors">Anasayfa</Link>
        <span className="text-gray-300">/</span>
        <span className="text-gray-900">Yardım & Yasal Bilgilendirme</span>
      </nav>

      {/* BAŞLIK */}
      <header className="px-4 sm:px-8 xl:px-24 mb-16 text-center max-w-4xl mx-auto">
        <span className="text-[10px] uppercase tracking-[0.3em] text-gray-400 font-medium block mb-3">Müşteri Rehberi & Yasal</span>
        <h1 className="text-3xl md:text-5xl font-serif font-light text-gray-900 tracking-tight mb-6">
          Yardım ve Destek Merkezi
        </h1>
        <div className="bg-[#f9f9f9] border border-gray-100 p-6 md:p-8 text-xs md:text-sm text-gray-600 font-light leading-relaxed max-w-3xl mx-auto">
          <p className="mb-4">
            Aklınıza takılan birçok soruya aşağıda cevap verebileceğimizi düşünüyoruz.
          </p>
          <p className="mb-4">
            Buna rağmen herhangi bir konuda soru sormak veya sohbet etmek isterseniz{' '}
            <a href="tel:+902165768826" className="text-gray-900 font-medium underline">0216 576 88 26</a> nolu sabit hattımızdan ya da{' '}
            <a href="https://api.whatsapp.com/send/?phone=905424895826" target="_blank" rel="noopener noreferrer" className="text-gray-900 font-medium underline">0542 489 58 26</a> nolu mobil ve whatsapp numaramızdan bize ulaşabilirsiniz.
          </p>
          <p className="mb-2">
            İsterseniz <a href="mailto:info@veluxe.com.tr" className="text-[#c25b19] font-medium underline">info@veluxe.com.tr</a> mail adresimiz üzerinden de bize mesaj yollayabilirsiniz.
          </p>
          <p className="font-medium text-gray-900">Merak etmeyin! Temsilcimiz kısa sürede size cevap vermektedir.</p>
        </div>
      </header>

      {/* ANA YAPI: SOL MENÜ (SABİT) VE SAĞ İÇERİK */}
      <div className="max-w-[1920px] mx-auto px-4 sm:px-8 xl:px-24 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* SOL MENÜ (Mobilde yatay kayar, Masaüstünde solda sticky) */}
        <div className="lg:col-span-3 lg:sticky lg:top-32">
          <div className="flex lg:flex-col overflow-x-auto lg:overflow-visible gap-2 pb-4 lg:pb-0 scrollbar-hide border-b lg:border-b-0 border-gray-100">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
                className={`px-5 py-3.5 text-left text-[11px] uppercase tracking-[0.15em] font-medium transition-all whitespace-nowrap lg:whitespace-normal shrink-0 ${
                  activeTab === tab.id
                    ? 'bg-gray-900 text-white shadow-sm'
                    : 'bg-white lg:bg-transparent text-gray-600 hover:text-gray-900 hover:bg-gray-50 border border-gray-100 lg:border-transparent'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* SAĞ İÇERİK ALANI */}
        <div className="lg:col-span-9 bg-white p-6 md:p-12 border border-gray-100">
          
          {/* 1. ÖDEME SEÇENEKLERİ */}
          {activeTab === 'odeme' && (
            <div className="space-y-8">
              <h2 className="text-2xl md:text-3xl font-serif font-light text-gray-900 border-b border-gray-200 pb-4">
                Ödeme Seçenekleri
              </h2>

              <div className="space-y-6 text-sm text-gray-600 font-light leading-relaxed">
                <div>
                  <h3 className="text-base font-medium text-gray-900 mb-2">Ödeme Seçenekleri Nelerdir?</h3>
                  <p className="mb-2"><strong>Kredi kartı / Banka kartı ile ödeme:</strong> Siparişiniz anında onaylanır. Kredi kartına vade farkı ile taksit yapabiliyoruz. Vade seçeneklerini ödeme aşamasında görebilirsiniz.</p>
                  <p><strong>Havale ile ödeme:</strong> Siparişiniz 1 iş günü içinde onaylanır. Hesap numaralarımız aşağıdadır:</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
                  {/* Finansbank */}
                  <div className="bg-[#f9f9f9] p-5 border border-gray-100 text-xs space-y-2">
                    <p className="font-bold text-gray-900">Finansbank / EnPara Şb.(03663)</p>
                    <p className="text-gray-400">Swift Kodu: FNNBTRISXXX</p>
                    <p className="font-medium text-gray-800">Ela Teknoloji ve Tasarım San. Tic. Ltd. Şti.</p>
                    <hr className="border-gray-200 my-2"/>
                    <div>
                      <span className="text-gray-500 block">TL IBAN:</span>
                      <div className="flex items-center justify-between bg-white p-1.5 border mt-1">
                        <span className="font-mono text-[11px]">TR49 0015 7000 0000 0134 3729 48</span>
                        <button onClick={() => copyToClipboard("TR490015700000000134372948")} className="text-[10px] text-blue-600 underline px-1">
                          {copiedText === "TR490015700000000134372948" ? "Kopyalandı!" : "Kopyala"}
                        </button>
                      </div>
                    </div>
                    <div>
                      <span className="text-gray-500 block">USD IBAN:</span>
                      <div className="flex items-center justify-between bg-white p-1.5 border mt-1">
                        <span className="font-mono text-[11px]">TR03 0015 7000 0000 0134 4332 37</span>
                        <button onClick={() => copyToClipboard("TR030015700000000134433237")} className="text-[10px] text-blue-600 underline px-1">
                          {copiedText === "TR030015700000000134433237" ? "Kopyalandı!" : "Kopyala"}
                        </button>
                      </div>
                    </div>
                    <div>
                      <span className="text-gray-500 block">EUR IBAN:</span>
                      <div className="flex items-center justify-between bg-white p-1.5 border mt-1">
                        <span className="font-mono text-[11px]">TR56 0015 7000 0000 0134 4332 53</span>
                        <button onClick={() => copyToClipboard("TR560015700000000134433253")} className="text-[10px] text-blue-600 underline px-1">
                          {copiedText === "TR560015700000000134433253" ? "Kopyalandı!" : "Kopyala"}
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Halkbank */}
                  <div className="bg-[#f9f9f9] p-5 border border-gray-100 text-xs space-y-2">
                    <p className="font-bold text-gray-900">Halkbank / Kavacık Şb.(1473)</p>
                    <p className="text-gray-400">Swift Kodu: TRHBTR2A</p>
                    <p className="font-medium text-gray-800">Ela Teknoloji ve Tasarım San. Tic. Ltd. Şti.</p>
                    <hr className="border-gray-200 my-2"/>
                    <div>
                      <span className="text-gray-500 block">TL IBAN:</span>
                      <div className="flex items-center justify-between bg-white p-1.5 border mt-1">
                        <span className="font-mono text-[11px]">TR87 0001 2001 4730 0010 1018 66</span>
                        <button onClick={() => copyToClipboard("TR870001200147300010101866")} className="text-[10px] text-blue-600 underline px-1">
                          {copiedText === "TR870001200147300010101866" ? "Kopyalandı!" : "Kopyala"}
                        </button>
                      </div>
                    </div>
                    <div>
                      <span className="text-gray-500 block">USD IBAN:</span>
                      <div className="flex items-center justify-between bg-white p-1.5 border mt-1">
                        <span className="font-mono text-[11px]">TR13 0001 2001 4730 0053 1003 88</span>
                        <button onClick={() => copyToClipboard("TR130001200147300053100388")} className="text-[10px] text-blue-600 underline px-1">
                          {copiedText === "TR130001200147300053100388" ? "Kopyalandı!" : "Kopyala"}
                        </button>
                      </div>
                    </div>
                    <div>
                      <span className="text-gray-500 block">EUR IBAN:</span>
                      <div className="flex items-center justify-between bg-white p-1.5 border mt-1">
                        <span className="font-mono text-[11px]">TR98 0001 2001 4730 0058 1003 72</span>
                        <button onClick={() => copyToClipboard("TR980001200147300058100372")} className="text-[10px] text-blue-600 underline px-1">
                          {copiedText === "TR980001200147300058100372" ? "Kopyalandı!" : "Kopyala"}
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Garanti BBVA */}
                  <div className="bg-[#f9f9f9] p-5 border border-gray-100 text-xs space-y-2">
                    <p className="font-bold text-gray-900">Garanti BBVA / Küçükbakkalköy Şb.</p>
                    <p className="text-gray-400">Swift Kodu: TGBATRISXXX</p>
                    <p className="font-medium text-gray-800">Ela Teknoloji ve Tasarım San. Tic. Ltd. Şti.</p>
                    <hr className="border-gray-200 my-2"/>
                    <div>
                      <span className="text-gray-500 block">TL IBAN:</span>
                      <div className="flex items-center justify-between bg-white p-1.5 border mt-1">
                        <span className="font-mono text-[11px]">TR86 0006 2000 7690 0006 2907 25</span>
                        <button onClick={() => copyToClipboard("TR860006200076900006290725")} className="text-[10px] text-blue-600 underline px-1">
                          {copiedText === "TR860006200076900006290725" ? "Kopyalandı!" : "Kopyala"}
                        </button>
                      </div>
                    </div>
                    <div>
                      <span className="text-gray-500 block">USD IBAN:</span>
                      <div className="flex items-center justify-between bg-white p-1.5 border mt-1">
                        <span className="font-mono text-[11px]">TR05 0006 2000 7690 0009 0486 32</span>
                        <button onClick={() => copyToClipboard("TR050006200076900009048632")} className="text-[10px] text-blue-600 underline px-1">
                          {copiedText === "TR050006200076900009048632" ? "Kopyalandı!" : "Kopyala"}
                        </button>
                      </div>
                    </div>
                    <div>
                      <span className="text-gray-500 block">EUR IBAN:</span>
                      <div className="flex items-center justify-between bg-white p-1.5 border mt-1">
                        <span className="font-mono text-[11px]">TR32 0006 2000 7690 0009 0486 31</span>
                        <button onClick={() => copyToClipboard("TR320006200076900009048631")} className="text-[10px] text-blue-600 underline px-1">
                          {copiedText === "TR320006200076900009048631" ? "Kopyalandı!" : "Kopyala"}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4 pt-4">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-1">Kredi kartına taksit yapıyor musunuz?</h4>
                    <p>Kredi kartlarınıza 9 aya kadar taksit yapıyoruz. Vade seçeneklerini ödeme aşamasında görebilirsiniz.</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-1">Kredi kartı ile ödeme güvenli mi?</h4>
                    <p>Ödeme sistemimizin altyapısı Türkiye’nin en gelişmiş BDDK onaylı sistemleri PayTR tarafından sağlanmaktadır. Tüm kredi kartı bilgileri güvenli SSL sistemi ile bankaya şifrelenerek gönderiliyor. Veluxe olarak kredi kartınız ile ilgili hiçbir bilgiye erişemeyiz. Bununla birlikte Türkiye’nin en büyük dijital medya ajanslarından birisi olan Ela Ajans ile ödeme entegrasyonu konusunda iş birliği içerisindeyiz.</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 2. TESLİMAT SEÇENEKLERİ */}
          {activeTab === 'teslimat' && (
            <div className="space-y-8">
              <h2 className="text-2xl md:text-3xl font-serif font-light text-gray-900 border-b border-gray-200 pb-4">
                Teslimat Seçenekleri
              </h2>

              <div className="space-y-6 text-sm text-gray-600 font-light leading-relaxed">
                <div>
                  <h3 className="text-base font-medium text-gray-900 mb-2">Teslimat ve Kurulum Ücretli mi?</h3>
                  <p className="font-medium text-gray-900 mb-1">İstanbul İçin:</p>
                  <p className="mb-3">Teslimat Ücreti Yok! İstanbul’un tüm semtleri için teslimat ve kurulum ücreti ödemezsiniz. Satın almış olduğunuz ürünler randevulu olarak dairenize kadar getirilir ve ihtiyaç varsa kurulum tarafımızdan yapılır.</p>
                  
                  <p className="font-medium text-gray-900 mb-1">İstanbul Dışındaki Bölgeler İçin:</p>
                  <p>İstanbul dışındaki tüm bölgeler için teslimat ücreti eklenir. Bölgenizin uzaklığına göre anlaşmalı olduğumuz lojistik firmaları ya da Veluxe araçları ile mümkün olan en uygun sevkiyat ücreti ile satın almış olduğunuz ürünler randevulu olarak dairenize kadar getirilir ve kurulum Veluxe ustaları tarafından ücretsiz yapılır.</p>
                </div>

                <div>
                  <h3 className="text-base font-medium text-gray-900 mb-2">Teslimat Süresi Ne Kadar?</h3>
                  <p>Veluxe olarak kişiye ve kuruma özel konsept tasarımlar yapmaktayız. Prensip olarak stoklu çalışmamakta ve sipariş sonrasında üretim yapmaktayız. Bu nedenle satın almış olduğunuz ürünler ödemeniz onaylandıktan hemen sonra iş planımıza alınmaktadır. Seçmiş olduğunuz modele göre üretim süresi en az 10 – 30 iş günü arasındadır.</p>
                </div>

                <div>
                  <h3 className="text-base font-medium text-gray-900 mb-2">Teslimatta Gecikme Yaşarsam Ne Olur?</h3>
                  <p className="mb-2">Siparişinizin gecikmesi gibi bir durumla karşılaşmanızı asla istemeyiz. Teslimat süresi içerisine rastgelen resmi tatiller vb. bir durumdan ötürü siparişiniz gecikecek olursa, yetkilimiz sizi arayarak bilgi verecektir. Kontrolümüz dışında bir gecikme yaşanırsa da önceden bilgilendirilirsiniz.</p>
                  <p>Ancak teslimat ile ilgili herhangi bir sorun yaşarsanız bizi aramaktan çekinmeyin. Süreci sizin için hızlandırmamız için Whatsapp hattımız olan 0542 489 58 26 üzerinden bizimle iletişime geçebilirsiniz. Sorununuzu çözmek adına yanındayız!</p>
                </div>
              </div>
            </div>
          )}

          {/* 3. GARANTİ KOŞULLARI */}
          {activeTab === 'garanti' && (
            <div className="space-y-8">
              <h2 className="text-2xl md:text-3xl font-serif font-light text-gray-900 border-b border-gray-200 pb-4">
                Garanti Koşulları
              </h2>

              <div className="space-y-6 text-sm text-gray-600 font-light leading-relaxed">
                <div>
                  <h3 className="text-base font-medium text-gray-900 mb-2">Garanti Kapsamı Nedir?</h3>
                  <p className="mb-3">Standart mobilya ürünleri için yasal garanti süresi 2 (iki) yıldır. Ancak Veluxe olarak biz bu süreyi 4 yıla çıkartmaktayız. Satın almış olduğunuz ürün 4 yıl boyunca Veluxe garantisi altındadır. Bu garanti iskelet, sünger ve bazı ürünlerdeki çelik yay sistemleri için geçerlidir.</p>
                  <p className="mb-3">Kumaş ve suni deri ürünler kullanıldıkça eskidiği için garanti kapsamına girmez. Hatalı kullanıma bağlı deformasyonlar (çarpma, sürtme, yırtılma vb.) garanti kapsamında değildir!</p>
                  <p>Hakiki deri ile üretilmiş olan ürünlerimizdeki deri çok uzun yıllar dayanıklıdır. Ancak hakiki deri ürünlerinizin bakımlarını yapmanız ürünün daha uzun ömürlü ve ilk günkü formunda kalması için çok önemlidir.</p>
                </div>

                <div>
                  <h3 className="text-base font-medium text-gray-900 mb-2">Ürünümde Bir Hata Olduğunu Düşünüyorum?</h3>
                  <p className="mb-2">Ürünlerimiz tasarım konusunda uzman iç mimarlarımız tarafından çizilmekte ve kendi atölyelerimizde milimetrik olarak üretilmektedir. Portföyümüzdeki tüm ürünlerin teknik çizimleri, 2 ve 3 boyutlu görselleştirmeleri ve 360 derece sanallaştırmaları tarafımızdan hazırlanmaktadır.</p>
                  <p className="mb-2">Tüm bunlar üretim aşamasında detaylı olarak kullanılmakte ve üretimdeki olası hatalar %0’a indirgenmektedir. Buna rağmen satın almış olduğunuz üründe bir hata olması durumunda resmini çekerek bize yollamanız yeterlidir. Uzmanlarımız gerekli incelemeyi yapacak ve gerekli aksiyonları sizin için alacaktır.</p>
                  <p>Unutmayın! Veluxe olarak konfor odaklı yaşam alanları tasarlıyoruz. Üretimde kullanılan tüm malzemelerimiz premium ürünlerden oluşmaktadır.</p>
                </div>
              </div>
            </div>
          )}

          {/* 4. KVKK POLİTİKASI */}
          {activeTab === 'kvkk' && (
            <div className="space-y-8">
              <h2 className="text-2xl md:text-3xl font-serif font-light text-gray-900 border-b border-gray-200 pb-4">
                KVKK Politikası
              </h2>

              <div className="space-y-4 text-xs md:text-sm text-gray-600 font-light leading-relaxed max-h-[600px] overflow-y-auto pr-4 border p-6 bg-[#f9f9f9]">
                <p className="font-semibold text-gray-900">
                  ELA TEKNOLOJİ VE TASARIM SAN. TİC. LTD. ŞTİ. TARAFINDAN 6698 SAYILI KANUN KAPSAMINDA KİŞİSEL VERİLERİN İŞLENMESİ VE KORUNMASINA İLİŞKİN POLİTİKA
                </p>
                <p>
                  6698 Sayılı Kişisel Verilerin Korunması Kanunu (“Kanun”) 7 Nisan 2016 tarihinde yürürlüğe girmiştir. Kanun, kişisel verilerin “veri sorumlusu” olarak sınıflandırılan ve kişisel verilerin işleme amaçlarını ve vasıtalarını belirleyen, veri kayıt sisteminin kurulmasından ve yönetilmesinden sorumlu olan gerçek veya tüzel kişilerce kişisel verilerin işlenmesine ilişkin usul ve esasları ortaya koymaktadır.
                </p>
                <p>
                  İşbu doküman (“Politika”), Şirketimiz’in veri sorumlusu olarak kişisel verilerini işlediği gerçek kişilerin yukarıda belirtilen madde kapsamında aydınlatılması amacıyla kaleme alınmıştır. Bu Politika’nın konusu Şirketimiz’in müşterileri, kurumsal müşterilerinin hissedarları, yetkilileri ve çalışanları, potansiyel müşterileri, iş ortaklarımızın ve tedarikçilerimizin hissedarları, yetkilileri ve çalışanları ile çalışan adaylarımız, Şirketimiz’de eskiden çalışanlar ve stajyerlerimiz ile Şirketimizden emekli olan kişiler, ziyaretçilerimiz, şirket yetkilileri ile hissedarlarımız, iş ortağı ve tedarikçi adaylarımız ve sair üçüncü kişiler olup çalışanlarımıza ilişkin kişisel verilerin işlenmesine ilişkin hususlar Kanun’a uygun şekilde çalışanlara sunulan ayrı bir politika metni kapsamında düzenlenmektedir.
                </p>
                <p>
                  Şirketimiz tarafından kişisel veriler; Kimlik Bilgisi, İletişim Bilgisi, Lokasyon Verisi, Müşteri Bilgisi, Müşteri İşlem Bilgisi, Fiziksel Mekan Güvenlik Bilgisi, İşlem Güvenliği Bilgisi, Risk Yönetimi Bilgisi, Finansal Bilgi, Pazarlama Bilgisi, Hukuki İşlem ve Uyum Bilgisi, Talep/Şikayet Yönetimi Bilgisi, Görsel ve İşitsel Veriler kategorilerinde işlenmektedir.
                </p>
                <p>
                  Şirketimiz, kişisel verileri; bilgi güvenliği süreçlerinin yürütülmesi, bilgi teknolojileri altyapısının yönetimi, finans ve muhasebe işlerinin takibi, hukuk işleri, insan kaynakları süreçleri, iş faaliyetlerinin planlanması, müşteri ilişkileri yönetimi, müşteri memnuniyeti aktiviteleri, pazarlama faaliyetleri, lojistik süreçleri, sözleşme süreçlerinin takibi ve yasal yükümlülüklerin yerine getirilmesi amaçlarıyla işlemektedir.
                </p>
                <p>
                  Kanun’un 11. maddesine göre kişisel veri sahipleri; kendisi ile ilgili kişisel veri işlenip işlenmediğini öğrenme, buna ilişkin bilgi talep etme, işlenme amacını öğrenme, verilerin aktarıldığı üçüncü kişileri bilme, düzeltilmesini veya silinmesini isteme haklarına sahiptir. Başvurularınızı şirketimizin sisteminde kayıtlı bulunan elektronik posta adresiniz üzerinden iletebilirsiniz.
                </p>
              </div>
            </div>
          )}

          {/* 5. MESAFELİ SATIŞ SÖZLEŞMESİ */}
          {activeTab === 'mesafeli-satis' && (
            <div className="space-y-8">
              <h2 className="text-2xl md:text-3xl font-serif font-light text-gray-900 border-b border-gray-200 pb-4">
                Mesafeli Satış Sözleşmesi
              </h2>

              <div className="space-y-4 text-xs md:text-sm text-gray-600 font-light leading-relaxed max-h-[600px] overflow-y-auto pr-4 border p-6 bg-[#f9f9f9]">
                <p className="font-semibold text-gray-900 text-center uppercase">MESAFELİ SATIŞ SÖZLEŞMESİ</p>
                <p>İşbu sözleşme 06.03.2011 tarih ve 27886 sayılı Resmi Gazete’de yayımlanan Mesafeli Sözleşmeler Uygulama Usul ve Esasları Hakkında Yönetmelik gereğince internet üzerinden gerçekleştirilen satışlar için düzenlenmiştir.</p>
                
                <h4 className="font-medium text-gray-900 pt-2">MADDE 1- TARAFLAR</h4>
                <p><strong>1.1. Satıcı Bilgileri:</strong><br/>
                Ünvanı: Ela Teknoloji ve Tasarım San. Tic. Ltd. Şti.<br/>
                Adres: Küçükbakkalköy Mah. Ali Ay Sok. Orkide Apartmanı No:3/1 Ataşehir / İstanbul<br/>
                Telefon: 0216 576 88 26<br/>
                E-Mail: info@veluxe.com.tr</p>
                
                <p><strong>Alıcı Bilgileri:</strong> ALICI, işbu sözleşme hükümleri çerçevesinde www.veluxe.com.tr internet adresinden ürün satın alan gerçek veya tüzel kişidir.</p>

                <h4 className="font-medium text-gray-900 pt-2">MADDE 2- KONU</h4>
                <p>İşbu sözleşmenin konusu, ALICI’nın SATICI’ya ait www.veluxe.com.tr adresli internet sitesinden elektronik ortamda siparişini yaptığı ürünün satışı ve teslimi ile ilgili tarafların hak ve yükümlülüklerinin belirlenmesidir.</p>

                <h4 className="font-medium text-gray-900 pt-2">MADDE 3- CAYMA HAKKI</h4>
                <p>ALICI, sözleşme konusu ürünün kendisine veya gösterdiği adresteki kişi/kuruluşa tesliminden itibaren 7 (yedi) gün içinde ürünü kullanmadan, montaj yaptırmadan, tahrip etmeden/bozmadan satın almaktan vazgeçerek iade etme hakkına sahiptir. Ancak tüketicinin özel istek ve talepleri uyarınca üretilen veya kişiye özel hale getirilen mallarda cayma hakkı kullanılamaz.</p>
              </div>
            </div>
          )}

          {/* 6. İADE KOŞULLARI */}
          {activeTab === 'iade' && (
            <div className="space-y-8">
              <h2 className="text-2xl md:text-3xl font-serif font-light text-gray-900 border-b border-gray-200 pb-4">
                İade Koşulları
              </h2>

              <div className="space-y-6 text-sm text-gray-600 font-light leading-relaxed">
                <div className="bg-[#f9f9f9] p-6 border border-gray-100 space-y-4">
                  <h3 className="text-base font-medium text-gray-900">İADE KOŞULLARI</h3>
                  <p>SATICI, cayma bildiriminin kendisine ulaşmasından itibaren en geç 10 günlük süre içerisinde toplam bedeli ve ALICI’yı borç altına sokan belgeleri ALICI’ya iade etmek ve 20 günlük süre içerisinde malı iade almakla yükümlüdür.</p>
                  <p>ALICI’nın kusurundan kaynaklanan bir nedenle malın değerinde bir azalma olursa veya iade imkânsızlaşırsa ALICI kusuru oranında SATICI’nın zararlarını tazmin etmekle yükümlüdür. Ancak cayma hakkı süresi içinde malın veya ürünün usulüne uygun kullanılması sebebiyle meydana gelen değişiklik ve bozulmalardan ALICI sorumlu değildir.</p>
                  <p>Cayma hakkının kullanılması nedeniyle SATICI tarafından düzenlenen kampanya limit tutarının altına düşülmesi halinde kampanya kapsamında faydalanılan indirim miktarı iptal edilir.</p>
                </div>
              </div>
            </div>
          )}

        </div>

      </div>

    </main>
  );
}