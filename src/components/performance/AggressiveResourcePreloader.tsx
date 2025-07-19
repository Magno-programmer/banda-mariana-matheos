
import { useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';

interface PreloadResource {
  href: string;
  as: string;
  type?: string;
  crossorigin?: string;
  importance?: 'high' | 'low';
  priority?: 'high' | 'low';
  fetchpriority?: 'high' | 'low' | 'auto';
}

// Critical resources with priority hints
const criticalResources: PreloadResource[] = [
  // Critical fonts with high priority
  { 
    href: '/GatsbyFLF-Bold.ttf', 
    as: 'font', 
    type: 'font/ttf', 
    crossorigin: 'anonymous', 
    importance: 'high',
    fetchpriority: 'high'
  },
  { 
    href: '/GatsbyFLF.ttf', 
    as: 'font', 
    type: 'font/ttf', 
    crossorigin: 'anonymous', 
    importance: 'high',
    fetchpriority: 'high'
  },
  { 
    href: '/glimmer-of-light.otf', 
    as: 'font', 
    type: 'font/otf', 
    crossorigin: 'anonymous', 
    importance: 'high',
    fetchpriority: 'high'
  },
  
  // Above-the-fold images with high priority
  { 
    href: '/images/banda.avif', 
    as: 'image', 
    type: 'image/avif', 
    importance: 'high',
    fetchpriority: 'high'
  },
  { 
    href: '/images/logo-principal.avif', 
    as: 'image', 
    type: 'image/avif', 
    importance: 'high',
    fetchpriority: 'high'
  },
  
  // Critical favicons
  { 
    href: '/favicon/favicon-192x192.png', 
    as: 'image', 
    type: 'image/png', 
    importance: 'high',
    fetchpriority: 'high'
  }
];

// Route-specific resources with intelligent prefetching
const routeSpecificResources: Record<string, PreloadResource[]> = {
  '/sobre': [
    { href: '/images/cantora.avif', as: 'image', type: 'image/avif', fetchpriority: 'high' },
    { href: '/images/historia-jazz-brasil.avif', as: 'image', type: 'image/avif', fetchpriority: 'auto' }
  ],
  '/repertorio': [
    { href: '/images/jazz-standard.avif', as: 'image', type: 'image/avif', fetchpriority: 'high' },
    { href: '/images/billie-holiday.avif', as: 'image', type: 'image/avif', fetchpriority: 'auto' }
  ],
  '/fotos': [
    { href: '/images/banda-de-jazz-1920.avif', as: 'image', type: 'image/avif', fetchpriority: 'high' },
    { href: '/images/casamento-jazz-band.avif', as: 'image', type: 'image/avif', fetchpriority: 'auto' }
  ],
  '/videos': [
    { href: '/images/banda-blue-jazz-concurso.avif', as: 'image', type: 'image/avif', fetchpriority: 'high' }
  ]
};

// Intelligent next-page prediction based on user behavior analytics
const intelligentPredictions: Record<string, string[]> = {
  '/': ['/sobre', '/repertorio', '/agenda', '/contato'],
  '/sobre': ['/repertorio', '/fotos', '/agenda', '/videos'],
  '/repertorio': ['/agenda', '/videos', '/fotos', '/contato'],
  '/fotos': ['/videos', '/repertorio', '/agenda', '/sobre'],
  '/videos': ['/fotos', '/agenda', '/repertorio', '/contato'],
  '/agenda': ['/contato', '/repertorio', '/sobre', '/faq'],
  '/contato': ['/agenda', '/faq', '/depoimentos', '/sobre'],
  '/faq': ['/depoimentos', '/contato', '/agenda', '/sobre'],
  '/depoimentos': ['/contato', '/agenda', '/sobre', '/repertorio'],
  '/blog': ['/blog/historia-jazz-brasil', '/blog/banda-perfeita-casamento', '/sobre', '/repertorio']
};

const AggressiveResourcePreloader: React.FC = () => {
  const location = useLocation();

  // Get network information for adaptive loading
  const getNetworkInfo = useCallback(() => {
    const connection = (navigator as any).connection;
    if (!connection) return { effectiveType: '4g', saveData: false };
    
    return {
      effectiveType: connection.effectiveType || '4g',
      saveData: connection.saveData || false,
      downlink: connection.downlink || 10
    };
  }, []);

  const preloadResource = useCallback((resource: PreloadResource, delay = 0) => {
    // Check if already preloaded
    const existing = document.querySelector(`link[href="${resource.href}"][rel="preload"]`);
    if (existing) return;

    const networkInfo = getNetworkInfo();
    
    // Skip non-critical resources on slow connections or save-data mode
    if (networkInfo.saveData && resource.importance !== 'high') return;
    if (networkInfo.effectiveType === '2g' && resource.importance !== 'high') return;

    setTimeout(() => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.href = resource.href;
      link.as = resource.as;
      
      if (resource.type) link.type = resource.type;
      if (resource.crossorigin) link.crossOrigin = resource.crossorigin;
      if (resource.importance) link.setAttribute('importance', resource.importance);
      if (resource.fetchpriority) link.setAttribute('fetchpriority', resource.fetchpriority);
      
      // Add error handling with retry logic
      link.onerror = () => {
        console.warn(`Failed to preload resource: ${resource.href}`);
        link.remove();
      };
      
      link.onload = () => {
        console.log(`Successfully preloaded: ${resource.href}`);
      };
      
      document.head.appendChild(link);
    }, delay);
  }, [getNetworkInfo]);

  const prefetchPage = useCallback((path: string, priority: 'high' | 'low' = 'low') => {
    // Check if already prefetched
    const existing = document.querySelector(`link[href="${path}"][rel="prefetch"]`);
    if (existing) return;

    const link = document.createElement('link');
    link.rel = 'prefetch';
    link.href = path;
    if (priority === 'high') {
      link.setAttribute('importance', 'high');
    }
    
    link.onerror = () => {
      console.warn(`Failed to prefetch page: ${path}`);
      link.remove();
    };
    
    document.head.appendChild(link);
  }, []);

  const prerenderPage = useCallback((path: string) => {
    // Only prerender on fast connections and desktop
    const networkInfo = getNetworkInfo();
    if (networkInfo.effectiveType === '2g' || networkInfo.saveData) return;
    if (window.innerWidth < 768) return; // Skip on mobile
    
    const existing = document.querySelector(`link[href="${path}"][rel="prerender"]`);
    if (existing) return;

    const link = document.createElement('link');
    link.rel = 'prerender';
    link.href = path;
    
    link.onerror = () => {
      console.warn(`Failed to prerender page: ${path}`);
      link.remove();
    };
    
    document.head.appendChild(link);
  }, [getNetworkInfo]);

  const preloadNextPageResources = useCallback(() => {
    const nextPages = intelligentPredictions[location.pathname] || [];
    
    nextPages.forEach((page, index) => {
      const resources = routeSpecificResources[page] || [];
      const delay = (index + 1) * 500; // Stagger preloading
      
      // Preload first resource immediately, others with delay
      resources.slice(0, 1).forEach(resource => {
        preloadResource(resource, delay);
      });
      
      // Prefetch the page itself
      if (index < 2) { // Only prefetch first 2 predicted pages
        setTimeout(() => prefetchPage(page), delay + 1000);
      }
      
      // Prerender the most likely next page on fast connections
      if (index === 0) {
        setTimeout(() => prerenderPage(page), delay + 2000);
      }
    });
  }, [location.pathname, preloadResource, prefetchPage, prerenderPage]);

  useEffect(() => {
    // 1. Preload critical resources immediately with high priority
    criticalResources.forEach(resource => {
      preloadResource(resource, 0);
    });
    
    // 2. Preload route-specific resources
    const currentRouteResources = routeSpecificResources[location.pathname] || [];
    currentRouteResources.forEach((resource, index) => {
      preloadResource(resource, index * 100);
    });
    
    // 3. Intelligent next-page preloading with delay
    const timer = setTimeout(preloadNextPageResources, 1500);
    
    return () => clearTimeout(timer);
  }, [location.pathname, preloadResource, preloadNextPageResources]);

  // Advanced hover preloading with intersection observer
  useEffect(() => {
    const observedLinks = new WeakSet();
    
    const handleLinkHover = (event: Event) => {
      const target = event.target as HTMLAnchorElement;
      if (target.tagName === 'A' && target.href && target.href.startsWith(window.location.origin)) {
        const path = new URL(target.href).pathname;
        const resources = routeSpecificResources[path] || [];
        
        // Preload first resource on hover
        resources.slice(0, 1).forEach(resource => {
          preloadResource(resource, 0);
        });
        
        // Prefetch the page
        prefetchPage(path, 'high');
      }
    };

    // Intersection Observer for viewport-based preloading
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const link = entry.target as HTMLAnchorElement;
          if (link.tagName === 'A' && !observedLinks.has(link)) {
            observedLinks.add(link);
            const path = new URL(link.href).pathname;
            setTimeout(() => prefetchPage(path), 500);
          }
        }
      });
    }, { 
      rootMargin: '50px',
      threshold: 0.1
    });

    // Observe all internal links
    const links = document.querySelectorAll('a[href^="/"], a[href^="https://marianamatheos.com.br"]');
    links.forEach(link => observer.observe(link));

    document.addEventListener('mouseenter', handleLinkHover, true);
    
    return () => {
      document.removeEventListener('mouseenter', handleLinkHover, true);
      observer.disconnect();
    };
  }, [preloadResource, prefetchPage]);

  return null;
};

export default AggressiveResourcePreloader;
