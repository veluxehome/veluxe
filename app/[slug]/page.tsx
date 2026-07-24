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
  'koltuk-takimlari': {
    mainTitle: "Veluxe Hakiki Deri Koltuk Takımları: Yaşam Alanlarınızda Bütünsel Lüks",
    intro: "Evinizin kalbini oluşturan salonlar, birbirini kusursuzca tamamlayan parçalarla gerçek kimliğine kavuşur. Veluxe hakiki deri koltuk takımları; üçlü, ikili ve tekli (berjer) modüllerin eşsiz harmonisiyle yaşam alanlarınızda prestijli, dengeli ve elit bir atmosfer yaratır. Zarafeti ve üstün konforu bir arada sunan bu takımlar, hem ailenizle geçireceğiniz huzurlu akşamların hem de misafirlerinizi krallar gibi ağırlayacağınız anların başrol oyuncusudur.",
    articles: [
      {
        title: "Kusursuz Bir Salon İçin Neden Takım Tercih Etmelisiniz?",
        content: "Mobilyaları tek tek seçmek eklektik bir hava yaratsa da, birbiriyle aynı tasarım dilini konuşan parçalar mekanda görsel bir dinginlik ve otorite sağlar. Hakiki deri koltuk takımlarımızın yaşam alanınıza kattığı başlıca değerler şunlardır:",
        list: [
          "Bütünsel Şıklık: Tüm modüllerde aynı kalitede hakiki derinin, aynı kusursuz dikiş tekniklerinin ve uyumlu ayak detaylarının kullanılması, salonunuzda kesintisiz bir lüks algısı yaratır.",
          "Esnek Kombinasyonlar: Geniş aileler veya misafir ağırlamayı sevenler için kalıplara sığmıyoruz. İhtiyacınıza göre 3+3+1, 3+2+1 veya sadece 3+1 gibi esnek oturum senaryoları oluşturabilirsiniz.",
          "Mimari Denge: Takım olarak tasarlanan ürünler, odanın geometrisini daha doğru kullanmanızı sağlar. Üçlü koltuğun ağırlığını, zarif bir berjerle dengeleyerek mekansal bütünlüğü yakalarsınız."
        ]
      },
      {
        title: "Hakiki İtalyan Derisi ve Ödünsüz Kalite Anlayışı",
        content: "Bir koltuk takımını premium yapan şey sadece dış görünüşü değil, yıllar boyu sürecek dayanıklılığıdır. Veluxe koltuk takımlarının her bir parçası, zamanla güzelleşen ve nefes alan %100 hakiki İtalyan derisi ile kaplanır. İç mimarisinde ise asla esneme veya gıcırdama yapmayan fırınlanmış gürgen iskelet ve uzun saatler süren sohbetlerde bile formunu kaybetmeyen 35 DNS yüksek yoğunluklu soft sünger kullanılır."
      },
      {
        title: "Size ve Mekanınıza Özel Üretim (Ücretsiz Keşif)",
        content: "Her evin mimarisi ve her bireyin zevki parmak izi gibi benzersizdir. Bu nedenle standart ölçülere ve kalıplaşmış renklere mahkum değilsiniz. Beğendiğiniz koltuk takımını, salonunuzun fiziksel şartlarına en uygun ölçülerde yeniden boyutlandırıyoruz. İsterseniz takımın bir parçasını farklı bir renkte (örneğin üçlü koltuklar acı kahve, berjerler taba rengi) üreterek mekanınızda çok daha dinamik bir kontrast yaratabilirsiniz."
      }
    ],
    care: {
      title: "Deri Koltuk Takımınız İçin Bakım Rehberi",
      content: "Takımınızdaki tüm parçaların aynı oranda canlı kalması ve renk tonlarının yıllarca eşit durması için bakım rutininizi eşzamanlı uygulamalısınız.",
      deep: "Tüm parçalara aynı gün 3-6 aylık periyotlarla vazelin veya doğal badem yağı uygulayarak derinin kurumasını ve çatlamasını önleyin.",
      routine: "Haftalık toz alma işlemini yumuşak bir bezle yapın, temizlik gerektiğinde ise sadece nemli beyaz bir bez ve doğal beyaz sabun kullanın.",
      warning: "Takımınızın bir parçası pencere önünde (direkt güneş ışığında) duruyorsa, mevsim geçişlerinde parçaların yerlerini değiştirmek (örneğin iki adet üçlünün yerini kendi arasında değiştirmek) olası ton farklılıklarını kesin olarak önler."
    },
    faqs: [
      { q: "Takım içeriğini kendi salonuma göre değiştirebilir miyim?", a: "Kesinlikle. Standart paketlere bağlı kalmak zorunda değilsiniz. Mekanınızın büyüklüğüne göre sadece iki adet üçlü alabilir veya tek bir üçlünün yanına iki farklı berjer ekleyerek kendi takımınızı yaratabilirsiniz." },
      { q: "Takımdaki her koltuk için farklı renk deri seçebilir miyim?", a: "Evet, son yılların en popüler dekorasyon trendi olan 'kontrast' yaratmak adına berjerlerinizi veya ikili koltuğunuzu takımın ana renginden tamamen farklı bir tonda üretebiliriz." },
      { q: "Ürettiğiniz hakiki deri koltuk takımları terletme yapar mı?", a: "Hayır. Hakiki deri, gözenekleri olan ve nefes alabilen doğal bir materyaldir. Suni derilerin aksine hava sirkülasyonu sağladığı için yazın terletmez, kışın ise vücut ısınızı koruyarak üşütmez." }
    ]
  },
  'modern-koltuk-takimlari': {
    mainTitle: "Veluxe Modern Deri Koltuklar: Yaşam Alanlarında Lüks, Konfor ve Kusursuz Tasarım",
    intro: "Klasik deri koltukların o zamana meydan okuyan dayanıklılığını ve asaletini alıyor, çağımızın yenilikçi ve dinamik tasarım anlayışıyla harmanlıyoruz. Veluxe modern deri koltuk koleksiyonu; keskin minimalist çizgileri, heykelsi duruşları ve fonksiyonel yapılarıyla yaşam alanlarınıza fütüristik bir soluk getiriyor. Sıradanlığın ötesine geçmek ve mekanına imza niteliğinde bir dokunuş yapmak isteyenler için tasarlanan bu seri, lüksü pratiklikle buluşturuyor.",
    articles: [
      {
        title: "Neden Veluxe Modern Deri Koltukları Tercih Etmelisiniz?",
        content: "Geçmişin hantal ve ağır modellerinin aksine, yeni nesil tasarım dilimizle mekanlara ferahlık katıyoruz. Geleneksel işçilikle modern çizgileri birleştiren bu koleksiyonun sunduğu avantajlar:",
        list: [
          "Ferah ve Hafif İllüzyon: Genellikle ince metal veya zarif ahşap ayaklarla yerden yükseltilen bu modeller, odanın zeminini açıkta bırakarak mekanın çok daha geniş görünmesini sağlar.",
          "Çok Yönlü Karakter: Seçilen tasarıma göre hem sıcak bir ev salonunda hem de prestijli bir CEO ofisinde kusursuz bir uyum yakalar.",
          "Ergonomik Devrim: Modern tasarımlarda görsellik kadar omurga sağlığı da ön plandadır. Geniş oturum alanları ve ideal sırt eğimleri maksimum konfor için hesaplanmıştır."
        ]
      },
      {
        title: "130'dan Fazla Seçenekle Kendi Tarzınızı Yansıtın",
        content: "Mobilya seçimi tamamen kişisel bir ifade biçimidir. Veluxe showroom'unu ziyaret ederek farklı doku ve renk kombinasyonlarına sahip 130'dan fazla hakiki deri alternatifini yakından inceleyebilirsiniz. Dekorasyonda en büyük hatanın tamamen başkalarının (veya trendlerin) zevkine göre hareket etmek olduğunu unutmayın. İç mekanınızdaki diğer eşyaların renk paletini göz önünde bulundurarak, sadece sizin ruhunuzu yansıtan cesur veya dingin seçimler yapabilirsiniz."
      },
      {
        title: "Satın Almadan Önce Evinizde Görün: Veluxe Mimari Destek",
        content: "\"Acaba bu model salonuma uyar mı?\" endişesini teknolojiyle ortadan kaldırıyoruz. Modern deri koltuk modellerimizden birini beğendiğinizde, uzman ekibimiz tarafından sunulan mimari destek hizmetimiz devreye giriyor. Ürünü konumlandırmak istediğiniz odanın fotoğraflarını bize iletmeniz yeterli. Seçtiğiniz modeli, beğendiğiniz deri rengiyle birlikte 3D ortamda mekanınıza yerleştiriyoruz. Böylece hiçbir sürprizle karşılaşmadan siparişinizi verebilirsiniz."
      }
    ],
    care: {
      title: "Uzun Ömürlü Zarafet: Modern Deri Koltuk Bakımı Nasıl Yapılmalı?",
      content: "Modern deri koltuğunuzun o mat veya parlak ilk günkü dokusunu yıllarca koruması tamamen sizin uygulayacağınız basit adımlara bağlıdır.",
      deep: "Derinin kuruyup çatlamasını önlemek ve doğal esnekliğini korumak için 3 ila 6 aylık periyotlarda badem yağı veya vazelin uygulayabilirsiniz. Önce yüzeyi kuru bir bezle tozdan arındırın, ardından yağı dairesel hareketlerle deriye yedirin.",
      routine: "Günlük kullanımda oluşan tozlar için her 2-3 haftada bir kuru mikrofiber bezle toz almalı, ardından hafif nemli bir bez ve sadece doğal beyaz sabun kullanarak nazikçe silmelisiniz.",
      warning: "Kolonya, alkol, ıslak mendil veya piyasada 'deri temizleyici' adı altında satılan ağır kimyasal içerikli deterjanları hakiki deri koltuklarınızda kesinlikle kullanmayın."
    },
    faqs: [
      { q: "Modern deri koltuk ile klasik deri koltuk arasındaki fark nedir?", a: "Modern deri koltuklar, klasik derinin malzeme kalitesini korur ancak hantal gövdeler ve kalın detaylar yerine ince ayaklar, düz/keskin hatlar ve minimalist bir yaklaşımla üretilir." },
      { q: "Bu modeller ofis veya lobi kullanımı için uygun mudur?", a: "Kesinlikle. Modern çizgileri sayesinde ev sıcaklığının yanı sıra klinik, hukuk bürosu, mimarlık ofisi veya otel lobisi gibi prestijli mekanlar için de en çok tercih edilen modellerdir." },
      { q: "Modern koltukların oturum süngerleri zamanla çöker mi?", a: "Hayır. Görüntüleri ne kadar ince ve zarif olursa olsun, iç mimarilerinde 35 DNS yüksek yoğunluklu soft sünger kullandığımız için çökme ve form kaybı yaşanmaz." },
      { q: "Suni deri veya kumaş kaplama ile üretim yapabiliyor musunuz?", a: "Evet. Ana uzmanlığımız hakiki deri olsa da, talebiniz doğrultusunda premium seviye silinebilir kumaş veya yüksek kaliteli suni deri ile de aynı modelleri üretebiliyoruz." }
    ]
  },
  'chester-koltuk-takimlari': {
    mainTitle: "Veluxe Chester Deri Koltuklar: İngiliz Asaleti ve El İşçiliğinin Zirvesi",
    intro: "18. yüzyıldan günümüze uzanan asil bir miras... Chesterfield tarzının o ikonik derin kapitone (düğme) detaylarını, dışa doğru kıvrılan yuvarlak kol yapılarını ve mekana hakim olan makam ağırlığını, Veluxe'ün üstün el işçiliğiyle yeniden yorumluyoruz. %100 hakiki deri kullanılarak tamamen zanaatkar ustalarımızın ellerinde şekillenen Chester koltuklarımız, bulunduğu mekana anında saygınlık ve klasik bir atmosfer katar.",
    articles: [
      {
        title: "Neden Bir Chester Deri Koltuk Tercih Etmelisiniz?",
        content: "Chester koltuklar, gelip geçici bir dekorasyon trendi değil, nesilden nesile aktarılabilecek değerli birer sanat eseridir. Bu zamansız tasarımı seçmeniz için başlıca nedenler:",
        list: [
          "İkonik ve Zamansız Tasarım: Yüzyıllardır popülerliğini kaybetmeyen kapitone işçiliği, her dönemde lüksün ve asaletin evrensel sembolü kabul edilir.",
          "Prestijli Atmosfer: Hem ciddi makam odalarında hem de karakter sahibi lüks ev salonlarında, bulunduğu ortama güçlü bir otorite ve zarafet katar.",
          "Benzersiz El İşçiliği: Chester modellerinde makineleşmeye yer yoktur. Her bir düğme, her bir deri katlaması (baklava dilimi) ustalarımız tarafından saatlerce süren bir emekle santim santim elde işlenir."
        ]
      },
      {
        title: "Gerçek Chester Deneyimi: Malzemenin Gücü",
        content: "Bir koltuğun dışarıdan Chester gibi görünmesi onun gerçekten Chester olduğu anlamına gelmez. Orijinal hissiyat için kullanılan derinin kalınlığı, dokusu ve yıllandıkça alacağı doğal patina (eskime) çok önemlidir. Veluxe olarak sadece en üst kalite hakiki İtalyan derisi kullanıyor, kapitone düğmelerinin kopmaması için kilitli mumlu ipler tercih ediyor ve iskeletini tamamen fırınlanmış dayanıklı gürgenden inşa ediyoruz."
      }
    ],
    care: {
      title: "Chester Deri Koltuğunuzun Güzelliğini Korumak",
      content: "Chester modelleri, üzerindeki yoğun düğme ve katlama detayları nedeniyle düz modern koltuklara göre bir tık daha özenli bir rutin gerektirir.",
      deep: "Düz alanlara uygulayacağınız vazelin veya badem yağı bakımında, yağı doğrudan düğme çukurlarının içine doldurmamaya özen göstererek nazikçe yüzeye yedirin.",
      routine: "Kapitone (düğmeli) çukurların toz tutmaması için haftalık olarak kuru, yumuşak uçlu bir toz fırçası (veya süpürgenin fırça ucu) ile yüzeyin tozunu almanız en kritik detaydır.",
      warning: "Temizlik sırasında kullandığınız hafif nemli bezin suyunu iyice sıkın. Düğme çukurlarında ıslaklık veya su birikintisi kalmamasına özellikle dikkat edin."
    },
    faqs: [
      { q: "Chester koltukların üretim süresi neden daha uzun?", a: "Chester koltuğun üzerindeki yüzlerce baklava dilimi ve düğmenin her biri ustalarımız tarafından tek tek elle gerdirilip katlanarak dikilir. Bu titiz el işçiliği, standart bir koltuğa göre daha fazla zaman gerektirir." },
      { q: "Zamanla oturma veya sırt kısmındaki düğmeler kopar mı?", a: "Piyasada fabrikasyon üretilen modellerde bu sorun yaşanabilir. Ancak biz üretimde yüksek mukavemetli çelik teller ve kilitli özel dikiş ipleri kullandığımız için düğmelerin kopma veya gevşeme riski yoktur." },
      { q: "Chester modelini L (Köşe) koltuk formunda üretebiliyor musunuz?", a: "Evet. Chester zarafetini geniş aileler veya büyük salonlar için uyarlayarak, aynı kapitone işçiliğiyle özel ölçülerde L köşe takımı olarak da üretebilmekteyiz." }
    ]
  },
  'berjer-modelleri': {
    mainTitle: "Veluxe Deri Berjer Modelleri: Mekanın Yıldızı ve Kişisel Konfor Alanınız",
    intro: "Bazen devasa bir salondaki atmosferi, köşede duran tek bir parça tamamen değiştirebilir. Berjerler (tekli koltuklar), Veluxe'ün hakiki deri kalitesi ve ergonomik tasarımıyla buluşarak tam da bu görevi üstleniyor. İster kahvenizi yudumlayıp kitap okuyacağınız kişisel bir sığınak, isterseniz de salon takımınızın en şık tamamlayıcısı (accent chair) olarak kullanın; deri berjerlerimiz her açıdan kusursuz bir görsel şölen sunar.",
    articles: [
      {
        title: "Deri Berjer Kullanımının Dekorasyondaki Gücü",
        content: "Berjerler, yaşam alanlarında esneklik sağlayan ve dekorasyonu tek hamlede zenginleştiren en önemli mobilyalardır:",
        list: [
          "Odak Noktası (Accent Piece): Ana koltuklarınızdan tamamen zıt bir renkte (örneğin krem rengi bir takımın yanına bordo veya taba rengi) deri berjer seçerek mekanda dikkat çekici bir stil yaratabilirsiniz.",
          "Bireysel Konfor ve Omurga Sağlığı: Saran sırt yapıları ve ideal eğimleri sayesinde, uzun süreli oturuşlarda, tv izlerken veya kitap okurken omurganıza üstün bir destek sağlar.",
          "Mekansal Kurtarıcı: Şömine kenarı, büyük pencerelerin önü veya ofisinizdeki boş bir köşe... Berjerler, atıl durumdaki her alanı anında yaşanabilir ve lüks bir köşeye çevirir."
        ]
      },
      {
        title: "Kumaş Takımlarla Hakiki Derinin Kusursuz Uyumu",
        content: "Evinizdeki mevcut koltuklarınız kumaş kaplı olsa bile, bu düzene hakiki deri bir berjer dahil etmek tasarım dünyasında sıklıkla başvurulan bir tekniktir. Farklı dokuların (kumaşın matlığı ile hakiki derinin doğal parlaklığı) aynı odada buluşması, mekanınıza eklektik, zengin ve çok katmanlı bir şıklık katar."
      }
    ],
    care: {
      title: "Deri Berjeriniz İçin Pratik Bakım İpuçları",
      content: "Berjerler genellikle evdeki 'en çok oturulan' kişisel alanlar olduğu için bakımı ihmal edilmemelidir.",
      deep: "Sürekli oturuma bağlı olarak derinin formunu koruması için 6 ayda bir doğal badem yağı veya vazelin ile dairesel masaj yaparak deriyi besleyin.",
      routine: "Toz birikimini önlemek için haftada bir sadece nemli beyaz bir bez ve doğal sabunla silerek hafifçe kurulayın.",
      warning: "Okuma köşesi oluşturmak amacıyla berjerleri sık sık büyük pencerelerin (doğrudan ve yoğun güneş alan yerlerin) önüne koyarız. Derinin renginin solmaması için yaz aylarında doğrudan gelen yakıcı UV ışınlarından tül perde aracılığıyla korumaya özen gösterin."
    },
    faqs: [
      { q: "Mevcut koltuk takımıma uygun renkte berjer üretebilir misiniz?", a: "Evet, elimizdeki 130 farklı deri ve sayısız kumaş kartelası sayesinde mevcut takımınıza en uyumlu veya en güzel kontrastı yaratacak rengi kolayca bulabiliriz." },
      { q: "Berjerlerin ayak kısımları ahşap veya metal olarak değiştirilebilir mi?", a: "Modellerimizin büyük çoğunluğunda ayak yapıları mekanınızın dekorasyon diline uygun olarak (gürgen ahşap, ceviz tonları, krom veya mat siyah metal) kişiselleştirilebilmektedir." },
      { q: "Berjerler oturum olarak çok mu serttir?", a: "Karakterli dik duruşlarına rağmen içlerinde kullandığımız 35 DNS soft sünger sayesinde hem omurganızı destekler hem de yorucu olmayan yumuşak bir oturum sunar." }
    ]
  },
  'kose-koltuk-takimlari': {
    mainTitle: "Veluxe Deri Köşe Koltuk Takımları: Maksimum Oturum Alanı, Üstün Konfor",
    intro: "Odanın sınırlarını kucaklayan, samimiyeti artıran ve mekanın kalbini oluşturan devasa konfor alanları... Veluxe deri L ve U köşe koltuk takımları; geniş aileler, misafir ağırlamayı sevenler veya mekanını en verimli şekilde kullanmak isteyenler için özel olarak tasarlandı. Hem uzanarak günün yorgunluğunu atabileceğiniz hem de kalabalık sohbetlere ev sahipliği yapacak bu takımlar, hakiki derinin lüks dokusuyla salonunuza kesintisiz bir şıklık sunar.",
    articles: [
      {
        title: "Neden Bir Köşe Koltuk Tercih Etmelisiniz?",
        content: "Mimari açıdan bir odayı en efektif ve akıllıca kullanan mobilyalar kesinlikle köşe takımlarıdır:",
        list: [
          "Maksimum Alan Tasarrufu: Odanın genellikle ölü ve kullanılamayan köşelerini değerlendirerek oturum alanını artırır ve mekanın ortasını (orta sehpa ve geçiş yollarını) ferah bırakır.",
          "Sosyal ve Sıcak Atmosfer: L formu, oturan kişilerin birbirine doğru dönük olmasını sağlar. Bu yapı, sıraya dizilmiş koltukların aksine göz temasını artırarak çok daha sıcak ve samimi bir sohbet ortamı yaratır.",
          "Görkemli ve Kesintisiz Lüks: Aralarda boşluk olmadan devam eden devasa hakiki deri yüzeyler, odaya girildiği anda büyük ve kesintisiz bir zenginlik algısı oluşturur."
        ]
      },
      {
        title: "Sizin Yönünüz, Sizin Ölçünüz",
        content: "Köşe koltuklarda en büyük problem genellikle sağa mı yoksa sola mı uzanacağıdır. Veluxe olarak stoklu çalışmadığımız ve her ürünü siparişinize özel %100 el işçiliğiyle ürettiğimiz için uzanma yönünü (sağ/sol) tamamen odanızın mimarisine göre siz belirlersiniz. Üstelik kolon çıkıntıları veya kapı geçişleri gibi mimari zorluklara karşı koltuğunuzun uzunluk ve genişlik ölçülerini santimetresi santimetresine odanıza göre ayarlıyoruz."
      }
    ],
    care: {
      title: "Büyük Deri Yüzeylerin Bakım ve Temizlik Rutini",
      content: "Geniş yüzey alanına sahip köşe koltuklarda temizlik ve bakım, gözünüzü korkutmasın. Parçalara ayırarak ilerlemek en doğrusudur.",
      deep: "Mevsim geçişlerinde (yılda 2 veya 3 kez) badem yağı veya vazelin uygulamasını yaparken koltuğu zihninizde üç bölüme ayırın ve her bölümü sırayla besleyerek ilerleyin.",
      routine: "Sıradan bir temizlik için beyaz sabunlu nemli bir bezle tüm yüzeyleri nazikçe sildikten sonra, mutlaka kuru ve yumuşak bir bezle üzerinden geçerek fazla nemi alın.",
      warning: "Köşe koltuklar genellikle TV karşısında atıştırmalıkların yendiği alanlardır. Dökülen sıvı veya lekelere kesinlikle kimyasal çözücüler (kolonya, aseton vb.) dökmeyin; anında kağıt havlu ve sabunlu bez ile müdahale edin."
    },
    faqs: [
      { q: "Köşe yönünü (Uzanma kısmını) siparişten sonra değiştirebilir miyim?", a: "Eğer özel bir modüler tasarım (bağımsız puf ile uzanma) yapmadıysak, sabit köşe takımlarında yön (sağ veya sol) üretim aşamasında kalıcı olarak belirlenir. Bu yüzden sipariş öncesi ücretsiz keşif veya doğru ölçüm çok önemlidir." },
      { q: "Köşe takımları modüler midir, taşınırken sorun yaşar mıyım?", a: "Merak etmeyin. Böylesine büyük parçalar tek parça halinde taşınamaz. Tasarımlarımız, kurulum ve taşıma kolaylığı sağlamak için görünmeyen gizli kilit mekanizmalarıyla birbirine bağlanan 2 veya 3 ayrı modül halinde üretilir." },
      { q: "L koltuğumun yanına berjer ekleyebilir miyim?", a: "Evet. Özellikle açık planlı (açık mutfaklı veya büyük) salonlarda L köşe takımının açıkta kalan ucunun karşısına, takımla uyumlu bir deri berjer yerleştirmek dekorasyonu harika bir şekilde tamamlar." }
    ]
  },
  'puf-modelleri': {
    mainTitle: "Veluxe Deri Puf Modelleri: Tamamlayıcı Şıklık ve Çok Yönlü Pratiklik",
    intro: "Dekorasyonun isimsiz kahramanları, yaşam alanlarındaki ufak ama en işlevsel dokunuşlar... Veluxe hakiki deri puflar; ister koltuğunuzda dinlenirken bacaklarınızı uzatacağınız bir alan, ister kalabalık günlerde ekstra bir oturma birimi, isterseniz de üzerine şık bir tepsi koyarak orta sehpa alternatifi olarak kullanabileceğiniz çok yönlü ve premium mobilyalardır.",
    articles: [
      {
        title: "Mekanda Puf Kullanımının Ayrıcalıklı Senaryoları",
        content: "Büyük mobilyaların bıraktığı boşlukları zarafetle dolduran puflar, ev içindeki dinamik yaşamın en büyük kurtarıcılarıdır:",
        list: [
          "Mobilite ve Özgürlük: Hafif ve portatif yapısı sayesinde odanın her köşesine, hatta gerektiğinde diğer odalara kolayca taşınabilir.",
          "Orta Sehpa Alternatifi: Geniş ve düz yüzeyli pufların üzerine şık bir ahşap veya aynalı tepsi yerleştirerek, keskin kenarları olmayan çocuk dostu, modern bir orta sehpaya dönüştürebilirsiniz.",
          "Üst Düzey Dinlenme (Ottoman): Berjerinizde veya üçlü koltuğunuzda kitap okurken bacaklarınızı uzatarak kan akışınızı dengeleyen kusursuz bir dinlenme modülü görevi görür."
        ]
      }
    ],
    care: {
      title: "Deri Puf Bakımı ve Doğru Kullanımı",
      content: "Genellikle ayak uzatmak, kitap bırakmak veya ekstra eşya koymak için kullanıldığından oldukça dayanıklı ve temizliği en pratik ürünlerdir.",
      deep: "Ana koltuklarınıza uyguladığınız vazelin veya badem yağı bakımını, aynı gün bir miktar da pufunuzun yüzeyine uygulayarak deri sağlığını koruyabilirsiniz.",
      routine: "Sadece hafif nemli beyaz bir bez ve doğal beyaz sabun ile haftalık silmeniz temizlik için fazlasıyla yeterlidir.",
      warning: "Orta sehpa olarak kullanımlarda sıcak çay/kahve fincanlarını doğrudan derinin üzerine bırakmamaya, sivri uçlu (anahtar, makas vb.) objelerle yüzeyi çizmemeye özen gösterin."
    },
    faqs: [
      { q: "Puflar mevcut koltuğumla aynı renk ve aynı deriden mi üretiliyor?", a: "Eğer ana koltuk takımınızla birlikte sipariş veriyorsanız, top (bütün) deriden kesildiği için ton farkı olmaksızın birebir aynı deriden üretilir. Dilerseniz sadece pufu farklı bir renkte seçerek zıt bir uyum (kontrast) da yaratabilirsiniz." },
      { q: "Pufun yüksekliği ayak uzatmak için uygun mu?", a: "Ergonomik kullanım ve kan dolaşımı sağlığı için puflarımızın standart yüksekliği, koltuklarınızın oturum hizasıyla aynı (veya çok hafif alçak) olacak şekilde özel olarak hesaplanmaktadır." },
      { q: "Pufların üzerine cam kestirip sehpa yapabilir miyim?", a: "Bunu tavsiye etmiyoruz çünkü cam, derinin hava almasını tamamen kesecek ve zamanla yüzeye yapışarak deriye zarar verebilecektir. Sehpa olarak kullanmak için kalın dekoratif tepsiler çok daha sağlıklı ve şık bir çözümdür." }
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