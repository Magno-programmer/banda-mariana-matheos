// Advanced Service Worker para Performance Extrema e SEO Otimizado
// Versão: 2.1.0 - Mariana Matheos Jazz

const VERSION = '2.1.0';
const STATIC_CACHE = `mariana-static-v${VERSION}`;
const DYNAMIC_CACHE = `mariana-dynamic-v${VERSION}`;
const IMAGE_CACHE = `mariana-images-v${VERSION}`;
const FONT_CACHE = `mariana-fonts-v${VERSION}`;
const API_CACHE = `mariana-api-v${VERSION}`;

// Recursos críticos para cache imediato
const CRITICAL_RESOURCES = [
  '/',
  '/index.html',
  '/src/index.css',
  '/favicon.png',
  '/sitemap.xml',
  '/robots.txt'
];

// Recursos de fonte para cache agressivo
const FONT_RESOURCES = [
  '/glimmer-of-light.otf',
  '/GatsbyFLF-Bold.ttf',
  '/GatsbyFLF.ttf',
  '/src/assets/fonts/glimmer-of-light.otf',
  '/src/assets/fonts/GatsbyFLF-Bold.ttf',
  '/src/assets/fonts/GatsbyFLF.ttf'
];

// Recursos de imagem para otimização
const IMAGE_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp', '.svg', '.gif'];
const MAX_CACHE_SIZE = 50; // MB
const MAX_CACHE_AGE = 30 * 24 * 60 * 60 * 1000; // 30 dias

// Configurações de estratégias de cache
const CACHE_STRATEGIES = {
  staleWhileRevalidate: ['/', '/about', '/contact', '/booking', '/repertoire', '/testimonials', '/gallery', '/videos', '/faq'],
  cacheFirst: [...FONT_RESOURCES, ...IMAGE_EXTENSIONS.map(ext => `*${ext}`)],
  networkFirst: ['/api/*', '*/analytics/*'],
  networkOnly: ['*/admin/*', '*/login/*']
};

// Performance Analytics
let performanceMetrics = {
  cacheHits: 0,
  cacheMisses: 0,
  networkRequests: 0,
  totalRequestTime: 0,
  imageOptimizations: 0
};

// Install Event - Cache Crítico e Preload Inteligente
self.addEventListener('install', (event) => {
  console.log(`SW ${VERSION} instalando...`);
  
  event.waitUntil(
    Promise.all([
      // Cache recursos críticos
      caches.open(STATIC_CACHE).then(cache => {
        console.log('Cacheando recursos críticos...');
        return cache.addAll(CRITICAL_RESOURCES);
      }),
      
      // Cache fontes separadamente
      caches.open(FONT_CACHE).then(cache => {
        console.log('Pré-carregando fontes...');
        return cache.addAll(FONT_RESOURCES.filter(url => !url.includes('src/')));
      }),
      
      // Preload recursos importantes
      preloadCriticalResources()
    ]).then(() => {
      console.log(`SW ${VERSION} instalado com sucesso!`);
      self.skipWaiting();
    })
  );
});

// Activate Event - Limpeza Inteligente de Cache
self.addEventListener('activate', (event) => {
  console.log(`SW ${VERSION} ativando...`);
  
  event.waitUntil(
    Promise.all([
      // Limpa caches antigos
      cleanOldCaches(),
      
      // Otimiza cache existente
      optimizeCacheStorage(),
      
      // Claim clientes ativos
      self.clients.claim()
    ]).then(() => {
      console.log(`SW ${VERSION} ativado!`);
      
      // Envia métricas iniciais
      sendPerformanceMetrics();
    })
  );
});

// Fetch Event - Estratégias Avançadas de Cache
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);
  
  // Ignora requisições não-HTTP
  if (!request.url.startsWith('http')) return;
  
  // Determina estratégia baseada no tipo de recurso
  const strategy = determineStrategy(request);
  
  event.respondWith(
    handleRequest(request, strategy)
      .then(response => {
        updateMetrics(request, response);
        return response;
      })
      .catch(error => {
        console.error('Erro no fetch:', error);
        return handleFetchError(request);
      })
  );
});

// Background Sync para formulários offline
self.addEventListener('sync', (event) => {
  if (event.tag === 'contact-form') {
    event.waitUntil(syncContactForm());
  }
  
  if (event.tag === 'booking-form') {
    event.waitUntil(syncBookingForm());
  }
});

// Push notifications (estrutura preparada)
self.addEventListener('push', (event) => {
  if (event.data) {
    const data = event.data.json();
    const options = {
      body: data.body,
      icon: '/favicon.png',
      badge: '/favicon.png',
      vibrate: [200, 100, 200],
      data: data.data,
      actions: data.actions
    };
    
    event.waitUntil(
      self.registration.showNotification(data.title, options)
    );
  }
});

// === FUNÇÕES AUXILIARES ===

// Determina estratégia de cache baseada no recurso
function determineStrategy(request) {
  const url = request.url;
  const pathname = new URL(url).pathname;
  
  // Fontes - Cache First agressivo
  if (FONT_RESOURCES.some(font => url.includes(font))) {
    return 'cacheFirst';
  }
  
  // Imagens - Cache First com otimização
  if (IMAGE_EXTENSIONS.some(ext => pathname.endsWith(ext))) {
    return 'cacheFirstOptimized';
  }
  
  // APIs - Network First
  if (url.includes('/api/') || url.includes('analytics')) {
    return 'networkFirst';
  }
  
  // Páginas - Stale While Revalidate
  if (request.destination === 'document') {
    return 'staleWhileRevalidate';
  }
  
  // CSS/JS - Cache First
  if (pathname.endsWith('.css') || pathname.endsWith('.js')) {
    return 'cacheFirst';
  }
  
  return 'staleWhileRevalidate';
}

// Handler principal de requisições
async function handleRequest(request, strategy) {
  const startTime = performance.now();
  
  switch (strategy) {
    case 'cacheFirst':
      return cacheFirst(request);
      
    case 'cacheFirstOptimized':
      return cacheFirstOptimized(request);
      
    case 'networkFirst':
      return networkFirst(request);
      
    case 'staleWhileRevalidate':
      return staleWhileRevalidate(request);
      
    default:
      return staleWhileRevalidate(request);
  }
}

// Cache First Strategy
async function cacheFirst(request) {
  const cache = await caches.open(STATIC_CACHE);
  const cached = await cache.match(request);
  
  if (cached) {
    performanceMetrics.cacheHits++;
    return cached;
  }
  
  const response = await fetch(request);
  performanceMetrics.cacheMisses++;
  
  if (response.ok) {
    cache.put(request, response.clone());
  }
  
  return response;
}

// Cache First com otimização de imagem
async function cacheFirstOptimized(request) {
  const cache = await caches.open(IMAGE_CACHE);
  const cached = await cache.match(request);
  
  if (cached) {
    performanceMetrics.cacheHits++;
    return cached;
  }
  
  try {
    const response = await fetch(request);
    performanceMetrics.cacheMisses++;
    
    if (response.ok) {
      // Otimização de imagem se necessário
      const optimizedResponse = await optimizeImageResponse(response);
      cache.put(request, optimizedResponse.clone());
      performanceMetrics.imageOptimizations++;
      return optimizedResponse;
    }
    
    return response;
  } catch (error) {
    // Fallback para imagem placeholder se offline
    return generatePlaceholderImage();
  }
}

// Network First Strategy
async function networkFirst(request) {
  const cache = await caches.open(API_CACHE);
  
  try {
    const response = await fetch(request);
    performanceMetrics.networkRequests++;
    
    if (response.ok) {
      cache.put(request, response.clone());
    }
    
    return response;
  } catch (error) {
    const cached = await cache.match(request);
    if (cached) {
      performanceMetrics.cacheHits++;
      return cached;
    }
    
    throw error;
  }
}

// Stale While Revalidate Strategy
async function staleWhileRevalidate(request) {
  const cache = await caches.open(DYNAMIC_CACHE);
  const cached = await cache.match(request);
  
  // Busca em background para atualizar cache
  const fetchPromise = fetch(request).then(response => {
    performanceMetrics.networkRequests++;
    if (response.ok) {
      cache.put(request, response.clone());
    }
    return response;
  }).catch(() => cached);
  
  if (cached) {
    performanceMetrics.cacheHits++;
    return cached;
  }
  
  return fetchPromise;
}

// Otimização de resposta de imagem
async function optimizeImageResponse(response) {
  const contentType = response.headers.get('content-type');
  
  // Se já é WebP, retorna direto
  if (contentType && contentType.includes('webp')) {
    return response;
  }
  
  // Para outros formatos, retorna a resposta original
  // (Em um cenário real, poderia converter para WebP aqui)
  return response;
}

// Preload de recursos críticos
async function preloadCriticalResources() {
  const criticalUrls = [
    '/images/cantora.png',
    '/images/banda-blue-jazz-concurso.png',
    '/src/assets/images/Logo-Mariana-Matheos-Jazz-textura-dourada-fundo-transparente.png'
  ];
  
  const cache = await caches.open(IMAGE_CACHE);
  
  for (const url of criticalUrls) {
    try {
      const response = await fetch(url);
      if (response.ok) {
        await cache.put(url, response);
      }
    } catch (error) {
      console.log(`Falha no preload de ${url}:`, error);
    }
  }
}

// Limpeza inteligente de caches antigos
async function cleanOldCaches() {
  const cacheNames = await caches.keys();
  const currentCaches = [STATIC_CACHE, DYNAMIC_CACHE, IMAGE_CACHE, FONT_CACHE, API_CACHE];
  
  return Promise.all(
    cacheNames.map(cacheName => {
      if (!currentCaches.includes(cacheName)) {
        console.log('Removendo cache antigo:', cacheName);
        return caches.delete(cacheName);
      }
    })
  );
}

// Otimização do armazenamento de cache
async function optimizeCacheStorage() {
  const imageCache = await caches.open(IMAGE_CACHE);
  const requests = await imageCache.keys();
  
  // Remove imagens antigas se cache muito grande
  if (requests.length > 100) {
    const oldRequests = requests.slice(0, 20);
    await Promise.all(
      oldRequests.map(request => imageCache.delete(request))
    );
  }
}

// Geração de imagem placeholder
function generatePlaceholderImage() {
  const svg = `<svg width="400" height="300" xmlns="http://www.w3.org/2000/svg">
    <rect width="400" height="300" fill="#1a1a1a"/>
    <text x="50%" y="50%" fill="#D4AF37" text-anchor="middle" dy=".3em" font-family="Arial" font-size="16">
      Imagem temporariamente indisponível
    </text>
  </svg>`;
  
  const blob = new Blob([svg], { type: 'image/svg+xml' });
  return new Response(blob, {
    status: 200,
    headers: { 'Content-Type': 'image/svg+xml' }
  });
}

// Tratamento de erros de fetch
async function handleFetchError(request) {
  // Páginas HTML - retorna página offline
  if (request.destination === 'document') {
    const cache = await caches.open(STATIC_CACHE);
    return cache.match('/') || new Response('Página offline', {
      status: 503,
      headers: { 'Content-Type': 'text/html' }
    });
  }
  
  // Imagens - retorna placeholder
  if (IMAGE_EXTENSIONS.some(ext => request.url.endsWith(ext))) {
    return generatePlaceholderImage();
  }
  
  // Outros recursos
  return new Response('Recurso indisponível offline', {
    status: 503,
    headers: { 'Content-Type': 'text/plain' }
  });
}

// Sync de formulários offline
async function syncContactForm() {
  const forms = await getStoredForms('contact');
  for (const form of forms) {
    try {
      await submitForm('/api/contact', form);
      await removeStoredForm('contact', form.id);
    } catch (error) {
      console.log('Falha no sync do formulário:', error);
    }
  }
}

async function syncBookingForm() {
  const forms = await getStoredForms('booking');
  for (const form of forms) {
    try {
      await submitForm('/api/booking', form);
      await removeStoredForm('booking', form.id);
    } catch (error) {
      console.log('Falha no sync do booking:', error);
    }
  }
}

// Helpers para formulários offline
async function getStoredForms(type) {
  // Implementação com IndexedDB seria ideal aqui
  return [];
}

async function removeStoredForm(type, id) {
  // Remove formulário do armazenamento local
}

async function submitForm(url, data) {
  return fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
}

// Atualização de métricas
function updateMetrics(request, response) {
  const endTime = performance.now();
  // Implementaria tracking mais detalhado aqui
}

// Envio de métricas de performance
function sendPerformanceMetrics() {
  // Enviaria métricas para analytics em produção
  console.log('Métricas de Performance SW:', performanceMetrics);
}