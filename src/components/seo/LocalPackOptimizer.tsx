import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Phone, Star, Clock, Calendar, Globe } from 'lucide-react';

interface LocalPackOptimizerProps {
  businessName: string;
  address: string;
  phone: string;
  rating: number;
  reviewCount: number;
  hours: string;
  categories: string[];
  services: string[];
  images: string[];
}

const LocalPackOptimizer: React.FC<LocalPackOptimizerProps> = ({
  businessName = "Mariana Matheos Jazz Band",
  address = "Belo Horizonte, MG",
  phone = "(31) 99752-2127",
  rating = 5.0,
  reviewCount = 50,
  hours = "Seg-Dom: 09:00-22:00",
  categories = ["Banda de Jazz", "Música ao Vivo", "Entretenimento"],
  services = ["Casamentos", "Eventos Corporativos", "Shows", "Festas"],
  images = ["/images/banda.png", "/images/cantora.png", "/images/pianista.png"]
}) => {
  
  // Generate Local Business Schema
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": businessName,
    "image": images,
    "description": "Banda de jazz profissional em Belo Horizonte especializada em casamentos, eventos corporativos e shows ao vivo.",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Rua da Música, 123",
      "addressLocality": "Belo Horizonte",
      "addressRegion": "MG",
      "postalCode": "30000-000",
      "addressCountry": "BR"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": -19.9191,
      "longitude": -43.9386
    },
    "telephone": phone,
    "openingHours": [
      "Mo-Su 09:00-22:00"
    ],
    "priceRange": "R$ 1500 - R$ 5000",
    "servesCuisine": "Entertainment",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": rating,
      "reviewCount": reviewCount,
      "bestRating": 5,
      "worstRating": 1
    },
    "review": [
      {
        "@type": "Review",
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": 5,
          "bestRating": 5
        },
        "author": {
          "@type": "Person",
          "name": "Geraldo Santana"
        },
        "reviewBody": "Excelente cantora!! Vale a pena assistir o seu show!!",
        "datePublished": "2024-03-01"
      }
    ],
    "areaServed": [
      {
        "@type": "City",
        "name": "Belo Horizonte"
      },
      {
        "@type": "State",
        "name": "Minas Gerais"
      }
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Serviços Musicais",
      "itemListElement": [
        {
          "@type": "Offer",
          "name": "Casamento Completo",
          "description": "Apresentação musical completa para casamento",
          "price": "3500",
          "priceCurrency": "BRL"
        },
        {
          "@type": "Offer",
          "name": "Evento Corporativo",
          "description": "Música ao vivo para eventos empresariais",
          "price": "2500",
          "priceCurrency": "BRL"
        }
      ]
    }
  };

  return (
    <>
      {/* Local Business Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(localBusinessSchema, null, 2)
        }}
      />
      
      {/* Local Pack Optimization Card */}
      <Card className="bg-jazz-dark border-jazz-gold/20 mb-6">
        <CardHeader>
          <CardTitle className="text-jazz-gold flex items-center">
            <MapPin className="mr-2 h-5 w-5" />
            Local Pack Optimization
          </CardTitle>
          <CardDescription className="text-white/70">
            Otimização para aparecer nos resultados locais do Google
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Business Info */}
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-jazz-gold mb-2">Informações do Negócio</h3>
                <div className="space-y-2 text-white/90">
                  <div className="flex items-center">
                    <MapPin className="mr-2 h-4 w-4 text-jazz-gold" />
                    <span>{address}</span>
                  </div>
                  <div className="flex items-center">
                    <Phone className="mr-2 h-4 w-4 text-jazz-gold" />
                    <span>{phone}</span>
                  </div>
                  <div className="flex items-center">
                    <Star className="mr-2 h-4 w-4 text-jazz-gold" />
                    <span>{rating} estrelas ({reviewCount} avaliações)</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="mr-2 h-4 w-4 text-jazz-gold" />
                    <span>{hours}</span>
                  </div>
                </div>
              </div>

              {/* Categories */}
              <div>
                <h3 className="font-semibold text-jazz-gold mb-2">Categorias</h3>
                <div className="flex flex-wrap gap-2">
                  {categories.map((category, index) => (
                    <Badge key={index} variant="outline" className="border-jazz-gold text-jazz-gold">
                      {category}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            {/* Services */}
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-jazz-gold mb-2">Serviços</h3>
                <div className="grid grid-cols-2 gap-2">
                  {services.map((service, index) => (
                    <div key={index} className="flex items-center text-white/90">
                      <div className="w-2 h-2 bg-jazz-gold rounded-full mr-2"></div>
                      <span>{service}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Actions */}
              <div>
                <h3 className="font-semibold text-jazz-gold mb-2">Ações Rápidas</h3>
                <div className="space-y-2">
                  <button className="w-full bg-jazz-gold text-black px-4 py-2 rounded-lg hover:bg-jazz-gold/90 transition-colors">
                    Solicitar Orçamento
                  </button>
                  <button className="w-full bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
                    WhatsApp
                  </button>
                  <button className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                    Ver Disponibilidade
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Local SEO Tips */}
          <div className="mt-6 p-4 bg-jazz-dark/30 rounded-lg">
            <h3 className="font-semibold text-jazz-gold mb-2">Otimizações Ativas</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-white/90">
              <div>
                <h4 className="font-medium text-jazz-gold mb-1">Schema Markup</h4>
                <ul className="space-y-1">
                  <li>• LocalBusiness implementado</li>
                  <li>• Geo-coordenadas configuradas</li>
                  <li>• Horário de funcionamento</li>
                  <li>• Avaliações estruturadas</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-jazz-gold mb-1">Sinais Locais</h4>
                <ul className="space-y-1">
                  <li>• NAP consistente</li>
                  <li>• Categorias otimizadas</li>
                  <li>• Palavras-chave locais</li>
                  <li>• Citações estruturadas</li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Google My Business Optimization */}
      <Card className="bg-jazz-dark border-jazz-gold/20">
        <CardHeader>
          <CardTitle className="text-jazz-gold flex items-center">
            <Globe className="mr-2 h-5 w-5" />
            Google My Business
          </CardTitle>
          <CardDescription className="text-white/70">
            Otimizações para GMB e perfis locais
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* GMB Posts */}
            <div className="p-4 bg-jazz-dark/30 rounded-lg">
              <h3 className="font-semibold text-jazz-gold mb-2">Posts Sugeridos</h3>
              <div className="space-y-2 text-white/90">
                <div className="flex items-center justify-between">
                  <span>🎵 "Últimas datas 2024 - Reserve já!"</span>
                  <Badge variant="outline" className="border-green-500 text-green-500">Ativo</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span>💒 "Casamento dos sonhos com jazz ao vivo"</span>
                  <Badge variant="outline" className="border-blue-500 text-blue-500">Programado</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span>⭐ "5 estrelas no Google - Obrigada!"</span>
                  <Badge variant="outline" className="border-yellow-500 text-yellow-500">Rascunho</Badge>
                </div>
              </div>
            </div>

            {/* Q&A Optimization */}
            <div className="p-4 bg-jazz-dark/30 rounded-lg">
              <h3 className="font-semibold text-jazz-gold mb-2">Perguntas & Respostas</h3>
              <div className="space-y-2 text-white/90">
                <div>
                  <strong>P:</strong> Vocês tocam em eventos fora de BH?
                </div>
                <div>
                  <strong>R:</strong> Sim! Atendemos toda região metropolitana e interior de MG.
                </div>
                <div className="border-t border-jazz-gold/20 pt-2">
                  <strong>P:</strong> Qual o valor para casamento?
                </div>
                <div>
                  <strong>R:</strong> A partir de R$ 3.500. Solicite orçamento personalizado!
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default LocalPackOptimizer;