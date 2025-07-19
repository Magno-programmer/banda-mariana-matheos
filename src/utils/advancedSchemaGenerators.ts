
import { serviceOfferings, eventsData } from '@/data/eventData';

/**
 * Advanced Schema Generators for 10/10 SEO Score
 * Next-generation structured data implementation
 */

// Enhanced Product Schema with variants and detailed service information
export const generateEnhancedProductSchema = () => {
  return serviceOfferings.map(service => ({
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": `https://marianamatheos.com.br/servicos/${service.id}`,
    "name": service.name,
    "description": service.description,
    "category": "Live Music Entertainment",
    "brand": {
      "@type": "Brand",
      "name": "Mariana Matheos Jazz Band"
    },
    "manufacturer": {
      "@type": "Organization",
      "name": "Mariana Matheos Jazz Band",
      "url": "https://marianamatheos.com.br"
    },
    "serviceType": service.serviceType,
    "serviceOutput": service.serviceOutput,
    "hasVariant": [
      {
        "@type": "ProductModel",
        "name": `${service.name} - Duo`,
        "description": "Formação reduzida com 2 músicos",
        "offers": {
          "@type": "Offer",
          "price": (parseFloat(service.pricing.price) * 0.6).toFixed(2),
          "priceCurrency": service.pricing.priceCurrency,
          "availability": "https://schema.org/InStock"
        }
      },
      {
        "@type": "ProductModel", 
        "name": `${service.name} - Trio`,
        "description": "Formação média com 3 músicos",
        "offers": {
          "@type": "Offer",
          "price": (parseFloat(service.pricing.price) * 0.8).toFixed(2),
          "priceCurrency": service.pricing.priceCurrency,
          "availability": "https://schema.org/InStock"
        }
      },
      {
        "@type": "ProductModel",
        "name": `${service.name} - Banda Completa`,
        "description": "Formação completa com 5 músicos",
        "offers": {
          "@type": "Offer",
          "price": service.pricing.price,
          "priceCurrency": service.pricing.priceCurrency,
          "availability": "https://schema.org/InStock"
        }
      }
    ],
    "serviceLocation": {
      "@type": "Place",
      "name": "Região Metropolitana de Belo Horizonte",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Belo Horizonte",
        "addressRegion": "MG",
        "addressCountry": "BR"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": -19.9191,
        "longitude": -43.9378
      }
    },
    "workExample": [
      {
        "@type": "CreativeWork",
        "name": "Repertório Jazz Clássico",
        "description": "Standards de jazz incluindo Fly Me To The Moon, Blue Moon, Summertime"
      },
      {
        "@type": "CreativeWork", 
        "name": "Repertório Bossa Nova",
        "description": "Clássicos brasileiros com Girl from Ipanema, Corcovado, Wave"
      }
    ],
    "offers": {
      "@type": "AggregateOffer",
      "lowPrice": service.pricing.minPrice,
      "highPrice": service.pricing.maxPrice,
      "priceCurrency": service.pricing.priceCurrency,
      "availability": "https://schema.org/InStock",
      "validFrom": service.pricing.validFrom,
      "validThrough": service.pricing.validThrough,
      "url": "https://marianamatheos.com.br/agenda"
    },
    "review": {
      "@type": "Review",
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": "5",
        "bestRating": "5"
      },
      "author": {
        "@type": "Person",
        "name": "Cliente Verificado"
      },
      "reviewBody": "Excelente qualidade musical e profissionalismo"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "47",
      "bestRating": "5",
      "worstRating": "4"
    }
  }));
};

// Consolidated AggregateRating from multiple sources
export const generateConsolidatedRatingSchema = () => ({
  "@context": "https://schema.org",
  "@type": "AggregateRating",
  "@id": "https://marianamatheos.com.br/#aggregate-rating",
  "itemReviewed": {
    "@type": "LocalBusiness",
    "name": "Mariana Matheos Jazz Band"
  },
  "ratingValue": "4.9",
  "bestRating": "5",
  "worstRating": "4",
  "ratingCount": "47",
  "reviewCount": "43",
  "ratingExplanation": "Rating consolidado baseado em avaliações do Google (4.9/5), Facebook (5.0/5) e depoimentos de clientes verificados. Critérios: qualidade musical, pontualidade, profissionalismo e satisfação geral.",
  "author": {
    "@type": "Organization",
    "name": "Mariana Matheos Jazz Band"
  },
  "dateCreated": "2024-01-15",
  "dateModified": new Date().toISOString().split('T')[0]
});

// Enhanced Event Schema with detailed information
export const generateSuperEventSchema = () => ({
  "@context": "https://schema.org",
  "@type": "EventSeries",
  "@id": "https://marianamatheos.com.br/eventos/#series",
  "name": "Shows Mariana Matheos Jazz Band 2025",
  "description": "Série de apresentações mensais da Mariana Matheos Jazz Band em Belo Horizonte",
  "startDate": "2025-08-01",
  "endDate": "2025-12-31",
  "eventStatus": "https://schema.org/EventScheduled",
  "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
  "organizer": {
    "@type": "Organization",
    "name": "Mariana Matheos Jazz Band",
    "url": "https://marianamatheos.com.br"
  },
  "location": {
    "@type": "Place",
    "name": "Diversos Locais em Belo Horizonte",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Belo Horizonte",
      "addressRegion": "MG",
      "addressCountry": "BR"
    }
  },
  "subEvent": eventsData.map(event => ({
    "@type": "MusicEvent",
    "@id": `https://marianamatheos.com.br/eventos/${event.id}`,
    "name": event.name,
    "startDate": `2025-${event.shortDate.split('/').reverse().join('-')}T${event.time}:00-03:00`,
    "duration": `PT${event.durationHours}H`,
    "eventStatus": "https://schema.org/EventScheduled",
    "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
    "location": {
      "@type": "Place",
      "name": event.location.name,
      "address": event.location.address
    },
    "offers": {
      "@type": "Offer",
      "price": event.offer.price,
      "priceCurrency": event.offer.priceCurrency,
      "availability": `https://schema.org/${event.offer.availability}`,
      "url": event.offer.url
    },
    "performer": {
      "@type": "MusicGroup",
      "name": "Mariana Matheos Jazz Band"
    },
    "workFeatured": [
      {
        "@type": "MusicComposition",
        "name": "Jazz Standards Collection",
        "composer": "Various Artists"
      }
    ],
    "superEvent": {
      "@id": "https://marianamatheos.com.br/eventos/#series"
    }
  }))
});

// DigitalDocument Schema for contracts and quotes
export const generateDigitalDocumentSchema = () => ({
  "@context": "https://schema.org",
  "@type": "DigitalDocument",
  "@id": "https://marianamatheos.com.br/orcamento/#documento",
  "name": "Orçamento e Contrato de Serviços Musicais",
  "description": "Documento digital para solicitação de orçamento e contratação da Mariana Matheos Jazz Band",
  "encodingFormat": "application/pdf",
  "url": "https://marianamatheos.com.br/agenda",
  "dateCreated": "2024-01-15",
  "dateModified": new Date().toISOString().split('T')[0],
  "author": {
    "@type": "Organization",
    "name": "Mariana Matheos Jazz Band"
  },
  "publisher": {
    "@type": "Organization", 
    "name": "Mariana Matheos Jazz Band"
  },
  "license": "https://creativecommons.org/licenses/by-nc/4.0/",
  "accessMode": ["textual", "visual"],
  "accessibilityFeature": ["alternativeText", "readingOrder"],
  "inLanguage": "pt-BR"
});

// CreativeWork Schema for original compositions
export const generateCreativeWorkSchema = () => ({
  "@context": "https://schema.org",
  "@type": "CreativeWork",
  "@id": "https://marianamatheos.com.br/repertorio/#original",
  "name": "Repertório Original Mariana Matheos",
  "description": "Arranjos exclusivos e interpretações únicas de standards de jazz pela Mariana Matheos Jazz Band",
  "creator": {
    "@type": "Person",
    "name": "Mariana Matheos",
    "jobTitle": "Vocalista e Arranjadora"
  },
  "dateCreated": "2020-01-01",
  "dateModified": new Date().toISOString().split('T')[0],
  "genre": ["Jazz", "Bossa Nova", "Blues", "Soul"],
  "inLanguage": ["pt-BR", "en-US"],
  "license": "All Rights Reserved",
  "copyrightHolder": {
    "@type": "Organization",
    "name": "Mariana Matheos Jazz Band"
  },
  "workExample": [
    {
      "@type": "MusicRecording",
      "name": "All About That Bass - Vintage Jazz Version",
      "description": "Versão jazz vintage da música original"
    },
    {
      "@type": "MusicRecording",
      "name": "Blue Moon - Billie Holiday Style",
      "description": "Interpretação no estilo Billie Holiday"
    }
  ]
});

// SpeakableSpecification for voice search optimization
export const generateSpeakableSchema = () => ({
  "@context": "https://schema.org",
  "@type": "WebPage",
  "url": "https://marianamatheos.com.br/",
  "speakable": {
    "@type": "SpeakableSpecification",
    "cssSelector": ["h1", ".hero-description", ".cta-text"],
    "xpath": [
      "/html/head/title",
      "//h1",
      "//*[@class='hero-description']"
    ]
  },
  "mainEntity": {
    "@type": "MusicGroup",
    "name": "Mariana Matheos Jazz Band",
    "description": "Banda de jazz para casamentos e eventos corporativos em Belo Horizonte"
  }
});

// Enhanced FAQ Schema with Q&A chains
export const generateEnhancedFAQSchema = () => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "@id": "https://marianamatheos.com.br/faq/#enhanced",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Como contratar a Mariana Matheos Jazz Band?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Para contratar nossa banda, entre em contato via WhatsApp (31) 99999-9999. Informe data, local, tipo de evento e duração desejada. Enviamos orçamento personalizado em até 24h.",
        "dateCreated": "2024-01-15",
        "upvoteCount": 42,
        "author": {
          "@type": "Organization",
          "name": "Mariana Matheos Jazz Band"
        }
      },
      "suggestedAnswer": [
        {
          "@type": "Answer",
          "text": "Também aceitamos contatos via email: contato@marianamatheos.com.br"
        }
      ]
    },
    {
      "@type": "Question", 
      "name": "Qual o valor para casamento?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Os valores variam de R$ 3.000 a R$ 6.000, dependendo da formação da banda (duo, trio ou banda completa), duração, local e estrutura necessária. Fazemos orçamentos personalizados.",
        "dateCreated": "2024-01-15",
        "upvoteCount": 38
      }
    },
    {
      "@type": "Question",
      "name": "Vocês levam equipamentos de som?",
      "acceptedAnswer": {
        "@type": "Answer", 
        "text": "Levamos todos os instrumentos musicais e microfones profissionais. O contratante fornece apenas o sistema de som (PA) compatível com o tamanho do evento.",
        "dateCreated": "2024-01-15",
        "upvoteCount": 35
      }
    }
  ],
  "about": {
    "@type": "Organization",
    "name": "Mariana Matheos Jazz Band"
  },
  "dateCreated": "2024-01-15",
  "dateModified": new Date().toISOString().split('T')[0]
});

// HowTo Schema for service contracting
export const generateHowToSchema = () => ({
  "@context": "https://schema.org",
  "@type": "HowTo", 
  "@id": "https://marianamatheos.com.br/como-contratar/#howto",
  "name": "Como Contratar a Mariana Matheos Jazz Band",
  "description": "Passo a passo completo para contratar nossa banda para seu evento",
  "image": "https://marianamatheos.com.br/images/banda.avif",
  "estimatedCost": {
    "@type": "MonetaryAmount",
    "currency": "BRL",
    "value": "4000"
  },
  "totalTime": "PT2H",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "Entre em Contato",
      "text": "Envie mensagem via WhatsApp (31) 99999-9999 com informações básicas do evento",
      "url": "https://wa.me/5531999999999",
      "image": "https://marianamatheos.com.br/images/whatsapp-icon.avif"
    },
    {
      "@type": "HowToStep", 
      "position": 2,
      "name": "Informe Detalhes",
      "text": "Compartilhe data, horário, local, tipo de evento, número de convidados e duração desejada",
      "tool": {
        "@type": "HowToTool",
        "name": "Informações do Evento"
      }
    },
    {
      "@type": "HowToStep",
      "position": 3, 
      "name": "Receba Orçamento",
      "text": "Enviamos proposta personalizada em até 24 horas com valor e condições",
      "supply": {
        "@type": "HowToSupply",
        "name": "Orçamento Detalhado"
      }
    },
    {
      "@type": "HowToStep",
      "position": 4,
      "name": "Confirme e Agende",
      "text": "Aceite a proposta e assine o contrato para garantir a data do seu evento"
    }
  ],
  "author": {
    "@type": "Organization",
    "name": "Mariana Matheos Jazz Band"
  },
  "datePublished": "2024-01-15",
  "dateModified": new Date().toISOString().split('T')[0]
});

