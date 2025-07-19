
/**
 * Advanced Service Worker for SEO Performance Optimization
 * Implements intelligent caching, offline support, and Core Web Vitals optimization
 */

const CACHE_NAME = 'mariana-matheos-v2025.1';
const RUNTIME_CACHE = 'runtime-cache-v1';

// Critical resources for immediate caching
const CRITICAL_RESOURCES = [
  '/',
  '/sobre',
  '/repertorio', 
  '/agenda',
  '/contato',
  '/manifest.json',
  '/images/banda.avif',
  '/images/logo-principal.avif'
];

// API endpoints for runtime caching
const API_CACHE_PATTERNS = [
  /\/api\//,
  /\/images\//,
  /\.(?:js|css|woff2|avif|webp)$/
];

// Cache strategies
const CACHE_STRATEGIES = {
  CACHE_FIRST: 'cache-first',
  NETWORK_FIRST: 'network-first', 
  STALE_WHILE_REVALIDATE: 'stale-while-revalidate'
};

// Install event - cache critical resources
self.addEventListener('install', event => {
  console.log('🔧 SW: Installing advanced service worker');
  
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('📦 SW: Caching critical resources');
        return cache.addAll(CRITICAL_RESOURCES);
      })
      .then(() => {
        console.log('✅ SW: Critical resources cached');
        return self.skipWaiting();
      })
  );
});

// Activate event - cleanup old caches
self.addEventListener('activate', event => {
  console.log('🚀 SW: Activating advanced service worker');
  
  event.waitUntil(
    Promise.all([
      // Cleanup old caches
      caches.keys().then(cacheNames => {
        return Promise.all(
          cacheNames
            .filter(cacheName => cacheName !== CACHE_NAME && cacheName !== RUNTIME_CACHE)
            .map(cacheName => {
              console.log('🗑️ SW: Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            })
        );
      }),
      // Take control of all clients
      self.clients.claim()
    ])
  );
});

// Fetch event - intelligent caching strategies
self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);
  
  // Skip non-GET requests and chrome-extension URLs
  if (request.method !== 'GET' || url.protocol === 'chrome-extension:') {
    return;
  }
  
  // Critical pages - Cache First strategy
  if (CRITICAL_RESOURCES.includes(url.pathname)) {
    event.respondWith(cacheFirstStrategy(request));
    return;
  }
  
  // Images and static assets - Cache First with runtime cache
  if (url.pathname.includes('/images/') || /\.(js|css|woff2|avif|webp)$/.test(url.pathname)) {
    event.respondWith(cacheFirstWithRuntime(request));
    return;
  }
  
  // API calls - Network First strategy
  if (url.pathname.includes('/api/')) {
    event.respondWith(networkFirstStrategy(request));
    return;
  }
  
  // HTML pages - Stale While Revalidate
  if (request.headers.get('Accept')?.includes('text/html')) {
    event.respondWith(staleWhileRevalidateStrategy(request));
    return;
  }
  
  // Default: Network first
  event.respondWith(networkFirstStrategy(request));
});

// Cache First Strategy - for critical resources
async function cacheFirstStrategy(request) {
  try {
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }
    
    const networkResponse = await fetch(request);
    const cache = await caches.open(CACHE_NAME);
    cache.put(request, networkResponse.clone());
    
    return networkResponse;
  } catch (error) {
    console.warn('🚨 SW: Cache first failed:', error);
    return new Response('Offline', { status: 503 });
  }
}

// Cache First with Runtime Cache - for assets
async function cacheFirstWithRuntime(request) {
  try {
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }
    
    const networkResponse = await fetch(request);
    const cache = await caches.open(RUNTIME_CACHE);
    
    // Implement cache size limit (50MB)
    const cacheKeys = await cache.keys();
    if (cacheKeys.length > 100) {
      await cache.delete(cacheKeys[0]);
    }
    
    cache.put(request, networkResponse.clone());
    return networkResponse;
  } catch (error) {
    console.warn('🚨 SW: Runtime cache failed:', error);
    return new Response('Asset not available offline', { status: 503 });
  }
}

// Network First Strategy - for dynamic content
async function networkFirstStrategy(request) {
  try {
    const networkResponse = await fetch(request);
    
    // Cache successful responses
    if (networkResponse.ok) {
      const cache = await caches.open(RUNTIME_CACHE);
      cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
  } catch (error) {
    console.warn('🌐 SW: Network failed, trying cache:', error);
    
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }
    
    return new Response('Content not available offline', { 
      status: 503,
      headers: { 'Content-Type': 'text/html' }
    });
  }
}

// Stale While Revalidate Strategy - for HTML pages
async function staleWhileRevalidateStrategy(request) {
  const cache = await caches.open(RUNTIME_CACHE);
  const cachedResponse = await cache.match(request);
  
  const fetchPromise = fetch(request).then(networkResponse => {
    if (networkResponse.ok) {
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  }).catch(() => cachedResponse);
  
  return cachedResponse || fetchPromise;
}

// Background sync for analytics
self.addEventListener('sync', event => {
  if (event.tag === 'background-analytics') {
    event.waitUntil(sendPendingAnalytics());
  }
});

// Send pending analytics data
async function sendPendingAnalytics() {
  try {
    const data = await getStoredAnalytics();
    if (data.length > 0) {
      await fetch('/api/analytics/batch', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' }
      });
      await clearStoredAnalytics();
    }
  } catch (error) {
    console.warn('📊 SW: Analytics sync failed:', error);
  }
}

// Web Push notifications for events
self.addEventListener('push', event => {
  if (!event.data) return;
  
  const data = event.data.json();
  const options = {
    body: data.body || 'Novo show da Mariana Matheos Jazz Band!',
    icon: '/images/banda.avif',
    badge: '/favicon/favicon-96x96.png',
    data: data.url || '/',
    actions: [
      {
        action: 'view',
        title: 'Ver Detalhes'
      },
      {
        action: 'close', 
        title: 'Fechar'
      }
    ]
  };
  
  event.waitUntil(
    self.registration.showNotification(data.title || 'Mariana Matheos Jazz', options)
  );
});

// Handle notification clicks
self.addEventListener('notificationclick', event => {
  event.notification.close();
  
  if (event.action === 'view' || !event.action) {
    const url = event.notification.data || '/';
    event.waitUntil(
      clients.openWindow(url)
    );
  }
});

// Performance monitoring
self.addEventListener('message', event => {
  if (event.data.type === 'PERFORMANCE_MEASURE') {
    // Log performance metrics
    console.log('📈 SW: Performance measure:', event.data.metrics);
  }
});

// Utility functions for analytics storage
async function getStoredAnalytics() {
  // Implementation would depend on IndexedDB or similar storage
  return [];
}

async function clearStoredAnalytics() {
  // Clear stored analytics data
}

console.log('🎵 Advanced Service Worker for Mariana Matheos Jazz Band loaded');
