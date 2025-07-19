import { Helmet } from 'react-helmet-async';

const AdvancedSecurityHeaders: React.FC = () => {
  return (
    <Helmet>
      {/* Security headers */}
      <meta
        httpEquiv="Content-Security-Policy"
        content="
          default-src 'self';
          script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com https://www.youtube.com https://www.gstatic.com;
          style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
          font-src 'self' https://fonts.gstatic.com;
          img-src 'self' data: https: blob:;
          media-src 'self' https:;
          connect-src 'self' https://www.google-analytics.com https://analytics.google.com https://api.mymemory.translated.net https://libretranslate.de;
          frame-src 'self' https://www.youtube.com https://www.google.com;
          worker-src 'self' blob:;"
      />
      <meta
        httpEquiv="Strict-Transport-Security"
        content="max-age=31536000; includeSubDomains; preload"
      />
      <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
      <meta httpEquiv="X-Frame-Options" content="SAMEORIGIN" />
      <meta httpEquiv="X-XSS-Protection" content="1; mode=block" />
      <meta
        httpEquiv="Referrer-Policy"
        content="strict-origin-when-cross-origin"
      />
      <meta
        httpEquiv="Permissions-Policy"
        content="geolocation=(), microphone=(), camera=(), payment=(), usb=(), magnetometer=(), gyroscope=(), accelerometer=()"
      />

      {/* Client Hints */}
      <meta
        httpEquiv="Accept-CH"
        content="DPR, Viewport-Width, Width, Downlink, ECT, RTT, Save-Data"
      />
      <meta
        httpEquiv="Critical-CH"
        content="Viewport-Width, Width, DPR"
      />

      {/* Resource hints */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossOrigin="anonymous"
      />
      <link rel="preconnect" href="https://www.google-analytics.com" />
      <link rel="preconnect" href="https://www.googletagmanager.com" />

      <link rel="dns-prefetch" href="//fonts.googleapis.com" />
      <link rel="dns-prefetch" href="//fonts.gstatic.com" />
      <link rel="dns-prefetch" href="//www.google-analytics.com" />
      <link rel="dns-prefetch" href="//www.youtube.com" />
      <link rel="dns-prefetch" href="//wa.me" />

      {/* Preloads */}
      <link
        rel="preload"
        href="/GatsbyFLF-Bold.ttf"
        as="font"
        type="font/ttf"
        crossOrigin="anonymous"
      />
      <link
        rel="preload"
        href="/images/banda.avif"
        as="image"
        type="image/avif"
      />
      <link rel="modulepreload" href="/src/main.tsx" />

      {/* Prefetches */}
      <link rel="prefetch" href="/manifest-advanced.json" />
      <link rel="prefetch" href="/sw-advanced.js" />
    </Helmet>
  );
};

export default AdvancedSecurityHeaders;
