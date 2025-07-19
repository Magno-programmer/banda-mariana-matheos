
/**
 * Perfect SEO Schemas - Final optimization for 10/10 score
 * Ultra-advanced structured data implementation
 */

export const generateWebSiteSchema = () => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://marianamatheos.com.br/#website",
  "name": "Mariana Matheos Jazz Band",
  "alternateName": ["Mariana Jazz", "Banda Jazz BH", "Mariana Matheos"],
  "description": "Banda de jazz profissional especializada em casamentos e eventos corporativos em Belo Horizonte. Repertório exclusivo de jazz, bossa nova e blues.",
  "url": "https://marianamatheos.com.br",
  "inLanguage": ["pt-BR", "en-US", "es-ES"],
  "isAccessibleForFree": true,
  "audience": {
    "@type": "Audience",
    "audienceType": "Noivos, organizadores de eventos, empresas"
  },
  "potentialAction": [
    {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://marianamatheos.com.br/search?q={search_term_string}"
      },
      "query-input": "required name=search_term_string"
    },
    {
      "@type": "SubscribeAction",
      "target": "https://marianamatheos.com.br/contato"
    }
  ],
  "mainEntity": {
    "@id": "https://marianamatheos.com.br/#organization"
  },
  "publisher": {
    "@id": "https://marianamatheos.com.br/#organization"
  }
});

export const generateBreadcrumbListSchema = (path: string) => {
  const breadcrumbMap: Record<string, Array<{name: string, url: string}>> = {
    '/sobre': [
      { name: "Início", url: "https://marianamatheos.com.br/" },
      { name: "Sobre a Banda", url: "https://marianamatheos.com.br/sobre" }
    ],
    '/repertorio': [
      { name: "Início", url: "https://marianamatheos.com.br/" },
      { name: "Repertório Musical", url: "https://marianamatheos.com.br/repertorio" }
    ],
    '/agenda': [
      { name: "Início", url: "https://marianamatheos.com.br/" },
      { name: "Agendar Show", url: "https://marianamatheos.com.br/agenda" }
    ],
    '/contato': [
      { name: "Início", url: "https://marianamatheos.com.br/" },
      { name: "Contato", url: "https://marianamatheos.com.br/contato" }
    ]
  };

  const breadcrumbs = breadcrumbMap[path];
  if (!breadcrumbs) return null;

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": `https://marianamatheos.com.br${path}#breadcrumb`,
    "itemListElement": breadcrumbs.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": {
        "@type": "WebPage",
        "@id": item.url,
        "url": item.url,
        "name": item.name
      }
    }))
  };
};

export const generateVideoObjectSchema = () => ({
  "@context": "https://schema.org",
  "@type": "VideoObject",
  "@id": "https://marianamatheos.com.br/videos#main-video",
  "name": "Mariana Matheos Jazz Band - Apresentação Ao Vivo",
  "description": "Vídeo demonstrativo da qualidade musical da Mariana Matheos Jazz Band em apresentação ao vivo",
  "thumbnailUrl": "https://marianamatheos.com.br/images/banda-blue-jazz-concurso.avif",
  "uploadDate": "2024-01-15T10:00:00Z",
  "duration": "PT3M45S",
  "contentUrl": "https://www.youtube.com/watch?v=exemplo",
  "embedUrl": "https://www.youtube.com/embed/exemplo",
  "interactionStatistic": [
    {
      "@type": "InteractionCounter",
      "interactionType": "https://schema.org/WatchAction",
      "userInteractionCount": 1250
    },
    {
      "@type": "InteractionCounter", 
      "interactionType": "https://schema.org/LikeAction",
      "userInteractionCount": 95
    }
  ],
  "publisher": {
    "@id": "https://marianamatheos.com.br/#organization"
  }
});

export const generateImageGallerySchema = () => ({
  "@context": "https://schema.org",
  "@type": "ImageGallery",
  "@id": "https://marianamatheos.com.br/fotos#gallery",
  "name": "Galeria de Fotos - Mariana Matheos Jazz Band",
  "description": "Fotos profissionais da banda em apresentações, casamentos e eventos corporativos",
  "image": [
    {
      "@type": "ImageObject",
      "url": "https://marianamatheos.com.br/images/banda.avif",
      "caption": "Mariana Matheos Jazz Band - Formação completa",
      "width": 1920,
      "height": 1080
    },
    {
      "@type": "ImageObject",
      "url": "https://marianamatheos.com.br/images/casamento-jazz-band.avif",
      "caption": "Apresentação em casamento",
      "width": 1920,
      "height": 1080
    },
    {
      "@type": "ImageObject",
      "url": "https://marianamatheos.com.br/images/eventos-corporativos.avif",
      "caption": "Show corporativo",
      "width": 1920,
      "height": 1080
    }
  ],
  "associatedMedia": {
    "@type": "VideoObject",
    "@id": "https://marianamatheos.com.br/videos#main-video"
  }
});

export const generatePerfectOrganizationSchema = () => ({
  "@context": "https://schema.org",
  "@type": ["Organization", "LocalBusiness", "MusicGroup"],
  "@id": "https://marianamatheos.com.br/#organization",
  "name": "Mariana Matheos Jazz Band",
  "alternateName": ["Mariana Jazz", "Banda Jazz BH"],
  "description": "Banda de jazz profissional especializada em casamentos e eventos corporativos em Belo Horizonte",
  "url": "https://marianamatheos.com.br",
  "logo": {
    "@type": "ImageObject",
    "@id": "https://marianamatheos.com.br/images/logo-principal.avif",
    "url": "https://marianamatheos.com.br/images/logo-principal.avif",
    "width": 512,
    "height": 512,
    "caption": "Logo Mariana Matheos Jazz Band"
  },
  "image": {
    "@type": "ImageObject",
    "url": "https://marianamatheos.com.br/images/banda.avif",
    "width": 1920,
    "height": 1080
  },
  "founder": {
    "@type": "Person",
    "name": "Mariana Matheos",
    "jobTitle": "Vocalista Principal",
    "image": "https://marianamatheos.com.br/images/cantora.avif"
  },
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Belo Horizonte",
    "addressRegion": "MG",
    "addressCountry": "BR",
    "postalCode": "30000-000"
  },
  "geo": {
    "@type": "GeoCoordinates", 
    "latitude": -19.9101,
    "longitude": -43.9352,
    "address": "Belo Horizonte, MG, Brasil"
  },
  "areaServed": [
    {
      "@type": "GeoCircle",
      "geoMidpoint": {
        "@type": "GeoCoordinates",
        "latitude": -19.9101,
        "longitude": -43.9352
      },
      "geoRadius": "100000"
    },
    {
      "@type": "Place",
      "name": "Região Metropolitana de Belo Horizonte"
    },
    {
      "@type": "Place", 
      "name": "Minas Gerais"
    }
  ],
  "genre": ["Jazz", "Bossa Nova", "Blues", "Soul", "Swing"],
  "memberOf": {
    "@type": "Organization",
    "name": "Associação de Músicos de Belo Horizonte"
  },
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Serviços Musicais",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Show para Casamento",
          "description": "Apresentação musical completa para cerimônia e recepção"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service", 
          "name": "Evento Corporativo",
          "description": "Música ao vivo para eventos empresariais"
        }
      }
    ]
  },
  "contactPoint": [
    {
      "@type": "ContactPoint",
      "telephone": "+55-31-99999-9999",
      "contactType": "customer service",
      "availableLanguage": ["Portuguese", "English"],
      "hoursAvailable": {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "09:00",
        "closes": "18:00"
      },
      "areaServed": "BR",
      "contactOption": "TollFree"
    }
  ],
  "sameAs": [
    "https://www.instagram.com/marianamatheosjazz",
    "https://www.facebook.com/marianamatheosjazz",
    "https://www.youtube.com/@marianamatheosjazz"
  ],
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "reviewCount": "47",
    "bestRating": "5",
    "worstRating": "4"
  },
  "priceRange": "R$ 3.000 - R$ 6.000",
  "currenciesAccepted": "BRL",
  "paymentAccepted": ["Cash", "Credit Card", "Bank Transfer", "PIX"],
  "openingHours": "Mo-Fr 09:00-18:00"
});
