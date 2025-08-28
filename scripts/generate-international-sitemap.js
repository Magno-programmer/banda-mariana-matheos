/**
 * International Sitemap Generator
 * Generates sitemaps with hreflang annotations for all supported markets
 */

import fs from 'fs';
import path from 'path';
import { pathToFileURL } from 'url';

const baseUrl = 'https://marianamatheos.com.br';

// All supported markets with their hreflang codes
const markets = [
  // Portuguese markets
  { hreflang: 'pt-BR', urlPath: '', locale: 'pt_BR' },
  { hreflang: 'pt', urlPath: '', locale: 'pt_BR' },
  // Default fallback
  { hreflang: 'x-default', urlPath: '', locale: 'pt_BR' },
];

// Core site routes
const routes = [
  '/',
  '/sobre',
  '/fotos',
  '/videos',
  '/repertorio',
  '/agenda',
  '/contato',
  '/faq',
  '/depoimentos',
  '/blog',
  "/blog/como-escolher-banda-casamento",
  "/blog/mariana-matheos-jazz-essencia-da-musica-ao-vivo",
  "/blog/historia-do-jazz-brasil",
  "/blog/musica-ao-vivo-eventos-corporativos",
  "/blog/historia-dos-jazz-standards",
  "/blog/como-ser-uma-banda-de-jazz",
  "/blog/billie-holiday-dama-do-jazz",
  "/blog/ella-fitzgerald-primeira-dama-cancao",
  "/blog/etta-james-matriarca-soul-rb",
  "/blog/amy-winehouse-neo-soul",
  "/blog/frank-sinatra-rei-do-swing",
  "/blog/nina-simone-sacerdotisa-soul",
  "/blog/beth-hart-blues-contemporaneo",
  "/blog/bb-king-rei-do-blues",
  "/blog/andra-day-nova-voz-soul",
  "/blog/nat-king-cole-cavaleiro-piano-voz",
  "/blog/kitty-kallen-voz-doce-era-ouro",
  "/blog/glenn-miller-maestro-swing"
];

/**
 * Generate hreflang links for a specific route
 */
function generateHreflangLinks(route) {
  return markets.map(market => {
    const url = `${baseUrl}${market.urlPath}${route}`;
    return `    <xhtml:link rel="alternate" hreflang="${market.hreflang}" href="${url}"/>`;
  }).join('\n');
}

/**
 * Generate main sitemap with hreflang
 */
function generateMainSitemap() {
  const currentDate = new Date().toISOString();
  
  const urlEntries = routes.map(route => {
    const primaryUrl = `${baseUrl}${route}`;
    const hreflangLinks = generateHreflangLinks(route);
    
    // Determine priority and change frequency based on route
    let priority = '0.8';
    let changefreq = 'weekly';
    
    if (route === '/') {
      priority = '1.0';
      changefreq = 'daily';
    } else if (route === '/blog') {
      priority = '0.9';
      changefreq = 'daily';
    } else if (['/sobre', '/repertorio', '/contato'].includes(route)) {
      priority = '0.9';
      changefreq = 'weekly';
    }
    
    return `  <url>
    <loc>${primaryUrl}",
    <lastmod>${currentDate}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
${hreflangLinks}
  </url>`;
  }).join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urlEntries}
</urlset>`;
}

/**
 * Generate language-specific sitemap
 */
function generateLanguageSitemap(market) {
  const currentDate = new Date().toISOString();
  
  const urlEntries = routes.map(route => {
    const url = `${baseUrl}${market.urlPath}${route}`;
    
    let priority = '0.8';
    let changefreq = 'weekly';
    
    if (route === '/') {
      priority = '1.0';
      changefreq = 'daily';
    } else if (route === '/blog') {
      priority = '0.9';
      changefreq = 'daily';
    }
    
    return `  <url>
    <loc>${url}",
    <lastmod>${currentDate}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
  }).join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlEntries}
</urlset>`;
}

/**
 * Generates sitemap index
 */
function generateSitemapIndex() {
  const uniqueLanguages = [...new Set(markets.map(m => m.hreflang.split('-')[0]))];
  const sitemapUrls = [
    `${baseUrl}/sitemap-pages.xml`,
    `${baseUrl}/international/sitemap-international.xml`,
    ...uniqueLanguages.map(lang => `${baseUrl}/international/${lang}/sitemap-${lang}.xml`)
  ];

  return `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapUrls.map(url => `  <sitemap>
    <loc>${url}",
    <lastmod>${new Date().toISOString()}</lastmod>
  </sitemap>`).join('\n')}
</sitemapindex>`;
}

/**
 * Main generation function
 */
async function generateInternationalSitemaps() {
  const publicDir = path.join(process.cwd(), 'public');
  const intlDir   = path.join(publicDir, 'international');

  // Cria public/ e public/international/ (se ainda não existirem)
  fs.mkdirSync(publicDir, { recursive: true });
  fs.mkdirSync(intlDir,   { recursive: true });

  try {
    // Sitemap principal
    fs.writeFileSync(path.join(publicDir, 'sitemap-pages.xml'), generateMainSitemap());
    console.log('✅ sitemap-pages.xml gerado com hreflang');

    // Sitemaps por idioma
    const langs = [...new Set(markets.map(m => m.hreflang.split('-')[0]))];
    langs.forEach(lang => {
      const m = markets.find(mkt => mkt.hreflang.startsWith(lang));
      if (!m) return;

      const langDir = path.join(intlDir, lang);
      fs.mkdirSync(langDir, { recursive: true });
      const filePath = path.join(langDir, `sitemap-${lang}.xml`);
      fs.writeFileSync(filePath, generateLanguageSitemap(m));
      console.log(`✅ /international/${lang}/sitemap-${lang}.xml`);
    });

    // Sitemap internacional (agrega todos sem split)
    fs.writeFileSync(path.join(intlDir, 'sitemap-international.xml'), generateMainSitemap());
    console.log('✅ sitemap-international.xml gerado');

    // Índice de sitemaps
    fs.writeFileSync(path.join(publicDir, 'sitemap-language-index.xml'), generateSitemapIndex());
    console.log('✅ sitemap-language-index.xml gerado');

    console.log('\n🎉 Todos os sitemaps gerados com sucesso!');
  } catch (err) {
    console.error('❌ Erro ao gerar sitemaps:', err);
    process.exit(1);
  }
}

// Run if called directly

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  generateInternationalSitemaps();
}

export { generateInternationalSitemaps };