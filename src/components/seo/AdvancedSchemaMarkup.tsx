import React from 'react';
import { useLocation } from 'react-router-dom';

interface AdvancedSchemaMarkupProps {
  pageType?: 'homepage' | 'about' | 'services' | 'events' | 'gallery' | 'blog' | 'contact' | 'faq';
  customData?: any;
}

const AdvancedSchemaMarkup: React.FC<AdvancedSchemaMarkupProps> = ({ 
  pageType = 'homepage', 
  customData = {} 
}) => {
  const location = useLocation();
  const currentPath = location.pathname;
  
  // Base organization schema
  const baseOrganization = {
    "@context": "https://schema.org",
    "@type": ["Organization", "MusicGroup", "LocalBusiness"],
    "name": "Mariana Matheos Jazz Band",
    "alternateName": ["Mariana Matheos", "Banda de Jazz Belo Horizonte"],
    "url": "https://marianamatheos.com.br",
    "logo": {
      "@type": "ImageObject",
      "url": "https://marianamatheos.com.br/images/banda-blue-jazz-concurso.png",
      "width": 800,
      "height": 600
    },
    "image": [
      {
        "@type": "ImageObject",
        "url": "https://marianamatheos.com.br/images/banda-blue-jazz-concurso.png",
        "width": 800,
        "height": 600
      },
      {
        "@type": "ImageObject",
        "url": "https://marianamatheos.com.br/images/cantora.png",
        "width": 600,
        "height": 800
      }
    ],
    "description": "Banda de jazz ao vivo sediada em Belo Horizonte, especializada em casamentos, eventos corporativos e shows. Repertório inspirado na Era de Ouro do Jazz com mais de 200 músicas.",
    "genre": ["Jazz", "Soul", "Blues", "R&B", "Bossa Nova"],
    "foundingDate": "2020-01-01",
    "slogan": "A elegância do jazz clássico para seus momentos especiais",
    "knowsAbout": [
      "Jazz Performance",
      "Wedding Music",
      "Corporate Events",
      "Live Music Entertainment",
      "Vintage Jazz",
      "Bossa Nova",
      "Soul Music",
      "Blues Performance"
    ],
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Belo Horizonte",
      "addressRegion": "MG",
      "addressCountry": "BR",
      "postalCode": "30000-000"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": -19.9191,
      "longitude": -43.9386
    },
    "contactPoint": [
      {
        "@type": "ContactPoint",
        "telephone": "+55-31-99752-2127",
        "contactType": "customer service",
        "availableLanguage": ["Portuguese", "English"],
        "areaServed": "BR-MG"
      },
      {
        "@type": "ContactPoint",
        "contactType": "booking",
        "url": "https://wa.me/5531997522127",
        "availableLanguage": "Portuguese"
      }
    ],
    "sameAs": [
      "https://instagram.com/marianamatheosoficial",
      "https://youtube.com/@marianamatheosoficial",
      "https://facebook.com/marianamatheosoficial"
    ],
    "priceRange": "R$ 1500 - R$ 5000",
    "paymentAccepted": ["PIX", "Bank Transfer", "Credit Card"],
    "currenciesAccepted": "BRL",
    "areaServed": {
      "@type": "GeoCircle",
      "geoMidpoint": {
        "@type": "GeoCoordinates",
        "latitude": -19.9191,
        "longitude": -43.9386
      },
      "geoRadius": "100000"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "5.0",
      "reviewCount": "50",
      "bestRating": "5",
      "worstRating": "1"
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
          "bestRating": "5"
        },
        "reviewBody": "Excelente cantora!! Vale a pena assistir o seu show!!",
        "datePublished": "2024-03-01"
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
          "bestRating": "5"
        },
        "reviewBody": "Excelente cantora, uma voz maravilhosa e canta todo tipo de música... super animada e simpática",
        "datePublished": "2024-03-05"
      }
    ]
  };

  // Service schema
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Apresentações Musicais ao Vivo",
    "provider": {
      "@type": "Organization",
      "name": "Mariana Matheos Jazz Band"
    },
    "description": "Serviços de música ao vivo para casamentos, eventos corporativos e shows especiais",
    "serviceType": ["Wedding Music", "Corporate Entertainment", "Live Jazz Performance"],
    "areaServed": {
      "@type": "State",
      "name": "Minas Gerais"
    },
    "offers": [
      {
        "@type": "Offer",
        "name": "Casamento Completo",
        "description": "Apresentação completa para casamento com repertório personalizado",
        "price": "3500",
        "priceCurrency": "BRL",
        "availability": "https://schema.org/InStock",
        "validFrom": "2024-01-01",
        "validThrough": "2024-12-31"
      },
      {
        "@type": "Offer",
        "name": "Evento Corporativo",
        "description": "Apresentação para eventos empresariais e corporativos",
        "price": "2500",
        "priceCurrency": "BRL",
        "availability": "https://schema.org/InStock",
        "validFrom": "2024-01-01",
        "validThrough": "2024-12-31"
      }
    ]
  };

  // Event schema
  const eventSchema = {
    "@context": "https://schema.org",
    "@type": "Event",
    "name": "Show da Mariana Matheos Jazz Band",
    "startDate": "2024-12-31T20:00:00-03:00",
    "endDate": "2024-12-31T23:00:00-03:00",
    "eventStatus": "https://schema.org/EventScheduled",
    "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
    "location": {
      "@type": "Place",
      "name": "Belo Horizonte",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Belo Horizonte",
        "addressRegion": "MG",
        "addressCountry": "BR"
      }
    },
    "performer": {
      "@type": "MusicGroup",
      "name": "Mariana Matheos Jazz Band"
    },
    "offers": {
      "@type": "Offer",
      "url": "https://marianamatheos.com.br/agenda",
      "price": "2500",
      "priceCurrency": "BRL",
      "availability": "https://schema.org/InStock",
      "validFrom": "2024-01-01"
    }
  };

  // FAQ schema
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Quanto custa contratar a Mariana Matheos para casamento?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "O valor varia conforme o tipo de evento, local, duração e formação da banda. Para casamentos, valores a partir de R$ 3.500. Solicite um orçamento personalizado via WhatsApp."
        }
      },
      {
        "@type": "Question",
        "name": "Qual é o repertório da banda?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Temos mais de 200 músicas no repertório, incluindo jazz clássico, bossa nova, soul, blues e releituras vintage de sucessos modernos. Repertório inspirado na Era de Ouro do Jazz."
        }
      },
      {
        "@type": "Question",
        "name": "A banda se apresenta fora de Belo Horizonte?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Sim! Atendemos toda a região metropolitana de BH e interior de Minas Gerais. Para locais mais distantes, cobramos taxa de deslocamento."
        }
      }
    ]
  };

  // Website schema
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Mariana Matheos Jazz Band",
    "url": "https://marianamatheos.com.br",
    "description": "Site oficial da Mariana Matheos Jazz Band - Banda de jazz para casamentos e eventos em Belo Horizonte",
    "inLanguage": "pt-BR",
    "publisher": {
      "@type": "Organization",
      "name": "Mariana Matheos Jazz Band"
    },
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://marianamatheos.com.br/search?q={search_term_string}"
      },
      "query-input": "required name=search_term_string"
    }
  };

  // Person schema for Mariana Matheos
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Mariana Matheos",
    "jobTitle": "Cantora e Diretora Musical",
    "memberOf": {
      "@type": "MusicGroup",
      "name": "Mariana Matheos Jazz Band"
    },
    "performer": {
      "@type": "MusicGroup",
      "name": "Mariana Matheos Jazz Band"
    },
    "description": "Cantora profissional especializada em jazz, soul e bossa nova. Diretora artística da Mariana Matheos Jazz Band.",
    "url": "https://marianamatheos.com.br/sobre",
    "sameAs": [
      "https://instagram.com/marianamatheosoficial",
      "https://youtube.com/@marianamatheosoficial"
    ]
  };

  // Generate schemas based on page type
  const generateSchemas = () => {
    const schemas: any[] = [baseOrganization, websiteSchema];
    
    switch (pageType) {
      case 'homepage':
        schemas.push(serviceSchema, eventSchema);
        break;
      case 'about':
        schemas.push(personSchema);
        break;
      case 'services':
        schemas.push(serviceSchema);
        break;
      case 'events':
        schemas.push(eventSchema);
        break;
      case 'faq':
        schemas.push(faqSchema);
        break;
      case 'gallery':
        schemas.push({
          "@context": "https://schema.org",
          "@type": "ImageGallery",
          "name": "Galeria de Fotos - Mariana Matheos Jazz Band",
          "description": "Fotos das apresentações da Mariana Matheos Jazz Band",
          "url": "https://marianamatheos.com.br/fotos"
        });
        break;
      case 'blog':
        schemas.push({
          "@context": "https://schema.org",
          "@type": "Blog",
          "name": "Blog da Mariana Matheos Jazz Band",
          "description": "Artigos sobre jazz, música e entretenimento",
          "url": "https://marianamatheos.com.br/blog"
        });
        break;
      case 'contact':
        schemas.push({
          "@context": "https://schema.org",
          "@type": "ContactPage",
          "name": "Contato - Mariana Matheos Jazz Band",
          "description": "Entre em contato com a Mariana Matheos Jazz Band",
          "url": "https://marianamatheos.com.br/contato"
        });
        break;
    }
    
    return schemas;
  };

  const schemas = generateSchemas();

  return (
    <>
      {schemas.map((schema, index) => (
        <script 
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ 
            __html: JSON.stringify(schema, null, 2) 
          }}
        />
      ))}
    </>
  );
};

export default AdvancedSchemaMarkup;