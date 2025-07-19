import React from 'react';
import { useLocation } from 'react-router-dom';
import { blogArticlesData, BlogArticle } from '@/data/blogArticlesData';
import { eventsData, serviceOfferings } from '@/data/eventData';
import {
  generateOrganizationSchema,
  generateWebsiteSchema,
  generateBreadcrumbSchema,
  generateEventSeriesSchema,
  generateWebPageSchema,
  generateServiceSchema,
  generateLocalBusinessSchema,
  generateBlogPostingSchema,
  generateFAQSchema,
  generateMusicEventSchema,
  generateImageGallerySchema,
  generateAdvancedImageGallerySchema,
  generateVideoObjectSchema,
  generateReviewSchema,
  generateProductSchema,
  generateEnhancedEventSchema
} from '@/utils/schemaGenerators';

// Import advanced schemas
import {
  generateEnhancedProductSchema,
  generateConsolidatedRatingSchema,
  generateSuperEventSchema,
  generateDigitalDocumentSchema,
  generateCreativeWorkSchema,
  generateSpeakableSchema,
  generateEnhancedFAQSchema,
  generateHowToSchema
} from '@/utils/advancedSchemaGenerators';

interface EnhancedStructuredDataProps {
  currentArticle?: BlogArticle;
  pageType?: 'home' | 'about' | 'gallery' | 'videos' | 'repertoire' | 'booking' | 'faq' | 'testimonials' | 'contact' | 'blog-index' | 'blog-article';
}

const EnhancedStructuredData: React.FC<EnhancedStructuredDataProps> = ({ currentArticle, pageType: propPageType }) => {
  const location = useLocation();
  const path = location.pathname;
  
  // Determine page type based on path if not provided as prop
  const determinePageType = (): string => {
    if (propPageType) return propPageType;
    
    if (path === '/') return 'home';
    if (path === '/sobre') return 'about';
    if (path === '/fotos') return 'gallery';
    if (path === '/videos') return 'videos';
    if (path === '/repertorio') return 'repertoire';
    if (path === '/agenda') return 'booking';
    if (path === '/faq') return 'faq';
    if (path === '/depoimentos') return 'testimonials';
    if (path === '/contato') return 'contact';
    if (path === '/blog') return 'blog-index';
    if (path.startsWith('/blog/') && path !== '/blog/') return 'blog-article';
    
    return 'home'; // Default to home
  };
  
  const pageType = determinePageType();

  // Generate advanced schema based on page type
  switch (pageType) {
    case 'home':
      return (
        <>
          {/* Base Organization Schema */}
          <script 
            type="application/ld+json" 
            dangerouslySetInnerHTML={{ 
              __html: JSON.stringify(generateOrganizationSchema()) 
            }} 
          />
          
          {/* WebSite Schema with SpeakableSpecification */}
          <script 
            type="application/ld+json" 
            dangerouslySetInnerHTML={{ 
              __html: JSON.stringify({
                ...generateWebsiteSchema(),
                ...generateSpeakableSchema()
              })
            }} 
          />
          
          {/* Enhanced Product Schemas */}
          {generateEnhancedProductSchema().map((product, index) => (
            <script 
              key={`enhanced-product-${index}`}
              type="application/ld+json" 
              dangerouslySetInnerHTML={{ 
                __html: JSON.stringify(product)
              }} 
            />
          ))}
          
          {/* Consolidated Rating Schema */}
          <script 
            type="application/ld+json" 
            dangerouslySetInnerHTML={{ 
              __html: JSON.stringify(generateConsolidatedRatingSchema())
            }} 
          />
          
          {/* Super Event Series Schema */}
          <script 
            type="application/ld+json" 
            dangerouslySetInnerHTML={{ 
              __html: JSON.stringify(generateSuperEventSchema())
            }} 
          />
          
          {/* Digital Document Schema */}
          <script 
            type="application/ld+json" 
            dangerouslySetInnerHTML={{ 
              __html: JSON.stringify(generateDigitalDocumentSchema())
            }} 
          />
          
          {/* Creative Work Schema */}
          <script 
            type="application/ld+json" 
            dangerouslySetInnerHTML={{ 
              __html: JSON.stringify(generateCreativeWorkSchema())
            }} 
          />
          
          {/* HowTo Schema */}
          <script 
            type="application/ld+json" 
            dangerouslySetInnerHTML={{ 
              __html: JSON.stringify(generateHowToSchema())
            }} 
          />
          
          {/* WebPage Schema */}
          <script 
            type="application/ld+json" 
            dangerouslySetInnerHTML={{ 
              __html: JSON.stringify(generateWebPageSchema(
                '/',
                'Mariana Matheos Jazz Band - Música ao Vivo para Eventos',
                'Banda de jazz para casamentos e eventos corporativos. Repertório profissional de jazz, bossa nova e música brasileira. Qualidade garantida.',
                'https://marianamatheos.com.br/images/banda-blue-jazz-concurso.avif'
              ))
            }} 
          />
          
          {/* Breadcrumb Schema */}
          <script 
            type="application/ld+json" 
            dangerouslySetInnerHTML={{ 
              __html: JSON.stringify(generateBreadcrumbSchema(path, [
                { name: "Início", url: "https://marianamatheos.com.br/" }
              ]))
            }} 
          />
        </>
      );
      
    case 'about':
      return (
        <>
          {/* Base Organization Schema */}
          <script 
            type="application/ld+json" 
            dangerouslySetInnerHTML={{ 
              __html: JSON.stringify(generateOrganizationSchema()) 
            }} 
          />
          
          {/* WebSite Schema */}
          <script 
            type="application/ld+json" 
            dangerouslySetInnerHTML={{ 
              __html: JSON.stringify(generateWebsiteSchema()) 
            }} 
          />
          
          {/* Creative Work Schema for band story */}
          <script 
            type="application/ld+json" 
            dangerouslySetInnerHTML={{ 
              __html: JSON.stringify(generateCreativeWorkSchema())
            }} 
          />
          
          {/* About WebPage Schema */}
          <script 
            type="application/ld+json" 
            dangerouslySetInnerHTML={{ 
              __html: JSON.stringify(generateWebPageSchema(
                '/sobre',
                'Sobre a Banda - Mariana Matheos Jazz Band',
                'História da Mariana Matheos Jazz Band, formação especializada em jazz, bossa nova e música brasileira para eventos especiais.',
                'https://marianamatheos.com.br/images/cantora.avif'
              ))
            }} 
          />
          
          {/* Breadcrumb Schema */}
          <script 
            type="application/ld+json" 
            dangerouslySetInnerHTML={{ 
              __html: JSON.stringify(generateBreadcrumbSchema(path, [
                { name: "Início", url: "https://marianamatheos.com.br/" },
                { name: "Sobre", url: "https://marianamatheos.com.br/sobre" }
              ]))
            }} 
          />
        </>
      );
      
    case 'gallery':
      return (
        <>
          {/* Base Organization Schema */}
          <script 
            type="application/ld+json" 
            dangerouslySetInnerHTML={{ 
              __html: JSON.stringify(generateOrganizationSchema()) 
            }} 
          />
          
          {/* WebSite Schema */}
          <script 
            type="application/ld+json" 
            dangerouslySetInnerHTML={{ 
              __html: JSON.stringify(generateWebsiteSchema()) 
            }} 
          />
          
          {/* Gallery WebPage Schema */}
          <script 
            type="application/ld+json" 
            dangerouslySetInnerHTML={{ 
              __html: JSON.stringify(generateWebPageSchema(
                '/fotos',
                'Galeria de Fotos - Mariana Matheos Jazz Band',
                'Fotos das apresentações da Mariana Matheos Jazz Band em eventos, casamentos e shows. Veja a banda em ação!',
                'https://marianamatheos.com.br/images/banda-blue-jazz-concurso.avif'
              ))
            }} 
          />
          
          {/* Advanced ImageGallery Schema */}
          <script 
            type="application/ld+json" 
            dangerouslySetInnerHTML={{ 
              __html: JSON.stringify(generateAdvancedImageGallerySchema())
            }} 
          />
          
          {/* Breadcrumb Schema */}
          <script 
            type="application/ld+json" 
            dangerouslySetInnerHTML={{ 
              __html: JSON.stringify(generateBreadcrumbSchema(path, [
                { name: "Início", url: "https://marianamatheos.com.br/" },
                { name: "Galeria de Fotos", url: "https://marianamatheos.com.br/fotos" }
              ]))
            }} 
          />
        </>
      );
      
    case 'booking':
      return (
        <>
          {/* Base Organization Schema */}
          <script 
            type="application/ld+json" 
            dangerouslySetInnerHTML={{ 
              __html: JSON.stringify(generateOrganizationSchema()) 
            }} 
          />
          
          {/* WebSite Schema */}
          <script 
            type="application/ld+json" 
            dangerouslySetInnerHTML={{ 
              __html: JSON.stringify(generateWebsiteSchema()) 
            }} 
          />
          
          {/* Enhanced Product Schemas */}
          {generateEnhancedProductSchema().map((product, index) => (
            <script 
              key={`booking-product-${index}`}
              type="application/ld+json" 
              dangerouslySetInnerHTML={{ 
                __html: JSON.stringify(product)
              }} 
            />
          ))}
          
          {/* Super Event Series Schema */}
          <script 
            type="application/ld+json" 
            dangerouslySetInnerHTML={{ 
              __html: JSON.stringify(generateSuperEventSchema())
            }} 
          />
          
          {/* Digital Document Schema */}
          <script 
            type="application/ld+json" 
            dangerouslySetInnerHTML={{ 
              __html: JSON.stringify(generateDigitalDocumentSchema())
            }} 
          />
          
          {/* HowTo Schema */}
          <script 
            type="application/ld+json" 
            dangerouslySetInnerHTML={{ 
              __html: JSON.stringify(generateHowToSchema())
            }} 
          />
          
          {/* Consolidated Rating Schema */}
          <script 
            type="application/ld+json" 
            dangerouslySetInnerHTML={{ 
              __html: JSON.stringify(generateConsolidatedRatingSchema())
            }} 
          />
          
          {/* Booking WebPage Schema */}
          <script 
            type="application/ld+json" 
            dangerouslySetInnerHTML={{ 
              __html: JSON.stringify(generateWebPageSchema(
                '/agenda',
                'Agendamento - Mariana Matheos Jazz Band',
                'Agende sua apresentação com a Mariana Matheos Jazz Band. Música ao vivo para casamentos, eventos corporativos e shows especiais.',
                'https://marianamatheos.com.br/images/banda-blue-jazz-concurso.avif'
              ))
            }} 
          />
          
          {/* Breadcrumb Schema */}
          <script 
            type="application/ld+json" 
            dangerouslySetInnerHTML={{ 
              __html: JSON.stringify(generateBreadcrumbSchema(path, [
                { name: "Início", url: "https://marianamatheos.com.br/" },
                { name: "Agendamento", url: "https://marianamatheos.com.br/agenda" }
              ]))
            }} 
          />
        </>
      );
      
    case 'faq':
      return (
        <>
          {/* Base Organization Schema */}
          <script 
            type="application/ld+json" 
            dangerouslySetInnerHTML={{ 
              __html: JSON.stringify(generateOrganizationSchema()) 
            }} 
          />
          
          {/* WebSite Schema */}
          <script 
            type="application/ld+json" 
            dangerouslySetInnerHTML={{ 
              __html: JSON.stringify(generateWebsiteSchema()) 
            }} 
          />
          
          {/* Enhanced FAQ Schema */}
          <script 
            type="application/ld+json" 
            dangerouslySetInnerHTML={{ 
              __html: JSON.stringify(generateEnhancedFAQSchema())
            }} 
          />
          
          {/* HowTo Schema */}
          <script 
            type="application/ld+json" 
            dangerouslySetInnerHTML={{ 
              __html: JSON.stringify(generateHowToSchema())
            }} 
          />
          
          {/* FAQ WebPage Schema */}
          <script 
            type="application/ld+json" 
            dangerouslySetInnerHTML={{ 
              __html: JSON.stringify(generateWebPageSchema(
                '/faq',
                'FAQ - Perguntas Frequentes | Mariana Matheos Jazz Band',
                'Dúvidas sobre contratação, repertório e serviços da Mariana Matheos Jazz Band. Respostas às perguntas mais comuns dos clientes.',
                'https://marianamatheos.com.br/images/banda.avif'
              ))
            }} 
          />
          
          {/* Breadcrumb Schema */}
          <script 
            type="application/ld+json" 
            dangerouslySetInnerHTML={{ 
              __html: JSON.stringify(generateBreadcrumbSchema(path, [
                { name: "Início", url: "https://marianamatheos.com.br/" },
                { name: "FAQ", url: "https://marianamatheos.com.br/faq" }
              ]))
            }} 
          />
        </>
      );
      
    case 'testimonials':
      return (
        <>
          {/* Base Organization Schema */}
          <script 
            type="application/ld+json" 
            dangerouslySetInnerHTML={{ 
              __html: JSON.stringify(generateOrganizationSchema()) 
            }} 
          />
          
          {/* WebSite Schema */}
          <script 
            type="application/ld+json" 
            dangerouslySetInnerHTML={{ 
              __html: JSON.stringify(generateWebsiteSchema()) 
            }} 
          />
          
          {/* Consolidated Rating Schema */}
          <script 
            type="application/ld+json" 
            dangerouslySetInnerHTML={{ 
              __html: JSON.stringify(generateConsolidatedRatingSchema())
            }} 
          />
          
          {/* Local Business Schema */}
          <script 
            type="application/ld+json" 
            dangerouslySetInnerHTML={{ 
              __html: JSON.stringify(generateLocalBusinessSchema())
            }} 
          />

          {/* Review Schema para Rich Snippets */}
          <script 
            type="application/ld+json" 
            dangerouslySetInnerHTML={{ 
              __html: JSON.stringify(generateReviewSchema())
            }} 
          />
          
          {/* Testimonials WebPage Schema */}
          <script 
            type="application/ld+json" 
            dangerouslySetInnerHTML={{ 
              __html: JSON.stringify(generateWebPageSchema(
                '/depoimentos',
                'Depoimentos - Mariana Matheos Jazz Band',
                'Avaliações 5 estrelas no Google e depoimentos de clientes satisfeitos com os shows da Mariana Matheos Jazz Band.',
                'https://marianamatheos.com.br/images/banda.avif'
              ))
            }} 
          />
          
          {/* Breadcrumb Schema */}
          <script 
            type="application/ld+json" 
            dangerouslySetInnerHTML={{ 
              __html: JSON.stringify(generateBreadcrumbSchema(path, [
                { name: "Início", url: "https://marianamatheos.com.br/" },
                { name: "Depoimentos", url: "https://marianamatheos.com.br/depoimentos" }
              ]))
            }} 
          />
        </>
      );

    case 'videos':
      return (
        <>
          {/* Base Organization Schema */}
          <script 
            type="application/ld+json" 
            dangerouslySetInnerHTML={{ 
              __html: JSON.stringify(generateOrganizationSchema()) 
            }} 
          />
          
          {/* WebSite Schema */}
          <script 
            type="application/ld+json" 
            dangerouslySetInnerHTML={{ 
              __html: JSON.stringify(generateWebsiteSchema()) 
            }} 
          />
          
          {/* Videos WebPage Schema */}
          <script 
            type="application/ld+json" 
            dangerouslySetInnerHTML={{ 
              __html: JSON.stringify(generateWebPageSchema(
                '/videos',
                'Vídeos - Mariana Matheos Jazz Band',
                'Vídeos das apresentações da Mariana Matheos Jazz Band. Conheça nosso repertório e qualidade musical em ação.',
                'https://img.youtube.com/vi/CO_yWe9z8S0/hqdefault.avif'
              ))
            }} 
          />
          
          {/* VideoObject Schema */}
          <script 
            type="application/ld+json" 
            dangerouslySetInnerHTML={{ 
              __html: JSON.stringify(generateVideoObjectSchema([
                {
                  url: "https://www.youtube.com/watch?v=CO_yWe9z8S0",
                  name: "All About That Bass - Postmodern Jukebox Cover (Matozinhos)",
                  description: "Versão cover em estilo vintage jazz de \"All About That Bass\" apresentada ao vivo em Matozinhos.",
                  thumbnailUrl: "https://img.youtube.com/vi/CO_yWe9z8S0/hqdefault.avif",
                  uploadDate: "2024-01-15T08:00:00+00:00"
                },
                {
                  url: "https://www.youtube.com/watch?v=h8z62Ae5a9Q",
                  name: "Blue Moon - Billie Holiday (Festival Jazz & Blues)",
                  description: "Interpretação jazzística da clássica \"Blue Moon\", apresentada no Festival de Jazz & Blues.",
                  thumbnailUrl: "https://img.youtube.com/vi/h8z62Ae5a9Q/hqdefault.avif",
                  uploadDate: "2024-02-20T08:00:00+00:00"
                },
                {
                  url: "https://www.youtube.com/watch?v=3vUOFhwE134",
                  name: "Summertime (Festival Jazz & Blues)",
                  description: "Performance intensa e envolvente da icônica \"Summertime\", durante o Festival Jazz & Blues.",
                  thumbnailUrl: "https://img.youtube.com/vi/3vUOFhwE134/hqdefault.avif",
                  uploadDate: "2024-03-15T08:00:00+00:00"
                }
              ]))
            }} 
          />
          
          {/* Breadcrumb Schema */}
          <script 
            type="application/ld+json" 
            dangerouslySetInnerHTML={{ 
              __html: JSON.stringify(generateBreadcrumbSchema(path, [
                { name: "Início", url: "https://marianamatheos.com.br/" },
                { name: "Vídeos", url: "https://marianamatheos.com.br/videos" }
              ]))
            }} 
          />
        </>
      );
      
    case 'repertoire':
      return (
        <>
          {/* Base Organization Schema */}
          <script 
            type="application/ld+json" 
            dangerouslySetInnerHTML={{ 
              __html: JSON.stringify(generateOrganizationSchema()) 
            }} 
          />
          
          {/* WebSite Schema */}
          <script 
            type="application/ld+json" 
            dangerouslySetInnerHTML={{ 
              __html: JSON.stringify(generateWebsiteSchema()) 
            }} 
          />
          
          {/* Repertoire WebPage Schema */}
          <script 
            type="application/ld+json" 
            dangerouslySetInnerHTML={{ 
              __html: JSON.stringify(generateWebPageSchema(
                '/repertorio',
                'Repertório - Mariana Matheos Jazz Band',
                'Repertório completo da Mariana Matheos Jazz Band: jazz clássico, bossa nova, blues, swing e música brasileira para todos os eventos.',
                'https://marianamatheos.com.br/images/banda.avif'
              ))
            }} 
          />
          
          {/* Breadcrumb Schema */}
          <script 
            type="application/ld+json" 
            dangerouslySetInnerHTML={{ 
              __html: JSON.stringify(generateBreadcrumbSchema(path, [
                { name: "Início", url: "https://marianamatheos.com.br/" },
                { name: "Repertório", url: "https://marianamatheos.com.br/repertorio" }
              ]))
            }} 
          />
        </>
      );
      
    case 'contact':
      return (
        <>
          {/* Base Organization Schema */}
          <script 
            type="application/ld+json" 
            dangerouslySetInnerHTML={{ 
              __html: JSON.stringify(generateOrganizationSchema()) 
            }} 
          />
          
          {/* WebSite Schema */}
          <script 
            type="application/ld+json" 
            dangerouslySetInnerHTML={{ 
              __html: JSON.stringify(generateWebsiteSchema()) 
            }} 
          />
          
          {/* Contact WebPage Schema */}
          <script 
            type="application/ld+json" 
            dangerouslySetInnerHTML={{ 
              __html: JSON.stringify(generateWebPageSchema(
                '/contato',
                'Contato - Mariana Matheos Jazz Band',
                'Contato da Mariana Matheos Jazz Band para agendamentos e informações sobre shows e apresentações musicais.',
                'https://marianamatheos.com.br/images/banda.avif'
              ))
            }} 
          />
          
          {/* Local Business Schema */}
          <script 
            type="application/ld+json" 
            dangerouslySetInnerHTML={{ 
              __html: JSON.stringify(generateLocalBusinessSchema())
            }} 
          />
          
          {/* Breadcrumb Schema */}
          <script 
            type="application/ld+json" 
            dangerouslySetInnerHTML={{ 
              __html: JSON.stringify(generateBreadcrumbSchema(path, [
                { name: "Início", url: "https://marianamatheos.com.br/" },
                { name: "Contato", url: "https://marianamatheos.com.br/contato" }
              ]))
            }} 
          />
        </>
      );
      
    case 'blog-index':
      return (
        <>
          {/* Base Organization Schema */}
          <script 
            type="application/ld+json" 
            dangerouslySetInnerHTML={{ 
              __html: JSON.stringify(generateOrganizationSchema()) 
            }} 
          />
          
          {/* WebSite Schema */}
          <script 
            type="application/ld+json" 
            dangerouslySetInnerHTML={{ 
              __html: JSON.stringify(generateWebsiteSchema()) 
            }} 
          />
          
          {/* Blog Index WebPage Schema */}
          <script 
            type="application/ld+json" 
            dangerouslySetInnerHTML={{ 
              __html: JSON.stringify(generateWebPageSchema(
                '/blog',
                'Blog Mariana Matheos Jazz',
                'Artigos sobre música jazz, dicas para eventos e inspirações musicais da banda Mariana Matheos Jazz em Belo Horizonte',
                'https://marianamatheos.com.br/images/blog-hero.avif'
              ))
            }} 
          />
          
          {/* Breadcrumb Schema */}
          <script 
            type="application/ld+json" 
            dangerouslySetInnerHTML={{ 
              __html: JSON.stringify(generateBreadcrumbSchema(path, [
                { name: "Início", url: "https://marianamatheos.com.br/" },
                { name: "Blog", url: "https://marianamatheos.com.br/blog" }
              ]))
            }} 
          />
        </>
      );
      
    case 'blog-article':
      // Only render if we have a current article
      if (!currentArticle) return null;
      
      return (
        <>
          {/* Base Organization Schema */}
          <script 
            type="application/ld+json" 
            dangerouslySetInnerHTML={{ 
              __html: JSON.stringify(generateOrganizationSchema()) 
            }} 
          />
          
          {/* WebSite Schema */}
          <script 
            type="application/ld+json" 
            dangerouslySetInnerHTML={{ 
              __html: JSON.stringify(generateWebsiteSchema()) 
            }} 
          />
          
          {/* Blog Article WebPage Schema */}
          <script 
            type="application/ld+json" 
            dangerouslySetInnerHTML={{ 
              __html: JSON.stringify(generateWebPageSchema(
                `/blog/${currentArticle.slug}`,
                currentArticle.seoTitle,
                currentArticle.seoDescription,
                `https://marianamatheos.com.br${currentArticle.image}`
              ))
            }} 
          />
          
          {/* BlogPosting Schema */}
          <script 
            type="application/ld+json" 
            dangerouslySetInnerHTML={{ 
              __html: JSON.stringify(generateBlogPostingSchema(currentArticle))
            }} 
          />
          
          {/* Breadcrumb Schema */}
          <script 
            type="application/ld+json" 
            dangerouslySetInnerHTML={{ 
              __html: JSON.stringify(generateBreadcrumbSchema(path, [
                { name: "Início", url: "https://marianamatheos.com.br/" },
                { name: "Blog", url: "https://marianamatheos.com.br/blog" },
                { name: currentArticle.title, url: `https://marianamatheos.com.br/blog/${currentArticle.slug}` }
              ]))
            }} 
          />
        </>
      );
      
    default:
      return (
        <>
          {/* Base Organization Schema */}
          <script 
            type="application/ld+json" 
            dangerouslySetInnerHTML={{ 
              __html: JSON.stringify(generateOrganizationSchema()) 
            }} 
          />
          
          {/* WebSite Schema */}
          <script 
            type="application/ld+json" 
            dangerouslySetInnerHTML={{ 
              __html: JSON.stringify(generateWebsiteSchema()) 
            }} 
          />
          
          {/* Default WebPage Schema */}
          <script 
            type="application/ld+json" 
            dangerouslySetInnerHTML={{ 
              __html: JSON.stringify(generateWebPageSchema(
                path,
                'Mariana Matheos Jazz Band',
                'Banda de jazz para casamentos e eventos corporativos. Repertório profissional de jazz, bossa nova e música brasileira.',
                'https://marianamatheos.com.br/images/banda-blue-jazz-concurso.avif'
              ))
            }} 
          />
          
          {/* Breadcrumb Schema */}
          <script 
            type="application/ld+json" 
            dangerouslySetInnerHTML={{ 
              __html: JSON.stringify(generateBreadcrumbSchema(path, [
                { name: "Início", url: "https://marianamatheos.com.br/" },
                { name: "Página", url: `https://marianamatheos.com.br${path}` }
              ]))
            }} 
          />
        </>
      );
  }
};

export default EnhancedStructuredData;
