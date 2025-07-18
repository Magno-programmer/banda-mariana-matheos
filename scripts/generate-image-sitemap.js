import { writeFileSync, existsSync, mkdirSync } from 'fs';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const SITE_URL = 'https://marianamatheos.com.br';
const PUBLIC_DIR = `${__dirname}/../public`;

// Ensure public directory exists
if (!existsSync(PUBLIC_DIR)) {
  mkdirSync(PUBLIC_DIR, { recursive: true });
}

class ImageSitemapGenerator {
  constructor() {
    this.baseUrl = SITE_URL;
  }

  getImageMetadata() {
    return [
      {
        url: `${this.baseUrl}/images/cantora.avif`,
        caption: 'Mariana Matheos, vocalista da banda de jazz em Belo Horizonte',
        title: 'Vocalista Jazz Belo Horizonte - Mariana Matheos',
        description: 'Mariana Matheos, vocalista principal da banda de jazz, durante apresentação ao vivo em Belo Horizonte',
        geoLocation: 'Belo Horizonte, Minas Gerais, Brasil',
        license: `${this.baseUrl}/license`,
        category: 'band',
        keywords: ['Mariana Matheos', 'vocalista jazz', 'Belo Horizonte', 'banda de jazz', 'cantora jazz'],
        datePublished: '2024-01-15'
      },
      {
        url: `${this.baseUrl}/images/pianista.avif`,
        caption: 'Pianista da banda de jazz durante performance em Belo Horizonte',
        title: 'Pianista Jazz BH - Performance ao Vivo',
        description: 'Pianista executando repertório jazz clássico durante apresentação da banda em Belo Horizonte',
        geoLocation: 'Belo Horizonte, Minas Gerais, Brasil',
        license: `${this.baseUrl}/license`,
        category: 'performance',
        keywords: ['pianista jazz', 'piano jazz', 'Belo Horizonte', 'performance ao vivo', 'música instrumental'],
        datePublished: '2024-01-20'
      },
      {
        url: `${this.baseUrl}/images/baixista.avif`,
        caption: 'Baixista executando solo durante apresentação de jazz em BH',
        title: 'Baixista Jazz - Solo Performance Belo Horizonte',
        description: 'Baixista da banda em momento de solo durante apresentação de jazz standards em Belo Horizonte',
        geoLocation: 'Belo Horizonte, Minas Gerais, Brasil',
        license: `${this.baseUrl}/license`,
        category: 'performance',
        keywords: ['baixista jazz', 'contrabaixo', 'solo jazz', 'Belo Horizonte', 'música instrumental'],
        datePublished: '2024-01-25'
      },
      {
        url: `${this.baseUrl}/images/baterista.avif`,
        caption: 'Baterista da banda de jazz em performance rítmica em Belo Horizonte',
        title: 'Baterista Jazz BH - Ritmo e Swing',
        description: 'Baterista mantendo o swing característico do jazz durante apresentação da banda em Belo Horizonte',
        geoLocation: 'Belo Horizonte, Minas Gerais, Brasil',
        license: `${this.baseUrl}/license`,
        category: 'performance',
        keywords: ['baterista jazz', 'bateria jazz', 'swing', 'Belo Horizonte', 'ritmo jazz'],
        datePublished: '2024-02-01'
      },
      {
        url: `${this.baseUrl}/images/banda.avif`,
        caption: 'Banda de jazz completa em apresentação ao vivo em Belo Horizonte',
        title: 'Mariana Matheos Jazz Band - Formação Completa BH',
        description: 'Banda de jazz completa da Mariana Matheos durante apresentação ao vivo em evento em Belo Horizonte',
        geoLocation: 'Belo Horizonte, Minas Gerais, Brasil',
        license: `${this.baseUrl}/license`,
        category: 'band',
        keywords: ['banda de jazz', 'Mariana Matheos', 'Belo Horizonte', 'jazz band', 'música ao vivo'],
        datePublished: '2024-02-05'
      },
      {
        url: `${this.baseUrl}/images/casamento-jazz-band.avif`,
        caption: 'Banda de jazz tocando em cerimônia de casamento em Belo Horizonte',
        title: 'Jazz para Casamento BH - Música Romântica',
        description: 'Mariana Matheos Jazz Band proporcionando trilha sonora especial para casamento em Belo Horizonte',
        geoLocation: 'Belo Horizonte, Minas Gerais, Brasil',
        license: `${this.baseUrl}/license`,
        category: 'event',
        keywords: ['casamento', 'música casamento', 'jazz casamento', 'Belo Horizonte', 'banda para casamento'],
        datePublished: '2024-02-10'
      },
      {
        url: `${this.baseUrl}/images/eventos-corporativos.avif`,
        caption: 'Apresentação da banda em evento corporativo em Belo Horizonte',
        title: 'Jazz Corporativo BH - Eventos Empresariais',
        description: 'Banda de jazz criando atmosfera sofisticada em evento corporativo em Belo Horizonte',
        geoLocation: 'Belo Horizonte, Minas Gerais, Brasil',
        license: `${this.baseUrl}/license`,
        category: 'event',
        keywords: ['evento corporativo', 'jazz empresarial', 'Belo Horizonte', 'música corporativa', 'entretenimento empresarial'],
        datePublished: '2024-02-15'
      },
      {
        url: `${this.baseUrl}/images/amy-winehouse.avif`,
        caption: 'Tributo a Amy Winehouse pela banda de jazz em Belo Horizonte',
        title: 'Tributo Amy Winehouse - Jazz Soul BH',
        description: 'Homenagem especial a Amy Winehouse com interpretação soul jazz pela banda em Belo Horizonte',
        geoLocation: 'Belo Horizonte, Minas Gerais, Brasil',
        license: `${this.baseUrl}/license`,
        category: 'historical',
        keywords: ['Amy Winehouse', 'tributo', 'soul jazz', 'Belo Horizonte', 'homenagem musical'],
        datePublished: '2024-02-20'
      },
      {
        url: `${this.baseUrl}/images/ella-fitzgerald.avif`,
        caption: 'Performance inspirada em Ella Fitzgerald pela banda de jazz BH',
        title: 'Inspiração Ella Fitzgerald - Primeira Dama do Jazz',
        description: 'Interpretação de clássicos de Ella Fitzgerald pela Mariana Matheos Jazz Band em Belo Horizonte',
        geoLocation: 'Belo Horizonte, Minas Gerais, Brasil',
        license: `${this.baseUrl}/license`,
        category: 'historical',
        keywords: ['Ella Fitzgerald', 'jazz vocal', 'standards jazz', 'Belo Horizonte', 'jazz clássico'],
        datePublished: '2024-02-25'
      },
      {
        url: `${this.baseUrl}/images/frank-sinatra.avif`,
        caption: 'Interpretação de clássicos de Frank Sinatra em Belo Horizonte',
        title: 'Frank Sinatra Classics - Jazz Vocal BH',
        description: 'Banda apresentando repertório clássico de Frank Sinatra em estilo jazz em Belo Horizonte',
        geoLocation: 'Belo Horizonte, Minas Gerais, Brasil',
        license: `${this.baseUrl}/license`,
        category: 'historical',
        keywords: ['Frank Sinatra', 'crooner', 'jazz vocal', 'Belo Horizonte', 'música clássica'],
        datePublished: '2024-03-01'
      }
    ];
  }

  generateMainImageSitemap() {
    const images = this.getImageMetadata();
    const entries = [
      {
        pageUrl: `${this.baseUrl}/fotos`,
        images: images
      },
      {
        pageUrl: `${this.baseUrl}/`,
        images: images.filter(img => img.category === 'band').slice(0, 3)
      },
      {
        pageUrl: `${this.baseUrl}/sobre`,
        images: images.filter(img => img.category === 'band').slice(0, 2)
      },
      {
        pageUrl: `${this.baseUrl}/repertorio`,
        images: images.filter(img => img.category === 'historical')
      }
    ];

    return this.generateSitemapXML(entries);
  }

  generateCategorizedSitemaps() {
    const images = this.getImageMetadata();
    const imagesByCategory = images.reduce((acc, image) => {
      if (!acc[image.category]) {
        acc[image.category] = [];
      }
      acc[image.category].push(image);
      return acc;
    }, {});

    const sitemaps = {};
    Object.entries(imagesByCategory).forEach(([category, categoryImages]) => {
      const entries = [{
        pageUrl: `${this.baseUrl}/fotos?category=${category}`,
        images: categoryImages
      }];
      
      sitemaps[`sitemap-images-${category}.xml`] = this.generateSitemapXML(entries);
    });

    return sitemaps;
  }

  generateSitemapXML(entries) {
    const xmlHeader = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">`;

    const xmlFooter = `</urlset>`;

    const urlEntries = entries.map(entry => {
      const imageEntries = entry.images.map(image => {
        return `    <image:image>
      <image:loc>${this.escapeXml(image.url)}</image:loc>
      <image:caption>${this.escapeXml(image.caption)}</image:caption>
      <image:title>${this.escapeXml(image.title)}</image:title>
      ${image.geoLocation ? `<image:geo_location>${this.escapeXml(image.geoLocation)}</image:geo_location>` : ''}
      ${image.license ? `<image:license>${this.escapeXml(image.license)}</image:license>` : ''}
    </image:image>`;
      }).join('\n');

      return `  <url>
    <loc>${this.escapeXml(entry.pageUrl)}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
${imageEntries}
  </url>`;
    }).join('\n');

    return `${xmlHeader}\n${urlEntries}\n${xmlFooter}`;
  }

  generateImageSitemapIndex() {
    const categories = ['band', 'performance', 'event', 'historical'];
    const lastmod = new Date().toISOString().split('T')[0];

    const sitemapEntries = [
      `  <sitemap>
    <loc>${this.baseUrl}/sitemap-images.xml</loc>
    <lastmod>${lastmod}</lastmod>
  </sitemap>`,
      ...categories.map(category => 
        `  <sitemap>
    <loc>${this.baseUrl}/sitemap-images-${category}.xml</loc>
    <lastmod>${lastmod}</lastmod>
  </sitemap>`
      )
    ].join('\n');

    return `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapEntries}
</sitemapindex>`;
  }

  escapeXml(unsafe) {
    return unsafe
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }
}

function main() {
  try {
    console.log('🖼️  Generating image sitemaps...');
    
    const generator = new ImageSitemapGenerator();

    // Generate main image sitemap
    const mainSitemap = generator.generateMainImageSitemap();
    writeFileSync(`${PUBLIC_DIR}/sitemap-images.xml`, mainSitemap);
    console.log('✅ Generated sitemap-images.xml');

    // Generate categorized sitemaps
    const categorizedSitemaps = generator.generateCategorizedSitemaps();
    Object.entries(categorizedSitemaps).forEach(([filename, content]) => {
      writeFileSync(`${PUBLIC_DIR}/${filename}`, content);
      console.log(`✅ Generated ${filename}`);
    });

    // Generate sitemap index
    const sitemapIndex = generator.generateImageSitemapIndex();
    writeFileSync(`${PUBLIC_DIR}/sitemap-images-index.xml`, sitemapIndex);
    console.log('✅ Generated sitemap-images-index.xml');

    console.log('🎉 Image sitemaps generated successfully!');
    
    // Generate statistics
    const images = generator.getImageMetadata();
    const stats = {
      totalImages: images.length,
      categories: [...new Set(images.map(img => img.category))],
      avgKeywords: Math.round(images.reduce((sum, img) => sum + img.keywords.length, 0) / images.length * 100) / 100
    };
    
    console.log('\n📊 Image Sitemap Statistics:');
    console.log(`   Total Images: ${stats.totalImages}`);
    console.log(`   Categories: ${stats.categories.join(', ')}`);
    console.log(`   Avg Keywords: ${stats.avgKeywords}`);

  } catch (error) {
    console.error('❌ Error generating image sitemaps:', error);
    process.exit(1);
  }
}

// Run the script
main();