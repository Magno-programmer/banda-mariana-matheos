import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { detectLanguage, cacheLanguagePreference, getCachedLanguagePreference } from '@/utils/languageDetection';
import { useGeolocation } from '@/hooks/useGeolocation';
import { isLocaleSupported, getRegionalFallback } from '@/utils/urlUtils';

interface InternationalRouterProps {
  children: React.ReactNode;
}

export interface InternationalContext {
  currentLanguage: string;
  setLanguage: (lang: string) => void;
  supportedLanguages: string[];
  isLoading: boolean;
}

export const InternationalContext = React.createContext<InternationalContext>({
  currentLanguage: 'pt-BR',
  setLanguage: () => {},
  supportedLanguages: [],
  isLoading: true
});

const SUPPORTED_LANGUAGES = [
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

export const InternationalRouter: React.FC<InternationalRouterProps> = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState<string>('pt-BR');
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const geolocation = useGeolocation();

  // Extract language from URL path
  const extractLanguageFromPath = (pathname: string): { language: string; cleanPath: string } => {
    const segments = pathname.split('/').filter(Boolean);
    
    if (segments.length === 0) {
      return { language: 'pt-BR', cleanPath: '/' };
    }

    const firstSegment = segments[0];
    
    // Check if first segment is a language code
    if (isLocaleSupported(firstSegment)) {
      const cleanPath = '/' + segments.slice(1).join('/');
      return { language: firstSegment, cleanPath: cleanPath === '/' ? '/' : cleanPath };
    }

    return { language: 'pt-BR', cleanPath: pathname };
  };

  // Build internationalized URL
  const buildInternationalUrl = (language: string, path: string): string => {
    if (language === 'pt-BR') {
      return path === '/' ? '/' : path;
    }
    
    const cleanPath = path === '/' ? '' : path;
    return `/${language}${cleanPath}`;
  };

  // Handle language change
  const handleSetLanguage = (newLanguage: string) => {
    if (!isLocaleSupported(newLanguage)) {
      newLanguage = getRegionalFallback(newLanguage);
    }

    const { cleanPath } = extractLanguageFromPath(location.pathname);
    const newUrl = buildInternationalUrl(newLanguage, cleanPath);
    
    setCurrentLanguage(newLanguage);
    cacheLanguagePreference(newLanguage);
    
    if (newUrl !== location.pathname) {
      navigate(newUrl, { replace: true });
    }
  };

  // Initial language detection and setup
  useEffect(() => {
    const { language: urlLanguage, cleanPath } = extractLanguageFromPath(location.pathname);
    
    // If URL already has a supported language, use it
    if (isLocaleSupported(urlLanguage)) {
      setCurrentLanguage(urlLanguage);
      cacheLanguagePreference(urlLanguage);
      setIsLoading(false);
      return;
    }

    // Otherwise, detect best language
    const cachedLanguage = getCachedLanguagePreference();
    const detectionResult = detectLanguage(geolocation.country, cachedLanguage);
    
    let detectedLanguage = detectionResult.detectedLanguage;
    
    // Ensure detected language is supported
    if (!isLocaleSupported(detectedLanguage)) {
      detectedLanguage = getRegionalFallback(detectedLanguage);
    }

    setCurrentLanguage(detectedLanguage);
    cacheLanguagePreference(detectedLanguage);

    // Redirect to correct URL if needed
    if (detectedLanguage !== 'pt-BR') {
      const newUrl = buildInternationalUrl(detectedLanguage, cleanPath);
      if (newUrl !== location.pathname) {
        navigate(newUrl, { replace: true });
      }
    }

    setIsLoading(false);
  }, [location.pathname, geolocation.country, navigate]);

  // Update document language
  useEffect(() => {
    if (currentLanguage) {
      document.documentElement.lang = currentLanguage;
      
      // Update meta tag if exists
      const metaLang = document.querySelector('meta[name="language"]');
      if (metaLang) {
        metaLang.setAttribute('content', currentLanguage);
      }
    }
  }, [currentLanguage]);

  const contextValue: InternationalContext = {
    currentLanguage,
    setLanguage: handleSetLanguage,
    supportedLanguages: SUPPORTED_LANGUAGES,
    isLoading
  };

  return (
    <InternationalContext.Provider value={contextValue}>
      {children}
    </InternationalContext.Provider>
  );
};

export const useInternational = () => {
  const context = React.useContext(InternationalContext);
  if (!context) {
    throw new Error('useInternational must be used within InternationalRouter');
  }
  return context;
};

export default InternationalRouter;
