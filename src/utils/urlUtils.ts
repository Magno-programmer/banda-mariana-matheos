/**
 * URL Utilities for standardization and validation
 * Ensures consistent URL patterns across the application
 */

export const removeTrailingSlash = (url: string): string => {
  if (url === '/') return url;
  return url.endsWith('/') ? url.slice(0, -1) : url;
};

export const addTrailingSlash = (url: string): string => {
  if (url === '/' || url.endsWith('/')) return url;
  return `${url}/`;
};

export const normalizeUrl = (url: string): string => {
  // Remove trailing slash (our standard)
  let normalized = removeTrailingSlash(url);
  
  // Ensure it starts with /
  if (!normalized.startsWith('/')) {
    normalized = `/${normalized}`;
  }
  
  // Remove double slashes
  normalized = normalized.replace(/\/+/g, '/');
  
  return normalized;
};

export const buildCanonicalUrl = (path: string, baseUrl: string = 'https://marianamatheos.com.br'): string => {
  const normalizedPath = normalizeUrl(path);
  return `${baseUrl}${normalizedPath}`;
};

export const validateUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

export const sanitizeUrlForSEO = (url: string): string => {
  return url
    .toLowerCase()
    .replace(/[^a-z0-9\-\/]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
};

// Route validation against sitemap
export const routeExists = (path: string): boolean => {
  const validRoutes = [
    '/',
    '/sobre',
    '/fotos', 
    '/videos',
    '/repertorio',
    '/agenda',
    '/contato',
    '/faq',
    '/depoimentos',
    '/blog'
  ];
  
  // Check for blog articles
  if (path.startsWith('/blog/') && path.length > 6) {
    return true;
  }
  
  return validRoutes.includes(normalizeUrl(path));
};

export const getCanonicalMapping = (): Record<string, string> => {
  return {
    '/': 'https://marianamatheos.com.br/',
    '/sobre': 'https://marianamatheos.com.br/sobre',
    '/fotos': 'https://marianamatheos.com.br/fotos',
    '/videos': 'https://marianamatheos.com.br/videos',
    '/repertorio': 'https://marianamatheos.com.br/repertorio',
    '/agenda': 'https://marianamatheos.com.br/agenda',
    '/contato': 'https://marianamatheos.com.br/contato',
    '/faq': 'https://marianamatheos.com.br/faq',
    '/depoimentos': 'https://marianamatheos.com.br/depoimentos',
    '/blog': 'https://marianamatheos.com.br/blog'
  };
};

export const isExternalUrl = (url: string): boolean => {
  return url.startsWith('http://') || url.startsWith('https://');
};