
import React from 'react';

const TestimonialsStructuredData = () => (
  <script type="application/ld+json" dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "Banda Mariana Matheos",
      "url": "https://marianamatheos.com.br/depoimentos",
      "sameAs": [
        "https://instagram.com/marianamatheosoficial",
        "https://youtube.com/@marianamatheosoficial"
      ],
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
          "reviewBody": "Excelente cantora!! Vale a pena assistir o seu show!!"
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
          "reviewBody": "Excelente cantora, uma voz maravilhosa e canta todo tipo de música... super animada e simpática"
        },
        {
          "@type": "Review",
          "author": {
            "@type": "Person",
            "name": "Vanessa Guedes"
          },
          "reviewRating": {
            "@type": "Rating",
            "ratingValue": "5",
            "bestRating": "5"
          },
          "reviewBody": "Cantora sensacional! Deus abençoe nesta jornada... Emoção e carisma!"
        }
      ],
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "5",
        "bestRating": "5",
        "worstRating": "5",
        "ratingCount": "12"
      }
    })
  }} />
);

export default TestimonialsStructuredData;
