import { useState, useEffect, useCallback, useRef } from 'react';

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
    currentSettings
  };
};