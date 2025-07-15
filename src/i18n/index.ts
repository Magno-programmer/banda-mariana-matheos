import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Recursos de tradução básicos
const resources = {
  'pt-BR': {
    translation: {
      // Textos básicos da interface
      voice: {
        startReading: 'Iniciar leitura da página',
        stopReading: 'Parar leitura',
        pauseReading: 'Pausar leitura',
        resumeReading: 'Continuar leitura',
        voiceAndTranslation: 'Voz e Tradução',
        detecting: 'Detectando idioma...',
        translating: 'Traduzindo...',
        ready: 'Pronto',
        autoTranslationActive: 'Tradução automática ativa',
        autoTranslationDisabled: 'Tradução automática desativada',
        language: 'Idioma',
        speed: 'Velocidade',
        pitch: 'Tom',
        volume: 'Volume',
        voiceSelection: 'Voz',
        previousSentence: 'Sentença anterior',
        nextSentence: 'Próxima sentença',
        sentence: 'Sentença',
        of: 'de',
        browserNotSupported: 'Seu navegador não suporta síntese de voz'
      }
    }
  },
  'en-US': {
    translation: {
      voice: {
        startReading: 'Start reading page',
        stopReading: 'Stop reading',
        pauseReading: 'Pause reading',
        resumeReading: 'Resume reading',
        voiceAndTranslation: 'Voice and Translation',
        detecting: 'Detecting language...',
        translating: 'Translating...',
        ready: 'Ready',
        autoTranslationActive: 'Auto-translation active',
        autoTranslationDisabled: 'Auto-translation disabled',
        language: 'Language',
        speed: 'Speed',
        pitch: 'Pitch',
        volume: 'Volume',
        voiceSelection: 'Voice',
        previousSentence: 'Previous sentence',
        nextSentence: 'Next sentence',
        sentence: 'Sentence',
        of: 'of',
        browserNotSupported: 'Your browser does not support voice synthesis'
      }
    }
  },
  'es-ES': {
    translation: {
      voice: {
        startReading: 'Empezar a leer la página',
        stopReading: 'Dejar de leer',
        pauseReading: 'Pausar lectura',
        resumeReading: 'Continuar lectura',
        voiceAndTranslation: 'Voz y Traducción',
        detecting: 'Detectando idioma...',
        translating: 'Traduciendo...',
        ready: 'Listo',
        autoTranslationActive: 'Traducción automática activa',
        autoTranslationDisabled: 'Traducción automática desactivada',
        language: 'Idioma',
        speed: 'Velocidad',
        pitch: 'Tono',
        volume: 'Volumen',
        voiceSelection: 'Voz',
        previousSentence: 'Oración anterior',
        nextSentence: 'Siguiente oración',
        sentence: 'Oración',
        of: 'de',
        browserNotSupported: 'Tu navegador no admite síntesis de voz'
      }
    }
  },
  'fr-FR': {
    translation: {
      voice: {
        startReading: 'Commencer la lecture de la page',
        stopReading: 'Arrêter la lecture',
        pauseReading: 'Mettre en pause la lecture',
        resumeReading: 'Reprendre la lecture',
        voiceAndTranslation: 'Voix et Traduction',
        detecting: 'Détection de la langue...',
        translating: 'Traduction...',
        ready: 'Prêt',
        autoTranslationActive: 'Traduction automatique active',
        autoTranslationDisabled: 'Traduction automatique désactivée',
        language: 'Langue',
        speed: 'Vitesse',
        pitch: 'Tonalité',
        volume: 'Volume',
        voiceSelection: 'Voix',
        previousSentence: 'Phrase précédente',
        nextSentence: 'Phrase suivante',
        sentence: 'Phrase',
        of: 'de',
        browserNotSupported: 'Votre navigateur ne prend pas en charge la synthèse vocale'
      }
    }
  }
};

// Função para detectar idioma do navegador
const getDetectedLanguage = (): string => {
  const browserLang = navigator.language || navigator.languages?.[0] || 'pt-BR';
  const supportedLangs = ['pt-BR', 'en-US', 'es-ES', 'fr-FR'];
  
  // Normalizar o código do idioma
  const normalizedLang = browserLang.toLowerCase();
  
  // Mapear códigos de idioma para os suportados
  const langMap: Record<string, string> = {
    'pt': 'pt-BR',
    'pt-br': 'pt-BR',
    'en': 'en-US',
    'en-us': 'en-US',
    'en-gb': 'en-US',
    'es': 'es-ES',
    'es-es': 'es-ES',
    'es-us': 'es-ES',
    'fr': 'fr-FR',
    'fr-fr': 'fr-FR'
  };
  
  // Verificar se o idioma é suportado diretamente
  if (supportedLangs.includes(browserLang)) {
    return browserLang;
  }
  
  // Verificar mapeamento
  if (langMap[normalizedLang]) {
    return langMap[normalizedLang];
  }
  
  // Verificar apenas código base (ex: 'pt' de 'pt-BR')
  const baseLang = normalizedLang.split('-')[0];
  if (langMap[baseLang]) {
    return langMap[baseLang];
  }
  
  return 'pt-BR'; // Fallback padrão
};

// Configuração do i18next
i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: getDetectedLanguage(), // ⚠️ i18n integration: Auto-detect browser language
    fallbackLng: 'pt-BR',
    
    interpolation: {
      escapeValue: false, // React já faz escape automaticamente
    },
    
    // Opções de detecção de idioma
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
      lookupLocalStorage: 'i18nextLng',
      checkWhitelist: true
    },
    
    // Debug apenas em desenvolvimento
    debug: process.env.NODE_ENV === 'development',
    
    // Namespace padrão
    defaultNS: 'translation',
    
    load: 'languageOnly', // Isso ajuda a aceitar apenas o idioma base (pt, en, es)
    preload: ['pt-BR', 'en-US', 'es-ES', 'fr-FR'], // Pré-carrega traduções críticas

    
    // Configuração de pluralização
    pluralSeparator: '_',
    
    // Configuração de contextos
    contextSeparator: '_',
    
    // Configuração de namespaces
    nsSeparator: ':',
    
    // Configuração de chaves
    keySeparator: '.',
    
    // Configuração de retorno
    returnEmptyString: false,
    returnNull: false,
    returnObjects: false,
    
    // Configuração de formatação
    saveMissing: false,
    
    // Configuração de postProcessing
    postProcess: false,
    
    // Configuração de parsers
    parseMissingKeyHandler: (key: string) => {
      console.warn(`Missing translation key: ${key}`);
      return key;
    }
  });

export default i18n;