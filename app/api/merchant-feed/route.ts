import { NextResponse } from 'next/server';
import { products } from '@/data';
import { productPrices, MaterialType } from '@/data/prices';

const MATERIAL_LABELS: Record<MaterialType, string> = {
  hakikiDeri: 'Hakiki Deri',
  suniDeri: 'Suni Deri',
  kumash: 'Kumaş'
};

export async function GET() {
  const baseUrl = 'https://veluxe.com.tr';

  let xmlItems = '';

  products.forEach((product) => {
    const priceObj = productPrices[product.sku] || { hakikiDeri: "0 TL", suniDeri: "0 TL", kumash: "0 TL" };
    const materials: MaterialType[] = ['hakikiDeri', 'suniDeri', 'kumash'];

    materials.forEach((matKey) => {
      const priceStr = priceObj[matKey] || "0 TL";
      const rawPrice = priceStr.replace(/[^0-9]/g, '');
      const numericPrice = rawPrice ? `${rawPrice}.00 TRY` : '0.00 TRY';

      const variantSku = `${product.sku}-${matKey}`;
      const variantTitle = `${product.title} (${MATERIAL_LABELS[matKey]})`;
      const cleanDescription = product.shortDescription.replace(/<[^>]*>?/gm, '');
      const imageUrl = product.images[0] ? `${baseUrl}${product.images[0]}` : '';

      xmlItems += `
        <item>
          <g:id>${variantSku}</g:id>
          <g:title><![CDATA[${variantTitle}]]></g:title>
          <g:description><![CDATA[${cleanDescription}]]></g:description>
          <g:link>${baseUrl}/urun/${product.slug}</g:link>
          <g:image_link>${imageUrl}</g:image_link>
          <g:brand>Veluxe</g:brand>
          <g:condition>new</g:condition>
          <g:availability>in_stock</g:availability>
          <g:price>${numericPrice}</g:price>
          <g:item_group_id>${product.sku}</g:item_group_id>
        </item>
      `;
    });
  });

  const rssFeed = `<?xml version="1.0" encoding="UTF-8" ?>
    <rss version="2.0" xmlns:g="http://base.google.com/ns/1.0">
      <channel>
        <title>Veluxe Ürün Kataloğu</title>
        <link>${baseUrl}</link>
        <description>Veluxe Hakiki Deri Mobilya ve Koleksiyon Ürünleri</description>
        ${xmlItems}
      </channel>
    </rss>
  `;

  return new NextResponse(rssFeed, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  });
}