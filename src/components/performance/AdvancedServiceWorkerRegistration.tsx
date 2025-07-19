
import { useEffect } from 'react';

interface ServiceWorkerConfig {
  swUrl: string;
  enableUpdates: boolean;
  enableBackgroundSync: boolean;
  enablePushNotifications: boolean;
}

const AdvancedServiceWorkerRegistration = ({
  swUrl = '/sw-advanced.js',
  enableUpdates = true,
  enableBackgroundSync = true,
  enablePushNotifications = false
}: ServiceWorkerConfig) => {

  const registerServiceWorker = async () => {
    if (!('serviceWorker' in navigator)) {
      console.log('🚫 Service Worker not supported');
      return;
    }

    try {
      console.log('🔧 Registering Advanced Service Worker...');
      
      const registration = await navigator.serviceWorker.register(swUrl, {
        scope: '/',
        updateViaCache: 'none'
      });

      console.log('✅ Advanced Service Worker registered:', registration.scope);

      // Handle updates
      if (enableUpdates) {
        registration.addEventListener('updatefound', () => {
          const newWorker = registration.installing;
          if (!newWorker) return;

          console.log('🔄 New Service Worker version found');
          
          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
              console.log('📦 New content available, will refresh on next visit');
              
              // Optionally show update notification
              if ('Notification' in window && Notification.permission === 'granted') {
                new Notification('Nova versão disponível', {
                  body: 'A página será atualizada na próxima visita',
                  icon: '/favicon/favicon-192x192.png',
                  tag: 'sw-update'
                });
              }
            }
          });
        });
      }

      // Background sync registration
      if (enableBackgroundSync && 'sync' in window.ServiceWorkerRegistration.prototype) {
        console.log('🔄 Background Sync enabled');
        
        // Register for background sync when online
        registration.sync.register('background-analytics').catch(err => {
          console.warn('Background sync registration failed:', err);
        });
      }

      // Push notifications setup
      if (enablePushNotifications && 'PushManager' in window) {
        const permission = await Notification.requestPermission();
        
        if (permission === 'granted') {
          console.log('🔔 Push notifications enabled');
          
          try {
            const subscription = await registration.pushManager.subscribe({
              userVisibleOnly: true,
              applicationServerKey: urlBase64ToUint8Array('YOUR_VAPID_PUBLIC_KEY') // Replace with actual key
            });
            
            console.log('📱 Push subscription created');
            
            // Send subscription to server
            fetch('/api/push/subscribe', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(subscription)
            }).catch(err => console.warn('Push subscription failed:', err));
            
          } catch (err) {
            console.warn('Push subscription failed:', err);
          }
        }
      }

      // Message handling from Service Worker
      navigator.serviceWorker.addEventListener('message', (event) => {
        console.log('💬 Message from SW:', event.data);
        
        if (event.data.type === 'PERFORMANCE_REPORT') {
          // Handle performance reports from SW
          console.log('📊 Performance report:', event.data.metrics);
        }
        
        if (event.data.type === 'CACHE_UPDATED') {
          console.log('💾 Cache updated:', event.data.urls);
        }
      });

    } catch (error) {
      console.error('❌ Service Worker registration failed:', error);
    }
  };

  const unregisterServiceWorker = async () => {
    if (!('serviceWorker' in navigator)) return;

    try {
      const registrations = await navigator.serviceWorker.getRegistrations();
      
      for (const registration of registrations) {
        await registration.unregister();
        console.log('🗑️ Service Worker unregistered');
      }
    } catch (error) {
      console.error('❌ Service Worker unregistration failed:', error);
    }
  };

  // Send performance metrics to Service Worker
  const sendPerformanceMetrics = () => {
    if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
      const metrics = {
        type: 'PERFORMANCE_MEASURE',
        metrics: {
          timestamp: Date.now(),
          url: window.location.href,
          userAgent: navigator.userAgent,
          connectionType: (navigator as any).connection?.effectiveType || 'unknown',
          memoryUsage: (performance as any).memory ? {
            usedJSHeapSize: (performance as any).memory.usedJSHeapSize,
            totalJSHeapSize: (performance as any).memory.totalJSHeapSize,
            jsHeapSizeLimit: (performance as any).memory.jsHeapSizeLimit
          } : null
        }
      };

      navigator.serviceWorker.controller.postMessage(metrics);
    }
  };

  // Utility function for VAPID key conversion
  const urlBase64ToUint8Array = (base64String: string): Uint8Array => {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
      .replace(/-/g, '+')
      .replace(/_/g, '/');

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  };

  useEffect(() => {
    // Register service worker on mount
    registerServiceWorker();

    // Send performance metrics periodically
    const metricsInterval = setInterval(sendPerformanceMetrics, 30000); // Every 30 seconds

    // Handle page visibility changes
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        sendPerformanceMetrics();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Cleanup
    return () => {
      clearInterval(metricsInterval);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  // Component doesn't render anything, it's just for side effects
  return null;
};

export default AdvancedServiceWorkerRegistration;
