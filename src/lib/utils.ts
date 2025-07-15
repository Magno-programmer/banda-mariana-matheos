import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Função debounce para performance
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;
  
  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

// Função throttle para performance
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;
  
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

// Função para detectar se é um dispositivo touch
export function isTouchDevice(): boolean {
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
}

// Função para obter informações do dispositivo
export function getDeviceInfo() {
  const userAgent = navigator.userAgent;
  const platform = navigator.platform;
  
  return {
    userAgent,
    platform,
    isMobile: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent),
    isIOS: /iPad|iPhone|iPod/.test(userAgent),
    isAndroid: /Android/.test(userAgent),
    isSafari: /^((?!chrome|android).)*safari/i.test(userAgent),
    isChrome: /Chrome/.test(userAgent),
    isFirefox: /Firefox/.test(userAgent),
    touchPoints: navigator.maxTouchPoints || 0,
    devicePixelRatio: window.devicePixelRatio || 1,
  };
}

// Função para formatear valores de viewport
export function formatViewportValue(value: number, unit: 'px' | 'em' | 'rem' | 'vw' | 'vh' = 'px'): string {
  return `${value}${unit}`;
}

// Função para calcular breakpoints responsivos
export function calculateBreakpoint(width: number, breakpoints: Record<string, number>): string {
  const sortedBreakpoints = Object.entries(breakpoints)
    .sort(([, a], [, b]) => a - b);
  
  for (const [name, value] of sortedBreakpoints) {
    if (width < value) {
      return name;
    }
  }
  
  return sortedBreakpoints[sortedBreakpoints.length - 1][0];
}

// Função para detectar orientação preferida
export function getPreferredOrientation(): 'portrait' | 'landscape' | null {
  if (screen.orientation) {
    return screen.orientation.angle === 0 || screen.orientation.angle === 180 ? 'portrait' : 'landscape';
  }
  
  if (window.matchMedia('(orientation: portrait)').matches) {
    return 'portrait';
  }
  
  if (window.matchMedia('(orientation: landscape)').matches) {
    return 'landscape';
  }
  
  return null;
}

// Função para detectar se suporta hover
export function supportsHover(): boolean {
  return window.matchMedia('(hover: hover)').matches;
}

// Função para detectar se suporta pointer fino
export function supportsFinePointer(): boolean {
  return window.matchMedia('(pointer: fine)').matches;
}

// Função para detectar preferência de movimento reduzido
export function prefersReducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

// Função para detectar se prefere tema escuro
export function prefersDarkMode(): boolean {
  return window.matchMedia('(prefers-color-scheme: dark)').matches;
}

// Função para detectar se prefere alto contraste
export function prefersHighContrast(): boolean {
  return window.matchMedia('(prefers-contrast: high)').matches;
}

// Função para detectar capacidades de display
export function getDisplayCapabilities() {
  return {
    hdr: window.matchMedia('(dynamic-range: high)').matches,
    wideGamut: window.matchMedia('(color-gamut: p3)').matches,
    highRefreshRate: (screen as any).refreshRate ? (screen as any).refreshRate > 60 : false,
  };
}
