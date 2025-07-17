import React from 'react';
import { cn } from '@/lib/utils';

interface OptimizedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  fallbackFormat?: 'jpg' | 'jpeg' | 'png';
  className?: string;
  priority?: boolean;
}

export const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  fallbackFormat = 'jpg',
  className,
  priority = false,
  ...props
}) => {
  // Extract file extension and create WebP/AVIF versions
  const getOptimizedSrc = (format: string) => {
    const basePath = src.replace(/\.(jpg|jpeg|png)$/i, '');
    return `${basePath}.${format}`;
  };

  // Check if image is external (YouTube thumbnails, etc.)
  const isExternal = src.startsWith('http');
  
  if (isExternal) {
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
      <source 
        srcSet={getOptimizedSrc('avif')} 
        type="image/avif" 
      />
      
      {/* WebP - Widely supported modern format */}
      <source 
        srcSet={getOptimizedSrc('webp')} 
        type="image/webp" 
      />
      
      {/* Fallback to original format */}
      <img
        src={src}
        alt={alt}
        className={cn(className)}
        loading={priority ? 'eager' : 'lazy'}
        {...props}
      />
    </picture>
  );
};