import { NextResponse } from 'next/server';
import { products } from '@/data';
import { productPrices } from '@/data/prices';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const targetCategory = searchParams.get('kategori');

  if (!targetCategory) {
    return NextResponse.json({ 
      hata: "Lütfen URL sonuna kategori parametresi ekleyin. Örnek: ?kategori=koltuk, ?kategori=chester, ?kategori=kose, ?kategori=berjer, ?kategori=puf" 
    }, { status: 400 });
  }

  const baseUrl = 'https://veluxe.com.tr';
  const marka = 'veluxe home';
  const desi = '250';
  const kargoSuresi = '2;

  const koltukCols = ["Barkod", "Model Kodu", "Marka", "Kategori", "Para Birimi", "Ürün Adı", "Ürün Açıklaması", "Piyasa Satış Fiyatı (KDV Dahil)", "Trendyol'da Satılacak Fiyat (KDV Dahil)", "Ürün Stok Adedi", "Stok Kodu", "KDV Oranı", "ÖTV Oranı", "Desi", "Parti/Lot/SKT Bilgisi", "Görsel 1", "Görsel 2", "Görsel 3", "Görsel 4", "Görsel 5", "Görsel 6", "Görsel 7", "Görsel 8", "Sevkiyat Süresi", "Sevkiyat Tipi", "Fonksiyon", "Üretici Adı", "Birincil İthalatçı Mail Adresi", "İkincil İthalatçı Mail Adresi", "Tema / Stil", "Üçüncül İthalatçı Adı", "Stil", "Gövde Materyali", "Üretici Mail Adresi", "Garanti Süresi", "Üçüncül İthalatçı Adres Bilgisi", "İkincil İthalatçı Adı", "Tasarım", "Üretici Adres Bilgisi", "Renk", "Boyut/Ebat", "Ayak Malzemesi", "Koltuk Tipi", "Üçüncül İthalatçı Mail Adresi", "Kullanım Talimatı/Uyarıları", "Takım İçeriği", "Kumaş", "Menşei", "Birincil İthalatçı Adres Bilgisi", "Web Color", "Birincil İthalatçı Adı", "Materyal", "İkincil İthalatçı Adres Bilgisi"];
  const kanepeCols = ["Barkod", "Model Kodu", "Marka", "Kategori", "Para Birimi", "Ürün Adı", "Ürün Açıklaması", "Piyasa Satış Fiyatı (KDV Dahil)", "Trendyol'da Satılacak Fiyat (KDV Dahil)", "Ürün Stok Adedi", "Stok Kodu", "KDV Oranı", "ÖTV Oranı", "Desi", "Parti/Lot/SKT Bilgisi", "Görsel 1", "Görsel 2", "Görsel 3", "Görsel 4", "Görsel 5", "Görsel 6", "Görsel 7", "Görsel 8", "Sevkiyat Süresi", "Sevkiyat Tipi", "Derinlik", "Kumaş", "Üçüncül İthalatçı Adres Bilgisi", "Materyal", "Tema / Stil", "Üretici Adres Bilgisi", "Üretici Adı", "Renk", "Kullanım Talimatı/Uyarıları", "Gövde Materyali", "Birincil İthalatçı Adı", "Garanti Süresi", "Birincil İthalatçı Adres Bilgisi", "Stil", "Ayak Malzemesi", "Üçüncül İthalatçı Adı", "Web Color", "İkincil İthalatçı Adı", "İkincil İthalatçı Mail Adresi", "Tasarım", "Üçüncül İthalatçı Mail Adresi", "Koltuk Tipi", "Birincil İthalatçı Mail Adresi", "Ayak Malzemesi Rengi", "İkincil İthalatçı Adres Bilgisi", "Üretici Mail Adresi", "Genişlik", "Fonksiyon", "Oturum Yumuşaklığı", "Menşei"];
  const koseCols = ["Barkod", "Model Kodu", "Marka", "Kategori", "Para Birimi", "Ürün Adı", "Ürün Açıklaması", "Piyasa Satış Fiyatı (KDV Dahil)", "Trendyol'da Satılacak Fiyat (KDV Dahil)", "Ürün Stok Adedi", "Stok Kodu", "KDV Oranı", "ÖTV Oranı", "Desi", "Parti/Lot/SKT Bilgisi", "Görsel 1", "Görsel 2", "Görsel 3", "Görsel 4", "Görsel 5", "Görsel 6", "Görsel 7", "Görsel 8", "Sevkiyat Süresi", "Sevkiyat Tipi", "Kumaş Tipi", "Web Color", "Köşe Yönü", "Tema / Stil", "Tasarım", "İkincil İthalatçı Mail Adresi", "Üretici Mail Adresi", "Boyut/Ebat", "İkincil İthalatçı Adı", "Birincil İthalatçı Adres Bilgisi", "Renk", "Üçüncül İthalatçı Adı", "İkincil İthalatçı Adres Bilgisi", "Üretici Adı", "Birincil İthalatçı Mail Adresi", "Fonksiyon", "Oturum Yumuşaklığı", "Genişlik", "Koltuk Tipi", "Stil", "Derinlik", "Kumaş", "Üçüncül İthalatçı Adres Bilgisi", "Garanti Süresi", "Gövde Materyali", "Materyal", "Kullanım Talimatı/Uyarıları", "Ayak Malzemesi", "Menşei", "Birincil İthalatçı Adı", "Üçüncül İthalatçı Mail Adresi", "Ayak Malzemesi Rengi", "Üretici Adres Bilgisi"];
  const berjerCols = ["Barkod", "Model Kodu", "Marka", "Kategori", "Para Birimi", "Ürün Adı", "Ürün Açıklaması", "Piyasa Satış Fiyatı (KDV Dahil)", "Trendyol'da Satılacak Fiyat (KDV Dahil)", "Ürün Stok Adedi", "Stok Kodu", "KDV Oranı", "ÖTV Oranı", "Desi", "Parti/Lot/SKT Bilgisi", "Görsel 1", "Görsel 2", "Görsel 3", "Görsel 4", "Görsel 5", "Görsel 6", "Görsel 7", "Görsel 8", "Sevkiyat Süresi", "Sevkiyat Tipi", "Derinlik", "Boyut/Ebat", "Üçüncül İthalatçı Mail Adresi", "Ayak Malzemesi", "Üçüncül İthalatçı Adres Bilgisi", "Paket Genişlik", "Stil", "Paket Yükseklik", "Tema / Stil", "Kullanım Talimatı/Uyarıları", "Kumaş", "Garanti Süresi", "Üretici Adres Bilgisi", "Üretici Adı", "Üçüncül İthalatçı Adı", "Renk", "Birincil İthalatçı Mail Adresi", "Paket Derinlik", "Materyal", "İkincil İthalatçı Adı", "Üretici Mail Adresi", "Birincil İthalatçı Adı", "İkincil İthalatçı Adres Bilgisi", "Genişlik", "İkincil İthalatçı Mail Adresi", "Menşei", "Birincil İthalatçı Adres Bilgisi", "Web Color"];
  const pufCols = ["Barkod", "Model Kodu", "Marka", "Kategori", "Para Birimi", "Ürün Adı", "Ürün Açıklaması", "Piyasa Satış Fiyatı (KDV Dahil)", "Trendyol'da Satılacak Fiyat (KDV Dahil)", "Ürün Stok Adedi", "Stok Kodu", "KDV Oranı", "ÖTV Oranı", "Desi", "Parti/Lot/SKT Bilgisi", "Görsel 1", "Görsel 2", "Görsel 3", "Görsel 4", "Görsel 5", "Görsel 6", "Görsel 7", "Görsel 8", "Sevkiyat Süresi", "Sevkiyat Tipi", "Kumaş", "Tema / Stil", "Birincil İthalatçı Adres Bilgisi", "Üçüncül İthalatçı Mail Adresi", "İkincil İthalatçı Mail Adresi", "Kullanım Talimatı/Uyarıları", "Form", "Paket Yükseklik", "Paket Derinlik", "Üretici Adres Bilgisi", "Üçüncül İthalatçı Adres Bilgisi", "Renk", "Menşei", "Paket Genişlik", "Üretici Mail Adresi", "Stil", "Birincil İthalatçı Adı", "Boyut/Ebat", "Üretici Adı", "İkincil İthalatçı Adı", "Üçüncül İthalatçı Adı", "Ayak Malzemesi", "Garanti Süresi", "Web Color", "İkincil İthalatçı Adres Bilgisi", "Gövde Materyali", "Materyal", "Özellik", "Birincil İthalatçı Mail Adresi"];

  let filteredProducts = [];
  let categoryId = '';
  let categoryType = '';
  let activeHeaders: string[] = [];

  if (targetCategory === 'koltuk') {
    filteredProducts = products.filter(p => ['koltuk-takimlari', 'modern-koltuk-takimlari'].includes(p.categorySlug));
    categoryId = '2422';
    categoryType = 'Koltuk Takımı';
    activeHeaders = koltukCols;
  } else if (targetCategory === 'chester') {
    filteredProducts = products.filter(p => p.categorySlug === 'chester-koltuk-takimlari');
    categoryId = '2109';
    categoryType = 'Kanepe (Chester)';
    activeHeaders = kanepeCols;
  } else if (targetCategory === 'kose') {
    filteredProducts = products.filter(p => p.categorySlug === 'kose-koltuk-takimlari');
    categoryId = '2110';
    categoryType = 'Köşe Takımı';
    activeHeaders = koseCols;
  } else if (targetCategory === 'berjer') {
    filteredProducts = products.filter(p => p.categorySlug === 'berjer-modelleri');
    categoryId = '928';
    categoryType = 'Berjer';
    activeHeaders = berjerCols;
  } else if (targetCategory === 'puf') {
    filteredProducts = products.filter(p => p.categorySlug === 'puf-modelleri');
    categoryId = '2111';
    categoryType = 'Puf';
    activeHeaders = pufCols;
  } else {
    return NextResponse.json({ hata: "Geçersiz kategori." }, { status: 400 });
  }

  let csvContent = activeHeaders.join('\t') + '\n';

  filteredProducts.forEach((product, index) => {
    const priceObj = productPrices[product.sku];
    if (!priceObj || !priceObj.hakikiDeri || priceObj.hakikiDeri === "0 TL") return;
    
    const rawPrice = parseInt(priceObj.hakikiDeri.replace(/[^0-9]/g, ''), 10);
    const satisFiyati = rawPrice * 1.5;
    const piyasaFiyati = satisFiyati * 1.2;

    const urunAdi = `${marka} ${product.title} Hakiki Deri ${categoryType}`;
    
    // Benzersiz Barkod Üretimi
    const cleanSku = product.sku.replace(/[^a-zA-Z0-9]/g, '');
    const indexSuffix = (index + 1).toString().padStart(2, '0');
    let barkod = `TY${cleanSku}${indexSuffix}`;
    if (barkod.length > 13) {
      barkod = barkod.substring(0, 11) + indexSuffix;
    }
    while (barkod.length < 13) {
      barkod += '0';
    }

    const cleanDesc = product.shortDescription
        .replace(/<[^>]*>?/gm, '')
        .replace(/(\r\n|\n|\r)/gm, ' ');

    let genislik = "240";
    let derinlik = "90";
    if (product.features.dimensions) {
      const nums = product.features.dimensions.match(/\d+/g);
      if (nums && nums.length >= 2) {
        genislik = nums[0];
        derinlik = nums[1];
      }
    }
    const boyutEbat = `${genislik} x ${derinlik}`;

    const row = activeHeaders.map((header) => {
      switch (header) {
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
        case 'Desi': return desi;
        case 'Görsel 1': return product.images[0] ? `${baseUrl}${product.images[0]}` : '';
        case 'Görsel 2': return product.images[1] ? `${baseUrl}${product.images[1]}` : '';
        case 'Görsel 3': return product.images[2] ? `${baseUrl}${product.images[2]}` : '';
        case 'Görsel 4': return product.images[3] ? `${baseUrl}${product.images[3]}` : '';
        case 'Görsel 5': return product.images[4] ? `${baseUrl}${product.images[4]}` : '';
        case 'Görsel 6': return product.images[5] ? `${baseUrl}${product.images[5]}` : '';
        case 'Sevkiyat Süresi': return kargoSuresi;
        case 'Sevkiyat Tipi': return ''; 
        
        case 'Üretici Adı': return marka; 
        
        case 'Renk': return 'Kahverengi';
        case 'Web Color': return 'Kahverengi'; 
        case 'Kumaş': return 'Deri';
        case 'Kumaş Tipi': return 'Belirtilmemiş'; 
        
        case 'Materyal': 
          if (targetCategory === 'koltuk' || targetCategory === 'berjer' || targetCategory === 'chester') return 'Hakiki Deri';
          if (targetCategory === 'puf') return 'Deri';
          return 'Belirtilmemiş';
          
        case 'Gövde Materyali': return 'Ahşap';
        case 'Ayak Malzemesi': return 'Ahşap';
        case 'Ayak Malzemesi Rengi': return 'Ceviz';
        
        case 'Derinlik': return derinlik;
        case 'Genişlik': return genislik;
        case 'Boyut/Ebat': return boyutEbat;
        
        case 'Paket Genişlik': return genislik;
        case 'Paket Yükseklik': return '90';
        case 'Paket Derinlik': return derinlik;
        
        case 'Koltuk Tipi': 
          if (targetCategory === 'koltuk') return 'Koltuk Takımı';
          if (targetCategory === 'kose') return 'Tam Köşe Koltuk';
          if (targetCategory === 'chester') return 'Kanepe';
          return '';
          
        case 'Köşe Yönü': return 'Sağ-Sol Değiştirilebilir';
        case 'Takım İçeriği': return '3+3+1';
        case 'Fonksiyon': return 'Sabit';
        case 'Oturum Yumuşaklığı': return 'Orta Sert';
        case 'Form': return 'Dikdörtgen'; 
        case 'Özellik': return 'Standart';
        
        case 'Garanti Süresi': return '2 Yıl';
        case 'Tema / Stil': return 'Modern';
        case 'Stil': return 'Modern';
        case 'Tasarım': return targetCategory === 'chester' ? 'Chester - Kapitone' : 'Modern';
        case 'Menşei': return 'TR';
        case 'Kullanım Talimatı/Uyarıları': return 'Nemli bezle siliniz.';
        
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