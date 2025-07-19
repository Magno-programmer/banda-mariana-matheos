
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface PreloadResource {
  href: string;
  as: string;
  type?: string;
  crossorigin?: string;
  importance?: 'high' | 'low';
}

const criticalResources: PreloadResource[] = [
  // Critical fonts
  { href: '/GatsbyFLF-Bold.ttf', as: 'font', type: 'font/ttf', crossorigin: 'anonymous', importance: 'high' },
  { href: '/GatsbyFLF.ttf', as: 'font', type: 'font/ttf', crossorigin: 'anonymous', importance: 'high' },
  { href: '/glimmer-of-light.otf', as: 'font', type: 'font/otf', crossorigin: 'anonymous', importance: 'high' },
  
  // Critical images
  { href: '/images/banda.avif', as: 'image', type: 'image/avif', importance: 'high' },
  { href: '/images/logo-principal.avif', as: 'image', type: 'image/avif', importance: 'high' },
  
  // Critical favicons
  { href: '/favicon/favicon-192x192.png', as: 'image', type: 'image/png', importance: 'high' },
  { href: '/favicon/favicon-512x512.png', as: 'image', type: 'image/png', importance: 'high' }
];

const routeSpecificResources: Record<string, PreloadResource[]> = {
  '/sobre': [
    { href: '/images/cantora.avif', as: 'image', type: 'image/avif' },
    { href: '/images/historia-jazz-brasil.avif', as: 'image', type: 'image/avif' }
  ],
  '/repertorio': [
    { href: '/images/jazz-standard.avif', as: 'image', type: 'image/avif' },
    { href: '/images/billie-holiday.avif', as: 'image', type: 'image/avif' }
  ],
  '/fotos': [
    { href: '/images/banda-de-jazz-1920.avif', as: 'image', type: 'image/avif' },
    { href: '/images/casamento-jazz-band.avif', as: 'image', type: 'image/avif' }
  ],
  '/videos': [
    { href: '/images/banda-blue-jazz-concurso.avif', as: 'image', type: 'image/avif' }
  ]
};

const AggressiveResourcePreloader: React.FC = () => {
  const location = useLocation();

  const preloadResource = (resource: PreloadResource) => {
    // Check if already preloaded
    const existing = document.querySelector(`link[href="${resource.href}"][rel="preload"]`);
    if (existing) return;

    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = resource.href;
    link.as = resource.as;
    
    if (resource.type) link.type = resource.type;
    if (resource.crossorigin) link.crossOrigin = resource.crossorigin;
    if (resource.importance) link.setAttribute('importance', resource.importance);
    
    // Add error handling
    link.onerror = () => {
      console.warn(`Failed to preload resource: ${resource.href}`);
    };
    
    document.head.appendChild(link);
  };

  const preloadNextPageResources = () => {
    // Predict and preload likely next pages based on current route
    const predictions: Record<string, string[]> = {
      '/': ['/sobre', '/repertorio', '/agenda'],
      '/sobre': ['/repertorio', '/fotos', '/agenda'],
      '/repertorio': ['/agenda', '/videos', '/fotos'],
      '/fotos': ['/videos', '/repertorio', '/agenda'],
      '/videos': ['/fotos', '/agenda', '/repertorio'],
      '/agenda': ['/contato', '/repertorio', '/sobre'],
      '/contato': ['/agenda', '/faq', '/depoimentos']
    };

    const nextPages = predictions[location.pathname] || [];
    nextPages.forEach(page => {
      const resources = routeSpecificResources[page] || [];
      resources.slice(0, 2).forEach(resource => { // Limit to 2 resources per predicted page
        setTimeout(() => preloadResource(resource), 1000); // Delay to not block critical resources
      });
    });
  };

  useEffect(() => {
    // Preload critical resources immediately
    criticalResources.forEach(preloadResource);
    
    // Preload route-specific resources
    const currentRouteResources = routeSpecificResources[location.pathname] || [];
    currentRouteResources.forEach(preloadResource);
    
    // Preload predicted next page resources
    const timer = setTimeout(preloadNextPageResources, 2000);
    
    return () => clearTimeout(timer);
  }, [location.pathname]);

  // Preload on hover for internal links
  useEffect(() => {
    const handleLinkHover = (event: Event) => {
      const target = event.target as HTMLAnchorElement;
      if (target.tagName === 'A' && target.href && target.href.startsWith(window.location.origin)) {
        const path = new URL(target.href).pathname;
        const resources = routeSpecificResources[path] || [];
        resources.slice(0, 1).forEach(preloadResource); // Preload 1 resource on hover
      }
    };

    document.addEventListener('mouseenter', handleLinkHover, true);
    return () => document.removeEventListener('mouseenter', handleLinkHover, true);
  }, []);

  return null;
};

export default AggressiveResourcePreloader;
