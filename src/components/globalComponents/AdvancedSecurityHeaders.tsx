
import { Helmet } from 'react-helmet-async';

const AdvancedSecurityHeaders: React.FC = () => {
  return (
    <Helmet>
      {/* Enhanced Security Headers */}
      <meta httpEquiv="Content-Security-Policy" content="default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https: blob:; media-src 'self' https:; connect-src 'self' https://www.google-analytics.com https://analytics.google.com; frame-src 'self' https://www.youtube.com https://www.google.com; worker-src 'self' blob:;" />
      <meta httpEquiv="Strict-Transport-Security" content="max-age=31536000; includeSubDomains; preload" />
      <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
      <meta httpEquiv="X-Frame-Options" content="SAMEORIGIN" />
      <meta httpEquiv="X-XSS-Protection" content="1; mode=block" />
      <meta httpEquiv="Referrer-Policy" content="strict-origin-when-cross-origin" />
      <meta httpEquiv="Permissions-Policy" content="geolocation=(), microphone=(), camera=(), payment=(), usb=(), magnetometer=(), gyroscope=(), accelerometer=()" />
      
      {/* Performance and Resource Hints */}
      <meta httpEquiv="Accept-CH" content="DPR, Viewport-Width, Width, Downlink, ECT, RTT, Save-Data" />
      <meta httpEquiv="Critical-CH" content="Viewport-Width, Width, DPR" />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link rel="preconnect" href="https://www.google-analytics.com" />
      <link rel="preconnect" href="https://www.googletagmanager.com" />
      
      {/* DNS Prefetch for external domains */}
      <link rel="dns-prefetch" href="//fonts.googleapis.com" />
      <link rel="dns-prefetch" href="//fonts.gstatic.com" />
      <link rel="dns-prefetch" href="//www.google-analytics.com" />
      <link rel="dns-prefetch" href="//www.youtube.com" />
      <link rel="dns-prefetch" href="//wa.me" />
      
      {/* Preload critical resources */}
      <link rel="preload" href="/GatsbyFLF-Bold.ttf" as="font" type="font/ttf" crossOrigin="anonymous" />
      <link rel="preload" href="/images/banda.avif" as="image" type="image/avif" />
      
      {/* Module preload for critical JS */}
      <link rel="modulepreload" href="/src/main.tsx" />
      
      {/* Prefetch manifest and service worker */}
      <link rel="prefetch" href="/manifest-advanced.json" />
      <link rel="prefetch" href="/sw-advanced.js" />
    </Helmet>
  );
};

export default AdvancedSecurityHeaders;
