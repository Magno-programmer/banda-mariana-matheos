import { useEffect } from 'react';

interface CriticalCSSProps {
  criticalCSS?: string;
  nonCriticalCSS?: string[];
}

const CriticalCSS: React.FC<CriticalCSSProps> = ({
  criticalCSS,
  nonCriticalCSS = [],
}) => {
  useEffect(() => {
    // Preload critical fonts
    const preloadFont = (fontPath: string, fontDisplay = 'swap') => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.href = fontPath;
      link.as = 'font';
      link.type = 'font/ttf';
      link.crossOrigin = 'anonymous';
      // Font display is set via CSS, not DOM property
      document.head.appendChild(link);
    };

    // Preload essential fonts
    preloadFont('/GatsbyFLF.ttf');
    preloadFont('/GatsbyFLF-Bold.ttf');
    preloadFont('/glimmer-of-light.otf');

    // Lazy load non-critical CSS
    const loadNonCriticalCSS = () => {
      nonCriticalCSS.forEach((cssPath) => {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = cssPath;
        link.media = 'print';
        link.onload = () => {
          link.media = 'all';
        };
        document.head.appendChild(link);
      });
    };

    // Load non-critical CSS after critical rendering
    if (document.readyState === 'complete') {
      loadNonCriticalCSS();
    } else {
      window.addEventListener('load', loadNonCriticalCSS);
      return () => window.removeEventListener('load', loadNonCriticalCSS);
    }
  }, [nonCriticalCSS]);

  // Inject critical CSS inline if provided
  if (criticalCSS) {
    return (
      <style
        dangerouslySetInnerHTML={{ __html: criticalCSS }}
        data-critical-css="true"
      />
    );
  }

  return null;
};

export default CriticalCSS;