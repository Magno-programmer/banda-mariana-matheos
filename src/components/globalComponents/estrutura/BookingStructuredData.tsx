// BookingStructuredData.tsx
import React from 'react';

const BookingStructuredData = () => {
  const events = [
    {
      name: "Show da Mariana Matheos no The Bulltique Vino Bar",
      startDate: "2025-08-08T20:00:00-03:00",
      endDate: "2025-08-08T22:00:00-03:00",
      venue: "The Bulltique Vino Bar"
    },
    {
      name: "Show da Mariana Matheos no Soul Jazz Burguer",
      startDate: "2025-08-16T19:30:00-03:00",
      endDate: "2025-08-16T21:30:00-03:00",
      venue: "Soul Jazz Burguer"
    },
    {
      name: "Show da Mariana Matheos no The Bulltique Vino Bar",
      startDate: "2025-09-12T20:00:00-03:00",
      endDate: "2025-09-12T22:00:00-03:00",
      venue: "The Bulltique Vino Bar"
    }
  ];

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": events.map((event) => ({
      "@type": "Event",
      "name": event.name,
      "startDate": event.startDate,
      "endDate": event.endDate,
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
      "organizer": {
        "@type": "Organization",
        "name": "Mariana Matheos",
        "url": "https://marianamatheos.com.br"
      },
      "offers": {
        "@type": "Offer",
        "price": "0.00",
        "priceCurrency": "BRL",
        "availability": "https://schema.org/InStock",
        "url": "https://marianamatheos.com.br/agenda"
      },
      "description": `Apresentação ao vivo da banda de jazz, soul, blues e R&B Mariana Matheos no ${event.venue}.`,
      "image": "https://marianamatheos.com.br/images/banda-blue-jazz-concurso.png"
    }))
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData)
      }}
    />
  );
};

export default BookingStructuredData;
