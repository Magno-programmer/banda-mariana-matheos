import React, { useCallback, useState, useEffect } from 'react';
import { 
  Volume2, VolumeX, Play, Pause, Square, SkipForward, SkipBack,
  Settings, Mic, Volume1, VolumeOff, ChevronUp, ChevronDown,
  RotateCcw, Activity, Clock, Headphones, Sliders, Globe, Loader
} from 'lucide-react';
import { useSpeech } from '@/hooks/useSpeech';
import { useTranslation } from '@/hooks/useTranslation';

interface VoiceAccessibilityButtonProps {
  contentSelector?: string;
  className?: string;
  position?: 'top-right' | 'bottom-right' | 'top-left' | 'bottom-left';
  compact?: boolean;
  autoTranslate?: boolean;
}

const VoiceAccessibilityButton: React.FC<VoiceAccessibilityButtonProps> = ({
  contentSelector = '#main-content',
  className = '',
  position = 'bottom-left',
  compact = false,
  autoTranslate = true
}) => {
  const [showControls, setShowControls] = useState(false);
  const [currentText, setCurrentText] = useState('');
  const [readingHistory, setReadingHistory] = useState<string[]>([]);
  const [bookmarks, setBookmarks] = useState<{sentence: string, timestamp: Date}[]>([]);
  const [autoTranslationEnabled, setAutoTranslationEnabled] = useState(autoTranslate);
  const [translationStatus, setTranslationStatus] = useState<'idle' | 'detecting' | 'translating' | 'ready'>('idle');
  const [selectedVoiceLanguage, setSelectedVoiceLanguage] = useState<string>('pt-BR');
  const [pageTranslated, setPageTranslated] = useState(false);
  const [originalPageContent, setOriginalPageContent] = useState<Map<Element, string>>(new Map());
  const [showTranslatedContent, setShowTranslatedContent] = useState(false);

  const {
    speak, stop, pause, resume, skipToNext, skipToPrevious,
    setRate, setPitch, setVolume, setVoice, setLanguage,
    speaking, paused, supported, availableVoices,
    currentSentence, totalSentences, progress, currentSettings,
    getSelectedVoiceName, getSelectedVoiceLanguage
  } = useSpeech({
    lang: 'pt-BR',
    rate: 0.9,
    pitch: 1,
    volume: 1,
    onProgress: (prog) => {
      // Callback para atualizar progresso visual
    },
    onSentenceStart: (sentence, index) => {
      // Highlight da sentença atual
      highlightCurrentSentence(sentence);
    },
    onSentenceEnd: (sentence, index) => {
      // Log da sentença finalizada
    }
  });

  const extractTextContent = useCallback(() => {
    const mainContent = document.querySelector(contentSelector);
    if (!mainContent) {
      const body = document.body.cloneNode(true) as HTMLElement;
      
      const elementsToRemove = [
        'header', 'nav', 'footer', 'script', 'style', 
        '.header', '.nav', '.footer', '[role="navigation"]',
        '[aria-hidden="true"]', '.sr-only'
      ];
      
      elementsToRemove.forEach(selector => {
        const elements = body.querySelectorAll(selector);
        elements.forEach(el => el.remove());
      });
      
      return body.textContent || body.innerText || '';
    }
    
    return mainContent.textContent || (mainContent as HTMLElement).innerText || '';
  }, [contentSelector]);

  const highlightCurrentSentence = useCallback((sentence: string) => {
    // Remove highlights anteriores
    document.querySelectorAll('.voice-highlight').forEach(el => {
      el.classList.remove('voice-highlight');
    });

    // Destacar a sentença atual visualmente (implementação básica)
    const content = document.querySelector(contentSelector);
    if (content && sentence.length > 10) {
      const walker = document.createTreeWalker(
        content,
        NodeFilter.SHOW_TEXT,
        null
      );

      let node;
      while (node = walker.nextNode()) {
        if (node.textContent?.includes(sentence.substring(0, 20))) {
          const parent = node.parentElement;
          if (parent) {
            parent.classList.add('voice-highlight');
            parent.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
          break;
        }
      }
    }
  }, [contentSelector]);

  const {
    translateText,
    isTranslating,
    getPageLanguage,
    optimizeForSpeech,
    getLanguageNativeName,
    getSupportedLanguages,
    getTranslationMetrics,
    detectLanguage,
    clearCache,
    translateDOMElement
  } = useTranslation({
    targetLanguage: 'pt-BR',
    enableMetrics: true,
    enablePersistentCache: true,
    qualityThreshold: 0.8,
    chunkStrategy: 'smart'
  });


  // Função para mapear nome da voz para código de idioma
  const getLangFromVoiceName = useCallback((voiceName: string): string => {
    const map: Record<string, string> = {
      "Microsoft Daniel - Portuguese (Brazil)": "pt-BR",
      "Microsoft Maria - Portuguese (Brazil)": "pt-BR",
      "Microsoft Mark - English (United States)": "en-US",
      "Microsoft Zira - English (United States)": "en-US",
      "Microsoft David - English (United States)": "en-US",
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
  }, []);

  // Verificar se precisa traduzir baseado na voz selecionada
  const needsTranslationForVoice = useCallback((pageLanguage: string, voiceLanguage: string) => {
    const normalizeLanguage = (lang: string) => lang.toLowerCase().split('-')[0];
    const pageLang = normalizeLanguage(pageLanguage);
    const voiceLang = normalizeLanguage(voiceLanguage);
    return pageLang !== voiceLang;
  }, []);

  // Traduzir página dinamicamente
  const translatePageContent = useCallback(async (targetLanguage: string) => {
    if (!autoTranslationEnabled) return;

    setTranslationStatus('translating');
    
    try {
      const elementsToTranslate = document.querySelectorAll('h1, h2, h3, h4, h5, h6, p, span, div, a, button, label');
      const translatedElements = new Map<Element, string>();
      
      for (const element of Array.from(elementsToTranslate)) {
        const textContent = (element as HTMLElement).textContent?.trim();
        if (textContent && textContent.length > 3 && textContent.length < 500) {
          // Salvar conteúdo original
          if (!originalPageContent.has(element)) {
            originalPageContent.set(element, textContent);
          }
          
          try {
            const translatedText = await translateText(textContent, targetLanguage, { priority: 'speed' });
            translatedElements.set(element, translatedText);
          } catch (error) {
            console.warn('Failed to translate element:', error);
          }
        }
      }
      
      // Aplicar traduções
      translatedElements.forEach((translatedText, element) => {
        (element as HTMLElement).textContent = translatedText;
      });
      
      setPageTranslated(true);
      setShowTranslatedContent(true);
      setTranslationStatus('ready');
    } catch (error) {
      console.error('Page translation error:', error);
      setTranslationStatus('idle');
    }
  }, [autoTranslationEnabled, translateText, originalPageContent]);

  // Restaurar conteúdo original da página
  const restorePageContent = useCallback(() => {
    originalPageContent.forEach((originalText, element) => {
      (element as HTMLElement).textContent = originalText;
    });
    setPageTranslated(false);
    setShowTranslatedContent(false);
  }, [originalPageContent]);

  const handleStartReading = useCallback(async () => {
    // Prevent multiple simultaneous readings
    if (speaking || isTranslating) {
      return;
    }
    
    setTranslationStatus('detecting');
    
    const textContent = extractTextContent();
    if (!textContent.trim()) {
      setTranslationStatus('idle');
      return;
    }

    const cleanText = textContent
      .replace(/\s+/g, ' ')
      .replace(/\n+/g, '. ')
      .replace(/\[.*?\]/g, '') // Remove elementos entre colchetes
      .trim();

    try {
      let finalText = cleanText;
      const selectedVoiceName = getSelectedVoiceName();
      const selectedVoiceLanguage = getLangFromVoiceName(selectedVoiceName);
      const pageLanguage = getPageLanguage();
      
      // Verificar se precisa traduzir baseado na voz selecionada
      const needsTranslation = autoTranslationEnabled && needsTranslationForVoice(pageLanguage, selectedVoiceLanguage);
      
      if (needsTranslation) {
        setTranslationStatus('translating');
        
        try {
          // Traduzir a página visualmente primeiro
          await translatePageContent(selectedVoiceLanguage);
          
          // Traduzir para o idioma da voz selecionada
          finalText = await translateText(cleanText, selectedVoiceLanguage);
          
          // Otimizar para fala
          finalText = await optimizeForSpeech(finalText, selectedVoiceLanguage);
          
          setTranslationStatus('ready');
        } catch (translationError) {
          console.warn('Translation failed, using original text:', translationError);
          // Fallback para texto original se tradução falhar
          finalText = cleanText;
          setTranslationStatus('ready');
        }
      } else {
        setTranslationStatus('ready');
      }

      setCurrentText(finalText);
      setReadingHistory(prev => [finalText, ...prev.slice(0, 4)]); // Manter últimas 5
      
      // Configurar idioma para a voz selecionada
      setLanguage(selectedVoiceLanguage);
      
      speak(finalText, selectedVoiceLanguage);
      
    } catch (error) {
      console.error('Reading error:', error);
      // Fallback para texto original com pt-BR
      setCurrentText(cleanText);
      setLanguage('pt-BR');
      speak(cleanText, 'pt-BR');
    } finally {
      setTranslationStatus('idle');
    }
  }, [extractTextContent, speak, speaking, isTranslating, autoTranslationEnabled, 
      getSelectedVoiceName, getLangFromVoiceName, needsTranslationForVoice, getPageLanguage, 
      translateText, optimizeForSpeech, setLanguage, translatePageContent]);

  const handleAddBookmark = useCallback(() => {
    if (speaking && currentText) {
      const sentences = currentText.split(/(?<=[.!?])\s+/);
      const currentSentenceText = sentences[currentSentence] || '';
      
      setBookmarks(prev => [...prev, {
        sentence: currentSentenceText,
        timestamp: new Date()
      }]);
    }
  }, [speaking, currentText, currentSentence]);

  const getVolumeIcon = () => {
    if (currentSettings.volume === 0) return VolumeOff;
    if (currentSettings.volume < 0.5) return Volume1;
    return Volume2;
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Monitorar mudanças na voz selecionada
  useEffect(() => {
    const currentVoiceLanguage = getSelectedVoiceLanguage();
    setSelectedVoiceLanguage(currentVoiceLanguage);
    
    // Restaurar conteúdo original quando trocar de voz
    if (pageTranslated) {
      restorePageContent();
    }
  }, [currentSettings.voiceIndex, availableVoices, getSelectedVoiceLanguage, pageTranslated, restorePageContent]);
  
  // Limpar tradução quando parar de falar
  useEffect(() => {
    if (!speaking && pageTranslated) {
      const timer = setTimeout(() => {
        restorePageContent();
      }, 2000); // Manter tradução por 2 segundos após parar
      
      return () => clearTimeout(timer);
    }
  }, [speaking, pageTranslated, restorePageContent]);

  // Efeito para adicionar CSS de highlight
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      .voice-highlight {
        background-color: hsl(var(--jazz-gold) / 0.3) !important;
        border-radius: 4px;
        padding: 2px 4px;
        transition: all 0.3s ease;
        animation: pulse 2s infinite;
      }
      @keyframes pulse {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.7; }
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
      document.querySelectorAll('.voice-highlight').forEach(el => {
        el.classList.remove('voice-highlight');
      });
    };
  }, []);

  if (!supported) {
    return (
      <div className="fixed bottom-4 left-4 bg-red-500 text-white p-3 rounded-lg shadow-lg">
        <p className="text-sm">Seu navegador não suporta síntese de voz</p>
      </div>
    );
  }

  const positionClasses = {
    'top-right': 'top-4 right-4',
    'bottom-right': 'bottom-4 right-4',
    'top-left': 'top-4 left-4',
    'bottom-left': 'bottom-4 left-4'
  };

  if (compact) {
    return (
        <button
          type="button"
          onClick={() => speaking ? stop() : handleStartReading()}
          disabled={(speaking && !paused) || isTranslating || translationStatus !== 'idle'}
          className={`
            fixed ${positionClasses[position]} z-50
            w-12 h-12 bg-jazz-gold text-black rounded-full
            flex items-center justify-center shadow-lg
            hover:bg-jazz-gold/80 transition-all duration-300
            hover:scale-110 focus:outline-none focus:ring-2 focus:ring-jazz-gold
            ${speaking ? 'animate-pulse' : ''}
            disabled:opacity-50 disabled:cursor-not-allowed
            ${className}
          `}
          aria-label={speaking ? 'Parar leitura' : 'Iniciar leitura da página'}
        >
          {isTranslating || translationStatus !== 'idle' ? (
            <Loader size={20} className="animate-spin" aria-hidden="true" />
          ) : speaking ? (
            <Square size={20} aria-hidden="true" />
          ) : (
            <Play size={20} aria-hidden="true" />
          )}
        </button>
    );
  }

  return (
    <div className={`fixed ${positionClasses[position]} z-50 ${className}`}>
      {/* Painel de Controles Avançados */}
      {showControls && (
        <div className="absolute bottom-16 left-0 w-80 bg-background border border-border rounded-lg shadow-2xl p-4 mb-2">
          {/* Header do Painel */}
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-lg flex items-center gap-2">
                <Headphones size={16} />
                Controles de Voz
                {(translationStatus !== 'idle' || isTranslating) && (
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Loader size={12} className="animate-spin" />
                    {translationStatus === 'detecting' && 'Detectando idioma...'}
                    {translationStatus === 'translating' && 'Traduzindo página...'}
                    {translationStatus === 'ready' && 'Pronto'}
                  </div>
                )}
              </h3>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setAutoTranslationEnabled(!autoTranslationEnabled)}
                  className={`p-1 rounded transition-colors ${
                    autoTranslationEnabled 
                      ? 'bg-jazz-gold text-black' 
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                  title={autoTranslationEnabled ? 'Tradução automática ativa' : 'Tradução automática desativada'}
                >
                  <Globe size={14} />
                </button>
                <button
                  onClick={() => setShowControls(false)}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <ChevronDown size={16} />
                </button>
              </div>
            </div>

          {/* Progresso e Informações */}
          {speaking && (
            <div className="mb-4 p-3 bg-muted rounded-lg">
              <div className="flex items-center justify-between text-lg text-muted-foreground mb-2">
                <span>Sentença {currentSentence + 1} de {totalSentences}</span>
                <div className="flex items-center gap-2">
              {autoTranslationEnabled && getLangFromVoiceName(getSelectedVoiceName()) !== 'pt-BR' && (
                <Globe size={12} className="text-jazz-gold" />
              )}
              <span>{Math.round(progress)}%</span>
                </div>
              </div>
              <div className="w-full bg-background rounded-full h-2">
                <div 
                  className="bg-jazz-gold h-2 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
              {getLangFromVoiceName(getSelectedVoiceName()) !== 'pt-BR' && (
                <div className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                  <Globe size={10} />
                  Voz: {getSelectedVoiceName()}
                  {showTranslatedContent && (
                    <span className="text-jazz-gold">• Página traduzida</span>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Controles de Reprodução */}
          <div className="flex items-center justify-center gap-2 mb-4">
            <button
              onClick={skipToPrevious}
              disabled={currentSentence === 0}
              className="p-2 rounded-lg bg-muted hover:bg-muted/80 disabled:opacity-50"
              aria-label="Sentença anterior"
            >
              <SkipBack size={16} />
            </button>
            
            {speaking ? (
              <>
                {paused ? (
                  <button
                    onClick={resume}
                    className="p-3 rounded-lg bg-jazz-gold text-black hover:bg-jazz-gold/80"
                    aria-label="Continuar leitura"
                  >
                    <Play size={20} />
                  </button>
                ) : (
                  <button
                    onClick={pause}
                    className="p-3 rounded-lg bg-jazz-gold text-black hover:bg-jazz-gold/80"
                    aria-label="Pausar leitura"
                  >
                    <Pause size={20} />
                  </button>
                )}
                <button
                  onClick={stop}
                  className="p-2 rounded-lg bg-destructive text-destructive-foreground hover:bg-destructive/80"
                  aria-label="Parar leitura"
                >
                  <Square size={16} />
                </button>
              </>
            ) : (
              <button
                onClick={handleStartReading}
                disabled={speaking || isTranslating || translationStatus !== 'idle'}
                className="p-3 rounded-lg bg-jazz-gold text-black hover:bg-jazz-gold/80 disabled:opacity-50 flex items-center gap-2"
                aria-label="Iniciar leitura"
              >
                {isTranslating || translationStatus !== 'idle' ? (
                  <>
                    <Loader size={20} className="animate-spin" />
                    <span className="text-sm">
                  {translationStatus === 'detecting' && 'Detectando...'}
                  {translationStatus === 'translating' && 'Traduzindo página...'}
                  {translationStatus === 'ready' && 'Pronto'}
                    </span>
                  </>
                ) : (
                  <Play size={20} />
                )}
              </button>
            )}

            <button
              onClick={skipToNext}
              disabled={currentSentence >= totalSentences - 1}
              className="p-2 rounded-lg bg-muted hover:bg-muted/80 disabled:opacity-50"
              aria-label="Próxima sentença"
            >
              <SkipForward size={16} />
            </button>
          </div>

          {/* Controles de Áudio */}
          <div className="space-y-3 mb-4">
            {/* Velocidade */}
            <div>
              <label className="text-sm text-muted-foreground mb-1 block">
                Velocidade: {currentSettings.rate.toFixed(1)}x
              </label>
              <input
                type="range"
                min="0.1"
                max="2"
                step="0.1"
                value={currentSettings.rate}
                onChange={(e) => setRate(parseFloat(e.target.value))}
                className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer"
              />
            </div>

            {/* Tom */}
            <div>
              <label className="text-sm text-muted-foreground mb-1 block">
                Tom: {currentSettings.pitch.toFixed(1)}
              </label>
              <input
                type="range"
                min="0"
                max="2"
                step="0.1"
                value={currentSettings.pitch}
                onChange={(e) => setPitch(parseFloat(e.target.value))}
                className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer"
              />
            </div>

            {/* Volume */}
            <div>
              <label className="text-sm text-muted-foreground mb-1 block flex items-center gap-1">
                {React.createElement(getVolumeIcon(), { size: 12 })}
                Volume: {Math.round(currentSettings.volume * 100)}%
              </label>
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={currentSettings.volume}
                onChange={(e) => setVolume(parseFloat(e.target.value))}
                className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer"
              />
            </div>
          </div>

          {/* Seleção de Voz */}
          {availableVoices.length > 0 && (
            <div className="mb-4">
              <label className="text-xs text-muted-foreground mb-1 block flex items-center justify-between">
                <span>Voz</span>
                <span className="text-xs text-jazz-gold">
                  {getLangFromVoiceName(getSelectedVoiceName()) !== 'pt-BR' && autoTranslationEnabled && '🌐 Tradução ativa'}
                </span>
              </label>
              <select
                value={currentSettings.voiceIndex}
                onChange={(e) => setVoice(parseInt(e.target.value))}
                className="w-full p-2 bg-muted border border-border rounded text-sm"
              >
                {availableVoices.map((voice, index) => (
                  <option key={voice.voiceURI} value={index}>
                    {voice.name}
                  </option>
                ))}
              </select>
              {getLangFromVoiceName(getSelectedVoiceName()) !== 'pt-BR' && autoTranslationEnabled && (
                <div className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                  <Globe size={10} />
                  O texto será traduzido para {getSelectedVoiceName()}
                  {showTranslatedContent && (
                    <span className="text-jazz-gold">• Página já traduzida</span>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Ações Extras */}
          <div className="flex gap-2 mb-4">
            <button
              onClick={handleAddBookmark}
              disabled={!speaking}
              className="flex-1 p-2 bg-muted hover:bg-muted/80 disabled:opacity-50 rounded text-xs flex items-center justify-center gap-1"
              aria-label="Adicionar marcador"
            >
              <Activity size={12} />
              Marcar
            </button>
            <button
              onClick={() => setReadingHistory([])}
              className="flex-1 p-2 bg-muted hover:bg-muted/80 rounded text-xs flex items-center justify-center gap-1"
              aria-label="Limpar histórico"
            >
              <RotateCcw size={12} />
              Limpar
            </button>
            <button
              onClick={clearCache}
              className="flex-1 p-2 bg-muted hover:bg-muted/80 rounded text-xs flex items-center justify-center gap-1"
              aria-label="Limpar cache de tradução"
              title="Limpar cache de traduções"
            >
              <Globe size={12} />
              Cache
            </button>
          </div>

          {/* Controle de Tradução da Página */}
          {getLangFromVoiceName(getSelectedVoiceName()) !== 'pt-BR' && autoTranslationEnabled && (
            <div className="mb-4 p-3 bg-muted rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <h5 className="text-xs font-medium flex items-center gap-1">
                  <Globe size={12} />
                  Tradução da Página
                </h5>
                <span className={`text-xs px-2 py-1 rounded ${
                  showTranslatedContent ? 'bg-jazz-gold text-black' : 'bg-background'
                }`}>
                  {showTranslatedContent ? 'Ativa' : 'Inativa'}
                </span>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => translatePageContent(getLangFromVoiceName(getSelectedVoiceName()))}
                  disabled={isTranslating || translationStatus === 'translating'}
                  className="flex-1 p-2 bg-jazz-gold text-black rounded text-xs hover:bg-jazz-gold/80 disabled:opacity-50 flex items-center justify-center gap-1"
                >
                  {isTranslating ? (
                    <Loader size={10} className="animate-spin" />
                  ) : (
                    <Globe size={10} />
                  )}
                  Traduzir
                </button>
                <button
                  onClick={restorePageContent}
                  disabled={!showTranslatedContent}
                  className="flex-1 p-2 bg-background border border-border rounded text-xs hover:bg-muted disabled:opacity-50 flex items-center justify-center gap-1"
                >
                  <RotateCcw size={10} />
                  Original
                </button>
              </div>
            </div>
          )}

          {/* Histórico de Leitura */}
          {readingHistory.length > 0 && (
            <div className="mt-4 pt-4 border-t border-border">
              <h4 className="text-xs text-muted-foreground mb-2 flex items-center gap-1">
                <Clock size={12} />
                Histórico Recente
              </h4>
              <div className="space-y-1 max-h-20 overflow-y-auto">
                {readingHistory.slice(0, 3).map((text, index) => (
                  <button
                    key={index}
                    onClick={() => !speaking && speak(text)}
                    disabled={speaking}
                    className="w-full text-left text-xs p-2 bg-muted hover:bg-muted/80 rounded truncate disabled:opacity-50"
                  >
                    {text.substring(0, 50)}...
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Botão Principal */}
      <div className="flex items-center gap-2">
        {speaking && (
          <div className="bg-background border border-border rounded-lg p-2 flex items-center gap-2 text-sm">
            <div className="w-2 h-2 bg-jazz-gold rounded-full animate-pulse" />
            <span className="text-muted-foreground">
              {currentSentence + 1}/{totalSentences}
            </span>
            {autoTranslationEnabled && getLangFromVoiceName(getSelectedVoiceName()) !== 'pt-BR' && (
              <Globe size={12} className="text-jazz-gold" />
            )}
          </div>
        )}

        <button
          type="button"
          onClick={() => setShowControls(!showControls)}
          className={`
            p-3 bg-jazz-gold text-black rounded-lg shadow-lg
            hover:bg-jazz-gold/80 transition-all duration-300
            hover:scale-105 focus:outline-none focus:ring-2 focus:ring-jazz-gold
            flex items-center gap-2
            ${speaking ? 'animate-pulse' : ''}
          `}
          aria-label="Abrir controles de voz"
          aria-expanded={showControls}
        >
          {speaking ? (
            <>
              <Volume2 size={20} aria-hidden="true" />
              {!showControls && <span className="text-sm font-medium">Lendo...</span>}
            </>
          ) : (
            <>
              <Sliders size={20} aria-hidden="true" />
              {!showControls && <span className="text-sm font-medium">Voz</span>}
            </>
          )}
          <ChevronUp 
            size={16} 
            className={`transition-transform ${showControls ? 'rotate-180' : ''}`}
            aria-hidden="true" 
          />
        </button>
      </div>
    </div>
  );
};

export default VoiceAccessibilityButton;