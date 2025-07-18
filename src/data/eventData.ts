/**
 * Dynamic Event Data for the Mariana Matheos Jazz Band
 * Used for both UI display and structured data generation
 */

export interface EventLocation {
  name: string;
  address: {
    streetAddress: string;
    addressLocality: string;
    addressRegion: string;
    postalCode: string;
    addressCountry: string;
  };
  geo?: {
    latitude: number;
    longitude: number;
  };
}

export interface EventOffer {
  price: string;
  priceCurrency: string;
  availability: 'InStock' | 'SoldOut' | 'PreOrder';
  validFrom: string;
  url: string;
}

export interface PerformanceEvent {
  id: string;
  name: string;
  shortDate: string; // DD/MM format for UI display
  day: string; // Day abbreviation (e.g., "Sex", "Sáb")
  time: string; // HH:MM format
  venue: string;
  durationHours: number;
  location: EventLocation;
  offer: EventOffer;
  image: string;
  description: string;
  performer: {
    name: string;
  };
  eventStatus: 'EventScheduled' | 'EventPostponed' | 'EventCancelled' | 'EventRescheduled';
  eventAttendanceMode: 'OfflineEventAttendanceMode' | 'OnlineEventAttendanceMode' | 'MixedEventAttendanceMode';
}

// Venues data with full information for structured data
const venues: Record<string, EventLocation> = {
  "The Bulltique Vino Bar": {
    name: "The Bulltique Vino Bar",
    address: {
      streetAddress: "Rua Bernardo Guimarães, 123",
      addressLocality: "Belo Horizonte",
      addressRegion: "MG",
      postalCode: "30140-080",
      addressCountry: "BR"
    },
    geo: {
      latitude: -19.932308,
      longitude: -43.937141
    }
  },
  "Soul Jazz Burguer": {
    name: "Soul Jazz Burguer",
    address: {
      streetAddress: "Av. Fleming, 456",
      addressLocality: "Belo Horizonte",
      addressRegion: "MG",
      postalCode: "30310-300",
      addressCountry: "BR"
    },
    geo: {
      latitude: -19.947876,
      longitude: -43.927543
    }
  },
  "Jazz Café BH": {
    name: "Jazz Café BH",
    address: {
      streetAddress: "Rua Pernambuco, 789",
      addressLocality: "Belo Horizonte",
      addressRegion: "MG",
      postalCode: "30130-150",
      addressCountry: "BR"
    },
    geo: {
      latitude: -19.939227,
      longitude: -43.941876
    }
  }
};

// Complete events data
export const eventsData: PerformanceEvent[] = [
  {
    id: "event-2025-08-08",
    name: "Show da Mariana Matheos no The Bulltique Vino Bar",
    shortDate: "08/08",
    day: "Sex",
    time: "20:00",
    venue: "The Bulltique Vino Bar",
    durationHours: 2,
    location: venues["The Bulltique Vino Bar"],
    offer: {
      price: "25.00",
      priceCurrency: "BRL",
      availability: "InStock",
      validFrom: "2025-07-01T00:00:00-03:00",
      url: "https://marianamatheos.com.br/agenda"
    },
    image: "https://marianamatheos.com.br/images/banda.avif",
    description: "Uma noite especial de jazz com a Mariana Matheos e sua banda, apresentando clássicos de Billie Holiday e Amy Winehouse.",
    performer: {
      name: "Mariana Matheos Jazz Band"
    },
    eventStatus: "EventScheduled",
    eventAttendanceMode: "OfflineEventAttendanceMode"
  },
  {
    id: "event-2025-08-16",
    name: "Show da Mariana Matheos no Soul Jazz Burguer",
    shortDate: "16/08",
    day: "Sáb",
    time: "19:30",
    venue: "Soul Jazz Burguer",
    durationHours: 2,
    location: venues["Soul Jazz Burguer"],
    offer: {
      price: "20.00",
      priceCurrency: "BRL",
      availability: "InStock",
      validFrom: "2025-07-01T00:00:00-03:00",
      url: "https://marianamatheos.com.br/agenda"
    },
    image: "https://marianamatheos.com.br/images/banda.avif",
    description: "Show de jazz ao vivo em ambiente intimista no Soul Jazz Burguer, com os grandes sucessos da era do jazz.",
    performer: {
      name: "Mariana Matheos Jazz Band"
    },
    eventStatus: "EventScheduled",
    eventAttendanceMode: "OfflineEventAttendanceMode"
  },
  {
    id: "event-2025-09-12",
    name: "Show da Mariana Matheos no The Bulltique Vino Bar",
    shortDate: "12/09",
    day: "Sex",
    time: "20:00",
    venue: "The Bulltique Vino Bar",
    durationHours: 2,
    location: venues["The Bulltique Vino Bar"],
    offer: {
      price: "25.00",
      priceCurrency: "BRL",
      availability: "InStock",
      validFrom: "2025-07-01T00:00:00-03:00",
      url: "https://marianamatheos.com.br/agenda"
    },
    image: "https://marianamatheos.com.br/images/banda.avif",
    description: "Apresentação especial comemorando o legado de Ella Fitzgerald e Frank Sinatra, numa noite inesquecível de jazz clássico.",
    performer: {
      name: "Mariana Matheos Jazz Band"
    },
    eventStatus: "EventScheduled",
    eventAttendanceMode: "OfflineEventAttendanceMode"
  }
];

// Service offerings with full pricing information
export interface ServiceOffering {
  id: string;
  name: string;
  description: string;
  serviceType: string;
  serviceOutput: string;
  pricing: {
    price: string;
    priceCurrency: string;
    minPrice: string;
    maxPrice: string;
    validFrom: string;
    validThrough: string;
  };
  image?: string;
}

export const serviceOfferings: ServiceOffering[] = [
  {
    id: "service-wedding",
    name: "Apresentação Musical para Casamentos",
    description: "Show completo de jazz para cerimônias e recepções de casamento",
    serviceType: "Live Music Entertainment",
    serviceOutput: "Música ao vivo para cerimônia e recepção",
    pricing: {
      price: "4000.00",
      priceCurrency: "BRL",
      minPrice: "3000.00",
      maxPrice: "6000.00",
      validFrom: "2024-01-01",
      validThrough: "2025-12-31"
    },
    image: "https://marianamatheos.com.br//images/casamento-jazz-band.avif"
  },
  {
    id: "service-corporate",
    name: "Eventos Corporativos",
    description: "Apresentações musicais para eventos empresariais",
    serviceType: "Corporate Entertainment",
    serviceOutput: "Música ao vivo para eventos corporativos",
    pricing: {
      price: "3500.00",
      priceCurrency: "BRL",
      minPrice: "3000.00",
      maxPrice: "5000.00",
      validFrom: "2024-01-01",
      validThrough: "2025-12-31"
    },
    image: "https://marianamatheos.com.br//images/eventos-corporativos.avif"
  },
  {
    id: "service-private",
    name: "Eventos Particulares",
    description: "Shows personalizados para festivais e comemorações",
    serviceType: "Private Event Entertainment",
    serviceOutput: "Música ao vivo para eventos particulares",
    pricing: {
      price: "3500.00",
      priceCurrency: "BRL",
      minPrice: "2500.00",
      maxPrice: "5000.00",
      validFrom: "2024-01-01",
      validThrough: "2025-12-31"
    },
    image: "https://marianamatheos.com.br/images/jazz-standard.avif"
  }
];