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
  { hreflang: 'pt-PT', urlPath: '/pt', locale: 'pt_PT' },
  
  // English markets
  { hreflang: 'en-US', urlPath: '/en', locale: 'en_US' },
  { hreflang: 'en', urlPath: '/en', locale: 'en_US' },
  { hreflang: 'en-GB', urlPath: '/en-gb', locale: 'en_GB' },
  { hreflang: 'en-AU', urlPath: '/en-au', locale: 'en_AU' },
  { hreflang: 'en-CA', urlPath: '/en-ca', locale: 'en_CA' },
  { hreflang: 'en-IE', urlPath: '/en-ie', locale: 'en_IE' },
  { hreflang: 'en-NZ', urlPath: '/en-nz', locale: 'en_NZ' },
  { hreflang: 'en-ZA', urlPath: '/en-za', locale: 'en_ZA' },
  { hreflang: 'en-IN', urlPath: '/en-in', locale: 'en_IN' },
  { hreflang: 'en-SG', urlPath: '/en-sg', locale: 'en_SG' },
  { hreflang: 'en-MY', urlPath: '/en-my', locale: 'en_MY' },
  
  // Spanish markets
  { hreflang: 'es-ES', urlPath: '/es', locale: 'es_ES' },
  { hreflang: 'es', urlPath: '/es', locale: 'es_ES' },
  { hreflang: 'es-AR', urlPath: '/es-ar', locale: 'es_AR' },
  { hreflang: 'es-MX', urlPath: '/es-mx', locale: 'es_MX' },
  { hreflang: 'es-CO', urlPath: '/es-co', locale: 'es_CO' },
  { hreflang: 'es-CL', urlPath: '/es-cl', locale: 'es_CL' },
  { hreflang: 'es-PE', urlPath: '/es-pe', locale: 'es_PE' },
  { hreflang: 'es-UY', urlPath: '/es-uy', locale: 'es_UY' },
  { hreflang: 'es-VE', urlPath: '/es-ve', locale: 'es_VE' },
  { hreflang: 'ca-ES', urlPath: '/ca', locale: 'ca_ES' },
  { hreflang: 'eu-ES', urlPath: '/eu', locale: 'eu_ES' },
  { hreflang: 'gl-ES', urlPath: '/gl', locale: 'gl_ES' },
  
  // French markets
  { hreflang: 'fr-FR', urlPath: '/fr', locale: 'fr_FR' },
  { hreflang: 'fr', urlPath: '/fr', locale: 'fr_FR' },
  { hreflang: 'fr-CA', urlPath: '/fr-ca', locale: 'fr_CA' },
  { hreflang: 'fr-BE', urlPath: '/fr-be', locale: 'fr_BE' },
  { hreflang: 'fr-CH', urlPath: '/fr-ch', locale: 'fr_CH' },
  
  // Italian markets
  { hreflang: 'it-IT', urlPath: '/it', locale: 'it_IT' },
  { hreflang: 'it', urlPath: '/it', locale: 'it_IT' },
  { hreflang: 'it-CH', urlPath: '/it-ch', locale: 'it_CH' },
  
  // German markets
  { hreflang: 'de-DE', urlPath: '/de', locale: 'de_DE' },
  { hreflang: 'de', urlPath: '/de', locale: 'de_DE' },
  { hreflang: 'de-AT', urlPath: '/de-at', locale: 'de_AT' },
  { hreflang: 'de-CH', urlPath: '/de-ch', locale: 'de_CH' },
  
  // Nordic markets
  { hreflang: 'sv-SE', urlPath: '/sv', locale: 'sv_SE' },
  { hreflang: 'da-DK', urlPath: '/da', locale: 'da_DK' },
  { hreflang: 'nb-NO', urlPath: '/nb', locale: 'nb_NO' },
  { hreflang: 'fi-FI', urlPath: '/fi', locale: 'fi_FI' },
  
  // Benelux
  { hreflang: 'nl-NL', urlPath: '/nl', locale: 'nl_NL' },
  { hreflang: 'nl-BE', urlPath: '/nl-be', locale: 'nl_BE' },
  
  // Asian markets
  { hreflang: 'ja-JP', urlPath: '/ja', locale: 'ja_JP' },
  { hreflang: 'ko-KR', urlPath: '/ko', locale: 'ko_KR' },
  { hreflang: 'zh-CN', urlPath: '/zh-cn', locale: 'zh_CN' },
  { hreflang: 'zh-TW', urlPath: '/zh-tw', locale: 'zh_TW' },
  { hreflang: 'th-TH', urlPath: '/th', locale: 'th_TH' },
  { hreflang: 'vi-VN', urlPath: '/vi', locale: 'vi_VN' },
  { hreflang: 'id-ID', urlPath: '/id', locale: 'id_ID' },
  
  // Eastern Europe
  { hreflang: 'pl-PL', urlPath: '/pl', locale: 'pl_PL' },
  { hreflang: 'cs-CZ', urlPath: '/cs', locale: 'cs_CZ' },
  { hreflang: 'ru-RU', urlPath: '/ru', locale: 'ru_RU' },
  { hreflang: 'uk-UA', urlPath: '/uk', locale: 'uk_UA' },
  { hreflang: 'bg-BG', urlPath: '/bg', locale: 'bg_BG' },
  { hreflang: 'ro-RO', urlPath: '/ro', locale: 'ro_RO' },
  { hreflang: 'hr-HR', urlPath: '/hr', locale: 'hr_HR' },
  { hreflang: 'sl-SI', urlPath: '/sl', locale: 'sl_SI' },
  { hreflang: 'sk-SK', urlPath: '/sk', locale: 'sk_SK' },
  { hreflang: 'hu-HU', urlPath: '/hu', locale: 'hu_HU' },
  { hreflang: 'et-EE', urlPath: '/et', locale: 'et_EE' },
  { hreflang: 'lv-LV', urlPath: '/lv', locale: 'lv_LV' },
  { hreflang: 'lt-LT', urlPath: '/lt', locale: 'lt_LT' },
  { hreflang: 'sr-RS', urlPath: '/sr', locale: 'sr_RS' },
  
  // Mediterranean & Emerging
  { hreflang: 'el-GR', urlPath: '/el', locale: 'el_GR' },
  { hreflang: 'mt-MT', urlPath: '/mt', locale: 'mt_MT' },
  { hreflang: 'el-CY', urlPath: '/el-cy', locale: 'el_CY' },
  
  // African English Markets
  { hreflang: 'en-NG', urlPath: '/en-ng', locale: 'en_NG' },
  { hreflang: 'en-KE', urlPath: '/en-ke', locale: 'en_KE' },
  { hreflang: 'en-GH', urlPath: '/en-gh', locale: 'en_GH' },
  
  // Philippines
  { hreflang: 'en-PH', urlPath: '/en-ph', locale: 'en_PH' },
  { hreflang: 'tl-PH', urlPath: '/tl', locale: 'tl_PH' },
  
  // Middle East & Other
  { hreflang: 'tr-TR', urlPath: '/tr', locale: 'tr_TR' },
  { hreflang: 'ar-SA', urlPath: '/ar', locale: 'ar_SA' },
  { hreflang: 'he-IL', urlPath: '/he', locale: 'he_IL' },
  { hreflang: 'hi-IN', urlPath: '/hi', locale: 'hi_IN' },
  
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
  '/blog'
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
    <loc>${primaryUrl}</loc>
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
    <loc>${url}</loc>
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
 * Generates international markets sitemap
 */
function generateInternationalSitemap() {
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${routes.map(route => {
  const url = route === '/' ? baseUrl : `${baseUrl}${route}`;
  const hreflangLinks = generateHreflangLinks(route);
  
  return `  <url>
    <loc>${url}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
${hreflangLinks}
  </url>`;
}).join('\n')}
</urlset>`;
}

/**
 * Generates sitemap index
 */
function generateSitemapIndex() {
  const uniqueLanguages = [...new Set(markets.map(m => m.hreflang.split('-')[0]))];
  const sitemapUrls = [
    `${baseUrl}/sitemap.xml`,
    `${baseUrl}/international/sitemap-international.xml`,
    ...uniqueLanguages.map(lang => `${baseUrl}/international/${lang}/sitemap-${lang}.xml`)
  ];

  return `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapUrls.map(url => `  <sitemap>
    <loc>${url}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
  </sitemap>`).join('\n')}
</sitemapindex>`;
}

/**
 * Validates generated sitemaps
 */
function validateGeneratedSitemaps() {
  const publicDir = path.join(process.cwd(), 'public');
  const sitemapFiles = [
    'sitemap.xml',
    'sitemap-index.xml',
    'sitemap-international.xml',
    'sitemap-pt.xml',
    'sitemap-en.xml',
    'sitemap-es.xml'
  ];

  sitemapFiles.forEach(filename => {
    const filepath = path.join(publicDir, filename);
    if (fs.existsSync(filepath)) {
      const content = fs.readFileSync(filepath, 'utf8');
      
      // Basic XML validation
      if (!content.includes('<?xml') || (!content.includes('</urlset>') && !content.includes('</sitemapindex>'))) {
        throw new Error(`Invalid XML structure in ${filename}`);
      }
      
      // Check for required namespaces
      if (content.includes('<urlset') && !content.includes('xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"')) {
        throw new Error(`Missing required namespace in ${filename}`);
      }
      
      console.log(`✓ ${filename} validation passed`);
    }
  });
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
    fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), generateMainSitemap());
    console.log('✅ sitemap.xml gerado com hreflang');

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
    fs.writeFileSync(path.join(publicDir, 'sitemap-index.xml'), generateSitemapIndex());
    console.log('✅ sitemap-index.xml gerado');

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