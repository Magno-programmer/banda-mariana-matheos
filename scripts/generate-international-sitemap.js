/**
 * International Sitemap Generator
 * Generates sitemaps with hreflang annotations for all supported markets
 */

import fs from 'fs';
import path from 'path';

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
 * Generate sitemap index
 */
function generateSitemapIndex() {
  const currentDate = new Date().toISOString();
  
  // Get unique language paths for individual sitemaps
  const uniqueMarkets = markets.filter((market, index, self) => 
    index === self.findIndex(m => m.urlPath === market.urlPath)
  );
  
  const sitemapEntries = uniqueMarkets.map(market => {
    const filename = market.urlPath === '' ? 'sitemap-pt-br.xml' : `sitemap-${market.hreflang}.xml`;
    return `  <sitemap>
    <loc>${baseUrl}/${filename}</loc>
    <lastmod>${currentDate}</lastmod>
  </sitemap>`;
  }).join('\n');

  // Add main sitemap
  const mainSitemap = `  <sitemap>
    <loc>${baseUrl}/sitemap.xml</loc>
    <lastmod>${currentDate}</lastmod>
  </sitemap>`;

  return `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${mainSitemap}
${sitemapEntries}
</sitemapindex>`;
}

/**
 * Main generation function
 */
async function generateInternationalSitemaps() {
  const publicDir = path.join(process.cwd(), 'public');
  
  try {
    // Generate main sitemap with hreflang
    const mainSitemap = generateMainSitemap();
    fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), mainSitemap);
    console.log('✅ Generated main sitemap with hreflang annotations');
    
    // Generate language-specific sitemaps
    const uniqueMarkets = markets.filter((market, index, self) => 
      index === self.findIndex(m => m.urlPath === market.urlPath)
    );
    
    for (const market of uniqueMarkets) {
      const langSitemap = generateLanguageSitemap(market);
      const filename = market.urlPath === '' ? 'sitemap-pt-br.xml' : `sitemap-${market.hreflang}.xml`;
      fs.writeFileSync(path.join(publicDir, filename), langSitemap);
      console.log(`✅ Generated ${filename}`);
    }
    
    // Generate sitemap index
    const sitemapIndex = generateSitemapIndex();
    fs.writeFileSync(path.join(publicDir, 'sitemap-index.xml'), sitemapIndex);
    console.log('✅ Generated sitemap index');
    
    console.log('\n🎉 International sitemap generation completed!');
    console.log(`📊 Generated sitemaps for ${markets.length} markets`);
    console.log(`🌍 Covering ${uniqueMarkets.length} unique language variants`);
    
  } catch (error) {
    console.error('❌ Error generating international sitemaps:', error);
    process.exit(1);
  }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  generateInternationalSitemaps();
}

export { generateInternationalSitemaps };