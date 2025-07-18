import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { normalizeUrl, routeExists } from '@/utils/urlUtils';

/**
 * URL Redirect Handler Component
 * Handles trailing slash standardization and invalid route redirects
 */
const UrlRedirectHandler = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const currentPath = location.pathname;
    const normalizedPath = normalizeUrl(currentPath);
    
    // Redirect if trailing slash needs to be removed (except root)
    if (currentPath !== normalizedPath && currentPath !== '/') {
      navigate(normalizedPath + location.search + location.hash, { 
        replace: true 
      });
      return;
    }
    
    // Check if route exists (basic validation)
    if (!routeExists(normalizedPath)) {
      // For invalid routes, redirect to home
      console.warn(`Invalid route detected: ${currentPath}, redirecting to home`);
      navigate('/', { replace: true });
    }
  }, [location.pathname, location.search, location.hash, navigate]);

  return null; // This component doesn't render anything
};

export default UrlRedirectHandler;