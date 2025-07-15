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
    "description": "Banda de jazz ao vivo sediada em Belo Horizonte, com repertório inspirado na Era de Ouro do Jazz. Especializada em eventos sofisticados, casamentos, festivais e repertório com grandes artistas como Billie Holiday, Amy Winehouse e Nina Simone.",
    "genre": ["Jazz", "Soul", "Blues", "R&B"],
    "foundingDate": "2024-05-10",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Belo Horizonte",
      "addressRegion": "MG",
      "addressCountry": "BR"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+55-31-99752-2127",
      "contactType": "Booking",
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
      "Vintage Jazz",
      "Jazz para Casamento",
      "Billie Holiday",
      "Amy Winehouse",
      "Nina Simone"
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
    price: "R$ 25"
  },
  {
    name: "Show da Mariana Matheos no Soul Jazz Burguer",
    startDate: "2025-08-16T19:30:00-03:00",
    endDate: "2025-08-16T21:30:00-03:00",
    venue: "Soul Jazz Burguer",
    description: "Show de jazz ao vivo em ambiente intimista no Soul Jazz Burguer",
    price: "R$ 20"
  },
  {
    name: "Show da Mariana Matheos no The Bulltique Vino Bar",
    startDate: "2025-09-12T20:00:00-03:00",
    endDate: "2025-09-12T22:00:00-03:00",
    venue: "The Bulltique Vino Bar",
    description: "Retorno da Mariana Matheos ao palco do The Bulltique Vino Bar com repertório especial de jazz e soul",
    price: "R$ 25"
  }
];

// Review data 
const reviews: Review[] = [
  {
    author: "Geraldo Santana",
    rating: 5,
    reviewBody: "Excelente cantora!! Vale a pena assistir o seu show!!",
    datePublished: "2024-03-01"
  },
  {
    author: "Juciane Petenusso",
    rating: 5,
    reviewBody: "Excelente cantora, uma voz maravilhosa e canta todo tipo de música... super animada e simpática",
    datePublished: "2024-03-05"
  },
  {
    author: "Vanessa Guedes",
    rating: 5,
    reviewBody: "Cantora sensacional! Deus abençoe nesta jornada... Emoção e carisma!",
    datePublished: "2024-03-10"
  },
  {
    author: "Ana Carolina",
    rating: 5,
    reviewBody: "Canta muitooooo. Adorei!!!! Irei mais vezes.",
    datePublished: "2024-03-15"
  },
  {
    author: "Kel Souza",
    rating: 5,
    reviewBody: "Alegria e simpatia sempre em alta. Sucesso p vc!",
    datePublished: "2024-03-20"
  },
  {
    author: "Carlos Magno",
    rating: 5,
    reviewBody: "Banda top demais, sucesso!!",
    datePublished: "2024-03-25"
  },
  {
    author: "Luciana dos Santos",
    rating: 5,
    reviewBody: "Sensação que estamos na década de 20 ~ 60, é algo tão único que não dá pra explicar, tem que assistir.",
    datePublished: "2024-04-01"
  },
  {
    author: "Mariana Sabbag",
    rating: 5,
    reviewBody: "Excelente experiência estar em sua presença ouvindo o repertório.",
    datePublished: "2024-04-06"
  },
  {
    author: "Sergio Roberto",
    rating: 5,
    reviewBody: "Mariana é uma cantora excelente, super afinada, interage com o público.",
    datePublished: "2024-04-10"
  },
  {
    author: "Andre Guedes",
    rating: 5,
    reviewBody: "Excelente cantora!",
    datePublished: "2024-04-15"
  },
  {
    author: "Alende Guedes",
    rating: 5,
    reviewBody: "👏👏👏👏 Sucesso Mariana!",
    datePublished: "2024-04-20"
  },
  {
    author: "Reginaldo Santos",
    rating: 5,
    reviewBody: "Mariana você é 10",
    datePublished: "2024-04-25"
  }
];

// ClientReview data
const clientReviews: Review[] = [
  {
    author: "Poliana (Soul Jazz Burguer)",
    rating: 5,
    reviewBody: "Eeeeiii Mari!! Foi muito bacana!!! Agradecemos mais uma vez a parceria!!",
    datePublished: "2024-05-01"
  },
  {
    author: "Ana Luiza (Restaurante Le Pontes)",
    rating: 5,
    reviewBody: "A gente adorou a apresentação de vocês, queremos trazer vocês mais vezes. Muitíssimo obrigada!!",
    datePublished: "2024-05-05"
  },
  {
    author: "Ravana (Arena Cachoeirinha)",
    rating: 5,
    reviewBody: "Nossa foi otimooooooo! Brigaduuuu, foi tão lindooooo! Obrigadaaaaaaa, lindezaaaa!",
    datePublished: "2024-05-10"
  },
  {
    author: "Maurinho (Chopperhead Garage)",
    rating: 5,
    reviewBody: "Vamos fazer mais! ✌️",
    datePublished: "2024-05-15"
  },
  {
    author: "Lucca (Barólio)",
    rating: 5,
    reviewBody: "O pessoal gostou bastante, muito obrigado!",
    datePublished: "2024-05-20"
  },
  {
    author: "André Serra (Evento de Carros Antigos de Matozinhos)",
    rating: 5,
    reviewBody: "Seu show foi fantástico! Marcou a história da nossa região. Sucesso total!",
    datePublished: "2024-05-25"
  },
  {
    author: "Débora (The Bulltique Vino Bar)",
    rating: 5,
    reviewBody: "Foi tudo lindo e mágico! 😍 Ansiosa para nosso próximo encontro!!!!",
    datePublished: "2024-06-01"
  }
];


// FAQ data
const faqs: FAQ[] = [
  {
    question: "Quanto custa contratar a Mariana Matheos para casamento ou evento?",
    answer: "O valor varia conforme o tipo de evento, local e estrutura técnica necessária. Solicite um orçamento sem compromisso!"
  },
  {
    question: "A banda toca músicas escolhidas pelos noivos?",
    answer: "Sim! Os noivos podem escolher até 2 músicas que combinem com o estilo da banda. A curadoria é feita por Mariana Matheos para manter a harmonia artística."
  },
  {
    question: "A banda faz apresentações em eventos corporativos e particulares?",
    answer: "Sim! A banda se apresenta em eventos empresariais, festivais, jantares elegantes, bares de vinho e casas de jazz."
  },
  {
    question: "Quais estilos musicais fazem parte do repertório da banda?",
    answer: "O repertório inclui Jazz Clássico, Soul, Blues, R&B e releituras vintage de pop contemporâneo, com influências da Era de Ouro do Jazz."
  },
  {
    question: "A banda se apresenta fora de Belo Horizonte?",
    answer: "Sim! A banda já se apresentou em cidades como Nova Lima, Matozinhos e Ribeirão das Neves. O deslocamento já está incluso no investimento para regiões próximas."
  },
  {
    question: "A banda leva os equipamentos necessários?",
    answer: "Sim. A banda leva instrumentos, microfones e pedalboards. O contratante fornece apenas o PA, energia elétrica e, em alguns casos, alimentação."
  },
  {
    question: "Quantas pessoas compõem a banda?",
    answer: "A formação padrão inclui 5 músicos: vocal, piano, baixo/guitarra, bateria e trompete. Formatos reduzidos são possíveis mediante acordo."
  },
  {
    question: "Quanto tempo dura o show?",
    answer: "A duração padrão é de 2 horas, com intervalo. Shows mais curtos também são possíveis sem pausa."
  },
  {
    question: "A banda possui boas recomendações?",
    answer: "Sim! A banda tem avaliação 5,0 estrelas no Google e é amplamente elogiada por clientes de casamentos, restaurantes e eventos corporativos."
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
          "name": "Mariana Matheos",
          "url": "https://marianamatheos.com.br",
          "description": "Site oficial da Mariana Matheos - Música ao vivo para casamentos e eventos corporativos",
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
          "name": "Mariana Matheos Banda de Jazz",
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
          }
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
        const allReviews = [...reviews, ...clientReviews];

        // Função para extrair nome da empresa, se vier entre parênteses
        const extractPublisher = (authorName: string) => {
          const match = authorName.match(/\((.*?)\)/);
          return match ? match[1].trim() : null;
        };

        schemas.push({
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "Depoimentos sobre Mariana Matheos",
          "url": "https://marianamatheos.com.br/depoimentos",
          "review": allReviews.map(review => {
            const publisherName = extractPublisher(review.author);
            const cleanAuthorName = review.author.replace(/\s*\(.*?\)\s*/, "").trim();

            const reviewSchema: any = {
              "@type": "Review",
              "author": {
                "@type": "Person",
                "name": cleanAuthorName
              },
              "reviewRating": {
                "@type": "Rating",
                "ratingValue": review.rating.toString(),
                "bestRating": "5",
                "worstRating": "1"
              },
              "reviewBody": review.reviewBody,
              "datePublished": review.datePublished
            };

            if (publisherName) {
              reviewSchema.publisher = {
                "@type": "Organization",
                "name": publisherName
              };
            }

            return reviewSchema;
          }),
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "5",
            "bestRating": "5",
            "worstRating": "1",
            "ratingCount": allReviews.length.toString(),
            "reviewCount": allReviews.length.toString()
          }
        });
        break;


      case '/contato':
        // Contact page - LocalBusiness with enhanced contact info
        schemas.push({
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          "name": "Contato com Mariana Matheos",
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