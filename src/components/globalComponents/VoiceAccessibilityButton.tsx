import React, { useCallback, useState, useEffect } from 'react';
import { 
  Volume2, VolumeX, Play, Pause, Square, SkipForward, SkipBack,
  Settings, Mic, Volume1, VolumeOff, ChevronUp, ChevronDown,
  RotateCcw, Activity, Clock, Headphones, Sliders, Globe, Loader
} from 'lucide-react';
import { useTranslation as useI18nextTranslation } from 'react-i18next';
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
  
  // ⚠️ i18n integration: Using i18next for interface translations
  const { t, i18n } = useI18nextTranslation();
  const currentLanguage = i18n.language || 'pt-BR';

  // Função para mapear nome da voz para código de idioma
  const getLangFromVoiceName = useCallback((voiceName: string): string => {
    const map: Record<string, string> = {
      "Google US English": "en-US",
      "Google UK English Female": "en-GB",
      "Google UK English Male": "en-GB",
      "Google español": "es-ES",
      "Google español de Estados Unidos": "es-US",
      "Google français": "fr-FR",
      "Google português do Brasil": "pt-BR",
      "Microsoft Daniel - Portuguese (Brazil)": "pt-BR",
      "Microsoft Zira - English (United States)": "en-US",
      "Microsoft Mark - English (United States)": "en-US",
      "Microsoft David - English (United States)": "en-US",
      "Microsoft Maria - Portuguese (Brazil)": "pt-BR",
    };
    return map[voiceName] || "pt-BR";
  }, []);

  const {
    speak, stop, pause, resume, skipToNext, skipToPrevious,
    setRate, setPitch, setVolume, setVoice, setLanguage,
    speaking, paused, supported, availableVoices,
    currentSentence, totalSentences, progress, currentSettings
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
    optimizeForSpeech, // ⚠️ i18n integration: New function for speech optimization
    isTranslating,
    getPageLanguage,
    getUserLanguage,
    needsTranslation,
    clearCache,
    getCurrentLanguage
  } = useTranslation({
    targetLanguage: currentLanguage // ⚠️ i18n integration: Use current i18n language
  });

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
      let speechLanguage = currentLanguage; // ⚠️ i18n integration: Use current i18n language as default

      // Obter idioma da voz selecionada
      const selectedVoice = availableVoices[currentSettings.voiceIndex];
      if (selectedVoice) {
        speechLanguage = getLangFromVoiceName(selectedVoice.name);
      }

      // ⚠️ i18n integration: Always use i18n.language for translation and speech
      setTranslationStatus('translating');
      
      // Optimize text for speech with translation to i18n language
      finalText = await optimizeForSpeech(cleanText, currentLanguage);
      
      setTranslationStatus('ready');

      setCurrentText(finalText);
      setReadingHistory(prev => [finalText, ...prev.slice(0, 4)]); // Manter últimas 5
      
      // ⚠️ i18n integration: Configure language and voice based on i18n
      setLanguage(currentLanguage);
      
      speak(finalText, currentLanguage);
      
    } catch (error) {
      console.error('Translation error:', error);
      // ⚠️ i18n integration: Fallback to original text with current i18n language
      setCurrentText(cleanText);
      speak(cleanText, currentLanguage);
    } finally {
      setTranslationStatus('idle');
    }
  }, [extractTextContent, speak, speaking, isTranslating, autoTranslationEnabled, 
      optimizeForSpeech, currentLanguage, getLangFromVoiceName, availableVoices, 
      currentSettings.voiceIndex, setLanguage]); // ⚠️ i18n integration: Updated dependencies

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
        <p className="text-sm">{t('voice.browserNotSupported')}</p>
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
          aria-label={speaking ? t('voice.stopReading') : t('voice.startReading')}
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
                {t('voice.voiceAndTranslation')}
                {(translationStatus !== 'idle' || isTranslating) && (
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Loader size={12} className="animate-spin" />
                    {translationStatus === 'detecting' && t('voice.detecting')}
                    {translationStatus === 'translating' && t('voice.translating')}
                    {translationStatus === 'ready' && t('voice.ready')}
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
                  title={autoTranslationEnabled ? t('voice.autoTranslationActive') : t('voice.autoTranslationDisabled')}
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
                <span>{t('voice.sentence')} {currentSentence + 1} {t('voice.of')} {totalSentences}</span>
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
              {currentSettings.language !== 'pt-BR' && (
               <div className="text-xs text-muted-foreground mt-1">
                 {t('voice.language')}: {availableVoices[currentSettings.voiceIndex]?.name || currentSettings.language}
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
              aria-label={t('voice.previousSentence')}
            >
              <SkipBack size={16} />
            </button>
            
            {speaking ? (
              <>
                {paused ? (
                  <button
                    onClick={resume}
                    className="p-3 rounded-lg bg-jazz-gold text-black hover:bg-jazz-gold/80"
                    aria-label={t('voice.resumeReading')}
                  >
                    <Play size={20} />
                  </button>
                ) : (
                  <button
                    onClick={pause}
                    className="p-3 rounded-lg bg-jazz-gold text-black hover:bg-jazz-gold/80"
                    aria-label={t('voice.pauseReading')}
                  >
                    <Pause size={20} />
                  </button>
                )}
                <button
                  onClick={stop}
                  className="p-2 rounded-lg bg-destructive text-destructive-foreground hover:bg-destructive/80"
                  aria-label={t('voice.stopReading')}
                >
                  <Square size={16} />
                </button>
              </>
            ) : (
              <button
                onClick={handleStartReading}
                disabled={speaking || isTranslating || translationStatus !== 'idle'}
                className="p-3 rounded-lg bg-jazz-gold text-black hover:bg-jazz-gold/80 disabled:opacity-50 flex items-center gap-2"
                aria-label={t('voice.startReading')}
              >
                {isTranslating || translationStatus !== 'idle' ? (
                  <>
                    <Loader size={20} className="animate-spin" />
                    <span className="text-sm">
                     {translationStatus === 'detecting' && t('voice.detecting')}
                     {translationStatus === 'translating' && t('voice.translating')}
                     {translationStatus === 'ready' && t('voice.ready')}
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
              aria-label={t('voice.nextSentence')}
            >
              <SkipForward size={16} />
            </button>
          </div>

          {/* Controles de Áudio */}
          <div className="space-y-3 mb-4">
            {/* Velocidade */}
            <div>
               <label className="text-sm text-muted-foreground mb-1 block">
                 {t('voice.speed')}: {currentSettings.rate.toFixed(1)}x
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
                 {t('voice.pitch')}: {currentSettings.pitch.toFixed(1)}
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
                 {t('voice.volume')}: {Math.round(currentSettings.volume * 100)}%
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
               <label className="text-xs text-muted-foreground mb-1 block">
                 {t('voice.voiceSelection')}
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
            {autoTranslationEnabled && currentSettings.language !== 'pt-BR' && (
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