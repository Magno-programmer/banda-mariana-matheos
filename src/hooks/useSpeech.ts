import { useState, useEffect, useCallback, useRef } from 'react';

// Função para mapear nome da voz para código de idioma
const getLangFromVoiceName = (voiceName: string): string => {
  const map: Record<string, string> = {
    "Microsoft Daniel - Portuguese (Brazil)": "pt-BR",
    "Microsoft Maria - Portuguese (Brazil)": "pt-BR",
    "Microsoft Mark - English (United States)": "en-US",
    "Microsoft Zira - English (United States)": "en-US",
    "Microsoft David - English (United States)": "en-US",
    "Microsoft Hazel - English (Great Britain)": "en-GB",
    "Microsoft Susan - English (Great Britain)": "en-GB",
    "Microsoft Helena - Spanish (Spain)": "es-ES",
    "Microsoft Sabina - Spanish (Mexico)": "es-MX",
    "Microsoft Hortense - French (France)": "fr-FR",
    "Microsoft Paulina - Spanish (Mexico)": "es-MX",
    "Google US English": "en-US",
    "Google UK English Female": "en-GB",
    "Google UK English Male": "en-GB",
    "Google español": "es-ES",
    "Google español de Estados Unidos": "es-US",
    "Google français": "fr-FR",
    "Google português do Brasil": "pt-BR",
    "Google italiano": "it-IT",
    "Google Deutsch": "de-DE",
    "Google 日本語": "ja-JP",
    "Google 한국의": "ko-KR",
    "Google 中文": "zh-CN",
    "Google русский": "ru-RU",
    "Google हिन्दी": "hi-IN",
    "Google العربية": "ar-SA",
    "Google Nederlands": "nl-NL",
    "Google svenska": "sv-SE",
    "Google norsk": "no-NO",
    "Google dansk": "da-DK",
    "Google polski": "pl-PL",
    "Google türkçe": "tr-TR",
    "Google ελληνικά": "el-GR",
    "Google português": "pt-PT",
    "Google čeština": "cs-CZ",
    "Google magyar": "hu-HU",
    "Google română": "ro-RO",
    "Google slovenčina": "sk-SK",
    "Google українська": "uk-UA",
    "Google български": "bg-BG",
    "Google eesti": "et-EE",
    "Google latviešu": "lv-LV",
    "Google lietuvių": "lt-LT",
    "Google slovenščina": "sl-SI",
    "Google hrvatski": "hr-HR",
    "Google српски": "sr-RS",
    "Google македонски": "mk-MK",
    "Google shqip": "sq-AL",
    "Google bosanski": "bs-BA",
    "Google català": "ca-ES",
    "Google euskera": "eu-ES",
    "Google galego": "gl-ES",
    "Google עברית": "he-IL",
    "Google ไทย": "th-TH",
    "Google tiếng Việt": "vi-VN",
    "Google Bahasa Indonesia": "id-ID",
    "Google Bahasa Melayu": "ms-MY",
    "Google Filipino": "fil-PH",
    "Google தமிழ்": "ta-IN",
    "Google తెలుగు": "te-IN",
    "Google বাংলা": "bn-IN",
    "Google ગુજરાતી": "gu-IN",
    "Google ಕನ್ನಡ": "kn-IN",
    "Google മലയാളം": "ml-IN",
    "Google ਪੰਜਾਬੀ": "pa-IN",
    "Google اردو": "ur-PK",
    "Google فارسی": "fa-IR",
    "Google Kiswahili": "sw-KE",
    "Google Afrikaans": "af-ZA",
    "Google Amharic": "am-ET",
    "Google isiZulu": "zu-ZA",
    "Google Sesotho": "st-ZA",
    "Google Setswana": "tn-ZA",
    "Google isiXhosa": "xh-ZA",
    "Google Yoruba": "yo-NG",
    "Google Igbo": "ig-NG",
    "Google Hausa": "ha-NG"
  };
  return map[voiceName] || 'pt-BR';
};

interface UseSpeechOptions {
  lang?: string;
  rate?: number;
  pitch?: number;
  volume?: number;
  onProgress?: (progress: number) => void;
  onSentenceStart?: (sentence: string, index: number) => void;
  onSentenceEnd?: (sentence: string, index: number) => void;
}

interface SpeechVoice {
  name: string;
  lang: string;
  localService: boolean;
  default: boolean;
  voiceURI: string;
}

interface UseSpeechReturn {
  speak: (text: string, language?: string) => void;
  speakSentence: (sentence: string, index: number) => void;
  stop: () => void;
  pause: () => void;
  resume: () => void;
  skipToNext: () => void;
  skipToPrevious: () => void;
  setRate: (rate: number) => void;
  setPitch: (pitch: number) => void;
  setVolume: (volume: number) => void;
  setVoice: (voiceIndex: number) => void;
  setLanguage: (language: string) => void;
  speaking: boolean;
  paused: boolean;
  supported: boolean;
  availableVoices: SpeechVoice[];
  currentSentence: number;
  totalSentences: number;
  progress: number;
  currentSettings: {
    rate: number;
    pitch: number;
    volume: number;
    voiceIndex: number;
    language: string;
  };
  getSelectedVoiceName: () => string;
  getSelectedVoiceLanguage: () => string;
}

export const useSpeech = (options: UseSpeechOptions = {}): UseSpeechReturn => {
  const {
    lang = 'pt-BR',
    rate: initialRate = 0.9,
    pitch: initialPitch = 1,
    volume: initialVolume = 1,
    onProgress,
    onSentenceStart,
    onSentenceEnd
  } = options;

  const [speaking, setSpeaking] = useState(false);
  const [paused, setPaused] = useState(false);
  const [supported, setSupported] = useState(false);
  const [availableVoices, setAvailableVoices] = useState<SpeechVoice[]>([]);
  const [currentSentence, setCurrentSentence] = useState(0);
  const [totalSentences, setTotalSentences] = useState(0);
  const [progress, setProgress] = useState(0);
  const [currentSettings, setCurrentSettings] = useState({
    rate: initialRate,
    pitch: initialPitch,
    volume: initialVolume,
    voiceIndex: 0,
    language: lang
  });

  const sentencesRef = useRef<string[]>([]);
  const currentUtteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Inicializar vozes disponíveis
  useEffect(() => {
    const initializeVoices = () => {
      if ('speechSynthesis' in window) {
        setSupported(true);
        const voices = window.speechSynthesis.getVoices();
        const formattedVoices = voices
          .filter(voice => voice.lang.startsWith('pt') || voice.lang.startsWith('en') || voice.lang.startsWith('es') || voice.lang.startsWith('fr'))
          .map(voice => ({
            name: voice.name,
            lang: voice.lang,
            localService: voice.localService,
            default: voice.default,
            voiceURI: voice.voiceURI
          }));
        setAvailableVoices(formattedVoices);
      }
    };

    initializeVoices();
    
    // Algumas vezes as vozes não estão disponíveis imediatamente
    if (window.speechSynthesis) {
      window.speechSynthesis.onvoiceschanged = initializeVoices;
    }
  }, []);

  const splitIntoSentences = useCallback((text: string): string[] => {
    // Dividir por pontos, exclamações e interrogações, mas manter contexto
    const sentences = text
      .split(/(?<=[.!?])\s+/)
      .map(sentence => sentence.trim())
      .filter(sentence => sentence.length > 0);
    
    return sentences;
  }, []);

  const speakSentence = useCallback((sentence: string, index: number) => {
    if (!supported) return;

    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(sentence);
    utterance.lang = currentSettings.language;
    utterance.rate = currentSettings.rate;
    utterance.pitch = currentSettings.pitch;
    utterance.volume = currentSettings.volume;

    // Definir voz se disponível
    if (availableVoices.length > 0 && currentSettings.voiceIndex < availableVoices.length) {
      const voices = window.speechSynthesis.getVoices();
      const selectedVoice = voices.find(voice => 
        voice.voiceURI === availableVoices[currentSettings.voiceIndex].voiceURI
      );
      if (selectedVoice) {
        utterance.voice = selectedVoice;
      }
    }

    utterance.onstart = () => {
      setSpeaking(true);
      setPaused(false);
      setCurrentSentence(index);
      onSentenceStart?.(sentence, index);
    };

    utterance.onend = () => {
      onSentenceEnd?.(sentence, index);
      
      // Avançar para próxima sentença automaticamente
      if (index < sentencesRef.current.length - 1) {
        timeoutRef.current = setTimeout(() => {
          speakSentence(sentencesRef.current[index + 1], index + 1);
        }, 200);
      } else {
        setSpeaking(false);
        setCurrentSentence(0);
        setProgress(0);
      }
    };

    utterance.onerror = () => {
      setSpeaking(false);
      setPaused(false);
    };

    // Simular progresso baseado na duração estimada
    utterance.onboundary = (event) => {
      if (event.name === 'word') {
        const newProgress = ((index + 1) / sentencesRef.current.length) * 100;
        setProgress(newProgress);
        onProgress?.(newProgress);
      }
    };

    currentUtteranceRef.current = utterance;
    window.speechSynthesis.speak(utterance);
  }, [supported, currentSettings, availableVoices, onSentenceStart, onSentenceEnd, onProgress]);

  const speak = useCallback((text: string, language?: string) => {
    if (!supported) {
      console.warn('Speech Synthesis não é suportado neste navegador');
      return;
    }

    // Atualizar idioma se fornecido
    if (language && language !== currentSettings.language) {
      setCurrentSettings(prev => ({ ...prev, language }));
    }

    const sentences = splitIntoSentences(text);
    sentencesRef.current = sentences;
    setTotalSentences(sentences.length);
    setCurrentSentence(0);
    setProgress(0);

    if (sentences.length > 0) {
      // Usar o idioma fornecido ou o atual
      const speechLanguage = language || currentSettings.language;
      speakSentence(sentences[0], 0);
    }
  }, [supported, splitIntoSentences, speakSentence, currentSettings.language]);

  const stop = useCallback(() => {
    if (supported) {
      window.speechSynthesis.cancel();
      setSpeaking(false);
      setPaused(false);
      setCurrentSentence(0);
      setProgress(0);
      
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    }
  }, [supported]);

  const pause = useCallback(() => {
    if (supported && speaking) {
      window.speechSynthesis.pause();
      setPaused(true);
    }
  }, [supported, speaking]);

  const resume = useCallback(() => {
    if (supported && paused) {
      window.speechSynthesis.resume();
      setPaused(false);
    }
  }, [supported, paused]);

  const skipToNext = useCallback(() => {
    if (currentSentence < sentencesRef.current.length - 1) {
      window.speechSynthesis.cancel();
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      speakSentence(sentencesRef.current[currentSentence + 1], currentSentence + 1);
    }
  }, [currentSentence, speakSentence]);

  const skipToPrevious = useCallback(() => {
    if (currentSentence > 0) {
      window.speechSynthesis.cancel();
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      speakSentence(sentencesRef.current[currentSentence - 1], currentSentence - 1);
    }
  }, [currentSentence, speakSentence]);

  const setRate = useCallback((rate: number) => {
    setCurrentSettings(prev => ({ ...prev, rate }));
  }, []);

  const setPitch = useCallback((pitch: number) => {
    setCurrentSettings(prev => ({ ...prev, pitch }));
  }, []);

  const setVolume = useCallback((volume: number) => {
    setCurrentSettings(prev => ({ ...prev, volume }));
  }, []);

  const setVoice = useCallback((voiceIndex: number) => {
    setCurrentSettings(prev => ({ ...prev, voiceIndex }));
  }, []);

  const setLanguage = useCallback((language: string) => {
    setCurrentSettings(prev => ({ ...prev, language }));
  }, []);

  // Obter nome da voz selecionada
  const getSelectedVoiceName = useCallback(() => {
    const currentVoice = availableVoices[currentSettings.voiceIndex];
    return currentVoice ? currentVoice.name : 'Voz padrão';
  }, [availableVoices, currentSettings.voiceIndex]);

  // Obter idioma da voz selecionada usando mapeamento
  const getSelectedVoiceLanguage = useCallback(() => {
    const currentVoice = availableVoices[currentSettings.voiceIndex];
    return currentVoice ? getLangFromVoiceName(currentVoice.name) : 'pt-BR';
  }, [availableVoices, currentSettings.voiceIndex]);

  // Limpar recursos quando o componente é desmontado
  useEffect(() => {
    return () => {
      if (supported) {
        window.speechSynthesis.cancel();
      }
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [supported]);

  return {
    speak,
    speakSentence,
    stop,
    pause,
    resume,
    skipToNext,
    skipToPrevious,
    setRate,
    setPitch,
    setVolume,
    setVoice,
    setLanguage,
    speaking,
    paused,
    supported,
    availableVoices,
    currentSentence,
    totalSentences,
    progress,
    currentSettings,
    getSelectedVoiceName,
    getSelectedVoiceLanguage
  };
};