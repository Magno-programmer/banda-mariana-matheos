import { useState, useEffect, useCallback } from 'react';

interface UseSpeechOptions {
  lang?: string;
  rate?: number;
  pitch?: number;
  volume?: number;
}

interface UseSpeechReturn {
  speak: (text: string) => void;
  stop: () => void;
  pause: () => void;
  resume: () => void;
  speaking: boolean;
  supported: boolean;
}

export const useSpeech = (options: UseSpeechOptions = {}): UseSpeechReturn => {
  const {
    lang = 'pt-BR',
    rate = 0.9,
    pitch = 1,
    volume = 1
  } = options;

  const [speaking, setSpeaking] = useState(false);
  const [supported, setSupported] = useState(false);

  useEffect(() => {
    setSupported('speechSynthesis' in window);
  }, []);

  const speak = useCallback((text: string) => {
    if (!supported) {
      console.warn('Speech Synthesis não é suportado neste navegador');
      return;
    }

    // Para qualquer fala em andamento
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    utterance.rate = rate;
    utterance.pitch = pitch;
    utterance.volume = volume;

    utterance.onstart = () => setSpeaking(true);
    utterance.onend = () => setSpeaking(false);
    utterance.onerror = () => setSpeaking(false);

    window.speechSynthesis.speak(utterance);
  }, [supported, lang, rate, pitch, volume]);

  const stop = useCallback(() => {
    if (supported) {
      window.speechSynthesis.cancel();
      setSpeaking(false);
    }
  }, [supported]);

  const pause = useCallback(() => {
    if (supported) {
      window.speechSynthesis.pause();
    }
  }, [supported]);

  const resume = useCallback(() => {
    if (supported) {
      window.speechSynthesis.resume();
    }
  }, [supported]);

  // Para a fala quando o componente é desmontado ou a página muda
  useEffect(() => {
    return () => {
      if (supported) {
        window.speechSynthesis.cancel();
      }
    };
  }, [supported]);

  return {
    speak,
    stop,
    pause,
    resume,
    speaking,
    supported
  };
};