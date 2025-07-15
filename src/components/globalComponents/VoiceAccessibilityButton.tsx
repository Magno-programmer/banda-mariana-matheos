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
    clearCache
  } = useTranslation({ 
    targetLanguage: 'pt-BR',
    enableMetrics: true,
    enablePersistentCache: true,
    qualityThreshold: 0.8,
    chunkStrategy: 'smart'
  });


  // Verificar se precisa traduzir baseado na voz selecionada
  const needsTranslationForVoice = useCallback((pageLanguage: string, voiceLanguage: string) => {
    const normalizeLanguage = (lang: string) => lang.toLowerCase().split('-')[0];
    const pageLang = normalizeLanguage(pageLanguage);
    const voiceLang = normalizeLanguage(voiceLanguage);
    return pageLang !== voiceLang;
  }, []);

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
      const selectedVoiceLanguage = getSelectedVoiceLanguage();
      const pageLanguage = getPageLanguage();
      
      // Verificar se precisa traduzir baseado na voz selecionada
      const needsTranslation = autoTranslationEnabled && needsTranslationForVoice(pageLanguage, selectedVoiceLanguage);
      
      if (needsTranslation) {
        setTranslationStatus('translating');
        
        try {
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
      getSelectedVoiceLanguage, needsTranslationForVoice, getPageLanguage, 
      translateText, optimizeForSpeech, setLanguage, getSelectedVoiceName]);

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
  }, [currentSettings.voiceIndex, availableVoices, getSelectedVoiceLanguage]);

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
                    {translationStatus === 'translating' && 'Traduzindo...'}
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
                  {autoTranslationEnabled && (
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
              {getSelectedVoiceLanguage() !== 'pt-BR' && (
                <div className="text-xs text-muted-foreground mt-1">
                  Voz: {getSelectedVoiceName()}
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
                      {translationStatus === 'translating' && 'Traduzindo...'}
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
                  {getSelectedVoiceLanguage() !== 'pt-BR' && autoTranslationEnabled && '🌐 Tradução ativa'}
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
              {getSelectedVoiceLanguage() !== 'pt-BR' && autoTranslationEnabled && (
                <div className="text-xs text-muted-foreground mt-1">
                  O texto será traduzido para {getSelectedVoiceName()}
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
            {autoTranslationEnabled && getSelectedVoiceLanguage() !== 'pt-BR' && (
              <Globe size={12} className="text-jazz-gold"  />
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