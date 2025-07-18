import { useEffect } from 'react';
import { onCLS, onFCP, onLCP, onTTFB, onINP, type Metric } from 'web-vitals';

interface WebVitalsData {
  name: string;
  value: number;
  rating: 'good' | 'needs-improvement' | 'poor';
  delta: number;
  id: string;
}

interface UseWebVitalsOptions {
  reportWebVitals?: (metric: WebVitalsData) => void;
  enableGA4?: boolean;
}

export const useWebVitals = ({ reportWebVitals, enableGA4 = false }: UseWebVitalsOptions = {}) => {
  useEffect(() => {
    const handleMetric = (metric: Metric) => {
      const vitalsData: WebVitalsData = {
        name: metric.name,
        value: Math.round(metric.value),
        rating: metric.rating || 'good',
        delta: Math.round(metric.delta),
        id: metric.id,
      };

      // Send to Google Analytics 4 if enabled
      if (enableGA4 && typeof window !== 'undefined' && 'gtag' in window) {
        const gtag = (window as any).gtag;
        gtag('event', metric.name, {
          custom_parameter_1: metric.value,
          custom_parameter_2: metric.id,
          custom_parameter_3: metric.rating,
        });
      }

      // Send to custom reporting function
      if (reportWebVitals) {
        reportWebVitals(vitalsData);
      }

      // Development logging
      if (process.env.NODE_ENV === 'development') {
        console.group(`🔍 Web Vital: ${metric.name}`);
        console.log(`Value: ${Math.round(metric.value)}ms`);
        console.log(`Rating: ${metric.rating}`);
        console.log(`Delta: ${Math.round(metric.delta)}ms`);
        console.groupEnd();
      }
    };

    // Collect all Core Web Vitals
    onCLS(handleMetric);
    onINP(handleMetric); // FID is deprecated, using INP instead
    onFCP(handleMetric);
    onLCP(handleMetric);
    onTTFB(handleMetric);
  }, [reportWebVitals, enableGA4]);
};

export default useWebVitals;