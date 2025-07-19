
import { Helmet } from 'react-helmet-async';
import HreflangTags from './HreflangTags';
import { buildCanonicalUrl, normalizeUrl, validateUrl } from '@/utils/urlUtils';

interface SEOMetaTagsProps {
  title: string;
  description: string;
  keywords?: string;
  newsKeywords?: string[]; // New prop for Google News
  canonicalUrl?: string;
  ogImage?: string;
  pageType?: 'website' | 'article' | 'profile' | 'gallery' | 'testimonials';
  isOptimizedForCTR?: boolean;
  robotsContent?: string;
}

// Optimized meta descriptions for better CTR (120–130 chars)
const optimizedDescriptions = {
  '/': '🎵 Banda Jazz BH | Mariana Matheos - Casamentos & Eventos ⭐ 5 estrelas! Música ao vivo profissional. Contrate já via WhatsApp.',
  '/sobre': '🎤 Mariana Matheos Jazz Band - 15+ anos em BH | História, formação e experiência. Especialistas em eventos de alto padrão.',
  '/repertorio': '🎶 200+ Músicas | Jazz, Bossa Nova & Blues | Repertório completo Mariana Matheos Jazz Band. Conheça nosso catálogo musical.',
  '/fotos': '📸 Fotos da Banda | Mariana Matheos Jazz em ação | Galeria profissional de shows, casamentos e eventos corporativos BH.',
  '/videos': '🎬 Vídeos Mariana Matheos Jazz Band | Shows ao vivo BH | Assista apresentações e conheça nossa qualidade musical.',
  '/agenda': '📅 Agende Show | Mariana Matheos Jazz Band BH | Disponibilidade para casamentos e eventos. Consulte via WhatsApp.',
  '/contato': '📞 Contato Mariana Matheos Jazz BH | WhatsApp (31) 99999-9999 | Orçamentos rápidos para shows e apresentações.',
  '/faq': '❓ FAQ Mariana Matheos Jazz Band | Dúvidas sobre contratação, repertório e valores. Todas as respostas que você precisa.',
  '/depoimentos': '⭐ Avaliações 5 Estrelas | Depoimentos reais clientes | Por que Mariana Matheos é a banda jazz mais recomendada de BH.',
  '/blog': '📖 Blog Jazz BH | Mariana Matheos | Dicas eventos, história do jazz e tendências musicais. Conteúdo exclusivo e atual.'
};

// Optimized titles for better SEO and CTR (50–55 chars)
const optimizedTitles = {
  '/': '🎵 Banda Jazz BH | Mariana Matheos - Eventos Premium',
  '/sobre': 'História da Banda 🎤 | Mariana Matheos Jazz BH',
  '/repertorio': '200+ Músicas 🎶 | Repertório Jazz & Bossa Nova',
  '/fotos': 'Fotos da Banda 📸 | Mariana Matheos Jazz BH',
  '/videos': 'Vídeos Shows 🎬 | Mariana Matheos Jazz Band BH',
  '/agenda': 'Agendar Show 📅 | Mariana Matheos Jazz BH',
  '/contato': 'Contato 📞 | Mariana Matheos Jazz Band BH',
  '/faq': 'FAQ 💬 | Mariana Matheos Jazz Band BH',
  '/depoimentos': 'Avaliações ⭐ | Mariana Matheos Jazz BH',
  '/blog': 'Blog Jazz 📖 | Mariana Matheos BH'
};

const SEOMetaTags = ({
  title,
  description,
  keywords = "banda de jazz belo horizonte, música ao vivo, casamentos, eventos corporativos, shows, mariana matheos, jazz band bh",
  newsKeywords,
  canonicalUrl,
  ogImage = "/images/banda.avif",
  pageType = "website",
  isOptimizedForCTR = true,
  robotsContent = "index, follow"
}: SEOMetaTagsProps) => {
  const baseUrl = "https://marianamatheos.com.br";

  // Normalize and validate canonical URL
  const normalizedPath = canonicalUrl ? normalizeUrl(canonicalUrl) : '/';
  const fullCanonicalUrl = buildCanonicalUrl(normalizedPath, baseUrl);
  if (!validateUrl(fullCanonicalUrl)) {
    console.warn(`Invalid canonical URL generated: ${fullCanonicalUrl}`);
  }

  const fullOgImage = ogImage.startsWith('http') ? ogImage : `${baseUrl}${ogImage}`;

  // Apply optimized titles/descriptions if enabled
  const finalTitle = isOptimizedForCTR && optimizedTitles[normalizedPath as keyof typeof optimizedTitles]
    ? optimizedTitles[normalizedPath as keyof typeof optimizedTitles]
    : title;

  const finalDescription = isOptimizedForCTR && optimizedDescriptions[normalizedPath as keyof typeof optimizedDescriptions]
    ? optimizedDescriptions[normalizedPath as keyof typeof optimizedDescriptions]
    : description;

  return (
    <>
      <Helmet>
        {/* Basic SEO tags */}
        <title>{finalTitle}</title>
        <meta name="description" content={finalDescription} />
        <meta name="keywords" content={keywords} />
        
        {/* Google News Keywords - Essential for news indexing */}
        {newsKeywords && newsKeywords.length > 0 && (
          <meta name="news_keywords" content={newsKeywords.join(', ')} />
        )}
        
        <meta name="robots" content={robotsContent} />
        <meta name="author" content="Mariana Matheos Jazz Band" />
        <meta name="theme-color" content="#800000" />

        {/* Canonical URL */}
        <link rel="canonical" href={fullCanonicalUrl} />

        {/* Open Graph */}
        <meta property="og:title" content={finalTitle} />
        <meta property="og:description" content={finalDescription} />
        <meta property="og:image" content={fullOgImage} />
        <meta property="og:url" content={fullCanonicalUrl} />
        <meta property="og:type" content={pageType} />
        <meta property="og:site_name" content="Mariana Matheos Jazz Band" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={finalTitle} />
        <meta name="twitter:description" content={finalDescription} />
        <meta name="twitter:image" content={fullOgImage} />

        {/* Article-specific meta tags for Google News */}
        {pageType === 'article' && (
          <>
            <meta property="article:author" content="Mariana Matheos Jazz Band" />
            <meta property="article:publisher" content="Mariana Matheos Jazz Band" />
            <meta property="article:section" content="Música" />
            <meta name="news_sitemap" content="true" />
          </>
        )}
      </Helmet>

      {/* Hreflang tags managed separately */}
      <HreflangTags />
    </>
  );
};

export default SEOMetaTags;
