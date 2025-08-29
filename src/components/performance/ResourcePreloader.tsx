import { useEffect } from 'react';

interface PreloadResource {
  href: string;
  as: 'image' | 'style' | 'script' | 'font' | 'document';
  type?: string;
  crossOrigin?: 'anonymous' | 'use-credentials';
  importance?: 'high' | 'low' | 'auto';
}

interface ResourcePreloaderProps {
  preloadResources?: PreloadResource[];
  preconnectDomains?: string[];
  prefetchPages?: string[];
  heroImages?: string[];
}

const ResourcePreloader: React.FC<ResourcePreloaderProps> = ({
  preloadResources = [],
  preconnectDomains = [],
  prefetchPages = [],
  heroImages = [],
}) => {
  useEffect(() => {
    // Preconnect to external domains
    preconnectDomains.forEach((domain) => {
      if (!document.querySelector(`link[href="${domain}"]`)) {
        const link = document.createElement('link');
        link.rel = 'preconnect';
        link.href = domain;
        link.crossOrigin = 'anonymous';
        document.head.appendChild(link);
      }
    });

    // Preload critical resources
    preloadResources.forEach((resource) => {
      if (!document.querySelector(`link[href="${resource.href}"]`)) {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.href = resource.href;
        link.as = resource.as;
        if (resource.type) link.type = resource.type;
        if (resource.crossOrigin) link.crossOrigin = resource.crossOrigin;
        if (resource.importance) {
          link.setAttribute('importance', resource.importance);
        }
        document.head.appendChild(link);
      }
    });

    // Preload hero images with high priority
    heroImages.forEach((imageSrc) => {
      if (!document.querySelector(`link[href="${imageSrc}"]`)) {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.href = imageSrc;
        link.as = 'image';
        link.setAttribute('importance', 'high');
        document.head.appendChild(link);
      }
    });

    // Prefetch likely next pages
    const prefetchWithDelay = () => {
      prefetchPages.forEach((page, index) => {
        setTimeout(() => {
          if (!document.querySelector(`link[href="${page}"]`)) {
            const link = document.createElement('link');
            link.rel = 'prefetch';
            link.href = page;
            document.head.appendChild(link);
          }
        }, index * 100); // Stagger prefetch to avoid blocking
      });
    };

    // Prefetch after initial load
    if (document.readyState === 'complete') {
      prefetchWithDelay();
    } else {
      window.addEventListener('load', prefetchWithDelay);
      return () => window.removeEventListener('load', prefetchWithDelay);
    }
  }, [preloadResources, preconnectDomains, prefetchPages, heroImages]);

  return null;
};

export default ResourcePreloader;