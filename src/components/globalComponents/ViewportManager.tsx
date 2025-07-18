import { useEffect, useRef } from 'react';
import { useAdvancedViewport } from '../../hooks/useAdvancedViewport';

interface ViewportManagerProps {
  children?: React.ReactNode;
  enableDynamicViewport?: boolean;
  customBreakpoints?: {
    mobile?: number;
    tablet?: number;
    desktop?: number;
    largeDesktop?: number;
  };
}

export const ViewportManager: React.FC<ViewportManagerProps> = ({
  children,
  enableDynamicViewport = false, // Disabled by default to prevent CLS
  customBreakpoints,
}) => {
  const viewportState = useAdvancedViewport(customBreakpoints);
  const metaViewportRef = useRef<HTMLMetaElement | null>(null);
  const previousConfigRef = useRef<string>('');
  const lastUpdateRef = useRef<number>(0);

  // Função para gerar viewport meta tag dinâmica
  const generateViewportContent = () => {
    const { config } = viewportState;
    let content = 'width=device-width, initial-scale=1.0';

    // Otimizações específicas por tipo de dispositivo
    switch (config.deviceType) {
      case 'mobile':
        content += ', user-scalable=no, viewport-fit=cover';
        break;
      case 'tablet':
        content += ', user-scalable=yes, minimum-scale=0.5, maximum-scale=3.0';
        break;
      case 'foldable':
        content += ', user-scalable=yes, viewport-fit=cover';
        break;
      case 'desktop':
        content += ', user-scalable=yes';
        break;
      case 'tv':
        content += ', user-scalable=no, initial-scale=1.0';
        break;
      case 'watch':
        content += ', user-scalable=no, viewport-fit=cover';
        break;
    }

    // Ajustes para dispositivos com notch
    if (config.notchSupport) {
      content += ', viewport-fit=cover';
    }

    // Ajustes para modo standalone (PWA)
    if (config.displayMode === 'standalone') {
      content += ', viewport-fit=cover';
    }

    // Ajustes para orientação
    if (config.orientation === 'landscape' && config.deviceType === 'mobile') {
      content += ', user-scalable=no';
    }

    return content;
  };

  // Aplica CSS variables no documento
  useEffect(() => {
    const root = document.documentElement;
    
    Object.entries(viewportState.cssVariables).forEach(([property, value]) => {
      root.style.setProperty(property, value);
    });

    // Adiciona classes utilitárias no body
    const body = document.body;
    body.classList.remove(
      'device-mobile', 'device-tablet', 'device-desktop', 'device-foldable',
      'orientation-portrait', 'orientation-landscape',
      'display-standalone', 'display-fullscreen',
      'has-notch', 'is-retina', 'is-touch'
    );

    body.classList.add(
      `device-${viewportState.config.deviceType}`,
      `orientation-${viewportState.config.orientation}`,
      `display-${viewportState.config.displayMode}`
    );

    if (viewportState.hasNotch) body.classList.add('has-notch');
    if (viewportState.isRetina) body.classList.add('is-retina');
    if (viewportState.isTouch) body.classList.add('is-touch');
    if (viewportState.isFoldable) body.classList.add('is-foldable');

    return () => {
      Object.keys(viewportState.cssVariables).forEach(property => {
        root.style.removeProperty(property);
      });
    };
  }, [viewportState]);

  // Gerencia viewport meta tag dinâmica com throttling
  useEffect(() => {
    if (!enableDynamicViewport) return;

    const now = Date.now();
    // Throttle updates para evitar CLS excessivo
    if (now - lastUpdateRef.current < 200) return;
    lastUpdateRef.current = now;

    const newViewportContent = generateViewportContent();
    const configString = JSON.stringify(viewportState.config);
    
    // Evita updates desnecessários
    if (configString === previousConfigRef.current) return;
    previousConfigRef.current = configString;

    // Encontra ou cria meta viewport
    let metaViewport = document.querySelector('meta[name="viewport"]') as HTMLMetaElement;
    
    if (!metaViewport) {
      metaViewport = document.createElement('meta');
      metaViewport.name = 'viewport';
      document.head.appendChild(metaViewport);
    }

    metaViewport.content = newViewportContent;
    metaViewportRef.current = metaViewport;

    // Adiciona meta tags específicas para dispositivos foldáveis
    if (viewportState.isFoldable) {
      let foldableMeta = document.querySelector('meta[name="viewport-fold"]') as HTMLMetaElement;
      if (!foldableMeta) {
        foldableMeta = document.createElement('meta');
        foldableMeta.name = 'viewport-fold';
        document.head.appendChild(foldableMeta);
      }
      foldableMeta.content = `state=${viewportState.config.foldableState}`;
    }

    // Adiciona theme-color dinâmico baseado no dispositivo
    let themeColorMeta = document.querySelector('meta[name="theme-color"]') as HTMLMetaElement;
    if (themeColorMeta) {
      // Mantém a cor original mas ajusta para diferentes modos
      const originalColor = '#800000';
      let themeColor = originalColor;
      
      if (viewportState.config.displayMode === 'standalone') {
        themeColor = originalColor; // Mantém a cor original no modo standalone
      } else if (viewportState.config.deviceType === 'mobile') {
        themeColor = originalColor; // Mantém consistência no mobile
      }
      
      themeColorMeta.content = themeColor;
    }

  }, [viewportState, enableDynamicViewport]);

  // Adiciona styles CSS específicos para Safe Areas
  useEffect(() => {
    const styleId = 'viewport-manager-styles';
    let styleElement = document.getElementById(styleId) as HTMLStyleElement;
    
    if (!styleElement) {
      styleElement = document.createElement('style');
      styleElement.id = styleId;
      document.head.appendChild(styleElement);
    }

    styleElement.textContent = `
      :root {
        /* Unidades viewport modernas */
        --viewport-small-width: 100svw;
        --viewport-small-height: 100svh;
        --viewport-large-width: 100lvw;
        --viewport-large-height: 100lvh;
        --viewport-dynamic-width: 100dvw;
        --viewport-dynamic-height: 100dvh;
      }

      /* CSS Containment para evitar CLS */
      .layout-contained { contain: layout style paint; }
      .content-contained { contain: layout style; }
      
      /* Safe area paddings para dispositivos com notch */
      .safe-area-inset-top { padding-top: env(safe-area-inset-top, 0px); }
      .safe-area-inset-right { padding-right: env(safe-area-inset-right, 0px); }
      .safe-area-inset-bottom { padding-bottom: env(safe-area-inset-bottom, 0px); }
      .safe-area-inset-left { padding-left: env(safe-area-inset-left, 0px); }
      .safe-area-inset-all { 
        padding: env(safe-area-inset-top, 0px) env(safe-area-inset-right, 0px) env(safe-area-inset-bottom, 0px) env(safe-area-inset-left, 0px); 
      }

      /* Otimizações específicas para dispositivos foldáveis */
      @media (screen-spanning: single-fold-vertical) {
        .foldable-main-content {
          flex: 1;
          overflow: hidden;
        }
      }

      @media (screen-spanning: single-fold-horizontal) {
        .foldable-main-content {
          height: 50vh;
          overflow-y: auto;
        }
      }

      /* Otimizações para modo standalone (PWA) */
      @media (display-mode: standalone) {
        body {
          -webkit-user-select: none;
          user-select: none;
        }
        
        input, textarea, [contenteditable] {
          -webkit-user-select: auto;
          user-select: auto;
        }
      }

      /* Ajustes para dispositivos com alta densidade de pixels */
      @media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {
        .retina-optimized {
          image-rendering: -webkit-optimize-contrast;
          image-rendering: crisp-edges;
        }
      }
    `;

    return () => {
      if (styleElement && styleElement.parentNode) {
        styleElement.parentNode.removeChild(styleElement);
      }
    };
  }, []);

  return <>{children}</>;
};

export default ViewportManager;