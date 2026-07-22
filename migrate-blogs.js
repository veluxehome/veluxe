const fs = require('fs');
const xml2js = require('xml2js');

const parser = new xml2js.Parser({ explicitArray: false });

fs.readFile('veluxe-blog.xml', 'utf8', (err, data) => {
  if (err) {
    console.error("XML dosyası okunamadı. Lütfen dosya adını 'veluxe-blog.xml' yapın.");
    return;
  }

  parser.parseString(data, (err, result) => {
    const items = result.rss.channel.item;

    // Fotoğraf ID - URL eşleştirmesi
    const imageMap = {};
    items.filter(i => i['wp:post_type'] === 'attachment').forEach(img => {
      imageMap[img['wp:post_id']] = img['wp:attachment_url'];
    });

    const blogs = items
      .filter(i => i['wp:post_type'] === 'post' && i['wp:status'] === 'publish')
      .map(post => {
        const title = post.title;
        const slug = post['wp:post_name'];
        const date = post['wp:post_date'] ? post['wp:post_date'].split(' ')[0] : '2024-01-01';

        let rawContent = post['content:encoded'] || '';
        
        // WPBakery başlıklarını HTML <h3> etiketine çevir, kalan kodları temizle
        let cleanContent = rawContent.replace(/\[vc_custom_heading text="([^"]+)"[^\]]*\]/g, '<h3>$1</h3>');
        cleanContent = cleanContent.replace(/\[\/?vc_[^\]]+\]/g, '');

        // Öne Çıkan Görseli Eşleştir
        let coverImage = '/images/blog/default.jpg';
        const postmeta = Array.isArray(post['wp:postmeta']) ? post['wp:postmeta'] : [post['wp:postmeta']];
        const thumbMeta = postmeta?.find(m => m && m['wp:meta_key'] === '_thumbnail_id');
        if (thumbMeta && imageMap[thumbMeta['wp:meta_value']]) {
          coverImage = imageMap[thumbMeta['wp:meta_value']];
        }

        // SEO Meta Açıklamasını (Yoast) Bul
        let excerpt = '';
        const descMeta = postmeta?.find(m => m && m['wp:meta_key'] === '_yoast_wpseo_metadesc');
        if (descMeta && descMeta['wp:meta_value']) {
          excerpt = descMeta['wp:meta_value'];
        } else {
          excerpt = cleanContent.replace(/<[^>]+>/g, '').substring(0, 160) + '...';
        }

        return { id: post['wp:post_id'], title, slug, date, excerpt, content: cleanContent, coverImage };
      });

    const tsContent = `import { BlogPost } from '@/types';\n\nexport const blogs: BlogPost[] = ${JSON.stringify(blogs, null, 2)};\n`;
    fs.writeFileSync('data/exported-blogs.ts', tsContent, 'utf8');
    console.log('✅ Bloglar başarıyla temizlendi ve data/exported-blogs.ts dosyasına aktarıldı!');
  });
});