#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';

// ES modules __dirname fix
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configurações
const SITE_URL = 'https://marianamatheos.com.br';
const PUBLIC_DIR = path.resolve(__dirname, '../public');
const OUTPUT_FILE = path.join(PUBLIC_DIR, 'sitemap.xml');
const CURRENT_DATE = new Date().toISOString();

/**
 * Faz varredura recursiva em PUBLIC_DIR e retorna todos os arquivos .xml
 */
function findXmlFiles(dir) {
  const results = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...findXmlFiles(fullPath));
    } else if (
      entry.isFile() &&
      entry.name.endsWith('.xml') &&
      fullPath !== OUTPUT_FILE
    ) {
      results.push(fullPath);
    }
  }
  return results;
}

/**
 * Gera o XML do sitemap-index baseado nos arquivos .xml encontrados
 */
function generateSitemapIndex() {
  console.log('📄 Gerando sitemap.xml...');
  const xmlFiles = findXmlFiles(PUBLIC_DIR);
  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  xml += `<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

  xmlFiles.forEach((filePath) => {
    const relPath = path.relative(PUBLIC_DIR, filePath).split(path.sep).join('/');
    let lastmod = CURRENT_DATE;
    try {
      const stats = fs.statSync(filePath);
      lastmod = stats.mtime.toISOString();
    } catch (err) {
      console.warn(`⚠️ Não foi possível obter lastmod para ${relPath}: ${err.message}`);
    }

    xml += `  <sitemap>\n`;
    xml += `    <loc>${SITE_URL}/${relPath}</loc>\n`;
    xml += `    <lastmod>${lastmod}</lastmod>\n`;
    xml += `  </sitemap>\n`;
  });

  xml += `</sitemapindex>`;
  return xml;
}

/**
 * Escreve o arquivo sitemap.xml
 */
function writeSitemapIndex(xml) {
  try {
    fs.writeFileSync(OUTPUT_FILE, xml, 'utf-8');
    console.log(`✅ sitemap.xml salvo em: ${OUTPUT_FILE}`);
    console.log(`🌐 Disponível em: ${SITE_URL}/sitemap.xml`);
  } catch (error) {
    console.error('❌ Falha ao escrever sitemap.xml:', error.message);
    process.exit(1);
  }
}

// Execução principal
(function main() {
  console.log('===============================');
  console.log('🧭 Sitemap Index Generator');
  console.log(`📅 Gerado em: ${CURRENT_DATE}`);
  console.log('===============================\n');

  const xml = generateSitemapIndex();
  writeSitemapIndex(xml);
})();
