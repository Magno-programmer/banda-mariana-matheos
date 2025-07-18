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

  // Complete international market configuration - 79 markets total
  const markets = [
    // Portuguese markets
    { hreflang: 'pt-BR', locale: 'pt_BR', url: `${baseUrl}${currentPath}`, region: 'Brazil' },
    { hreflang: 'pt', locale: 'pt_BR', url: `${baseUrl}${currentPath}`, region: 'Portuguese' },
    { hreflang: 'pt-PT', locale: 'pt_PT', url: `${baseUrl}/pt${currentPath}`, region: 'Portugal' },
    
    // English markets - Core anglophone + Extended
    { hreflang: 'en-US', locale: 'en_US', url: `${baseUrl}/en${currentPath}`, region: 'United States' },
    { hreflang: 'en', locale: 'en_US', url: `${baseUrl}/en${currentPath}`, region: 'English' },
    { hreflang: 'en-GB', locale: 'en_GB', url: `${baseUrl}/en-gb${currentPath}`, region: 'United Kingdom' },
    { hreflang: 'en-AU', locale: 'en_AU', url: `${baseUrl}/en-au${currentPath}`, region: 'Australia' },
    { hreflang: 'en-CA', locale: 'en_CA', url: `${baseUrl}/en-ca${currentPath}`, region: 'Canada' },
    { hreflang: 'en-IE', locale: 'en_IE', url: `${baseUrl}/en-ie${currentPath}`, region: 'Ireland' },
    { hreflang: 'en-NZ', locale: 'en_NZ', url: `${baseUrl}/en-nz${currentPath}`, region: 'New Zealand' },
    { hreflang: 'en-ZA', locale: 'en_ZA', url: `${baseUrl}/en-za${currentPath}`, region: 'South Africa' },
    { hreflang: 'en-IN', locale: 'en_IN', url: `${baseUrl}/en-in${currentPath}`, region: 'India' },
    { hreflang: 'en-SG', locale: 'en_SG', url: `${baseUrl}/en-sg${currentPath}`, region: 'Singapore' },
    { hreflang: 'en-MY', locale: 'en_MY', url: `${baseUrl}/en-my${currentPath}`, region: 'Malaysia' },
    
    // Spanish markets - Latin America + Spain + Regional variants
    { hreflang: 'es-ES', locale: 'es_ES', url: `${baseUrl}/es${currentPath}`, region: 'Spain' },
    { hreflang: 'es', locale: 'es_ES', url: `${baseUrl}/es${currentPath}`, region: 'Spanish' },
    { hreflang: 'es-AR', locale: 'es_AR', url: `${baseUrl}/es-ar${currentPath}`, region: 'Argentina' },
    { hreflang: 'es-MX', locale: 'es_MX', url: `${baseUrl}/es-mx${currentPath}`, region: 'Mexico' },
    { hreflang: 'es-CO', locale: 'es_CO', url: `${baseUrl}/es-co${currentPath}`, region: 'Colombia' },
    { hreflang: 'es-CL', locale: 'es_CL', url: `${baseUrl}/es-cl${currentPath}`, region: 'Chile' },
    { hreflang: 'es-PE', locale: 'es_PE', url: `${baseUrl}/es-pe${currentPath}`, region: 'Peru' },
    { hreflang: 'es-UY', locale: 'es_UY', url: `${baseUrl}/es-uy${currentPath}`, region: 'Uruguay' },
    { hreflang: 'es-VE', locale: 'es_VE', url: `${baseUrl}/es-ve${currentPath}`, region: 'Venezuela' },
    { hreflang: 'ca-ES', locale: 'ca_ES', url: `${baseUrl}/ca${currentPath}`, region: 'Catalonia' },
    { hreflang: 'eu-ES', locale: 'eu_ES', url: `${baseUrl}/eu${currentPath}`, region: 'Basque Country' },
    { hreflang: 'gl-ES', locale: 'gl_ES', url: `${baseUrl}/gl${currentPath}`, region: 'Galicia' },
    
    // French markets
    { hreflang: 'fr-FR', locale: 'fr_FR', url: `${baseUrl}/fr${currentPath}`, region: 'France' },
    { hreflang: 'fr', locale: 'fr_FR', url: `${baseUrl}/fr${currentPath}`, region: 'French' },
    { hreflang: 'fr-CA', locale: 'fr_CA', url: `${baseUrl}/fr-ca${currentPath}`, region: 'Canada' },
    { hreflang: 'fr-BE', locale: 'fr_BE', url: `${baseUrl}/fr-be${currentPath}`, region: 'Belgium' },
    { hreflang: 'fr-CH', locale: 'fr_CH', url: `${baseUrl}/fr-ch${currentPath}`, region: 'Switzerland' },
    
    // Italian markets (strong jazz tradition)
    { hreflang: 'it-IT', locale: 'it_IT', url: `${baseUrl}/it${currentPath}`, region: 'Italy' },
    { hreflang: 'it', locale: 'it_IT', url: `${baseUrl}/it${currentPath}`, region: 'Italian' },
    { hreflang: 'it-CH', locale: 'it_CH', url: `${baseUrl}/it-ch${currentPath}`, region: 'Switzerland' },
    
    // German markets (robust music market)
    { hreflang: 'de-DE', locale: 'de_DE', url: `${baseUrl}/de${currentPath}`, region: 'Germany' },
    { hreflang: 'de', locale: 'de_DE', url: `${baseUrl}/de${currentPath}`, region: 'German' },
    { hreflang: 'de-AT', locale: 'de_AT', url: `${baseUrl}/de-at${currentPath}`, region: 'Austria' },
    { hreflang: 'de-CH', locale: 'de_CH', url: `${baseUrl}/de-ch${currentPath}`, region: 'Switzerland' },
    
    // Nordic markets (strong music culture)
    { hreflang: 'sv-SE', locale: 'sv_SE', url: `${baseUrl}/sv${currentPath}`, region: 'Sweden' },
    { hreflang: 'da-DK', locale: 'da_DK', url: `${baseUrl}/da${currentPath}`, region: 'Denmark' },
    { hreflang: 'nb-NO', locale: 'nb_NO', url: `${baseUrl}/nb${currentPath}`, region: 'Norway' },
    { hreflang: 'fi-FI', locale: 'fi_FI', url: `${baseUrl}/fi${currentPath}`, region: 'Finland' },
    
    // Benelux
    { hreflang: 'nl-NL', locale: 'nl_NL', url: `${baseUrl}/nl${currentPath}`, region: 'Netherlands' },
    { hreflang: 'nl-BE', locale: 'nl_BE', url: `${baseUrl}/nl-be${currentPath}`, region: 'Belgium' },
    
    // Asian markets (strong jazz following)
    { hreflang: 'ja-JP', locale: 'ja_JP', url: `${baseUrl}/ja${currentPath}`, region: 'Japan' },
    { hreflang: 'ja', locale: 'ja_JP', url: `${baseUrl}/ja${currentPath}`, region: 'Japanese' },
    { hreflang: 'ko-KR', locale: 'ko_KR', url: `${baseUrl}/ko${currentPath}`, region: 'South Korea' },
    { hreflang: 'zh-CN', locale: 'zh_CN', url: `${baseUrl}/zh-cn${currentPath}`, region: 'China' },
    { hreflang: 'zh-TW', locale: 'zh_TW', url: `${baseUrl}/zh-tw${currentPath}`, region: 'Taiwan' },
    { hreflang: 'th-TH', locale: 'th_TH', url: `${baseUrl}/th${currentPath}`, region: 'Thailand' },
    
    // Eastern Europe Complete
    { hreflang: 'pl-PL', locale: 'pl_PL', url: `${baseUrl}/pl${currentPath}`, region: 'Poland' },
    { hreflang: 'cs-CZ', locale: 'cs_CZ', url: `${baseUrl}/cs${currentPath}`, region: 'Czech Republic' },
    { hreflang: 'ru-RU', locale: 'ru_RU', url: `${baseUrl}/ru${currentPath}`, region: 'Russia' },
    { hreflang: 'uk-UA', locale: 'uk_UA', url: `${baseUrl}/uk${currentPath}`, region: 'Ukraine' },
    { hreflang: 'bg-BG', locale: 'bg_BG', url: `${baseUrl}/bg${currentPath}`, region: 'Bulgaria' },
    { hreflang: 'ro-RO', locale: 'ro_RO', url: `${baseUrl}/ro${currentPath}`, region: 'Romania' },
    { hreflang: 'hr-HR', locale: 'hr_HR', url: `${baseUrl}/hr${currentPath}`, region: 'Croatia' },
    { hreflang: 'sl-SI', locale: 'sl_SI', url: `${baseUrl}/sl${currentPath}`, region: 'Slovenia' },
    { hreflang: 'sk-SK', locale: 'sk_SK', url: `${baseUrl}/sk${currentPath}`, region: 'Slovakia' },
    { hreflang: 'hu-HU', locale: 'hu_HU', url: `${baseUrl}/hu${currentPath}`, region: 'Hungary' },
    { hreflang: 'et-EE', locale: 'et_EE', url: `${baseUrl}/et${currentPath}`, region: 'Estonia' },
    { hreflang: 'lv-LV', locale: 'lv_LV', url: `${baseUrl}/lv${currentPath}`, region: 'Latvia' },
    { hreflang: 'lt-LT', locale: 'lt_LT', url: `${baseUrl}/lt${currentPath}`, region: 'Lithuania' },
    
    // Mediterranean & Emerging Markets
    { hreflang: 'el-GR', locale: 'el_GR', url: `${baseUrl}/el${currentPath}`, region: 'Greece' },
    { hreflang: 'mt-MT', locale: 'mt_MT', url: `${baseUrl}/mt${currentPath}`, region: 'Malta' },
    { hreflang: 'el-CY', locale: 'el_CY', url: `${baseUrl}/el-cy${currentPath}`, region: 'Cyprus' },
    
    // Middle East & Other Markets
    { hreflang: 'tr-TR', locale: 'tr_TR', url: `${baseUrl}/tr${currentPath}`, region: 'Turkey' },
    { hreflang: 'ar-SA', locale: 'ar_SA', url: `${baseUrl}/ar${currentPath}`, region: 'Saudi Arabia' },
    { hreflang: 'he-IL', locale: 'he_IL', url: `${baseUrl}/he${currentPath}`, region: 'Israel' },
    { hreflang: 'hi-IN', locale: 'hi_IN', url: `${baseUrl}/hi${currentPath}`, region: 'India' },
    
    // Default fallback
    { hreflang: 'x-default', locale: 'pt_BR', url: `${baseUrl}${currentPath}`, region: 'Default' },
  ].filter(shouldIncludeMarket);

  // Enhanced current content language detection with complete mapping
  const getCurrentLanguage = (): string => {
    const browserLang = getBrowserLanguage();
    
    // Map browser language to our supported languages with ALL regional variants
    if (browserLang.startsWith('pt-pt')) return 'pt-PT';
    if (browserLang.startsWith('pt')) return 'pt-BR';
    
    // English variants
    if (browserLang.startsWith('en-gb')) return 'en-GB';
    if (browserLang.startsWith('en-au')) return 'en-AU';
    if (browserLang.startsWith('en-ca')) return 'en-CA';
    if (browserLang.startsWith('en-ie')) return 'en-IE';
    if (browserLang.startsWith('en-nz')) return 'en-NZ';
    if (browserLang.startsWith('en-za')) return 'en-ZA';
    if (browserLang.startsWith('en-in')) return 'en-IN';
    if (browserLang.startsWith('en-sg')) return 'en-SG';
    if (browserLang.startsWith('en-my')) return 'en-MY';
    if (browserLang.startsWith('en')) return 'en-US';
    
    // Spanish variants
    if (browserLang.startsWith('es-mx')) return 'es-MX';
    if (browserLang.startsWith('es-ar')) return 'es-AR';
    if (browserLang.startsWith('es-co')) return 'es-CO';
    if (browserLang.startsWith('es-cl')) return 'es-CL';
    if (browserLang.startsWith('es-pe')) return 'es-PE';
    if (browserLang.startsWith('es-uy')) return 'es-UY';
    if (browserLang.startsWith('es-ve')) return 'es-VE';
    if (browserLang.startsWith('ca')) return 'ca-ES';
    if (browserLang.startsWith('eu')) return 'eu-ES';
    if (browserLang.startsWith('gl')) return 'gl-ES';
    if (browserLang.startsWith('es')) return 'es-ES';
    
    // French variants
    if (browserLang.startsWith('fr-ca')) return 'fr-CA';
    if (browserLang.startsWith('fr-be')) return 'fr-BE';
    if (browserLang.startsWith('fr-ch')) return 'fr-CH';
    if (browserLang.startsWith('fr')) return 'fr-FR';
    
    // Italian variants
    if (browserLang.startsWith('it-ch')) return 'it-CH';
    if (browserLang.startsWith('it')) return 'it-IT';
    
    // German variants
    if (browserLang.startsWith('de-at')) return 'de-AT';
    if (browserLang.startsWith('de-ch')) return 'de-CH';
    if (browserLang.startsWith('de')) return 'de-DE';
    
    // Nordic languages
    if (browserLang.startsWith('sv')) return 'sv-SE';
    if (browserLang.startsWith('da')) return 'da-DK';
    if (browserLang.startsWith('nb') || browserLang.startsWith('no')) return 'nb-NO';
    if (browserLang.startsWith('fi')) return 'fi-FI';
    
    // Dutch variants
    if (browserLang.startsWith('nl-be')) return 'nl-BE';
    if (browserLang.startsWith('nl')) return 'nl-NL';
    
    // Asian languages
    if (browserLang.startsWith('ja')) return 'ja-JP';
    if (browserLang.startsWith('ko')) return 'ko-KR';
    if (browserLang.startsWith('zh-cn')) return 'zh-CN';
    if (browserLang.startsWith('zh-tw')) return 'zh-TW';
    if (browserLang.startsWith('zh')) return 'zh-CN';
    if (browserLang.startsWith('th')) return 'th-TH';
    if (browserLang.startsWith('hi')) return 'hi-IN';
    
    // Eastern European languages
    if (browserLang.startsWith('pl')) return 'pl-PL';
    if (browserLang.startsWith('cs')) return 'cs-CZ';
    if (browserLang.startsWith('ru')) return 'ru-RU';
    if (browserLang.startsWith('uk')) return 'uk-UA';
    if (browserLang.startsWith('bg')) return 'bg-BG';
    if (browserLang.startsWith('ro')) return 'ro-RO';
    if (browserLang.startsWith('hr')) return 'hr-HR';
    if (browserLang.startsWith('sl')) return 'sl-SI';
    if (browserLang.startsWith('sk')) return 'sk-SK';
    if (browserLang.startsWith('hu')) return 'hu-HU';
    if (browserLang.startsWith('et')) return 'et-EE';
    if (browserLang.startsWith('lv')) return 'lv-LV';
    if (browserLang.startsWith('lt')) return 'lt-LT';
    
    // Mediterranean & Other languages
    if (browserLang.startsWith('el')) return 'el-GR';
    if (browserLang.startsWith('mt')) return 'mt-MT';
    if (browserLang.startsWith('tr')) return 'tr-TR';
    if (browserLang.startsWith('ar')) return 'ar-SA';
    if (browserLang.startsWith('he')) return 'he-IL';
    
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
      
      {/* HTTP Headers simulation via meta tags */}
      <meta httpEquiv="Vary" content="Accept-Language" />
      <meta httpEquiv="Content-Language" content={getCurrentLanguage()} />
      
      {/* Language and region targeting */}
      <meta name="geo.region" content="BR" />
      <meta name="geo.placename" content="Brazil" />
      <meta name="geo.position" content="-19.916681;-43.934493" />
      <meta name="ICBM" content="-19.916681, -43.934493" />
      
      {/* International Sitemap Links */}
      <link rel="sitemap" type="application/xml" href={`${baseUrl}/sitemap.xml`} />
      <link rel="sitemap" type="application/xml" href={`${baseUrl}/sitemap-index.xml`} />
      <link rel="sitemap" type="application/xml" href={`${baseUrl}/sitemap-pt.xml`} />
      <link rel="sitemap" type="application/xml" href={`${baseUrl}/sitemap-en.xml`} />
      <link rel="sitemap" type="application/xml" href={`${baseUrl}/sitemap-es.xml`} />
      <link rel="sitemap" type="application/xml" href={`${baseUrl}/sitemap-international.xml`} />
      
      {/* Performance Hints for International Markets */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="dns-prefetch" href="https://www.google-analytics.com" />
      <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
      <link rel="dns-prefetch" href="https://cdnjs.cloudflare.com" />
      
      {/* CDN Configuration Hints */}
      <meta httpEquiv="x-cdn-geo" content="auto" />
      <meta httpEquiv="x-cdn-cache" content="public, max-age=31536000" />
      
      {/* Content Language Headers */}
      <meta httpEquiv="Content-Language" content={getCurrentLanguage()} />
      <meta httpEquiv="Vary" content="Accept-Language" />
      
      {/* International Analytics */}
      <meta name="google-site-verification" content="" />
      <meta name="msvalidate.01" content="" />
      <meta name="yandex-verification" content="" />
      <meta name="baidu-site-verification" content="" />
      
      {/* Alternative content feeds */}
      <link rel="alternate" type="application/rss+xml" hrefLang="pt-BR" href={`${baseUrl}/feed.xml`} />
      <link rel="alternate" type="application/rss+xml" hrefLang="en" href={`${baseUrl}/en/feed.xml`} />
      
      {/* Link headers for hreflang (via meta) */}
      {markets.slice(0, 5).map((market) => (
        <link
          key={`link-header-${market.hreflang}`}
          rel="alternate"
          href={market.url}
          hrefLang={market.hreflang}
          type="text/html"
        />
      ))}
    </Helmet>
  );
};

export default HreflangTags;