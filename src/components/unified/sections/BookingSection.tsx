import React from 'react';
import { Calendar, MapPin, Clock, Users, Music, Star } from 'lucide-react';
import { useResponsiveComponent } from '@/hooks/useResponsiveComponent';

const BookingSection = () => {
  const { styles, isMobile } = useResponsiveComponent();

  const upcomingEvents = [
    {
      name: "Show no The Bulltique Vino Bar",
      date: "2024-08-15",
      time: "20:00",
      venue: "The Bulltique Vino Bar",
      description: "Retorno da Mariana Matheos ao palco com repertório especial de jazz e soul",
      location: "Belo Horizonte, MG",
      price: "R$ 45,00"
    },
    {
      name: "Apresentação no Soul Jazz Burguer",
      date: "2024-08-22",
      time: "19:30",
      venue: "Soul Jazz Burguer",
      description: "Show de jazz ao vivo em ambiente intimista",
      location: "Belo Horizonte, MG",
      price: "Consumação"
    },
    {
      name: "Festival de Jazz da Região",
      date: "2024-09-10",
      time: "21:00",
      venue: "Teatro Municipal",
      description: "Uma noite especial de jazz com a Mariana Matheos e sua banda",
      location: "Nova Lima, MG",
      price: "R$ 60,00"
    }
  ];

  const eventTypes = [
    {
      icon: <Users className="w-8 h-8 text-jazz-gold" />,
      title: "Casamentos",
      description: "Música especial para cerimônias e recepções",
      features: ["Repertório personalizado", "Equipamentos inclusos", "Até 2 músicas escolhidas pelos noivos"]
    },
    {
      icon: <Star className="w-8 h-8 text-jazz-gold" />,
      title: "Eventos Corporativos",
      description: "Apresentações profissionais para empresas",
      features: ["Confraternizações", "Jantares empresariais", "Eventos de networking"]
    },
    {
      icon: <Music className="w-8 h-8 text-jazz-gold" />,
      title: "Shows e Festivais",
      description: "Performances completas em palcos e festivais",
      features: ["Shows públicos", "Festivais de jazz", "Casas noturnas"]
    },
    {
      icon: <Calendar className="w-8 h-8 text-jazz-gold" />,
      title: "Eventos Privados",
      description: "Apresentações íntimas e elegantes",
      features: ["Bares de vinho", "Jantares elegantes", "Eventos familiares"]
    }
  ];

  return (
    <section className="py-20 bg-black relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 text-9xl font-glimmer text-jazz-gold transform -rotate-12">♪</div>
        <div className="absolute bottom-20 right-10 text-7xl font-glimmer text-jazz-gold transform rotate-12">♫</div>
      </div>

      <div className={styles.container}>
        <div className="text-center mb-16">
          <h1 className={`font-gatsby ${styles.text.xlarge} text-jazz-gold mb-6`}>
            Agendamento
          </h1>
          <p className={`font-gatsby ${styles.text.medium} text-gray-300 max-w-3xl mx-auto`}>
            Agende sua apresentação com a Mariana Matheos Jazz Band. Música ao vivo para casamentos, 
            eventos corporativos e shows especiais
          </p>
        </div>

        {/* Upcoming Events */}
        <div className="mb-16">
          <h2 className={`font-gatsby ${styles.text.large} text-jazz-gold mb-8 text-center`}>
            Próximos Shows
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {upcomingEvents.map((event, index) => (
              <div key={index} className="bg-gray-900 p-6 rounded-lg border border-gray-700 hover:border-jazz-gold/50 transition-all duration-300">
                <div className="mb-4">
                  <h3 className={`font-gatsby ${styles.text.medium} text-jazz-gold mb-2`}>
                    {event.name}
                  </h3>
                  <p className="font-gatsby text-gray-300 text-sm mb-4">
                    {event.description}
                  </p>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Calendar className="w-5 h-5 text-jazz-gold" />
                    <span className="font-gatsby text-gray-300">
                      {new Date(event.date).toLocaleDateString('pt-BR')}
                    </span>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <Clock className="w-5 h-5 text-jazz-gold" />
                    <span className="font-gatsby text-gray-300">{event.time}</span>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <MapPin className="w-5 h-5 text-jazz-gold" />
                    <div>
                      <p className="font-gatsby text-gray-300">{event.venue}</p>
                      <p className="font-gatsby text-gray-400 text-sm">{event.location}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <Star className="w-5 h-5 text-jazz-gold" />
                    <span className="font-gatsby text-gray-300">{event.price}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Event Types */}
        <div className="mb-16">
          <h2 className={`font-gatsby ${styles.text.large} text-jazz-gold mb-8 text-center`}>
            Tipos de Eventos
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {eventTypes.map((type, index) => (
              <div key={index} className="bg-gray-900 p-8 rounded-lg border border-gray-700">
                <div className="flex items-center mb-6">
                  {type.icon}
                  <h3 className={`font-gatsby ${styles.text.large} text-jazz-gold ml-4`}>
                    {type.title}
                  </h3>
                </div>
                
                <p className={`font-gatsby ${styles.text.medium} text-gray-300 mb-6`}>
                  {type.description}
                </p>
                
                <div className="space-y-2">
                  {type.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-jazz-gold rounded-full"></div>
                      <span className="font-gatsby text-gray-300">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Booking Information */}
        <div className="bg-gray-900 p-8 rounded-lg border border-gray-700 mb-16">
          <h2 className={`font-gatsby ${styles.text.large} text-jazz-gold mb-6 text-center`}>
            Informações sobre Contratação
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className={`font-gatsby ${styles.text.medium} text-jazz-gold mb-4`}>
                Formação e Duração
              </h3>
              <ul className="space-y-2">
                <li className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-jazz-gold rounded-full"></div>
                  <span className="font-gatsby text-gray-300">5 músicos (formação padrão)</span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-jazz-gold rounded-full"></div>
                  <span className="font-gatsby text-gray-300">2 horas de apresentação</span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-jazz-gold rounded-full"></div>
                  <span className="font-gatsby text-gray-300">Formatos reduzidos disponíveis</span>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className={`font-gatsby ${styles.text.medium} text-jazz-gold mb-4`}>
                Equipamentos e Locais
              </h3>
              <ul className="space-y-2">
                <li className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-jazz-gold rounded-full"></div>
                  <span className="font-gatsby text-gray-300">Instrumentos e microfones inclusos</span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-jazz-gold rounded-full"></div>
                  <span className="font-gatsby text-gray-300">Atendemos BH e região metropolitana</span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-jazz-gold rounded-full"></div>
                  <span className="font-gatsby text-gray-300">Deslocamento incluso</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <p className={`font-gatsby ${styles.text.medium} text-gray-400 mb-8`}>
            Pronto para tornar seu evento inesquecível?
          </p>
          <a
            href="https://wa.me/5531997522127?text=Olá! Gostaria de agendar a Mariana Matheos para meu evento"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center bg-jazz-gold hover:bg-jazz-gold/90 text-black px-8 py-3 rounded-lg font-gatsby text-lg transition-all duration-300"
          >
            Solicitar Agendamento
          </a>
        </div>
      </div>
    </section>
  );
};

export default BookingSection;