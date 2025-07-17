/**
 * Schema Generator Utility Functions
 * Functions to dynamically generate structured data for different schema types
 */

import { formatISODate, formatEventDate, getCurrentISODate, getCopyrightYearRange } from './dateUtils';
import { eventsData, serviceOfferings, PerformanceEvent, ServiceOffering } from '@/data/eventData';
import { blogArticlesData, BlogArticle } from '@/data/blogArticlesData';

/**
 * Generate Organization Schema
 */
export const generateOrganizationSchema = () => {
  return {
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
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": -19.917299,
      "longitude": -43.934009
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
      "itemListElement": serviceOfferings.map(service => ({
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": service.name,
          "description": service.description,
          "serviceType": service.serviceType,
          "serviceOutput": service.serviceOutput,
          "url": `https://marianamatheos.com.br/agenda#${service.id}`
        },
        "priceSpecification": {
          "@type": "PriceSpecification",
          "price": service.pricing.price,
          "priceCurrency": service.pricing.priceCurrency,
          "minPrice": service.pricing.minPrice,
          "maxPrice": service.pricing.maxPrice,
          "validFrom": service.pricing.validFrom,
          "validThrough": service.pricing.validThrough
        },
        "image": service.image || "https://marianamatheos.com.br/public/images/banda.png"
      }))
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
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "09:00",
        "closes": "18:00"
      }
    ],
    "makesOffer": {
      "@type": "Offer",
      "itemOffered": {
        "@type": "Service",
        "name": "Música ao Vivo para Eventos",
        "description": "Apresentações de jazz ao vivo para casamentos, eventos corporativos e celebrações privadas"
      },
      "areaServed": {
        "@type": "State",
        "name": "Minas Gerais"
      }
    }
  };
};

/**
 * Generate Website Schema
 */
export const generateWebsiteSchema = () => {
  const currentDate = getCurrentISODate();
  const copyrightYear = getCopyrightYearRange(2020);
  
  return {
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
    "copyrightYear": copyrightYear,
    "datePublished": "2020-01-15T08:00:00-03:00",
    "dateModified": currentDate,
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://marianamatheos.com.br/search?q={search_term_string}"
      },
      "query-input": "required name=search_term_string"
    }
  };
};

/**
 * Generate Breadcrumb Schema
 */
export const generateBreadcrumbSchema = (path: string, items: Array<{name: string, url: string}>) => {
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

/**
 * Generate Event Series Schema
 */
export const generateEventSeriesSchema = () => {
  // Filter to only include future events
  const futureEvents = eventsData;
  
  if (futureEvents.length === 0) return null;
  
  return {
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
    "subEvent": futureEvents.map(event => {
      // Generate ISO dates from the short date and time
      const { startDate, endDate } = formatEventDate(event.shortDate, event.time, event.durationHours);
      
      return {
        "@type": "MusicEvent",
        "@id": `https://marianamatheos.com.br/agenda#${event.id}`,
        "name": event.name,
        "startDate": startDate,
        "endDate": endDate,
        "eventStatus": `https://schema.org/${event.eventStatus}`,
        "eventAttendanceMode": `https://schema.org/${event.eventAttendanceMode}`,
        "location": {
          "@type": "Place",
          "name": event.location.name,
          "address": {
            "@type": "PostalAddress",
            ...event.location.address
          },
          "geo": event.location.geo ? {
            "@type": "GeoCoordinates",
            "latitude": event.location.geo.latitude,
            "longitude": event.location.geo.longitude
          } : undefined
        },
        "offers": {
          "@type": "Offer",
          "price": event.offer.price,
          "priceCurrency": event.offer.priceCurrency,
          "availability": `https://schema.org/${event.offer.availability}`,
          "validFrom": event.offer.validFrom,
          "url": event.offer.url
        },
        "performer": {
          "@type": "MusicGroup",
          "@id": "https://marianamatheos.com.br/#organization"
        },
        "image": event.image,
        "description": event.description
      };
    })
  };
};

/**
 * Generate MusicEvent Schema for a specific event
 */
export const generateMusicEventSchema = (eventId: string) => {
  const event = eventsData.find(e => e.id === eventId);
  if (!event) return null;
  
  const { startDate, endDate } = formatEventDate(event.shortDate, event.time, event.durationHours);
  
  return {
    "@context": "https://schema.org",
    "@type": "MusicEvent",
    "@id": `https://marianamatheos.com.br/agenda#${event.id}`,
    "name": event.name,
    "startDate": startDate,
    "endDate": endDate,
    "eventStatus": `https://schema.org/${event.eventStatus}`,
    "eventAttendanceMode": `https://schema.org/${event.eventAttendanceMode}`,
    "location": {
      "@type": "Place",
      "name": event.location.name,
      "address": {
        "@type": "PostalAddress",
        ...event.location.address
      },
      "geo": event.location.geo ? {
        "@type": "GeoCoordinates",
        "latitude": event.location.geo.latitude,
        "longitude": event.location.geo.longitude
      } : undefined
    },
    "offers": {
      "@type": "Offer",
      "price": event.offer.price,
      "priceCurrency": event.offer.priceCurrency,
      "availability": `https://schema.org/${event.offer.availability}`,
      "validFrom": event.offer.validFrom,
      "url": event.offer.url
    },
    "performer": {
      "@type": "MusicGroup",
      "@id": "https://marianamatheos.com.br/#organization"
    },
    "image": event.image,
    "description": event.description,
    "organizer": {
      "@id": "https://marianamatheos.com.br/#organization"
    }
  };
};

/**
 * Generate Service Schema
 */
export const generateServiceSchema = () => {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": "https://marianamatheos.com.br/agenda#service",
    "name": "Apresentações de Jazz ao Vivo",
    "serviceType": "Entertainment Service",
    "provider": {
      "@id": "https://marianamatheos.com.br/#organization"
    },
    "description": "Serviços de entretenimento musical com jazz ao vivo para diversos tipos de eventos incluindo casamentos, corporativos e festas particulares.",
    "areaServed": {
      "@type": "State",
      "name": "Minas Gerais"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Catálogo de Serviços Musicais",
      "itemListElement": serviceOfferings.map(service => ({
        "@type": "Offer",
        "@id": `https://marianamatheos.com.br/agenda#${service.id}`,
        "itemOffered": {
          "@type": "Service",
          "name": service.name,
          "description": service.description,
          "serviceType": service.serviceType,
          "serviceOutput": service.serviceOutput
        },
        "priceSpecification": {
          "@type": "PriceSpecification",
          "price": service.pricing.price,
          "priceCurrency": service.pricing.priceCurrency,
          "minPrice": service.pricing.minPrice,
          "maxPrice": service.pricing.maxPrice,
          "validFrom": service.pricing.validFrom,
          "validThrough": service.pricing.validThrough
        },
        "image": service.image,
        "url": `https://marianamatheos.com.br/agenda#${service.id}`
      }))
    },
    "availableChannel": [
      {
        "@type": "ServiceChannel",
        "name": "Online",
        "serviceUrl": "https://marianamatheos.com.br/agenda",
        "servicePhone": "+55-31-99752-2127",
        "serviceSmsNumber": "+55-31-99752-2127"
      },
      {
        "@type": "ServiceChannel",
        "name": "WhatsApp",
        "serviceUrl": "https://wa.me/5531997522127",
        "servicePhone": "+55-31-99752-2127"
      }
    ],
    "termsOfService": "https://marianamatheos.com.br/termos",
    "serviceOutput": "Apresentação musical ao vivo com repertório personalizado",
    "offers": serviceOfferings.map(service => ({
      "@type": "Offer",
      "itemOffered": {
        "@type": "Service",
        "name": service.name
      },
      "priceSpecification": {
        "@type": "PriceSpecification",
        "price": service.pricing.price,
        "priceCurrency": service.pricing.priceCurrency
      }
    }))
  };
};

/**
 * Generate WebPage Schema
 */
export const generateWebPageSchema = (
  path: string, 
  title: string, 
  description: string, 
  primaryImage?: string
) => {
  const currentDate = getCurrentISODate();
  
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `https://marianamatheos.com.br${path}#webpage`,
    "url": `https://marianamatheos.com.br${path}`,
    "name": title,
    "description": description,
    "isPartOf": {
      "@id": "https://marianamatheos.com.br/#website"
    },
    "about": {
      "@id": "https://marianamatheos.com.br/#organization"
    },
    "primaryImageOfPage": primaryImage ? {
      "@type": "ImageObject",
      "url": primaryImage,
      "width": 1200,
      "height": 630
    } : undefined,
    "datePublished": "2020-01-15T08:00:00-03:00",
    "dateModified": currentDate,
    "inLanguage": "pt-BR",
    "potentialAction": [
      {
        "@type": "ReadAction",
        "target": [`https://marianamatheos.com.br${path}`]
      }
    ]
  };
};

/**
 * Generate FAQ Schema
 */
export const generateFAQSchema = (faqs: Array<{question: string, answer: string}>) => {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };
};

/**
 * Generate Local Business Schema
 */
export const generateLocalBusinessSchema = () => {
  return {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "MusicGroup"],
    "@id": "https://marianamatheos.com.br/#localbusiness",
    "name": "Mariana Matheos Jazz Band",
    "image": [
      "https://marianamatheos.com.br/src/assets/images/Logo-Mariana-Matheos-Jazz-textura-dourada-fundo-transparente.png",
      "https://marianamatheos.com.br/public/images/cantora.png",
      "https://marianamatheos.com.br/public/images/banda.png"
    ],
    "priceRange": "R$ 2.500 - R$ 6.000",
    "telephone": "+55-31-99752-2127",
    "email": "contato@marianamatheos.com.br",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Rua da Música, 123",
      "addressLocality": "Belo Horizonte",
      "addressRegion": "MG",
      "postalCode": "30000-000",
      "addressCountry": "BR"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": -19.917299,
      "longitude": -43.934009
    },
    "url": "https://marianamatheos.com.br",
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "09:00",
        "closes": "18:00"
      }
    ],
    "sameAs": [
      "https://instagram.com/marianamatheosoficial",
      "https://youtube.com/@marianamatheosoficial",
      "https://facebook.com/marianamatheosjazz"
    ],
    "hasMap": "https://www.google.com/maps?q=-19.917299,-43.934009",
    "currenciesAccepted": "BRL",
    "paymentAccepted": "Cash, Credit Card, Pix",
    "areaServed": ["Belo Horizonte", "Minas Gerais", "Brasil"],
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
    }
  };
};

/**
 * Generate BlogPosting Schema
 */
export const generateBlogPostingSchema = (article: BlogArticle) => {
  if (!article) return null;
  
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://marianamatheos.com.br/blog/${article.slug}`
    },
    "headline": article.title,
    "description": article.excerpt,
    "image": article.image,
    "author": {
      "@type": "Person",
      "name": article.author,
      "url": "https://marianamatheos.com.br/sobre"
    },
    "publisher": {
      "@id": "https://marianamatheos.com.br/#organization"
    },
    "datePublished": article.publishedDate,
    "dateModified": article.publishedDate,
    "inLanguage": "pt-BR",
    "wordCount": article.content.split(' ').length,
    "articleSection": article.category,
    "keywords": article.tags.join(", ")
  };
};

/**
 * Generate ImageGallery Schema
 */
export const generateImageGallerySchema = (images: Array<{url: string, caption: string}>) => {
  return {
    "@context": "https://schema.org",
    "@type": "ImageGallery",
    "about": {
      "@id": "https://marianamatheos.com.br/#organization"
    },
    "image": images.map(img => ({
      "@type": "ImageObject",
      "contentUrl": img.url,
      "description": img.caption
    }))
  };
};

/**
 * Generate VideoObject Schema
 */
export const generateVideoObjectSchema = (videos: Array<{url: string, name: string, description: string, thumbnailUrl: string, uploadDate: string}>) => {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "itemListElement": videos.map((video, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "VideoObject",
        "name": video.name,
        "description": video.description,
        "thumbnailUrl": video.thumbnailUrl,
        "uploadDate": video.uploadDate,
        "contentUrl": video.url,
        "embedUrl": video.url.includes('youtube') ? 
          video.url.replace('youtube.com/watch?v=', 'youtube.com/embed/') : 
          video.url,
        "duration": "PT5M",
        "interactionStatistic": {
          "@type": "InteractionCounter",
          "interactionType": { "@type": "WatchAction" },
          "userInteractionCount": 5000
        }
      }
    }))
  };
};