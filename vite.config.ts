
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { exec } from "child_process";
import { promisify } from "util";

const execAsync = promisify(exec);

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    // Advanced headers for development
    headers: {
      'Content-Language': 'pt-BR',
      'Vary': 'Accept-Language, Accept-Encoding, User-Agent',
      'X-Content-Type-Options': 'nosniff',
      'X-Frame-Options': 'SAMEORIGIN',
      'X-XSS-Protection': '1; mode=block',
      'Referrer-Policy': 'strict-origin-when-cross-origin',
      'Permissions-Policy': 'geolocation=(), microphone=(), camera=()',
      'Accept-CH': 'DPR, Viewport-Width, Width, Downlink, ECT, RTT',
      'Critical-CH': 'Viewport-Width, Width'
    }
  },
  plugins: [
    react(),
    mode === 'development' && componentTagger(),
    // Dynamic sitemap generation plugin
    {
      name: 'sitemap-generator',
      buildStart: async () => {
        if (mode === 'production') {
          console.log('🌐 Generating dynamic sitemap...');
          try {
            await execAsync('node scripts/generate-sitemap.js');
            console.log('✅ Sitemap generated successfully');
          } catch (error) {
            console.warn('⚠️ Sitemap generation warning:', error instanceof Error ? error.message : String(error));
          }
        }
      }
    },
    // Advanced Service Worker registration
    {
      name: 'advanced-sw-plugin',
      buildEnd: () => {
        if (mode === 'production') {
          console.log('🔧 Configuring advanced Service Worker...');
        }
      }
    },
    // HTTP Headers optimization plugin
    {
      name: 'http-headers-optimization',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          // Set advanced headers based on request
          const acceptLanguage = req.headers['accept-language'] || '';
          
          // Content-Language detection
          if (acceptLanguage.includes('pt')) {
            res.setHeader('Content-Language', 'pt-BR');
          } else if (acceptLanguage.includes('en')) {
            res.setHeader('Content-Language', 'en-US');
          } else {
            res.setHeader('Content-Language', 'pt-BR');
          }
          
          // Vary headers for caching
          res.setHeader('Vary', 'Accept-Language, Accept-Encoding, User-Agent, Accept');
          
          // Security headers
          res.setHeader('X-Content-Type-Options', 'nosniff');
          res.setHeader('X-Frame-Options', 'SAMEORIGIN');
          res.setHeader('X-XSS-Protection', '1; mode=block');
          res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
          
          // Performance hints
          res.setHeader('Accept-CH', 'DPR, Viewport-Width, Width, Downlink, ECT, RTT');
          res.setHeader('Critical-CH', 'Viewport-Width, Width');
          
          // Permissions policy
          res.setHeader('Permissions-Policy', 'geolocation=(), microphone=(), camera=()');
          
          // Cache control based on content type
          if (req.url?.includes('/images/')) {
            res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
          } else if (req.url?.endsWith('.js') || req.url?.endsWith('.css')) {
            res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
          } else if (req.url?.endsWith('.html')) {
            res.setHeader('Cache-Control', 'public, max-age=3600, must-revalidate');
          }
          
          // Hreflang link headers for international SEO
          if (req.url === '/' || req.url?.endsWith('.html')) {
            const hreflangHeaders = [
              '<https://marianamatheos.com.br/>; rel="alternate"; hreflang="pt-BR"',
              '<https://marianamatheos.com.br/en/>; rel="alternate"; hreflang="en"',
              '<https://marianamatheos.com.br/es/>; rel="alternate"; hreflang="es"',
              '<https://marianamatheos.com.br/>; rel="alternate"; hreflang="x-default"'
            ];
            res.setHeader('Link', hreflangHeaders.join(', '));
          }
          
          next();
        });
      }
    }
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    minify: mode === 'production' ? 'terser' : 'esbuild',
    cssMinify: true,
    cssCodeSplit: true,
    sourcemap: mode === 'development',
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom'],
          ui: ['@radix-ui/react-dialog', '@radix-ui/react-dropdown-menu', '@radix-ui/react-toast'],
          components: ['lucide-react', 'class-variance-authority'],
          schemas: ['@/utils/schemaGenerators', '@/utils/advancedSchemaGenerators']
        },
        assetFileNames: (assetInfo) => {
          if (assetInfo.name?.endsWith('.css')) {
            return 'assets/css/[name]-[hash][extname]';
          }
          if (assetInfo.name?.endsWith('.avif') || assetInfo.name?.endsWith('.webp')) {
            return 'assets/images/[name]-[hash][extname]';
          }
          return 'assets/[name]-[hash][extname]';
        },
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js'
      }
    },
    // Advanced build optimizations
    ...(mode === 'production' && {
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true,
          pure_funcs: ['console.log', 'console.info'],
          remove_console: true,
          passes: 2
        },
        mangle: {
          safari10: true,
          properties: {
            regex: /^_/
          }
        },
        format: {
          comments: false
        }
      }
    })
  },
  // Enhanced preview configuration
  preview: {
    headers: {
      'Content-Language': 'pt-BR',
      'Vary': 'Accept-Language, Accept-Encoding',
      'Cache-Control': 'public, max-age=3600'
    }
  }
}));
