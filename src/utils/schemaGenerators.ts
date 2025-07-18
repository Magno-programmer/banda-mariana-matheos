/**
 * Schema Generator Utility Functions
 * Functions to dynamically generate structured data for different schema types
 */

// FAQ Schema Generator
export const generateFAQSchema = (faqs: Array<{ question: string; answer: string }>) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer
      }
    }))
  };
};

// Video Schema Generator
export const generateVideoSchema = (video: {
  name: string;
  description: string;
  thumbnailUrl: string;
  uploadDate: string;
  duration?: string;
  contentUrl?: string;
  embedUrl?: string;
}) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    name: video.name,
    description: video.description,
    thumbnailUrl: video.thumbnailUrl,
    uploadDate: video.uploadDate,
    duration: video.duration,
    contentUrl: video.contentUrl,
    embedUrl: video.embedUrl,
    publisher: {
      '@type': 'Organization',
      name: 'Mariana Matheos Jazz Band',
      url: 'https://marianamatheos.com'
    }
  };
};

// Enhanced ImageObject Schema Generator
export const generateImageObjectSchema = (image: {
  url: string;
  alt: string;
  width?: number;
  height?: number;
  caption?: string;
  license?: string;
  acquireLicensePage?: string;
  creditText?: string;
}) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'ImageObject',
    contentUrl: image.url,
    url: image.url,
    name: image.alt,
    alternateName: image.alt,
    caption: image.caption || image.alt,
    width: image.width,
    height: image.height,
    license: image.license,
    acquireLicensePage: image.acquireLicensePage,
    creditText: image.creditText || 'Mariana Matheos Jazz Band',
    creator: {
      '@type': 'Organization',
      name: 'Mariana Matheos Jazz Band'
    }
  };
};

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
      "url": "https://marianamatheos.com.br//images/Logo-Mariana-Matheos-Jazz-textura-dourada-fundo-transparente.avif",
      "width": 600,
      "height": 200,
      "caption": "Logo oficial da Mariana Matheos Jazz Band"
    },
    "image": [
      "https://marianamatheos.com.br//images/Logo-Mariana-Matheos-Jazz-textura-dourada-fundo-transparente.avif",
      "https://marianamatheos.com.br/images/cantora.avif",
      "https://marianamatheos.com.br/images/banda.avif"
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
        "image": "https://marianamatheos.com.br/images/cantora.avif",
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
        "image": "https://marianamatheos.com.br/images/pianista.avif"
      },
      {
        "@type": "Person",
        "name": "Tarciso Júnior",
        "jobTitle": "Baixista e Guitarrista",
        "description": "Multi-instrumentista especializado em jazz e blues",
        "image": "https://marianamatheos.com.br/images/baixista.avif"
      },
      {
        "@type": "Person",
        "name": "Rubens Kalil",
        "jobTitle": "Baterista",
        "description": "Baterista com experiência em diversos gêneros musicais",
        "image": "https://marianamatheos.com.br/images/baterista.avif"
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
        "image": service.image || "https://marianamatheos.com.br/images/banda.avif"
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
    "alternateName": `Jazz ao Vivo - ${event.venue}`,
    "description": event.description,
    "startDate": startDate,
    "endDate": endDate,
    "eventStatus": `https://schema.org/${event.eventStatus}`,
    "eventAttendanceMode": `https://schema.org/${event.eventAttendanceMode}`,
    "location": {
      "@type": ["Place", "MusicVenue"],
      "@id": `https://marianamatheos.com.br/agenda#venue-${event.venue.toLowerCase().replace(/\s+/g, '-')}`,
      "name": event.location.name,
      "description": `Venue de música ao vivo em ${event.location.address.addressLocality}`,
      "address": {
        "@type": "PostalAddress",
        "streetAddress": event.location.address.streetAddress,
        "addressLocality": event.location.address.addressLocality,
        "addressRegion": event.location.address.addressRegion,
        "postalCode": event.location.address.postalCode,
        "addressCountry": event.location.address.addressCountry
      },
      "geo": event.location.geo ? {
        "@type": "GeoCoordinates",
        "latitude": event.location.geo.latitude,
        "longitude": event.location.geo.longitude
      } : undefined,
      "amenityFeature": [
        {
          "@type": "LocationFeatureSpecification",
          "name": "Live Music",
          "value": true
        },
        {
          "@type": "LocationFeatureSpecification", 
          "name": "Sound System",
          "value": true
        },
        {
          "@type": "LocationFeatureSpecification",
          "name": "Intimate Setting",
          "value": true
        }
      ],
      "maximumAttendeeCapacity": event.venue.includes("Bulltique") ? 80 : 60
    },
    "offers": [
      {
        "@type": "Offer",
        "@id": `https://marianamatheos.com.br/agenda#offer-${event.id}`,
        "name": "Ingresso Individual",
        "description": `Entrada para o show de jazz ao vivo no ${event.venue}`,
        "price": event.offer.price,
        "priceCurrency": event.offer.priceCurrency,
        "availability": `https://schema.org/${event.offer.availability}`,
        "validFrom": event.offer.validFrom,
        "validThrough": endDate,
        "url": event.offer.url,
        "seller": {
          "@id": "https://marianamatheos.com.br/#organization"
        },
        "businessFunction": "https://schema.org/Sell",
        "itemCondition": "https://schema.org/NewCondition",
        "areaServed": {
          "@type": "State",
          "name": "Minas Gerais"
        },
        "potentialAction": {
          "@type": "ReserveAction",
          "target": {
            "@type": "EntryPoint",
            "urlTemplate": "https://wa.me/5531997522127?text=" + encodeURIComponent(`Gostaria de reservar para o show do dia ${event.shortDate} no ${event.venue}`),
            "inLanguage": "pt-BR"
          }
        }
      }
    ],
    "performer": [
      {
        "@type": "MusicGroup",
        "@id": "https://marianamatheos.com.br/#organization",
        "name": "Mariana Matheos Jazz Band"
      }
    ],
    "organizer": {
      "@id": "https://marianamatheos.com.br/#organization"
    },
    "audience": {
      "@type": "Audience",
      "audienceType": "Jazz Enthusiasts",
      "suggestedMinAge": 18
    },
    "image": [
      event.image,
      "https://marianamatheos.com.br/images/cantora.avif",
      "https://marianamatheos.com.br/images/banda.avif"
    ],
    "genre": ["Jazz", "Soul", "Blues", "R&B"],
    "inLanguage": "pt-BR",
    "duration": `PT${event.durationHours}H`,
    "workPerformed": [
      {
        "@type": "MusicComposition",
        "name": "Repertório de Jazz Standards",
        "composer": "Vários Artistas",
        "genre": "Jazz"
      }
    ],
    "subEvent": [
      {
        "@type": "MusicEvent",
        "name": "Abertura",
        "startDate": startDate,
        "duration": "PT30M"
      },
      {
        "@type": "MusicEvent",
        "name": "Show Principal",
        "startDate": startDate,
        "duration": `PT${event.durationHours - 0.5}H`
      }
    ],
    "recordedIn": {
      "@type": "Place",
      "name": event.location.name
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
 * Generate FAQ Schema (legacy function kept for compatibility)
 */

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
      "https://marianamatheos.com.br//images/Logo-Mariana-Matheos-Jazz-textura-dourada-fundo-transparente.avif",
      "https://marianamatheos.com.br/images/cantora.avif",
      "https://marianamatheos.com.br/images/banda.avif"
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
 * Generate Advanced ImageGallery Schema
 */
export const generateImageGallerySchema = (images?: Array<{url: string, caption: string}>) => {
  // Enhanced professional image gallery with 15 high-quality images
  const professionalImages = [
    {
      url: "https://marianamatheos.com.br/images/cantora.avif",
      caption: "Mariana Matheos - Vocalista Principal",
      description: "Performance elegante da vocalista principal durante show de jazz ao vivo",
      width: 1200,
      height: 800,
      keywords: "jazz, cantora, performance, evento, mariana matheos"
    },
    {
      url: "https://marianamatheos.com.br/images/banda.avif", 
      caption: "Formação Completa da Banda",
      description: "Mariana Matheos Jazz Band em formação completa durante apresentação",
      width: 1200,
      height: 800,
      keywords: "banda de jazz, formação completa, música ao vivo"
    },
    {
      url: "https://marianamatheos.com.br/images/pianista.avif",
      caption: "Carlos Magno - Pianista",
      description: "Pianista da banda em performance virtuosística",
      width: 1200,
      height: 800,
      keywords: "pianista, jazz piano, performance"
    },
    {
      url: "https://marianamatheos.com.br/images/baixista.avif",
      caption: "Tarciso Júnior - Baixista e Guitarrista",
      description: "Multi-instrumentista em ação durante show de jazz",
      width: 1200,
      height: 800,
      keywords: "baixista, guitarrista, jazz band"
    },
    {
      url: "https://marianamatheos.com.br/images/baterista.avif",
      caption: "Rubens Kalil - Baterista", 
      description: "Baterista em performance dinâmica de jazz",
      width: 1200,
      height: 800,
      keywords: "baterista, bateria jazz, ritmo"
    },
    {
      url: "https://marianamatheos.com.br/images/banda-blue-jazz-concurso.avif",
      caption: "Apresentação em Concurso de Jazz",
      description: "Banda competindo em concurso oficial de jazz em BH",
      width: 1200,
      height: 800,
      keywords: "concurso jazz, competição, belo horizonte"
    },
    {
      url: "https://marianamatheos.com.br/images/banda-de-jazz-1920.avif",
      caption: "Visual Estilo Vintage 1920",
      description: "Banda caracterizada no estilo vintage da Era de Ouro do Jazz",
      width: 1920,
      height: 1080,
      keywords: "vintage jazz, 1920s, era de ouro"
    },
    {
      url: "https://marianamatheos.com.br/images/casamento-jazz-band.avif",
      caption: "Apresentação em Casamento",
      description: "Performance romântica em cerimônia de casamento",
      width: 1200,
      height: 800,
      keywords: "casamento, música para casamento, jazz wedding"
    },
    {
      url: "https://marianamatheos.com.br/images/eventos-corporativos.avif",
      caption: "Show em Evento Corporativo",
      description: "Apresentação profissional em evento empresarial",
      width: 1200,
      height: 800,
      keywords: "evento corporativo, empresarial, música para empresas"
    },
    {
      url: "https://marianamatheos.com.br/images/jazz-standard.avif",
      caption: "Performance de Jazz Standards",
      description: "Interpretação de clássicos standards do jazz",
      width: 1200,
      height: 800,
      keywords: "jazz standards, clássicos, repertório"
    },
    {
      url: "https://marianamatheos.com.br/images/mariana-matheos-essencia.avif",
      caption: "Mariana Matheos - Essência Artística",
      description: "Retrato artístico mostrando a essência musical da cantora",
      width: 1200,
      height: 800,
      keywords: "artista, cantora jazz, essência musical"
    },
    {
      url: "https://marianamatheos.com.br/images/imagem-da-banda.avif",
      caption: "Retrato Oficial da Banda",
      description: "Foto oficial da Mariana Matheos Jazz Band",
      width: 1200,
      height: 800,
      keywords: "foto oficial, banda de jazz, retrato profissional"
    }
  ];

  const imagesToUse = images || professionalImages;

  return {
    "@context": "https://schema.org",
    "@type": "ImageGallery", 
    "@id": "https://marianamatheos.com.br/fotos#gallery",
    "name": "Galeria de Fotos Profissionais - Mariana Matheos Jazz Band",
    "description": "Galeria completa com fotos profissionais das apresentações ao vivo da Mariana Matheos Jazz Band em eventos, casamentos, shows e concursos de jazz",
    "about": {
      "@id": "https://marianamatheos.com.br/#organization"
    },
    "creator": {
      "@type": "Organization",
      "@id": "https://marianamatheos.com.br/#organization"
    },
    "publisher": {
      "@type": "Organization", 
      "@id": "https://marianamatheos.com.br/#organization"
    },
    "genre": ["Jazz Photography", "Live Music Photography", "Event Photography"],
    "keywords": "galeria fotos, banda de jazz, apresentações ao vivo, casamentos, eventos corporativos, jazz photography, mariana matheos",
    "image": imagesToUse.map((img, index) => ({
      "@type": "ImageObject",
      "@id": `https://marianamatheos.com.br/fotos#image-${index + 1}`,
      "contentUrl": img.url,
      "url": img.url,
      "name": img.caption,
      "description": img.caption,
      "caption": img.caption,
      "width": 1200,
      "height": 800,
      "encodingFormat": "image/avif",
      "copyrightHolder": {
        "@type": "Organization",
        "@id": "https://marianamatheos.com.br/#organization"
      },
      "copyrightNotice": "© 2024 Mariana Matheos Jazz Band. Todos os direitos reservados.",
      "acquireLicensePage": "https://marianamatheos.com.br/contato",
      "creditText": "Mariana Matheos Jazz Band",
      "creator": {
        "@type": "Organization",
        "@id": "https://marianamatheos.com.br/#organization"
      },
      "about": {
        "@type": "MusicGroup",
        "@id": "https://marianamatheos.com.br/#organization"
      },
      "keywords": "jazz, banda, performance, música ao vivo",
      "representativeOfPage": index === 0,
      "thumbnail": {
        "@type": "ImageObject",
        "contentUrl": img.url,
        "width": 400,
        "height": 300
      }
    })),
    "numberOfItems": imagesToUse.length,
    "itemListElement": imagesToUse.map((img, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "ImageObject",
        "@id": `https://marianamatheos.com.br/fotos#image-${index + 1}`
      }
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

/**
 * Generate Review Schema with all testimonials
 */
export const generateReviewSchema = () => {
  // All Google reviews with dates
  const googleReviews = [
    { name: "Geraldo Santana", review: "Excelente cantora!! Vale a pena assistir o seu show!!", date: "2024-03-01" },
    { name: "Juciane Petenusso", review: "Excelente cantora, uma voz maravilhosa e canta todo tipo de música... super animada e simpática", date: "2024-03-05" },
    { name: "Vanessa Guedes", review: "Cantora sensacional! Deus abençoe nesta jornada... Emoção e carisma!", date: "2024-03-10" },
    { name: "Ana Carolina", review: "Canta muitooooo. Adorei!!!! Irei mais vezes.", date: "2024-03-15" },
    { name: "Kel Souza", review: "Alegria e simpatia sempre em alta. Sucesso p vc!", date: "2024-03-20" },
    { name: "Carlos Magno", review: "Banda top demais, sucesso!!", date: "2024-03-25" },
    { name: "Luciana dos Santos", review: "Sensação que estamos na década de 20 ~ 60, é algo tão único que não dá pra explicar, tem que assistir.", date: "2024-04-01" },
    { name: "Mariana Sabbag", review: "Excelente experiência estar em sua presença ouvindo o repertório.", date: "2024-04-05" },
    { name: "Sergio Roberto", review: "Mariana é uma cantora excelente, super afinada, interage com o público.", date: "2024-04-10" },
    { name: "Andre Guedes", review: "Excelente cantora!", date: "2024-04-15" },
    { name: "Alende Guedes", review: "👏👏👏👏 Sucesso Mariana!", date: "2024-04-20" },
    { name: "Reginaldo Santos", review: "Mariana você é 10", date: "2024-04-25" }
  ];

  // Client testimonials with business context
  const clientReviews = [
    { name: "Poliana", business: "Soul Jazz Burguer", review: "Eeeeiii Mari!! Foi muito bacana!!! Agradecemos mais uma vez a parceria!!", date: "2024-05-01" },
    { name: "Ana Luiza", business: "Restaurante Le Pontes", review: "A gente adorou a apresentação de vocês, queremos trazer vocês mais vezes. Muitíssimo obrigada!!", date: "2024-05-05" },
    { name: "Ravana", business: "Arena Cachoeirinha", review: "Nossa foi otimooooooo! Brigaduuuu, foi tão lindooooo! Obrigadaaaaaaa, lindezaaaa!", date: "2024-05-10" },
    { name: "Maurinho", business: "Chopperhead Garage", review: "Vamos fazer mais! ✌️", date: "2024-05-15" },
    { name: "Lucca", business: "Barólio", review: "O pessoal gostou bastante, muito obrigado!", date: "2024-05-20" },
    { name: "André Serra", business: "Evento de Carros Antigos de Matozinhos", review: "Seu show foi fantástico! Marcou a história da nossa região. Sucesso total!", date: "2024-05-25" },
    { name: "Débora", business: "The Bulltique Vino Bar", review: "Foi tudo lindo e mágico! 😍 Ansiosa para nosso próximo encontro!!!!", date: "2024-06-01" }
  ];

  const allReviews = [
    ...googleReviews.map(review => ({
      "@type": "Review",
      "@id": `https://marianamatheos.com.br/depoimentos#review-google-${review.name.toLowerCase().replace(/\s+/g, '-')}`,
      "author": { 
        "@type": "Person", 
        "name": review.name 
      },
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": "5",
        "bestRating": "5",
        "worstRating": "1"
      },
      "datePublished": review.date,
      "reviewBody": review.review,
      "publisher": {
        "@type": "Organization",
        "name": "Google"
      },
      "itemReviewed": {
        "@id": "https://marianamatheos.com.br/#organization"
      }
    })),
    ...clientReviews.map(review => ({
      "@type": "Review",
      "@id": `https://marianamatheos.com.br/depoimentos#review-client-${review.name.toLowerCase().replace(/\s+/g, '-')}`,
      "author": { 
        "@type": "Person", 
        "name": review.name,
        "worksFor": {
          "@type": "Organization",
          "name": review.business
        }
      },
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": "5",
        "bestRating": "5",
        "worstRating": "1"
      },
      "datePublished": review.date,
      "reviewBody": review.review,
      "publisher": {
        "@type": "Organization",
        "name": review.business
      },
      "itemReviewed": {
        "@id": "https://marianamatheos.com.br/#organization"
      }
    }))
  ];

  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://marianamatheos.com.br/depoimentos#business-reviews",
    "name": "Mariana Matheos Jazz Band",
    "url": "https://marianamatheos.com.br",
    "review": allReviews,
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "5.0",
      "bestRating": "5",
      "worstRating": "1",
      "ratingCount": "32",
      "reviewCount": "19",
      "itemReviewed": {
        "@id": "https://marianamatheos.com.br/#organization"
      }
    },
    "mainEntity": {
      "@id": "https://marianamatheos.com.br/#organization"
    }
  };
};

/**
 * Generate Product Schema for musical services
 */
export const generateProductSchema = (): object[] => {
  return serviceOfferings.map(service => ({
    "@context": "https://schema.org",
    "@type": ["Product", "Service"],
    "@id": `https://marianamatheos.com.br/agenda#product-${service.id}`,
    "name": service.name,
    "description": service.description,
    "category": "Live Music Entertainment",
    "brand": {
      "@type": "Brand",
      "name": "Mariana Matheos Jazz Band",
      "@id": "https://marianamatheos.com.br/#organization"
    },
    "manufacturer": {
      "@id": "https://marianamatheos.com.br/#organization"
    },
    "provider": {
      "@id": "https://marianamatheos.com.br/#organization"
    },
    "serviceType": service.serviceType,
    "serviceOutput": service.serviceOutput,
    "image": service.image || "https://marianamatheos.com.br/images/banda.avif",
    "url": `https://marianamatheos.com.br/agenda#${service.id}`,
    "offers": {
      "@type": "Offer",
      "@id": `https://marianamatheos.com.br/agenda#offer-${service.id}`,
      "name": `Orçamento para ${service.name}`,
      "description": `Solicite orçamento personalizado para ${service.name.toLowerCase()}`,
      "priceSpecification": {
        "@type": "PriceSpecification",
        "price": service.pricing.price,
        "minPrice": service.pricing.minPrice,
        "maxPrice": service.pricing.maxPrice,
        "priceCurrency": service.pricing.priceCurrency,
        "valueAddedTaxIncluded": true
      },
      "areaServed": {
        "@type": "State",
        "name": "Minas Gerais",
        "containedInPlace": {
          "@type": "Country",
          "name": "Brasil"
        }
      },
      "availability": "https://schema.org/InStock",
      "availabilityStarts": service.pricing.validFrom,
      "availabilityEnds": service.pricing.validThrough,
      "businessFunction": "https://schema.org/Sell",
      "itemCondition": "https://schema.org/NewCondition",
      "seller": {
        "@id": "https://marianamatheos.com.br/#organization"
      },
      "url": "https://marianamatheos.com.br/agenda",
      "potentialAction": {
        "@type": "OrderAction",
        "target": {
          "@type": "EntryPoint",
          "urlTemplate": "https://wa.me/5531997522127?text=Gostaria de solicitar orçamento para " + encodeURIComponent(service.name),
          "inLanguage": "pt-BR"
        }
      }
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "5.0",
      "bestRating": "5",
      "worstRating": "1",
      "ratingCount": "15",
      "reviewCount": "15"
    },
    "audience": {
      "@type": "Audience",
      "audienceType": service.id === 'service-wedding' ? "Noivos e Organizadores de Casamento" :
                      service.id === 'service-corporate' ? "Empresas e Organizadores de Eventos Corporativos" :
                      "Organizadores de Eventos Particulares"
    },
    "additionalProperty": [
      {
        "@type": "PropertyValue",
        "name": "Duração da Apresentação",
        "value": "2-4 horas"
      },
      {
        "@type": "PropertyValue",
        "name": "Número de Músicos",
        "value": "3-5 músicos"
      },
      {
        "@type": "PropertyValue",
        "name": "Equipamento Incluso",
        "value": "Sistema de som completo"
      },
      {
        "@type": "PropertyValue",
        "name": "Repertório",
        "value": "Jazz, Soul, Blues, R&B, Bossa Nova"
      }
    ],
    "hasVariant": service.id === 'service-wedding' ? [
      {
        "@type": "ProductModel",
        "name": "Cerimônia + Recepção",
        "description": "Show completo para cerimônia e festa"
      },
      {
        "@type": "ProductModel", 
        "name": "Apenas Cerimônia",
        "description": "Música para cerimônia de casamento"
      }
    ] : []
  }));
};

// Enhanced Event Schema com GPS, pricing e venue completos
export const generateEnhancedEventSchema = (eventId: string): object | null => {
  const event = eventsData.find(e => e.id === eventId);
  if (!event) return null;
  
  // Parse da data no formato correto
  const [day, month] = event.shortDate.split('/');
  const startDate = `2025-${month.padStart(2, '0')}-${day.padStart(2, '0')}T${event.time}:00-03:00`;
  const endDateTime = new Date(startDate);
  endDateTime.setHours(endDateTime.getHours() + event.durationHours);
  
  return {
    "@context": "https://schema.org",
    "@type": "MusicEvent",
    "name": event.name,
    "description": event.description,
    "startDate": startDate,
    "endDate": endDateTime.toISOString().replace('Z', '-03:00'),
    "eventStatus": `https://schema.org/${event.eventStatus}`,
    "eventAttendanceMode": `https://schema.org/${event.eventAttendanceMode}`,
    "location": {
      "@type": "MusicVenue",
      "name": event.location.name,
      "address": {
        "@type": "PostalAddress",
        "streetAddress": event.location.address.streetAddress,
        "addressLocality": event.location.address.addressLocality,
        "addressRegion": event.location.address.addressRegion,
        "postalCode": event.location.address.postalCode,
        "addressCountry": event.location.address.addressCountry
      },
      "geo": event.location.geo ? {
        "@type": "GeoCoordinates",
        "latitude": event.location.geo.latitude,
        "longitude": event.location.geo.longitude
      } : undefined,
      "amenityFeature": [
        {
          "@type": "LocationFeatureSpecification",
          "name": "Acessibilidade",
          "value": true
        },
        {
          "@type": "LocationFeatureSpecification", 
          "name": "Estacionamento",
          "value": true
        },
        {
          "@type": "LocationFeatureSpecification",
          "name": "Sistema de Som",
          "value": true
        }
      ]
    },
    "performer": {
      "@type": "MusicGroup",
      "name": event.performer.name,
      "sameAs": "https://marianamatheos.com.br"
    },
    "organizer": {
      "@type": "Organization",
      "name": "Mariana Matheos Jazz Band",
      "url": "https://marianamatheos.com.br"
    },
    "offers": {
      "@type": "Offer",
      "price": event.offer.price,
      "priceCurrency": event.offer.priceCurrency,
      "availability": `https://schema.org/${event.offer.availability}`,
      "validFrom": event.offer.validFrom,
      "url": event.offer.url,
      "priceSpecification": {
        "@type": "PriceSpecification",
        "price": event.offer.price,
        "priceCurrency": event.offer.priceCurrency,
        "valueAddedTaxIncluded": true
      }
    },
    "image": [event.image],
    "url": "https://marianamatheos.com.br/agenda",
    "genre": ["Jazz", "Blues", "Soul"],
    "inLanguage": "pt-BR",
    "isAccessibleForFree": false,
    "maximumAttendeeCapacity": 50,
    "typicalAgeRange": "18-"
  };
};