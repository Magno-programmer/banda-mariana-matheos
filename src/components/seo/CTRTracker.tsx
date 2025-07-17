import React, { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

interface CTRTrackerProps {
  userId?: string;
  sessionId?: string;
  enableHeatmaps?: boolean;
  enableScrollTracking?: boolean;
  enableClickTracking?: boolean;
}

interface CTREvent {
  type: string;
  path: string;
  timestamp: number;
  userId?: string;
  sessionId: string;
  userAgent: string;
  referrer: string;
  viewport: {
    width: number;
    height: number;
  };
  scroll?: {
    y: number;
    percentage: number;
  };
  click?: {
    x: number;
    y: number;
    element: string;
    text: string;
  };
  query?: string;
  impressionShare?: number;
  position?: number;
  device?: 'mobile' | 'tablet' | 'desktop';
}

const CTRTracker: React.FC<CTRTrackerProps> = ({
  userId,
  sessionId,
  enableHeatmaps = true,
  enableScrollTracking = true,
  enableClickTracking = true
}) => {
  const location = useLocation();
  const startTime = useRef(Date.now());
  const scrollCheckpoints = useRef(new Set<number>());
  const visibilityStart = useRef(Date.now());
  const currentSessionId = useRef(sessionId || generateSessionId());

  // Generate unique session ID
  function generateSessionId(): string {
    return `${Date.now()}_${Math.random().toString(36).substring(2, 15)}`;
  }

  // Detect device type
  const getDeviceType = (): 'mobile' | 'tablet' | 'desktop' => {
    const width = window.innerWidth;
    if (width < 768) return 'mobile';
    if (width < 1024) return 'tablet';
    return 'desktop';
  };

  // Send event to analytics
  const sendEvent = async (event: CTREvent) => {
    try {
      // Send to Google Analytics 4
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', event.type, {
          event_category: 'CTR_Advanced',
          event_label: event.path,
          custom_parameters: {
            session_id: event.sessionId,
            user_id: event.userId,
            device: event.device,
            scroll_percentage: event.scroll?.percentage,
            click_element: event.click?.element,
            time_on_page: Date.now() - startTime.current
          }
        });
      }

      // Send to custom analytics endpoint
      await fetch('/api/analytics/ctr-advanced', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(event)
      });

      // Send to Search Console API (if configured)
      if (event.query) {
        await fetch('/api/search-console/performance', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            query: event.query,
            page: event.path,
            clicks: 1,
            impressions: 1,
            position: event.position || 0
          })
        });
      }
    } catch (error) {
      console.error('Error sending CTR event:', error);
    }
  };

  // Track page view
  const trackPageView = () => {
    const event: CTREvent = {
      type: 'page_view',
      path: location.pathname,
      timestamp: Date.now(),
      userId,
      sessionId: currentSessionId.current,
      userAgent: navigator.userAgent,
      referrer: document.referrer,
      viewport: {
        width: window.innerWidth,
        height: window.innerHeight
      },
      device: getDeviceType(),
      query: new URLSearchParams(location.search).get('q') || undefined
    };

    sendEvent(event);
  };

  // Track scroll behavior
  const trackScroll = () => {
    if (!enableScrollTracking) return;

    const scrollY = window.scrollY;
    const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercentage = Math.round((scrollY / documentHeight) * 100);

    // Track scroll milestones
    const milestones = [25, 50, 75, 90, 100];
    milestones.forEach(milestone => {
      if (scrollPercentage >= milestone && !scrollCheckpoints.current.has(milestone)) {
        scrollCheckpoints.current.add(milestone);
        
        const event: CTREvent = {
          type: 'scroll_depth',
          path: location.pathname,
          timestamp: Date.now(),
          userId,
          sessionId: currentSessionId.current,
          userAgent: navigator.userAgent,
          referrer: document.referrer,
          viewport: {
            width: window.innerWidth,
            height: window.innerHeight
          },
          scroll: {
            y: scrollY,
            percentage: milestone
          },
          device: getDeviceType()
        };

        sendEvent(event);
      }
    });
  };

  // Track click events
  const trackClick = (e: MouseEvent) => {
    if (!enableClickTracking) return;

    const target = e.target as HTMLElement;
    const element = target.tagName.toLowerCase();
    const text = target.textContent?.slice(0, 100) || '';
    
    // Only track meaningful clicks
    if (['a', 'button', 'input', 'select', 'textarea'].includes(element)) {
      const event: CTREvent = {
        type: 'click',
        path: location.pathname,
        timestamp: Date.now(),
        userId,
        sessionId: currentSessionId.current,
        userAgent: navigator.userAgent,
        referrer: document.referrer,
        viewport: {
          width: window.innerWidth,
          height: window.innerHeight
        },
        click: {
          x: e.clientX,
          y: e.clientY,
          element,
          text
        },
        device: getDeviceType()
      };

      sendEvent(event);
    }
  };

  // Track time on page
  const trackTimeOnPage = () => {
    const timeOnPage = Date.now() - startTime.current;
    
    if (timeOnPage > 10000) { // Only track if user stayed more than 10 seconds
      const event: CTREvent = {
        type: 'time_on_page',
        path: location.pathname,
        timestamp: Date.now(),
        userId,
        sessionId: currentSessionId.current,
        userAgent: navigator.userAgent,
        referrer: document.referrer,
        viewport: {
          width: window.innerWidth,
          height: window.innerHeight
        },
        device: getDeviceType()
      };

      sendEvent(event);
    }
  };

  // Track visibility changes
  const trackVisibility = () => {
    if (document.hidden) {
      const visibleTime = Date.now() - visibilityStart.current;
      
      if (visibleTime > 5000) { // Only track if page was visible for more than 5 seconds
        const event: CTREvent = {
          type: 'visibility_hidden',
          path: location.pathname,
          timestamp: Date.now(),
          userId,
          sessionId: currentSessionId.current,
          userAgent: navigator.userAgent,
          referrer: document.referrer,
          viewport: {
            width: window.innerWidth,
            height: window.innerHeight
          },
          device: getDeviceType()
        };

        sendEvent(event);
      }
    } else {
      visibilityStart.current = Date.now();
    }
  };

  // Track search queries from URL parameters
  const trackSearchQuery = () => {
    const urlParams = new URLSearchParams(location.search);
    const query = urlParams.get('q') || urlParams.get('query');
    
    if (query) {
      const event: CTREvent = {
        type: 'search_query',
        path: location.pathname,
        timestamp: Date.now(),
        userId,
        sessionId: currentSessionId.current,
        userAgent: navigator.userAgent,
        referrer: document.referrer,
        viewport: {
          width: window.innerWidth,
          height: window.innerHeight
        },
        query,
        device: getDeviceType()
      };

      sendEvent(event);
    }
  };

  // Initialize tracking
  useEffect(() => {
    startTime.current = Date.now();
    visibilityStart.current = Date.now();
    scrollCheckpoints.current.clear();

    // Track page view
    trackPageView();
    
    // Track search query
    trackSearchQuery();

    // Set up event listeners
    const throttledScroll = throttle(trackScroll, 100);
    
    window.addEventListener('scroll', throttledScroll);
    document.addEventListener('click', trackClick);
    document.addEventListener('visibilitychange', trackVisibility);
    window.addEventListener('beforeunload', trackTimeOnPage);

    return () => {
      window.removeEventListener('scroll', throttledScroll);
      document.removeEventListener('click', trackClick);
      document.removeEventListener('visibilitychange', trackVisibility);
      window.removeEventListener('beforeunload', trackTimeOnPage);
    };
  }, [location.pathname]);

  // Throttle function
  function throttle(func: Function, delay: number) {
    let timeoutId: NodeJS.Timeout;
    let lastExecTime = 0;
    
    return function (...args: any[]) {
      const currentTime = Date.now();
      
      if (currentTime - lastExecTime > delay) {
        func.apply(null, args);
        lastExecTime = currentTime;
      } else {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
          func.apply(null, args);
          lastExecTime = Date.now();
        }, delay - (currentTime - lastExecTime));
      }
    };
  }

  return null; // This component doesn't render anything
};

export default CTRTracker;