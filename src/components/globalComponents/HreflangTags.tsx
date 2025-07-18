import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import { routeExists } from '@/utils/urlUtils';

interface HreflangTagsProps {
  baseUrl?: string;
}

const HreflangTags = ({ baseUrl = "https://marianamatheos.com.br" }: HreflangTagsProps) => {
  const location = useLocation();
  const currentPath = location.pathname;

  // Browser language detection
  const getBrowserLanguage = (): string => {
    const browserLang = navigator.language || 'pt-BR';
    return browserLang.toLowerCase();
  };

  // Validate if target URL should exist
  const shouldIncludeMarket = (market: any): boolean => {
    // Always include pt-BR (default) and x-default
    if (market.hreflang === 'pt-BR' || market.hreflang === 'pt' || market.hreflang === 'x-default') {
      return true;
    }
    
    // For international markets, only include if route exists in our sitemap
    return routeExists(currentPath);
  };

  // Enhanced international market configuration
  const markets = [
    // Portuguese markets
    { hreflang: 'pt-BR', locale: 'pt_BR', url: `${baseUrl}${currentPath}`, region: 'Brazil' },
    { hreflang: 'pt', locale: 'pt_BR', url: `${baseUrl}${currentPath}`, region: 'Portuguese' },
    { hreflang: 'pt-PT', locale: 'pt_PT', url: `${baseUrl}/pt${currentPath}`, region: 'Portugal' },
    
    // English markets
    { hreflang: 'en-US', locale: 'en_US', url: `${baseUrl}/en${currentPath}`, region: 'United States' },
    { hreflang: 'en', locale: 'en_US', url: `${baseUrl}/en${currentPath}`, region: 'English' },
    { hreflang: 'en-GB', locale: 'en_GB', url: `${baseUrl}/en-gb${currentPath}`, region: 'United Kingdom' },
    { hreflang: 'en-AU', locale: 'en_AU', url: `${baseUrl}/en-au${currentPath}`, region: 'Australia' },
    
    // Spanish markets
    { hreflang: 'es-ES', locale: 'es_ES', url: `${baseUrl}/es${currentPath}`, region: 'Spain' },
    { hreflang: 'es', locale: 'es_ES', url: `${baseUrl}/es${currentPath}`, region: 'Spanish' },
    { hreflang: 'es-AR', locale: 'es_AR', url: `${baseUrl}/es-ar${currentPath}`, region: 'Argentina' },
    { hreflang: 'es-MX', locale: 'es_MX', url: `${baseUrl}/es-mx${currentPath}`, region: 'Mexico' },
    { hreflang: 'es-CO', locale: 'es_CO', url: `${baseUrl}/es-co${currentPath}`, region: 'Colombia' },
    { hreflang: 'es-CL', locale: 'es_CL', url: `${baseUrl}/es-cl${currentPath}`, region: 'Chile' },
    
    // French markets
    { hreflang: 'fr-FR', locale: 'fr_FR', url: `${baseUrl}/fr${currentPath}`, region: 'France' },
    { hreflang: 'fr', locale: 'fr_FR', url: `${baseUrl}/fr${currentPath}`, region: 'French' },
    { hreflang: 'fr-CA', locale: 'fr_CA', url: `${baseUrl}/fr-ca${currentPath}`, region: 'Canada' },
    
    // Italian markets (strong jazz tradition)
    { hreflang: 'it-IT', locale: 'it_IT', url: `${baseUrl}/it${currentPath}`, region: 'Italy' },
    { hreflang: 'it', locale: 'it_IT', url: `${baseUrl}/it${currentPath}`, region: 'Italian' },
    
    // German markets (robust music market)
    { hreflang: 'de-DE', locale: 'de_DE', url: `${baseUrl}/de${currentPath}`, region: 'Germany' },
    { hreflang: 'de', locale: 'de_DE', url: `${baseUrl}/de${currentPath}`, region: 'German' },
    
    // Japanese market (strong jazz following)
    { hreflang: 'ja-JP', locale: 'ja_JP', url: `${baseUrl}/ja${currentPath}`, region: 'Japan' },
    { hreflang: 'ja', locale: 'ja_JP', url: `${baseUrl}/ja${currentPath}`, region: 'Japanese' },
    
    // Default fallback
    { hreflang: 'x-default', locale: 'pt_BR', url: `${baseUrl}${currentPath}`, region: 'Default' },
  ].filter(shouldIncludeMarket);

  // Get current content language
  const getCurrentLanguage = (): string => {
    const browserLang = getBrowserLanguage();
    
    // Map browser language to our supported languages
    if (browserLang.startsWith('pt')) return 'pt-BR';
    if (browserLang.startsWith('en')) return 'en-US';
    if (browserLang.startsWith('es')) return 'es-ES';
    if (browserLang.startsWith('fr')) return 'fr-FR';
    if (browserLang.startsWith('it')) return 'it-IT';
    if (browserLang.startsWith('de')) return 'de-DE';
    if (browserLang.startsWith('ja')) return 'ja-JP';
    
    return 'pt-BR'; // Default fallback
  };

  // Generate Open Graph locale alternatives
  const getOGLocaleAlternatives = (): string[] => {
    const uniqueLocales = [...new Set(markets.map(market => market.locale))];
    return uniqueLocales.filter(locale => locale !== 'pt_BR');
  };

  return (
    <Helmet>
      {/* Content Language */}
      <meta httpEquiv="content-language" content={getCurrentLanguage()} />
      
      {/* Hreflang tags for international SEO */}
      {markets.map((market) => (
        <link
          key={market.hreflang}
          rel="alternate"
          hrefLang={market.hreflang}
          href={market.url}
          title={`${market.region} - Mariana Matheos Jazz Band`}
        />
      ))}
      
      {/* Open Graph locale alternatives */}
      <meta property="og:locale" content="pt_BR" />
      {getOGLocaleAlternatives().map((locale) => (
        <meta 
          key={locale}
          property="og:locale:alternate" 
          content={locale} 
        />
      ))}
      
      {/* Language and region targeting */}
      <meta name="geo.region" content="BR" />
      <meta name="geo.placename" content="Brazil" />
      <meta name="geo.position" content="-19.916681;-43.934493" />
      <meta name="ICBM" content="-19.916681, -43.934493" />
      
      {/* Alternative language suggestions */}
      <link rel="alternate" type="application/rss+xml" hrefLang="pt-BR" href={`${baseUrl}/feed.xml`} />
    </Helmet>
  );
};

export default HreflangTags;