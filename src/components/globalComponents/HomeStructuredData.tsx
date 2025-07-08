// Arquivo: HomeStructuredData.tsx
import React from 'react';

const HomeStructuredData = () => (
  <script type="application/ld+json" dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "Banda Mariana Matheos",
      "url": "https://marianamatheos.com.br/inicio",
      "logo": "https://marianamatheos.com.br/images/banda-blue-jazz-concurso.png",
      "sameAs": [
        "https://instagram.com/marianamatheosoficial",
        "https://youtube.com/@marianamatheosoficial"
      ],
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+55-31-99752-2127",
        "contactType": "Customer Service"
      }
    })
  }} />
);

export default HomeStructuredData;