
import React from 'react';
import lineArtDeco from '@/assets/images/divisor-de-sessao.png';

const BookingSection = () => {
  const events = [
    { icon: '💍', title: 'Casamentos', description: 'Cerimônias e recepÇões inesquecíveis' },
    { icon: '🏢', title: 'Eventos Corporativos', description: 'Networking e celebraÇões empresariais' },
    { icon: '🥂', title: 'CelebraÇões Privadas', description: 'Aniversários e ocasiões especiais' },
    { icon: '🎭', title: 'Locais Especializados', description: 'Restaurantes e casas de shows' }
  ];

  return (
    <section className="py-20 jazz-gradient relative">
      {/* Background elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/4 left-10 text-8xl font-glimmer text-jazz-gold">🎼</div>
        <div className="absolute bottom-1/4 right-10 text-6xl font-glimmer text-jazz-gold">🎺</div>
      </div>

      <div className="container relative">
        <div className="">
          {/* Section Title */}
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="font-glimmer text-4xl font-bold text-white mb-4 jazz-text-shadow">
              Agendamentos & ContrataÇão
            </h2>
            {/* Divisor decorativo acima */}
            <div className="w-full flex justify-center mb-4">
              <img
                src={lineArtDeco}
                alt="Divisor Art Déco"
                className="w-[70%] object-contain"
              />
            </div>
            <p className="font-gatsbybold text-2xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
              Deseja contratar a banda para um evento inesquecível?
            </p>
          </div>

          {/* Events Grid */}
          <div className="grid grid-cols-2 gap-4 mb-12">
            {events.map((event, index) => (
              <div 
                key={event.title}
                className="animate-scale-in text-center p-4 border border-jazz-gold border-opacity-30 hover:border-opacity-100 hover:bg-black hover:bg-opacity-40 transition-all duration-300"
                style={{animationDelay: `${index * 0.1}s`}}
              >
                <div className="text-3xl mb-4">{event.icon}</div>
                <h3 className="font-glimmer jazz-gold font-bold mb-2">{event.title}</h3>
                <p className="font-gatsbybold text-gray-400 text-lg">{event.description}</p>
              </div>
            ))}
          </div>

          {/* Service Description */}
          <div className="text-center mb-12 animate-fade-in">
            <p className="font-gatsbybold text-gray-400 text-2xl leading-relaxed mx-auto">
              Realizamos apresentaÇões exclusivas para diversos tipos de eventos. 
              Temos o repertório, figurino e clima musical que te leva para atmosfera musical das décadas de 20 a 60.
            </p>
          </div>

          {/* Features */}
          <div className="grid grid-cols-2 gap-8 mb-16 animate-fade-in">
            <div className="text-center">
              <div className="w-16 h-16 border-2 border-jazz-gold rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-jazz-gold text-2xl">🎵</span>
              </div>
              <h4 className="font-glimmer text-lg jazz-gold font-bold mb-2">Repertório Personalizado</h4>
              <p className="font-gatsbybold text-gray-400 text-xl">Repertório com tema da Era de Ouro</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 border-2 border-jazz-gold rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-jazz-gold text-2xl">👗</span>
              </div>
              <h4 className="font-glimmer text-lg jazz-gold font-bold mb-2">Figurino Temático</h4>
              <p className="font-gatsbybold text-gray-400 text-xl">Visual elegante e apropriado</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 border-2 border-jazz-gold rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-jazz-gold text-2xl">🎭</span>
              </div>
              <h4 className="font-glimmer text-lg jazz-gold font-bold mb-2">PresenÇa Cênica</h4>
              <p className="font-gatsbybold text-gray-400 text-xl">Performance completa e envolvente</p>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center animate-scale-in">
            <div className="bg-black bg-opacity-40 p-8 border-2 border-jazz-gold border-opacity-50 max-w-2xl mx-auto">
              <h3 className="font-glimmer text-2xl jazz-gold font-bold mb-4">
                Pronto para uma experiência musical única?
              </h3>
              <p className="font-gatsbybold text-xl text-gray-400 mb-6">
                Entre em contato e vamos criar juntos uma apresentaÇão memorável para seu evento.
              </p>
              <a 
                href="https://wa.me/5531997522127?text=Olá, Mariana! Vi seu site e gostaria de saber mais sobre o orÇamento da banda."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block font-gatsby text-lg px-8 py-4 bg-jazz-gold text-black hover:bg-yellow-400 transition-all duration-300 tracking-wider uppercase font-semibold"
              >
                Solicitar OrÇamento
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookingSection;
