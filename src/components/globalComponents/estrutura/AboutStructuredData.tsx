// Arquivo: AboutStructuredData.tsx
import React from 'react';

const AboutStructuredData = () => (
  <script type="application/ld+json" dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "MusicGroup",
      "name": "Mariana Matheos",
      "genre": ["Jazz", "Soul", "Blues", "R&B"],
      "description": "Grupo musical especializado em apresentações ao vivo com repertório inspirado na Era de Ouro do Jazz.",
      "url": "https://marianamatheos.com.br/sobre",
      "image": "https://marianamatheos.com.br/images/cantora.png",
      "member": [{
        "@type": "Person",
        "name": "Mariana Matheos",
        "jobTitle": "Vocalista"
      }]
    })
  }} />
);

export default AboutStructuredData;