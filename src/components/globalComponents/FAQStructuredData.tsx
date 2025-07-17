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
      pergunta: "Como funciona o processo de contratação da banda?",
      resposta: "A contratação é formalizada com um contrato claro e transparente. O processo inclui briefing inicial com os noivos ou contratante, definição do repertório personalizado e organização logística com antecedência. É possível reservar datas com antecedência e personalizar diversos aspectos da apresentação.",
      prioridade: "alta",
      tags: ["contrato", "reserva", "briefing", "organização", "personalização"],
      categoria_schema: "booking"
    },
    {
      categoria: "Contratação e Investimento",
      pergunta: "O que está incluso na contratação da banda?",
      resposta: "A banda é formada por cinco músicos profissionais e leva todos os seus instrumentos e equipamentos essenciais, incluindo microfones, cabos e pedalboards. A equipe oferece curadoria musical exclusiva para o evento e cuida de toda a montagem e desmontagem da estrutura de palco que lhe compete.",
      prioridade: "alta",
      tags: ["músicos", "equipamentos", "estrutura", "curadoria", "completo"],
      categoria_schema: "pricing"
    },

    // CATEGORIA: REPERTÓRIO E ESTILO MUSICAL
    {
      categoria: "Repertório e Estilo Musical",
      pergunta: "Que estilos musicais fazem parte do repertório da banda?",
      resposta: "A banda é especializada em Jazz Clássico, Soul, Blues, R&B e também executa baladas, swings, rockabilly e releituras vintage de músicas pop. Com forte inspiração na Era de Ouro do Jazz, oferece um repertório elegante e envolvente, adaptado ao perfil do evento.",
      prioridade: "alta",
      tags: ["jazz", "soul", "blues", "r&b", "releituras", "vintage"],
      categoria_schema: "repertoire"
    },
    {
      categoria: "Repertório e Estilo Musical",
      pergunta: "Posso sugerir músicas para o repertório?",
      resposta: "Sim! A escolha de músicas personalizadas faz parte da experiência oferecida. A curadoria é realizada pela diretora artística Mariana Matheos, garantindo que as escolhas estejam em harmonia com a proposta sonora da banda. Os noivos ou contratantes podem indicar músicas com significado especial.",
      prioridade: "alta",
      tags: ["personalização", "curadoria", "repertório especial", "Mariana Matheos"],
      categoria_schema: "customization"
    },

    // CATEGORIA: ESTRUTURA TÉCNICA E LOGÍSTICA
    {
      categoria: "Estrutura Técnica e Logística",
      pergunta: "Quais equipamentos a banda leva para os eventos?",
      resposta: "A banda leva seus próprios instrumentos (piano, guitarra, baixo, bateria, trompete), microfones, pedalboards e cabos. O contratante deve fornecer estrutura de som compatível com o porte do evento (PA), pontos de energia estabilizada e, em eventos mais longos, alimentação para os músicos.",
      prioridade: "alta",
      tags: ["instrumentos", "estrutura", "PA", "energia", "alimentação"],
      categoria_schema: "technical"
    },
    {
      categoria: "Estrutura Técnica e Logística",
      pergunta: "Existe algum requisito técnico para o espaço do evento?",
      resposta: "Sim. O local deve ter pelo menos 4x3 metros de área plana para acomodar os cinco músicos. Para eventos externos, é importante contar com cobertura contra chuva e pontos de energia próximos ao palco. O rider técnico pode ser fornecido com antecedência para o fornecedor de som.",
      prioridade: "media",
      tags: ["palco", "dimensão", "energia", "rider técnico", "evento externo"],
      categoria_schema: "technical"
    },

    // CATEGORIA: FORMAÇÃO E PROFISSIONAIS
    {
      categoria: "Formação e Profissionais",
      pergunta: "Quem são os integrantes da banda?",
      resposta: "A banda é composta por: Mariana Matheos (voz e direção artística), Carlos Magno (piano), Tarciso Júnior (baixo e guitarra), Rubens Kalil (bateria) e Charles Amaral (trompete). Todos têm longa trajetória profissional e atuam em shows, festivais e eventos de alto padrão.",
      prioridade: "alta",
      tags: ["integrantes", "formação", "trajetória", "profissionais"],
      categoria_schema: "band_formation"
    },
    {
      categoria: "Formação e Profissionais",
      pergunta: "É possível contratar formações reduzidas?",
      resposta: "Sim. A formação padrão é de 5 músicos, mas a banda pode se adaptar a trios ou quartetos para eventos mais íntimos. Também é possível incluir músicos adicionais como saxofonistas ou violinistas mediante solicitação antecipada.",
      prioridade: "media",
      tags: ["trio", "quarteto", "adicional", "flexibilidade", "eventos menores"],
      categoria_schema: "customization"
    },

    // CATEGORIA: TIPOS DE EVENTOS
    {
      categoria: "Tipos de Eventos",
      pergunta: "A banda toca em eventos além de casamentos?",
      resposta: "Sim. Além de casamentos, a banda se apresenta em eventos corporativos, festivais de música, bares, casas de vinho, aniversários especiais, vernissages e eventos culturais. O repertório e a performance são adaptados para cada contexto.",
      prioridade: "alta",
      tags: ["corporativo", "festival", "aniversário", "cultural", "versatilidade"],
      categoria_schema: "event_types"
    },

    // CATEGORIA: APRESENTAÇÃO E SHOW
    {
      categoria: "Apresentação e Show",
      pergunta: "Quanto tempo dura a apresentação da banda?",
      resposta: "A apresentação padrão tem cerca de 2 horas, podendo ser dividida em dois blocos com intervalo. Para eventos mais curtos ou específicos, a banda adapta o tempo de show conforme o cronograma do contratante.",
      prioridade: "alta",
      tags: ["duração", "show", "2 horas", "intervalo", "flexível"],
      categoria_schema: "duration"
    },
    {
      categoria: "Apresentação e Show",
      pergunta: "Como é a interação da banda com o público?",
      resposta: "A banda valoriza a conexão com o público. A vocalista Mariana Matheos tem carisma, experiência e costuma apresentar as músicas, interagir com os convidados e criar momentos especiais durante o show, com naturalidade e elegância.",
      prioridade: "media",
      tags: ["interação", "apresentação", "público", "carisma"],
      categoria_schema: "interaction"
    },

    // CATEGORIA: LOCALIZAÇÃO E DESLOCAMENTO
    {
      categoria: "Localização e Deslocamento",
      pergunta: "A banda atua fora de Belo Horizonte?",
      resposta: "Sim. A banda já se apresentou em diversas cidades de Minas Gerais, como Nova Lima, Matozinhos, Tiradentes, Brumadinho e outras. Para regiões metropolitanas, o deslocamento costuma ser mais simples. Em eventos mais distantes, pode haver necessidade de logística adicional.",
      prioridade: "alta",
      tags: ["deslocamento", "fora de BH", "região metropolitana", "logística"],
      categoria_schema: "location"
    },

    // CATEGORIA: RECOMENDAÇÕES E QUALIDADE
    {
      categoria: "Recomendações e Qualidade",
      pergunta: "A banda é bem avaliada pelos clientes?",
      resposta: "Sim! A banda Mariana Matheos possui nota 5,0 em todas as avaliações no Google, além de dezenas de depoimentos positivos no Instagram e canais sociais. Muitos clientes contratam a banda novamente e indicam para familiares e amigos.",
      prioridade: "alta",
      tags: ["avaliações", "5 estrelas", "depoimentos", "Google", "recontratação"],
      categoria_schema: "reviews"
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