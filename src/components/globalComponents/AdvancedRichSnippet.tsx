import React from 'react';
import { useLocation } from 'react-router-dom';

interface Event {
  name: string;
  startDate: string;
  endDate: string;
  venue: string;
  description?: string;
  price?: string;
}

interface Review {
  author: string;
  rating: number;
  reviewBody: string;
  datePublished?: string;
}

interface FAQ {
  question: string;
  answer: string;
}

const AdvancedRichSnippet = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  // Base organization data
  const baseOrganization = {
    "@context": "https://schema.org",
    "@type": ["Organization", "MusicGroup"],
    "name": "Mariana Matheos",
    "alternateName": "Mariana Matheos Jazz Band",
    "url": "https://marianamatheos.com.br",
    "logo": "https://marianamatheos.com.br/images/banda-blue-jazz-concurso.png",
    "image": [
      "https://marianamatheos.com.br/images/banda-blue-jazz-concurso.png",
      "https://marianamatheos.com.br/images/cantora.png",
      "https://marianamatheos.com.br/images/banda.png"
    ],
    "description": "Banda de jazz especializada em apresentações ao vivo com repertório da Era de Ouro do Jazz, incluindo clássicos de Billie Holiday, Amy Winehouse, Nina Simone e mais.",
    "genre": ["Jazz", "Soul", "Blues", "R&B", "Bossa Nova"],
    "foundingDate": "2020",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Belo Horizonte",
      "addressRegion": "MG",
      "addressCountry": "BR"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+55-31-99752-2127",
      "email": "contato@marianamatheos.com.br",
      "contactType": "Customer Service",
      "availableLanguage": ["Portuguese", "English"]
    },
    "sameAs": [
      "https://instagram.com/marianamatheosoficial",
      "https://youtube.com/@marianamatheosoficial"
    ],
    "knowsAbout": [
      "Jazz Performance",
      "Wedding Music",
      "Corporate Events",
      "Live Music Entertainment",
      "Billie Holiday Tribute",
      "Amy Winehouse Tribute",
      "Nina Simone Tribute"
    ]
  };

  // Events data
  const events: Event[] = [
    {
      name: "Show da Mariana Matheos no The Bulltique Vino Bar",
      startDate: "2025-08-08T20:00:00-03:00",
      endDate: "2025-08-08T22:00:00-03:00",
      venue: "The Bulltique Vino Bar",
      description: "Uma noite especial de jazz com a Mariana Matheos e sua banda",
      price: "R$ 80"
    },
    {
      name: "Apresentação em Casamento - Local Privado",
      startDate: "2025-09-15T19:00:00-03:00",
      endDate: "2025-09-15T23:00:00-03:00",
      venue: "Evento Privado",
      description: "Cerimônia e recepção de casamento com repertório personalizado"
    }
  ];

  // Reviews data
  const reviews: Review[] = [
    {
      author: "Geraldo Santana",
      rating: 5,
      reviewBody: "Excelente cantora!! Vale a pena assistir o seu show!!",
      datePublished: "2024-03-15"
    },
    {
      author: "Juciane Petenusso",
      rating: 5,
      reviewBody: "Excelente cantora, uma voz maravilhosa e canta todo tipo de música... super animada e simpática",
      datePublished: "2024-04-22"
    },
    {
      author: "Vanessa Guedes",
      rating: 5,
      reviewBody: "Cantora sensacional! Deus abençoe nesta jornada... Emoção e carisma!",
      datePublished: "2024-05-10"
    },
    {
      author: "Carlos Silva",
      rating: 5,
      reviewBody: "Contratei para meu casamento e foi perfeito! Repertório impecável e apresentação profissional.",
      datePublished: "2024-06-18"
    },
    {
      author: "Marina Costa",
      rating: 5,
      reviewBody: "Show incrível! A voz da Mariana é única e a banda é muito talentosa.",
      datePublished: "2024-07-05"
    }
  ];

  // FAQ data
  const faqs: FAQ[] = [
    {
      question: "Qual é o repertório da banda?",
      answer: "Nosso repertório inclui clássicos do jazz, soul, blues e R&B, com interpretações de artistas como Billie Holiday, Amy Winehouse, Nina Simone, Ella Fitzgerald e muito mais. Também tocamos bossa nova e música brasileira."
    },
    {
      question: "Vocês tocam em casamentos?",
      answer: "Sim! Somos especializados em casamentos e eventos corporativos. Oferecemos diferentes formações da banda e repertório personalizado para cada momento da cerimônia e recepção."
    },
    {
      question: "Qual é o valor do show?",
      answer: "O valor varia conforme a duração, local, formação da banda e tipo de evento. Entre em contato para um orçamento personalizado."
    },
    {
      question: "Vocês fornecem equipamento de som?",
      answer: "Sim, fornecemos todo o equipamento de som necessário, incluindo microfones, amplificadores e mesa de som profissional."
    },
    {
      question: "Com quanto tempo de antecedência devo contratar?",
      answer: "Recomendamos pelo menos 3 meses de antecedência, especialmente para eventos em alta temporada como dezembro e janeiro."
    }
  ];

  // Generate structured data based on current route
  const generateStructuredData = () => {
    const schemas = [];

    // Always include base organization
    schemas.push(baseOrganization);

    switch (currentPath) {
      case '/':
        // Homepage - WebSite + Organization
        schemas.push({
          "@context": "https://schema.org",
          "@type": "WebSite",
          "name": "Mariana Matheos Jazz Band",
          "url": "https://marianamatheos.com.br",
          "description": "Site oficial da Mariana Matheos Jazz Band - Música ao vivo para casamentos e eventos corporativos",
          "publisher": {
            "@type": "Organization",
            "name": "Mariana Matheos"
          },
          "potentialAction": {
            "@type": "SearchAction",
            "target": "https://marianamatheos.com.br/search?q={search_term_string}",
            "query-input": "required name=search_term_string"
          }
        });
        break;

      case '/sobre':
        // About page - Detailed MusicGroup with members
        schemas.push({
          "@context": "https://schema.org",
          "@type": "MusicGroup",
          "name": "Mariana Matheos Jazz Band",
          "genre": ["Jazz", "Soul", "Blues", "R&B"],
          "description": "Grupo musical especializado em apresentações ao vivo com repertório inspirado na Era de Ouro do Jazz. Nossa missão é levar a elegância e sofisticação do jazz clássico para eventos especiais.",
          "url": "https://marianamatheos.com.br/sobre",
          "image": "https://marianamatheos.com.br/images/cantora.png",
          "member": [
            {
              "@type": "Person",
              "name": "Mariana Matheos",
              "jobTitle": "Vocalista Principal",
              "description": "Vocalista especializada em jazz e soul com mais de 10 anos de experiência"
            }
          ],
          "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Serviços Musicais",
            "itemListElement": [
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Show para Casamentos",
                  "description": "Apresentação musical completa para cerimônias e recepções"
                }
              },
              {
                "@type": "Offer", 
                "itemOffered": {
                  "@type": "Service",
                  "name": "Eventos Corporativos",
                  "description": "Música ao vivo para eventos empresariais e confraternizações"
                }
              }
            ]
          }
        });
        break;

      case '/repertorio':
        // Repertoire page - CreativeWorkSeries
        schemas.push({
          "@context": "https://schema.org",
          "@type": "CreativeWorkSeries",
          "name": "Repertório Musical da Mariana Matheos",
          "url": "https://marianamatheos.com.br/repertorio",
          "description": "Repertório completo da banda incluindo clássicos do jazz, soul, blues e R&B. Interpretações fiéis de grandes artistas como Billie Holiday, Amy Winehouse, Nina Simone e outros ícones da música.",
          "genre": ["Jazz", "Soul", "Blues", "R&B", "Bossa Nova"],
          "creator": {
            "@type": "MusicGroup",
            "name": "Mariana Matheos Jazz Band"
          },
          "workExample": [
            {
              "@type": "MusicRecording",
              "name": "Strange Fruit - Billie Holiday",
              "byArtist": "Mariana Matheos"
            },
            {
              "@type": "MusicRecording", 
              "name": "Valerie - Amy Winehouse",
              "byArtist": "Mariana Matheos"
            },
            {
              "@type": "MusicRecording",
              "name": "Feeling Good - Nina Simone", 
              "byArtist": "Mariana Matheos"
            }
          ]
        });
        break;

      case '/agenda':
        // Booking page - Events
        schemas.push({
          "@context": "https://schema.org",
          "@type": "EventSeries",
          "name": "Shows da Mariana Matheos",
          "description": "Agenda de apresentações da Mariana Matheos Jazz Band",
          "organizer": {
            "@type": "Organization",
            "name": "Mariana Matheos"
          },
          "subEvent": events.map(event => ({
            "@type": "MusicEvent",
            "name": event.name,
            "startDate": event.startDate,
            "endDate": event.endDate,
            "location": {
              "@type": "Place",
              "name": event.venue,
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
            "description": event.description || "Apresentação ao vivo da Mariana Matheos Jazz Band",
            "offers": event.price ? {
              "@type": "Offer",
              "price": event.price,
              "priceCurrency": "BRL",
              "availability": "https://schema.org/InStock"
            } : undefined
          }))
        });
        break;

      case '/depoimentos':
        // Testimonials page - Organization with reviews
        schemas.push({
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "Mariana Matheos",
          "url": "https://marianamatheos.com.br/depoimentos",
          "review": reviews.map(review => ({
            "@type": "Review",
            "author": {
              "@type": "Person",
              "name": review.author
            },
            "reviewRating": {
              "@type": "Rating",
              "ratingValue": review.rating.toString(),
              "bestRating": "5",
              "worstRating": "1"
            },
            "reviewBody": review.reviewBody,
            "datePublished": review.datePublished
          })),
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "5",
            "bestRating": "5",
            "worstRating": "5",
            "ratingCount": reviews.length.toString(),
            "reviewCount": reviews.length.toString()
          }
        });
        break;

      case '/contato':
        // Contact page - LocalBusiness with enhanced contact info
        schemas.push({
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          "name": "Mariana Matheos",
          "telephone": "+55-31-99752-2127",
          "email": "contato@marianamatheos.com.br",
          "url": "https://marianamatheos.com.br/contato",
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Belo Horizonte",
            "addressRegion": "MG",
            "addressCountry": "BR"
          },
          "openingHours": "Mo-Su 09:00-22:00",
          "priceRange": "$$",
          "paymentAccepted": ["Cash", "Credit Card", "Bank Transfer"],
          "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Serviços de Música ao Vivo",
            "itemListElement": [
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Música para Casamentos",
                  "category": "Entertainment"
                }
              }
            ]
          }
        });
        break;

      case '/faq':
        // FAQ page
        schemas.push({
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
        });
        break;

      case '/fotos':
      case '/videos':
        // Gallery pages - ImageGallery/VideoGallery
        const isVideo = currentPath === '/videos';
        schemas.push({
          "@context": "https://schema.org",
          "@type": isVideo ? "VideoGallery" : "ImageGallery",
          "name": `${isVideo ? 'Vídeos' : 'Fotos'} - Mariana Matheos Jazz Band`,
          "description": `Galeria de ${isVideo ? 'vídeos' : 'fotos'} das apresentações da Mariana Matheos Jazz Band`,
          "url": `https://marianamatheos.com.br${currentPath}`,
          "creator": {
            "@type": "Organization",
            "name": "Mariana Matheos"
          },
          "about": {
            "@type": "MusicGroup",
            "name": "Mariana Matheos Jazz Band"
          }
        });
        break;
    }

    return schemas;
  };

  const structuredDataArray = generateStructuredData();

  return (
    <>
      {structuredDataArray.map((schema, index) => (
        <script
          key={`structured-data-${index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schema, null, 0)
          }}
        />
      ))}
    </>
  );
};

export default AdvancedRichSnippet;