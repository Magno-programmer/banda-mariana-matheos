import React from 'react';

interface FAQStructuredDataProps {
  pageType: 'faq-index';
}

const FAQStructuredData: React.FC<FAQStructuredDataProps> = ({ pageType }) => {
  // Base organization schema
  const organizationSchema = {
    "@type": "MusicGroup",
    "name": "Mariana Matheos Jazz Band",
    "description": "Banda profissional de jazz especializada em eventos elegantes em Belo Horizonte",
    "url": "https://marianamatheos.com.br",
    "logo": {
      "@type": "ImageObject",
      "url": "https://marianamatheos.com.br/images/logo.png",
      "width": 600,
      "height": 200
    },
    "genre": ["Jazz", "Blues", "Soul", "R&B"],
    "foundingDate": "2020",
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
    "sameAs": [
      "https://www.instagram.com/marianamatheosjazz",
      "https://www.facebook.com/marianamatheosjazz"
    ]
  };

  // Advanced FAQ data with categories
  const advancedFAQs = [
    // CATEGORIA: CONTRATAÇÃO E INVESTIMENTO
    {
      categoria: "Contratação e Investimento",
      pergunta: "Quanto custa contratar a Mariana Matheos para casamento ou evento?",
      resposta: "O valor varia conforme o tipo de evento, local, duração, estrutura técnica necessária e formação da banda. Casamentos têm valores diferenciados de eventos corporativos. Eventos em cidades próximas a BH têm desconto no deslocamento. Solicite um orçamento personalizado sem compromisso!",
      prioridade: "alta",
      tags: ["preço", "orçamento", "casamento", "evento", "contratação"],
      categoria_schema: "pricing"
    },
    {
      categoria: "Contratação e Investimento",
      pergunta: "Qual é o prazo mínimo para contratar a banda?",
      resposta: "Recomendamos agendamento com pelo menos 30 dias de antecedência, especialmente para casamentos e eventos de fim de semana. Em alta temporada (outubro a março), sugerimos 60 dias. Para eventos corporativos urgentes, consulte nossa disponibilidade - às vezes conseguimos encaixar com menor prazo.",
      prioridade: "alta",
      tags: ["prazo", "antecedência", "agendamento", "temporada"],
      categoria_schema: "booking"
    },
    {
      categoria: "Contratação e Investimento",
      pergunta: "Como funciona o pagamento e existe contrato?",
      resposta: "Trabalhamos com contrato formal para garantir segurança de ambas as partes. O pagamento é dividido em duas parcelas: 50% na assinatura do contrato e 50% no dia do evento. Aceitamos transferência bancária, PIX e cartão de crédito (com acréscimo de taxas).",
      prioridade: "media",
      tags: ["pagamento", "contrato", "parcelas", "pix", "transferência"],
      categoria_schema: "payment"
    },
    {
      categoria: "Contratação e Investimento",
      pergunta: "O que está incluso no valor do investimento?",
      resposta: "O valor inclui: 5 músicos profissionais, todos os instrumentos da banda, microfones, pedalboards, 2 horas de apresentação, deslocamento para região metropolitana de BH, montagem e desmontagem dos equipamentos, e consultoria musical personalizada para escolha do repertório.",
      prioridade: "alta",
      tags: ["valor", "incluso", "músicos", "equipamentos", "deslocamento"],
      categoria_schema: "pricing"
    },

    // CATEGORIA: REPERTÓRIO E ESTILO MUSICAL
    {
      categoria: "Repertório e Estilo Musical",
      pergunta: "A banda toca músicas escolhidas pelos noivos ou contratantes?",
      resposta: "Sim! Para casamentos e eventos especiais, os noivos podem escolher até 3 músicas que façam sentido com o estilo da banda. A curadoria musical é feita pela própria diretora artística Mariana Matheos, garantindo harmonia e emoção em cada apresentação. Também oferecemos sugestões baseadas no tipo de evento e momento da celebração.",
      prioridade: "alta",
      tags: ["repertório", "personalização", "noivos", "curadoria", "Mariana Matheos"],
      categoria_schema: "customization"
    },
    {
      categoria: "Repertório e Estilo Musical",
      pergunta: "Quais estilos musicais fazem parte do repertório da banda?",
      resposta: "Tocamos uma mistura refinada de Jazz Clássico, Soul, Blues, R&B, Bossa Nova, baladas românticas e releituras vintage de pop contemporâneo. Inspirada na Era de Ouro do Jazz (1920–1960), nossa sonoridade é envolvente, elegante e cheia de identidade. Temos mais de 150 músicas no repertório, desde clássicos como 'Fly Me To The Moon' até sucessos modernos com arranjos jazzeados.",
      prioridade: "alta",
      tags: ["jazz", "soul", "blues", "bossa nova", "repertório", "150 músicas"],
      categoria_schema: "repertoire"
    },

    // CATEGORIA: ESTRUTURA TÉCNICA E LOGÍSTICA
    {
      categoria: "Estrutura Técnica e Logística",
      pergunta: "A banda leva os equipamentos necessários?",
      resposta: "A banda leva seus próprios instrumentos (piano elétrico, baixo, guitarra, bateria completa, trompete), microfones profissionais Shure, pedalboards e todos os cabos. O contratante é responsável apenas pela estrutura básica de som (PA compatível com o espaço), energia elétrica estável e, em alguns casos, alimentação dos músicos após o show.",
      prioridade: "alta",
      tags: ["equipamentos", "instrumentos", "microfones", "PA", "energia", "alimentação"],
      categoria_schema: "technical"
    },
    {
      categoria: "Estrutura Técnica e Logística",
      pergunta: "Qual o tamanho mínimo do palco ou espaço para apresentação?",
      resposta: "Precisamos de um espaço mínimo de 4m x 3m para acomodar os 5 músicos e instrumentos confortavelmente. O local deve ter piso nivelado, cobertura em caso de chuva e pontos de energia elétrica próximos. Para eventos ao ar livre, consideramos fatores como vento e temperatura. Fazemos visita técnica prévia se necessário.",
      prioridade: "media",
      tags: ["palco", "espaço", "4m x 3m", "cobertura", "energia", "visita técnica"],
      categoria_schema: "technical"
    },

    // CATEGORIA: FORMAÇÃO E PROFISSIONAIS
    {
      categoria: "Formação e Profissionais",
      pergunta: "Quantas pessoas compõem a banda?",
      resposta: "A formação padrão tem 5 músicos profissionais: vocal (Mariana Matheos), piano, baixo/guitarra, bateria e trompete — todos com formação musical sólida e carreira consolidada. Para eventos menores ou orçamentos específicos, oferecemos formações reduzidas (trio ou quarteto). Também podemos incluir músicos adicionais como saxofone ou violino mediante solicitação.",
      prioridade: "alta",
      tags: ["5 músicos", "formação", "trio", "quarteto", "saxofone", "violino"],
      categoria_schema: "band_formation"
    },
    {
      categoria: "Formação e Profissionais",
      pergunta: "Qual é a formação musical dos integrantes?",
      resposta: "Todos os músicos têm formação superior em música ou extensa carreira profissional. Mariana Matheos (vocal) é formada em Canto Popular e tem mais de 10 anos de carreira. Nossos instrumentistas tocam em orquestras, bandas de renome e têm experiência em grandes eventos. A qualidade técnica é nossa prioridade.",
      prioridade: "media",
      tags: ["formação superior", "carreira profissional", "10 anos", "orquestras", "qualidade técnica"],
      categoria_schema: "qualifications"
    },

    // CATEGORIA: TIPOS DE EVENTOS
    {
      categoria: "Tipos de Eventos",
      pergunta: "A banda faz apresentações em eventos corporativos e particulares?",
      resposta: "Absolutamente! Temos experiência em eventos empresariais, jantares elegantes, festivais, bares de vinho, casas de jazz, formaturas, aniversários de 50 anos, vernissages e lançamentos de produtos. Adaptamos o repertório, figurino e energia conforme o clima e perfil do evento. Cada apresentação é única e personalizada.",
      prioridade: "alta",
      tags: ["corporativo", "empresarial", "festivais", "aniversários", "vernissages", "lançamentos"],
      categoria_schema: "event_types"
    },
    {
      categoria: "Tipos de Eventos",
      pergunta: "Vocês tocam em casamentos? Como funciona?",
      resposta: "Casamentos são nossa especialidade! Podemos tocar durante o coquetel, jantar e/ou festa. Oferecemos repertório específico para cada momento: jazz suave para coquetel, baladas românticas para jantar e música mais animada para dança. Trabalhamos em sincronia com cerimonialistas e fotógrafos para criar momentos únicos.",
      prioridade: "alta",
      tags: ["casamentos", "coquetel", "jantar", "festa", "cerimonialistas", "fotógrafos"],
      categoria_schema: "weddings"
    },

    // CATEGORIA: APRESENTAÇÃO E SHOW
    {
      categoria: "Apresentação e Show",
      pergunta: "Quanto tempo dura o show?",
      resposta: "A duração padrão é de 2 horas, divididas em dois blocos de 50 minutos com um intervalo de 20 minutos. Para eventos mais longos, podemos estender até 3 horas. Para eventos mais curtos (coquetel, por exemplo), oferecemos apresentações de 1 hora direto, sem pausa. Tudo é combinado previamente.",
      prioridade: "alta",
      tags: ["2 horas", "50 minutos", "intervalo", "3 horas", "1 hora", "flexibilidade"],
      categoria_schema: "duration"
    },
    {
      categoria: "Apresentação e Show",
      pergunta: "A banda interage com o público durante o show?",
      resposta: "Sim! Mariana Matheos é uma excelente apresentadora e interage naturalmente com o público. Fazemos dedicatórias especiais, contamos curiosidades sobre as músicas e criamos momentos espontâneos. Para casamentos, podemos incluir momentos especiais como dedicatórias aos noivos ou participação em brindis.",
      prioridade: "media",
      tags: ["interação", "apresentadora", "dedicatórias", "curiosidades", "brindis"],
      categoria_schema: "interaction"
    },

    // CATEGORIA: LOCALIZAÇÃO E DESLOCAMENTO
    {
      categoria: "Localização e Deslocamento",
      pergunta: "A banda se apresenta fora de Belo Horizonte?",
      resposta: "Sim! Já nos apresentamos em Nova Lima, Matozinhos, Ribeirão das Neves, Contagem, Betim, Ouro Preto, Tiradentes, Brumadinho e outras cidades de Minas Gerais. Para região metropolitana de BH, o deslocamento está incluso. Para cidades mais distantes, cobramos taxa de deslocamento e, em alguns casos, hospedagem.",
      prioridade: "alta",
      tags: ["fora de BH", "Nova Lima", "Ouro Preto", "Tiradentes", "deslocamento", "hospedagem"],
      categoria_schema: "location"
    },

    // CATEGORIA: RECOMENDAÇÕES E QUALIDADE
    {
      categoria: "Recomendações e Qualidade",
      pergunta: "A banda possui boas recomendações?",
      resposta: "Sim! Temos avaliação 5,0 estrelas no Google com mais de 50 avaliações, centenas de depoimentos positivos no Instagram e referências de grandes eventos. Clientes nos recomendam frequentemente para amigos e familiares. Nossa taxa de satisfação é superior a 98% e muitos clientes nos contratam novamente.",
      prioridade: "alta",
      tags: ["5 estrelas", "50 avaliações", "instagram", "98% satisfação", "recontratação"],
      categoria_schema: "reviews"
    },
    {
      categoria: "Recomendações e Qualidade",
      pergunta: "O que diferencia a Mariana Matheos de outras bandas?",
      resposta: "Nossa diferenciação está na combinação de técnica refinada, repertório cuidadosamente selecionado, interação calorosa com o público e profissionalismo absoluto. Mariana Matheos não apenas canta, mas conduz a experiência musical. Além disso, oferecemos consultoria musical personalizada e garantimos que cada evento seja único e memorável.",
      prioridade: "media",
      tags: ["diferenciação", "técnica", "profissionalismo", "consultoria", "experiência única"],
      categoria_schema: "differentiation"
    }
  ];

  // FAQ page schemas
  if (pageType === 'faq-index') {
    const faqPageSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "name": "FAQ - Perguntas Frequentes | Mariana Matheos Jazz Band",
      "description": "Dúvidas sobre contratação, repertório e serviços da Mariana Matheos Jazz Band. Respostas às perguntas mais comuns dos clientes.",
      "url": "https://marianamatheos.com.br/faq",
      "inLanguage": "pt-BR",
      "mainEntity": advancedFAQs.map(faq => ({
        "@type": "Question",
        "name": faq.pergunta,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.resposta,
          "author": {
            "@type": "Organization",
            "name": "Mariana Matheos Jazz Band"
          }
        },
        "about": {
          "@type": "Thing",
          "name": faq.categoria
        },
        "keywords": faq.tags.join(", "),
        "dateCreated": "2024-01-01",
        "dateModified": "2024-01-01",
        "inLanguage": "pt-BR"
      })),
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
            "name": "FAQ",
            "item": "https://marianamatheos.com.br/faq"
          }
        ]
      },
      "publisher": organizationSchema,
      "isPartOf": {
        "@type": "WebSite",
        "name": "Mariana Matheos Jazz Band",
        "url": "https://marianamatheos.com.br"
      }
    };

    // Category-specific FAQ schemas
    const categoriesSchemas = [...new Set(advancedFAQs.map(faq => faq.categoria))].map(categoria => {
      const categoryFAQs = advancedFAQs.filter(faq => faq.categoria === categoria);
      
      return {
        "@context": "https://schema.org",
        "@type": "AboutPage",
        "name": `FAQ: ${categoria} - Mariana Matheos Jazz Band`,
        "description": `Perguntas frequentes sobre ${categoria.toLowerCase()} da banda Mariana Matheos Jazz`,
        "url": `https://marianamatheos.com.br/faq#${categoria.toLowerCase().replace(/\s+/g, '-')}`,
        "inLanguage": "pt-BR",
        "mainEntity": {
          "@type": "ItemList",
          "name": `Perguntas sobre ${categoria}`,
          "numberOfItems": categoryFAQs.length,
          "itemListElement": categoryFAQs.map((faq, index) => ({
            "@type": "ListItem",
            "position": index + 1,
            "item": {
              "@type": "Question",
              "name": faq.pergunta,
              "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.resposta
              },
              "keywords": faq.tags.join(", "),
              "about": {
                "@type": "Thing",
                "name": faq.categoria_schema
              }
            }
          }))
        },
        "about": {
          "@type": "Thing",
          "name": categoria,
          "description": `Informações sobre ${categoria.toLowerCase()} relacionadas aos serviços da banda Mariana Matheos Jazz`
        },
        "publisher": organizationSchema
      };
    });

    const websiteSchema = {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "FAQ Mariana Matheos Jazz Band",
      "url": "https://marianamatheos.com.br/faq",
      "description": "Página de perguntas frequentes sobre os serviços da banda Mariana Matheos Jazz",
      "inLanguage": "pt-BR",
      "publisher": organizationSchema,
      "potentialAction": {
        "@type": "SearchAction",
        "target": {
          "@type": "EntryPoint",
          "urlTemplate": "https://marianamatheos.com.br/faq?search={search_term_string}"
        },
        "query-input": "required name=search_term_string"
      }
    };

    const organizationFAQSchema = {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "Mariana Matheos Jazz Band",
      "description": "Banda profissional de jazz especializada em eventos elegantes",
      "url": "https://marianamatheos.com.br",
      "logo": organizationSchema.logo,
      "sameAs": organizationSchema.sameAs,
      "foundingDate": organizationSchema.foundingDate,
      "genre": organizationSchema.genre,
      "knowsAbout": [
        "Jazz Music",
        "Blues Music", 
        "Soul Music",
        "Wedding Entertainment",
        "Corporate Events",
        "Musical Performances",
        "Event Planning"
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
              "description": "Show completo de jazz para cerimônias de casamento"
            }
          },
          {
            "@type": "Offer", 
            "itemOffered": {
              "@type": "Service",
              "name": "Eventos Corporativos",
              "description": "Apresentações musicais para eventos empresariais"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service", 
              "name": "Eventos Particulares",
              "description": "Shows personalizados para festivais e comemorações"
            }
          }
        ]
      }
    };

    return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(faqPageSchema)
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
            __html: JSON.stringify(organizationFAQSchema)
          }}
        />
        {categoriesSchemas.map((schema, index) => (
          <script
            key={`category-${index}`}
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(schema)
            }}
          />
        ))}
      </>
    );
  }

  return null;
};

export default FAQStructuredData;