
import { Helmet } from 'react-helmet-async';

const AdvancedSecurityHeaders: React.FC = () => {
  // Generate nonce for inline scripts (in production, this should be server-generated)
  const nonce = typeof window !== 'undefined' ? 
    btoa(Math.random().toString()).substring(0, 12) : 
    'dev-nonce-12345';

  return (
    <Helmet>
      {/* Enhanced Content Security Policy */}
      <meta
        httpEquiv="Content-Security-Policy"
        content={`
          default-src 'self';
          script-src 'self' 'nonce-swTest' 'strict-dynamic' https://www.googletagmanager.com https://www.google-analytics.com https://analytics.google.com https://www.youtube.com https://www.gstatic.com;
          script-src-elem 'self' 'nonce-swTest' https://www.googletagmanager.com https://www.google-analytics.com https://www.youtube.com;
          script-src-attr 'none';
          style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
          style-src-elem 'self' 'unsafe-inline' https://fonts.googleapis.com;
          style-src-attr 'self' 'unsafe-inline';
          font-src 'self' https://fonts.gstatic.com data:;
          img-src 'self' data: https: blob:;
          media-src 'self' https: data: blob:;
          connect-src 'self' https://www.google-analytics.com https://analytics.google.com https://api.mymemory.translated.net https://libretranslate.de https://vitals.vercel-insights.com;
          frame-src 'self' https://www.youtube.com https://www.google.com;
          worker-src 'self' blob:;
          child-src 'self' blob:;
          object-src 'none';
          base-uri 'self';
          form-action 'self' https://wa.me;
          manifest-src 'self';
          upgrade-insecure-requests;
          block-all-mixed-content;
        `.replace(/\s+/g, ' ').trim()}
      />

      {/* Advanced Security Headers */}
      <meta
        httpEquiv="Strict-Transport-Security"
        content="max-age=31536000; includeSubDomains; preload"
      />
      <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
      <meta httpEquiv="X-XSS-Protection" content="1; mode=block" />
      <meta httpEquiv="X-Frame-Options" content="SAMEORIGIN" />
      <meta
        httpEquiv="Referrer-Policy"
        content="strict-origin-when-cross-origin"
      />

      {/* Cross-Origin Policies */}
      <meta httpEquiv="Cross-Origin-Embedder-Policy" content="require-corp" />
      <meta httpEquiv="Cross-Origin-Opener-Policy" content="same-origin" />
      <meta httpEquiv="Cross-Origin-Resource-Policy" content="cross-origin" />

      {/* Origin Agent Cluster for enhanced security */}
      <meta httpEquiv="Origin-Agent-Cluster" content="?1" />

      {/* Enhanced Permissions Policy */}
      <meta
        httpEquiv="Permissions-Policy"
        content="geolocation=(), microphone=(), camera=(), payment=(), usb=(), magnetometer=(), gyroscope=(), accelerometer=(), ambient-light-sensor=(), autoplay=(), battery=(), display-capture=(), document-domain=(), encrypted-media=(), fullscreen=(), midi=(), picture-in-picture=(), publickey-credentials-get=(), screen-wake-lock=(), web-share=()"
      />

      {/* Clear Site Data (for security) */}
      <meta httpEquiv="Clear-Site-Data" content='"cache"' />

      {/* Trusted Types (modern XSS protection) */}
      <meta
        httpEquiv="Require-Trusted-Types-For"
        content="'script'"
      />

      {/* Advanced Client Hints */}
      <meta
        httpEquiv="Accept-CH"
        content="DPR, Viewport-Width, Width, Downlink, ECT, RTT, Save-Data, Device-Memory, Sec-CH-UA, Sec-CH-UA-Mobile, Sec-CH-UA-Platform"
      />
      <meta
        httpEquiv="Critical-CH"
        content="Viewport-Width, Width, DPR, Save-Data, Downlink"
      />

      {/* Performance and Security Resource Hints */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossOrigin="anonymous"
      />
      <link rel="preconnect" href="https://www.google-analytics.com" />
      <link rel="preconnect" href="https://www.googletagmanager.com" />
      <link rel="preconnect" href="https://analytics.google.com" />

      {/* DNS Prefetch for external domains */}
      <link rel="dns-prefetch" href="//fonts.googleapis.com" />
      <link rel="dns-prefetch" href="//fonts.gstatic.com" />
      <link rel="dns-prefetch" href="//www.google-analytics.com" />
      <link rel="dns-prefetch" href="//www.youtube.com" />
      <link rel="dns-prefetch" href="//wa.me" />
      <link rel="dns-prefetch" href="//api.mymemory.translated.net" />
      <link rel="dns-prefetch" href="//libretranslate.de" />

      {/* Critical Resource Preloads with Priority Hints */}
      <link
        rel="preload"
        href="/GatsbyFLF-Bold.ttf"
        as="font"
        type="font/ttf"
        crossOrigin="anonymous"
        // @ts-ignore - fetchpriority is valid but not in TS types yet
        fetchPriority="high"
      />
      <link
        rel="preload"
        href="/images/banda.avif"
        as="image"
        type="image/avif"
        // @ts-ignore - fetchpriority is valid but not in TS types yet
        fetchPriority="high"
      />
      <link 
        rel="modulepreload" 
        href="/src/main.tsx"
        // @ts-ignore - fetchpriority is valid but not in TS types yet
        fetchPriority="high"
      />

      {/* Advanced Prefetches for Performance */}
      <link rel="prefetch" href="/manifest-advanced.json" />
      <link rel="prefetch" href="/sw-advanced.js" />
      <link rel="prefetch" href="/sitemap.xml" />

      {/* Prerender for critical pages (only on fast connections) */}
      <link rel="prerender" href="/sobre" />
      <link rel="prerender" href="/agenda" />

      {/* Report URI for CSP violations (in production, use real endpoint) */}
      {process.env.NODE_ENV === 'production' && (
        <meta
          httpEquiv="Report-To"
          content='{"group":"csp-endpoint","max_age":10886400,"endpoints":[{"url":"https://marianamatheos.com.br/api/csp-report"}],"include_subdomains":true}'
        />
      )}
    </Helmet>
  );
};

export default AdvancedSecurityHeaders;
