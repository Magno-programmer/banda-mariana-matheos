import React from 'react';
import { cn } from '@/lib/utils';

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
  // Check if image is external (YouTube thumbnails, etc.)
  const isExternal = src.startsWith('http');
  
  if (isExternal || !srcSet) {
    return (
      <img
        src={src}
        alt={alt}
        className={cn(className)}
        loading={priority ? 'eager' : 'lazy'}
        {...props}
      />
    );
  }

  return (
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
        className={cn(className)}
        loading={priority ? 'eager' : 'lazy'}
        {...props}
      />
    </picture>
  );
};