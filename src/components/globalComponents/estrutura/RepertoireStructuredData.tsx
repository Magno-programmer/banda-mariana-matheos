import React from 'react';

const RepertoireStructuredData = () => (
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{
      __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "CreativeWorkSeries",
        "name": "Estilo Musical da Mariana Matheos",
        "url": "https://marianamatheos.com.br/repertorio",
        "description": "A banda interpreta clássicos do jazz, soul, blues e R&B com arranjos fiéis e estética da Era de Ouro. Artistas homenageados incluem Billie Holiday, Amy Winehouse, Nina Simone, entre outros.",
        "genre": ["Jazz", "Soul", "Blues", "R&B"],
        "creator": {
          "@type": "MusicGroup",
          "name": "Banda de Jazz Mariana Matheos"
        }
      })
    }}
  />
);

export default RepertoireStructuredData;
