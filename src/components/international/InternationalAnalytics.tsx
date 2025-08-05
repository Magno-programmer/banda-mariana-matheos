import React, { useEffect } from 'react';
import { useInternational } from './InternationalRouter';
import { useGeolocation } from '@/hooks/useGeolocation';
import { useAdvancedTranslation } from '@/hooks/useAdvancedTranslation';
import { useLocation } from 'react-router-dom';

interface InternationalAnalyticsProps {
  enableGA4?: boolean;
  enableCustomAnalytics?: boolean;
}

export const InternationalAnalytics: React.FC<InternationalAnalyticsProps> = ({
  enableGA4 = true,
  enableCustomAnalytics = true
}) => {
  const { currentLanguage } = useInternational();
  const { country, region } = useGeolocation();
  const { translationCache, availableAPIs } = useAdvancedTranslation();
  const location = useLocation();

  // Track page view with international context
  useEffect(() => {
    const trackPageView = () => {
      const analyticsData = {
        page_path: location.pathname,
        page_title: document.title,
        language: currentLanguage,
        country: country || 'Unknown',
        region: region || 'Unknown',
        is_translated: currentLanguage !== 'pt-BR',
        translation_apis: availableAPIs,
        cache_size: Object.keys(translationCache).length,
        timestamp: new Date().toISOString()
      };

      // Google Analytics 4
      if (enableGA4 && typeof window !== 'undefined' && 'gtag' in window) {
        (window as any).gtag('event', 'page_view', {
          page_location: window.location.href,
          page_path: location.pathname,
          page_title: document.title,
          custom_map: {
            dimension1: currentLanguage,
            dimension2: country,
            dimension3: region,
            dimension4: currentLanguage !== 'pt-BR' ? 'translated' : 'original'
          }
        });

        // Track language-specific events
        (window as any).gtag('event', 'language_interaction', {
          event_category: 'International',
          event_label: currentLanguage,
          value: currentLanguage !== 'pt-BR' ? 1 : 0
        });
      }

      // Custom analytics endpoint
      if (enableCustomAnalytics) {
        fetch('/api/analytics/international', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            event: 'page_view',
            data: analyticsData
          })
        }).catch(error => {
          console.log('Custom analytics endpoint not available:', error.message);
        });
      }

      // Console logging for development
      if (process.env.NODE_ENV === 'development') {
        console.log('International Analytics:', analyticsData);
      }
    };

    trackPageView();
  }, [
    location.pathname,
    currentLanguage,
    country,
    region,
    
    availableAPIs,
    translationCache,
    enableGA4,
    enableCustomAnalytics
  ]);

  // Track translation events
  useEffect(() => {
    if (currentLanguage !== 'pt-BR') {
      const trackTranslation = () => {
        const translationData = {
          source_language: 'pt-BR',
          target_language: currentLanguage,
          cache_entries: Object.keys(translationCache).length,
          available_apis: availableAPIs,
          country: country,
          timestamp: new Date().toISOString()
        };

        // GA4 translation event
        if (enableGA4 && typeof window !== 'undefined' && 'gtag' in window) {
          (window as any).gtag('event', 'translation_loaded', {
            event_category: 'Translation',
            event_label: `pt-BR_to_${currentLanguage}`,
            custom_map: {
              dimension5: availableAPIs.join(','),
              dimension6: Object.keys(translationCache).length.toString()
            }
          });
        }

        // Custom analytics
        if (enableCustomAnalytics) {
          fetch('/api/analytics/translation', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              event: 'translation_loaded',
              data: translationData
            })
          }).catch(error => {
            console.log('Translation analytics endpoint not available:', error.message);
          });
        }
      };

      const timer = setTimeout(trackTranslation, 2000); // Track after content loads
      return () => clearTimeout(timer);
    }
  }, [currentLanguage, translationCache, availableAPIs, country, enableGA4, enableCustomAnalytics]);

  // Track user interaction with international features
  useEffect(() => {
    const trackInteraction = (event: string, detail: any) => {
      const interactionData = {
        interaction_type: event,
        language: currentLanguage,
        country: country,
        detail: detail,
        timestamp: new Date().toISOString()
      };

      if (enableGA4 && typeof window !== 'undefined' && 'gtag' in window) {
        (window as any).gtag('event', 'international_interaction', {
          event_category: 'International',
          event_label: event,
          custom_map: {
            dimension7: currentLanguage,
            dimension8: country || 'Unknown'
          }
        });
      }

      if (enableCustomAnalytics) {
        fetch('/api/analytics/interaction', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            event: 'international_interaction',
            data: interactionData
          })
        }).catch(() => {});
      }
    };

    // Listen for custom events from translation components
    const handleCustomEvent = (event: CustomEvent) => {
      trackInteraction(event.type, event.detail);
    };

    window.addEventListener('translation:language_changed', handleCustomEvent as EventListener);
    window.addEventListener('translation:auto_toggled', handleCustomEvent as EventListener);
    window.addEventListener('translation:manual_triggered', handleCustomEvent as EventListener);

    return () => {
      window.removeEventListener('translation:language_changed', handleCustomEvent as EventListener);
      window.removeEventListener('translation:auto_toggled', handleCustomEvent as EventListener);
      window.removeEventListener('translation:manual_triggered', handleCustomEvent as EventListener);
    };
  }, [currentLanguage, country, enableGA4, enableCustomAnalytics]);

  // Performance tracking for international features
  useEffect(() => {
    const trackPerformance = () => {
      if (typeof window !== 'undefined' && 'performance' in window) {
        const perfData = {
          language: currentLanguage,
          country: country,
          navigation_timing: {
            dom_content_loaded: performance.timing.domContentLoadedEventEnd - performance.timing.navigationStart,
            load_complete: performance.timing.loadEventEnd - performance.timing.navigationStart,
            first_paint: performance.getEntriesByType('paint').find(entry => entry.name === 'first-paint')?.startTime || 0,
            first_contentful_paint: performance.getEntriesByType('paint').find(entry => entry.name === 'first-contentful-paint')?.startTime || 0
          },
          cache_performance: {
            cache_size: Object.keys(translationCache).length,
            available_apis: availableAPIs.length
          },
          timestamp: new Date().toISOString()
        };

        if (enableCustomAnalytics) {
          fetch('/api/analytics/performance', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              event: 'performance_metrics',
              data: perfData
            })
          }).catch(() => {});
        }
      }
    };

    const timer = setTimeout(trackPerformance, 5000); // Track after page stabilizes
    return () => clearTimeout(timer);
  }, [currentLanguage, country, translationCache, availableAPIs, enableCustomAnalytics]);

  return null; // This component only handles analytics, no UI
};

export default InternationalAnalytics;