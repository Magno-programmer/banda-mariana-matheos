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
  
//=================================================================================================
//SHOW AGOSTO

//=================================================================================================


//=================================================================================================
//SHOW SETEMBRO
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
      price: "20.00",
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
  },
  {
    id: "event-2025-09-13",
    name: "Show da Mariana Matheos no Restaurante Le Pontes",
    shortDate: "13/09",
    day: "Sab",
    time: "13:30",
    venue: "Restaurante Le Pontes",
    durationHours: 2,
    location: venues["Restaurante Le Pontes"],
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
  },
  {
    id: "event-2025-09-20",
    name: "Show da Mariana Matheos Casamento Civil Evento Particular",
    shortDate: "20/09",
    day: "Sab",
    time: "12:00",
    venue: "Casamento Civil Evento Particular",
    durationHours: 2,
    location: venues["Casamento Civil Evento Particular"],
    offer: {
      price: "00.00",
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
  },

//=================================================================================================

//=================================================================================================
//SHOW OUTUBRO
  {
    id: "event-2025-10-10",
    name: "Show da Mariana Matheos no The Bulltique Vino Bar",
    shortDate: "10/10",
    day: "Sex",
    time: "20:00",
    venue: "The Bulltique Vino Bar",
    durationHours: 2,
    location: venues["The Bulltique Vino Bar"],
    offer: {
      price: "20.00",
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
  },
  {
    id: "event-2025-10-11",
    name: "Show da Mariana Matheos no Restaurante Le Pontes",
    shortDate: "11/10",
    day: "Sab",
    time: "13:30",
    venue: "Restaurante Le Pontes",
    durationHours: 2,
    location: venues["Restaurante Le Pontes"],
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
  },
//=================================================================================================


//=================================================================================================
//SHOW NOVEMBRO
  {
    id: "event-2025-11-14",
    name: "Show da Mariana Matheos no The Bulltique Vino Bar",
    shortDate: "14/11",
    day: "Sex",
    time: "20:00",
    venue: "The Bulltique Vino Bar",
    durationHours: 2,
    location: venues["The Bulltique Vino Bar"],
    offer: {
      price: "20.00",
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
  },
  {
    id: "event-2025-15-11",
    name: "Show da Mariana Matheos no Restaurante Le Pontes",
    shortDate: "15/11",
    day: "Sab",
    time: "13:30",
    venue: "Restaurante Le Pontes",
    durationHours: 2,
    location: venues["Restaurante Le Pontes"],
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
  },

//=================================================================================================


//=================================================================================================
//SHOW DEZEMBRO
  {
    id: "event-2025-12-12",
    name: "Show da Mariana Matheos no The Bulltique Vino Bar",
    shortDate: "12/12",
    day: "Sex",
    time: "20:00",
    venue: "The Bulltique Vino Bar",
    durationHours: 2,
    location: venues["The Bulltique Vino Bar"],
    offer: {
      price: "20.00",
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
  },
  {
    id: "event-2025-12-13",
    name: "Show da Mariana Matheos no Restaurante Le Pontes",
    shortDate: "13/12",
    day: "Sab",
    time: "13:30",
    venue: "Restaurante Le Pontes",
    durationHours: 2,
    location: venues["Restaurante Le Pontes"],
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
//=================================================================================================
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