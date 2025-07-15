import { useState, useCallback, useRef, useEffect } from 'react';

interface TranslationCache {
  [key: string]: {
    text: string;
    timestamp: number;
    confidence: number;
    provider: string;
    usage: number;
  };
}

interface TranslationProvider {
  name: string;
  translate: (text: string, from: string, to: string) => Promise<{text: string, confidence: number}>;
  isAvailable: () => boolean;
  rateLimit: number;
  maxChunkSize: number;
}

interface TranslationMetrics {
  totalTranslations: number;
  successRate: number;
  averageTime: number;
  providerUsage: {[key: string]: number};
  cacheHitRate: number;
}

interface LanguageDetectionResult {
  language: string;
  confidence: number;
  alternatives: Array<{language: string, confidence: number}>;
}

interface UseTranslationOptions {
  targetLanguage?: string;
  cacheSize?: number;
  cacheTTL?: number;
  enablePersistentCache?: boolean;
  preferredProviders?: string[];
  enableMetrics?: boolean;
  enableAutoRetry?: boolean;
  maxRetries?: number;
  chunkStrategy?: 'sentence' | 'paragraph' | 'smart';
  qualityThreshold?: number;
}

interface UseTranslationReturn {
  translateText: (text: string, targetLang?: string, options?: {
    priority?: 'speed' | 'quality' | 'balanced';
    context?: string;
    contentType?: 'text' | 'html' | 'markdown';
  }) => Promise<string>;
  detectLanguage: (text: string) => LanguageDetectionResult;
  isTranslating: boolean;
  translationCache: TranslationCache;
  clearCache: () => void;
  getPageLanguage: () => string;
  getUserLanguage: () => string;
  needsTranslation: (pageLanguage: string, userLanguage: string) => boolean;
  getSupportedLanguages: () => string[];
  getTranslationMetrics: () => TranslationMetrics;
  getProviderStatus: () => {[key: string]: boolean};
  preloadTranslation: (text: string, targetLang: string) => Promise<void>;
  translateBatch: (texts: string[], targetLang: string) => Promise<string[]>;
  getLanguageNativeName: (langCode: string) => string;
  estimateTranslationTime: (text: string, targetLang: string) => number;
  optimizeForSpeech: (text: string, targetLang: string) => Promise<string>;
}

export const useTranslation = (options: UseTranslationOptions = {}): UseTranslationReturn => {
  const {
    targetLanguage = 'pt-BR',
    cacheSize = 100,
    cacheTTL = 3600000, // 1 hora em ms
    enablePersistentCache = true,
    preferredProviders = ['mymemory', 'libretranslate', 'googlefree'],
    enableMetrics = true,
    enableAutoRetry = true,
    maxRetries = 3,
    chunkStrategy = 'smart',
    qualityThreshold = 0.7
  } = options;

  const [isTranslating, setIsTranslating] = useState(false);
  const [translationCache, setTranslationCache] = useState<TranslationCache>({});
  const [metrics, setMetrics] = useState<TranslationMetrics>({
    totalTranslations: 0,
    successRate: 1.0,
    averageTime: 0,
    providerUsage: {},
    cacheHitRate: 0
  });
  
  const cacheKeysRef = useRef<string[]>([]);
  const retryCountRef = useRef<{[key: string]: number}>({});
  const translationTimesRef = useRef<number[]>([]);
  const cacheHitsRef = useRef(0);
  const cacheMissesRef = useRef(0);

  // Mapeamento de idiomas para nomes nativos
  const languageNames: {[key: string]: string} = {
    'pt': 'Português', 'pt-BR': 'Português (Brasil)', 'en': 'English', 'es': 'Español',
    'fr': 'Français', 'de': 'Deutsch', 'it': 'Italiano', 'ja': '日本語', 'ko': '한국어',
    'zh': '中文', 'ru': 'Русский', 'ar': 'العربية', 'hi': 'हिन्दी', 'th': 'ไทย',
    'vi': 'Tiếng Việt', 'nl': 'Nederlands', 'sv': 'Svenska', 'no': 'Norsk', 'da': 'Dansk',
    'fi': 'Suomi', 'pl': 'Polski', 'cs': 'Čeština', 'hu': 'Magyar', 'ro': 'Română',
    'bg': 'Български', 'hr': 'Hrvatski', 'sk': 'Slovenčina', 'sl': 'Slovenščina',
    'et': 'Eesti', 'lv': 'Latviešu', 'lt': 'Lietuvių', 'mt': 'Malti', 'el': 'Ελληνικά',
    'tr': 'Türkçe', 'he': 'עברית', 'ur': 'اردو', 'fa': 'فارسی', 'bn': 'বাংলা',
    'ta': 'தமிழ்', 'te': 'తెలుగు', 'ml': 'മലയാളം', 'kn': 'ಕನ್ನಡ', 'gu': 'ગુજરાતી',
    'mr': 'मराठी', 'pa': 'ਪੰਜਾਬੀ', 'or': 'ଓଡ଼ିଆ', 'as': 'অসমীয়া', 'ne': 'नेपाली',
    'si': 'සිංහල', 'my': 'မြန်မာ', 'km': 'ខ្មែរ', 'lo': 'ລາວ', 'ka': 'ქართული',
    'am': 'አማርኛ', 'sw': 'Kiswahili', 'zu': 'isiZulu', 'af': 'Afrikaans', 'sq': 'Shqip',
    'eu': 'Euskera', 'ca': 'Català', 'cy': 'Cymraeg', 'ga': 'Gaeilge', 'is': 'Íslenska',
    'lb': 'Lëtzebuergesch', 'mk': 'Македонски', 'ms': 'Bahasa Melayu', 'tl': 'Filipino',
    'id': 'Bahasa Indonesia', 'jv': 'Basa Jawa', 'su': 'Basa Sunda', 'ceb': 'Cebuano',
    'haw': 'ʻŌlelo Hawaiʻi', 'mg': 'Malagasy', 'sm': 'Gagana Samoa', 'to': 'Lea Fakatonga',
    'fj': 'Vosa Vakaviti', 'ny': 'Chichewa', 'sn': 'Shona', 'st': 'Sesotho',
    'tn': 'Setswana', 'ts': 'Xitsonga', 've': 'Tshivenda', 'xh': 'isiXhosa',
    'yo': 'Yorùbá', 'ig': 'Igbo', 'ha': 'Hausa', 'so': 'Soomaali', 'rw': 'Kinyarwanda',
    'rn': 'Ikirundi', 'lg': 'Luganda', 'ak': 'Akan', 'tw': 'Twi', 'ee': 'Eʋegbe',
    'ff': 'Fulfulde', 'wo': 'Wolof', 'bm': 'Bamanankan', 'dv': 'ދިވެހި', 'ps': 'پښتو',
    'sd': 'سنڌي', 'ug': 'ئۇيغۇرچە', 'tk': 'Türkmen', 'ky': 'Кыргызча', 'kk': 'Қазақ',
    'uz': 'Oʻzbek', 'tg': 'Тоҷикӣ', 'mn': 'Монгол', 'bo': 'བོད་ཡིག', 'dz': 'རྫོང་ཁ',
    'ii': 'ꆈꌠ꒿', 'iu': 'ᐃᓄᒃᑎᑐᑦ', 'oj': 'Ojibwe', 'cr': 'ᓀᐦᐃᔭᐍᐏᐣ', 'chr': 'ᏣᎳᎩ',
    'mi': 'Te Reo Māori', 'qu': 'Runasimi', 'gn': 'Avañe\'ẽ', 'ay': 'Aymar aru',
    'ht': 'Kreyòl ayisyen', 'la': 'Latina', 'eo': 'Esperanto', 'ia': 'Interlingua'
  };

  // Provedores de tradução avançados
  const providers: TranslationProvider[] = [
    {
      name: 'mymemory',
      translate: async (text: string, from: string, to: string) => {
        const response = await fetch(
          `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${from}|${to}`
        );
        const data = await response.json();
        return {
          text: data.responseData?.translatedText || text,
          confidence: data.matches?.[0]?.quality || 0.7
        };
      },
      isAvailable: () => true,
      rateLimit: 100,
      maxChunkSize: 1000
    },
    {
      name: 'libretranslate',
      translate: async (text: string, from: string, to: string) => {
        const response = await fetch('https://libretranslate.de/translate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ q: text, source: from, target: to, format: 'text' })
        });
        const data = await response.json();
        return {
          text: data.translatedText || text,
          confidence: 0.8
        };
      },
      isAvailable: () => true,
      rateLimit: 20,
      maxChunkSize: 2000
    },
    {
      name: 'googlefree',
      translate: async (text: string, from: string, to: string) => {
        const response = await fetch(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=${from}&tl=${to}&dt=t&q=${encodeURIComponent(text)}`);
        const data = await response.json();
        return {
          text: data[0]?.[0]?.[0] || text,
          confidence: 0.85
        };
      },
      isAvailable: () => true,
      rateLimit: 50,
      maxChunkSize: 1500
    }
  ];

  // Carregar cache persistente
  useEffect(() => {
    if (enablePersistentCache) {
      try {
        const savedCache = localStorage.getItem('translation-cache');
        if (savedCache) {
          const parsedCache = JSON.parse(savedCache);
          // Verificar TTL
          const now = Date.now();
          const validCache: TranslationCache = {};
          
          Object.entries(parsedCache).forEach(([key, value]) => {
            const entry = value as any;
            if (now - entry.timestamp < cacheTTL) {
              validCache[key] = entry;
            }
          });
          
          setTranslationCache(validCache);
        }
      } catch (error) {
        console.warn('Failed to load translation cache:', error);
      }
    }
  }, [enablePersistentCache, cacheTTL]);

  // Salvar cache persistente
  useEffect(() => {
    if (enablePersistentCache && Object.keys(translationCache).length > 0) {
      try {
        localStorage.setItem('translation-cache', JSON.stringify(translationCache));
      } catch (error) {
        console.warn('Failed to save translation cache:', error);
      }
    }
  }, [translationCache, enablePersistentCache]);

  // Detecção avançada de idioma
  const detectLanguage = useCallback((text: string): LanguageDetectionResult => {
    const sample = text.substring(0, 500).toLowerCase();
    
    // Padrões linguísticos mais abrangentes
    const languagePatterns = {
      'pt': {
        words: ['o', 'a', 'e', 'de', 'que', 'em', 'um', 'para', 'com', 'não', 'uma', 'os', 'no', 'se', 'na', 'por', 'mais', 'as', 'dos', 'como', 'do', 'da', 'das', 'nos', 'nas', 'pela', 'pelo', 'pelas', 'pelos'],
        patterns: [/ção\b/g, /mente\b/g, /ão\b/g, /ões\b/g, /nh/g, /lh/g, /rr/g, /ss/g]
      },
      'en': {
        words: ['the', 'be', 'to', 'of', 'and', 'a', 'in', 'that', 'have', 'i', 'it', 'for', 'not', 'on', 'with', 'he', 'as', 'you', 'do', 'at', 'this', 'but', 'his', 'by', 'from', 'they', 'we', 'say', 'her', 'she'],
        patterns: [/ing\b/g, /tion\b/g, /ed\b/g, /ly\b/g, /th/g, /ough/g, /ight/g]
      },
      'es': {
        words: ['el', 'la', 'de', 'que', 'y', 'en', 'un', 'es', 'se', 'no', 'te', 'lo', 'le', 'da', 'su', 'por', 'son', 'con', 'para', 'al', 'del', 'los', 'las', 'una', 'ser', 'está', 'todo', 'pero', 'más', 'hacer'],
        patterns: [/ción\b/g, /mente\b/g, /ado\b/g, /ido\b/g, /ñ/g, /ll/g, /rr/g]
      },
      'fr': {
        words: ['le', 'de', 'et', 'un', 'à', 'être', 'en', 'avoir', 'que', 'pour', 'dans', 'ce', 'il', 'une', 'sur', 'avec', 'ne', 'se', 'pas', 'tout', 'plus', 'par', 'grand', 'si', 'vous', 'mon', 'te', 'nous', 'comme', 'mais'],
        patterns: [/tion\b/g, /ment\b/g, /eur\b/g, /eux\b/g, /aux\b/g, /eau\b/g, /ç/g, /è|é|ê|ë/g, /à|â/g, /ù|û/g, /ï|î/g, /ô|ö/g]
      },
      'de': {
        words: ['der', 'die', 'und', 'in', 'den', 'von', 'zu', 'das', 'mit', 'sich', 'des', 'auf', 'für', 'ist', 'im', 'dem', 'nicht', 'ein', 'eine', 'als', 'auch', 'es', 'an', 'werden', 'aus', 'er', 'hat', 'dass', 'sie', 'nach'],
        patterns: [/ung\b/g, /keit\b/g, /heit\b/g, /lich\b/g, /isch\b/g, /ung\b/g, /ä|ö|ü/g, /ß/g, /sch/g, /tsch/g, /tz/g]
      },
      'it': {
        words: ['il', 'di', 'che', 'e', 'la', 'per', 'un', 'in', 'con', 'del', 'da', 'a', 'al', 'le', 'si', 'dei', 'sul', 'una', 'su', 'gli', 'della', 'all', 'dello', 'nella', 'dalla', 'alla', 'delle', 'negli', 'sono', 'più'],
        patterns: [/zione\b/g, /mente\b/g, /ato\b/g, /uto\b/g, /ito\b/g, /oso\b/g, /osa\b/g, /gli/g, /gn/g, /sc/g]
      },
      'ru': {
        words: ['в', 'и', 'не', 'на', 'я', 'быть', 'то', 'он', 'с', 'а', 'как', 'по', 'это', 'она', 'они', 'к', 'у', 'же', 'мы', 'за', 'из', 'или', 'что', 'от', 'при', 'до', 'о', 'для', 'со', 'его'],
        patterns: [/ть\b/g, /ся\b/g, /ость\b/g, /ение\b/g, /ание\b/g, /[а-я]/g, /[ё]/g, /[ъь]/g]
      },
      'ja': {
        words: ['の', 'に', 'は', 'を', 'た', 'が', 'で', 'て', 'と', 'し', 'れ', 'さ', 'ある', 'い', 'も', 'する', 'から', 'な', 'こ', 'として', 'よ', 'その', 'だ', 'できる', 'では', 'まで', 'ない', '日', '一', '人'],
        patterns: [/[ひらがな]/g, /[カタカナ]/g, /[漢字]/g, /です\b/g, /ます\b/g, /である\b/g, /して\b/g, /した\b/g, /する\b/g, /され\b/g]
      },
      'ko': {
        words: ['이', '의', '가', '을', '는', '에', '와', '한', '하', '로', '으로', '에서', '과', '도', '를', '에게', '그', '것', '수', '들', '많', '같', '주', '보', '좋', '새', '노', '만', '각', '잘'],
        patterns: [/[한글]/g, /이다\b/g, /하다\b/g, /되다\b/g, /있다\b/g, /없다\b/g, /지다\b/g, /로서\b/g, /에서\b/g, /에게\b/g]
      },
      'zh': {
        words: ['的', '一', '是', '在', '不', '了', '有', '和', '人', '这', '中', '大', '为', '上', '个', '国', '我', '以', '要', '他', '时', '来', '用', '们', '生', '到', '作', '地', '于', '出'],
        patterns: [/[中文]/g, /[简体]/g, /[繁體]/g, /了\b/g, /的\b/g, /是\b/g, /在\b/g, /有\b/g, /这\b/g, /那\b/g]
      },
      'ar': {
        words: ['في', 'من', 'إلى', 'على', 'أن', 'هذا', 'هذه', 'التي', 'التى', 'كان', 'كانت', 'يكون', 'تكون', 'سوف', 'قد', 'لقد', 'أو', 'أم', 'كل', 'بعض', 'غير', 'بين', 'عند', 'لدى', 'حول', 'خلال', 'بعد', 'قبل', 'أثناء'],
        patterns: [/[ا-ي]/g, /ال/g, /ها\b/g, /ون\b/g, /ين\b/g, /ات\b/g, /ة\b/g, /ً\b/g, /ٌ\b/g, /ٍ\b/g]
      }
    };

    const results: {language: string, confidence: number}[] = [];

    Object.entries(languagePatterns).forEach(([lang, config]) => {
      let score = 0;
      let totalWords = 0;

      // Pontuação por palavras comuns
      config.words.forEach(word => {
        const regex = new RegExp(`\\b${word}\\b`, 'gi');
        const matches = sample.match(regex);
        if (matches) {
          score += matches.length * 2; // Peso maior para palavras comuns
          totalWords += matches.length;
        }
      });

      // Pontuação por padrões linguísticos
      config.patterns.forEach(pattern => {
        const matches = sample.match(pattern);
        if (matches) {
          score += matches.length * 1.5; // Peso médio para padrões
        }
      });

      // Normalizar pontuação
      const wordCount = sample.split(/\s+/).length;
      const normalizedScore = wordCount > 0 ? score / wordCount : 0;
      
      results.push({
        language: lang,
        confidence: Math.min(normalizedScore, 1.0)
      });
    });

    // Ordenar por confiança
    results.sort((a, b) => b.confidence - a.confidence);

    // Retornar resultado mais provável
    const bestMatch = results[0] || { language: 'pt', confidence: 0.5 };
    
    return {
      language: bestMatch.language,
      confidence: bestMatch.confidence,
      alternatives: results.slice(1, 4) // Top 3 alternativas
    };
  }, []);

  // Estratégias de divisão de texto
  const splitTextByStrategy = useCallback((text: string, strategy: 'sentence' | 'paragraph' | 'smart', maxSize: number): string[] => {
    switch (strategy) {
      case 'sentence':
        return text.split(/(?<=[.!?])\s+/).filter(s => s.trim().length > 0);
        
      case 'paragraph':
        return text.split(/\n\s*\n/).filter(p => p.trim().length > 0);
        
      case 'smart':
      default:
        // Divisão inteligente baseada no tamanho
        const chunks: string[] = [];
        const sentences = text.split(/(?<=[.!?])\s+/);
        let currentChunk = '';
        
        for (const sentence of sentences) {
          if (currentChunk.length + sentence.length > maxSize) {
            if (currentChunk.trim()) chunks.push(currentChunk.trim());
            currentChunk = sentence;
          } else {
            currentChunk += (currentChunk ? ' ' : '') + sentence;
          }
        }
        
        if (currentChunk.trim()) chunks.push(currentChunk.trim());
        return chunks;
    }
  }, []);

  // Função de tradução avançada
  const translateText = useCallback(async (text: string, targetLang?: string, options?: {
    priority?: 'speed' | 'quality' | 'balanced';
    context?: string;
    contentType?: 'text' | 'html' | 'markdown';
  }): Promise<string> => {
    if (!text.trim()) return text;
    
    const target = targetLang || targetLanguage;
    const normalizedTarget = target.split('-')[0];
    const cacheKey = `${text.substring(0, 100)}_${normalizedTarget}_${options?.priority || 'balanced'}`;
    
    // Verificar cache
    if (translationCache[cacheKey]) {
      const cached = translationCache[cacheKey];
      cached.usage++;
      cacheHitsRef.current++;
      return cached.text;
    }
    
    cacheMissesRef.current++;
    setIsTranslating(true);
    
    const startTime = Date.now();
    
    try {
      // Detectar idioma de origem
      const detection = detectLanguage(text);
      
      // Verificar se já está no idioma correto
      if (detection.language === normalizedTarget) {
        setIsTranslating(false);
        return text;
      }
      
      // Selecionar provedor baseado na prioridade
      const availableProviders = providers.filter(p => p.isAvailable());
      let selectedProvider = availableProviders[0];
      
      if (options?.priority === 'speed') {
        selectedProvider = availableProviders.find(p => p.name === 'googlefree') || availableProviders[0];
      } else if (options?.priority === 'quality') {
        selectedProvider = availableProviders.find(p => p.name === 'libretranslate') || availableProviders[0];
      }
      
      // Dividir texto em chunks
      const chunks = splitTextByStrategy(text, chunkStrategy, selectedProvider.maxChunkSize);
      
      // Traduzir chunks com retry
      const translatedChunks = await Promise.all(
        chunks.map(async (chunk, index) => {
          const retryKey = `${cacheKey}_${index}`;
          let retryCount = retryCountRef.current[retryKey] || 0;
          
          while (retryCount < maxRetries) {
            try {
              const result = await selectedProvider.translate(chunk, detection.language, normalizedTarget);
              
              // Verificar qualidade da tradução
              if (result.confidence >= qualityThreshold) {
                delete retryCountRef.current[retryKey];
                return result.text;
              } else if (retryCount < maxRetries - 1) {
                // Tentar próximo provedor
                const nextProvider = availableProviders[retryCount + 1];
                if (nextProvider) {
                  const nextResult = await nextProvider.translate(chunk, detection.language, normalizedTarget);
                  if (nextResult.confidence >= qualityThreshold) {
                    delete retryCountRef.current[retryKey];
                    return nextResult.text;
                  }
                }
              }
              
              return result.text;
            } catch (error) {
              console.warn(`Translation failed for chunk ${index}, attempt ${retryCount + 1}:`, error);
              retryCount++;
              retryCountRef.current[retryKey] = retryCount;
              
              if (retryCount >= maxRetries) {
                delete retryCountRef.current[retryKey];
                return chunk; // Fallback para texto original
              }
            }
          }
          
          return chunk;
        })
      );
      
      const translatedText = translatedChunks.join(' ');
      const endTime = Date.now();
      const translationTime = endTime - startTime;
      
      // Atualizar cache
      const cacheEntry = {
        text: translatedText,
        timestamp: Date.now(),
        confidence: detection.confidence,
        provider: selectedProvider.name,
        usage: 1
      };
      
      const newCache = { ...translationCache };
      newCache[cacheKey] = cacheEntry;
      
      // Gerenciar tamanho do cache
      cacheKeysRef.current.push(cacheKey);
      if (cacheKeysRef.current.length > cacheSize) {
        const oldestKey = cacheKeysRef.current.shift();
        if (oldestKey) {
          delete newCache[oldestKey];
        }
      }
      
      setTranslationCache(newCache);
      
      // Atualizar métricas
      if (enableMetrics) {
        translationTimesRef.current.push(translationTime);
        if (translationTimesRef.current.length > 100) {
          translationTimesRef.current.shift();
        }
        
        setMetrics(prev => ({
          ...prev,
          totalTranslations: prev.totalTranslations + 1,
          averageTime: translationTimesRef.current.reduce((a, b) => a + b, 0) / translationTimesRef.current.length,
          providerUsage: {
            ...prev.providerUsage,
            [selectedProvider.name]: (prev.providerUsage[selectedProvider.name] || 0) + 1
          },
          cacheHitRate: cacheHitsRef.current / (cacheHitsRef.current + cacheMissesRef.current)
        }));
      }
      
      setIsTranslating(false);
      return translatedText;
      
    } catch (error) {
      console.error('Translation error:', error);
      setIsTranslating(false);
      return text;
    }
  }, [targetLanguage, translationCache, detectLanguage, cacheSize, chunkStrategy, maxRetries, qualityThreshold, enableMetrics]);

  // Funções auxiliares avançadas
  const getPageLanguage = useCallback((): string => {
    const htmlLang = document.documentElement.lang ||
                    document.getElementsByTagName('html')[0]?.getAttribute('lang') ||
                    document.querySelector('meta[name="language"]')?.getAttribute('content') ||
                    document.querySelector('meta[property="og:locale"]')?.getAttribute('content');
    
    if (htmlLang) {
      return htmlLang.toLowerCase();
    }
    
    // Detecção por conteúdo
    const content = document.body.textContent || '';
    if (content.length > 100) {
      const detection = detectLanguage(content);
      return detection.language;
    }
    
    return 'pt-BR';
  }, [detectLanguage]);

  const getUserLanguage = useCallback((): string => {
    return navigator.language || navigator.languages?.[0] || 'pt-BR';
  }, []);

  const needsTranslation = useCallback((pageLanguage: string, userLanguage: string): boolean => {
    const normalizeLanguage = (lang: string) => lang.toLowerCase().split('-')[0];
    const pageLang = normalizeLanguage(pageLanguage);
    const userLang = normalizeLanguage(userLanguage);
    return pageLang !== userLang;
  }, []);

  const getSupportedLanguages = useCallback((): string[] => {
    return Object.keys(languageNames);
  }, []);

  const getTranslationMetrics = useCallback((): TranslationMetrics => {
    return metrics;
  }, [metrics]);

  const getProviderStatus = useCallback((): {[key: string]: boolean} => {
    const status: {[key: string]: boolean} = {};
    providers.forEach(provider => {
      status[provider.name] = provider.isAvailable();
    });
    return status;
  }, []);

  const preloadTranslation = useCallback(async (text: string, targetLang: string): Promise<void> => {
    try {
      await translateText(text, targetLang, { priority: 'speed' });
    } catch (error) {
      console.warn('Preload translation failed:', error);
    }
  }, [translateText]);

  const translateBatch = useCallback(async (texts: string[], targetLang: string): Promise<string[]> => {
    return await Promise.all(texts.map(text => translateText(text, targetLang)));
  }, [translateText]);

  const getLanguageNativeName = useCallback((langCode: string): string => {
    return languageNames[langCode] || langCode;
  }, []);

  const estimateTranslationTime = useCallback((text: string, targetLang: string): number => {
    const avgTime = metrics.averageTime || 1000;
    const chunks = Math.ceil(text.length / 1000);
    return avgTime * chunks;
  }, [metrics.averageTime]);

  const optimizeForSpeech = useCallback(async (text: string, targetLang: string): Promise<string> => {
    const translated = await translateText(text, targetLang, { priority: 'quality' });
    
    // Otimizações para síntese de voz
    return translated
      .replace(/\s+/g, ' ') // Normalizar espaços
      .replace(/([.!?])\s*([A-Z])/g, '$1 $2') // Espaçamento após pontuação
      .replace(/\b(www\.|http)/gi, 'site ') // Substituir URLs
      .replace(/\b\d{4,}\b/g, match => match.split('').join(' ')) // Separar números longos
      .trim();
  }, [translateText]);

  const clearCache = useCallback(() => {
    setTranslationCache({});
    cacheKeysRef.current = [];
    cacheHitsRef.current = 0;
    cacheMissesRef.current = 0;
    if (enablePersistentCache) {
      localStorage.removeItem('translation-cache');
    }
  }, [enablePersistentCache]);

  return {
    translateText,
    detectLanguage,
    isTranslating,
    translationCache,
    clearCache,
    getPageLanguage,
    getUserLanguage,
    needsTranslation,
    getSupportedLanguages,
    getTranslationMetrics,
    getProviderStatus,
    preloadTranslation,
    translateBatch,
    getLanguageNativeName,
    estimateTranslationTime,
    optimizeForSpeech
  };
};