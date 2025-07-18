
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SITE_URL = 'https://marianamatheos.com.br';

const categories = ['banda', 'performance', 'eventos', 'historia'];

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
        category: 'banda',
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
        title: 'Mariana Matheos Jazz banda - Formação Completa BH',
        description: 'Banda de jazz completa da Mariana Matheos durante apresentação ao vivo em evento em Belo Horizonte',
        geoLocation: 'Belo Horizonte, Minas Gerais, Brasil',
        license: `${this.baseUrl}/license`,
        category: 'banda',
        keywords: ['banda de jazz', 'Mariana Matheos', 'Belo Horizonte', 'jazz banda', 'música ao vivo'],
        datePublished: '2024-02-05'
      },
      {
        url: `${this.baseUrl}/images/imagem-da-banda.avif`,
        caption: 'Banda de jazz completa em apresentação ao vivo em Nova Lima',
        title: 'Mariana Matheos Jazz banda - Formação Completa NL',
        description: 'Banda de jazz completa da Mariana Matheos após apresentação ao vivo em evento em Nova Lima',
        geoLocation: 'Nova Lima, Minas Gerais, Brasil',
        license: `${this.baseUrl}/license`,
        category: 'banda',
        keywords: ['banda de jazz', 'Mariana Matheos', 'Nova Lima', 'jazz banda', 'música ao vivo'],
        datePublished: '2024-02-05'
      },
      {
        url: `${this.baseUrl}/images/banda-blue-jazz-concurso.avif`,
        caption: 'Banda de jazz completa em apresentação ao vivo em Nova Lima',
        title: 'Mariana Matheos Jazz banda - Formação Completa BH',
        description: 'Banda de jazz completa da Mariana Matheos durante apresentação ao vivo em evento em Nova Lima',
        geoLocation: 'Nova Lima, Minas Gerais, Brasil',
        license: `${this.baseUrl}/license`,
        category: 'banda',
        keywords: ['banda de jazz', 'Mariana Matheos', 'Nova Lima', 'jazz banda', 'música ao vivo'],
        datePublished: '2024-02-05'
      },
      {
        url: `${this.baseUrl}/images/mariana-matheos-jazz-essencia-da-musica-ao-vivo.avif`,
        caption: 'Mariana Matheos Jazz performando ao vivo em evento elegante',
        title: 'Mariana Matheos Jazz — A essência da música ao vivo nos eventos',
        description: 'Descubra como a banda Mariana Matheos transformou o cenário da música ao vivo em Belo Horizonte, trazendo elegância e sofisticação para eventos especiais.',
        geoLocation: 'Belo Horizonte, Minas Gerais, Brasil',
        license: `${this.baseUrl}/license`,
        category: 'jazz',
        keywords: ['banda mariana matheos', 'música ao vivo', 'eventos belo horizonte', 'jazz banda'],
        datePublished: '2025-07-17'
      },
      {
        url: `${this.baseUrl}/images/como-escolher-banda-casamento.avif`,
        caption: 'Banda de jazz tocando em casamento elegante',
        title: 'Como escolher a banda ideal para o seu casamento',
        description: 'Guia completo para escolher a banda perfeita para seu casamento, com dicas sobre estilo musical, repertório e como criar momentos inesquecíveis.',
        geoLocation: 'Belo Horizonte, Minas Gerais, Brasil',
        license: `${this.baseUrl}/license`,
        category: 'eventos',
        keywords: ['banda para casamento', 'música casamento', 'banda de jazz casamento', 'evento elegante'],
        datePublished: '2025-07-17'
      },
      {
        url: `${this.baseUrl}/images/historia-do-jazz-brasil.avif`,
        caption: 'Músicos de jazz vintage no Brasil dos anos 1920',
        title: 'A história do jazz no Brasil — das rádios aos grandes festivais',
        description: 'Uma jornada pela rica história do jazz brasileiro, desde suas primeiras manifestações nas rádios até os grandes festivais contemporâneos.',
        geoLocation: 'Belo Horizonte, Minas Gerais, Brasil',
        license: `${this.baseUrl}/license`,
        category: 'curiosidades',
        keywords: ['jazz brasileiro', 'história do jazz', 'música brasileira', 'cultura musical'],
        datePublished: '2025-07-17'
      },
      {
        url: `${this.baseUrl}/images/musica-ao-vivo-eventos-corporativos.avif`,
        caption: 'Banda de jazz tocando em evento corporativo elegante',
        title: 'Por que a música ao vivo transforma eventos corporativos?',
        description: 'Descubra como a música ao vivo pode elevar o nível dos seus eventos corporativos, criando conexões autênticas e experiências memoráveis.',
        geoLocation: 'Belo Horizonte, Minas Gerais, Brasil',
        license: `${this.baseUrl}/license`,
        category: 'eventos',
        keywords: ['eventos corporativos', 'música ao vivo empresas', 'banda profissional', 'networking musical'],
        datePublished: '2025-07-17'
      },
      {
        url: `${this.baseUrl}/images/historia-dos-jazz-standards.avif`,
        caption: 'Pianista e vocalista interpretando um jazz standard em palco iluminado',
        title: 'O que são Jazz Standards e por que são tão importantes?',
        description: 'Descubra a origem e o papel essencial dos jazz standards — as músicas clássicas que moldaram a identidade do jazz e encantam gerações.',
        geoLocation: 'Belo Horizonte, Minas Gerais, Brasil',
        license: `${this.baseUrl}/license`,
        category: 'curiosidades',
        keywords: ['jazz standards', 'história do jazz', 'repertório jazzístico', 'banda de jazz', 'clássicos do jazz'],
        datePublished: '2025-07-17'
      },
      {
        url: `${this.baseUrl}/images/como-ser-uma-banda-de-jazz.avif`,
        caption: 'Banda de jazz ensaiando em um estúdio com instrumentos clássicos',
        title: 'O que é necessário para ser uma banda de jazz?',
        description: 'Entenda os principais elementos artísticos, técnicos e humanos que compõem uma banda de jazz de sucesso — e como construir uma do zero com autenticidade.',
        geoLocation: 'Belo Horizonte, Minas Gerais, Brasil',
        license: `${this.baseUrl}/license`,
        category: 'dicas',
        keywords: ['como formar banda de jazz', 'dicas para músicos de jazz', 'banda instrumental', 'montar banda', 'jazz moderno'],
        datePublished: '2025-07-18'
      },
      {
        url: `${this.baseUrl}/images/billie-holiday-dama-do-jazz.avif`,
        caption: 'Retrato artístico de cantora de jazz dos anos 1940 com gardênia no cabelo',
        title: 'Billie Holiday — A Dama do Jazz que Revolucionou a Música',
        description: 'Conheça a história extraordinária de Billie Holiday, uma das vozes mais expressivas e influentes do jazz, que transformou a dor em arte inesquecível.',
        geoLocation: 'Belo Horizonte, Minas Gerais, Brasil',
        license: `${this.baseUrl}/license`,
        category: 'curiosidades',
        keywords: ['billie holiday', 'historia do jazz', 'cantores de jazz', 'lady day', 'jazz classico'],
        datePublished: '2025-07-17'
      },
      {
        url: `${this.baseUrl}/images/ella-fitzgerald-primeira-dama-cancao.avif`,
        caption: 'Retrato artístico de elegante cantora de jazz dos anos 1940 com sorriso radiante',
        title: 'Ella Fitzgerald — A Primeira Dama da Canção',
        description: 'Descubra a trajetória de Ella Fitzgerald, a "First Lady of Song", cujo talento vocal incomparável e técnica de scat singing revolucionaram o jazz.',
        geoLocation: 'Belo Horizonte, Minas Gerais, Brasil',
        license: `${this.baseUrl}/license`,
        category: 'curiosidades',
        keywords: ['ella fitzgerald', 'first lady of song', 'scat singing', 'jazz clássico'],
        datePublished: '2025-07-17'
      },
      {
        url: `${this.baseUrl}/images/frank-sinatra-rei-do-swing.avif`,
        caption: 'Retrato de elegante cantor dos anos 1950 com terno e gravata borboleta',
        title: 'Frank Sinatra — O Rei do Swing e dos Crooners',
        description: 'A história de Frank Sinatra, "Ol\' Blue Eyes", que definiu o estilo crooner e se tornou uma das maiores vozes da música americana.',
        geoLocation: 'Belo Horizonte, Minas Gerais, Brasil',
        license: `${this.baseUrl}/license`,
        category: 'curiosidades',
        keywords: ['frank sinatra', 'crooner', 'swing', 'jazz', 'musica americana'],
        datePublished: '2025-07-17'
      },
      {
        url: `${this.baseUrl}/images/nina-simone-sacerdotisa-soul.avif`,
        caption: 'Retrato de poderosa pianista e cantora dos anos 1960 ao piano',
        title: 'Nina Simone — A Sacerdotisa do Soul',
        description: 'Conheça Nina Simone, pianista que se tornou uma das vozes mais poderosas do jazz, soul e dos direitos civis.',
        geoLocation: 'Belo Horizonte, Minas Gerais, Brasil',
        license: `${this.baseUrl}/license`,
        category: 'curiosidades',
        keywords: ['nina simone', 'soul', 'jazz', 'ativismo', 'piano'],
        datePublished: '2025-07-17'
      },
      {
        url: `${this.baseUrl}/images/amy-winehouse-neo-soul.avif`,
        caption: 'Amy Winehouse com seu icônico penteado beehive e vestido preto',
        title: 'Amy Winehouse — O Talento Interrompido do Neo-Soul',
        description: 'A trajetória breve mas impactante de Amy Winehouse, que revitalizou o soul e jazz contemporâneo com sua voz única.',
        geoLocation: 'Belo Horizonte, Minas Gerais, Brasil',
        license: `${this.baseUrl}/license`,
        category: 'curiosidades',
        keywords: ['amy winehouse', 'neo soul', 'jazz contemporaneo', 'soul music'],
        datePublished: '2025-07-17'
      },
      {
        url: `${this.baseUrl}/images/etta-james-matriarca-soul-rb.avif`,
        caption: 'Retrato de poderosa cantora de soul dos anos 1960 com expressão intensa',
        title: 'Etta James — A Matriarca do Soul e R&B',
        description: 'A história de Etta James, uma das vozes mais poderosas do soul e R&B que influenciou gerações.',
        geoLocation: 'Belo Horizonte, Minas Gerais, Brasil',
        license: `${this.baseUrl}/license`,
        category: 'curiosidades',
        keywords: ['etta james', 'soul', 'r&b', 'blues', 'at last'],
        datePublished: '2025-07-17'
      },
      {
        url: `${this.baseUrl}/images/beth-hart-blues-contemporaneo.avif`,
        caption: 'Cantora de blues contemporâneo com cabelos loiros e expressão intensa',
        title: 'Beth Hart — A Força do Blues Contemporâneo',
        description: 'Conheça Beth Hart, uma das vozes mais poderosas do blues contemporâneo, conhecida por sua intensidade emocional.',
        geoLocation: 'Belo Horizonte, Minas Gerais, Brasil',
        license: `${this.baseUrl}/license`,
        category: 'curiosidades',
        keywords: ['beth hart', 'blues contemporaneo', 'rock blues', 'cantora americana'],
        datePublished: '2025-07-17'
      },
      {
        url: `${this.baseUrl}/images/bb-king-rei-do-blues.avif`,
        caption: 'Lendário guitarrista de blues dos anos 1960 com sua guitarra em performance',
        title: 'B.B. King — O Rei do Blues',
        description: 'A história de B.B. King, o lendário guitarrista que definiu o blues moderno com sua guitarra Lucille.',
        geoLocation: 'Belo Horizonte, Minas Gerais, Brasil',
        license: `${this.baseUrl}/license`,
        category: 'curiosidades',
        keywords: ['bb king', 'blues', 'guitarra blues', 'lucille', 'rei do blues'],
        datePublished: '2025-07-17'
      },
      {
        url: `${this.baseUrl}/images/andra-day-nova-voz-soul.avif`,
        caption: 'Cantora de soul contemporânea com turbante e estilo vintage elegante',
        title: 'Andra Day — A Nova Voz do Soul',
        description: 'Conheça Andra Day, a cantora que trouxe o soul clássico para o século XXI com sua voz poderosa.',
        geoLocation: 'Belo Horizonte, Minas Gerais, Brasil',
        license: `${this.baseUrl}/license`,
        category: 'curiosidades',
        keywords: ['andra day', 'soul contemporaneo', 'rise up', 'neo soul'],
        datePublished: '2025-07-17'
      },
      {
        url: `${this.baseUrl}/images/nat-king-cole-cavaleiro-piano-voz.avif`,
        caption: 'Elegante pianista e cantor dos anos 1950 ao piano com sorriso característico',
        title: 'Nat King Cole — O Cavaleiro do Piano e da Voz',
        description: 'A história de Nat King Cole, pianista virtuoso que se tornou um dos maiores crooners da história do jazz.',
        geoLocation: 'Belo Horizonte, Minas Gerais, Brasil',
        license: `${this.baseUrl}/license`,
        category: 'curiosidades',
        keywords: ['nat king cole', 'piano jazz', 'crooner', 'unforgettable', 'trio'],
        datePublished: '2025-07-17'
      },
      {
        url: `${this.baseUrl}/images/kitty-kallen-voz-doce-era-de-ouro.avif`,
        caption: 'Cantora elegante dos anos 1940 com vestido de gala e microfone vintage',
        title: 'Kitty Kallen — A Voz Doce da Era de Ouro',
        description: 'Conheça Kitty Kallen, a cantora que marcou a era de ouro do jazz com sua voz doce e interpretações memoráveis.',
        geoLocation: 'Belo Horizonte, Minas Gerais, Brasil',
        license: `${this.baseUrl}/license`,
        category: 'curiosidades',
        keywords: ['kitty kallen', 'era de ouro', 'big bands', 'swing', 'anos 1940'],
        datePublished: '2025-07-17'
      },
      {
        url: `${this.baseUrl}/images/glenn-miller-maestro-swing.avif`,
        caption: 'Maestro de orquestra dos anos 1940 com batuta e uniforme militar elegante',
        title: 'Glenn Miller — O Maestro do Swing',
        description: 'A história de Glenn Miller, o líder de orquestra que definiu o som do swing e se tornou uma lenda.',
        geoLocation: 'Belo Horizonte, Minas Gerais, Brasil',
        license: `${this.baseUrl}/license`,
        category: 'curiosidades',
        keywords: ['glenn miller', 'swing', 'big banda', 'orquestra', 'in the mood'],
        datePublished: '2025-07-17'
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
        images: images.filter(img => img.category === 'banda').slice(0, 3)
      },
      {
        pageUrl: `${this.baseUrl}/sobre`,
        images: images.filter(img => img.category === 'banda').slice(0, 2)
      },
      {
        pageUrl: `${this.baseUrl}/repertorio`,
        images: images.filter(img => img.category === 'historia')
      },
      {
        pageUrl: `${this.baseUrl}/repertorio`,
        images: images.filter(img => img.category === 'historia')
      },
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
    const publicDir = path.join(process.cwd(), 'public');

    // Generate main image sitemap
    const mainSitemap = generator.generateMainImageSitemap();
    fs.writeFileSync(`${publicDir}/sitemap-images.xml`, mainSitemap);
    console.log('✅ Generated sitemap-images.xml');

    // Generate categorized sitemaps
    const categorizedSitemaps = generator.generateCategorizedSitemaps();
    const imagesBaseDir = path.join(publicDir, 'sitemap-image');

    // garante que public/image exista
    if (!fs.existsSync(imagesBaseDir)) {
      fs.mkdirSync(imagesBaseDir, { recursive: true });
    }

    Object.entries(categorizedSitemaps).forEach(([filename, content]) => {
      // extrai a categoria do nome do arquivo: sitemap-images-<category>.xml
      const match = filename.match(/^sitemap-images-(.+)\.xml$/);
      if (!match) return;             // pula se não casar
      const category = match[1];      // ex: "banda", "performance", ...

      // cria a pasta public/image/<category> se não existir
      const categoryDir = path.join(imagesBaseDir, category);
      if (!fs.existsSync(categoryDir)) {
        fs.mkdirSync(categoryDir, { recursive: true });
      }

      // grava o arquivo dentro de public/image/<category>/
      const filePath = path.join(categoryDir, filename);
      fs.writeFileSync(filePath, content, 'utf-8');
      console.log(`✅ Generated ${category}/${filename}`);
    });


    // Generate sitemap index
    const sitemapIndex = generator.generateImageSitemapIndex();
    fs.writeFileSync(`${publicDir}/sitemap-images-index.xml`, sitemapIndex);
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