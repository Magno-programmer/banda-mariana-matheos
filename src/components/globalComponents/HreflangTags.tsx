import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';

interface HreflangTagsProps {
  baseUrl?: string;
}

const HreflangTags = ({ baseUrl = "https://marianamatheos.com.br" }: HreflangTagsProps) => {
  const location = useLocation();
  const currentPath = location.pathname;

  // International market configuration
  const markets = [
    { hreflang: 'pt-BR', locale: 'pt_BR', url: `${baseUrl}${currentPath}` },
    { hreflang: 'pt', locale: 'pt_BR', url: `${baseUrl}${currentPath}` },
    { hreflang: 'en-US', locale: 'en_US', url: `${baseUrl}/en${currentPath}` },
    { hreflang: 'en', locale: 'en_US', url: `${baseUrl}/en${currentPath}` },
    { hreflang: 'en-GB', locale: 'en_GB', url: `${baseUrl}/en-gb${currentPath}` },
    { hreflang: 'es-ES', locale: 'es_ES', url: `${baseUrl}/es${currentPath}` },
    { hreflang: 'es', locale: 'es_ES', url: `${baseUrl}/es${currentPath}` },
    { hreflang: 'es-AR', locale: 'es_AR', url: `${baseUrl}/es-ar${currentPath}` },
    { hreflang: 'fr-FR', locale: 'fr_FR', url: `${baseUrl}/fr${currentPath}` },
    { hreflang: 'fr', locale: 'fr_FR', url: `${baseUrl}/fr${currentPath}` },
    { hreflang: 'x-default', locale: 'pt_BR', url: `${baseUrl}${currentPath}` },
  ];

  return (
    <Helmet>
      {/* Hreflang tags for international SEO */}
      {markets.map((market) => (
        <link
          key={market.hreflang}
          rel="alternate"
          hrefLang={market.hreflang}
          href={market.url}
        />
      ))}
      
      {/* Open Graph locale alternatives */}
      <meta property="og:locale" content="pt_BR" />
      <meta property="og:locale:alternate" content="en_US" />
      <meta property="og:locale:alternate" content="en_GB" />
      <meta property="og:locale:alternate" content="es_ES" />
      <meta property="og:locale:alternate" content="es_AR" />
      <meta property="og:locale:alternate" content="fr_FR" />
    </Helmet>
  );
};

export default HreflangTags;