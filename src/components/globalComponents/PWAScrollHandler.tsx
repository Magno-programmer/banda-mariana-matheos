import { useEffect } from 'react';

// Extend Navigator interface for iOS standalone detection
declare global {
  interface Navigator {
    standalone?: boolean;
  }
}

const PWAScrollHandler = () => {
  useEffect(() => {
    // Detectar se está rodando como PWA
    const isPWA = () => {
      return (
        window.matchMedia('(display-mode: standalone)').matches ||
        (window.navigator as any).standalone === true ||
        document.referrer.includes('android-app://') ||
        window.location.search.includes('source=pwa')
      );
    };

    const setupPWAScroll = () => {
      if (isPWA()) {
        // Adicionar classe para PWA standalone
        document.documentElement.classList.add('pwa-standalone');
        document.body.classList.add('pwa-standalone');
        
        // Configurar scroll suave para PWA
        document.documentElement.style.scrollBehavior = 'smooth';
        document.body.style.overflowX = 'hidden';
        document.body.style.overscrollBehavior = 'none';
        
        // Configurar o root container
        const root = document.getElementById('root');
        if (root) {
          root.style.height = '100vh';
          root.style.overflowY = 'auto';
          root.style.overflowX = 'hidden';
          (root.style as any).webkitOverflowScrolling = 'touch';
        }

        // Prevenir zoom em inputs no iOS PWA
        const viewport = document.querySelector('meta[name=viewport]');
        if (viewport) {
          viewport.setAttribute('content', 
            'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover'
          );
        }

        // Configurar CSS customizado para PWA
        const style = document.createElement('style');
        style.textContent = `
          .pwa-standalone html {
            height: 100%;
            overflow: hidden;
          }
          
          .pwa-standalone body {
            height: 100vh;
            overflow: hidden;
            position: fixed;
            width: 100%;
          }
          
          .pwa-standalone #root {
            height: 100vh;
            overflow-y: auto;
            overflow-x: hidden;
            -webkit-overflow-scrolling: touch;
            scroll-behavior: smooth;
            position: relative;
          }
          
          /* Melhor scrollbar para PWA */
          .pwa-standalone #root::-webkit-scrollbar {
            width: 8px;
          }
          
          .pwa-standalone #root::-webkit-scrollbar-track {
            background: rgba(0, 0, 0, 0.1);
            border-radius: 4px;
          }
          
          .pwa-standalone #root::-webkit-scrollbar-thumb {
            background: linear-gradient(180deg, #e3bd68 0%, #d4a853 100%);
            border-radius: 4px;
          }
          
          .pwa-standalone #root::-webkit-scrollbar-thumb:hover {
            background: linear-gradient(180deg, #d4a853 0%, #c49943 100%);
          }
          
          /* Touch optimization */
          .pwa-standalone * {
            touch-action: pan-y;
          }
          
          .pwa-standalone button, 
          .pwa-standalone a, 
          .pwa-standalone input, 
          .pwa-standalone textarea, 
          .pwa-standalone select {
            touch-action: manipulation;
          }
          
          /* iOS specific fixes */
          @supports (-webkit-touch-callout: none) {
            .pwa-standalone body {
              height: -webkit-fill-available;
            }
            
            .pwa-standalone #root {
              height: -webkit-fill-available;
            }
          }
        `;
        
        document.head.appendChild(style);
        
        console.log('✅ PWA Scroll otimizado configurado!');
      } else {
        console.log('ℹ️ Rodando no navegador - scroll padrão mantido');
      }
    };

    // Configurar imediatamente
    setupPWAScroll();

    // Escutar mudanças de display-mode
    const mediaQuery = window.matchMedia('(display-mode: standalone)');
    const handleChange = (e: MediaQueryListEvent) => {
      if (e.matches) {
        setupPWAScroll();
      }
    };

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange);
    } else {
      // Fallback para navegadores mais antigos
      mediaQuery.addListener(handleChange);
    }

    // Cleanup
    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener('change', handleChange);
      } else {
        mediaQuery.removeListener(handleChange);
      }
    };
  }, []);

  return null; // Este componente não renderiza nada
};

export default PWAScrollHandler;
