import { useEffect } from 'react';
import { useWebVitals } from '@/hooks/useWebVitals';

interface WebVitalsData {
  name: string;
  value: number;
  rating: 'good' | 'needs-improvement' | 'poor';
  delta: number;
  id: string;
}

interface WebVitalsReporterProps {
  enableGA4?: boolean;
  enableConsoleReporting?: boolean;
}

const WebVitalsReporter: React.FC<WebVitalsReporterProps> = ({
  enableGA4 = true,
  enableConsoleReporting = false,
}) => {
  const reportWebVitals = (metric: WebVitalsData) => {
    // Store in localStorage for dashboard
    try {
      const existing = JSON.parse(localStorage.getItem('webVitalsHistory') || '[]');
      const newEntry = {
        ...metric,
        timestamp: Date.now(),
        url: window.location.pathname,
      };
      
      const updated = [...existing, newEntry].slice(-100); // Keep last 100 entries
      localStorage.setItem('webVitalsHistory', JSON.stringify(updated));
    } catch (error) {
      console.warn('Failed to store web vitals data:', error);
    }

    // Console reporting for development
    if (enableConsoleReporting || process.env.NODE_ENV === 'development') {
      const emoji = metric.rating === 'good' ? '✅' : metric.rating === 'needs-improvement' ? '⚠️' : '❌';
      console.log(`${emoji} ${metric.name}: ${metric.value}ms (${metric.rating})`);
    }

    // Send to analytics endpoint (replace with your analytics service)
    if (process.env.NODE_ENV === 'production') {
      fetch('/api/web-vitals', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(metric),
      }).catch(() => {
        // Silent fail for analytics
      });
    }
  };

  useWebVitals({
    reportWebVitals,
    enableGA4,
  });

  // Performance observer for additional metrics
  useEffect(() => {
    if (typeof window === 'undefined' || !('PerformanceObserver' in window)) return;

    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.entryType === 'navigation') {
          const navigation = entry as PerformanceNavigationTiming;
          const metrics = {
            domContentLoaded: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
            domComplete: navigation.domComplete - navigation.fetchStart,
            loadComplete: navigation.loadEventEnd - navigation.fetchStart,
            firstByte: navigation.responseStart - navigation.requestStart,
          };

          if (process.env.NODE_ENV === 'development') {
            console.group('📊 Navigation Timing');
            console.log('DOM Content Loaded:', Math.round(metrics.domContentLoaded), 'ms');
            console.log('DOM Complete:', Math.round(metrics.domComplete), 'ms');
            console.log('Load Complete:', Math.round(metrics.loadComplete), 'ms');
            console.log('Time to First Byte:', Math.round(metrics.firstByte), 'ms');
            console.groupEnd();
          }
        }
      }
    });

    observer.observe({ entryTypes: ['navigation'] });

    return () => observer.disconnect();
  }, []);

  return null; // This component doesn't render anything
};

export default WebVitalsReporter;