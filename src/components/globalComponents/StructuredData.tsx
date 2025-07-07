
import React from 'react';

const StructuredData = () => {
  const events = [
    {
      name: "Show de Jazz Soul no Chopperhead Garage",
      startDate: "2025-07-09T20:00:00-03:00",
      venue: "Chopperhead Garage",
      address: "Belo Horizonte, MG"
    },
    {
      name: "Apresentação Jazz Soul no The Bulltique Vino Bar",
      startDate: "2025-07-11T20:00:00-03:00",
      venue: "The Bulltique Vino Bar",
      address: "Belo Horizonte, MG"
    },
    {
      name: "Show ao Vivo no Soul Jazz Burguer",
      startDate: "2025-08-16T19:30:00-03:00",
      venue: "Soul Jazz Burguer",
      address: "Belo Horizonte, MG"
    }
  ];

  const eventsStructuredData = {
    "@context": "https://schema.org",
    "@graph": [
      // MusicGroup Schema
      {
        "@type": "MusicGroup",
        "name": "Mariana Matheos Jazz Band",
        "alternateName": "Banda Mariana Matheos",
        "url": "https://marianamatheos.com.br",
        "image": "https://marianamatheos.com.br/images/banda-blue-jazz-concurso.png",
        "description": "Banda de jazz, soul, blues e R&B especializada em música ao vivo para eventos especiais, casamentos e celebrações em Belo Horizonte e região.",
        "genre": ["Jazz", "Soul", "Blues", "R&B"],
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Belo Horizonte",
          "addressRegion": "MG",
          "addressCountry": "BR"
        },
        "areaServed": {
          "@type": "Place",
          "name": "Minas Gerais"
        },
        "contactPoint": {
          "@type": "ContactPoint",
          "telephone": "+55-31-99752-2127",
          "contactType": "booking"
        },
        "sameAs": [
          "https://instagram.com/marianamatheosoficial",
          "https://youtube.com/@marianamatheosoficial"
        ]
      },
      // Events Schema
      ...events.map(event => ({
        "@type": "Event",
        "name": event.name,
        "startDate": event.startDate,
        "eventStatus": "https://schema.org/EventScheduled",
        "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
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
          "name": "Mariana Matheos Jazz Band",
          "genre": ["Jazz", "Soul", "Blues", "R&B"]
        },
        "description": `Apresentação ao vivo da banda de jazz, soul, blues e R&B Mariana Matheos no ${event.venue}. Música sofisticada da Era de Ouro do Jazz.`,
        "image": "https://marianamatheos.com.br/images/banda-blue-jazz-concurso.png"
      })),
      // FAQ Schema
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "Quanto custa contratar uma banda de jazz para casamento?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "O valor para contratar uma banda de jazz para casamento pode variar de acordo com o local, duração do evento e estrutura técnica necessária. A Mariana Matheos Jazz Band oferece apresentações personalizadas, com formação flexível e repertório exclusivo, adaptado ao perfil do casal. Para receber um orçamento sob medida, entre em contato via WhatsApp."
            }
          },
          {
            "@type": "Question",
            "name": "A banda toca músicas personalizadas?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Sim! A banda adapta o repertório conforme o tipo de evento e o gosto dos anfitriões. É possível incluir músicas especiais para cerimônias, entradas, homenagens ou até surpresas. Também trabalhamos com releituras autênticas de clássicos do jazz, soul, blues e R&B."
            }
          },
          {
            "@type": "Question", 
            "name": "A banda se apresenta em eventos corporativos?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Sim, a Mariana Matheos Jazz Band é ideal para eventos corporativos que exigem sofisticação e impacto emocional. Atuamos em coquetéis, lançamentos, confraternizações e premiações, criando uma atmosfera elegante com música ao vivo de altíssimo nível."
            }
          },
          {
            "@type": "Question",
            "name": "Quais estilos musicais fazem parte do repertório?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "O repertório da banda inclui os grandes clássicos do Jazz, Soul, Blues e R&B, com influências de artistas como Ella Fitzgerald, Etta James, Billie Holiday, Nina Simone, Amy Winehouse e Adele. As interpretações são sofisticadas, nostálgicas e emocionantes."
            }
          }
        ]
      }
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(eventsStructuredData)
      }}
    />
  );
};

export default StructuredData;
