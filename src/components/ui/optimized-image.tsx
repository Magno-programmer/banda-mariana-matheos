import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';

interface OptimizedImageProps extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, 'srcSet'> {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  srcSet?: {
    avif?: string;
    webp?: string;
    png?: string;
    jpg?: string;
    jpeg?: string;
  };
}

export const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  className,
  priority = false,
  srcSet,
  ...props
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  
  // Use intersection observer for non-priority images
  const { elementRef, isIntersecting } = useIntersectionObserver({
    threshold: 0.1,
    rootMargin: '50px',
    enabled: !priority,
  });

  // Check if image is external (YouTube thumbnails, etc.)
  const isExternal = src.startsWith('http');
  const shouldLoad = priority || isIntersecting;

  // Generate blur placeholder
  const blurDataUrl = `data:image/svg+xml;base64,${btoa(`
    <svg width="100" height="100" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="hsl(var(--muted))"/>
    </svg>
  `)}`;

  const handleLoad = () => {
    setImageLoaded(true);
  };

  const handleError = () => {
    setImageError(true);
  };

  if (isExternal || !srcSet) {
    return (
      <div ref={elementRef as any} className={cn('relative overflow-hidden', className)}>
        {!shouldLoad && (
          <img
            src={blurDataUrl}
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
            aria-hidden="true"
          />
        )}
        {shouldLoad && (
          <img
            src={src}
            alt={alt}
            className={cn(
              'transition-opacity duration-300',
              imageLoaded ? 'opacity-100' : 'opacity-0',
              imageError && 'opacity-50'
            )}
            loading={priority ? 'eager' : 'lazy'}
            onLoad={handleLoad}
            onError={handleError}
            {...props}
          />
        )}
      </div>
    );
  }

  return (
    <div ref={elementRef as any} className={cn('relative overflow-hidden', className)}>
      {!shouldLoad && (
        <img
          src={blurDataUrl}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
          aria-hidden="true"
        />
      )}
      {shouldLoad && (
        <picture>
          {/* AVIF - Modern format with best compression */}
          {srcSet.avif && (
            <source 
              srcSet={srcSet.avif} 
              type="image/avif" 
            />
          )}
          
          {/* WebP - Widely supported modern format */}
          {srcSet.webp && (
            <source 
              srcSet={srcSet.webp} 
              type="image/webp" 
            />
          )}
          
          {/* Fallback to original format */}
          <img
            src={srcSet.png || srcSet.jpg || srcSet.jpeg || src}
            alt={alt}
            className={cn(
              'transition-opacity duration-300',
              imageLoaded ? 'opacity-100' : 'opacity-0',
              imageError && 'opacity-50'
            )}
            loading={priority ? 'eager' : 'lazy'}
            onLoad={handleLoad}
            onError={handleError}
            {...props}
          />
        </picture>
      )}
    </div>
  );
};