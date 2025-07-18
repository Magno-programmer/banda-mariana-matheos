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

// Enhanced route validation with international support
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

// International route validation
export const validateInternationalRoute = (path: string, locale: string): boolean => {
  // Always validate pt-BR routes
  if (locale === 'pt-BR' || locale === 'pt') {
    return routeExists(path);
  }
  
  // For international markets, check if content would exist
  // In a real implementation, this would check against a CMS or translation database
  const hasInternationalContent = routeExists(path);
  
  return hasInternationalContent;
};

// Get regional fallback for unsupported markets
export const getRegionalFallback = (locale: string): string => {
  // Language family fallbacks
  if (locale.startsWith('en')) return 'en-US';
  if (locale.startsWith('es')) return 'es-ES';
  if (locale.startsWith('fr')) return 'fr-FR';
  if (locale.startsWith('de')) return 'de-DE';
  if (locale.startsWith('it')) return 'it-IT';
  if (locale.startsWith('pt')) return 'pt-BR';
  if (locale.startsWith('ja')) return 'ja-JP';
  if (locale.startsWith('ko')) return 'ko-KR';
  if (locale.startsWith('zh')) return 'zh-CN';
  if (locale.startsWith('ru')) return 'ru-RU';
  if (locale.startsWith('ar')) return 'ar-SA';
  
  // Default fallback
  return 'pt-BR';
};

// Check if locale is supported
export const isLocaleSupported = (locale: string): boolean => {
  const supportedLocales = [
    'pt-BR', 'pt', 'pt-PT',
    'en-US', 'en', 'en-GB', 'en-AU', 'en-CA', 'en-IE', 'en-NZ', 'en-ZA', 'en-IN', 'en-SG', 'en-MY',
    'es-ES', 'es', 'es-AR', 'es-MX', 'es-CO', 'es-CL', 'es-PE', 'es-UY', 'es-VE',
    'ca-ES', 'eu-ES', 'gl-ES',
    'fr-FR', 'fr', 'fr-CA', 'fr-BE', 'fr-CH',
    'it-IT', 'it', 'it-CH',
    'de-DE', 'de', 'de-AT', 'de-CH',
    'sv-SE', 'da-DK', 'nb-NO', 'fi-FI',
    'nl-NL', 'nl-BE',
    'ja-JP', 'ja', 'ko-KR', 'zh-CN', 'zh-TW', 'th-TH',
    'pl-PL', 'cs-CZ', 'ru-RU', 'uk-UA', 'bg-BG', 'ro-RO',
    'hr-HR', 'sl-SI', 'sk-SK', 'hu-HU', 'et-EE', 'lv-LV', 'lt-LT',
    'el-GR', 'mt-MT', 'el-CY',
    'tr-TR', 'ar-SA', 'he-IL', 'hi-IN',
    'x-default'
  ];
  
  return supportedLocales.includes(locale);
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