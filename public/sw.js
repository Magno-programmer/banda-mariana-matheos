// Service Worker Simplificado - Mariana Matheos Jazz
// Versão: 3.0.0 - Foco em Performance e Simplicidade

const VERSION = '3.0.0';
const CACHE_NAME = `mariana-jazz-v${VERSION}`;

// Recursos essenciais para cache
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/favicon/favicon.png',
  '/favicon/favicon-16x16.png',
  '/favicon/favicon-32x32.png',
  '/favicon/favicon-48x48.png',
  '/favicon/favicon-192x192.png',
  '/favicon/favicon-512x512.png',
  '/appleTouchIcon/apple-touch-icon-60x60.png',
  '/appleTouchIcon/apple-touch-icon-76x76.png',
  '/appleTouchIcon/apple-touch-icon-120x120.png',
  '/appleTouchIcon/apple-touch-icon-180x180.png',
  '/robots.txt',
  '/sitemap.xml'
];

// Instalação - Cache apenas recursos essenciais
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(STATIC_ASSETS))
      .then(() => self.skipWaiting())
  );
});

// Ativação - Remove caches antigos
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then(cacheNames => Promise.all(
        cacheNames
          .filter(cacheName => cacheName !== CACHE_NAME)
          .map(cacheName => caches.delete(cacheName))
      ))
      .then(() => self.clients.claim())
  );
});

// Fetch - Estratégia simples
self.addEventListener('fetch', (event) => {
  const { request } = event;
  
  // Ignora requisições não-HTTP
  if (!request.url.startsWith('http')) return;
  
  event.respondWith(handleRequest(request));
});

// Handler de requisições otimizado
async function handleRequest(request) {
  const cache = await caches.open(CACHE_NAME);
  
  try {
    // Para páginas HTML: cache first com fallback para network
    if (request.destination === 'document') {
      const cachedResponse = await cache.match(request);
      if (cachedResponse) return cachedResponse;
      
      const networkResponse = await fetch(request);
      if (networkResponse.ok) {
        cache.put(request, networkResponse.clone());
      }
      return networkResponse;
    }
    
    // Para recursos estáticos: network first com cache fallback
    const networkResponse = await fetch(request);
    
    // Cache recursos bem-sucedidos (exceto APIs)
    if (networkResponse.ok && !request.url.includes('/api/')) {
      cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
    
  } catch (error) {
    // Fallback para cache se network falhar
    const cachedResponse = await cache.match(request);
    if (cachedResponse) return cachedResponse;
    
    // Página offline simples para documentos
    if (request.destination === 'document') {
      return cache.match('/') || new Response(
        '<!DOCTYPE html><html><head><title>Offline</title></head><body><h1>Página temporariamente indisponível</h1></body></html>',
        { headers: { 'Content-Type': 'text/html' } }
      );
    }
    
    throw error;
  }
}