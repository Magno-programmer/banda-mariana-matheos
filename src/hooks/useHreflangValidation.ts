import { useEffect, useState } from 'react';
import { validateInternationalRoute } from '@/utils/urlUtils';

interface HreflangValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
  suggestions: string[];
}

export const useHreflangValidation = (baseUrl: string = 'https://marianamatheos.com.br') => {
  const [validationResult, setValidationResult] = useState<HreflangValidationResult>({
    isValid: true,
    errors: [],
    warnings: [],
    suggestions: []
  });
  const [isValidating, setIsValidating] = useState(false);

  const validateHreflangImplementation = async () => {
    setIsValidating(true);
    const errors: string[] = [];
    const warnings: string[] = [];
    const suggestions: string[] = [];

    try {
      // Check if current page has proper hreflang tags
      const hreflangLinks = document.querySelectorAll('link[rel="alternate"][hreflang]');
      
      if (hreflangLinks.length === 0) {
        errors.push('No hreflang tags found on current page');
      }

      // Validate x-default exists
      const xDefaultExists = Array.from(hreflangLinks).some(
        link => link.getAttribute('hreflang') === 'x-default'
      );
      
      if (!xDefaultExists) {
        warnings.push('x-default hreflang tag is missing');
      }

      // Check for self-referencing canonical
      const canonicalLink = document.querySelector('link[rel="canonical"]');
      const currentUrl = window.location.href;
      
      if (canonicalLink && canonicalLink.getAttribute('href') !== currentUrl) {
        warnings.push('Canonical URL does not match current page');
      }

      // Validate URL structure
      const currentPath = window.location.pathname;
      const isValidRoute = validateInternationalRoute(currentPath, 'pt-BR');
      
      if (!isValidRoute) {
        suggestions.push('Consider implementing localized URL structure');
      }

      // Check for proper language detection
      const browserLang = navigator.language;
      const hasMatchingHreflang = Array.from(hreflangLinks).some(
        link => link.getAttribute('hreflang')?.startsWith(browserLang.substring(0, 2))
      );
      
      if (!hasMatchingHreflang) {
        suggestions.push(`Add hreflang support for detected browser language: ${browserLang}`);
      }

      // Performance checks
      const loadTime = performance.now();
      if (loadTime > 3000) {
        warnings.push('Page load time may affect international SEO performance');
      }

      setValidationResult({
        isValid: errors.length === 0,
        errors,
        warnings,
        suggestions
      });

    } catch (error) {
      console.error('Hreflang validation error:', error);
      setValidationResult({
        isValid: false,
        errors: ['Validation failed due to technical error'],
        warnings: [],
        suggestions: []
      });
    } finally {
      setIsValidating(false);
    }
  };

  useEffect(() => {
    // Auto-validate on mount and route changes
    const timeoutId = setTimeout(validateHreflangImplementation, 1000);
    return () => clearTimeout(timeoutId);
  }, [window.location.pathname]);

  return {
    validationResult,
    isValidating,
    validateHreflangImplementation
  };
};

export default useHreflangValidation;