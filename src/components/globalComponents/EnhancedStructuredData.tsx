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
  generateVideoObjectSchema
} from '@/utils/schemaGenerators';

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
          
          {/* WebSite Schema */}
          <script 
            type="application/ld+json" 
            dangerouslySetInnerHTML={{ 
              __html: JSON.stringify(generateWebsiteSchema()) 
            }} 
          />
          
          {/* HomePage WebPage Schema */}
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
          
          {/* Event Schedule Schema */}
          <script 
            type="application/ld+json" 
            dangerouslySetInnerHTML={{ 
              __html: JSON.stringify(generateEventSeriesSchema())
            }} 
          />
          
          {/* Service Schema */}
          <script 
            type="application/ld+json" 
            dangerouslySetInnerHTML={{ 
              __html: JSON.stringify(generateServiceSchema())
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
          
          {/* ImageGallery Schema */}
          <script 
            type="application/ld+json" 
            dangerouslySetInnerHTML={{ 
              __html: JSON.stringify(generateImageGallerySchema([
                { url: "https://marianamatheos.com.br/images/baixista.avif", caption: "Baixista da Mariana Matheos Jazz Band" },
                { url: "https://marianamatheos.com.br/images/pianista.avif", caption: "Pianista da Mariana Matheos Jazz Band" },
                { url: "https://marianamatheos.com.br/images/baterista.avif", caption: "Baterista da Mariana Matheos Jazz Band" },
                { url: "https://marianamatheos.com.br/images/banda-blue-jazz-concurso.avif", caption: "Mariana Matheos Jazz Band em Concurso de Jazz" },
                { url: "https://marianamatheos.com.br/images/banda.avif", caption: "Formação Completa da Banda" }
              ]))
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
          
          {/* Event Series Schema */}
          <script 
            type="application/ld+json" 
            dangerouslySetInnerHTML={{ 
              __html: JSON.stringify(generateEventSeriesSchema())
            }} 
          />
          
          {/* Service Schema */}
          <script 
            type="application/ld+json" 
            dangerouslySetInnerHTML={{ 
              __html: JSON.stringify(generateServiceSchema())
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
          
          {/* FAQ Schema */}
          <script 
            type="application/ld+json" 
            dangerouslySetInnerHTML={{ 
              __html: JSON.stringify(generateFAQSchema([
                {
                  question: "Quanto custa contratar a Mariana Matheos para casamento ou evento?",
                  answer: "O valor varia conforme o tipo de evento, local, duração, estrutura técnica necessária e formação da banda. Casamentos têm valores diferenciados de eventos corporativos. Eventos em cidades próximas a BH têm desconto no deslocamento. Solicite um orçamento personalizado sem compromisso!"
                },
                {
                  question: "Quais estilos musicais fazem parte do repertório da banda?",
                  answer: "Tocamos uma mistura refinada de Jazz Clássico, Soul, Blues, R&B, Bossa Nova, baladas românticas e releituras vintage de pop contemporâneo. Inspirada na Era de Ouro do Jazz (1920–1960), nossa sonoridade é envolvente, elegante e cheia de identidade. Temos mais de 150 músicas no repertório, desde clássicos como 'Fly Me To The Moon' até sucessos modernos com arranjos jazzeados."
                },
                {
                  question: "A banda leva os equipamentos necessários?",
                  answer: "A banda leva seus próprios instrumentos (piano elétrico, baixo, guitarra, bateria completa, trompete), microfones profissionais Shure, pedalboards e todos os cabos. O contratante é responsável apenas pela estrutura básica de som (PA compatível com o espaço), energia elétrica estável e, em alguns casos, alimentação dos músicos após o show."
                },
                {
                  question: "Quantas pessoas compõem a banda?",
                  answer: "A formação padrão tem 5 músicos profissionais: vocal (Mariana Matheos), piano, baixo/guitarra, bateria e trompete — todos com formação musical sólida e carreira consolidada. Para eventos menores ou orçamentos específicos, oferecemos formações reduzidas (trio ou quarteto). Também podemos incluir músicos adicionais como saxofone ou violino mediante solicitação."
                },
                {
                  question: "A banda faz apresentações em eventos corporativos e particulares?",
                  answer: "Absolutamente! Temos experiência em eventos empresariais, jantares elegantes, festivais, bares de vinho, casas de jazz, formaturas, aniversários de 50 anos, vernissages e lançamentos de produtos. Adaptamos o repertório, figurino e energia conforme o clima e perfil do evento. Cada apresentação é única e personalizada."
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
                { name: "Depoimentos", url: "https://marianamatheos.com.br/depoimentos" }
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
