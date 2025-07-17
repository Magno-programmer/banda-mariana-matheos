#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const inputDir = path.join(__dirname, '../public/images');
const assetsDir = path.join(__dirname, '../src/assets/images');

async function optimizeImages(directory) {
  try {
    const files = fs.readdirSync(directory);
    
    for (const file of files) {
      const filePath = path.join(directory, file);
      const ext = path.extname(file).toLowerCase();
      
      if (['.jpg', '.jpeg', '.png'].includes(ext)) {
        const baseName = path.basename(file, ext);
        const webpPath = path.join(directory, `${baseName}.webp`);
        const avifPath = path.join(directory, `${baseName}.avif`);
        
        // Generate WebP version
        if (!fs.existsSync(webpPath)) {
          await sharp(filePath)
            .webp({ quality: 85, effort: 6 })
            .toFile(webpPath);
          console.log(`✓ Generated WebP: ${baseName}.webp`);
        }
        
        // Generate AVIF version
        if (!fs.existsSync(avifPath)) {
          await sharp(filePath)
            .avif({ quality: 85, effort: 9 })
            .toFile(avifPath);
          console.log(`✓ Generated AVIF: ${baseName}.avif`);
        }
      }
    }
  } catch (error) {
    console.warn(`Directory ${directory} not found or error processing:`, error.message);
  }
}

async function main() {
  console.log('🖼️  Optimizing images...');
  
  await optimizeImages(inputDir);
  await optimizeImages(assetsDir);
  
  console.log('✅ Image optimization complete!');
}

main().catch(console.error);