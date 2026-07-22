const fs = require('fs');
const csv = require('csv-parser');

const mainProducts = [];
const variations = [];

const slugify = (text) => {
  if (!text) return '';
  const trMap = { 'ç': 'c', 'ğ': 'g', 'ı': 'i', 'ö': 'o', 'ş': 's', 'ü': 'u', 'Ç': 'c', 'Ğ': 'g', 'İ': 'i', 'Ö': 'o', 'Ş': 's', 'Ü': 'u' };
  return text.replace(/[çğıöşüÇĞİÖŞÜ]/g, match => trMap[match])
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
};

// Eski SEO linklerinizi (WordPress URL'leri) koruyan kesin sözlük
const categorySlugMap = {
  'Chester Koltuk': 'chester-koltuk-takimlari',
  'Modern Koltuk': 'modern-koltuk-takimlari',
  'Koltuk Takımı': 'koltuk-takimlari',
  'Köşe Koltuk': 'kose-koltuk-takimlari',
  'Berjer': 'berjer-modelleri',
  'Puf': 'puf-modelleri'
};

const colorHexMap = {
  'Siyah': '#000000', 'Beyaz': '#ffffff', 'Kahverengi': '#5d4037', 'Taba': '#b35d20',
  'Yeşil': '#2e7d32', 'Bordo': '#800020', 'Lacivert': '#1a237e', 'Krem': '#f5f5dc',
  'Gri': '#9e9e9e', 'Antrasit': '#37474f'
};

fs.createReadStream('wc-product-export-22-7-2026-1784705853825.csv')
  .pipe(csv())
  .on('data', (row) => {
    if (row['Tür'] === 'variable') {
      mainProducts.push(row);
    } else if (row['Tür'] === 'variation') {
      variations.push(row);
    }
  })
  .on('end', () => {
    const formattedProducts = mainProducts.map(main => {
      const parentSku = main['Stok kodu (SKU)'];
      const productVariations = variations.filter(v => v['Ebeveyn'] === parentSku);
      const images = main['Görseller'] ? main['Görseller'].split(',').map(img => img.trim()) : [];
      
      const colors = productVariations.map(v => {
        const colorName = v['Nitelik 1 değer(ler)i'];
        // YENİ: Varyasyonun kendi fotoğrafı varsa onu alıyoruz
        const colorImage = v['Görseller'] ? v['Görseller'].split(',')[0].trim() : '';
        return {
          name: colorName,
          hex: colorHexMap[colorName] || '#cccccc', 
          slug: slugify(v['İsim']),
          image: colorImage // Fotoğraf sisteme eklendi
        };
      });

      const rawCategory = main['Kategoriler'] ? main['Kategoriler'].split(',')[0].trim() : '';
      const finalCategorySlug = categorySlugMap[rawCategory] || slugify(rawCategory) || 'kategori-yok';

      return {
        id: main['Kimlik'],
        sku: parentSku,
        title: main['İsim'],
        slug: slugify(main['İsim']),
        categorySlug: finalCategorySlug,
        images: images,
        shortDescription: main['Kısa açıklama'] || main['Açıklama'] || '',
        features: {
          dimensions: 'G: 230 cm / D: 100 cm / Y: 85 cm',
          material: '%100 Orijinal Kumaş/Deri',
          legs: 'Ahşap / Metal Ayaklar',
          sponge: '35 DNS Soft Sünger',
          frame: 'Fırınlanmış Gürgen Ağacı'
        },
        colors: colors
      };
    });

    const tsContent = `import { Product } from '@/types';\n\nexport const products: Product[] = ${JSON.stringify(formattedProducts, null, 2)};\n`;
    fs.writeFileSync('data/exported-products.ts', tsContent, 'utf8');
    console.log(`✅ SEO Başarılı! Tüm ürünler eski site URL'lerine uygun şekilde data/exported-products.ts dosyasına aktarıldı.`);
  });