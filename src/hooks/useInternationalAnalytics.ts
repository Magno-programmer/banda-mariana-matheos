import { useEffect, useState } from 'react';
import { useGeolocation } from './useGeolocation';
import { detectLanguage } from '@/utils/languageDetection';

interface InternationalMetrics {
  market: string;
  language: string;
  region: string;
  ctr: number;
  bounceRate: number;
  sessionDuration: number;
  conversionRate: number;
}

interface WebVitalsMetrics {
  lcp: number; // Largest Contentful Paint
  fid: number; // First Input Delay
  cls: number; // Cumulative Layout Shift
  fcp: number; // First Contentful Paint
  ttfb: number; // Time to First Byte
}

export const useInternationalAnalytics = () => {
  const [metrics, setMetrics] = useState<InternationalMetrics | null>(null);
  const [webVitals, setWebVitals] = useState<WebVitalsMetrics | null>(null);
  const geolocationData = useGeolocation();
  const [sessionStartTime] = useState(Date.now());

  // Track Core Web Vitals per market
  const trackWebVitals = () => {
    if ('web-vitals' in window) {
      import('web-vitals').then(({ onCLS, onFCP, onLCP, onTTFB }) => {
        const vitalsData: Partial<WebVitalsMetrics> = {};

        onLCP((metric) => {
          vitalsData.lcp = metric.value;
          updateWebVitals(vitalsData);
        });


        onCLS((metric) => {
          vitalsData.cls = metric.value;
          updateWebVitals(vitalsData);
        });

        onFCP((metric) => {
          vitalsData.fcp = metric.value;
          updateWebVitals(vitalsData);
        });

        onTTFB((metric) => {
          vitalsData.ttfb = metric.value;
          updateWebVitals(vitalsData);
        });
      });
    }
  };

  const updateWebVitals = (vitals: Partial<WebVitalsMetrics>) => {
    setWebVitals(prev => ({ ...prev, ...vitals } as WebVitalsMetrics));
  };

  // Track international market performance
  const trackMarketPerformance = () => {
    const languageDetection = detectLanguage(geolocationData.country);
    const market = geolocationData.country || 'Unknown';
    const region = geolocationData.region || 'Unknown';

    // Calculate session metrics
    const sessionDuration = (Date.now() - sessionStartTime) / 1000;
    
    // Simulate CTR and bounce rate (in real app, this would come from analytics)
    const ctr = Math.random() * 10; // 0-10%
    const bounceRate = Math.random() * 50; // 0-50%
    const conversionRate = Math.random() * 5; // 0-5%

    setMetrics({
      market,
      language: languageDetection.detectedLanguage,
      region,
      ctr,
      bounceRate,
      sessionDuration,
      conversionRate
    });
  };

  // Send analytics data to external services
  const sendAnalytics = (eventName: string, data: any) => {
    // Google Analytics 4 (if available)
    if (typeof window !== 'undefined' && 'gtag' in window) {
      (window as any).gtag('event', eventName, {
        custom_parameter_market: metrics?.market,
        custom_parameter_language: metrics?.language,
        custom_parameter_region: metrics?.region,
        ...data
      });
    }

    // Send to custom analytics endpoint
    fetch('/api/analytics/international', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        event: eventName,
        market: metrics?.market,
        language: metrics?.language,
        region: metrics?.region,
        webVitals,
        timestamp: Date.now(),
        ...data
      })
    }).catch(error => {
      console.log('Analytics endpoint not available:', error.message);
    });
  };

  // Track hreflang effectiveness
  const trackHreflangPerformance = () => {
    const referrer = document.referrer;
    const isFromSearch = referrer.includes('google') || referrer.includes('bing') || referrer.includes('yahoo');
    
    if (isFromSearch) {
      sendAnalytics('hreflang_traffic', {
        source: 'organic_search',
        market: metrics?.market,
        language: metrics?.language
      });
    }
  };

  // A/B test international markets
  const runInternationalABTest = () => {
    const testVariant = Math.random() > 0.5 ? 'A' : 'B';
    
    sendAnalytics('international_ab_test', {
      variant: testVariant,
      market: metrics?.market,
      language: metrics?.language
    });

    return testVariant;
  };

  useEffect(() => {
    trackWebVitals();
    trackMarketPerformance();
    trackHreflangPerformance();

    // Track session end
    const handleBeforeUnload = () => {
      const finalSessionDuration = (Date.now() - sessionStartTime) / 1000;
      sendAnalytics('session_end', {
        session_duration: finalSessionDuration,
        page_views: 1 // In real app, track actual page views
      });
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [geolocationData]);

  return {
    metrics,
    webVitals,
    trackMarketPerformance,
    sendAnalytics,
    runInternationalABTest,
    trackHreflangPerformance
  };
};

export default useInternationalAnalytics;