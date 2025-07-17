import { Helmet } from 'react-helmet-async';

interface SEOMetaTagsProps {
  title: string;
  description: string;
  keywords?: string;
  canonicalUrl?: string;
  ogImage?: string;
  pageType?: 'website' | 'article' | 'profile';
  isOptimizedForCTR?: boolean;
}

// Optimized meta descriptions for better CTR
const optimizedDescriptions = {
  '/': '🎵 Banda de Jazz Belo Horizonte | Mariana Matheos Jazz Band - Música ao vivo para casamentos e eventos corporativos. ⭐ 5 estrelas no Google! Contrate já via WhatsApp.',
  '/sobre': 'Conheça a história da Mariana Matheos Jazz Band 🎤 Formação especializada em jazz, bossa nova e música brasileira. 15+ anos de experiência em eventos de alto padrão.',
  '/repertorio': '🎶 200+ músicas no repertório! Jazz clássico, bossa nova, blues e swing. Repertório completo da Mariana Matheos Jazz Band para todos os tipos de eventos.',
  '/fotos': '📸 Veja a Mariana Matheos Jazz Band em ação! Galeria com fotos de apresentações em casamentos, eventos corporativos e shows. Qualidade profissional garantida.',
  '/videos': '🎬 Assista às apresentações da Mariana Matheos Jazz Band! Vídeos de shows ao vivo, repertório completo. Conheça nossa qualidade musical antes de contratar.',
  '/agenda': '📅 Agende sua apresentação com a Mariana Matheos Jazz Band! Música ao vivo para casamentos, eventos corporativos. Consulte disponibilidade via WhatsApp.',
  '/contato': '📞 Contato Mariana Matheos Jazz Band BH | WhatsApp, telefone e email para agendamentos. Atendimento rápido para orçamentos e informações sobre shows.',
  '/faq': '❓ FAQ - Dúvidas sobre contratação da Mariana Matheos Jazz Band. Respostas sobre repertório, equipamentos, valores. Todas as informações que você precisa!',
  '/depoimentos': '⭐ Depoimentos 5 estrelas! Avaliações reais de clientes da Mariana Matheos Jazz Band. Veja por que somos a banda de jazz mais recomendada de BH.',
  '/blog': '📖 Blog Mariana Matheos Jazz Band | Dicas sobre música para eventos, história do jazz, tendências. Conteúdo exclusivo sobre música ao vivo e entretenimento.'
};

const SEOMetaTags = ({ 
  title, 
  description, 
  keywords = "banda de jazz belo horizonte, música ao vivo, casamentos, eventos corporativos, shows, mariana matheos, jazz band bh",
  canonicalUrl,
  ogImage = "/images/banda.png",
  pageType = "website",
  isOptimizedForCTR = true
}: SEOMetaTagsProps) => {
  const baseUrl = "https://marianamatheos.com.br";
  const fullCanonicalUrl = canonicalUrl ? `${baseUrl}${canonicalUrl}` : baseUrl;
  const fullOgImage = ogImage.startsWith('http') ? ogImage : `${baseUrl}${ogImage}`;
  
  // Use optimized description if available and CTR optimization is enabled
  const finalDescription = isOptimizedForCTR && canonicalUrl && optimizedDescriptions[canonicalUrl as keyof typeof optimizedDescriptions] 
    ? optimizedDescriptions[canonicalUrl as keyof typeof optimizedDescriptions]
    : description;

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={finalDescription} />
      <meta name="keywords" content={keywords} />
      <link rel="canonical" href={fullCanonicalUrl} />
      
      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={finalDescription} />
      <meta property="og:image" content={fullOgImage} />
      <meta property="og:url" content={fullCanonicalUrl} />
      <meta property="og:type" content={pageType} />
      <meta property="og:site_name" content="Mariana Matheos Jazz Band" />
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={finalDescription} />
      <meta name="twitter:image" content={fullOgImage} />
      
      {/* Additional SEO tags */}
      <meta name="robots" content="index, follow" />
      <meta name="author" content="Mariana Matheos Jazz Band" />
      <meta name="theme-color" content="#800000" />
    </Helmet>
  );
};

export default SEOMetaTags;