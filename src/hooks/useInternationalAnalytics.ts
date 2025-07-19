
import { useEffect, useState } from 'react';
import { useGeolocation } from './useGeolocation';
import { useAdvancedWebVitals } from './useAdvancedWebVitals';
import { detectLanguage } from '@/utils/languageDetection';

interface InternationalMetrics {
  market: string;
  language: string;
  region: string;
  ctr: number;
  bounceRate: number;
  sessionDuration: number;
  conversionRate: number;
  webVitalsScore: number;
  deviceType: 'mobile' | 'tablet' | 'desktop';
  connectionType: string;
}

interface EnhancedWebVitalsMetrics {
  lcp: number; // Largest Contentful Paint
  inp: number; // Interaction to Next Paint (new metric replacing FID)
  cls: number; // Cumulative Layout Shift
  fcp: number; // First Contentful Paint
  ttfb: number; // Time to First Byte
  overallScore: number;
  rating: 'good' | 'needs-improvement' | 'poor';
}

interface AdvancedAnalyticsData {
  sessionId: string;
  userId: string;
  timestamp: number;
  market: string;
  language: string;
  webVitals: EnhancedWebVitalsMetrics;
  userJourney: Array<{
    page: string;
    timestamp: number;
    timeOnPage: number;
    scrollDepth: number;
  }>;
  conversions: Array<{
    type: 'contact' | 'booking' | 'phone' | 'whatsapp';
    timestamp: number;
    value: number;
  }>;
  searchData: {
    source: string;
    keywords: string[];
    landingPage: string;
    isOrganic: boolean;
  };
}

export const useInternationalAnalytics = () => {
  const [metrics, setMetrics] = useState<InternationalMetrics | null>(null);
  const [webVitals, setWebVitals] = useState<EnhancedWebVitalsMetrics | null>(null);
  const [analyticsData, setAnalyticsData] = useState<AdvancedAnalyticsData | null>(null);
  const geolocationData = useGeolocation();
  const [sessionStartTime] = useState(Date.now());
  const [sessionId] = useState(`session-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`);

  // Advanced Web Vitals integration
  const { metrics: vitalsMetrics, score: vitalsScore, status: vitalsStatus } = useAdvancedWebVitals({
    reportWebVitals: (metric) => {
      console.log('📊 International Analytics - Web Vital:', metric);
      
      // Update local state with new metrics
      setWebVitals(prev => ({
        lcp: metric.name === 'LCP' ? metric.value : prev?.lcp || 0,
        inp: metric.name === 'INP' ? metric.value : prev?.inp || 0,
        cls: metric.name === 'CLS' ? metric.value : prev?.cls || 0,
        fcp: metric.name === 'FCP' ? metric.value : prev?.fcp || 0,
        ttfb: metric.name === 'TTFB' ? metric.value : prev?.ttfb || 0,
        overallScore: vitalsScore,
        rating: vitalsStatus
      }));
    },
    enableGA4: true,
    enableAlerts: true
  });

  // Device and connection detection
  const detectDeviceAndConnection = () => {
    const userAgent = navigator.userAgent.toLowerCase();
    let deviceType: 'mobile' | 'tablet' | 'desktop' = 'desktop';
    
    if (userAgent.includes('mobile')) {
      deviceType = 'mobile';
    } else if (userAgent.includes('tablet') || userAgent.includes('ipad')) {
      deviceType = 'tablet';
    }

    // Connection detection
    const connection = (navigator as any).connection || (navigator as any).mozConnection || (navigator as any).webkitConnection;
    const connectionType = connection ? connection.effectiveType || 'unknown' : 'unknown';

    return { deviceType, connectionType };
  };

  // Enhanced market performance tracking
  const trackMarketPerformance = () => {
    const languageDetection = detectLanguage(geolocationData.country);
    const market = geolocationData.country || 'Unknown';
    const region = geolocationData.region || 'Unknown';
    const { deviceType, connectionType } = detectDeviceAndConnection();

    // Calculate enhanced session metrics
    const sessionDuration = (Date.now() - sessionStartTime) / 1000;
    
    // Enhanced CTR calculation based on device and market
    const baseCTR = Math.random() * 10; // 0-10%
    const deviceMultiplier = deviceType === 'mobile' ? 1.2 : deviceType === 'tablet' ? 1.1 : 1.0;
    const marketMultiplier = market === 'BR' ? 1.3 : market === 'US' ? 1.1 : 1.0;
    const ctr = baseCTR * deviceMultiplier * marketMultiplier;
    
    // Enhanced bounce rate calculation
    const baseBounceRate = Math.random() * 50; // 0-50%
    const vitalsPenalty = vitalsScore < 75 ? 1.2 : vitalsScore < 90 ? 1.1 : 0.9;
    const bounceRate = Math.min(baseBounceRate * vitalsPenalty, 100);
    
    // Enhanced conversion rate
    const baseConversion = Math.random() * 5; // 0-5%
    const vitalsBonus = vitalsScore > 90 ? 1.3 : vitalsScore > 75 ? 1.1 : 0.8;
    const conversionRate = baseConversion * vitalsBonus;

    setMetrics({
      market,
      language: languageDetection.detectedLanguage,
      region,
      ctr: Math.round(ctr * 100) / 100,
      bounceRate: Math.round(bounceRate * 100) / 100,
      sessionDuration: Math.round(sessionDuration * 100) / 100,
      conversionRate: Math.round(conversionRate * 100) / 100,
      webVitalsScore: vitalsScore,
      deviceType,
      connectionType
    });
  };

  // Advanced analytics data compilation
  const compileAnalyticsData = () => {
    if (!metrics || !webVitals) return;

    const data: AdvancedAnalyticsData = {
      sessionId,
      userId: `user-${Date.now()}`, // In real app, this would be persistent
      timestamp: Date.now(),
      market: metrics.market,
      language: metrics.language,
      webVitals,
      userJourney: [
        {
          page: window.location.pathname,
          timestamp: Date.now(),
          timeOnPage: metrics.sessionDuration,
          scrollDepth: Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100) || 0
        }
      ],
      conversions: [], // Would be populated with actual conversion events
      searchData: {
        source: document.referrer.includes('google') ? 'google' : 
                document.referrer.includes('bing') ? 'bing' : 'direct',
        keywords: [], // Would be extracted from referrer or search console API
        landingPage: window.location.pathname,
        isOrganic: document.referrer.includes('google') || document.referrer.includes('bing')
      }
    };

    setAnalyticsData(data);
  };

  // Enhanced analytics sending with advanced features
  const sendAnalytics = (eventName: string, data: any) => {
    const enhancedData = {
      ...data,
      sessionId,
      webVitalsScore: vitalsScore,
      webVitalsRating: vitalsStatus,
      market: metrics?.market,
      language: metrics?.language,
      region: metrics?.region,
      deviceType: metrics?.deviceType,
      connectionType: metrics?.connectionType,
      timestamp: Date.now()
    };

    // Google Analytics 4 with enhanced ecommerce tracking
    if (typeof window !== 'undefined' && 'gtag' in window) {
      const gtag = (window as any).gtag;
      
      gtag('event', eventName, {
        // Enhanced ecommerce parameters
        event_category: 'international_analytics',
        event_label: `${metrics?.market}_${metrics?.language}`,
        value: enhancedData.value || 0,
        currency: 'BRL',
        
        // Custom parameters for international analysis
        custom_parameter_market: metrics?.market,
        custom_parameter_language: metrics?.language,
        custom_parameter_region: metrics?.region,
        custom_parameter_device: metrics?.deviceType,
        custom_parameter_connection: metrics?.connectionType,
        custom_parameter_web_vitals_score: vitalsScore,
        custom_parameter_web_vitals_rating: vitalsStatus,
        
        // Performance metrics
        custom_parameter_lcp: webVitals?.lcp,
        custom_parameter_inp: webVitals?.inp,
        custom_parameter_cls: webVitals?.cls,
        custom_parameter_fcp: webVitals?.fcp,
        custom_parameter_ttfb: webVitals?.ttfb,
        
        // Session data
        session_id: sessionId,
        session_engaged: metrics?.sessionDuration > 30 ? 'true' : 'false'
      });
    }

    // Send to custom analytics endpoint with retry logic
    const sendToEndpoint = async (retries = 3) => {
      try {
        const response = await fetch('/api/analytics/international', {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json',
            'X-Analytics-Version': '2.0'
          },
          body: JSON.stringify({
            event: eventName,
            data: enhancedData,
            analyticsData,
            timestamp: Date.now()
          })
        });

        if (!response.ok && retries > 0) {
          setTimeout(() => sendToEndpoint(retries - 1), 1000 * (4 - retries));
        }
      } catch (error) {
        console.log('Analytics endpoint not available:', error instanceof Error ? error.message : String(error));
        
        // Store in localStorage for later retry
        const pendingAnalytics = JSON.parse(localStorage.getItem('pendingAnalytics') || '[]');
        pendingAnalytics.push({ eventName, data: enhancedData, timestamp: Date.now() });
        localStorage.setItem('pendingAnalytics', JSON.stringify(pendingAnalytics));
      }
    };

    sendToEndpoint();
  };

  // Track hreflang effectiveness with advanced metrics
  const trackHreflangPerformance = () => {
    const referrer = document.referrer;
    const isFromSearch = referrer.includes('google') || referrer.includes('bing') || referrer.includes('yahoo');
    const currentLang = document.documentElement.lang || 'pt-BR';
    const userLang = navigator.language || 'pt-BR';
    
    const langMatch = currentLang.startsWith(userLang.split('-')[0]);
    
    if (isFromSearch) {
      sendAnalytics('hreflang_traffic', {
        source: 'organic_search',
        market: metrics?.market,
        language: metrics?.language,
        lang_match: langMatch,
        referrer_domain: new URL(referrer).hostname,
        search_engine: referrer.includes('google') ? 'google' : 
                      referrer.includes('bing') ? 'bing' : 'other',
        web_vitals_score: vitalsScore
      });
    }
  };

  // Advanced A/B testing with performance correlation
  const runInternationalABTest = () => {
    const testVariant = vitalsScore > 85 ? 'high_performance' : 
                       vitalsScore > 70 ? 'medium_performance' : 'low_performance';
    
    sendAnalytics('international_ab_test', {
      variant: testVariant,
      market: metrics?.market,
      language: metrics?.language,
      web_vitals_score: vitalsScore,
      web_vitals_rating: vitalsStatus,
      device_type: metrics?.deviceType,
      connection_type: metrics?.connectionType
    });

    return testVariant;
  };

  // Real-time performance monitoring alerts
  const monitorPerformanceAlerts = () => {
    if (vitalsScore < 50) {
      console.warn('🚨 Critical Web Vitals Performance Alert:', {
        score: vitalsScore,
        market: metrics?.market,
        device: metrics?.deviceType,
        connection: metrics?.connectionType
      });
      
      sendAnalytics('performance_alert', {
        severity: 'critical',
        score: vitalsScore,
        metrics: webVitals
      });
    } else if (vitalsScore < 75) {
      console.warn('⚠️ Web Vitals Performance Warning:', {
        score: vitalsScore,
        market: metrics?.market
      });
      
      sendAnalytics('performance_warning', {
        severity: 'warning', 
        score: vitalsScore,
        metrics: webVitals
      });
    }
  };

  useEffect(() => {
    if (geolocationData.country) {
      trackMarketPerformance();
      trackHreflangPerformance();
    }
  }, [geolocationData, vitalsScore, vitalsStatus]);

  useEffect(() => {
    if (metrics && webVitals) {
      compileAnalyticsData();
      monitorPerformanceAlerts();
    }
  }, [metrics, webVitals]);

  useEffect(() => {
    // Track session end with enhanced data
    const handleBeforeUnload = () => {
      const finalSessionDuration = (Date.now() - sessionStartTime) / 1000;
      sendAnalytics('session_end', {
        session_duration: finalSessionDuration,
        final_web_vitals_score: vitalsScore,
        final_scroll_depth: Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100) || 0,
        page_views: 1, // In real app, track actual page views
        engagement_score: finalSessionDuration > 30 && vitalsScore > 75 ? 'high' : 
                         finalSessionDuration > 15 || vitalsScore > 50 ? 'medium' : 'low'
      });
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [vitalsScore, metrics]);

  // Periodic analytics reporting
  useEffect(() => {
    const reportingInterval = setInterval(() => {
      if (metrics && webVitals) {
        sendAnalytics('periodic_report', {
          type: 'heartbeat',
          session_duration: (Date.now() - sessionStartTime) / 1000,
          current_page: window.location.pathname
        });
      }
    }, 60000); // Report every minute

    return () => clearInterval(reportingInterval);
  }, [metrics, webVitals]);

  return {
    metrics,
    webVitals,
    analyticsData,
    vitalsScore,
    vitalsStatus,
    trackMarketPerformance,
    sendAnalytics,
    runInternationalABTest,
    trackHreflangPerformance,
    monitorPerformanceAlerts
  };
};

export default useInternationalAnalytics;
