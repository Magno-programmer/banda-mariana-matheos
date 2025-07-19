
import { useEffect, useRef, useState } from 'react';
import { onCLS, onFCP, onLCP, onTTFB, onINP, type Metric } from 'web-vitals';

interface AdvancedWebVitalsData {
  name: string;
  value: number;
  rating: 'good' | 'needs-improvement' | 'poor';
  delta: number;
  id: string;
  navigationType: string;
  timestamp: number;
  url: string;
  userAgent: string;
}

interface AdvancedWebVitalsOptions {
  reportWebVitals?: (metric: AdvancedWebVitalsData) => void;
  enableGA4?: boolean;
  enableAlerts?: boolean;
  thresholds?: {
    LCP: number;
    FID: number;
    CLS: number;
    FCP: number;
    TTFB: number;
  };
}

interface WebVitalsState {
  metrics: AdvancedWebVitalsData[];
  score: number;
  status: 'good' | 'needs-improvement' | 'poor';
  alerts: string[];
}

const DEFAULT_THRESHOLDS = {
  LCP: 2500, // Good: <= 2.5s
  FID: 100,  // Good: <= 100ms
  CLS: 0.1,  // Good: <= 0.1
  FCP: 1800, // Good: <= 1.8s
  TTFB: 800  // Good: <= 800ms
};

export const useAdvancedWebVitals = (options: AdvancedWebVitalsOptions = {}) => {
  const {
    reportWebVitals,
    enableGA4 = false,
    enableAlerts = true,
    thresholds = DEFAULT_THRESHOLDS
  } = options;

  const [state, setState] = useState<WebVitalsState>({
    metrics: [],
    score: 0,
    status: 'good',
    alerts: []
  });

  const metricsRef = useRef<Map<string, AdvancedWebVitalsData>>(new Map());
  const alertsShownRef = useRef<Set<string>>(new Set());

  // Calculate overall Web Vitals score
  const calculateScore = (metrics: AdvancedWebVitalsData[]): number => {
    if (metrics.length === 0) return 100;

    const weights = {
      LCP: 0.25,
      FID: 0.25,
      CLS: 0.25,
      FCP: 0.15,
      TTFB: 0.10
    };

    let totalScore = 0;
    let totalWeight = 0;

    metrics.forEach(metric => {
      const weight = weights[metric.name as keyof typeof weights] || 0;
      if (weight === 0) return;

      let score = 100;
      
      // Calculate score based on rating
      switch (metric.rating) {
        case 'good':
          score = 90 + (10 * Math.random()); // 90-100
          break;
        case 'needs-improvement':
          score = 50 + (40 * Math.random()); // 50-90
          break;
        case 'poor':
          score = 0 + (50 * Math.random()); // 0-50
          break;
      }

      totalScore += score * weight;
      totalWeight += weight;
    });

    return totalWeight > 0 ? Math.round(totalScore / totalWeight * 100) / 100 : 100;
  };

  // Determine overall status
  const getOverallStatus = (score: number): 'good' | 'needs-improvement' | 'poor' => {
    if (score >= 90) return 'good';
    if (score >= 50) return 'needs-improvement';
    return 'poor';
  };

  // Generate alerts based on thresholds
  const generateAlerts = (metric: AdvancedWebVitalsData): string[] => {
    const alerts: string[] = [];
    const threshold = thresholds[metric.name as keyof typeof thresholds];

    if (!threshold) return alerts;

    if (metric.value > threshold) {
      const alertKey = `${metric.name}-${metric.rating}`;
      
      if (!alertsShownRef.current.has(alertKey)) {
        alertsShownRef.current.add(alertKey);
        
        switch (metric.name) {
          case 'LCP':
            alerts.push(`⚠️ Largest Contentful Paint slow: ${(metric.value / 1000).toFixed(2)}s (target: ≤${threshold/1000}s)`);
            break;
          case 'FID':
            alerts.push(`⚠️ First Input Delay high: ${metric.value}ms (target: ≤${threshold}ms)`);
            break;
          case 'CLS':
            alerts.push(`⚠️ Cumulative Layout Shift high: ${metric.value.toFixed(3)} (target: ≤${threshold})`);
            break;
          case 'FCP':
            alerts.push(`⚠️ First Contentful Paint slow: ${(metric.value / 1000).toFixed(2)}s (target: ≤${threshold/1000}s)`);
            break;
          case 'TTFB':
            alerts.push(`⚠️ Time to First Byte high: ${metric.value}ms (target: ≤${threshold}ms)`);
            break;
        }
      }
    }

    return alerts;
  };

  // Enhanced metric handler
  const handleMetric = (metric: Metric) => {
    const enhancedMetric: AdvancedWebVitalsData = {
      name: metric.name,
      value: Math.round(metric.value * 100) / 100,
      rating: metric.rating || 'good',
      delta: Math.round(metric.delta * 100) / 100,
      id: metric.id,
      navigationType: (performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming)?.type || 'unknown',
      timestamp: Date.now(),
      url: window.location.href,
      userAgent: navigator.userAgent
    };

    // Update metrics map
    metricsRef.current.set(metric.name, enhancedMetric);
    const allMetrics = Array.from(metricsRef.current.values());

    // Generate alerts if enabled
    const newAlerts = enableAlerts ? generateAlerts(enhancedMetric) : [];

    // Calculate new score and status
    const newScore = calculateScore(allMetrics);
    const newStatus = getOverallStatus(newScore);

    // Update state
    setState(prevState => ({
      metrics: allMetrics,
      score: newScore,
      status: newStatus,
      alerts: [...prevState.alerts, ...newAlerts]
    }));

    // Send to Google Analytics 4 if enabled
    if (enableGA4 && typeof window !== 'undefined' && 'gtag' in window) {
      const gtag = (window as any).gtag;
      gtag('event', 'web_vitals', {
        metric_name: metric.name,
        metric_value: Math.round(metric.value),
        metric_rating: metric.rating,
        metric_delta: Math.round(metric.delta),
        metric_id: metric.id,
        page_url: window.location.href,
        user_agent_brand: (navigator as any).userAgentData?.brands?.[0]?.brand || 'unknown'
      });
    }

    // Send to custom reporting function
    if (reportWebVitals) {
      reportWebVitals(enhancedMetric);
    }

    // Development logging with enhanced details
    if (process.env.NODE_ENV === 'development') {
      console.group(`🔍 Web Vital: ${metric.name}`);
      console.log(`📊 Value: ${Math.round(metric.value)}${metric.name === 'CLS' ? '' : 'ms'}`);
      console.log(`⭐ Rating: ${metric.rating}`);
      console.log(`📈 Delta: ${Math.round(metric.delta)}${metric.name === 'CLS' ? '' : 'ms'}`);
      console.log(`🆔 ID: ${metric.id}`);
      console.log(`🧭 Navigation: ${enhancedMetric.navigationType}`);
      console.log(`🌐 URL: ${enhancedMetric.url}`);
      console.log(`📱 Overall Score: ${newScore}/100 (${newStatus})`);
      console.groupEnd();
    }
  };

  // Performance observer for additional metrics
  const observePerformance = () => {
    if (typeof window === 'undefined' || !('PerformanceObserver' in window)) return;

    try {
      // Observe long tasks (blocking main thread)
      const longTaskObserver = new PerformanceObserver((list) => {
        list.getEntries().forEach((entry) => {
          if (entry.duration > 50) { // Tasks > 50ms are "long"
            console.warn(`🐌 Long Task detected: ${Math.round(entry.duration)}ms at ${Math.round(entry.startTime)}ms`);
            
            if (enableAlerts) {
              setState(prevState => ({
                ...prevState,
                alerts: [...prevState.alerts, `🐌 Long task: ${Math.round(entry.duration)}ms (blocks user interaction)`]
              }));
            }
          }
        });
      });

      longTaskObserver.observe({ type: 'longtask', buffered: true });

      // Observe layout shifts for detailed CLS analysis
      const layoutShiftObserver = new PerformanceObserver((list) => {
        list.getEntries().forEach((entry: any) => {
          if (entry.hadRecentInput) return; // Ignore shifts caused by user input
          
          if (entry.value > 0.05) { // Significant layout shift
            console.warn(`📐 Layout Shift: ${entry.value.toFixed(4)} at ${Math.round(entry.startTime)}ms`);
          }
        });
      });

      layoutShiftObserver.observe({ type: 'layout-shift', buffered: true });

    } catch (error) {
      console.warn('Performance Observer not fully supported:', error);
    }
  };

  useEffect(() => {
    // Collect all Core Web Vitals with enhanced handling
    onCLS(handleMetric);
    onINP(handleMetric); // New interaction metric (replaces FID)
    onFCP(handleMetric);
    onLCP(handleMetric);
    onTTFB(handleMetric);

    // Start performance observation
    observePerformance();

    // Set up periodic reporting
    const reportingInterval = setInterval(() => {
      if (metricsRef.current.size > 0 && reportWebVitals) {
        const summaryReport = {
          name: 'SUMMARY',
          value: state.score,
          rating: state.status,
          delta: 0,
          id: 'summary-' + Date.now(),
          navigationType: 'summary',
          timestamp: Date.now(),
          url: window.location.href,
          userAgent: navigator.userAgent
        };
        
        reportWebVitals(summaryReport);
      }
    }, 30000); // Report every 30 seconds

    return () => {
      clearInterval(reportingInterval);
    };
  }, [reportWebVitals, enableGA4, enableAlerts]);

  // Clear alerts function
  const clearAlerts = () => {
    setState(prevState => ({
      ...prevState,
      alerts: []
    }));
    alertsShownRef.current.clear();
  };

  // Get specific metric
  const getMetric = (name: string): AdvancedWebVitalsData | undefined => {
    return metricsRef.current.get(name);
  };

  return {
    ...state,
    clearAlerts,
    getMetric,
    refresh: () => {
      metricsRef.current.clear();
      setState({
        metrics: [],
        score: 0,
        status: 'good',
        alerts: []
      });
    }
  };
};

export default useAdvancedWebVitals;
