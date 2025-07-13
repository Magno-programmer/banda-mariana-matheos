// Arquivo: ContactStructuredData.tsx
import React from 'react';

const ContactStructuredData = () => (
  <script type="application/ld+json" dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "name": "Mariana Matheos",
      "telephone": "+55-31-99752-2127",
      "email": "contato@marianamatheos.com.br",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Belo Horizonte",
        "addressRegion": "MG",
        "addressCountry": "BR"
      },
      "url": "https://marianamatheos.com.br/contato"
    })
  }} />
);

export default ContactStructuredData;