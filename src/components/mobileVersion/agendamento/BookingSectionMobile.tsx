
import React from 'react';
import lineArtDeco from '@/assets/images/divisor-de-sessao.png';

const BookingSection = () => {
  const events = [
    { icon: '💍', title: 'Banda para Casamentos', description: 'Jazz e soul para cerimônias únicas' },
    { icon: '🏢', title: 'Eventos Corporativos', description: 'Música ao vivo para empresas' },
    { icon: '🥂', title: 'Celebrações Privadas', description: 'Aniversários com música sofisticada' },
    { icon: '🎭', title: 'Restaurantes e Eventos', description: 'Shows em casas noturnas e eventos' }
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
          {/* Section Title - Otimizado para SEO */}
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="font-glimmer text-4xl font-bold text-white mb-4 jazz-text-shadow">
              Contratar Banda de Jazz para Eventos
            </h2>
            {/* Divisor decorativo acima */}
            <div className="w-full flex justify-center mb-4">
              <img
                src={lineArtDeco}
                alt="Divisor Art Déco decorativo"
                className="w-[70%] object-contain"
              />
            </div>
            <p className="font-gatsbybold text-2xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
              Contrate a banda de jazz Mariana Matheos para seu evento especial
            </p>
          </div>

          {/* Events Grid - Otimizado */}
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

          {/* Service Description - Otimizado para SEO */}
          <div className="text-center mb-12 animate-fade-in">
            <p className="font-gatsbybold text-gray-400 text-2xl leading-relaxed mx-auto">
              Nossa banda de jazz, soul, blues e R&B realiza apresentações exclusivas em Belo Horizonte e região. 
              Oferecemos repertório personalizado, figurino temático da Era de Ouro e atmosfera musical única para seu evento especial.
            </p>
          </div>

          {/* Features - Otimizadas para SEO */}
          <div className="grid grid-cols-2 gap-8 mb-16 animate-fade-in">
            <div className="text-center">
              <div className="w-16 h-16 border-2 border-jazz-gold rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-jazz-gold text-2xl">🎵</span>
              </div>
              <h4 className="font-glimmer text-lg jazz-gold font-bold mb-2">Repertório de Jazz</h4>
              <p className="font-gatsbybold text-gray-400 text-xl">Clássicos da Era de Ouro do Jazz</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 border-2 border-jazz-gold rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-jazz-gold text-2xl">👗</span>
              </div>
              <h4 className="font-glimmer text-lg jazz-gold font-bold mb-2">Figurino Vintage</h4>
              <p className="font-gatsbybold text-gray-400 text-xl">Visual elegante e temático</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 border-2 border-jazz-gold rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-jazz-gold text-2xl">🎭</span>
              </div>
              <h4 className="font-glimmer text-lg jazz-gold font-bold mb-2">Show Completo</h4>
              <p className="font-gatsbybold text-gray-400 text-xl">Performance envolvente e sofisticada</p>
            </div>
          </div>

        </div>
      </div>
      
      {/* Agenda de Shows - Otimizada para SEO */}
      <div className="mt-24 animate-fade-in">
        <h3 className="font-glimmer text-4xl jazz-gold font-bold text-center mb-6">
          Shows da Banda de Jazz em BH
        </h3>
        <div className="w-full flex justify-center mb-8">
          <img
            src={lineArtDeco}
            alt="Divisor Art Déco decorativo"
            className="w-[70%] object-contain"
          />
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full text-center font-gatsbybold text-xl text-gray-200 border-separate border-spacing-y-4">
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
                { date: "09/07", day: "Qua", time: "20:00", venue: "Chopperhead Garage" },
                { date: "11/07", day: "Sex", time: "20:00", venue: "The Bulltique Vino Bar" },
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

      {/* CTA - Otimizado para SEO */}
      <div className="text-center animate-scale-in mt-12">
        <div className="bg-black bg-opacity-40 p-8 border-2 border-jazz-gold border-opacity-50 max-w-2xl mx-auto">
          <h3 className="font-glimmer text-2xl jazz-gold font-bold mb-4">
            Contrate Nossa Banda de Jazz para Seu Evento
          </h3>
          <p className="font-gatsbybold text-xl text-gray-400 mb-6">
            Solicite orçamento para banda de jazz, soul e blues. Música ao vivo sofisticada para casamentos e eventos em BH.
          </p>
          <a 
            href="https://wa.me/5531997522127?text=Olá, Mariana! Vi seu site e gostaria de contratar a banda de jazz para meu evento."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block font-gatsby text-lg px-8 py-4 bg-jazz-gold text-black hover:bg-yellow-400 transition-all duration-300 tracking-wider uppercase font-semibold"
          >
            Contratar Banda de Jazz
          </a>
        </div>
      </div>
    </section>
  );
};

export default BookingSection;
