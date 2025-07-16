import { useState, useEffect, useCallback, useMemo } from 'react';
import { debounce } from '../lib/utils';

// Tipos avançados de dispositivos
export type DeviceType = 'minimobile' | 'mobile' | 'minitablet' | 'tablet' | 'desktop' | 'foldable' | 'tv' | 'watch';
export type Orientation = 'portrait' | 'landscape' | 'square';
export type DisplayMode = 'browser' | 'standalone' | 'minimal-ui' | 'fullscreen';

export interface ViewportConfig {
  width: number;
  height: number;
  devicePixelRatio: number;
  orientation: Orientation;
  deviceType: DeviceType;
  displayMode: DisplayMode;
  safeArea: {
    top: number;
    right: number;
    bottom: number;
    left: number;
  };
  notchSupport: boolean;
  foldableState?: 'folded' | 'unfolded' | 'half-folded';
  hdrSupport: boolean;
  maxTouchPoints: number;
}

export interface ViewportBreakpoints {
  minimobile: number;
  mobile: number;
  minitablet: number;
  tablet: number;
  desktop: number;
  largeDesktop: number;
}

export interface AdvancedViewportState {
  config: ViewportConfig;
  breakpoints: ViewportBreakpoints;
  isMiniMobile: boolean;
  isMobile: boolean;
  isMiniTablet: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  isLargeDesktop: boolean;
  isTouch: boolean;
  isRetina: boolean;
  isLandscape: boolean;
  isPortrait: boolean;
  isStandalone: boolean;
  hasNotch: boolean;
  isFoldable: boolean;
  cssVariables: Record<string, string>;
}

const DEFAULT_BREAKPOINTS: ViewportBreakpoints = {
  minimobile: 472,
  mobile: 560,
  minitablet: 800,
  tablet: 1074,
  desktop: 1440,
  largeDesktop: 1920,
};

// Detecta tipo de dispositivo avançado
const detectDeviceType = (width: number, height: number, touchPoints: number): DeviceType => {
  const minDimension = Math.min(width, height);
  const maxDimension = Math.max(width, height);
  
  // Detecta dispositivos foldáveis
  if (
    (maxDimension > 2000 && minDimension < 1000) ||
    (width > 1800 && height < 900) ||
    CSS.supports('(screen-spanning: single-fold-horizontal)') ||
    CSS.supports('(screen-spanning: single-fold-vertical)')
  ) {
    return 'foldable';
  }
  
  // Detecta TV/Display grande
  if (minDimension >= 1920) {
    return 'tv';
  }
  
  // Detecta smartwatch
  if (maxDimension <= 500 && touchPoints > 0) {
    return 'watch';
  }
  
  // Detecta mobile
  if (minDimension < DEFAULT_BREAKPOINTS.mobile) {
    return 'mobile';
  }

  // Detecta minimobile
  if (minDimension < DEFAULT_BREAKPOINTS.minimobile) {
    return 'minimobile';
  }
  
  // Detecta minitablet
  if (minDimension < DEFAULT_BREAKPOINTS.tablet && touchPoints > 0) {
    return 'minitablet';
  }

  // Detecta tablet
  if (minDimension < DEFAULT_BREAKPOINTS.desktop && touchPoints > 0) {
    return 'tablet';
  }
  
  return 'desktop';
};

// Detecta orientação avançada
const detectOrientation = (width: number, height: number): Orientation => {
  const ratio = width / height;
  if (Math.abs(ratio - 1) < 0.1) return 'square';
  return width > height ? 'landscape' : 'portrait';
};

// Detecta modo de exibição
const detectDisplayMode = (): DisplayMode => {
  if (window.matchMedia('(display-mode: standalone)').matches) return 'standalone';
  if (window.matchMedia('(display-mode: minimal-ui)').matches) return 'minimal-ui';
  if (window.matchMedia('(display-mode: fullscreen)').matches) return 'fullscreen';
  return 'browser';
};

// Detecta Safe Areas (iOS notch, Android cutouts)
const detectSafeArea = () => {
  const getEnvValue = (prop: string): number => {
    const value = CSS.supports(`padding: env(${prop})`) ? 
      parseInt(getComputedStyle(document.documentElement).getPropertyValue(`env(${prop})`)) || 0 : 0;
    return value;
  };

  return {
    top: getEnvValue('safe-area-inset-top'),
    right: getEnvValue('safe-area-inset-right'),
    bottom: getEnvValue('safe-area-inset-bottom'),
    left: getEnvValue('safe-area-inset-left'),
  };
};

// Detecta estado de dispositivo foldável
const detectFoldableState = (): 'folded' | 'unfolded' | 'half-folded' | undefined => {
  if (!CSS.supports('(screen-spanning: single-fold-horizontal)') && 
      !CSS.supports('(screen-spanning: single-fold-vertical)')) {
    return undefined;
  }
  
  // Lógica simplificada - na prática seria mais complexa
  const aspectRatio = window.innerWidth / window.innerHeight;
  if (aspectRatio > 2.5) return 'unfolded';
  if (aspectRatio > 1.5) return 'half-folded';
  return 'folded';
};

// Gera CSS variables dinâmicas
const generateCSSVariables = (config: ViewportConfig): Record<string, string> => {
  const { width, height, safeArea, devicePixelRatio } = config;
  
  return {
    '--viewport-width': `${width}px`,
    '--viewport-height': `${height}px`,
    '--viewport-width-vw': '100vw',
    '--viewport-height-vh': '100vh',
    '--viewport-width-svw': '100svw',
    '--viewport-height-svh': '100svh',
    '--viewport-width-lvw': '100lvw',
    '--viewport-height-lvh': '100lvh',
    '--viewport-width-dvw': '100dvw',
    '--viewport-height-dvh': '100dvh',
    '--safe-area-inset-top': `${safeArea.top}px`,
    '--safe-area-inset-right': `${safeArea.right}px`,
    '--safe-area-inset-bottom': `${safeArea.bottom}px`,
    '--safe-area-inset-left': `${safeArea.left}px`,
    '--device-pixel-ratio': devicePixelRatio.toString(),
    '--content-width': `${width - safeArea.left - safeArea.right}px`,
    '--content-height': `${height - safeArea.top - safeArea.bottom}px`,
  };
};

// Hook principal
export const useAdvancedViewport = (customBreakpoints?: Partial<ViewportBreakpoints>) => {
  const breakpoints = useMemo(() => ({
    ...DEFAULT_BREAKPOINTS,
    ...customBreakpoints,
  }), [customBreakpoints]);

  const [viewportState, setViewportState] = useState<AdvancedViewportState>(() => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const devicePixelRatio = window.devicePixelRatio || 1;
    const orientation = detectOrientation(width, height);
    const deviceType = detectDeviceType(width, height, navigator.maxTouchPoints);
    const displayMode = detectDisplayMode();
    const safeArea = detectSafeArea();
    const foldableState = detectFoldableState();
    const hdrSupport = window.matchMedia('(dynamic-range: high)').matches;
    const maxTouchPoints = navigator.maxTouchPoints || 0;

    const config: ViewportConfig = {
      width,
      height,
      devicePixelRatio,
      orientation,
      deviceType,
      displayMode,
      safeArea,
      notchSupport: safeArea.top > 0 || safeArea.left > 0,
      foldableState,
      hdrSupport,
      maxTouchPoints,
    };

    const cssVariables = generateCSSVariables(config);

    return {
      config,
      breakpoints,
      isMiniMobile: width < breakpoints.minimobile,
      isMobile: width < breakpoints.mobile,
      isMiniTablet: width >= breakpoints.mobile && width < breakpoints.tablet,
      isTablet: width >= breakpoints.mobile && width < breakpoints.desktop,
      isDesktop: width >= breakpoints.desktop && width < breakpoints.largeDesktop,
      isLargeDesktop: width >= breakpoints.largeDesktop,
      isTouch: maxTouchPoints > 0,
      isRetina: devicePixelRatio >= 2,
      isLandscape: orientation === 'landscape',
      isPortrait: orientation === 'portrait',
      isStandalone: displayMode === 'standalone',
      hasNotch: safeArea.top > 0 || safeArea.left > 0,
      isFoldable: deviceType === 'foldable',
      cssVariables,
    };
  });

  // Função para atualizar viewport
  const updateViewport = useCallback(() => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const devicePixelRatio = window.devicePixelRatio || 1;
    const orientation = detectOrientation(width, height);
    const deviceType = detectDeviceType(width, height, navigator.maxTouchPoints);
    const displayMode = detectDisplayMode();
    const safeArea = detectSafeArea();
    const foldableState = detectFoldableState();
    const hdrSupport = window.matchMedia('(dynamic-range: high)').matches;
    const maxTouchPoints = navigator.maxTouchPoints || 0;

    const config: ViewportConfig = {
      width,
      height,
      devicePixelRatio,
      orientation,
      deviceType,
      displayMode,
      safeArea,
      notchSupport: safeArea.top > 0 || safeArea.left > 0,
      foldableState,
      hdrSupport,
      maxTouchPoints,
    };

    const cssVariables = generateCSSVariables(config);

    setViewportState({
      config,
      breakpoints,
      isMiniMobile: width < breakpoints.minimobile,
      isMobile: width < breakpoints.mobile,
      isMiniTablet: width >= breakpoints.mobile && width < breakpoints.tablet,
      isTablet: width >= breakpoints.mobile && width < breakpoints.desktop,
      isDesktop: width >= breakpoints.desktop && width < breakpoints.largeDesktop,
      isLargeDesktop: width >= breakpoints.largeDesktop,
      isTouch: maxTouchPoints > 0,
      isRetina: devicePixelRatio >= 2,
      isLandscape: orientation === 'landscape',
      isPortrait: orientation === 'portrait',
      isStandalone: displayMode === 'standalone',
      hasNotch: safeArea.top > 0 || safeArea.left > 0,
      isFoldable: deviceType === 'foldable',
      cssVariables,
    });
  }, [breakpoints]);

  // Debounced update para performance
  const debouncedUpdate = useMemo(
    () => debounce(updateViewport, 16), // 60fps
    [updateViewport]
  );

  // Effect para listeners
  useEffect(() => {
    const handleResize = () => debouncedUpdate();
    const handleOrientationChange = () => {
      // Delay para aguardar mudança completa
      setTimeout(debouncedUpdate, 100);
    };

    window.addEventListener('resize', handleResize, { passive: true });
    window.addEventListener('orientationchange', handleOrientationChange, { passive: true });
    
    // Listeners para mudanças de display mode
    const mediaQueries = [
      window.matchMedia('(display-mode: standalone)'),
      window.matchMedia('(display-mode: minimal-ui)'),
      window.matchMedia('(display-mode: fullscreen)'),
    ];

    mediaQueries.forEach(mq => {
      mq.addEventListener('change', debouncedUpdate);
    });

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleOrientationChange);
      mediaQueries.forEach(mq => {
        mq.removeEventListener('change', debouncedUpdate);
      });
    };
  }, [debouncedUpdate]);

  return viewportState;
};


// Hook simplificado para compatibilidade
export const useIsMiniMobile = () => {
  const { isMiniMobile } = useAdvancedViewport();
  return isMiniMobile;
}

// Hook simplificado para compatibilidade
export const useIsMobile = () => {
  const { isMobile } = useAdvancedViewport();
  return isMobile;
};

// Hook simplificado para compatibilidade
export const useIsMiniTablet = () => {
  const { isMiniTablet } = useAdvancedViewport();
  return isMiniTablet;
}

// Hook simplificado para compatibilidade
export const useIsTablet = () => {
  const { isTablet } = useAdvancedViewport();
  return isTablet;
}

// Hook simplificado para compatibilidade
export const useIsDesktop = () => {
  const { isDesktop } = useAdvancedViewport();
  return isDesktop;
}

// Hook simplificado para compatibilidade
export const useIsLargeDesktop = () => {
  const { isLargeDesktop } = useAdvancedViewport();
  return isLargeDesktop;
}

export default useAdvancedViewport;