// Performance utility functions

export const measurePerformance = (name: string, fn: () => void | Promise<void>) => {
  const start = performance.now();
  const result = fn();
  
  if (result instanceof Promise) {
    return result.finally(() => {
      const duration = performance.now() - start;
      console.log(`⏱️ ${name}: ${Math.round(duration)}ms`);
    });
  } else {
    const duration = performance.now() - start;
    console.log(`⏱️ ${name}: ${Math.round(duration)}ms`);
    return result;
  }
};

export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout;
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle: boolean;
  
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

export const preloadImage = (src: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = reject;
    img.src = src;
  });
};

export const getCriticalResourcesForPage = (pathname: string) => {
  const baseCritical = [
    '/GatsbyFLF.ttf',
    '/GatsbyFLF-Bold.ttf',
    '/glimmer-of-light.otf',
  ];

  const pageSpecific: Record<string, string[]> = {
    '/': [
      '/images/Logo-Mariana-Matheos-Jazz-textura-dourada-fundo-transparente.avif',
      '/images/banda-de-jazz-1920.avif',
    ],
    '/sobre': [
      '/images/mariana-matheos-essencia.avif',
    ],
    '/fotos': [
      '/images/banda.avif',
      '/images/cantora.avif',
    ],
    '/videos': [
      '/images/banda-blue-jazz-concurso.avif',
    ],
  };

  return [...baseCritical, ...(pageSpecific[pathname] || [])];
};

export const getPreconnectDomains = () => [
  'https://fonts.googleapis.com',
  'https://fonts.gstatic.com',
  'https://www.google-analytics.com',
  'https://www.googletagmanager.com',
];

export const getPrefetchPages = (currentPath: string) => {
  const allPages = [
    '/',
    '/sobre',
    '/repertorio',
    '/fotos',
    '/videos',
    '/depoimentos',
    '/faq',
    '/contatos',
    '/agendamento',
  ];

  return allPages.filter(page => page !== currentPath).slice(0, 3);
};

export const getWebVitalsThresholds = () => ({
  LCP: { good: 1200, needsImprovement: 2500 },
  FID: { good: 100, needsImprovement: 300 },
  CLS: { good: 0.1, needsImprovement: 0.25 },
  FCP: { good: 900, needsImprovement: 1800 },
  TTFB: { good: 200, needsImprovement: 500 },
});

export const generatePerformanceReport = () => {
  const vitalsHistory = JSON.parse(localStorage.getItem('webVitalsHistory') || '[]');
  const thresholds = getWebVitalsThresholds();
  
  const report = Object.keys(thresholds).reduce((acc, metric) => {
    const entries = vitalsHistory.filter((entry: any) => entry.name === metric);
    if (entries.length === 0) return acc;

    const latest = entries[entries.length - 1];
    const threshold = thresholds[metric as keyof typeof thresholds];
    
    acc[metric] = {
      value: latest.value,
      rating: latest.rating,
      isGood: latest.value <= threshold.good,
      needsImprovement: latest.value > threshold.good && latest.value <= threshold.needsImprovement,
      isPoor: latest.value > threshold.needsImprovement,
    };
    
    return acc;
  }, {} as Record<string, any>);

  return report;
};