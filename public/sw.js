// Service Worker para cache básico e performance
const CACHE_NAME = 'mariana-matheos-v1';
const urlsToCache = [
  '/',
  '/src/index.css',
  '/glimmer-of-light.otf',
  '/GatsbyFLF-Bold.ttf',
  '/GatsbyFLF.ttf',
  '/favicon.png',
  '/images/cantora.png',
  '/images/banda-blue-jazz-concurso.png',
  '/images/baixista.png',
  '/images/baterista.png',
  '/images/pianista.png',
  '/images/banda.png'
];

// Install event - cache recursos críticos
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Cache aberto');
        return cache.addAll(urlsToCache);
      })
  );
});

// Fetch event - serve do cache quando possível
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Retorna cache se encontrado, senão busca na rede
        if (response) {
          return response;
        }
        
        // Clone a requisição para usar
        const fetchRequest = event.request.clone();
        
        return fetch(fetchRequest).then((response) => {
          // Verifica se é uma resposta válida
          if (!response || response.status !== 200 || response.type !== 'basic') {
            return response;
          }
          
          // Clone a resposta para cache
          const responseToCache = response.clone();
          
          caches.open(CACHE_NAME)
            .then((cache) => {
              cache.put(event.request, responseToCache);
            });
          
          return response;
        }).catch(() => {
          // Fallback para páginas offline
          if (event.request.destination === 'document') {
            return caches.match('/');
          }
        });
      })
  );
});

// Activate event - limpa caches antigos
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('Removendo cache antigo:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});