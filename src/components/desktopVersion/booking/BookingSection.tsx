
import React from 'react';

const BookingSection = () => {
  const events = [
    { icon: '💍', title: 'Casamentos', description: 'Cerimônias e recepções inesquecíveis' },
    { icon: '🏢', title: 'Eventos Corporativos', description: 'Networking e celebrações empresariais' },
    { icon: '🥂', title: 'Celebrações Privadas', description: 'Aniversários e ocasiões especiais' },
    { icon: '🎭', title: 'Locais Especializados', description: 'Restaurantes e casas de shows' }
  ];

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
            <h2 className="font-glimmer text-5xl md:text-6xl font-bold text-white mb-4 jazz-text-shadow">
              Agendamentos & Contratação
            </h2>
            <div className="flex items-center justify-center mb-6">
              <div className="h-px bg-jazz-gold w-20"></div>
              <div className="mx-4 w-3 h-3 bg-jazz-gold rounded-full"></div>
              <div className="h-px bg-jazz-gold w-20"></div>
            </div>
            <p className="font-gatsby text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Deseja contratar a banda para um evento inesquecível?
            </p>
          </div>

          {/* Events Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {events.map((event, index) => (
              <div 
                key={event.title}
                className="animate-scale-in text-center p-6 border border-jazz-gold border-opacity-30 hover:border-opacity-100 hover:bg-black hover:bg-opacity-40 transition-all duration-300"
                style={{animationDelay: `${index * 0.1}s`}}
              >
                <div className="text-4xl mb-4">{event.icon}</div>
                <h3 className="font-glimmer text-xl jazz-gold font-bold mb-2">{event.title}</h3>
                <p className="font-gatsby text-gray-300 text-sm">{event.description}</p>
              </div>
            ))}
          </div>

          {/* Service Description */}
          <div className="text-center mb-12 animate-fade-in">
            <p className="font-gatsby text-lg text-gray-300 leading-relaxed max-w-3xl mx-auto">
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
              <h4 className="font-glimmer text-lg jazz-gold font-bold mb-2">Repertório Personalizado</h4>
              <p className="font-gatsby text-gray-300 text-sm">Repertório com tema da Era de Ouro</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 border-2 border-jazz-gold rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-jazz-gold text-2xl">👗</span>
              </div>
              <h4 className="font-glimmer text-lg jazz-gold font-bold mb-2">Figurino Temático</h4>
              <p className="font-gatsby text-gray-300 text-sm">Visual elegante e apropriado</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 border-2 border-jazz-gold rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-jazz-gold text-2xl">🎭</span>
              </div>
              <h4 className="font-glimmer text-lg jazz-gold font-bold mb-2">Presença Cênica</h4>
              <p className="font-gatsby text-gray-300 text-sm">Performance completa e envolvente</p>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center animate-scale-in">
            <div className="bg-black bg-opacity-40 p-8 border-2 border-jazz-gold border-opacity-50 max-w-2xl mx-auto">
              <h3 className="font-glimmer text-2xl jazz-gold font-bold mb-4">
                Pronto para uma experiência musical única?
              </h3>
              <p className="font-gatsby text-gray-300 mb-6">
                Entre em contato e vamos criar juntos uma apresentação memorável para seu evento.
              </p>
              <a 
                href="https://wa.me/5531997522127?text=Olá, Mariana! Vi seu site e gostaria de saber mais sobre o orçamento da banda."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block font-gatsby text-lg px-8 py-4 bg-jazz-gold text-black hover:bg-yellow-400 transition-all duration-300 tracking-wider uppercase font-semibold"
              >
                Solicitar Orçamento
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookingSection;
