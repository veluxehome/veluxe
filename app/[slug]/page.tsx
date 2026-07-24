import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { categories, products, blogs } from '@/data';
import Link from 'next/link';
import Image from 'next/image';

// NEXT.JS 15 UYUMLU PROMISE YAPISI
type PageProps = {
  params: Promise<any>;
};

// ============================================================================
// KATEGORİLERE ÖZEL SEO VE SSS İÇERİKLERİ
// ============================================================================
const seoData: Record<string, any> = {
  'modern-koltuk-takimlari': {
    mainTitle: "Veluxe Modern Deri Koltuklar: Yaşam Alanlarında Lüks, Konfor ve Kusursuz Tasarım",
    intro: "Klasik deri koltukların zamana meydan okuyan dayanıklılığını ve asaletini, çağımızın dinamik tasarım anlayışıyla harmanlıyoruz. Veluxe modern deri koltuklar; minimalist çizgileri, göz alıcı detayları ve fonksiyonel yapılarıyla yaşam alanlarınıza yepyeni bir soluk getiriyor. Sıradanlığın ötesine geçmek ve mekanına imza niteliğinde bir dokunuş yapmak isteyenler için özenle tasarlanan bu koleksiyon, lüksü pratiklikle buluşturuyor.",
    articles: [
      {
        title: "Neden Veluxe Modern Deri Koltukları Tercih Etmelisiniz?",
        content: "Geçmişin ağırlığını taşıyan geleneksel modellerin aksine, yeni nesil tasarım anlayışımızla mekanlara ferahlık katıyoruz. Veluxe koleksiyonunun öne çıkan avantajları şunlardır:",
        list: [
          "Çok Yönlü Kullanım: İster modern bir ev salonu ister prestijli bir ofis ortamı olsun, tasarımlarımız her mekana mükemmel uyum sağlar.",
          "Zarif Detaylar: Özel tasarım ahşap veya metal ayak seçenekleriyle koltuklarımız, bulunduğu ortama zarif ve havalı bir duruş kazandırır.",
          "Esnek Modül Seçenekleri: Mekanınızın büyüklüğüne göre üçlü, ikili veya tekli formlarda tercih edebileceğiniz alternatiflerle alanınızı en verimli şekilde kullanabilirsiniz.",
          "Hakiki Deri Şıklığı: Kaliteli ve %100 hakiki deri kullanımı, mekanın genel atmosferini anında yükselterek üst düzey bir ambiyans yaratır."
        ]
      },
      {
        title: "Fiyatlandırma Kriterleri: Kalite ve Beklentilerinizin Uyumu",
        content: "Veluxe olarak şeffaflığa önem veriyoruz. Modern deri koltuk fiyatlarımızı belirleyen en temel unsur, kullandığımız derinin birinci sınıf kalitesidir. Bununla birlikte koltuğunuzun ölçüleri, tercih edilen modelin detayları, iskeletinde kullanılan malzemenin türü ve usta ellerden çıkan ince işçilik fiyat yelpazesini şekillendirir. Özel ölçü ve tasarım taleplerinizde fiyatlar projenin detaylarına göre değişkenlik gösterir. Kendi kriterlerinizi belirledikten sonra iletişim sayfamız üzerinden bize ulaşarak, hayalinizdeki koltuk için hızlıca fiyat teklifi alabilirsiniz."
      },
      {
        title: "130'dan Fazla Seçenekle Kendi Tarzınızı Yansıtın",
        content: "Mobilya seçimi kişisel bir yolculuktur. Veluxe showroom'unu ziyaret ederek farklı doku ve renk kombinasyonlarına sahip 130'dan fazla hakiki deri alternatifini yakından inceleyebilirsiniz. Renk seçimi yaparken çevrenizden ilham almanız doğal olsa da, en büyük hatanın tamamen başkalarının zevkine göre hareket etmek olduğunu unutmayın. İç mekanınızdaki diğer eşyaların renk paletini göz önünde bulundurarak, tamamen kendi şahsi zevkinizi yansıtan cesur veya dingin seçimler yapabilirsiniz."
      },
      {
        title: "Satın Almadan Önce Evinizde Görün: Veluxe Mimari Destek",
        content: "\"Acaba bu koltuk salonuma uyar mı?\" endişesini tamamen ortadan kaldırıyoruz. Modern deri koltuk modellerimizden birini beğendiğinizde, uzman ekibimiz tarafından sunulan mimari destek hizmetimiz devreye giriyor. Ürünü konumlandırmak istediğiniz alanın fotoğraflarını bizimle paylaşmanız yeterli. Seçtiğiniz modeli, tam da beğendiğiniz deri rengiyle birlikte bilgisayar ortamında mekanınıza 3D olarak yerleştiriyoruz. Böylece hiçbir sürprizle karşılaşmadan, kusursuz görünümden emin olarak siparişinizi verebilirsiniz."
      },
      {
        title: "%100 El İşçiliği ve Özel Ölçü Üretim (Ücretsiz Keşif)",
        content: "Standart ölçülere sıkışmak zorunda değilsiniz! Yaşam alanınıza veya ofisinize tam oturacak, mekansal verimliliği en üst düzeye çıkaracak özel ölçü üretim yapıyoruz. Talebiniz doğrultusunda sunduğumuz ücretsiz keşif hizmeti ile mekanınızda profesyonel ölçüm ve tasarım çalışmaları gerçekleştiriyoruz. Veluxe bünyesinde, tamamı usta zanaatkarlarımız tarafından %100 el işçiliğiyle ve İtalyan deri kalitesiyle üretilen koltuklarımız, yaşam alanlarınıza tam istediğiniz gibi entegre ediliyor."
      }
    ],
    care: {
      title: "Uzun Ömürlü Zarafet: Hakiki Deri Koltuk Bakımı Nasıl Yapılmalı?",
      content: "Veluxe deri koltuğunuzun ilk günkü canlılığını yıllarca koruması sizin elinizde. Doğru ve düzenli bir bakım rutini, hakiki derinin ömrünü ciddi oranda uzatır.",
      deep: "Koltuğunuzun kuruyup çatlamasını önlemek ve canlılığını artırmak için 3 ila 6 aylık periyotlarda badem yağı veya vazelin uygulayabilirsiniz. Önce yüzeyi kuru bir bezle tozdan arındırın. Ardından temiz bir bezle yağı dairesel hareketlerle deriye yedirin.",
      routine: "Günlük kullanımda oluşan tozlar için her 2-3 haftada bir kuru bezle toz almalı, ardından hafif nemli bir bez ve sadece beyaz sabun kullanarak nazikçe silmelisiniz.",
      warning: "Kolonya, alkol, aseton veya piyasada satılan ağır kimyasal içerikli leke çıkarıcı deterjanları hakiki deri koltuklarınızda kesinlikle kullanmayın. Güvenilir ve risksiz bir temizlik için sadece beyaz sabun ve nemli bez kullanılması önerilir."
    },
    faqs: [
      { q: "Modern deri koltuk ile klasik deri koltuk arasındaki fark nedir?", a: "Modern deri koltuklar, klasik derinin uzun ömürlü yapısını alır ancak daha minimalist çizgiler, çağdaş tasarımlar ve zarif metal/ahşap ayak detaylarıyla günümüz dekorasyon trendlerine tam uyum sağlar." },
      { q: "Veluxe deri koltuklar ofis kullanımı için uygun mudur?", a: "Evet, tasarımlarımız hem ev ortamının sıcaklığına hem de prestijli ofis ortamlarının profesyonel ve lüks beklentisine hitap edecek çok yönlülüğe sahiptir." },
      { q: "Hakiki deri koltuğumun zamanla çatlamasını nasıl önlerim?", a: "Derinin esnekliğini kaybetmemesi için 3 veya 6 aylık periyotlarda badem yağı veya vazelin ile dairesel hareketler yaparak deriyi beslemeniz çatlamaları büyük ölçüde önleyecektir." },
      { q: "Deri koltuk temizliğinde hangi kimyasallardan uzak durmalıyım?", a: "Derinin doğal yapısına zarar verecek aseton, alkol, kolonya ve ağır kimyasal barındıran deterjanlardan kesinlikle uzak durulmalıdır." },
      { q: "Odamdaki diğer eşyalarla uyumlu rengi nasıl bulabilirim?", a: "Veluxe mağazamızda 130'dan fazla farklı renk ve doku alternatifi bulunmaktadır. Mimari ekibimizle birlikte mekanınızın paletine en uygun seçimi yapabilirsiniz." },
      { q: "Salonumun ölçüleri standart dışı, özel ölçü üretim yapıyor musunuz?", a: "Evet, yaşam alanlarına tam uyum sağlaması için ücretsiz keşif hizmeti sunuyor ve beğendiğiniz modeli sizin ölçülerinize göre %100 el işçiliğiyle özel olarak üretiyoruz." }
    ]
  },
  'chester-koltuk-takimlari': {
    mainTitle: "Veluxe Chester Deri Koltuklar: Klasik İngiliz Asaleti ve El İşçiliğinin Zirvesi",
    intro: "Chesterfield tarzının ikonik kapitone (düğme) detaylarını, yuvarlatılmış kol yapılarını ve asil duruşunu Veluxe'ün üstün el işçiliğiyle yeniden yorumluyoruz. %100 hakiki deri kullanılarak tamamen elde üretilen Chester koltuklarımız, bulunduğu mekana prestij katarak klasik bir atmosfer yaratır.",
    articles: [
      {
        title: "Neden Chester Deri Koltuk Tercih Etmelisiniz?",
        content: "Chester koltuklar, geçici bir moda akımı değil, nesilden nesile aktarılan bir sanat eseridir.",
        list: [
          "Zamansız Tasarım: Yüzyıllardır popülerliğini kaybetmeyen kapitone işçiliği.",
          "Prestijli Görünüm: Hem makam odalarında hem de lüks ev salonlarında gücü ve zarafeti temsil eder.",
          "El İşçiliği: Her bir düğme ve katlama detayı, ustalarımız tarafından santim santim elde işlenir."
        ]
      },
      {
        title: "Özel Üretim ve Kişiselleştirme",
        content: "Chester modelinin o ağırbaşlı duruşunu kendi mekanınıza göre şekillendirebilirsiniz. İstediğiniz ölçüde, istediğiniz deri renginde ve ister üçlü ister köşe formunda özel üretim gerçekleştirmekteyiz."
      }
    ],
    care: {
      title: "Chester Deri Koltuk Bakımı Nasıl Yapılır?",
      content: "Kapitone (düğmeli) alanların toz tutmaması için haftalık olarak kuru ve yumuşak uçlu bir fırça veya bezle tozunun alınması önemlidir.",
      deep: "Düğme aralarına girmeyecek şekilde, düz yüzeylere 3-6 ayda bir vazelin veya badem yağı uygulayarak derinin beslenmesini ve çatlamamasını sağlayabilirsiniz.",
      routine: "Düğme çukurlarında ıslaklık kalmamasına özen göstererek hafif nemli ve beyaz sabunlu bir bezle rutin temizliğini yapabilirsiniz.",
      warning: "Düğme ve dikiş iplerine zarar vermemek adına sert fırçalar ve kimyasal çözücüler kullanmaktan kaçının."
    },
    faqs: [
      { q: "Chester koltukların üretim süresi ne kadardır?", a: "Tamamen el işçiliği ve kapitone detaylarının yoğunluğu nedeniyle üretim süreci modele ve özel ölçülere göre değişkenlik gösterir. Ortalama üretim süresi için ekibimizden bilgi alabilirsiniz." },
      { q: "Chester koltukta sünger çökmesi olur mu?", a: "Hayır, Veluxe Chester koltuklarında fırınlanmış gürgen iskelet ve 35 DNS yüksek yoğunluklu soft sünger kullanıldığı için zamanla çökme veya form kaybı yaşanmaz." },
      { q: "Kapitone düğmeleri zamanla kopar mı?", a: "Üretimde yüksek mukavemetli özel ipler ve kilitli dikiş teknikleri kullanıldığı için düğmelerin kopma veya gevşeme riski yoktur." }
    ]
  },
  'berjer-modelleri': {
    mainTitle: "Veluxe Deri Berjer Modelleri: Mekanın Yıldızı ve Kişisel Konfor Alanınız",
    intro: "Bir odanın karakterini tek başına değiştirebilen berjerler, Veluxe'ün hakiki deri kalitesi ve ergonomik tasarımıyla buluşuyor. İster kitap okuma köşenizde kişisel bir sığınak, ister salon takımınızın en şık tamamlayıcısı olarak kullanın; deri berjerlerimiz her açından kusursuz bir konfor sunar.",
    articles: [
      {
        title: "Deri Berjer Kullanım Avantajları",
        content: "Berjerler, yaşam alanlarında esneklik sağlayan en önemli mobilyalardır.",
        list: [
          "Fokus Noktası (Accent Piece): Farklı bir deri rengi seçilerek mekanda dikkat çekici bir odak noktası yaratılabilir.",
          "Ergonomik Destek: Omurga yapısına uygun tasarımlarıyla uzun süreli oturuşlarda bile üstün rahatlık sağlar.",
          "Kolay Konumlandırma: Şömine kenarı, pencere önü veya ofis köşeleri gibi alanları anında değerlendirir."
        ]
      }
    ],
    care: {
      title: "Deri Berjer Bakımı",
      content: "Berjerleriniz genellikle en çok kullanılan oturma alanları olduğu için bakımı ihmal edilmemelidir.",
      deep: "6 ayda bir vazelin ile dairesel masaj yaparak derinin nefes almasını sağlayabilirsiniz.",
      routine: "Sadece nemli bez ve beyaz sabun ile haftalık toz alma işlemi yeterlidir.",
      warning: "Özellikle cam kenarına konumlandırılan berjerleri güneşin doğrudan ve sürekli UV ışınlarından korumak derinin ömrünü uzatacaktır."
    },
    faqs: [
      { q: "Berjerleri mevcut kumaş koltuk takımımla kullanabilir miyim?", a: "Kesinlikle! Kumaş koltuklarla kombinlenen hakiki deri bir berjer, mekana zengin bir doku ve eklektik bir şıklık katar." },
      { q: "Ayak kısımlarını ahşap veya metal olarak değiştirebiliyor muyuz?", a: "Evet, mekanınızın dekorasyon diline uygun olarak berjerlerimizin ayak tasarımlarında (ahşap, krom, mat siyah metal vb.) değişiklik yapabiliyoruz." }
    ]
  },
  'kose-koltuk-takimlari': {
    mainTitle: "Veluxe Deri Köşe Koltuk Takımları: Maksimum Oturum Alanı, Üstün Konfor",
    intro: "Geniş aileler, misafir ağırlamayı sevenler veya mekanını en verimli şekilde kullanmak isteyenler için özel olarak tasarlanan deri L ve U köşe koltuk takımları. Hem dinlenme uzanmaları hem de geniş sohbet alanları için ideal olan bu takımlar, salonunuzun mimarisiyle bütünleşerek kesintisiz bir şıklık sunar.",
    articles: [
      {
        title: "Köşe Koltuk Tercih Etmenin Nedenleri",
        content: "Mimari açıdan alanı en efektif kullanan mobilyalar köşe takımlarıdır.",
        list: [
          "Alan Tasarrufu: Odanın ölü köşelerini değerlendirerek mekanın ortasını ferah bırakır.",
          "Sosyal Atmosfer: L formu sayesinde oturan kişilerin birbirini rahatça görmesini ve sıcak bir sohbet ortamı oluşmasını sağlar.",
          "Lüks ve Görkem: Bütünsel hakiki deri kaplaması, odada büyük ve kesintisiz bir lüks algısı yaratır."
        ]
      }
    ],
    care: {
      title: "Büyük Deri Yüzeylerin Bakımı",
      content: "Geniş yüzey alanına sahip köşe koltuklarda temizlik ve bakım, parçalara ayrılarak yapılmalıdır.",
      deep: "Mevsim geçişlerinde (yılda 2-3 kez) badem yağı veya vazelin ile derinlemesine besleme yapabilirsiniz.",
      routine: "Beyaz sabunlu nemli bezle tüm yüzeyleri sildikten sonra, mutlaka kuru bir bezle üzerinden geçerek nemi alın.",
      warning: "Büyük takımlarda leke oluşumunda kimyasal kullanmak yerine anında sabunlu bez ile müdahale edilmelidir."
    },
    faqs: [
      { q: "Köşe yönünü (Sağ veya Sol) biz belirleyebilir miyiz?", a: "Tüm siparişlerimiz mekanınıza özel üretildiği için köşe uzanma yönünü sağ veya sol olarak dilediğiniz gibi belirleyebilirsiniz." },
      { q: "Köşe takımları modüler midir, sonradan parça eklenebilir mi?", a: "Modellerimizin büyük bir kısmı modüler yapıya sahiptir. Taşınma veya mekan değişikliği durumlarında sonradan orta modül veya puf eklemesi yapılabilir." }
    ]
  },
  'puf-modelleri': {
    mainTitle: "Veluxe Deri Puf Modelleri: Tamamlayıcı Şıklık ve Pratik Kullanım",
    intro: "Yaşam alanlarındaki ufak ama en işlevsel dokunuş... Veluxe hakiki deri puflar, ister ayak uzatma alanı, ister ekstra bir oturma birimi, isterseniz de üzerine şık bir tepsi koyarak orta sehpa alternatifi olarak kullanabileceğiniz çok yönlü mobilyalardır.",
    articles: [
      {
        title: "Mekanda Puf Kullanımının Ayrıcalıkları",
        content: "Büyük mobilyaların bıraktığı boşlukları zarafetle doldurur.",
        list: [
          "Portatiflik: Hafif yapısıyla odanın her köşesine kolayca taşınabilir.",
          "Orta Sehpa Alternatifi: Üzerine şık bir ahşap tepsi yerleştirilerek modern bir sehpa işlevi görebilir.",
          "Ekstra Konfor: Koltuğunuzda dinlenirken ayak uzatma modülü olarak üstün konfor sağlar."
        ]
      }
    ],
    care: {
      title: "Deri Puf Bakımı",
      content: "Genellikle ayak uzatmak için veya ekstra eşya koymak için kullanıldığından temizliği pratiktir.",
      deep: "Deri koltuklarınıza uyguladığınız vazelin bakımını, aynı esnada pufunuza da uygulayabilirsiniz.",
      routine: "Nemli bez ve sabun ile haftalık silmeniz yeterlidir.",
      warning: "Sivri uçlu veya kesici objeleri puf yüzeyine direkt bırakmamaya özen gösterin."
    },
    faqs: [
      { q: "Puflar mevcut koltuğumla aynı renk ve deriden mi üretiliyor?", a: "Evet, eğer takım olarak alıyorsanız birebir aynı deriden üretilir. Dilerseniz farklı bir renk seçerek zıt bir uyum (kontrast) da yaratabilirsiniz." },
      { q: "Pufların yüksekliği koltuklarla aynı mı?", a: "Ergonomik kullanım (ayak uzatma) için puflarımızın standart yüksekliği koltuk oturum hizasıyla aynı hizada tasarlanmaktadır, ancak özel ölçü de talep edilebilir." }
    ]
  }
};

// 1. DİNAMİK SEO META ETİKETLERİ
export async function generateMetadata(props: PageProps): Promise<Metadata> {
  const resolvedParams = await props.params;
  
  const currentSlug = resolvedParams.slug || resolvedParams.Slug || resolvedParams.categorySlug;
  
  const category = categories.find((c) => c.slug === currentSlug);
  if (category) {
    return {
      // Örnek Çıktı: Chester Koltuk Takımları - Hakiki Deri Koltuk Modelleri | Veluxe
      title: `${category.title} - Hakiki Deri Koltuk Modelleri | Veluxe`,
      description: `Veluxe ${category.title} koleksiyonu. %100 hakiki ve gerçek deri ile üretilen, evinize özel tasarım lüks deri koltukları keşfedin.`,
    };
  }

  const blog = blogs.find((b) => b.slug === currentSlug);
  if (blog) {
    return {
      title: `${blog.title} | Veluxe Blog`,
      description: blog.excerpt,
      openGraph: {
        title: blog.title,
        description: blog.excerpt,
        images: [blog.coverImage],
        type: 'article',
      }
    };
  }

  return { title: 'Sayfa Bulunamadı | Veluxe' };
}

// 2. SAYFA OLUŞTURUCU
export default async function DynamicRootPage(props: PageProps) {
  const resolvedParams = await props.params;
  
  const currentSlug = resolvedParams.slug || resolvedParams.Slug || resolvedParams.categorySlug;

  // --- A) KATEGORİ İSE ÇALIŞACAK KISIM ---
  const category = categories.find((c) => c.slug === currentSlug);
  if (category) {
    const categoryProducts = products.filter(p => p.categorySlug === category.slug);

    // Kategoriye ait SEO datası var mı kontrol et (Eğer yoksa genel Modern Koltuklar taslağını kullan)
    const content = seoData[category.slug] || seoData['modern-koltuk-takimlari'];

    // FAQ SCHEMA (Google Rich Snippets için)
    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": content.faqs.map((faq: any) => ({
        "@type": "Question",
        "name": faq.q,
        "acceptedAnswer": { "@type": "Answer", "text": faq.a }
      }))
    };
    
    return (
      <>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

        <div className="max-w-[1920px] mx-auto px-4 sm:px-8 xl:px-24 py-12 md:py-20">
          
          {/* YENİ EKLENEN BREADCRUMB */}
          <nav className="flex items-center justify-center gap-2 text-[10px] uppercase tracking-[0.2em] font-medium text-gray-400 mb-8">
            <Link href="/" className="hover:text-gray-900 transition-colors">Anasayfa</Link>
            <span className="text-gray-300">/</span>
            <Link href="/koleksiyonlar" className="hover:text-gray-900 transition-colors">Koleksiyonlar</Link>
            <span className="text-gray-300">/</span>
            <span className="text-gray-900 truncate max-w-[200px]">{category.title}</span>
          </nav>

          <div className="mb-12 md:mb-20 text-center">
            {/* Sayfadaki tek H1 */}
            <h1 className="text-3xl md:text-5xl font-serif font-light text-gray-900 mb-4">{category.title}</h1>
            <p className="text-sm text-gray-500 font-light tracking-[0.2em] uppercase">Premium Koleksiyon</p>
          </div>
          
          {/* Ürün Listeleme: Masaüstünde 3'lü (lg:grid-cols-3) sıralanır */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16 max-w-[1400px] mx-auto">
            {categoryProducts.map((product) => (
              <Link key={product.slug} href={`/urun/${product.slug}`} className="group flex flex-col cursor-pointer">
                <div className="relative w-full aspect-[4/3] bg-[#f9f9f9] mb-5 overflow-hidden border border-gray-100">
                  {product.images && product.images.length > 0 ? (
                    <Image src={product.images[0]} alt={product.title} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover transition-transform duration-[2000ms] ease-out group-hover:scale-[1.02]" />
                  ) : (
                      <div className="flex items-center justify-center w-full h-full text-gray-300">Görsel Yok</div>
                  )}
                </div>
                <h4 className="text-sm text-gray-900 font-serif font-light tracking-wide truncate">{product.title}</h4>
                <p className="text-[10px] text-gray-400 mt-1.5 uppercase tracking-[0.2em] font-medium">{product.sku}</p>
              </Link>
            ))}
          </div>
        </div>

        {/* SEO VE SSS BÖLÜMÜ - Tek Sütun Alt Alta Yapı */}
        <section className="border-t border-gray-100 bg-[#fdfcfb] py-24 mt-10">
          <div className="max-w-4xl mx-auto px-4 sm:px-8">
            <div className="space-y-20">
              
              {/* 1. SEO İÇERİK METNİ */}
              <div className="space-y-12 text-gray-800">
                
                <article>
                  <h2 className="text-2xl md:text-3xl font-serif font-light tracking-tight mb-6 text-gray-900 text-balance">
                    {content.mainTitle}
                  </h2>
                  <p className="text-base font-light leading-relaxed text-gray-600">
                    {content.intro}
                  </p>
                </article>

                {content.articles.map((article: any, index: number) => (
                  <article key={index}>
                    <h2 className="text-xl md:text-2xl font-serif font-light tracking-tight mb-6 text-gray-900">
                      {article.title}
                    </h2>
                    <p className="text-base font-light leading-relaxed text-gray-600 mb-6">
                      {article.content}
                    </p>
                    {article.list && (
                      <ul className="space-y-4 text-base font-light text-gray-600 pl-2">
                        {article.list.map((item: string, i: number) => {
                          const [boldPart, ...rest] = item.split(': ');
                          return (
                            <li key={i} className="flex items-start">
                              <span className="mr-3 text-[#c25b19] mt-1.5 text-[10px]">■</span>
                              <span>
                                {rest.length > 0 ? (
                                  <><strong>{boldPart}:</strong> {rest.join(': ')}</>
                                ) : (
                                  item
                                )}
                              </span>
                            </li>
                          )
                        })}
                      </ul>
                    )}
                  </article>
                ))}

                <article className="bg-white p-8 border border-gray-100 shadow-sm mt-8">
                  <h2 className="text-xl md:text-2xl font-serif font-light tracking-tight mb-6 text-gray-900">
                    {content.care.title}
                  </h2>
                  <p className="text-base font-light leading-relaxed text-gray-600 mb-6">
                    {content.care.content}
                  </p>
                  
                  <h3 className="font-medium text-gray-900 mb-3 uppercase tracking-wide text-sm">Derinlemesine Bakım</h3>
                  <p className="text-base font-light leading-relaxed text-gray-600 mb-8">
                    {content.care.deep}
                  </p>

                  <h3 className="font-medium text-gray-900 mb-3 uppercase tracking-wide text-sm">Rutin Temizlik</h3>
                  <p className="text-base font-light leading-relaxed text-gray-600 mb-6">
                    {content.care.routine}
                  </p>

                  <div className="bg-gray-50 border-l-4 border-gray-900 p-4 text-sm font-light text-gray-600">
                    <strong className="text-gray-900 font-medium">Önemli Uyarı:</strong> {content.care.warning}
                  </div>
                </article>

              </div>

              {/* 2. SIKÇA SORULAN SORULAR (ACCORDION) */}
              <div className="pt-16">
                <div className="text-center mb-10">
                  <span className="text-[10px] uppercase tracking-[0.3em] text-gray-400 font-medium block mb-3">
                    Bilinmesi Gerekenler
                  </span>
                  <h2 className="text-2xl md:text-3xl font-serif font-light tracking-tight text-gray-900">
                    Sıkça Sorulan Sorular
                  </h2>
                </div>
                
                <div className="space-y-4">
                  {content.faqs.map((faq: any, index: number) => (
                    <details key={index} className="group border border-gray-200 bg-white p-6 rounded-sm [&_summary::-webkit-details-marker]:hidden shadow-sm hover:shadow-md transition-shadow">
                      <summary className="flex cursor-pointer items-center justify-between gap-1.5 text-gray-900">
                        <h3 className="font-serif text-lg font-light pr-4">{faq.q}</h3>
                        <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                        </span>
                      </summary>
                      <p className="mt-4 leading-relaxed text-gray-600 font-light text-base border-t border-gray-100 pt-4">
                        {faq.a}
                      </p>
                    </details>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </section>
      </>
    );
  }

  // --- B) BLOG İSE ÇALIŞACAK KISIM ---
  const blog = blogs.find((b) => b.slug === currentSlug);
  if (blog) {
    const jsonLd = {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: blog.title,
      image: [blog.coverImage],
      datePublished: blog.date,
      author: { '@type': 'Organization', name: 'Veluxe Premium' },
      description: blog.excerpt,
    };

    return (
      <>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <article className="max-w-4xl mx-auto px-4 sm:px-8 py-12 md:py-20">
          
          <nav className="flex items-center justify-center gap-2 text-[10px] uppercase tracking-[0.2em] font-medium text-gray-400 mb-10">
            <Link href="/" className="hover:text-gray-900 transition-colors">Anasayfa</Link>
            <span className="text-gray-300">/</span>
            <Link href="/blog" className="hover:text-gray-900 transition-colors">Blog</Link>
            <span className="text-gray-300">/</span>
            <span className="text-gray-900 truncate max-w-[200px]">{blog.title}</span>
          </nav>

          <header className="text-center mb-16">
            <time className="text-[10px] tracking-[0.3em] text-gray-400 uppercase font-medium mb-4 block">
              {new Date(blog.date).toLocaleDateString('tr-TR', { year: 'numeric', month: 'long', day: 'numeric' })}
            </time>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-serif font-light text-gray-900 leading-[1.2] mb-8 text-balance">
              {blog.title}
            </h1>
            {blog.coverImage && (
              <div className="relative w-full aspect-[21/9] bg-[#f9f9f9] overflow-hidden mt-12 border border-gray-100">
                <Image src={blog.coverImage} alt={blog.title} fill sizes="100vw" className="object-cover" priority />
              </div>
            )}
          </header>

          <div 
            className="text-sm md:text-[1.05rem] text-gray-600 font-light leading-relaxed [&>h2]:text-2xl [&>h2]:font-serif [&>h2]:text-gray-900 [&>h2]:mt-12 [&>h2]:mb-6 [&>h3]:text-xl [&>h3]:font-serif [&>h3]:text-gray-900 [&>h3]:mt-10 [&>h3]:mb-4 [&>p]:mb-6 [&>ul]:list-disc [&>ul]:pl-6 [&>ul]:mb-6 [&>ol]:list-decimal [&>ol]:pl-6 [&>ol]:mb-6 [&>li]:mb-2 [&>strong]:font-medium [&>strong]:text-gray-900 [&>a]:text-[#c25b19] [&>a]:underline"
            dangerouslySetInnerHTML={{ __html: blog.content.replace(/\\n/g, '<br/>').replace(/\n/g, '<br/>') }}
          />
        </article>
      </>
    );
  }

  // C) HİÇBİRİ DEĞİLSE 404
  notFound();
}