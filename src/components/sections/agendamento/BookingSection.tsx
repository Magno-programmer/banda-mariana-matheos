
import React from 'react';
import lineArtDeco from '@/assets/images/divisor-de-sessao.png';
import { useAdvancedViewport } from '@/hooks/useAdvancedViewport';

const BookingSection = () => {
  const { isMiniMobile, isMobile, isMiniTablet, isTablet } = useAdvancedViewport();
  const events = [
    { icon: '💍', title: 'Casamentos', description: 'Cerimônias e recepções inesquecíveis' },
    { icon: '🏢', title: 'Eventos Corporativos', description: 'Networking e celebrações empresariais' },
    { icon: '🥂', title: 'Celebrações Privadas', description: 'Aniversários e ocasiões especiais' },
    { icon: '🎭', title: 'Locais Especializados', description: 'Restaurantes e casas de shows' }
  ];

  
  const titleSize = isMobile ? 'text-3xl' : isTablet ? 'text-4xl' : 'text-6xl';
  const textSize = isMobile ? 'text-lg' : isTablet ? 'text-xl' : 'text-2xl';
  const cardTitleSize = isMobile ? 'text-xl' : isTablet ? 'text-2xl' : 'text-2xl';
  const gridCols = isMobile ? 'grid-cols-1' : isTablet ? 'grid-cols-2' : 'grid-cols-2';
  const tableTextSize = isMobile ? 'text-lg' : isTablet ? 'text-xl' : 'text-2xl';
  const buttonTextSize = isMobile ? 'text-base' : isTablet ? 'text-lg' : 'text-lg';

  return (
    <section className="py-20 jazz-gradient relative">
      {/* Background elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/4 left-10 text-8xl font-glimmer text-jazz-gold">🎼</div>
        <div className="absolute bottom-1/4 right-10 text-6xl font-glimmer text-jazz-gold">🎺</div>
      </div>

      <div className="container mx-auto px-6 relative">
        <div className="max-w-5xl mx-auto">
          {/* Section Title */}
          <div className="text-center mb-16 animate-fade-in">
            <h2 className={`font-glimmer ${titleSize} font-bold text-white mb-4 jazz-text-shadow`}>
              Agendamentos & ContrataÇão 
            </h2>
            {/* Divisor decorativo acima */}
            <div className="w-full flex justify-center mb-4">
              <img
                src={lineArtDeco}
                alt="Divisor Art Déco"
                className="w-[50%] object-contain"
              />
            </div>
            <p className={`font-gatsbybold ${textSize} text-gray-400 max-w-3xl mx-auto leading-relaxed`}>
              Deseja contratar Mariana Matheos para um evento inesquecível? 
            </p>
          </div>

          {/* Events Grid */}
          <div className={`grid ${gridCols} gap-6 mb-16`}>
            {events.map((event, index) => (
              <div 
                key={event.title}
                className="animate-scale-in text-center p-6 border border-jazz-gold border-opacity-30 hover:border-opacity-100 hover:bg-black hover:bg-opacity-40 transition-all duration-300"
                style={{animationDelay: `${index * 0.1}s`}}
              >
                <div className="text-5xl mb-4">{event.icon}</div>
                <h3 className={`font-glimmer ${cardTitleSize} jazz-gold font-bold mb-2`}>{event.title}</h3>
                <p className={`font-gatsbybold text-gray-400 ${textSize}`}>{event.description}</p>
              </div>
            ))}
          </div>

          {/* Service Description */}
          <div className="text-center mb-12 animate-fade-in">
            <p className={`font-gatsbybold text-gray-400 ${textSize} leading-relaxed max-w-3xl mx-auto`}>
              Realizamos apresentações exclusivas para diversos tipos de eventos. 
              Temos o repertório, figurino e clima musical que te leva para atmosfera musical das décadas de 20 a 60. 
            </p>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 animate-fade-in">
            <div className="text-center">
              <div className="w-16 h-16 border-2 border-jazz-gold rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-jazz-gold text-2xl">🎵</span>
              </div>
              <h4 className={`font-glimmer ${isMobile ? 'text-base' : 'text-lg'} jazz-gold font-bold mb-2`}>Repertório Personalizado </h4>
              <p className={`font-gatsbybold text-gray-400 ${isMobile ? 'text-lg' : 'text-xl'}`}>Repertório com tema da Era de Ouro </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 border-2 border-jazz-gold rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-jazz-gold text-2xl">👗</span>
              </div>
              <h4 className={`font-glimmer ${isMobile ? 'text-base' : 'text-lg'} jazz-gold font-bold mb-2`}>Figurino Temático </h4>
              <p className={`font-gatsbybold text-gray-400 ${isMobile ? 'text-lg' : 'text-xl'}`}>Visual elegante e apropriado </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 border-2 border-jazz-gold rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-jazz-gold text-2xl">🎭</span>
              </div>
              <h4 className={`font-glimmer ${isMobile ? 'text-base' : 'text-lg'} jazz-gold font-bold mb-2`}>Presença Cênica </h4>
              <p className={`font-gatsbybold text-gray-400 ${isMobile ? 'text-lg' : 'text-xl'}`}>Performance completa e envolvente </p>
            </div>
          </div>

        </div>
      </div>

      {/* Agenda de Shows */}
      <div className="mt-24 animate-fade-in">
        <h3 className={`font-glimmer ${titleSize} jazz-gold font-bold text-center mb-6`}>
          Próximos Shows 
        </h3>
        <div className="w-full flex justify-center mb-8">
          <img
            src={lineArtDeco}
            alt="Divisor Art Déco"
            className="w-[40%] object-contain"
          />
        </div>
        <div className="overflow-x-auto">
          <table className={`min-w-full text-center font-gatsbybold ${tableTextSize} text-gray-200 border-separate border-spacing-y-4`}>
            <thead>
              <tr>
                <th className="px-4 py-2 text-jazz-gold border-b border-jazz-gold">Data</th>
                <th className="px-4 py-2 text-jazz-gold border-b border-jazz-gold">Dia</th>
                <th className="px-4 py-2 text-jazz-gold border-b border-jazz-gold">Horário</th>
                <th className="px-4 py-2 text-jazz-gold border-b border-jazz-gold">Local</th>
              </tr>
            </thead>
            <tbody>
              {[
                { date: "08/08", day: "Sex", time: "20:00", venue: "The Bulltique Vino Bar" },
                { date: "16/08", day: "Sáb", time: "19:30", venue: "Soul Jazz Burguer" },
                { date: "12/09", day: "Sex", time: "20:00", venue: "The Bulltique Vino Bar" },
              ].map((event, index) => (
                <tr key={index} className="bg-black bg-opacity-30 backdrop-blur-lg border border-jazz-gold/20">
                  <td className="px-4 py-3">{event.date}</td>
                  <td className="px-4 py-3">{event.day}</td>
                  <td className="px-4 py-3">{event.time}</td>
                  <td className="px-4 py-3">{event.venue}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* CTA */}
      <div className="text-center animate-scale-in mt-12">
        <div className="bg-black bg-opacity-40 p-8 border-2 border-jazz-gold border-opacity-50 max-w-2xl mx-auto">
          <h3 className={`font-glimmer ${textSize} jazz-gold font-bold mb-4`}>
            Pronto para ter, com essa banda de jazz, uma experiência musical única? 
          </h3>
          <p className={`font-gatsbybold text-gray-400 ${textSize} mb-6`}>
            Entre em contato e vamos criar juntos uma apresentação memorável para seu evento. 
          </p>
          <a 
            href="https://wa.me/5531997522127?text=Olá, Mariana! Vi seu site e gostaria de saber mais sobre o orçamento da banda."
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-block font-gatsby ${buttonTextSize} px-8 py-4 bg-jazz-gold text-black hover:bg-yellow-400 transition-all duration-300 tracking-wider uppercase font-semibold`}
          >
            Solicitar Orçamento
          </a>
        </div>
      </div>
    </section>
  );
};

export default BookingSection;
