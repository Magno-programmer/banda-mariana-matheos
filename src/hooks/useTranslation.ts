import { useState, useCallback, useRef } from 'react';
import { useTranslation as useI18nextTranslation } from 'react-i18next';
import i18n from '@/i18n';

interface TranslationCache {
  [key: string]: string;
}

interface UseTranslationOptions {
  targetLanguage?: string;
  cacheSize?: number;
}

interface UseTranslationReturn {
  translateText: (text: string, targetLang?: string) => Promise<string>;
  optimizeForSpeech: (text: string, targetLang?: string) => Promise<string>;
  detectLanguage: (text: string) => string;
  translationCache: TranslationCache;
  clearCache: () => void;
  getPageLanguage: () => string;
  getUserLanguage: () => string;
  needsTranslation: (pageLanguage: string, userLanguage: string) => boolean;
  getCurrentLanguage: () => string;
}

export const useTranslation = (options: UseTranslationOptions = {}): UseTranslationReturn => {
  // ⚠️ i18n integration: Using i18n.language as source of truth for current language
  const { i18n: i18nextInstance } = useI18nextTranslation();
  const currentLanguage = i18nextInstance.language || 'pt-BR';
  
  const {
    targetLanguage = currentLanguage, // ⚠️ i18n integration: Default to current i18n language
    cacheSize = 50
  } = options;

  const [translationCache, setTranslationCache] = useState<TranslationCache>({});
  const cacheKeysRef = useRef<string[]>([]);

  // Detectar idioma da página
  const getPageLanguage = useCallback((): string => {
    // Prioridade: meta tag lang, html lang, document.documentElement.lang
    const htmlLang = document.documentElement.lang ||
                    document.getElementsByTagName('html')[0]?.getAttribute('lang') ||
                    document.querySelector('meta[name="language"]')?.getAttribute('content');
    
    if (htmlLang) {
      return htmlLang.toLowerCase();
    }

    // Detectar pelo conteúdo (heurística simples)
    const content = document.body.textContent || '';
    const sample = content.substring(0, 500).toLowerCase();
    
    // Palavras comuns em diferentes idiomas
    const languagePatterns = {
      'pt-BR': ['o', 'a', 'e', 'de', 'que', 'em', 'um', 'para', 'com', 'não', 'uma', 'os', 'no', 'se', 'na', 'por', 'mais', 'as', 'dos', 'como'],
      'en': ['the', 'be', 'to', 'of', 'and', 'a', 'in', 'that', 'have', 'i', 'it', 'for', 'not', 'on', 'with', 'he', 'as', 'you', 'do', 'at'],
      'es': ['el', 'la', 'de', 'que', 'y', 'en', 'un', 'es', 'se', 'no', 'te', 'lo', 'le', 'da', 'su', 'por', 'son', 'con', 'para', 'al'],
      'fr': ['le', 'de', 'et', 'un', 'à', 'être', 'et', 'en', 'avoir', 'que', 'pour', 'dans', 'ce', 'il', 'une', 'sur', 'avec', 'ne', 'se', 'pas']
    };

    let bestMatch = 'pt-BR';
    let bestScore = 0;

    Object.entries(languagePatterns).forEach(([lang, words]) => {
      const score = words.reduce((acc, word) => {
        const regex = new RegExp(`\\b${word}\\b`, 'gi');
        const matches = sample.match(regex);
        return acc + (matches ? matches.length : 0);
      }, 0);

      if (score > bestScore) {
        bestScore = score;
        bestMatch = lang;
      }
    });

    return bestMatch;
  }, []);

  // ⚠️ i18n integration: Get user language from i18n instead of navigator
  const getUserLanguage = useCallback((): string => {
    return currentLanguage;
  }, [currentLanguage]);
  
  // ⚠️ i18n integration: Get current language from i18n
  const getCurrentLanguage = useCallback((): string => {
    return currentLanguage;
  }, [currentLanguage]);

  // Verificar se precisa traduzir
  const needsTranslation = useCallback((pageLanguage: string, userLanguage: string): boolean => {
    const normalizeLanguage = (lang: string) => {
      return lang.toLowerCase().split('-')[0];
    };

    const pageLang = normalizeLanguage(pageLanguage);
    const userLang = normalizeLanguage(userLanguage);

    return pageLang !== userLang && pageLang !== 'pt';
  }, []);

  // Detectar idioma do texto (heurística)
  const detectLanguage = useCallback((text: string): string => {
    const sample = text.substring(0, 300).toLowerCase();
    
    const languagePatterns = {
      'pt': ['o', 'a', 'e', 'de', 'que', 'em', 'um', 'para', 'com', 'não'],
      'en': ['the', 'be', 'to', 'of', 'and', 'a', 'in', 'that', 'have'],
      'es': ['el', 'la', 'de', 'que', 'y', 'en', 'un', 'es', 'se'],
      'fr': ['le', 'de', 'et', 'un', 'à', 'être', 'et', 'en', 'avoir']
    };

    let bestMatch = 'pt';
    let bestScore = 0;

    Object.entries(languagePatterns).forEach(([lang, words]) => {
      const score = words.reduce((acc, word) => {
        const regex = new RegExp(`\\b${word}\\b`, 'gi');
        const matches = sample.match(regex);
        return acc + (matches ? matches.length : 0);
      }, 0);

      if (score > bestScore) {
        bestScore = score;
        bestMatch = lang;
      }
    });

    return bestMatch;
  }, []);

  // Normalizar códigos de idioma para compatibilidade
  const normalizeLanguageCode = useCallback((lang: string): string => {
    const langMap: Record<string, string> = {
      'pt-BR': 'pt',
      'en-US': 'en',
      'en-GB': 'en',
      'es-ES': 'es',
      'es-US': 'es',
      'fr-FR': 'fr'
    };
    return langMap[lang] || lang.split('-')[0];
  }, []);

  // ⚠️ i18n integration: Use only i18next for translation (no external APIs)
  const translateWithI18n = useCallback((text: string, targetLang: string): string => {
    // Since we're using i18n only for interface translations, 
    // we'll return the original text and let the speech synthesis handle the language
    return text;
  }, []);

  // ⚠️ i18n integration: Simplified translation using only i18next (no external APIs)
  const translateText = useCallback(async (text: string, targetLang?: string): Promise<string> => {
    const target = targetLang || currentLanguage; // ⚠️ i18n integration: Use current i18n language
    const cacheKey = `${text.substring(0, 100)}_${target}_${currentLanguage}`; // ⚠️ i18n integration: Include current language in cache key

    // Verificar cache primeiro
    if (translationCache[cacheKey]) {
      return translationCache[cacheKey];
    }

    // Texto muito curto ou vazio
    if (!text || text.trim().length < 3) {
      return text;
    }

    // ⚠️ i18n integration: Since we're using only i18n, we return the original text
    // The speech synthesis will handle the language pronunciation
    const processedText = text;

    // Adicionar ao cache
    const newCache = { ...translationCache };
    newCache[cacheKey] = processedText;
    
    // Gerenciar tamanho do cache
    cacheKeysRef.current.push(cacheKey);
    if (cacheKeysRef.current.length > cacheSize) {
      const oldestKey = cacheKeysRef.current.shift();
      if (oldestKey) {
        delete newCache[oldestKey];
      }
    }
    
    setTranslationCache(newCache);
    
    return processedText;
  }, [currentLanguage, translationCache, cacheSize]); // ⚠️ i18n integration: Simplified dependencies
  
  // ⚠️ i18n integration: Optimize text for speech synthesis with i18n language support
  const optimizeForSpeech = useCallback(async (text: string, targetLang?: string): Promise<string> => {
    const target = targetLang || currentLanguage; // ⚠️ i18n integration: Use current i18n language
    
    // First translate if needed
    const translatedText = await translateText(text, target);
    
    // Optimize for speech synthesis
    const optimizedText = translatedText
      .replace(/\s+/g, ' ') // Normalize whitespace
      .replace(/\n+/g, '. ') // Convert newlines to periods
      .replace(/\[.*?\]/g, '') // Remove content in brackets
      .replace(/\(.*?\)/g, '') // Remove content in parentheses
      .replace(/\{.*?\}/g, '') // Remove content in braces
      .replace(/https?:\/\/[^\s]+/g, '') // Remove URLs
      .replace(/www\.[^\s]+/g, '') // Remove www URLs
      .replace(/\b[A-Z]{2,}\b/g, (match) => match.toLowerCase()) // Convert acronyms to lowercase
      .replace(/(\w)\.(\w)/g, '$1 ponto $2') // Convert dots between words to "ponto"
      .replace(/\s{2,}/g, ' ') // Remove extra spaces
      .trim();
    
    return optimizedText;
  }, [currentLanguage, translateText]); // ⚠️ i18n integration: Updated dependencies

  const clearCache = useCallback(() => {
    setTranslationCache({});
    cacheKeysRef.current = [];
  }, []);

  return {
    translateText,
    optimizeForSpeech, // ⚠️ i18n integration: New function for speech optimization
    detectLanguage,
    translationCache,
    clearCache,
    getPageLanguage,
    getUserLanguage,
    needsTranslation,
    getCurrentLanguage // ⚠️ i18n integration: New function to get current i18n language
  };
};