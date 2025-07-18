#!/usr/bin/env node

/**
 * Dynamic Sitemap Generator with Real Modification Dates
 * Generates sitemap.xml with accurate lastmod dates from file system and content data
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// ES modules fix for __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configure paths
const rootDir = path.resolve(__dirname, '..');
const srcDir = path.join(rootDir, 'src');
const publicDir = path.join(rootDir, 'public');
const sitemapPath = path.join(publicDir, 'sitemap.xml');

// Website configuration
const SITE_URL = 'https://marianamatheos.com.br';
const CURRENT_DATE = new Date().toISOString();

// Static pages mapping
const STATIC_PAGES = [
  { 
    path: '/', 
    file: 'src/pages/Index.tsx',
    priority: '1.0',
    changefreq: 'daily'
  },
  { 
    path: '/sobre', 
    file: 'src/pages/AboutPage.tsx',
    priority: '0.9',
    changefreq: 'monthly'
  },
  { 
    path: '/fotos', 
    file: 'src/pages/ImagePage.tsx',
    priority: '0.8',
    changefreq: 'weekly'
  },
  { 
    path: '/videos', 
    file: 'src/pages/VideosPage.tsx',
    priority: '0.8',
    changefreq: 'weekly'
  },
  { 
    path: '/repertorio', 
    file: 'src/pages/RepertoirePage.tsx',
    priority: '0.9',
    changefreq: 'monthly'
  },
  { 
    path: '/agenda', 
    file: 'src/pages/BookingPage.tsx',
    priority: '0.9',
    changefreq: 'weekly'
  },
  { 
    path: '/contato', 
    file: 'src/pages/ContactPage.tsx',
    priority: '0.8',
    changefreq: 'monthly'
  },
  { 
    path: '/faq', 
    file: 'src/pages/FAQPage.tsx',
    priority: '0.7',
    changefreq: 'monthly'
  },
  { 
    path: '/depoimentos', 
    file: 'src/pages/TestimonialsPage.tsx',
    priority: '0.8',
    changefreq: 'weekly'
  },
  { 
    path: '/blog', 
    file: 'src/pages/BlogPage.tsx',
    priority: '0.9',
    changefreq: 'daily'
  }
];

// Musician biographies (static content)
const MUSICIANS_DATA = [
  { slug: 'billie-holiday', publishedDate: '2024-12-15' },
  { slug: 'ella-fitzgerald', publishedDate: '2024-12-16' },
  { slug: 'etta-james', publishedDate: '2024-12-17' },
  { slug: 'amy-winehouse', publishedDate: '2024-12-18' },
  { slug: 'frank-sinatra', publishedDate: '2024-12-19' },
  { slug: 'nina-simone', publishedDate: '2024-12-20' },
  { slug: 'beth-hart', publishedDate: '2024-12-21' },
  { slug: 'bb-king', publishedDate: '2024-12-22' },
  { slug: 'andra-day', publishedDate: '2024-12-23' },
  { slug: 'nat-king-cole', publishedDate: '2024-12-24' },
  { slug: 'kitty-kallen', publishedDate: '2024-12-25' },
  { slug: 'glenn-miller', publishedDate: '2024-12-26' }
];

/**
 * Get file modification date in ISO format with enhanced detection
 */
function getFileModDate(filePath) {
  try {
    const fullPath = path.join(rootDir, filePath);
    const stats = fs.statSync(fullPath);
    let latestDate = stats.mtime;
    
    // Check related component files for pages
    const relatedFiles = [];
    if (filePath.includes('pages/')) {
      const pageName = path.basename(filePath, '.tsx');
      // Check for related sections/components
      const sectionsDir = path.join(srcDir, 'components', 'sections');
      if (fs.existsSync(sectionsDir)) {
        const sectionDirs = fs.readdirSync(sectionsDir);
        sectionDirs.forEach(dir => {
          const sectionPath = path.join(sectionsDir, dir);
          if (fs.statSync(sectionPath).isDirectory()) {
            const files = fs.readdirSync(sectionPath);
            files.forEach(file => {
              if (file.endsWith('.tsx')) {
                relatedFiles.push(path.join('src', 'components', 'sections', dir, file));
              }
            });
          }
        });
      }
    }
    
    // Check modification dates of related files
    relatedFiles.forEach(relatedPath => {
      try {
        const relatedFullPath = path.join(rootDir, relatedPath);
        const relatedStats = fs.statSync(relatedFullPath);
        if (relatedStats.mtime > latestDate) {
          latestDate = relatedStats.mtime;
        }
      } catch (e) {
        // Ignore file not found errors for related files
      }
    });
    
    return latestDate.toISOString();
  } catch (error) {
    console.warn(`Warning: Could not get modification date for ${filePath}:`, error.message);
    return CURRENT_DATE;
  }
}

/**
 * Load and parse blog articles data with enhanced validation
 */
function loadBlogData() {
  try {
    const blogDataPath = path.join(srcDir, 'data', 'blogArticlesData.ts');
    const content = fs.readFileSync(blogDataPath, 'utf-8');
    
    // Extract blog articles data using improved regex
    const articlesMatch = content.match(/export\s+const\s+blogArticlesData\s*=\s*\[(.*?)\];/s);
    if (!articlesMatch) {
      console.warn('Could not find blogArticlesData export');
      return [];
    }
    
    // Extract individual articles with more robust regex
    const articles = [];
    const articlePattern = /{\s*id:\s*['"](\d+)['"],[\s\S]*?slug:\s*['"]([^'"]+)['"],[\s\S]*?publishedDate:\s*['"]([^'"]+)['"],/g;
    
    let match;
    while ((match = articlePattern.exec(articlesMatch[1])) !== null) {
      const publishedDate = match[3];
      
      // Validate date format
      if (!/^\d{4}-\d{2}-\d{2}$/.test(publishedDate)) {
        console.warn(`Invalid date format for article ${match[2]}: ${publishedDate}`);
        continue;
      }
      
      articles.push({
        id: match[1],
        slug: match[2],
        publishedDate: publishedDate
      });
    }
    
    console.log(`📝 Successfully parsed ${articles.length} blog articles`);
    return articles;
  } catch (error) {
    console.warn('Warning: Could not load blog data:', error.message);
    return [];
  }
}

/**
 * Generate XML sitemap
 */
function generateSitemap() {
  console.log('🚀 Generating dynamic sitemap...');
  
  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" 
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1"
        xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">

`;

  // Add static pages with enhanced metadata
  STATIC_PAGES.forEach(page => {
    const lastmod = getFileModDate(page.file);
    xml += `  <url>
    <loc>${SITE_URL}${page.path}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>`;
    
    // Add image metadata for gallery pages
    if (page.path === '/fotos') {
      xml += `
    <image:image>
      <image:loc>${SITE_URL}/images/galeria-mariana-matheos-jazz.avif</image:loc>
      <image:title>Galeria de Fotos - Mariana Matheos Jazz</image:title>
    </image:image>`;
    }
    
    // Add video metadata for videos page
    if (page.path === '/videos') {
      xml += `
    <video:video>
      <video:title>Vídeos - Mariana Matheos Jazz</video:title>
      <video:description>Performances ao vivo e vídeos musicais</video:description>
    </video:video>`;
    }
    
    xml += `
  </url>

`;
  });

  // Add blog articles
  const blogArticles = loadBlogData();
  console.log(`📝 Found ${blogArticles.length} blog articles`);
  
  blogArticles.forEach(article => {
    const publishedDate = new Date(article.publishedDate);
    const blogDataModDate = getFileModDate('src/data/blogArticlesData.ts');
    const blogDataDate = new Date(blogDataModDate);
    
    // Use the most recent date between publication and data modification
    const lastmod = publishedDate > blogDataDate ? publishedDate.toISOString() : blogDataModDate;
    
    xml += `  <url>
    <loc>${SITE_URL}/blog/${article.slug}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>

`;
  });

  // Add musician biographies
  console.log(`🎵 Adding ${MUSICIANS_DATA.length} musician biographies`);
  
  MUSICIANS_DATA.forEach(musician => {
    const publishedDate = new Date(musician.publishedDate);
    xml += `  <url>
    <loc>${SITE_URL}/biografia/${musician.slug}</loc>
    <lastmod>${publishedDate.toISOString()}</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.6</priority>
  </url>

`;
  });

  xml += `</urlset>`;

  return xml;
}

/**
 * Validate XML format
 */
function validateXML(xml) {
  try {
    // Basic XML validation
    if (!xml.includes('<?xml version="1.0"')) {
      throw new Error('Missing XML declaration');
    }
    if (!xml.includes('<urlset')) {
      throw new Error('Missing urlset element');
    }
    if (!xml.includes('</urlset>')) {
      throw new Error('Missing closing urlset element');
    }
    
    // Count URLs
    const urlCount = (xml.match(/<url>/g) || []).length;
    console.log(`✅ XML validation passed - ${urlCount} URLs found`);
    return true;
  } catch (error) {
    console.error('❌ XML validation failed:', error.message);
    return false;
  }
}

/**
 * Write sitemap to file
 */
function writeSitemap(xml) {
  try {
    // Backup existing sitemap
    if (fs.existsSync(sitemapPath)) {
      const backupPath = sitemapPath.replace('.xml', '-backup.xml');
      fs.copyFileSync(sitemapPath, backupPath);
      console.log(`💾 Backup created: ${backupPath}`);
    }
    
    // Write new sitemap
    fs.writeFileSync(sitemapPath, xml, 'utf-8');
    console.log(`✅ Sitemap generated successfully: ${sitemapPath}`);
    
    // Log stats
    const stats = fs.statSync(sitemapPath);
    console.log(`📊 File size: ${(stats.size / 1024).toFixed(2)} KB`);
    
  } catch (error) {
    console.error('❌ Error writing sitemap:', error.message);
    process.exit(1);
  }
}

/**
 * Main execution
 */
function main() {
  console.log('🌐 Dynamic Sitemap Generator');
  console.log('============================');
  console.log(`📅 Generation time: ${CURRENT_DATE}`);
  console.log(`🔗 Site URL: ${SITE_URL}`);
  console.log('');
  
  try {
    // Generate sitemap XML
    const xml = generateSitemap();
    
    // Validate XML
    if (!validateXML(xml)) {
      throw new Error('XML validation failed');
    }
    
    // Write to file
    writeSitemap(xml);
    
    console.log('');
    console.log('🎉 Sitemap generation completed successfully!');
    console.log(`📍 Location: ${sitemapPath}`);
    console.log(`🔍 Preview: ${SITE_URL}/sitemap.xml`);
    
  } catch (error) {
    console.error('💥 Sitemap generation failed:', error.message);
    process.exit(1);
  }
}

// Execute if run directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}

export { generateSitemap, main };