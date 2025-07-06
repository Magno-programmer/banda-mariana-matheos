
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
    "@graph": events.map(event => ({
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
    }))
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
