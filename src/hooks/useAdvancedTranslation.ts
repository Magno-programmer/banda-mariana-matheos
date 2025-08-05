import { useState, useCallback, useRef, useEffect } from 'react';
import { useInternational } from '@/components/international/InternationalRouter';

interface TranslationCache {
  [key: string]: string;
}

interface TranslationAPI {
  name: string;
  translate: (text: string, source: string, target: string) => Promise<string>;
  isAvailable: boolean;
  priority: number;
}

interface UseAdvancedTranslationOptions {
  cacheSize?: number;
  enableAutoTranslation?: boolean;
  fallbackLanguage?: string;
}

interface UseAdvancedTranslationReturn {
  translateText: (text: string, targetLang?: string) => Promise<string>;
  translatePage: () => Promise<void>;
  isTranslating: boolean;
  translationProgress: number;
  translationCache: TranslationCache;
  clearCache: () => void;
  enableAutoTranslation: boolean;
  setEnableAutoTranslation: (enabled: boolean) => void;
  availableAPIs: string[];
}

export const useAdvancedTranslation = (
  options: UseAdvancedTranslationOptions = {}
): UseAdvancedTranslationReturn => {
  const {
    cacheSize = 100,
    enableAutoTranslation: defaultAutoTranslation = true,
    fallbackLanguage = 'pt-BR'
  } = options;

  const { currentLanguage } = useInternational();
  const [isTranslating, setIsTranslating] = useState(false);
  const [translationProgress, setTranslationProgress] = useState(0);
  const [translationCache, setTranslationCache] = useState<TranslationCache>({});
  const [enableAutoTranslation, setEnableAutoTranslation] = useState(defaultAutoTranslation);
  const [availableAPIs, setAvailableAPIs] = useState<string[]>([]);
  const cacheKeysRef = useRef<string[]>([]);

  // Normalize language codes for API compatibility
  const normalizeLanguageCode = useCallback((lang: string): string => {
    const langMap: Record<string, string> = {
      'pt-BR': 'pt',
      'pt-PT': 'pt',
      'en-US': 'en',
      'en-GB': 'en',
      'en-AU': 'en',
      'en-CA': 'en',
      'es-ES': 'es',
      'es-MX': 'es',
      'es-AR': 'es',
      'fr-FR': 'fr',
      'fr-CA': 'fr',
      'de-DE': 'de',
      'de-AT': 'de',
      'de-CH': 'de',
      'it-IT': 'it',
      'it-CH': 'it',
      'ja-JP': 'ja',
      'ko-KR': 'ko',
      'zh-CN': 'zh',
      'zh-TW': 'zh-tw',
      'ru-RU': 'ru',
      'ar-SA': 'ar',
      'hi-IN': 'hi'
    };
    return langMap[lang] || lang.split('-')[0];
  }, []);

  // Multiple translation APIs with fallback chain
  const translationAPIs: TranslationAPI[] = [
    {
      name: 'LibreTranslate',
      priority: 1,
      isAvailable: true,
      translate: async (text: string, source: string, target: string) => {
        const response = await fetch('https://libretranslate.de/translate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            q: text,
            source: normalizeLanguageCode(source),
            target: normalizeLanguageCode(target),
            format: 'text'
          })
        });

        if (!response.ok) {
          throw new Error(`LibreTranslate error: ${response.status}`);
        }

        const data = await response.json();
        return data.translatedText || text;
      }
    },
    {
      name: 'MyMemory',
      priority: 2,
      isAvailable: true,
      translate: async (text: string, source: string, target: string) => {
        const sourceLang = normalizeLanguageCode(source);
        const targetLang = normalizeLanguageCode(target);
        
        const response = await fetch(
          `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${sourceLang}|${targetLang}`
        );
        
        if (!response.ok) {
          throw new Error(`MyMemory error: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (data.responseStatus === 200 && data.responseData?.translatedText) {
          return data.responseData.translatedText;
        }
        
        throw new Error('MyMemory translation failed');
      }
    },
    {
      name: 'Microsoft Translator',
      priority: 3,
      isAvailable: false, // Requires API key
      translate: async (text: string, source: string, target: string) => {
        // Would implement Microsoft Translator API if key available
        throw new Error('Microsoft Translator not configured');
      }
    }
  ];

  // Check API availability on mount
  useEffect(() => {
    const checkAPIAvailability = async () => {
      const available: string[] = [];
      
      for (const api of translationAPIs) {
        if (api.isAvailable) {
          try {
            // Test with small text
            await api.translate('hello', 'en', 'pt');
            available.push(api.name);
          } catch {
            // API not working, skip
          }
        }
      }
      
      setAvailableAPIs(available);
    };

    checkAPIAvailability();
  }, []);

  // Detect language of text content
  const detectLanguage = useCallback((text: string): string => {
    const sample = text.substring(0, 300).toLowerCase();
    
    const languagePatterns = {
      'pt': ['o', 'a', 'e', 'de', 'que', 'em', 'um', 'para', 'com', 'não', 'uma', 'os'],
      'en': ['the', 'be', 'to', 'of', 'and', 'a', 'in', 'that', 'have', 'i', 'it', 'for'],
      'es': ['el', 'la', 'de', 'que', 'y', 'en', 'un', 'es', 'se', 'no', 'te', 'lo'],
      'fr': ['le', 'de', 'et', 'un', 'à', 'être', 'en', 'avoir', 'que', 'pour', 'dans'],
      'de': ['der', 'die', 'und', 'in', 'den', 'von', 'zu', 'das', 'mit', 'sich'],
      'it': ['il', 'di', 'che', 'e', 'la', 'un', 'a', 'per', 'non', 'in', 'una'],
      'ja': ['の', 'に', 'は', 'を', 'た', 'が', 'で', 'て', 'と', 'し', 'れ'],
      'ko': ['이', '의', '가', '를', '에', '은', '는', '과', '로', '으로', '와'],
      'zh': ['的', '一', '了', '是', '我', '不', '人', '在', '他', '有', '这'],
      'ru': ['в', 'и', 'не', 'на', 'я', 'что', 'тот', 'быть', 'с', 'а', 'он'],
      'ar': ['في', 'من', 'إلى', 'على', 'أن', 'هذا', 'كان', 'التي', 'مع', 'أو']
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

  // Smart text chunking for large content
  const chunkText = useCallback((text: string, maxChunkSize: number = 800): string[] => {
    if (text.length <= maxChunkSize) {
      return [text];
    }

    const chunks: string[] = [];
    const sentences = text.split(/(?<=[.!?])\s+/);
    let currentChunk = '';

    for (const sentence of sentences) {
      if (currentChunk.length + sentence.length > maxChunkSize) {
        if (currentChunk.trim()) {
          chunks.push(currentChunk.trim());
          currentChunk = sentence;
        } else {
          // Sentence too long, split by words
          const words = sentence.split(' ');
          let wordChunk = '';
          
          for (const word of words) {
            if (wordChunk.length + word.length > maxChunkSize) {
              if (wordChunk.trim()) chunks.push(wordChunk.trim());
              wordChunk = word;
            } else {
              wordChunk += (wordChunk ? ' ' : '') + word;
            }
          }
          
          currentChunk = wordChunk;
        }
      } else {
        currentChunk += (currentChunk ? ' ' : '') + sentence;
      }
    }

    if (currentChunk.trim()) {
      chunks.push(currentChunk.trim());
    }

    return chunks;
  }, []);

  // Translate single text with API fallback
  const translateText = useCallback(async (
    text: string, 
    targetLang?: string
  ): Promise<string> => {
    const target = targetLang || currentLanguage;
    const cacheKey = `${text.substring(0, 100)}_${target}`;

    // Check cache
    if (translationCache[cacheKey]) {
      return translationCache[cacheKey];
    }

    // Skip short or empty text
    if (!text || text.trim().length < 3) {
      return text;
    }

    setIsTranslating(true);
    setTranslationProgress(0);

    try {
      const sourceLanguage = detectLanguage(text);
      const normalizedSource = normalizeLanguageCode(sourceLanguage);
      const normalizedTarget = normalizeLanguageCode(target);

      // Same language check
      if (normalizedSource === normalizedTarget) {
        setIsTranslating(false);
        return text;
      }

      // Chunk text for large content
      const chunks = chunkText(text);
      const translatedChunks: string[] = [];

      for (let i = 0; i < chunks.length; i++) {
        const chunk = chunks[i];
        setTranslationProgress((i / chunks.length) * 100);

        let translated = chunk;
        let success = false;

        // Try each API in priority order
        for (const api of translationAPIs.filter(a => a.isAvailable).sort((a, b) => a.priority - b.priority)) {
          try {
            translated = await api.translate(chunk, sourceLanguage, target);
            success = true;
            break;
          } catch (error) {
            console.warn(`${api.name} failed:`, error);
            continue;
          }
        }

        translatedChunks.push(translated);
      }

      const finalResult = translatedChunks.join(' ');
      setTranslationProgress(100);

      // Cache result
      const newCache = { ...translationCache };
      newCache[cacheKey] = finalResult;

      cacheKeysRef.current.push(cacheKey);
      if (cacheKeysRef.current.length > cacheSize) {
        const oldestKey = cacheKeysRef.current.shift();
        if (oldestKey) delete newCache[oldestKey];
      }

      setTranslationCache(newCache);
      setIsTranslating(false);

      return finalResult;
    } catch (error) {
      console.error('Translation failed:', error);
      setIsTranslating(false);
      return text;
    }
  }, [currentLanguage, translationCache, cacheSize, detectLanguage, chunkText, normalizeLanguageCode]);

  // Translate entire page content
  const translatePage = useCallback(async (): Promise<void> => {
    if (!enableAutoTranslation) return;

    setIsTranslating(true);
    setTranslationProgress(0);

    try {
      // Find translatable elements
      const translatableSelectors = [
        'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
        'p', 'span', 'div:not([class*="icon"]):not([class*="logo"])',
        'button', 'a:not([href^="mailto:"]):not([href^="tel:"])',
        '[alt]', '[title]', '[placeholder]'
      ];

      const elements = document.querySelectorAll(translatableSelectors.join(', '));
      const filteredElements = Array.from(elements).filter(el => {
        const text = el.textContent?.trim();
        return text && text.length > 2 && !el.closest('[data-no-translate]');
      });

      for (let i = 0; i < filteredElements.length; i++) {
        const element = filteredElements[i];
        setTranslationProgress((i / filteredElements.length) * 100);

        if (element.textContent) {
          const translated = await translateText(element.textContent, currentLanguage);
          if (translated !== element.textContent) {
            element.textContent = translated;
          }
        }

        // Translate attributes
        const altText = element.getAttribute('alt');
        if (altText) {
          const translatedAlt = await translateText(altText, currentLanguage);
          element.setAttribute('alt', translatedAlt);
        }

        const titleText = element.getAttribute('title');
        if (titleText) {
          const translatedTitle = await translateText(titleText, currentLanguage);
          element.setAttribute('title', translatedTitle);
        }

        const placeholderText = element.getAttribute('placeholder');
        if (placeholderText) {
          const translatedPlaceholder = await translateText(placeholderText, currentLanguage);
          element.setAttribute('placeholder', translatedPlaceholder);
        }
      }

      setTranslationProgress(100);
    } catch (error) {
      console.error('Page translation failed:', error);
    } finally {
      setIsTranslating(false);
    }
  }, [enableAutoTranslation, currentLanguage, translateText]);

  // Auto-translate when language changes
  useEffect(() => {
    if (enableAutoTranslation && currentLanguage !== fallbackLanguage) {
      const timer = setTimeout(() => {
        translatePage();
      }, 1000); // Delay to allow page to load

      return () => clearTimeout(timer);
    }
  }, [currentLanguage, enableAutoTranslation, fallbackLanguage, translatePage]);

  const clearCache = useCallback(() => {
    setTranslationCache({});
    cacheKeysRef.current = [];
  }, []);

  return {
    translateText,
    translatePage,
    isTranslating,
    translationProgress,
    translationCache,
    clearCache,
    enableAutoTranslation,
    setEnableAutoTranslation,
    availableAPIs
  };
};

export default useAdvancedTranslation;