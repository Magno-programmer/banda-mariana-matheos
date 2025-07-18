/**
 * Advanced Language Detection Utilities
 * Enhanced browser language detection with fallback strategies
 */

export interface LanguagePreference {
  primary: string;
  secondary: string[];
  region: string | null;
  quality: number;
}

export interface DetectionResult {
  detectedLanguage: string;
  confidence: number;
  method: 'browser' | 'cached' | 'geolocation' | 'fallback';
  alternatives: string[];
}

// Enhanced language mapping with quality scores
const LANGUAGE_QUALITY_MAP: Record<string, { quality: number; alternatives: string[] }> = {
  // Portuguese
  'pt-BR': { quality: 1.0, alternatives: ['pt', 'pt-PT'] },
  'pt-PT': { quality: 1.0, alternatives: ['pt', 'pt-BR'] },
  'pt': { quality: 0.9, alternatives: ['pt-BR', 'pt-PT'] },
  
  // English variants with quality
  'en-US': { quality: 1.0, alternatives: ['en', 'en-GB'] },
  'en-GB': { quality: 1.0, alternatives: ['en', 'en-US'] },
  'en-AU': { quality: 0.9, alternatives: ['en', 'en-GB'] },
  'en-CA': { quality: 0.9, alternatives: ['en', 'en-US'] },
  'en-IN': { quality: 0.8, alternatives: ['en', 'en-GB'] },
  'en': { quality: 0.8, alternatives: ['en-US', 'en-GB'] },
  
  // Spanish variants
  'es-ES': { quality: 1.0, alternatives: ['es', 'ca-ES'] },
  'es-MX': { quality: 1.0, alternatives: ['es', 'es-US'] },
  'es-AR': { quality: 0.9, alternatives: ['es', 'es-ES'] },
  'ca-ES': { quality: 0.8, alternatives: ['es-ES', 'es'] },
  'es': { quality: 0.8, alternatives: ['es-ES', 'es-MX'] },
  
  // French variants
  'fr-FR': { quality: 1.0, alternatives: ['fr'] },
  'fr-CA': { quality: 0.9, alternatives: ['fr', 'fr-FR'] },
  'fr': { quality: 0.8, alternatives: ['fr-FR', 'fr-CA'] },
  
  // Other major languages
  'de-DE': { quality: 1.0, alternatives: ['de'] },
  'it-IT': { quality: 1.0, alternatives: ['it'] },
  'ja-JP': { quality: 1.0, alternatives: ['ja'] },
  'ko-KR': { quality: 1.0, alternatives: ['ko'] },
  'zh-CN': { quality: 1.0, alternatives: ['zh'] },
};

/**
 * Parse Accept-Language header format
 */
export const parseAcceptLanguage = (acceptLang: string): LanguagePreference[] => {
  return acceptLang
    .split(',')
    .map(lang => {
      const [code, q = '1'] = lang.trim().split(';q=');
      const [primary, region] = code.split('-');
      
      return {
        primary: code.toLowerCase(),
        secondary: [primary.toLowerCase()],
        region: region?.toUpperCase() || null,
        quality: parseFloat(q) || 1.0,
      };
    })
    .sort((a, b) => b.quality - a.quality);
};

/**
 * Get browser languages with enhanced detection
 */
export const getBrowserLanguages = (): LanguagePreference[] => {
  const languages: string[] = [];
  
  // Get all browser language preferences
  if (navigator.languages) {
    languages.push(...navigator.languages);
  } else if (navigator.language) {
    languages.push(navigator.language);
  }
  
  // Add system language if available
  if ('userLanguage' in navigator) {
    languages.push((navigator as any).userLanguage);
  }
  
  // Convert to preference objects
  return languages.map((lang, index) => {
    const [primary, region] = lang.toLowerCase().split('-');
    return {
      primary: lang.toLowerCase(),
      secondary: [primary],
      region: region?.toUpperCase() || null,
      quality: 1.0 - (index * 0.1), // Decrease quality for later preferences
    };
  });
};

/**
 * Advanced language detection with multiple strategies
 */
export const detectLanguage = (
  geoCountry?: string | null,
  cachedPreference?: string | null
): DetectionResult => {
  
  // 1. Check cached preference (highest priority)
  if (cachedPreference && isValidLanguageCode(cachedPreference)) {
    return {
      detectedLanguage: cachedPreference,
      confidence: 1.0,
      method: 'cached',
      alternatives: LANGUAGE_QUALITY_MAP[cachedPreference]?.alternatives || [],
    };
  }
  
  // 2. Browser language detection
  const browserLanguages = getBrowserLanguages();
  
  for (const langPref of browserLanguages) {
    const exactMatch = findExactLanguageMatch(langPref.primary);
    if (exactMatch) {
      return {
        detectedLanguage: exactMatch,
        confidence: langPref.quality * 0.9,
        method: 'browser',
        alternatives: LANGUAGE_QUALITY_MAP[exactMatch]?.alternatives || [],
      };
    }
    
    // Try regional fallback
    const regionalMatch = findRegionalLanguageMatch(langPref.primary, geoCountry);
    if (regionalMatch) {
      return {
        detectedLanguage: regionalMatch,
        confidence: langPref.quality * 0.7,
        method: 'browser',
        alternatives: LANGUAGE_QUALITY_MAP[regionalMatch]?.alternatives || [],
      };
    }
  }
  
  // 3. Geolocation-based detection
  if (geoCountry) {
    const geoLanguage = getLanguageFromCountry(geoCountry);
    if (geoLanguage) {
      return {
        detectedLanguage: geoLanguage,
        confidence: 0.6,
        method: 'geolocation',
        alternatives: LANGUAGE_QUALITY_MAP[geoLanguage]?.alternatives || [],
      };
    }
  }
  
  // 4. Fallback to default
  return {
    detectedLanguage: 'pt-BR',
    confidence: 0.3,
    method: 'fallback',
    alternatives: ['pt', 'en-US'],
  };
};

/**
 * Validate language code
 */
export const isValidLanguageCode = (code: string): boolean => {
  return code in LANGUAGE_QUALITY_MAP;
};

/**
 * Find exact language match
 */
export const findExactLanguageMatch = (code: string): string | null => {
  const normalized = code.toLowerCase();
  return isValidLanguageCode(normalized) ? normalized : null;
};

/**
 * Find regional language match
 */
export const findRegionalLanguageMatch = (
  code: string, 
  country?: string | null
): string | null => {
  const [lang] = code.toLowerCase().split('-');
  
  // Try country-specific variants
  if (country) {
    const countryVariant = `${lang}-${country.toUpperCase()}`;
    if (isValidLanguageCode(countryVariant)) {
      return countryVariant;
    }
  }
  
  // Try generic language code
  return isValidLanguageCode(lang) ? lang : null;
};

/**
 * Get language from country code
 */
export const getLanguageFromCountry = (country: string): string | null => {
  const countryLanguageMap: Record<string, string> = {
    'BR': 'pt-BR',
    'PT': 'pt-PT',
    'US': 'en-US',
    'GB': 'en-GB',
    'AU': 'en-AU',
    'CA': 'en-CA',
    'ES': 'es-ES',
    'MX': 'es-MX',
    'AR': 'es-AR',
    'FR': 'fr-FR',
    'DE': 'de-DE',
    'IT': 'it-IT',
    'JP': 'ja-JP',
    'KR': 'ko-KR',
    'CN': 'zh-CN',
    'TW': 'zh-TW',
    'SE': 'sv-SE',
    'DK': 'da-DK',
    'NO': 'nb-NO',
    'FI': 'fi-FI',
    'NL': 'nl-NL',
    'PL': 'pl-PL',
    'CZ': 'cs-CZ',
    'RU': 'ru-RU',
    'TR': 'tr-TR',
  };
  
  return countryLanguageMap[country.toUpperCase()] || null;
};

/**
 * Cache language preference
 */
export const cacheLanguagePreference = (language: string): void => {
  try {
    localStorage.setItem('preferredLanguage', language);
    localStorage.setItem('languageDetectionTimestamp', Date.now().toString());
  } catch {
    // Silent fail for localStorage issues
  }
};

/**
 * Get cached language preference
 */
export const getCachedLanguagePreference = (): string | null => {
  try {
    const cached = localStorage.getItem('preferredLanguage');
    const timestamp = localStorage.getItem('languageDetectionTimestamp');
    
    // Cache expires after 30 days
    if (cached && timestamp) {
      const age = Date.now() - parseInt(timestamp);
      const thirtyDays = 30 * 24 * 60 * 60 * 1000;
      
      if (age < thirtyDays) {
        return cached;
      }
    }
    
    return null;
  } catch {
    return null;
  }
};

/**
 * Clear cached language preference
 */
export const clearLanguageCache = (): void => {
  try {
    localStorage.removeItem('preferredLanguage');
    localStorage.removeItem('languageDetectionTimestamp');
  } catch {
    // Silent fail
  }
};
