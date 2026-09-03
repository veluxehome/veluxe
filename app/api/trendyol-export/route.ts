import { NextResponse } from 'next/server';
import { products } from '@/data';
import { productPrices } from '@/data/prices';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const targetCategory = searchParams.get('kategori');

  if (!targetCategory || !['takim', 'kanepe', 'berjer', 'puf'].includes(targetCategory)) {
    return NextResponse.json({ 
      hata: "Lütfen URL sonuna geçerli bir kategori parametresi ekleyin. Seçenekler: '?kategori=takim', '?kategori=kanepe', '?kategori=berjer', '?kategori=puf'" 
    }, { status: 400 });
  }

  const baseUrl = 'https://veluxe.com.tr';
  const marka = 'veluxe home'; // ONAYLANMIŞ MARKA
  const desi = '250';
  const kargoSuresi = '2';

  // 1. KOLTUK TAKIMI SÜTUNLARI (3+3+1 için - ID: 2422)
  const koltukCols = ["Barkod", "Model Kodu", "Marka", "Kategori", "Para Birimi", "Ürün Adı", "Ürün Açıklaması", "Piyasa Satış Fiyatı (KDV Dahil)", "Trendyol'da Satılacak Fiyat (KDV Dahil)", "Ürün Stok Adedi", "Stok Kodu", "KDV Oranı", "ÖTV Oranı", "Desi", "Parti/Lot/SKT Bilgisi", "Görsel 1", "Görsel 2", "Görsel 3", "Görsel 4", "Görsel 5", "Görsel 6", "Görsel 7", "Görsel 8", "Sevkiyat Süresi", "Sevkiyat Tipi", "Fonksiyon", "Üretici Adı", "Birincil İthalatçı Mail Adresi", "İkincil İthalatçı Mail Adresi", "Tema / Stil", "Üçüncül İthalatçı Adı", "Stil", "Gövde Materyali", "Üretici Mail Adresi", "Garanti Süresi", "Üçüncül İthalatçı Adres Bilgisi", "İkincil İthalatçı Adı", "Tasarım", "Üretici Adres Bilgisi", "Renk", "Boyut/Ebat", "Ayak Malzemesi", "Koltuk Tipi", "Üçüncül İthalatçı Mail Adresi", "Kullanım Talimatı/Uyarıları", "Takım İçeriği", "Kumaş", "Menşei", "Birincil İthalatçı Adres Bilgisi", "Web Color", "Birincil İthalatçı Adı", "Materyal", "İkincil İthalatçı Adres Bilgisi"];
  
  // 2. KANEPE SÜTUNLARI (Tekil 3'lü vb. için - ID: 2109)
  const kanepeCols = ["Barkod", "Model Kodu", "Marka", "Kategori", "Para Birimi", "Ürün Adı", "Ürün Açıklaması", "Piyasa Satış Fiyatı (KDV Dahil)", "Trendyol'da Satılacak Fiyat (KDV Dahil)", "Ürün Stok Adedi", "Stok Kodu", "KDV Oranı", "ÖTV Oranı", "Desi", "Parti/Lot/SKT Bilgisi", "Görsel 1", "Görsel 2", "Görsel 3", "Görsel 4", "Görsel 5", "Görsel 6", "Görsel 7", "Görsel 8", "Sevkiyat Süresi", "Sevkiyat Tipi", "Derinlik", "Kumaş", "Üçüncül İthalatçı Adres Bilgisi", "Materyal", "Tema / Stil", "Üretici Adres Bilgisi", "Üretici Adı", "Renk", "Kullanım Talimatı/Uyarıları", "Gövde Materyali", "Birincil İthalatçı Adı", "Garanti Süresi", "Birincil İthalatçı Adres Bilgisi", "Stil", "Ayak Malzemesi", "Üçüncül İthalatçı Adı", "Web Color", "İkincil İthalatçı Adı", "İkincil İthalatçı Mail Adresi", "Tasarım", "Üçüncül İthalatçı Mail Adresi", "Koltuk Tipi", "Birincil İthalatçı Mail Adresi", "Ayak Malzemesi Rengi", "İkincil İthalatçı Adres Bilgisi", "Üretici Mail Adresi", "Genişlik", "Fonksiyon", "Oturum Yumuşaklığı", "Menşei"];

  // 3. BERJER SÜTUNLARI (Tekli Koltuk / Berjer için - ID: 928)
  const berjerCols = ["Barkod", "Model Kodu", "Marka", "Kategori", "Para Birimi", "Ürün Adı", "Ürün Açıklaması", "Piyasa Satış Fiyatı (KDV Dahil)", "Trendyol'da Satılacak Fiyat (KDV Dahil)", "Ürün Stok Adedi", "Stok Kodu", "KDV Oranı", "ÖTV Oranı", "Desi", "Parti/Lot/SKT Bilgisi", "Görsel 1", "Görsel 2", "Görsel 3", "Görsel 4", "Görsel 5", "Görsel 6", "Görsel 7", "Görsel 8", "Sevkiyat Süresi", "Sevkiyat Tipi", "Derinlik", "Boyut/Ebat", "Üçüncül İthalatçı Mail Adresi", "Ayak Malzemesi", "Üçüncül İthalatçı Adres Bilgisi", "Paket Genişlik", "Stil", "Paket Yükseklik", "Tema / Stil", "Kullanım Talimatı/Uyarıları", "Kumaş", "Garanti Süresi", "Üretici Adres Bilgisi", "Üretici Adı", "Üçüncül İthalatçı Adı", "Renk", "Birincil İthalatçı Mail Adresi", "Paket Derinlik", "Materyal", "İkincil İthalatçı Adı", "Üretici Mail Adresi", "Birincil İthalatçı Adı", "İkincil İthalatçı Adres Bilgisi", "Genişlik", "İkincil İthalatçı Mail Adresi", "Menşei", "Birincil İthalatçı Adres Bilgisi", "Web Color"];

  // 4. PUF SÜTUNLARI (Puf & Bench için - ID: 2111)
  const pufCols = ["Barkod", "Model Kodu", "Marka", "Kategori", "Para Birimi", "Ürün Adı", "Ürün Açıklaması", "Piyasa Satış Fiyatı (KDV Dahil)", "Trendyol'da Satılacak Fiyat (KDV Dahil)", "Ürün Stok Adedi", "Stok Kodu", "KDV Oranı", "ÖTV Oranı", "Desi", "Parti/Lot/SKT Bilgisi", "Görsel 1", "Görsel 2", "Görsel 3", "Görsel 4", "Görsel 5", "Görsel 6", "Görsel 7", "Görsel 8", "Sevkiyat Süresi", "Sevkiyat Tipi", "Kumaş", "Tema / Stil", "Birincil İthalatçı Adres Bilgisi", "Üçüncül İthalatçı Mail Adresi", "İkincil İthalatçı Mail Adresi", "Kullanım Talimatı/Uyarıları", "Form", "Paket Yükseklik", "Paket Derinlik", "Üretici Adres Bilgisi", "Üçüncül İthalatçı Adres Bilgisi", "Renk", "Menşei", "Paket Genişlik", "Üretici Mail Adresi", "Stil", "Birincil İthalatçı Adı", "Boyut/Ebat", "Üretici Adı", "İkincil İthalatçı Adı", "Üçüncül İthalatçı Adı", "Ayak Malzemesi", "Garanti Süresi", "Web Color", "İkincil İthalatçı Adres Bilgisi", "Gövde Materyali", "Materyal", "Özellik", "Birincil İthalatçı Mail Adresi"];

  let filteredProducts = [];
  let categoryId = '';
  let activeHeaders: string[] = [];
  let tipIsmi = '';

  if (targetCategory === 'takim') {
    filteredProducts = products.filter(p => 
      ['koltuk-takimlari', 'modern-koltuk-takimlari'].includes(p.categorySlug) && 
      p.title.toLocaleLowerCase('tr-TR').includes('takım')
    );
    categoryId = '2422';
    activeHeaders = koltukCols;
    tipIsmi = 'Koltuk Takımı';
  } else if (targetCategory === 'kanepe') {
    filteredProducts = products.filter(p => 
      ['koltuk-takimlari', 'modern-koltuk-takimlari'].includes(p.categorySlug) && 
      !p.title.toLocaleLowerCase('tr-TR').includes('takım')
    );
    categoryId = '2109';
    activeHeaders = kanepeCols;
    tipIsmi = 'Üçlü Koltuk';
  } else if (targetCategory === 'berjer') {
    filteredProducts = products.filter(p => p.categorySlug === 'berjer-modelleri');
    categoryId = '928';
    activeHeaders = berjerCols;
    tipIsmi = 'Berjer';
  } else if (targetCategory === 'puf') {
    filteredProducts = products.filter(p => p.categorySlug === 'puf-modelleri');
    categoryId = '2111';
    activeHeaders = pufCols;
    tipIsmi = 'Puf';
  }

  let csvContent = activeHeaders.join('\t') + '\n';

  filteredProducts.forEach((product) => {
    const priceObj = productPrices[product.sku];
    if (!priceObj || !priceObj.hakikiDeri || priceObj.hakikiDeri === "0 TL") return;
    
    // FİYAT HESAPLAMASI (%50 Zamlı)
    const rawPrice = parseInt(priceObj.hakikiDeri.replace(/[^0-9]/g, ''), 10);
    const satisFiyati = Math.round(rawPrice * 1.5); 
    const piyasaFiyati = Math.round(satisFiyati * 1.2); 

    const urunAdi = `${marka} ${product.title} Hakiki Deri ${tipIsmi}`;
    
    // BARKOD ÜRETİMİ (Eski çakışma hatalarını önlemek için Random 4 Haneli Sayı)
    const cleanSku = product.sku.replace(/[^a-zA-Z0-9]/g, '');
    const randomSuffix = Math.floor(1000 + Math.random() * 9000).toString();
    const barkod = `TY${cleanSku}${randomSuffix}`;

    const cleanDesc = product.shortDescription
        .replace(/<[^>]*>?/gm, '')
        .replace(/(\r\n|\n|\r)/gm, ' ');

    // ÖLÇÜLER
    let genislik = "240";
    let derinlik = "90";
    if (product.features.dimensions) {
      const nums = product.features.dimensions.match(/\d+/g);
      if (nums && nums.length >= 2) {
        genislik = nums[0];
        derinlik = nums[1];
      }
    }
    
    const genislikCm = `${genislik} cm`;
    const derinlikCm = `${derinlik} cm`;

    const row = activeHeaders.map((header) => {
      switch (header) {
        // TEMEL VERİLER
        case 'Barkod': return barkod;
        case 'Model Kodu': return product.sku;
        case 'Marka': return marka;
        case 'Kategori': return categoryId;
        case 'Para Birimi': return 'TRY';
        case 'Ürün Adı': return urunAdi;
        case 'Ürün Açıklaması': return cleanDesc;
        case 'Piyasa Satış Fiyatı (KDV Dahil)': return piyasaFiyati.toString();
        case "Trendyol'da Satılacak Fiyat (KDV Dahil)": return satisFiyati.toString();
        case 'Ürün Stok Adedi': return '5';
        case 'Stok Kodu': return product.sku;
        case 'KDV Oranı': return '10';
        case 'ÖTV Oranı': return '';
        case 'Desi': return desi;
        case 'Parti/Lot/SKT Bilgisi': return '';
        
        // GÖRSELLER
        case 'Görsel 1': return product.images[0] ? `${baseUrl}${product.images[0]}` : '';
        case 'Görsel 2': return product.images[1] ? `${baseUrl}${product.images[1]}` : '';
        case 'Görsel 3': return product.images[2] ? `${baseUrl}${product.images[2]}` : '';
        case 'Görsel 4': return product.images[3] ? `${baseUrl}${product.images[3]}` : '';
        case 'Görsel 5': return product.images[4] ? `${baseUrl}${product.images[4]}` : '';
        case 'Görsel 6': return product.images[5] ? `${baseUrl}${product.images[5]}` : '';
        case 'Görsel 7': return '';
        case 'Görsel 8': return '';
        
        case 'Sevkiyat Süresi': return kargoSuresi;
        case 'Sevkiyat Tipi': return ''; 
        
        // ORTAK ÖZELLİKLER
        case 'Kumaş': return 'Deri';
        case 'Gövde Materyali': return 'Ahşap';
        case 'Ayak Malzemesi': return 'Ahşap';
        case 'Tema / Stil': return 'Modern';
        case 'Stil': return 'Modern';
        case 'Renk': return 'Kahverengi';
        case 'Web Color': return 'Kahverengi'; 
        case 'Menşei': return 'TR';
        case 'Garanti Süresi': return '2 Yıl';
        case 'Kullanım Talimatı/Uyarıları': return 'Nemli bezle siliniz.';
        case 'Üretici Adı': return marka; 

        // KATEGORİ SPESİFİK ÖZELLİKLER
        case 'Materyal': 
          // Puf için materyal şablonunda "Hakiki Deri" yok, sadece "Deri" onaylı. Diğerlerinde Hakiki Deri.
          return targetCategory === 'puf' ? 'Deri' : 'Hakiki Deri';
        
        case 'Boyut/Ebat': 
          // Trendyol'da uyuşmazlığı önlemek için Takım ve Puf'ta Tek Ebat en güvenlisidir.
          return (targetCategory === 'takim' || targetCategory === 'puf') ? 'Tek Ebat' : `${genislik} x ${derinlik}`;      
        
        case 'Genişlik': return genislikCm;       // Kanepe ve Berjer
        case 'Derinlik': return derinlikCm;       // Kanepe ve Berjer
        case 'Paket Genişlik': return genislikCm; // Berjer ve Puf
        case 'Paket Yükseklik': return targetCategory === 'puf' ? '45 cm' : '90 cm'; // Berjer (90) ve Puf (45)
        case 'Paket Derinlik': return derinlikCm; // Berjer ve Puf
        
        case 'Takım İçeriği': return targetCategory === 'takim' ? '3+3+1' : ''; 
        case 'Koltuk Tipi': return targetCategory === 'takim' ? 'Koltuk Takımı' : 'Üçlü Koltuk'; 
        case 'Fonksiyon': return 'Sabit'; 
        case 'Tasarım': return 'Modern';  
        case 'Ayak Malzemesi Rengi': return 'Ahşap'; 
        case 'Oturum Yumuşaklığı': return 'Orta Sert'; 
        
        // Pufa Özel Alanlar
        case 'Form': return 'Dikdörtgen'; 
        case 'Özellik': return 'Standart';

        // BOŞ GEÇİLMESİ GEREKEN İTHALATÇI BİLGİLERİ
        case 'Üretici Mail Adresi':
        case 'Üretici Adres Bilgisi':
        case 'Birincil İthalatçı Adı':
        case 'Birincil İthalatçı Mail Adresi':
        case 'Birincil İthalatçı Adres Bilgisi':
        case 'İkincil İthalatçı Adı':
        case 'İkincil İthalatçı Mail Adresi':
        case 'İkincil İthalatçı Adres Bilgisi':
        case 'Üçüncül İthalatçı Adı':
        case 'Üçüncül İthalatçı Mail Adresi':
        case 'Üçüncül İthalatçı Adres Bilgisi':
          return '';
          
        default: return ''; 
      }
    });

    csvContent += row.join('\t') + '\n';
  });

  return new NextResponse(csvContent, {
    headers: {
      'Content-Type': 'text/csv; charset=utf-16le',
      'Content-Disposition': `attachment; filename="trendyol_${targetCategory}_aktarim.csv"`,
    },
  });
}