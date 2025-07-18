import { useEffect, useRef, useState } from 'react';

interface UseIntersectionObserverOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
  enabled?: boolean;
}

export const useIntersectionObserver = ({
  threshold = 0.1,
  rootMargin = '50px',
  triggerOnce = true,
  enabled = true,
}: UseIntersectionObserverOptions = {}) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [hasTriggered, setHasTriggered] = useState(false);
  const elementRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!enabled || !elementRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const isCurrentlyIntersecting = entry.isIntersecting;
        
        if (isCurrentlyIntersecting) {
          setIsIntersecting(true);
          if (triggerOnce) {
            setHasTriggered(true);
          }
        } else if (!triggerOnce) {
          setIsIntersecting(false);
        }
      },
      {
        threshold,
        rootMargin,
      }
    );

    observer.observe(elementRef.current);

    return () => {
      observer.disconnect();
    };
  }, [threshold, rootMargin, triggerOnce, enabled, hasTriggered]);

  const shouldLoad = triggerOnce ? (isIntersecting || hasTriggered) : isIntersecting;

  return {
    elementRef,
    isIntersecting: shouldLoad,
    hasTriggered,
  };
};

export default useIntersectionObserver;