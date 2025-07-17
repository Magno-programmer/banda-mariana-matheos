import React from 'react';
import { useLocation } from 'react-router-dom';
import { blogArticlesData, BlogArticle } from '@/data/blogArticlesData';

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
  
  // Base organization schema that will be referenced in other schemas
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": ["Organization", "MusicGroup"],
    "@id": "https://marianamatheos.com.br/#organization",
    "name": "Mariana Matheos Jazz Band",
    "alternateName": "Mariana Matheos",
    "legalName": "Mariana Matheos Entretenimento Musical",
    "url": "https://marianamatheos.com.br",
    "logo": {
      "@type": "ImageObject",
      "url": "https://marianamatheos.com.br/src/assets/images/Logo-Mariana-Matheos-Jazz-textura-dourada-fundo-transparente.png",
      "width": 600,
      "height": 200,
      "caption": "Logo oficial da Mariana Matheos Jazz Band"
    },
    "image": [
      "https://marianamatheos.com.br/src/assets/images/Logo-Mariana-Matheos-Jazz-textura-dourada-fundo-transparente.png",
      "https://marianamatheos.com.br/public/images/cantora.png",
      "https://marianamatheos.com.br/public/images/banda.png"
    ],
    "description": "Banda de jazz ao vivo sediada em Belo Horizonte, com repertório inspirado na Era de Ouro do Jazz. Especializada em eventos sofisticados, casamentos, festivais e repertório com grandes artistas como Billie Holiday, Amy Winehouse e Nina Simone.",
    "slogan": "A Elegância do Jazz em Seu Evento",
    "knowsAbout": [
      "Jazz Performance",
      "Wedding Music",
      "Corporate Events",
      "Live Music Entertainment",
      "Vintage Jazz",
      "Jazz para Casamento",
      "Billie Holiday",
      "Amy Winehouse",
      "Nina Simone"
    ],
    "genre": ["Jazz", "Soul", "Blues", "R&B", "Bossa Nova"],
    "foundingDate": "2020-01-15",
    "foundingLocation": {
      "@type": "Place",
      "name": "Belo Horizonte",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Belo Horizonte",
        "addressRegion": "MG",
        "addressCountry": "BR"
      }
    },
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Rua da Música, 123",
      "addressLocality": "Belo Horizonte",
      "addressRegion": "MG",
      "postalCode": "30000-000",
      "addressCountry": "BR"
    },
    "contactPoint": [
      {
        "@type": "ContactPoint",
        "telephone": "+55-31-99752-2127",
        "contactType": "Agendamentos",
        "availableLanguage": ["Portuguese", "English"],
        "email": "contato@marianamatheos.com.br"
      },
      {
        "@type": "ContactPoint",
        "telephone": "+55-31-99752-2127",
        "contactType": "customer service",
        "availableLanguage": ["Portuguese", "English"],
        "email": "contato@marianamatheos.com.br"
      }
    ],
    "sameAs": [
      "https://instagram.com/marianamatheosoficial",
      "https://youtube.com/@marianamatheosoficial",
      "https://facebook.com/marianamatheosjazz",
      "https://soundcloud.com/marianamatheosjazz",
      "https://open.spotify.com/artist/marianamatheosjazz"
    ],
    "member": [
      {
        "@type": "Person",
        "name": "Mariana Matheos",
        "jobTitle": "Vocalista e Diretora Artística",
        "image": "https://marianamatheos.com.br/public/images/cantora.png",
        "description": "Vocalista principal e fundadora da banda, com formação em música e anos de experiência em jazz e música brasileira",
        "sameAs": [
          "https://instagram.com/marianamatheosoficial"
        ]
      },
      {
        "@type": "Person",
        "name": "Carlos Magno",
        "jobTitle": "Pianista",
        "description": "Pianista com formação clássica e jazz, responsável pelos arranjos musicais",
        "image": "https://marianamatheos.com.br/public/images/pianista.png"
      },
      {
        "@type": "Person",
        "name": "Tarciso Júnior",
        "jobTitle": "Baixista e Guitarrista",
        "description": "Multi-instrumentista especializado em jazz e blues",
        "image": "https://marianamatheos.com.br/public/images/baixista.png"
      },
      {
        "@type": "Person",
        "name": "Rubens Kalil",
        "jobTitle": "Baterista",
        "description": "Baterista com experiência em diversos gêneros musicais",
        "image": "https://marianamatheos.com.br/public/images/baterista.png"
      },
      {
        "@type": "Person",
        "name": "Charles Amaral",
        "jobTitle": "Trompetista",
        "description": "Trompetista com formação em música instrumental e jazz"
      }
    ],
    "award": [
      "Vencedora Festival de Jazz de Tiradentes 2022",
      "5 Estrelas em Avaliações Google"
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Serviços Musicais",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Apresentação Musical para Casamentos",
            "description": "Show completo de jazz para cerimônias e recepções de casamento",
            "serviceType": "Live Music Entertainment",
            "serviceOutput": "Música ao vivo para cerimônia e recepção"
          },
          "priceSpecification": {
            "@type": "PriceSpecification",
            "price": "4000.00",
            "priceCurrency": "BRL",
            "minPrice": "3000.00",
            "maxPrice": "6000.00",
            "validFrom": "2024-01-01",
            "validThrough": "2025-12-31"
          }
        },
        {
          "@type": "Offer", 
          "itemOffered": {
            "@type": "Service",
            "name": "Eventos Corporativos",
            "description": "Apresentações musicais para eventos empresariais",
            "serviceType": "Corporate Entertainment",
            "serviceOutput": "Música ao vivo para eventos corporativos"
          },
          "priceSpecification": {
            "@type": "PriceSpecification",
            "price": "3500.00",
            "priceCurrency": "BRL",
            "minPrice": "3000.00",
            "maxPrice": "5000.00",
            "validFrom": "2024-01-01",
            "validThrough": "2025-12-31"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service", 
            "name": "Eventos Particulares",
            "description": "Shows personalizados para festivais e comemorações",
            "serviceType": "Private Event Entertainment",
            "serviceOutput": "Música ao vivo para eventos particulares"
          },
          "priceSpecification": {
            "@type": "PriceSpecification",
            "price": "3500.00",
            "priceCurrency": "BRL",
            "minPrice": "2500.00",
            "maxPrice": "5000.00",
            "validFrom": "2024-01-01",
            "validThrough": "2025-12-31"
          }
        }
      ]
    },
    "potentialAction": {
      "@type": "OrderAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://marianamatheos.com.br/agenda",
        "inLanguage": "pt-BR",
        "actionPlatform": [
          "http://schema.org/DesktopWebPlatform",
          "http://schema.org/MobileWebPlatform"
        ]
      },
      "result": {
        "@type": "Reservation",
        "name": "Reserva de Show"
      }
    },
    "review": [
      {
        "@type": "Review",
        "author": { "@type": "Person", "name": "Geraldo Santana" },
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "5",
          "bestRating": "5"
        },
        "datePublished": "2024-03-01",
        "reviewBody": "Excelente cantora!! Vale a pena assistir o seu show!!"
      },
      {
        "@type": "Review",
        "author": { "@type": "Person", "name": "Juciane Petenusso" },
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "5",
          "bestRating": "5"
        },
        "datePublished": "2024-03-05",
        "reviewBody": "Excelente cantora, uma voz maravilhosa e canta todo tipo de música... super animada e simpática"
      }
    ],
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "5",
      "bestRating": "5",
      "worstRating": "1",
      "ratingCount": "32",
      "reviewCount": "32"
    }
  };

  // Base website schema
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://marianamatheos.com.br/#website",
    "name": "Mariana Matheos Jazz Band",
    "url": "https://marianamatheos.com.br",
    "description": "Site oficial da Mariana Matheos Jazz Band - Música ao vivo para casamentos e eventos corporativos",
    "publisher": {
      "@id": "https://marianamatheos.com.br/#organization"
    },
    "inLanguage": "pt-BR",
    "copyrightYear": "2024",
    "datePublished": "2020-01-15T08:00:00+00:00",
    "dateModified": "2025-07-16T10:00:00+00:00",
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://marianamatheos.com.br/search?q={search_term_string}"
      },
      "query-input": "required name=search_term_string"
    }
  };

  // Breadcrumb schema generator function
  const generateBreadcrumbSchema = (items: Array<{name: string, url: string}>) => {
    return {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "@id": `https://marianamatheos.com.br${path}#breadcrumb`,
      "itemListElement": items.map((item, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "name": item.name,
        "item": item.url
      }))
    };
  };

  // Events data for Event schema
  const events = [
    {
      name: "Show da Mariana Matheos no The Bulltique Vino Bar",
      startDate: "2025-08-08T20:00:00-03:00",
      endDate: "2025-08-08T22:00:00-03:00",
      location: {
        name: "The Bulltique Vino Bar",
        address: {
          streetAddress: "Rua do Vinho, 123",
          addressLocality: "Belo Horizonte",
          addressRegion: "MG",
          postalCode: "30000-000",
          addressCountry: "BR"
        }
      },
      price: "25.00",
      priceCurrency: "BRL",
      image: "https://marianamatheos.com.br/public/images/banda.png",
      description: "Uma noite especial de jazz com a Mariana Matheos e sua banda",
      performer: {
        name: "Mariana Matheos Jazz Band"
      }
    },
    {
      name: "Show da Mariana Matheos no Soul Jazz Burguer",
      startDate: "2025-08-16T19:30:00-03:00",
      endDate: "2025-08-16T21:30:00-03:00",
      location: {
        name: "Soul Jazz Burguer",
        address: {
          streetAddress: "Avenida do Jazz, 456",
          addressLocality: "Belo Horizonte",
          addressRegion: "MG",
          postalCode: "30000-000",
          addressCountry: "BR"
        }
      },
      price: "20.00",
      priceCurrency: "BRL",
      image: "https://marianamatheos.com.br/public/images/banda.png",
      description: "Show de jazz ao vivo em ambiente intimista no Soul Jazz Burguer",
      performer: {
        name: "Mariana Matheos Jazz Band"
      }
    }
  ];

  // Generate advanced schema based on page type
  switch (pageType) {
    case 'home':
      return (
        <>
          {/* Base Organization Schema */}
          <script 
            type="application/ld+json" 
            dangerouslySetInnerHTML={{ 
              __html: JSON.stringify(organizationSchema) 
            }} 
          />
          
          {/* WebSite Schema */}
          <script 
            type="application/ld+json" 
            dangerouslySetInnerHTML={{ 
              __html: JSON.stringify(websiteSchema) 
            }} 
          />
          
          {/* HomePage WebPage Schema */}
          <script 
            type="application/ld+json" 
            dangerouslySetInnerHTML={{ 
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "WebPage",
                "@id": "https://marianamatheos.com.br/#webpage",
                "url": "https://marianamatheos.com.br/",
                "name": "Mariana Matheos Jazz Band - Música ao Vivo para Eventos",
                "description": "Banda de jazz para casamentos e eventos corporativos. Repertório profissional de jazz, bossa nova e música brasileira. Qualidade garantida.",
                "isPartOf": {
                  "@id": "https://marianamatheos.com.br/#website"
                },
                "about": {
                  "@id": "https://marianamatheos.com.br/#organization"
                },
                "primaryImageOfPage": {
                  "@type": "ImageObject",
                  "url": "https://marianamatheos.com.br/public/images/banda-blue-jazz-concurso.png",
                  "width": 1200,
                  "height": 630
                },
                "datePublished": "2020-01-15T08:00:00+00:00",
                "dateModified": "2025-07-16T10:00:00+00:00",
                "inLanguage": "pt-BR",
                "potentialAction": [
                  {
                    "@type": "ReadAction",
                    "target": ["https://marianamatheos.com.br/"]
                  },
                  {
                    "@type": "LeaveAction",
                    "actionStatus": "PotentialActionStatus",
                    "target": {
                      "@type": "EntryPoint",
                      "urlTemplate": "https://marianamatheos.com.br/contato"
                    }
                  }
                ],
                "mainEntity": {
                  "@type": "MusicGroup",
                  "@id": "https://marianamatheos.com.br/#organization"
                }
              })
            }} 
          />
          
          {/* Event Schedule Schema */}
          <script 
            type="application/ld+json" 
            dangerouslySetInnerHTML={{ 
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "EventSeries",
                "name": "Shows da Mariana Matheos Jazz Band",
                "description": "Agenda de apresentações da banda Mariana Matheos Jazz",
                "url": "https://marianamatheos.com.br/agenda",
                "startDate": "2025-08-01",
                "endDate": "2025-12-31",
                "location": {
                  "@type": "City",
                  "name": "Belo Horizonte",
                  "address": {
                    "@type": "PostalAddress",
                    "addressLocality": "Belo Horizonte",
                    "addressRegion": "MG",
                    "addressCountry": "BR"
                  }
                },
                "organizer": {
                  "@id": "https://marianamatheos.com.br/#organization"
                },
                "subEvent": events.map(event => ({
                  "@type": "MusicEvent",
                  "name": event.name,
                  "startDate": event.startDate,
                  "endDate": event.endDate,
                  "location": {
                    "@type": "Place",
                    "name": event.location.name,
                    "address": {
                      "@type": "PostalAddress",
                      ...event.location.address
                    }
                  },
                  "offers": {
                    "@type": "Offer",
                    "price": event.price,
                    "priceCurrency": event.priceCurrency,
                    "availability": "https://schema.org/InStock",
                    "validFrom": "2025-07-01T00:00:00-03:00",
                    "url": "https://marianamatheos.com.br/agenda"
                  },
                  "performer": {
                    "@type": "MusicGroup",
                    "name": event.performer.name
                  },
                  "image": event.image,
                  "description": event.description
                }))
              })
            }} 
          />
          
          {/* Service Schema */}
          <script 
            type="application/ld+json" 
            dangerouslySetInnerHTML={{ 
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "Service",
                "serviceType": "MusicEntertainment",
                "provider": {
                  "@id": "https://marianamatheos.com.br/#organization"
                },
                "name": "Serviços Musicais da Mariana Matheos Jazz Band",
                "description": "Música ao vivo para eventos especiais, casamentos e eventos corporativos",
                "category": "Jazz Music Entertainment",
                "audience": {
                  "@type": "Audience",
                  "audienceType": "Event Organizers, Wedding Couples, Corporate Event Planners"
                },
                "offers": {
                  "@type": "AggregateOffer",
                  "highPrice": "6000",
                  "lowPrice": "2500",
                  "priceCurrency": "BRL",
                  "offerCount": "3",
                  "offers": [
                    {
                      "@type": "Offer",
                      "name": "Pacote Básico",
                      "description": "2 horas de show com trio musical",
                      "price": "3000",
                      "priceCurrency": "BRL"
                    },
                    {
                      "@type": "Offer",
                      "name": "Pacote Standard",
                      "description": "2 horas de show com quinteto completo",
                      "price": "4000",
                      "priceCurrency": "BRL"
                    },
                    {
                      "@type": "Offer",
                      "name": "Pacote Premium",
                      "description": "3 horas de show com quinteto completo e repertório 100% personalizado",
                      "price": "5000",
                      "priceCurrency": "BRL"
                    }
                  ]
                },
                "serviceOutput": "Experiência musical ao vivo sofisticada para eventos especiais",
                "termsOfService": "https://marianamatheos.com.br/termos",
                "availableChannel": {
                  "@type": "ServiceChannel",
                  "serviceUrl": "https://marianamatheos.com.br/agenda",
                  "servicePhone": "+55-31-99752-2127",
                  "serviceSmsNumber": "+55-31-99752-2127"
                }
              })
            }} 
          />
          
          {/* SiteNavigationElement Schema */}
          <script 
            type="application/ld+json" 
            dangerouslySetInnerHTML={{ 
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "SiteNavigationElement",
                "name": ["Início", "Sobre", "Fotos", "Vídeos", "Repertório", "Agenda", "FAQ", "Depoimentos", "Contato", "Blog"],
                "url": [
                  "https://marianamatheos.com.br/",
                  "https://marianamatheos.com.br/sobre",
                  "https://marianamatheos.com.br/fotos",
                  "https://marianamatheos.com.br/videos",
                  "https://marianamatheos.com.br/repertorio",
                  "https://marianamatheos.com.br/agenda",
                  "https://marianamatheos.com.br/faq",
                  "https://marianamatheos.com.br/depoimentos",
                  "https://marianamatheos.com.br/contato",
                  "https://marianamatheos.com.br/blog"
                ]
              })
            }} 
          />
        </>
      );
      
    case 'about':
      return (
        <>
          {/* AboutPage Schema */}
          <script 
            type="application/ld+json" 
            dangerouslySetInnerHTML={{ 
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "AboutPage",
                "@id": "https://marianamatheos.com.br/sobre#webpage",
                "url": "https://marianamatheos.com.br/sobre",
                "name": "Sobre a Banda - Mariana Matheos Jazz Band",
                "description": "História da Mariana Matheos Jazz Band, formação especializada em jazz, bossa nova e música brasileira para eventos especiais.",
                "isPartOf": {
                  "@id": "https://marianamatheos.com.br/#website"
                },
                "about": {
                  "@id": "https://marianamatheos.com.br/#organization"
                },
                "primaryImageOfPage": {
                  "@type": "ImageObject",
                  "url": "https://marianamatheos.com.br/public/images/cantora.png",
                  "width": 800,
                  "height": 600
                },
                "datePublished": "2020-01-15T08:00:00+00:00",
                "dateModified": "2025-07-16T10:00:00+00:00",
                "inLanguage": "pt-BR",
                "mainContentOfPage": {
                  "@type": "WebPageElement",
                  "cssSelector": ".about-content"
                }
              })
            }} 
          />
          
          {/* Detailed MusicGroup Schema */}
          <script 
            type="application/ld+json" 
            dangerouslySetInnerHTML={{ 
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "MusicGroup",
                "@id": "https://marianamatheos.com.br/sobre#musicgroup",
                "name": "Mariana Matheos Jazz Band",
                "description": "Grupo musical especializado em apresentações ao vivo com repertório inspirado na Era de Ouro do Jazz. Nossa missão é levar a elegância e sofisticação do jazz clássico para eventos especiais.",
                "url": "https://marianamatheos.com.br/sobre",
                "logo": organizationSchema.logo,
                "image": organizationSchema.image,
                "sameAs": organizationSchema.sameAs,
                "genre": organizationSchema.genre,
                "foundingDate": organizationSchema.foundingDate,
                "foundingLocation": organizationSchema.foundingLocation,
                "member": organizationSchema.member,
                "knowsAbout": organizationSchema.knowsAbout,
                "musicGroupMember": organizationSchema.member,
                "award": organizationSchema.award,
                "album": [
                  {
                    "@type": "MusicAlbum",
                    "name": "Jazz Clássico ao Vivo",
                    "datePublished": "2024-01-15",
                    "numTracks": 12,
                    "track": [
                      {
                        "@type": "MusicRecording",
                        "name": "Fly Me to the Moon",
                        "duration": "PT3M45S"
                      },
                      {
                        "@type": "MusicRecording",
                        "name": "Summertime",
                        "duration": "PT4M20S"
                      }
                    ]
                  }
                ],
                "event": events.map(event => ({
                  "@type": "MusicEvent",
                  "name": event.name,
                  "startDate": event.startDate,
                  "endDate": event.endDate,
                  "location": {
                    "@type": "Place",
                    "name": event.location.name,
                    "address": {
                      "@type": "PostalAddress",
                      ...event.location.address
                    }
                  }
                }))
              })
            }} 
          />
          
          {/* Breadcrumb Schema */}
          <script 
            type="application/ld+json" 
            dangerouslySetInnerHTML={{ 
              __html: JSON.stringify(
                generateBreadcrumbSchema([
                  { name: "Início", url: "https://marianamatheos.com.br/" },
                  { name: "Sobre", url: "https://marianamatheos.com.br/sobre" }
                ])
              )
            }} 
          />
        </>
      );
      
    case 'gallery':
      return (
        <>
          {/* ImageGallery Schema */}
          <script 
            type="application/ld+json" 
            dangerouslySetInnerHTML={{ 
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "ImageGallery",
                "@id": "https://marianamatheos.com.br/fotos#imagegallery",
                "name": "Galeria de Fotos - Mariana Matheos Jazz Band",
                "description": "Fotos das apresentações da Mariana Matheos Jazz Band em eventos, casamentos e shows.",
                "url": "https://marianamatheos.com.br/fotos",
                "image": [
                  {
                    "@type": "ImageObject",
                    "contentUrl": "https://marianamatheos.com.br/public/images/baixista.png",
                    "name": "Baixista da Mariana Matheos Jazz Band",
                    "description": "Baixista profissional em apresentação ao vivo",
                    "representativeOfPage": false
                  },
                  {
                    "@type": "ImageObject",
                    "contentUrl": "https://marianamatheos.com.br/public/images/pianista.png",
                    "name": "Pianista da Mariana Matheos Jazz Band",
                    "description": "Pianista executando repertório de jazz e blues",
                    "representativeOfPage": false
                  },
                  {
                    "@type": "ImageObject",
                    "contentUrl": "https://marianamatheos.com.br/public/images/baterista.png",
                    "name": "Baterista da Mariana Matheos Jazz Band",
                    "description": "Baterista profissional durante apresentação",
                    "representativeOfPage": false
                  },
                  {
                    "@type": "ImageObject",
                    "contentUrl": "https://marianamatheos.com.br/public/images/banda-blue-jazz-concurso.png",
                    "name": "Banda em Concurso de Jazz",
                    "description": "Mariana Matheos Jazz Band em competição musical",
                    "representativeOfPage": true
                  },
                  {
                    "@type": "ImageObject",
                    "contentUrl": "https://marianamatheos.com.br/public/images/banda.png",
                    "name": "Formação Completa da Banda",
                    "description": "Banda completa de jazz com instrumentistas profissionais",
                    "representativeOfPage": false
                  }
                ],
                "author": {
                  "@id": "https://marianamatheos.com.br/#organization"
                },
                "datePublished": "2020-01-15T08:00:00+00:00",
                "dateModified": "2025-07-16T10:00:00+00:00"
              })
            }} 
          />
          
          {/* WebPage Schema */}
          <script 
            type="application/ld+json" 
            dangerouslySetInnerHTML={{ 
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "WebPage",
                "@id": "https://marianamatheos.com.br/fotos#webpage",
                "url": "https://marianamatheos.com.br/fotos",
                "name": "Galeria de Fotos - Mariana Matheos Jazz Band",
                "description": "Fotos das apresentações da Mariana Matheos Jazz Band em eventos, casamentos e shows. Veja a banda em ação!",
                "isPartOf": {
                  "@id": "https://marianamatheos.com.br/#website"
                },
                "about": {
                  "@id": "https://marianamatheos.com.br/#organization"
                },
                "primaryImageOfPage": {
                  "@type": "ImageObject",
                  "url": "https://marianamatheos.com.br/public/images/banda-blue-jazz-concurso.png",
                  "width": 800,
                  "height": 600
                },
                "datePublished": "2020-01-15T08:00:00+00:00",
                "dateModified": "2025-07-16T11:00:00+00:00",
                "inLanguage": "pt-BR",
                "mainEntity": {
                  "@id": "https://marianamatheos.com.br/fotos#imagegallery"
                }
              })
            }} 
          />
          
          {/* Breadcrumb Schema */}
          <script 
            type="application/ld+json" 
            dangerouslySetInnerHTML={{ 
              __html: JSON.stringify(
                generateBreadcrumbSchema([
                  { name: "Início", url: "https://marianamatheos.com.br/" },
                  { name: "Galeria de Fotos", url: "https://marianamatheos.com.br/fotos" }
                ])
              )
            }} 
          />
        </>
      );
      
    case 'videos':
      return (
        <>
          {/* VideoGallery Schema */}
          <script 
            type="application/ld+json" 
            dangerouslySetInnerHTML={{ 
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "VideoGallery",
                "@id": "https://marianamatheos.com.br/videos#videogallery",
                "name": "Vídeos - Mariana Matheos Jazz Band",
                "description": "Vídeos das apresentações da Mariana Matheos Jazz Band. Conheça nosso repertório e qualidade musical em ação.",
                "url": "https://marianamatheos.com.br/videos",
                "mainEntityOfPage": {
                  "@type": "WebPage",
                  "@id": "https://marianamatheos.com.br/videos#webpage"
                },
                "about": {
                  "@id": "https://marianamatheos.com.br/#organization"
                },
                "video": [
                  {
                    "@type": "VideoObject",
                    "name": "All About That Bass - Postmodern Jukebox Cover (Matozinhos)",
                    "description": "Versão cover em estilo vintage jazz de \"All About That Bass\" apresentada ao vivo em Matozinhos.",
                    "thumbnailUrl": "https://img.youtube.com/vi/CO_yWe9z8S0/hqdefault.jpg",
                    "contentUrl": "https://www.youtube.com/watch?v=CO_yWe9z8S0",
                    "embedUrl": "https://www.youtube.com/embed/CO_yWe9z8S0",
                    "uploadDate": "2024-01-15T08:00:00+00:00",
                    "duration": "PT3M0S",
                    "interactionStatistic": {
                      "@type": "InteractionCounter",
                      "interactionType": "https://schema.org/WatchAction",
                      "userInteractionCount": 1200
                    },
                    "author": {
                      "@id": "https://marianamatheos.com.br/#organization"
                    },
                    "publisher": {
                      "@id": "https://marianamatheos.com.br/#organization"
                    }
                  },
                  {
                    "@type": "VideoObject",
                    "name": "Blue Moon - Billie Holiday (Festival Jazz & Blues)",
                    "description": "Interpretação jazzística da clássica \"Blue Moon\", apresentada no Festival de Jazz & Blues.",
                    "thumbnailUrl": "https://img.youtube.com/vi/h8z62Ae5a9Q/hqdefault.jpg",
                    "contentUrl": "https://www.youtube.com/watch?v=h8z62Ae5a9Q",
                    "embedUrl": "https://www.youtube.com/embed/h8z62Ae5a9Q",
                    "uploadDate": "2024-02-20T08:00:00+00:00",
                    "duration": "PT3M30S",
                    "interactionStatistic": {
                      "@type": "InteractionCounter",
                      "interactionType": "https://schema.org/WatchAction",
                      "userInteractionCount": 950
                    },
                    "author": {
                      "@id": "https://marianamatheos.com.br/#organization"
                    },
                    "publisher": {
                      "@id": "https://marianamatheos.com.br/#organization"
                    }
                  },
                  {
                    "@type": "VideoObject",
                    "name": "Summertime (Festival Jazz & Blues)",
                    "description": "Performance intensa e envolvente da icônica \"Summertime\", durante o Festival Jazz & Blues.",
                    "thumbnailUrl": "https://img.youtube.com/vi/3vUOFhwE134/hqdefault.jpg",
                    "contentUrl": "https://www.youtube.com/watch?v=3vUOFhwE134",
                    "embedUrl": "https://www.youtube.com/embed/3vUOFhwE134",
                    "uploadDate": "2024-03-15T08:00:00+00:00",
                    "duration": "PT3M10S",
                    "interactionStatistic": {
                      "@type": "InteractionCounter",
                      "interactionType": "https://schema.org/WatchAction",
                      "userInteractionCount": 1050
                    },
                    "author": {
                      "@id": "https://marianamatheos.com.br/#organization"
                    },
                    "publisher": {
                      "@id": "https://marianamatheos.com.br/#organization"
                    }
                  }
                ]
              })
            }} 
          />
          
          {/* WebPage Schema */}
          <script 
            type="application/ld+json" 
            dangerouslySetInnerHTML={{ 
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "WebPage",
                "@id": "https://marianamatheos.com.br/videos#webpage",
                "url": "https://marianamatheos.com.br/videos",
                "name": "Vídeos - Mariana Matheos Jazz Band",
                "description": "Vídeos das apresentações da Mariana Matheos Jazz Band. Conheça nosso repertório e qualidade musical em ação.",
                "isPartOf": {
                  "@id": "https://marianamatheos.com.br/#website"
                },
                "about": {
                  "@id": "https://marianamatheos.com.br/#organization"
                },
                "primaryImageOfPage": {
                  "@type": "ImageObject",
                  "url": "https://img.youtube.com/vi/CO_yWe9z8S0/hqdefault.jpg",
                  "width": 480,
                  "height": 360
                },
                "datePublished": "2020-01-15T08:00:00+00:00",
                "dateModified": "2025-07-16T12:00:00+00:00",
                "inLanguage": "pt-BR",
                "mainEntity": {
                  "@id": "https://marianamatheos.com.br/videos#videogallery"
                }
              })
            }} 
          />
          
          {/* Breadcrumb Schema */}
          <script 
            type="application/ld+json" 
            dangerouslySetInnerHTML={{ 
              __html: JSON.stringify(
                generateBreadcrumbSchema([
                  { name: "Início", url: "https://marianamatheos.com.br/" },
                  { name: "Vídeos", url: "https://marianamatheos.com.br/videos" }
                ])
              )
            }} 
          />
        </>
      );
      
    case 'repertoire':
      return (
        <>
          {/* CreativeWorkSeries Schema */}
          <script 
            type="application/ld+json" 
            dangerouslySetInnerHTML={{ 
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "CreativeWorkSeries",
                "@id": "https://marianamatheos.com.br/repertorio#musicplaylist",
                "name": "Repertório - Mariana Matheos Jazz Band",
                "description": "Repertório completo da Mariana Matheos Jazz Band: jazz clássico, bossa nova, blues, swing e música brasileira para todos os eventos.",
                "url": "https://marianamatheos.com.br/repertorio",
                "creator": {
                  "@id": "https://marianamatheos.com.br/#organization"
                },
                "genre": ["Jazz", "Blues", "Soul", "R&B", "Bossa Nova"],
                "keywords": "repertório, jazz clássico, bossa nova, blues, swing, música brasileira, playlist",
                "inLanguage": ["pt-BR", "en-US"],
                "workExample": [
                  {
                    "@type": "MusicComposition",
                    "name": "Fly Me to the Moon",
                    "composer": {
                      "@type": "Person",
                      "name": "Bart Howard"
                    },
                    "musicalKey": "C Major",
                    "musicArrangement": "Jazz Arrangement by Mariana Matheos Jazz Band",
                    "recordedAs": {
                      "@type": "MusicRecording",
                      "byArtist": {
                        "@id": "https://marianamatheos.com.br/#organization"
                      }
                    }
                  },
                  {
                    "@type": "MusicComposition",
                    "name": "Summertime",
                    "composer": {
                      "@type": "Person",
                      "name": "George Gershwin"
                    },
                    "musicalKey": "D Minor",
                    "musicArrangement": "Jazz Arrangement by Mariana Matheos Jazz Band",
                    "recordedAs": {
                      "@type": "MusicRecording",
                      "byArtist": {
                        "@id": "https://marianamatheos.com.br/#organization"
                      }
                    }
                  },
                  {
                    "@type": "MusicComposition",
                    "name": "All of Me",
                    "composer": {
                      "@type": "Person",
                      "name": "Gerald Marks"
                    },
                    "musicalKey": "G Major",
                    "musicArrangement": "Jazz Arrangement by Mariana Matheos Jazz Band",
                    "recordedAs": {
                      "@type": "MusicRecording",
                      "byArtist": {
                        "@id": "https://marianamatheos.com.br/#organization"
                      }
                    }
                  }
                ]
              })
            }} 
          />
          
          {/* WebPage Schema */}
          <script 
            type="application/ld+json" 
            dangerouslySetInnerHTML={{ 
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "WebPage",
                "@id": "https://marianamatheos.com.br/repertorio#webpage",
                "url": "https://marianamatheos.com.br/repertorio",
                "name": "Repertório - Mariana Matheos Jazz Band",
                "description": "Repertório completo da Mariana Matheos Jazz Band: jazz clássico, bossa nova, blues, swing e música brasileira para todos os eventos.",
                "isPartOf": {
                  "@id": "https://marianamatheos.com.br/#website"
                },
                "about": {
                  "@id": "https://marianamatheos.com.br/#organization"
                },
                "primaryImageOfPage": {
                  "@type": "ImageObject",
                  "url": "https://marianamatheos.com.br/public/images/banda.png",
                  "width": 800,
                  "height": 600
                },
                "datePublished": "2020-01-15T08:00:00+00:00",
                "dateModified": "2025-07-16T08:45:00+00:00",
                "inLanguage": "pt-BR",
                "mainEntity": {
                  "@id": "https://marianamatheos.com.br/repertorio#musicplaylist"
                }
              })
            }} 
          />
          
          {/* Breadcrumb Schema */}
          <script 
            type="application/ld+json" 
            dangerouslySetInnerHTML={{ 
              __html: JSON.stringify(
                generateBreadcrumbSchema([
                  { name: "Início", url: "https://marianamatheos.com.br/" },
                  { name: "Repertório", url: "https://marianamatheos.com.br/repertorio" }
                ])
              )
            }} 
          />
        </>
      );
      
    case 'booking':
      return (
        <>
          {/* Service & Offer Schema */}
          <script 
            type="application/ld+json" 
            dangerouslySetInnerHTML={{ 
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "Service",
                "@id": "https://marianamatheos.com.br/agenda#service",
                "name": "Agendamento de Shows - Mariana Matheos Jazz Band",
                "description": "Serviço de agendamento de apresentações da banda Mariana Matheos Jazz para casamentos, eventos corporativos e shows especiais.",
                "url": "https://marianamatheos.com.br/agenda",
                "provider": {
                  "@id": "https://marianamatheos.com.br/#organization"
                },
                "serviceType": "Entertainment Booking",
                "audience": [
                  {
                    "@type": "Audience",
                    "audienceType": "Wedding Planners",
                    "name": "Organizadores de Casamentos"
                  },
                  {
                    "@type": "Audience",
                    "audienceType": "Corporate Event Planners",
                    "name": "Organizadores de Eventos Corporativos"
                  },
                  {
                    "@type": "Audience",
                    "audienceType": "Private Event Hosts",
                    "name": "Anfitriões de Eventos Particulares"
                  }
                ],
                "areaServed": {
                  "@type": "State",
                  "name": "Minas Gerais",
                  "containsPlace": [
                    {
                      "@type": "City",
                      "name": "Belo Horizonte"
                    },
                    {
                      "@type": "City",
                      "name": "Nova Lima"
                    },
                    {
                      "@type": "City",
                      "name": "Tiradentes"
                    },
                    {
                      "@type": "City",
                      "name": "Ouro Preto"
                    }
                  ]
                },
                "availableChannel": {
                  "@type": "ServiceChannel",
                  "serviceUrl": "https://marianamatheos.com.br/agenda",
                  "servicePhone": "+55-31-99752-2127",
                  "serviceSmsNumber": "+55-31-99752-2127",
                  "serviceLocation": {
                    "@type": "Place",
                    "name": "Belo Horizonte",
                    "address": organizationSchema.address
                  }
                },
                "hasOfferCatalog": {
                  "@type": "OfferCatalog",
                  "name": "Pacotes de Shows da Mariana Matheos Jazz",
                  "itemListElement": [
                    {
                      "@type": "Offer",
                      "itemOffered": {
                        "@type": "Service",
                        "name": "Apresentação para Casamentos",
                        "description": "Show de jazz para cerimônias e recepções de casamento"
                      },
                      "priceSpecification": {
                        "@type": "PriceSpecification",
                        "price": "4000.00",
                        "priceCurrency": "BRL",
                        "minPrice": "3000.00",
                        "maxPrice": "6000.00",
                        "validFrom": "2024-01-01",
                        "validThrough": "2025-12-31"
                      }
                    },
                    {
                      "@type": "Offer",
                      "itemOffered": {
                        "@type": "Service",
                        "name": "Eventos Corporativos",
                        "description": "Apresentações musicais para eventos empresariais"
                      },
                      "priceSpecification": {
                        "@type": "PriceSpecification",
                        "price": "3500.00",
                        "priceCurrency": "BRL",
                        "minPrice": "3000.00",
                        "maxPrice": "5000.00",
                        "validFrom": "2024-01-01",
                        "validThrough": "2025-12-31"
                      }
                    },
                    {
                      "@type": "Offer",
                      "itemOffered": {
                        "@type": "Service",
                        "name": "Eventos Particulares",
                        "description": "Shows personalizados para festivais e comemorações"
                      },
                      "priceSpecification": {
                        "@type": "PriceSpecification",
                        "price": "3500.00",
                        "priceCurrency": "BRL",
                        "minPrice": "2500.00",
                        "maxPrice": "5000.00",
                        "validFrom": "2024-01-01",
                        "validThrough": "2025-12-31"
                      }
                    }
                  ]
                }
              })
            }} 
          />
          
          {/* WebPage Schema */}
          <script 
            type="application/ld+json" 
            dangerouslySetInnerHTML={{ 
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "WebPage",
                "@id": "https://marianamatheos.com.br/agenda#webpage",
                "url": "https://marianamatheos.com.br/agenda",
                "name": "Agendamento - Mariana Matheos Jazz Band",
                "description": "Agende sua apresentação com a Mariana Matheos Jazz Band. Música ao vivo para casamentos, eventos corporativos e shows especiais.",
                "isPartOf": {
                  "@id": "https://marianamatheos.com.br/#website"
                },
                "about": {
                  "@id": "https://marianamatheos.com.br/#organization"
                },
                "primaryImageOfPage": {
                  "@type": "ImageObject",
                  "url": "https://marianamatheos.com.br/public/images/banda-blue-jazz-concurso.png",
                  "width": 800,
                  "height": 600
                },
                "datePublished": "2020-01-15T08:00:00+00:00",
                "dateModified": "2025-07-16T13:20:00+00:00",
                "inLanguage": "pt-BR",
                "mainEntity": {
                  "@id": "https://marianamatheos.com.br/agenda#service"
                }
              })
            }} 
          />
          
          {/* Breadcrumb Schema */}
          <script 
            type="application/ld+json" 
            dangerouslySetInnerHTML={{ 
              __html: JSON.stringify(
                generateBreadcrumbSchema([
                  { name: "Início", url: "https://marianamatheos.com.br/" },
                  { name: "Agendamento", url: "https://marianamatheos.com.br/agenda" }
                ])
              )
            }} 
          />
        </>
      );
      
    case 'faq':
      return (
        <>
          {/* FAQPage Schema */}
          <script 
            type="application/ld+json" 
            dangerouslySetInnerHTML={{ 
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "FAQPage",
                "@id": "https://marianamatheos.com.br/faq#faqpage",
                "name": "FAQ - Perguntas Frequentes | Mariana Matheos Jazz Band",
                "description": "Dúvidas sobre contratação, repertório e serviços da Mariana Matheos Jazz Band. Respostas às perguntas mais comuns dos clientes.",
                "url": "https://marianamatheos.com.br/faq",
                "inLanguage": "pt-BR",
                "mainEntity": [
                  {
                    "@type": "Question",
                    "name": "Quanto custa contratar a Mariana Matheos para casamento ou evento?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "O valor varia conforme o tipo de evento, local, duração, estrutura técnica necessária e formação da banda. Casamentos têm valores diferenciados de eventos corporativos. Eventos em cidades próximas a BH têm desconto no deslocamento. Solicite um orçamento personalizado sem compromisso!",
                      "author": {
                        "@type": "Organization",
                        "name": "Mariana Matheos Jazz Band"
                      }
                    },
                    "about": {
                      "@type": "Thing",
                      "name": "Contratação e Investimento"
                    },
                    "keywords": "preço, orçamento, casamento, evento, contratação"
                  },
                  {
                    "@type": "Question",
                    "name": "Quais estilos musicais fazem parte do repertório da banda?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Tocamos uma mistura refinada de Jazz Clássico, Soul, Blues, R&B, Bossa Nova, baladas românticas e releituras vintage de pop contemporâneo. Inspirada na Era de Ouro do Jazz (1920–1960), nossa sonoridade é envolvente, elegante e cheia de identidade. Temos mais de 150 músicas no repertório, desde clássicos como 'Fly Me To The Moon' até sucessos modernos com arranjos jazzeados.",
                      "author": {
                        "@type": "Organization",
                        "name": "Mariana Matheos Jazz Band"
                      }
                    },
                    "about": {
                      "@type": "Thing",
                      "name": "Repertório e Estilo Musical"
                    },
                    "keywords": "jazz, soul, blues, bossa nova, repertório, 150 músicas"
                  },
                  {
                    "@type": "Question",
                    "name": "A banda leva os equipamentos necessários?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "A banda leva seus próprios instrumentos (piano elétrico, baixo, guitarra, bateria completa, trompete), microfones profissionais Shure, pedalboards e todos os cabos. O contratante é responsável apenas pela estrutura básica de som (PA compatível com o espaço), energia elétrica estável e, em alguns casos, alimentação dos músicos após o show.",
                      "author": {
                        "@type": "Organization",
                        "name": "Mariana Matheos Jazz Band"
                      }
                    },
                    "about": {
                      "@type": "Thing",
                      "name": "Estrutura Técnica e Logística"
                    },
                    "keywords": "equipamentos, instrumentos, microfones, PA, energia, alimentação"
                  },
                  {
                    "@type": "Question",
                    "name": "Quantas pessoas compõem a banda?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "A formação padrão tem 5 músicos profissionais: vocal (Mariana Matheos), piano, baixo/guitarra, bateria e trompete — todos com formação musical sólida e carreira consolidada. Para eventos menores ou orçamentos específicos, oferecemos formações reduzidas (trio ou quarteto). Também podemos incluir músicos adicionais como saxofone ou violino mediante solicitação.",
                      "author": {
                        "@type": "Organization",
                        "name": "Mariana Matheos Jazz Band"
                      }
                    },
                    "about": {
                      "@type": "Thing",
                      "name": "Formação e Profissionais"
                    },
                    "keywords": "5 músicos, formação, trio, quarteto, saxofone, violino"
                  },
                  {
                    "@type": "Question",
                    "name": "A banda faz apresentações em eventos corporativos e particulares?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Absolutamente! Temos experiência em eventos empresariais, jantares elegantes, festivais, bares de vinho, casas de jazz, formaturas, aniversários de 50 anos, vernissages e lançamentos de produtos. Adaptamos o repertório, figurino e energia conforme o clima e perfil do evento. Cada apresentação é única e personalizada.",
                      "author": {
                        "@type": "Organization",
                        "name": "Mariana Matheos Jazz Band"
                      }
                    },
                    "about": {
                      "@type": "Thing",
                      "name": "Tipos de Eventos"
                    },
                    "keywords": "corporativo, empresarial, festivais, aniversários, vernissages, lançamentos"
                  }
                ],
                "isPartOf": {
                  "@type": "WebSite",
                  "name": "Mariana Matheos Jazz Band",
                  "url": "https://marianamatheos.com.br"
                },
                "publisher": {
                  "@id": "https://marianamatheos.com.br/#organization"
                }
              })
            }} 
          />
          
          {/* WebPage Schema */}
          <script 
            type="application/ld+json" 
            dangerouslySetInnerHTML={{ 
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "WebPage",
                "@id": "https://marianamatheos.com.br/faq#webpage",
                "url": "https://marianamatheos.com.br/faq",
                "name": "FAQ - Perguntas Frequentes | Mariana Matheos Jazz Band",
                "description": "Dúvidas sobre contratação, repertório e serviços da Mariana Matheos Jazz Band. Respostas às perguntas mais comuns dos clientes.",
                "isPartOf": {
                  "@id": "https://marianamatheos.com.br/#website"
                },
                "about": {
                  "@id": "https://marianamatheos.com.br/#organization"
                },
                "primaryImageOfPage": {
                  "@type": "ImageObject",
                  "url": "https://marianamatheos.com.br/public/images/banda.png",
                  "width": 800,
                  "height": 600
                },
                "datePublished": "2020-01-15T08:00:00+00:00",
                "dateModified": "2025-07-16T09:00:00+00:00",
                "inLanguage": "pt-BR",
                "mainEntity": {
                  "@id": "https://marianamatheos.com.br/faq#faqpage"
                }
              })
            }} 
          />
          
          {/* Breadcrumb Schema */}
          <script 
            type="application/ld+json" 
            dangerouslySetInnerHTML={{ 
              __html: JSON.stringify(
                generateBreadcrumbSchema([
                  { name: "Início", url: "https://marianamatheos.com.br/" },
                  { name: "FAQ", url: "https://marianamatheos.com.br/faq" }
                ])
              )
            }} 
          />
        </>
      );
      
    case 'testimonials':
      return (
        <>
          {/* Review Schema */}
          <script 
            type="application/ld+json" 
            dangerouslySetInnerHTML={{ 
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "LocalBusiness",
                "@id": "https://marianamatheos.com.br/depoimentos#localbusiness",
                "name": "Mariana Matheos Jazz Band",
                "description": "Banda de jazz para casamentos e eventos corporativos. Repertório profissional de jazz, bossa nova e música brasileira.",
                "url": "https://marianamatheos.com.br/depoimentos",
                "logo": organizationSchema.logo,
                "image": organizationSchema.image[0],
                "priceRange": "R$2.500 - R$6.000",
                "telephone": "+55-31-99752-2127",
                "email": "contato@marianamatheos.com.br",
                "address": organizationSchema.address,
                "geo": {
                  "@type": "GeoCoordinates",
                  "latitude": -19.917,
                  "longitude": -43.934
                },
                "review": [
                  {
                    "@type": "Review",
                    "author": {
                      "@type": "Person",
                      "name": "Geraldo Santana"
                    },
                    "reviewRating": {
                      "@type": "Rating",
                      "ratingValue": "5",
                      "bestRating": "5",
                      "worstRating": "1"
                    },
                    "datePublished": "2024-03-01",
                    "reviewBody": "Excelente cantora!! Vale a pena assistir o seu show!!",
                    "publisher": {
                      "@type": "Organization",
                      "name": "Google Reviews"
                    }
                  },
                  {
                    "@type": "Review",
                    "author": {
                      "@type": "Person",
                      "name": "Juciane Petenusso"
                    },
                    "reviewRating": {
                      "@type": "Rating",
                      "ratingValue": "5",
                      "bestRating": "5",
                      "worstRating": "1"
                    },
                    "datePublished": "2024-03-05",
                    "reviewBody": "Excelente cantora, uma voz maravilhosa e canta todo tipo de música... super animada e simpática",
                    "publisher": {
                      "@type": "Organization",
                      "name": "Google Reviews"
                    }
                  },
                  {
                    "@type": "Review",
                    "author": {
                      "@type": "Person",
                      "name": "Poliana (Soul Jazz Burguer)"
                    },
                    "reviewRating": {
                      "@type": "Rating",
                      "ratingValue": "5",
                      "bestRating": "5",
                      "worstRating": "1"
                    },
                    "datePublished": "2024-05-01",
                    "reviewBody": "Eeeeiii Mari!! Foi muito bacana!!! Agradecemos mais uma vez a parceria!!",
                    "publisher": {
                      "@type": "Organization",
                      "name": "Cliente"
                    }
                  },
                  {
                    "@type": "Review",
                    "author": {
                      "@type": "Person",
                      "name": "André Serra (Evento de Carros Antigos de Matozinhos)"
                    },
                    "reviewRating": {
                      "@type": "Rating",
                      "ratingValue": "5",
                      "bestRating": "5",
                      "worstRating": "1"
                    },
                    "datePublished": "2024-05-25",
                    "reviewBody": "Seu show foi fantástico! Marcou a história da nossa região. Sucesso total!",
                    "publisher": {
                      "@type": "Organization",
                      "name": "Cliente"
                    }
                  }
                ],
                "aggregateRating": {
                  "@type": "AggregateRating",
                  "ratingValue": "5",
                  "bestRating": "5",
                  "worstRating": "1",
                  "reviewCount": "32",
                  "ratingCount": "32"
                }
              })
            }} 
          />
          
          {/* WebPage Schema */}
          <script 
            type="application/ld+json" 
            dangerouslySetInnerHTML={{ 
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "WebPage",
                "@id": "https://marianamatheos.com.br/depoimentos#webpage",
                "url": "https://marianamatheos.com.br/depoimentos",
                "name": "Depoimentos - Mariana Matheos Jazz Band",
                "description": "Avaliações 5 estrelas no Google e depoimentos de clientes satisfeitos com os shows da Mariana Matheos Jazz Band.",
                "isPartOf": {
                  "@id": "https://marianamatheos.com.br/#website"
                },
                "about": {
                  "@id": "https://marianamatheos.com.br/#organization"
                },
                "primaryImageOfPage": {
                  "@type": "ImageObject",
                  "url": "https://marianamatheos.com.br/public/images/banda.png",
                  "width": 800,
                  "height": 600
                },
                "datePublished": "2020-01-15T08:00:00+00:00",
                "dateModified": "2025-07-16T10:15:00+00:00",
                "inLanguage": "pt-BR",
                "mainEntity": {
                  "@id": "https://marianamatheos.com.br/depoimentos#localbusiness"
                }
              })
            }} 
          />
          
          {/* Breadcrumb Schema */}
          <script 
            type="application/ld+json" 
            dangerouslySetInnerHTML={{ 
              __html: JSON.stringify(
                generateBreadcrumbSchema([
                  { name: "Início", url: "https://marianamatheos.com.br/" },
                  { name: "Depoimentos", url: "https://marianamatheos.com.br/depoimentos" }
                ])
              )
            }} 
          />
        </>
      );
      
    case 'contact':
      return (
        <>
          {/* LocalBusiness Schema */}
          <script 
            type="application/ld+json" 
            dangerouslySetInnerHTML={{ 
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "LocalBusiness",
                "@id": "https://marianamatheos.com.br/contato#localbusiness",
                "name": "Mariana Matheos Jazz Band",
                "description": "Banda de jazz para casamentos e eventos corporativos. Repertório profissional de jazz, bossa nova e música brasileira.",
                "url": "https://marianamatheos.com.br/contato",
                "logo": organizationSchema.logo,
                "image": organizationSchema.image[0],
                "priceRange": "R$2.500 - R$6.000",
                "telephone": "+55-31-99752-2127",
                "email": "contato@marianamatheos.com.br",
                "address": organizationSchema.address,
                "geo": {
                  "@type": "GeoCoordinates",
                  "latitude": -19.917,
                  "longitude": -43.934
                },
                "areaServed": [
                  {
                    "@type": "City",
                    "name": "Belo Horizonte"
                  },
                  {
                    "@type": "City",
                    "name": "Nova Lima"
                  },
                  {
                    "@type": "City",
                    "name": "Tiradentes"
                  },
                  {
                    "@type": "City",
                    "name": "Ouro Preto"
                  }
                ],
                "openingHoursSpecification": {
                  "@type": "OpeningHoursSpecification",
                  "dayOfWeek": [
                    "Monday",
                    "Tuesday",
                    "Wednesday",
                    "Thursday",
                    "Friday"
                  ],
                  "opens": "09:00",
                  "closes": "18:00"
                },
                "potentialAction": {
                  "@type": "ReserveAction",
                  "target": {
                    "@type": "EntryPoint",
                    "urlTemplate": "https://marianamatheos.com.br/agenda",
                    "inLanguage": "pt-BR",
                    "actionPlatform": [
                      "http://schema.org/DesktopWebPlatform",
                      "http://schema.org/MobileWebPlatform"
                    ]
                  },
                  "result": {
                    "@type": "Reservation",
                    "name": "Reserva de Show"
                  }
                },
                "hasOfferCatalog": organizationSchema.hasOfferCatalog,
                "sameAs": organizationSchema.sameAs
              })
            }} 
          />
          
          {/* ContactPage Schema */}
          <script 
            type="application/ld+json" 
            dangerouslySetInnerHTML={{ 
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "ContactPage",
                "@id": "https://marianamatheos.com.br/contato#webpage",
                "url": "https://marianamatheos.com.br/contato",
                "name": "Contato - Mariana Matheos Jazz Band",
                "description": "Contato da Mariana Matheos Jazz Band para agendamentos e informações sobre shows e apresentações musicais.",
                "isPartOf": {
                  "@id": "https://marianamatheos.com.br/#website"
                },
                "about": {
                  "@id": "https://marianamatheos.com.br/#organization"
                },
                "primaryImageOfPage": {
                  "@type": "ImageObject",
                  "url": "https://marianamatheos.com.br/public/images/banda.png",
                  "width": 800,
                  "height": 600
                },
                "datePublished": "2020-01-15T08:00:00+00:00",
                "dateModified": "2025-07-16T07:30:00+00:00",
                "inLanguage": "pt-BR",
                "mainEntity": {
                  "@id": "https://marianamatheos.com.br/contato#localbusiness"
                }
              })
            }} 
          />
          
          {/* Breadcrumb Schema */}
          <script 
            type="application/ld+json" 
            dangerouslySetInnerHTML={{ 
              __html: JSON.stringify(
                generateBreadcrumbSchema([
                  { name: "Início", url: "https://marianamatheos.com.br/" },
                  { name: "Contato", url: "https://marianamatheos.com.br/contato" }
                ])
              )
            }} 
          />
        </>
      );
      
    case 'blog-index':
      return (
        <>
          {/* Blog Collection Schema */}
          <script 
            type="application/ld+json" 
            dangerouslySetInnerHTML={{ 
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "CollectionPage",
                "@id": "https://marianamatheos.com.br/blog#webpage",
                "name": "Blog Mariana Matheos Jazz",
                "description": "Artigos sobre música jazz, dicas para eventos e inspirações musicais da banda Mariana Matheos Jazz em Belo Horizonte",
                "url": "https://marianamatheos.com.br/blog",
                "isPartOf": {
                  "@id": "https://marianamatheos.com.br/#website"
                },
                "about": {
                  "@id": "https://marianamatheos.com.br/#organization"
                },
                "inLanguage": "pt-BR",
                "mainEntity": {
                  "@type": "ItemList",
                  "numberOfItems": blogArticlesData.length,
                  "itemListElement": blogArticlesData.map((article, index) => ({
                    "@type": "ListItem",
                    "position": index + 1,
                    "item": {
                      "@type": "BlogPosting",
                      "@id": `https://marianamatheos.com.br/blog/${article.slug}`,
                      "headline": article.title,
                      "description": article.excerpt,
                      "image": {
                        "@type": "ImageObject",
                        "url": `https://marianamatheos.com.br${article.image}`,
                        "width": 800,
                        "height": 600
                      },
                      "datePublished": article.publishedDate,
                      "dateModified": article.publishedDate,
                      "author": {
                        "@type": "Person",
                        "name": article.author,
                        "url": "https://marianamatheos.com.br"
                      },
                      "publisher": {
                        "@id": "https://marianamatheos.com.br/#organization"
                      },
                      "mainEntityOfPage": {
                        "@type": "WebPage",
                        "@id": `https://marianamatheos.com.br/blog/${article.slug}`
                      },
                      "articleSection": article.category,
                      "keywords": article.keywords.join(", "),
                      "wordCount": article.content.split(' ').filter(word => word.length > 0).length,
                      "timeRequired": `PT${parseInt(article.readingTime)}M`
                    }
                  }))
                },
                "breadcrumb": {
                  "@type": "BreadcrumbList",
                  "itemListElement": [
                    {
                      "@type": "ListItem",
                      "position": 1,
                      "name": "Início",
                      "item": "https://marianamatheos.com.br"
                    },
                    {
                      "@type": "ListItem",
                      "position": 2,
                      "name": "Blog",
                      "item": "https://marianamatheos.com.br/blog"
                    }
                  ]
                },
                "primaryImageOfPage": {
                  "@type": "ImageObject",
                  "url": "https://marianamatheos.com.br/images/blog-hero.jpg",
                  "width": 1200,
                  "height": 600
                },
                "datePublished": "2020-01-15T08:00:00+00:00",
                "dateModified": "2025-07-18T00:00:00+00:00"
              })
            }} 
          />
          
          {/* WebSite Schema for Blog */}
          <script 
            type="application/ld+json" 
            dangerouslySetInnerHTML={{ 
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "WebSite",
                "@id": "https://marianamatheos.com.br/blog#website",
                "name": "Blog Mariana Matheos Jazz",
                "url": "https://marianamatheos.com.br/blog",
                "description": "Blog oficial da banda Mariana Matheos Jazz com artigos sobre música, eventos e cultura jazzística",
                "publisher": {
                  "@id": "https://marianamatheos.com.br/#organization"
                },
                "inLanguage": "pt-BR",
                "potentialAction": {
                  "@type": "SearchAction",
                  "target": {
                    "@type": "EntryPoint",
                    "urlTemplate": "https://marianamatheos.com.br/blog?search={search_term_string}"
                  },
                  "query-input": "required name=search_term_string"
                },
                "mainEntity": {
                  "@type": "Blog",
                  "name": "Blog Mariana Matheos Jazz",
                  "description": "Artigos e inspirações sobre música jazz para eventos elegantes",
                  "blogPost": blogArticlesData.map(article => ({
                    "@type": "BlogPosting",
                    "@id": `https://marianamatheos.com.br/blog/${article.slug}`,
                    "headline": article.title,
                    "datePublished": article.publishedDate,
                    "author": {
                      "@type": "Person",
                      "name": article.author
                    }
                  }))
                }
              })
            }} 
          />
        </>
      );
      
    case 'blog-article':
      // Only render if we have a current article
      if (!currentArticle) return null;
      
      return (
        <>
          {/* BlogPosting Schema */}
          <script 
            type="application/ld+json" 
            dangerouslySetInnerHTML={{ 
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "BlogPosting",
                "@id": `https://marianamatheos.com.br/blog/${currentArticle.slug}#blogposting`,
                "headline": currentArticle.title,
                "alternativeHeadline": currentArticle.excerpt,
                "description": currentArticle.seoDescription,
                "image": {
                  "@type": "ImageObject",
                  "url": `https://marianamatheos.com.br${currentArticle.image}`,
                  "width": 1200,
                  "height": 800,
                  "caption": currentArticle.imageAlt
                },
                "datePublished": currentArticle.publishedDate,
                "dateModified": currentArticle.publishedDate,
                "author": {
                  "@type": "Person",
                  "name": currentArticle.author,
                  "url": "https://marianamatheos.com.br",
                  "jobTitle": "Vocalista e Líder da Banda",
                  "worksFor": {
                    "@id": "https://marianamatheos.com.br/#organization"
                  }
                },
                "publisher": {
                  "@id": "https://marianamatheos.com.br/#organization"
                },
                "mainEntityOfPage": {
                  "@type": "WebPage",
                  "@id": `https://marianamatheos.com.br/blog/${currentArticle.slug}#webpage`,
                  "url": `https://marianamatheos.com.br/blog/${currentArticle.slug}`,
                  "name": currentArticle.seoTitle,
                  "description": currentArticle.seoDescription,
                  "inLanguage": "pt-BR",
                  "isPartOf": {
                    "@id": "https://marianamatheos.com.br/blog#website"
                  }
                },
                "keywords": currentArticle.keywords.join(", "),
                "articleSection": currentArticle.category,
                "genre": [currentArticle.category, "Jazz", "Música"],
                "wordCount": currentArticle.content.split(' ').filter(word => word.length > 0).length,
                "timeRequired": `PT${parseInt(currentArticle.readingTime)}M`,
                "inLanguage": "pt-BR",
                "copyrightYear": new Date(currentArticle.publishedDate).getFullYear(),
                "copyrightHolder": {
                  "@id": "https://marianamatheos.com.br/#organization"
                },
                "about": {
                  "@type": "Thing",
                  "name": "Jazz Music",
                  "description": "Artigos sobre música jazz, eventos musicais e cultura jazzística"
                },
                "mentions": currentArticle.tags.map(tag => ({
                  "@type": "Thing",
                  "name": tag
                })),
                "isAccessibleForFree": true,
                "hasPart": {
                  "@type": "WebPageElement",
                  "isAccessibleForFree": true,
                  "cssSelector": ".prose"
                }
              })
            }} 
          />
          
          {/* BreadcrumbList Schema */}
          <script 
            type="application/ld+json" 
            dangerouslySetInnerHTML={{ 
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "BreadcrumbList",
                "itemListElement": [
                  {
                    "@type": "ListItem",
                    "position": 1,
                    "name": "Início",
                    "item": "https://marianamatheos.com.br"
                  },
                  {
                    "@type": "ListItem",
                    "position": 2,
                    "name": "Blog",
                    "item": "https://marianamatheos.com.br/blog"
                  },
                  {
                    "@type": "ListItem",
                    "position": 3,
                    "name": currentArticle.title,
                    "item": `https://marianamatheos.com.br/blog/${currentArticle.slug}`
                  }
                ]
              })
            }} 
          />
          
          {/* Article Series Schema */}
          <script 
            type="application/ld+json" 
            dangerouslySetInnerHTML={{ 
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "CreativeWorkSeries",
                "name": `Série: ${currentArticle.category}`,
                "description": `Artigos da categoria ${currentArticle.category} do blog Mariana Matheos Jazz`,
                "publisher": {
                  "@id": "https://marianamatheos.com.br/#organization"
                },
                "hasPart": {
                  "@type": "BlogPosting",
                  "@id": `https://marianamatheos.com.br/blog/${currentArticle.slug}#blogposting`
                },
                "about": {
                  "@type": "Thing",
                  "name": currentArticle.category,
                  "description": `Artigos sobre ${currentArticle.category.toLowerCase()} relacionados à música jazz`
                }
              })
            }} 
          />
        </>
      );
      
    default:
      // Default case for any other page - return basic schemas
      return (
        <>
          <script 
            type="application/ld+json" 
            dangerouslySetInnerHTML={{ 
              __html: JSON.stringify(organizationSchema) 
            }} 
          />
          
          <script 
            type="application/ld+json" 
            dangerouslySetInnerHTML={{ 
              __html: JSON.stringify(websiteSchema) 
            }} 
          />
          
          <script 
            type="application/ld+json" 
            dangerouslySetInnerHTML={{ 
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "WebPage",
                "url": `https://marianamatheos.com.br${path}`,
                "name": "Mariana Matheos Jazz Band",
                "description": "Banda de jazz para casamentos e eventos corporativos. Repertório profissional de jazz, bossa nova e música brasileira.",
                "isPartOf": {
                  "@id": "https://marianamatheos.com.br/#website"
                },
                "about": {
                  "@id": "https://marianamatheos.com.br/#organization"
                }
              })
            }} 
          />
        </>
      );
  }
};

export default EnhancedStructuredData;