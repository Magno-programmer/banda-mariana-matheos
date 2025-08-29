// Service Worker Completo - Mariana Matheos Jazz
// Versão: 4.0.0 - Adicionado Suporte a Notificações

const VERSION = '4.0.0';
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

// ========================================
// SISTEMA DE NOTIFICAÇÕES
// ========================================

// Receber mensagens da aplicação principal
self.addEventListener('message', (event) => {
  const { type, payload } = event.data;
  
  switch (type) {
    case 'SHOW_NOTIFICATION':
      showNotification(payload);
      break;
    case 'SCHEDULE_NOTIFICATION':
      scheduleNotification(payload);
      break;
    case 'CLEAR_NOTIFICATIONS':
      clearNotifications(payload);
      break;
    default:
      console.log('Mensagem não reconhecida:', type);
  }
});

// Mostrar notificação
async function showNotification(options) {
  try {
    const {
      title,
      body,
      icon = '/favicon/favicon-192x192.png',
      badge = '/favicon/favicon-48x48.png',
      tag,
      data = {},
      actions = []
    } = options;

    const notificationOptions = {
      body,
      icon,
      badge,
      tag,
      data: {
        ...data,
        timestamp: Date.now(),
        origin: 'mariana-jazz'
      },
      actions: [
        {
          action: 'view',
          title: '👀 Ver Agenda',
          icon: '/favicon/favicon-32x32.png'
        },
        {
          action: 'dismiss',
          title: '✖️ Dispensar',
          icon: '/favicon/favicon-32x32.png'
        },
        ...actions
      ],
      requireInteraction: false,
      vibrate: [200, 100, 200],
      timestamp: Date.now()
    };

    await self.registration.showNotification(title, notificationOptions);
    
    console.log('✅ Notificação exibida:', title);
  } catch (error) {
    console.error('❌ Erro ao exibir notificação:', error);
  }
}

// Agendar notificação (simulação - para implementação real, usar Background Sync)
function scheduleNotification(options) {
  const { scheduledFor, ...notificationOptions } = options;
  const delay = new Date(scheduledFor).getTime() - Date.now();
  
  if (delay > 0) {
    setTimeout(() => {
      showNotification(notificationOptions);
    }, delay);
    
    console.log(`⏰ Notificação agendada para ${new Date(scheduledFor).toLocaleString()}`);
  } else {
    showNotification(notificationOptions);
  }
}

// Limpar notificações
async function clearNotifications(options = {}) {
  try {
    const notifications = await self.registration.getNotifications(options);
    
    notifications.forEach(notification => {
      if (!options.tag || notification.tag === options.tag) {
        notification.close();
      }
    });
    
    console.log(`🧹 ${notifications.length} notificações limpas`);
  } catch (error) {
    console.error('❌ Erro ao limpar notificações:', error);
  }
}

// Clique em notificação
self.addEventListener('notificationclick', (event) => {
  const { notification } = event;
  const { action } = event;
  const { data } = notification;
  
  console.log('🔔 Clique na notificação:', { action, data });
  
  // Fechar notificação
  notification.close();
  
  // Ações baseadas no clique
  switch (action) {
    case 'view':
      // Abrir página da agenda
      event.waitUntil(
        clients.matchAll({ type: 'window', includeUncontrolled: true })
          .then(clientList => {
            // Tentar focar em uma janela existente
            for (const client of clientList) {
              if (client.url.includes(self.location.origin)) {
                client.focus();
                client.postMessage({
                  type: 'NAVIGATE_TO',
                  payload: { url: data.url || '/agenda' }
                });
                return;
              }
            }
            
            // Abrir nova janela
            return clients.openWindow(data.url || '/agenda');
          })
      );
      break;
      
    case 'dismiss':
      // Apenas fechar (já foi fechada acima)
      break;
      
    default:
      // Clique padrão - abrir aplicação
      event.waitUntil(
        clients.matchAll({ type: 'window', includeUncontrolled: true })
          .then(clientList => {
            if (clientList.length > 0) {
              clientList[0].focus();
              return clientList[0];
            }
            return clients.openWindow('/');
          })
      );
  }
});

// Fechar notificação
self.addEventListener('notificationclose', (event) => {
  const { notification } = event;
  console.log('❌ Notificação fechada:', notification.tag);
  
  // Analytics ou tracking podem ser adicionados aqui
});