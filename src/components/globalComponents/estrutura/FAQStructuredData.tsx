// Arquivo: FAQStructuredData.tsx
import React from 'react';

const FAQStructuredData = () => (
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{
      __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "Quanto custa contratar a Banda Mariana Matheos para casamento ou evento?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "O valor varia conforme o tipo de evento, local e estrutura técnica necessária. Solicite um orçamento sem compromisso!"
            }
          },
          {
            "@type": "Question",
            "name": "A banda toca músicas escolhidas pelos noivos?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Sim! Os noivos podem escolher até 2 músicas que combinem com o estilo da banda. A curadoria é feita por Mariana Matheos para manter a harmonia artística."
            }
          },
          {
            "@type": "Question",
            "name": "A banda faz apresentações em eventos corporativos e particulares?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Sim! A banda se apresenta em eventos empresariais, festivais, jantares elegantes, bares de vinho e casas de jazz."
            }
          },
          {
            "@type": "Question",
            "name": "Quais estilos musicais fazem parte do repertório da banda?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "O repertório inclui Jazz Clássico, Soul, Blues, R&B e releituras vintage de pop contemporâneo, com influências da Era de Ouro do Jazz."
            }
          },
          {
            "@type": "Question",
            "name": "A banda se apresenta fora de Belo Horizonte?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Sim! A banda já se apresentou em cidades como Nova Lima, Matozinhos e Ribeirão das Neves. O deslocamento já está incluso no investimento para regiões próximas."
            }
          },
          {
            "@type": "Question",
            "name": "A banda leva os equipamentos necessários?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Sim. A banda leva instrumentos, microfones e pedalboards. O contratante fornece apenas o PA, energia elétrica e, em alguns casos, alimentação."
            }
          },
          {
            "@type": "Question",
            "name": "Quantas pessoas compõem a banda?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "A formação padrão inclui 5 músicos: vocal, piano, baixo/guitarra, bateria e trompete. Formatos reduzidos são possíveis mediante acordo."
            }
          },
          {
            "@type": "Question",
            "name": "Quanto tempo dura o show?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "A duração padrão é de 2 horas, com intervalo. Shows mais curtos também são possíveis sem pausa."
            }
          },
          {
            "@type": "Question",
            "name": "A banda possui boas recomendações?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Sim! A banda tem avaliação 5,0 estrelas no Google e é amplamente elogiada por clientes de casamentos, restaurantes e eventos corporativos."
            }
          }
        ]
      })
    }}
  />
);

export default FAQStructuredData;
