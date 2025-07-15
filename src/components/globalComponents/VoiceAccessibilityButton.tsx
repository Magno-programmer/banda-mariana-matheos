import React, { useCallback } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { useSpeech } from '@/hooks/useSpeech';

interface VoiceAccessibilityButtonProps {
  contentSelector?: string;
  className?: string;
}

const VoiceAccessibilityButton: React.FC<VoiceAccessibilityButtonProps> = ({
  contentSelector = '#main-content',
  className = ''
}) => {
  const { speak, stop, speaking, supported } = useSpeech({
    lang: 'pt-BR',
    rate: 0.9,
    pitch: 1,
    volume: 1
  });

  const extractTextContent = useCallback(() => {
    const mainContent = document.querySelector(contentSelector);
    if (!mainContent) {
      // Fallback: pega o conteúdo do body excluindo header, footer e scripts
      const body = document.body.cloneNode(true) as HTMLElement;
      
      // Remove elementos desnecessários
      const elementsToRemove = [
        'header', 'nav', 'footer', 'script', 'style', 
        '.header', '.nav', '.footer', '[role="navigation"]'
      ];
      
      elementsToRemove.forEach(selector => {
        const elements = body.querySelectorAll(selector);
        elements.forEach(el => el.remove());
      });
      
      return body.textContent || body.innerText || '';
    }
    
    return mainContent.textContent || (mainContent as HTMLElement).innerText || '';
  }, [contentSelector]);

  const handleToggleSpeech = useCallback(() => {
    if (speaking) {
      stop();
    } else {
      const textContent = extractTextContent();
      if (textContent.trim()) {
        // Limpa o texto removendo quebras de linha excessivas e espaços
        const cleanText = textContent
          .replace(/\s+/g, ' ')
          .replace(/\n+/g, '. ')
          .trim();
        
        speak(cleanText);
      }
    }
  }, [speaking, stop, extractTextContent, speak]);

  const handleKeyDown = useCallback((event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleToggleSpeech();
    }
  }, [handleToggleSpeech]);

  if (!supported) {
    return null; // Não renderiza o botão se o navegador não suporta
  }

  return (
    <button
      type="button"
      onClick={handleToggleSpeech}
      onKeyDown={handleKeyDown}
      className={`
        inline-flex items-center gap-2 px-4 py-2 
        bg-jazz-gold text-black hover:bg-jazz-gold/80 
        focus:bg-jazz-gold/80 focus:outline-none focus:ring-2 
        focus:ring-jazz-gold focus:ring-offset-2 focus:ring-offset-background
        transition-all duration-300 rounded-md font-medium text-sm
        shadow-lg hover:shadow-xl transform hover:scale-105
        ${speaking ? 'animate-pulse' : ''}
        ${className}
      `}
      aria-label={speaking ? 'Parar leitura da página' : 'Ouvir conteúdo desta página'}
      aria-pressed={speaking}
      tabIndex={0}
    >
      {speaking ? (
        <>
          <VolumeX size={18} aria-hidden="true" />
          <span>Parar Leitura</span>
        </>
      ) : (
        <>
          <Volume2 size={18} aria-hidden="true" />
          <span>Ouvir esta página</span>
        </>
      )}
    </button>
  );
};

export default VoiceAccessibilityButton;