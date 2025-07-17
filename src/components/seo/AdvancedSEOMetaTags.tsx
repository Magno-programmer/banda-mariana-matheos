import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

interface AdvancedSEOMetaTagsProps {
  title: string;
  description: string;
  keywords?: string;
  canonicalUrl?: string;
  ogImage?: string;
  pageType?: 'website' | 'article' | 'profile' | 'event' | 'organization';
  isOptimizedForCTR?: boolean;
  enableABTesting?: boolean;
  priority?: 'high' | 'medium' | 'low';
}

// A/B Testing variations for titles and descriptions
interface SEOVariation {
  title: string;
  description: string;
  emoji: string;
  powerWords: string[];
  cta: string;
  urgency: string;
  socialProof: string;
}

// Enhanced CTR optimization with seasonal and contextual variations
const optimizedVariations: Record<string, SEOVariation[]> = {
  '/': [
    {
      title: '🎵 #1 Banda de Jazz BH | Mariana Matheos | ⭐ 5.0 Google | Consulte Hoje!',
      description: '🎵 Banda de Jazz Belo Horizonte | Mariana Matheos Jazz Band - Música ao vivo para casamentos e eventos corporativos. ⭐ 5 estrelas no Google! Últimas datas 2024. Contrate já via WhatsApp.',
      emoji: '🎵',
      powerWords: ['#1', 'Exclusivo', 'Garantido', 'Últimas datas'],
      cta: 'Consulte Hoje!',
      urgency: 'Últimas datas 2024',
      socialProof: '⭐ 5.0 Google'
    },
    {
      title: '🎤 Banda Jazz Premium BH | Mariana Matheos | 500+ Eventos | Orçamento Grátis',
      description: '🎤 Banda de Jazz Premium Belo Horizonte | 500+ eventos realizados | Especialista em casamentos e corporativos. Orçamento gratuito em 2h! Qualidade garantida.',
      emoji: '🎤',
      powerWords: ['Premium', 'Especialista', 'Qualidade garantida'],
      cta: 'Orçamento Grátis',
      urgency: 'Resposta em 2h',
      socialProof: '500+ eventos'
    }
  ],
  '/sobre': [
    {
      title: '🎶 História da Mariana Matheos Jazz Band | 15+ Anos | Conheça Nossa Trajetória',
      description: '🎶 Conheça a história da Mariana Matheos Jazz Band | 15+ anos de experiência | Formação especializada em jazz, bossa nova e música brasileira. Tradição e qualidade em cada apresentação.',
      emoji: '🎶',
      powerWords: ['Tradição', 'Especializada', 'Qualidade'],
      cta: 'Conheça Nossa Trajetória',
      urgency: '',
      socialProof: '15+ anos'
    }
  ],
  '/repertorio': [
    {
      title: '🎼 200+ Músicas Jazz | Repertório Completo | Mariana Matheos | Escute Agora!',
      description: '🎼 200+ músicas no repertório! Jazz clássico, bossa nova, blues e swing. Repertório completo da Mariana Matheos Jazz Band. Escute samples antes de contratar!',
      emoji: '🎼',
      powerWords: ['Completo', 'Clássico', 'Exclusivo'],
      cta: 'Escute Agora!',
      urgency: '',
      socialProof: '200+ músicas'
    }
  ],
  '/agenda': [
    {
      title: '📅 Agenda Limitada 2024 | Mariana Matheos Jazz | Reserve Sua Data Hoje!',
      description: '📅 Agenda limitada 2024! Agende sua apresentação com a Mariana Matheos Jazz Band. Música ao vivo para casamentos e eventos corporativos. Consulte disponibilidade via WhatsApp.',
      emoji: '📅',
      powerWords: ['Limitada', 'Exclusivo', 'Reserve'],
      cta: 'Reserve Sua Data Hoje!',
      urgency: 'Agenda limitada 2024',
      socialProof: ''
    }
  ],
  '/contato': [
    {
      title: '📞 Contato Direto | Mariana Matheos Jazz | Atendimento Imediato | WhatsApp',
      description: '📞 Contato direto com a Mariana Matheos Jazz Band BH | Atendimento imediato via WhatsApp | Orçamento personalizado em 2h. Fale conosco agora!',
      emoji: '📞',
      powerWords: ['Direto', 'Imediato', 'Personalizado'],
      cta: 'Fale Conosco Agora!',
      urgency: 'Atendimento imediato',
      socialProof: ''
    }
  ],
  '/depoimentos': [
    {
      title: '⭐ 5 Estrelas Google | 500+ Depoimentos | Mariana Matheos | Veja Avaliações',
      description: '⭐ 5 estrelas no Google! 500+ depoimentos reais de clientes satisfeitos | Mariana Matheos Jazz Band | Veja por que somos a banda mais recomendada de BH.',
      emoji: '⭐',
      powerWords: ['Reais', 'Satisfeitos', 'Recomendada'],
      cta: 'Veja Avaliações',
      urgency: '',
      socialProof: '⭐ 5 estrelas Google | 500+ depoimentos'
    }
  ],
  '/faq': [
    {
      title: '❓ FAQ Completo | Mariana Matheos Jazz | Todas as Respostas | Leia Agora!',
      description: '❓ FAQ completo da Mariana Matheos Jazz Band | Todas as respostas sobre contratação, repertório, equipamentos e valores. Esclareça suas dúvidas agora!',
      emoji: '❓',
      powerWords: ['Completo', 'Todas', 'Esclareça'],
      cta: 'Leia Agora!',
      urgency: '',
      socialProof: ''
    }
  ],
  '/fotos': [
    {
      title: '📸 Galeria Exclusiva | Mariana Matheos Jazz | 100+ Fotos | Veja Agora!',
      description: '📸 Galeria exclusiva com 100+ fotos da Mariana Matheos Jazz Band em ação! Casamentos, eventos corporativos e shows. Qualidade profissional comprovada.',
      emoji: '📸',
      powerWords: ['Exclusiva', 'Profissional', 'Comprovada'],
      cta: 'Veja Agora!',
      urgency: '',
      socialProof: '100+ fotos'
    }
  ],
  '/videos': [
    {
      title: '🎬 Vídeos Exclusivos | Mariana Matheos Jazz | Shows ao Vivo | Assista Agora!',
      description: '🎬 Vídeos exclusivos da Mariana Matheos Jazz Band! Shows ao vivo, repertório completo em alta qualidade. Conheça nossa performance antes de contratar.',
      emoji: '🎬',
      powerWords: ['Exclusivos', 'Alta qualidade', 'Performance'],
      cta: 'Assista Agora!',
      urgency: '',
      socialProof: ''
    }
  ],
  '/blog': [
    {
      title: '📖 Blog Oficial | Mariana Matheos Jazz | Dicas Exclusivas | Leia Mais!',
      description: '📖 Blog oficial da Mariana Matheos Jazz Band | Dicas exclusivas sobre música para eventos, história do jazz, artistas famosos. Conteúdo premium gratuito!',
      emoji: '📖',
      powerWords: ['Oficial', 'Exclusivas', 'Premium'],
      cta: 'Leia Mais!',
      urgency: '',
      socialProof: ''
    }
  ]
};

// Seasonal emoji variations
const getSeasonalEmoji = (baseEmoji: string): string => {
  const month = new Date().getMonth();
  const seasonalMap: Record<string, string> = {
    '🎵': month >= 9 && month <= 2 ? '🎄🎵' : '🎵', // Christmas season
    '📅': month >= 9 && month <= 2 ? '💒📅' : '📅', // Wedding season
    '🎤': month >= 5 && month <= 8 ? '🌟🎤' : '🎤', // Summer events
  };
  return seasonalMap[baseEmoji] || baseEmoji;
};

// A/B Testing logic
const getActiveVariation = (path: string, enableABTesting: boolean): SEOVariation | null => {
  const variations = optimizedVariations[path];
  if (!variations || variations.length === 0) return null;
  
  if (!enableABTesting) return variations[0];
  
  // Simple A/B testing based on user session
  const sessionId = sessionStorage.getItem('seo-ab-test') || 
    Math.random().toString(36).substring(7);
  sessionStorage.setItem('seo-ab-test', sessionId);
  
  const variationIndex = sessionId.charCodeAt(0) % variations.length;
  return variations[variationIndex];
};

// CTR tracking function
const trackCTREvent = (event: string, data: any) => {
  // Google Analytics 4 tracking
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', event, {
      event_category: 'SEO_CTR',
      event_label: data.path,
      custom_parameters: data
    });
  }
  
  // Custom analytics endpoint
  if (typeof window !== 'undefined') {
    fetch('/api/analytics/ctr', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        event,
        timestamp: new Date().toISOString(),
        ...data
      })
    }).catch(console.error);
  }
};

const AdvancedSEOMetaTags = ({ 
  title, 
  description, 
  keywords = "banda de jazz belo horizonte, música ao vivo, casamentos, eventos corporativos, shows, mariana matheos, jazz band bh",
  canonicalUrl,
  ogImage = "/images/banda.png",
  pageType = "website",
  isOptimizedForCTR = true,
  enableABTesting = true,
  priority = "high"
}: AdvancedSEOMetaTagsProps) => {
  const location = useLocation();
  const [variation, setVariation] = useState<SEOVariation | null>(null);
  const [loadTime] = useState(Date.now());
  
  const baseUrl = "https://marianamatheos.com.br";
  const fullCanonicalUrl = canonicalUrl ? `${baseUrl}${canonicalUrl}` : baseUrl;
  const fullOgImage = ogImage.startsWith('http') ? ogImage : `${baseUrl}${ogImage}`;
  
  useEffect(() => {
    if (isOptimizedForCTR && canonicalUrl) {
      const activeVariation = getActiveVariation(canonicalUrl, enableABTesting);
      setVariation(activeVariation);
      
      // Track page load for CTR analysis
      trackCTREvent('page_load', {
        path: canonicalUrl,
        variation: activeVariation ? 'optimized' : 'standard',
        load_time: Date.now() - loadTime,
        user_agent: navigator.userAgent,
        referrer: document.referrer
      });
    }
  }, [canonicalUrl, isOptimizedForCTR, enableABTesting, loadTime]);
  
  // Use optimized variation if available
  const finalTitle = variation 
    ? variation.title.replace(variation.emoji, getSeasonalEmoji(variation.emoji))
    : title;
  const finalDescription = variation ? variation.description : description;
  
  // Enhanced keywords with power words
  const enhancedKeywords = variation 
    ? `${keywords}, ${variation.powerWords.join(', ')}, ${variation.socialProof}`
    : keywords;
  
  return (
    <Helmet>
      {/* Basic SEO */}
      <title>{finalTitle}</title>
      <meta name="description" content={finalDescription} />
      <meta name="keywords" content={enhancedKeywords} />
      <link rel="canonical" href={fullCanonicalUrl} />
      
      {/* Enhanced meta tags for CTR */}
      <meta name="robots" content="index, follow, max-snippet:-1, max-video-preview:-1, max-image-preview:large" />
      <meta name="author" content="Mariana Matheos Jazz Band" />
      <meta name="theme-color" content="#800000" />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      
      {/* Priority hints for better performance */}
      {priority === 'high' && <link rel="preload" href={fullOgImage} as="image" />}
      
      {/* Open Graph - Enhanced */}
      <meta property="og:title" content={finalTitle} />
      <meta property="og:description" content={finalDescription} />
      <meta property="og:image" content={fullOgImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:type" content="image/png" />
      <meta property="og:url" content={fullCanonicalUrl} />
      <meta property="og:type" content={pageType === 'event' ? 'website' : pageType} />
      <meta property="og:site_name" content="Mariana Matheos Jazz Band" />
      <meta property="og:locale" content="pt_BR" />
      
      {/* Twitter Card - Enhanced */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={finalTitle} />
      <meta name="twitter:description" content={finalDescription} />
      <meta name="twitter:image" content={fullOgImage} />
      <meta name="twitter:creator" content="@marianamatheosoficial" />
      <meta name="twitter:site" content="@marianamatheosoficial" />
      
      {/* WhatsApp specific meta tags */}
      <meta property="og:image:alt" content="Mariana Matheos Jazz Band - Banda de Jazz para Eventos" />
      <meta property="og:description" content={finalDescription} />
      
      {/* Rich Results optimization */}
      <meta name="citation_title" content={finalTitle} />
      <meta name="citation_author" content="Mariana Matheos Jazz Band" />
      <meta name="citation_publication_date" content={new Date().toISOString().split('T')[0]} />
      
      {/* Additional SEO enhancements */}
      <meta name="revisit-after" content="7 days" />
      <meta name="rating" content="general" />
      <meta name="distribution" content="global" />
      <meta name="language" content="pt-BR" />
      <meta name="geo.region" content="BR-MG" />
      <meta name="geo.placename" content="Belo Horizonte" />
      <meta name="geo.position" content="-19.9191;-43.9386" />
      <meta name="ICBM" content="-19.9191, -43.9386" />
      
      {/* Structured data for breadcrumbs */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            {
              "@type": "ListItem",
              "position": 1,
              "name": "Home",
              "item": baseUrl
            },
            ...(canonicalUrl !== '/' ? [{
              "@type": "ListItem",
              "position": 2,
              "name": finalTitle.replace(/[🎵🎤🎶🎼📅📞⭐❓📸🎬📖]/g, '').trim(),
              "item": fullCanonicalUrl
            }] : [])
          ]
        })}
      </script>
      
      {/* Performance monitoring */}
      <script>
        {`
          // Track CTR performance
          window.addEventListener('beforeunload', function() {
            if (typeof gtag !== 'undefined') {
              gtag('event', 'page_engagement', {
                event_category: 'SEO_CTR',
                event_label: '${canonicalUrl}',
                time_on_page: Date.now() - ${loadTime}
              });
            }
          });
        `}
      </script>
    </Helmet>
  );
};

export default AdvancedSEOMetaTags;