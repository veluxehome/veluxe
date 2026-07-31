import { NextResponse } from 'next/server';
import { products, categories } from '@/data';
import { productPrices } from '@/data/prices';

export async function GET() {
  const baseUrl = 'https://veluxe.com.tr';
  
  // Hepsiburada Şablonundaki Sütun Sıralaması
  const headers = [
    'Ürün Adı', 'Satıcı Stok Kodu', 'Barkod', 'Varyant Grup Id', 'Ürün Açıklaması',
    'Marka', 'Desi', 'KDV', 'Garanti Süresi (Ay)', 'Görsel1', 'Görsel2', 'Görsel3',
    'Görsel4', 'Görsel5', 'Görsel6', 'Görsel7', 'Görsel8', 'Görsel9', 'Görsel10',
    'Fiyat', 'Stok', 'Video', 'Renk', 'Seçenek', 'Yatak Özelliği', 'Genişlik',
    'Kumaş', 'Koltuk Tipi', 'Derinlik', 'Gövde Malzemesi (İskelet)'
  ];

  let csvContent = headers.join('\t') + '\n';

  products.forEach((product) => {
    const priceObj = productPrices[product.sku];
    
    if (!priceObj || !priceObj.hakikiDeri || priceObj.hakikiDeri === "0 TL") return;
    
    // 1. Fiyat Hesaplama (%50 Zam)
    const rawPrice = parseInt(priceObj.hakikiDeri.replace(/[^0-9]/g, ''), 10);
    const hepsiburadaPrice = rawPrice * 1.5;

    // 2. Kategori / Koltuk Tipi Tespiti
    const category = categories.find(c => c.slug === product.categorySlug);
    const categoryTitle = category ? category.title : 'Modern Koltuk';

    // 3. Ürün Adı Oluşturma
    const urunAdi = `Veluxe Home & Living'den ${product.title} Hakiki Deri ${categoryTitle}`;

    // 4. 13 Haneli Barkod Üretimi
    const cleanSku = product.sku.replace(/[^a-zA-Z0-9]/g, '');
    let barkod = `VLX${cleanSku}`;
    while (barkod.length < 13) { barkod += '0'; }
    if (barkod.length > 13) barkod = barkod.substring(0, 13);

    // 5. Varyant Grup ID (Hepsiburada için zorunlu, doğrudan SKU'yu veriyoruz)
    const varyantGrupId = product.sku;

    // 6. Açıklama Temizleme
    const cleanDesc = product.shortDescription
        .replace(/<[^>]*>?/gm, '')
        .replace(/(\r\n|\n|\r)/gm, ' ');

    // 7. Genişlik ve Derinlik (Daha Akıllı Ayıklama)
    let genislik = "240"; // Varsayılan değer (ölçü bulunamazsa boş kalmasın diye)
    let derinlik = "95";  // Varsayılan değer
    
    if (product.features.dimensions) {
      // Metnin içindeki tüm rakam gruplarını dizi olarak alır (Örn: "Genişlik 240 Derinlik 90" -> ["240", "90"])
      const nums = product.features.dimensions.match(/\d+/g);
      if (nums && nums.length >= 2) {
        genislik = nums[0]; // İlk rakamı genişlik yapar
        derinlik = nums[1]; // İkinci rakamı derinlik yapar
      }
    }

    // 8. Satırı Oluşturma
    const row = [
      urunAdi, // Ürün Adı
      product.sku, // Satıcı Stok Kodu
      barkod, // Barkod
      varyantGrupId, // Varyant Grup Id (DÜZELTİLDİ)
      cleanDesc, // Ürün Açıklaması
      'Veluxe Home & Living', // Marka
      '250', // Desi
      '10', // KDV
      '24', // Garanti Süresi
      product.images[0] ? `${baseUrl}${product.images[0]}` : '', // Görsel1
      product.images[1] ? `${baseUrl}${product.images[1]}` : '', // Görsel2
      product.images[2] ? `${baseUrl}${product.images[2]}` : '', // Görsel3
      product.images[3] ? `${baseUrl}${product.images[3]}` : '', // Görsel4
      product.images[4] ? `${baseUrl}${product.images[4]}` : '', // Görsel5
      product.images[5] ? `${baseUrl}${product.images[5]}` : '', // Görsel6
      product.images[6] ? `${baseUrl}${product.images[6]}` : '', // Görsel7
      product.images[7] ? `${baseUrl}${product.images[7]}` : '', // Görsel8
      product.images[8] ? `${baseUrl}${product.images[8]}` : '', // Görsel9
      product.images[9] ? `${baseUrl}${product.images[9]}` : '', // Görsel10
      hepsiburadaPrice.toString(), // Fiyat
      '5', // Stok
      '', // Video
      'Kahverengi', // Renk
      '', // Seçenek
      'Yok', // Yatak Özelliği
      genislik, // Genişlik (DÜZELTİLDİ)
      'Hakiki Deri', // Kumaş
      categoryTitle, // Koltuk Tipi
      derinlik, // Derinlik (DÜZELTİLDİ)
      'Fırınlanmış Gürgen İskelet' // Gövde Malzemesi
    ];

    csvContent += row.join('\t') + '\n';
  });

  return new NextResponse(csvContent, {
    headers: {
      'Content-Type': 'text/csv; charset=utf-16le',
      'Content-Disposition': 'attachment; filename="hepsiburada_aktarim.csv"',
    },
  });
}