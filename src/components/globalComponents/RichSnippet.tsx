import React from 'react';

interface RichSnippetProps {
  type: 'LocalBusiness' | 'MusicGroup' | 'Event' | 'Service';
  data: any;
}

const RichSnippet: React.FC<RichSnippetProps> = ({ type, data }) => {
  const generateSchema = () => {
    const baseSchema = {
      '@context': 'https://schema.org',
      '@type': type,
      ...data
    };

    switch (type) {
      case 'MusicGroup':
        return {
          ...baseSchema,
          '@type': 'MusicGroup',
          name: 'Banda de Jazz Mariana Matheos',
          description: 'Banda profissional de jazz, soul, blues e R&B para eventos sofisticados em Minas Gerais',
          genre: ['Jazz', 'Soul', 'Blues', 'R&B'],
          foundingDate: '2010',
          foundingLocation: {
            '@type': 'Place',
            name: 'Minas Gerais, Brasil'
          },
          memberOf: {
            '@type': 'Person',
            name: 'Mariana Matheos',
            jobTitle: 'Cantora e Líder da Banda'
          },
          url: 'https://marianamatheosband.com',
          sameAs: [
            'https://instagram.com/marianamatheosoficial'
          ],
          offers: {
            '@type': 'Offer',
            name: 'Apresentação Musical ao Vivo',
            description: 'Show de jazz ao vivo para casamentos e eventos',
            priceRange: '$$$',
            availability: 'https://schema.org/InStock'
          },
          areaServed: {
            '@type': 'Place',
            name: 'Minas Gerais e região'
          }
        };

      case 'LocalBusiness':
        return {
          ...baseSchema,
          '@type': 'LocalBusiness',
          name: 'Banda de Jazz Mariana Matheos',
          description: 'Banda profissional de jazz para eventos elegantes e sofisticados',
          telephone: '+5531997522127',
          priceRange: '$$$',
          paymentAccepted: 'Cartão, PIX, Transferência',
          currenciesAccepted: 'BRL',
          areaServed: {
            '@type': 'Place',
            name: 'Minas Gerais, Brasil'
          },
          serviceType: 'Música ao Vivo',
          hasOfferCatalog: {
            '@type': 'OfferCatalog',
            name: 'Serviços Musicais',
            itemListElement: [
              {
                '@type': 'Offer',
                name: 'Show para Casamento',
                description: 'Apresentação musical completa para cerimônias e recepções'
              },
              {
                '@type': 'Offer', 
                name: 'Evento Corporativo',
                description: 'Música ambiente e entretenimento para eventos empresariais'
              }
            ]
          }
        };

      case 'Service':
        return {
          ...baseSchema,
          '@type': 'Service',
          name: 'Apresentação Musical ao Vivo',
          description: 'Serviço profissional de música jazz ao vivo para eventos especiais',
          provider: {
            '@type': 'MusicGroup',
            name: 'Banda de Jazz Mariana Matheos'
          },
          serviceType: 'Entretenimento Musical',
          areaServed: 'Minas Gerais',
          hasOfferCatalog: {
            '@type': 'OfferCatalog',
            name: 'Tipos de Apresentação',
            itemListElement: [
              {
                '@type': 'Offer',
                name: 'Jazz Clássico',
                category: 'Música'
              },
              {
                '@type': 'Offer',
                name: 'Soul e R&B',
                category: 'Música'
              }
            ]
          }
        };

      default:
        return baseSchema;
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(generateSchema()) }}
    />
  );
};

export default RichSnippet;