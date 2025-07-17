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
  category?: string;
  priority?: string;
  tags?: string[];
  suggestedAnswer?: any;
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


// Advanced FAQ data with rich schema properties
const advancedFAQs: FAQ[] = [
  // CATEGORIA: CONTRATAÇÃO E INVESTIMENTO
  {
    question: "Quanto custa contratar a Mariana Matheos para casamento ou evento?",
    answer: "O valor varia conforme o tipo de evento, local, duração, estrutura técnica necessária e formação da banda. Casamentos têm valores diferenciados de eventos corporativos. Eventos em cidades próximas a BH têm desconto no deslocamento. Solicite um orçamento personalizado sem compromisso!",
    category: "Contratação e Investimento",
    priority: "alta",
    tags: ["preço", "orçamento", "casamento", "evento", "contratação"],
    suggestedAnswer: {
      "@type": "Answer",
      "text": "O valor varia conforme o tipo de evento, local, duração, estrutura técnica necessária e formação da banda. Casamentos têm valores diferenciados de eventos corporativos. Eventos em cidades próximas a BH têm desconto no deslocamento. Solicite um orçamento personalizado sem compromisso!",
      "upvoteCount": 95,
      "dateCreated": "2024-01-01",
      "author": {
        "@type": "Organization",
        "name": "Mariana Matheos Jazz Band"
      }
    }
  },
  {
    question: "Qual é o prazo mínimo para contratar a banda?",
    answer: "Recomendamos agendamento com pelo menos 30 dias de antecedência, especialmente para casamentos e eventos de fim de semana. Em alta temporada (outubro a março), sugerimos 60 dias. Para eventos corporativos urgentes, consulte nossa disponibilidade - às vezes conseguimos encaixar com menor prazo.",
    category: "Contratação e Investimento",
    priority: "alta",
    tags: ["prazo", "antecedência", "agendamento", "temporada"]
  },
  {
    question: "Como funciona o pagamento e existe contrato?",
    answer: "Trabalhamos com contrato formal para garantir segurança de ambas as partes. O pagamento é dividido em duas parcelas: 50% na assinatura do contrato e 50% no dia do evento. Aceitamos transferência bancária, PIX e cartão de crédito (com acréscimo de taxas).",
    category: "Contratação e Investimento",
    priority: "media",
    tags: ["pagamento", "contrato", "parcelas", "pix", "transferência"]
  },
  {
    question: "A banda toca músicas escolhidas pelos noivos ou contratantes?",
    answer: "Sim! Para casamentos e eventos especiais, os noivos podem escolher até 3 músicas que façam sentido com o estilo da banda. A curadoria musical é feita pela própria diretora artística Mariana Matheos, garantindo harmonia e emoção em cada apresentação. Também oferecemos sugestões baseadas no tipo de evento e momento da celebração.",
    category: "Repertório e Estilo Musical",
    priority: "alta",
    tags: ["repertório", "personalização", "noivos", "curadoria", "Mariana Matheos"]
  },
  {
    question: "Quais estilos musicais fazem parte do repertório da banda?",
    answer: "Tocamos uma mistura refinada de Jazz Clássico, Soul, Blues, R&B, Bossa Nova, baladas românticas e releituras vintage de pop contemporâneo. Inspirada na Era de Ouro do Jazz (1920–1960), nossa sonoridade é envolvente, elegante e cheia de identidade. Temos mais de 150 músicas no repertório, desde clássicos como 'Fly Me To The Moon' até sucessos modernos com arranjos jazzeados.",
    category: "Repertório e Estilo Musical",
    priority: "alta",
    tags: ["jazz", "soul", "blues", "bossa nova", "repertório", "150 músicas"]
  },
  {
    question: "A banda leva os equipamentos necessários?",
    answer: "A banda leva seus próprios instrumentos (piano elétrico, baixo, guitarra, bateria completa, trompete), microfones profissionais Shure, pedalboards e todos os cabos. O contratante é responsável apenas pela estrutura básica de som (PA compatível com o espaço), energia elétrica estável e, em alguns casos, alimentação dos músicos após o show.",
    category: "Estrutura Técnica e Logística",
    priority: "alta",
    tags: ["equipamentos", "instrumentos", "microfones", "PA", "energia", "alimentação"]
  },
  {
    question: "Quantas pessoas compõem a banda?",
    answer: "A formação padrão tem 5 músicos profissionais: vocal (Mariana Matheos), piano, baixo/guitarra, bateria e trompete — todos com formação musical sólida e carreira consolidada. Para eventos menores ou orçamentos específicos, oferecemos formações reduzidas (trio ou quarteto). Também podemos incluir músicos adicionais como saxofone ou violino mediante solicitação.",
    category: "Formação e Profissionais",
    priority: "alta",
    tags: ["5 músicos", "formação", "trio", "quarteto", "saxofone", "violino"]
  },
  {
    question: "A banda faz apresentações em eventos corporativos e particulares?",
    answer: "Absolutamente! Temos experiência em eventos empresariais, jantares elegantes, festivais, bares de vinho, casas de jazz, formaturas, aniversários de 50 anos, vernissages e lançamentos de produtos. Adaptamos o repertório, figurino e energia conforme o clima e perfil do evento. Cada apresentação é única e personalizada.",
    category: "Tipos de Eventos",
    priority: "alta",
    tags: ["corporativo", "empresarial", "festivais", "aniversários", "vernissages", "lançamentos"]
  },
  {
    question: "Quanto tempo dura o show?",
    answer: "A duração padrão é de 2 horas, divididas em dois blocos de 50 minutos com um intervalo de 20 minutos. Para eventos mais longos, podemos estender até 3 horas. Para eventos mais curtos (coquetel, por exemplo), oferecemos apresentações de 1 hora direto, sem pausa. Tudo é combinado previamente.",
    category: "Apresentação e Show",
    priority: "alta",
    tags: ["2 horas", "50 minutos", "intervalo", "3 horas", "1 hora", "flexibilidade"]
  },
  {
    question: "A banda se apresenta fora de Belo Horizonte?",
    answer: "Sim! Já nos apresentamos em Nova Lima, Matozinhos, Ribeirão das Neves, Contagem, Betim, Ouro Preto, Tiradentes, Brumadinho e outras cidades de Minas Gerais. Para região metropolitana de BH, o deslocamento está incluso. Para cidades mais distantes, cobramos taxa de deslocamento e, em alguns casos, hospedagem.",
    category: "Localização e Deslocamento",
    priority: "alta",
    tags: ["fora de BH", "Nova Lima", "Ouro Preto", "Tiradentes", "deslocamento", "hospedagem"]
  },
  {
    question: "A banda possui boas recomendações?",
    answer: "Sim! Temos avaliação 5,0 estrelas no Google com mais de 50 avaliações, centenas de depoimentos positivos no Instagram e referências de grandes eventos. Clientes nos recomendam frequentemente para amigos e familiares. Nossa taxa de satisfação é superior a 98% e muitos clientes nos contratam novamente.",
    category: "Recomendações e Qualidade",
    priority: "alta",
    tags: ["5 estrelas", "50 avaliações", "instagram", "98% satisfação", "recontratação"]
  },
  {
    question: "Qual o tamanho mínimo do palco ou espaço para apresentação?",
    answer: "Precisamos de um espaço mínimo de 4m x 3m para acomodar os 5 músicos e instrumentos confortavelmente. O local deve ter piso nivelado, cobertura em caso de chuva e pontos de energia elétrica próximos. Para eventos ao ar livre, consideramos fatores como vento e temperatura. Fazemos visita técnica prévia se necessário.",
    category: "Estrutura Técnica e Logística",
    priority: "media",
    tags: ["palco", "espaço", "4m x 3m", "cobertura", "energia", "visita técnica"]
  },
  {
    question: "Vocês tocam em casamentos? Como funciona?",
    answer: "Casamentos são nossa especialidade! Podemos tocar durante o coquetel, jantar e/ou festa. Oferecemos repertório específico para cada momento: jazz suave para coquetel, baladas românticas para jantar e música mais animada para dança. Trabalhamos em sincronia com cerimonialistas e fotógrafos para criar momentos únicos.",
    category: "Tipos de Eventos",
    priority: "alta",
    tags: ["casamentos", "coquetel", "jantar", "festa", "cerimonialistas", "fotógrafos"]
  },
  {
    question: "É possível ouvir o repertório antes de contratar?",
    answer: "Claro! Temos vários vídeos no nosso Instagram (@marianamatheos) e YouTube mostrando diferentes estilos e músicas. Também oferecemos uma playlist personalizada com samples das principais músicas do nosso repertório. Para eventos especiais, podemos agendar uma apresentação prévia ou videochamada para conhecer melhor nosso trabalho.",
    category: "Repertório e Estilo Musical",
    priority: "media",
    tags: ["samples", "vídeos", "instagram", "youtube", "apresentação prévia"]
  },
  {
    question: "A banda interage com o público durante o show?",
    answer: "Sim! Mariana Matheos é uma excelente apresentadora e interage naturalmente com o público. Fazemos dedicatórias especiais, contamos curiosidades sobre as músicas e criamos momentos espontâneos. Para casamentos, podemos incluir momentos especiais como dedicatórias aos noivos ou participação em brindis.",
    category: "Apresentação e Show",
    priority: "media",
    tags: ["interação", "apresentadora", "dedicatórias", "curiosidades", "brindis"]
  },
  {
    question: "O que diferencia a Mariana Matheos de outras bandas?",
    answer: "Nossa diferenciação está na combinação de técnica refinada, repertório cuidadosamente selecionado, interação calorosa com o público e profissionalismo absoluto. Mariana Matheos não apenas canta, mas conduz a experiência musical. Além disso, oferecemos consultoria musical personalizada e garantimos que cada evento seja único e memorável.",
    category: "Recomendações e Qualidade",
    priority: "media",
    tags: ["diferenciação", "técnica", "profissionalismo", "consultoria", "experiência única"]
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
        // Advanced FAQ page with rich schema
        schemas.push({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "name": "FAQ - Perguntas Frequentes sobre Mariana Matheos Jazz Band",
          "description": "Perguntas e respostas sobre contratação, repertório e serviços da Mariana Matheos Jazz Band para casamentos e eventos em Belo Horizonte",
          "url": "https://marianamatheos.com.br/faq",
          "inLanguage": "pt-BR",
          "dateModified": "2024-12-01",
          "author": {
            "@type": "Organization",
            "name": "Mariana Matheos Jazz Band"
          },
          "publisher": {
            "@type": "Organization",
            "name": "Mariana Matheos Jazz Band",
            "url": "https://marianamatheos.com.br"
          },
          "mainEntity": advancedFAQs.map(faq => ({
            "@type": "Question",
            "name": faq.question,
            "keywords": faq.tags ? faq.tags.join(", ") : undefined,
            "acceptedAnswer": faq.suggestedAnswer || {
              "@type": "Answer",
              "text": faq.answer,
              "author": {
                "@type": "Organization",
                "name": "Mariana Matheos Jazz Band"
              },
              "dateCreated": "2024-01-01",
              "upvoteCount": faq.priority === "alta" ? 90 : faq.priority === "media" ? 70 : 50
            },
            "answerCount": 1,
            "upvoteCount": faq.priority === "alta" ? 95 : faq.priority === "media" ? 75 : 55,
            "dateCreated": "2024-01-01"
          }))
        });

        // Add category-specific FAQ schemas
        const categories = ["Contratação e Investimento", "Repertório e Estilo Musical", "Estrutura Técnica e Logística", "Formação e Profissionais", "Tipos de Eventos", "Apresentação e Show", "Localização e Deslocamento", "Recomendações e Qualidade"];
        
        categories.forEach(category => {
          const categoryFAQs = advancedFAQs.filter(faq => faq.category === category);
          if (categoryFAQs.length > 0) {
            schemas.push({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "name": `FAQ - ${category}`,
              "description": `Perguntas frequentes sobre ${category.toLowerCase()} da Mariana Matheos Jazz Band`,
              "url": `https://marianamatheos.com.br/faq#${category.toLowerCase().replace(/\s+/g, '-')}`,
              "about": {
                "@type": "Thing",
                "name": category,
                "description": `Informações sobre ${category.toLowerCase()} da banda de jazz`
              },
              "mainEntity": categoryFAQs.map(faq => ({
                "@type": "Question",
                "name": faq.question,
                "keywords": faq.tags ? faq.tags.join(", ") : undefined,
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": faq.answer,
                  "author": {
                    "@type": "Organization",
                    "name": "Mariana Matheos Jazz Band"
                  },
                  "dateCreated": "2024-01-01",
                  "upvoteCount": faq.priority === "alta" ? 90 : faq.priority === "media" ? 70 : 50
                }
              }))
            });
          }
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