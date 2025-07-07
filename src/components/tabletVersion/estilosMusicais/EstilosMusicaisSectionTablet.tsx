
import React from 'react';
import lineArtDeco from '@/assets/images/divisor-de-sessao.png';
import { useNavigate } from 'react-router-dom';

const EstilosMusicaisSection = () => {
  const navigate = useNavigate();

  const estilos = [
    {
      titulo: "Jazz - A Sofisticação Musical",
      descricao: "Nossa banda de jazz em Belo Horizonte interpreta clássicos de Ella Fitzgerald, Louis Armstrong e Duke Ellington, criando uma atmosfera sofisticada perfeita para casamentos e eventos corporativos em Minas Gerais.",
      influencias: ["Ella Fitzgerald", "Louis Armstrong", "Duke Ellington", "Miles Davis"]
    },
    {
      titulo: "Soul - A Emoção em Cada Nota",
      descricao: "Nossa banda de soul em BH oferece interpretações emocionantes de Aretha Franklin, Otis Redding e Ray Charles. Ideal para criar momentos íntimos e tocantes em casamentos e celebrações especiais.",
      influencias: ["Aretha Franklin", "Otis Redding", "Ray Charles", "Sam Cooke"]
    },
    {
      titulo: "Blues - A Expressão Autêntica",
      descricao: "Apresentamos o melhor de B.B. King, Muddy Waters e Etta James, trazendo autenticidade e profundidade emocional para eventos que buscam uma experiência musical genuína em BH.",
      influencias: ["B.B. King", "Muddy Waters", "Etta James", "Howlin' Wolf"]
    },
    {
      titulo: "R&B - Rhythm & Blues Contemporâneo",
      descricao: "Interpretamos Amy Winehouse, Adele, John Legend e Alicia Keys, oferecendo uma sonoridade atual e sofisticada para eventos modernos em Minas Gerais.",
      influencias: ["Amy Winehouse", "Adele", "John Legend", "Alicia Keys"]
    }
  ];

  return (
    <section className="py-20 jazz-gradient relative">
      <div className="container mx-auto px-6 relative">
        <div className="max-w-5xl mx-auto">
          {/* SEO Optimized Title */}
          <div className="text-center mb-16 animate-fade-in">
            <h1 className="font-glimmer text-5xl md:text-6xl font-bold text-white mb-4 jazz-text-shadow">
              Estilos Musicais da Banda Jazz Soul Blues R&B
            </h1>
            <div className="w-full flex justify-center mb-6">
              <img
                src={lineArtDeco}
                alt="Divisor decorativo - Estilos musicais"
                className="w-[50%] object-contain"
              />
            </div>
            <p className="font-gatsbybold text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Conheça os estilos musicais que fazem da Mariana Matheos a escolha perfeita para eventos sofisticados em Belo Horizonte.
            </p>
          </div>

          {/* Estilos Grid */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {estilos.map((estilo, index) => (
              <div 
                key={estilo.titulo}
                className="bg-black bg-opacity-40 p-6 border border-jazz-gold border-opacity-30 animate-fade-in"
                style={{animationDelay: `${index * 0.1}s`}}
              >
                <h2 className="font-glimmer text-2xl jazz-gold font-bold mb-4">
                  {estilo.titulo}
                </h2>
                <p className="font-gatsbybold text-xl text-gray-300 leading-relaxed mb-4">
                  {estilo.descricao}
                </p>
                <div>
                  <h3 className="font-glimmer text-lg jazz-gold font-semibold mb-2">
                    Principais Influências:
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {estilo.influencias.map((influencia) => (
                      <span 
                        key={influencia}
                        className="px-3 py-1 bg-jazz-dark bg-opacity-40 border border-jazz-gold border-opacity-30 text-jazz-gold text-sm"
                      >
                        {influencia}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Era de Ouro Section */}
          <div className="text-center mb-12 animate-fade-in bg-black bg-opacity-40 p-8 border-2 border-jazz-gold border-opacity-30">
            <h2 className="font-glimmer text-3xl jazz-gold font-bold mb-4">
              Era de Ouro do Jazz (1920-1960)
            </h2>
            <p className="font-gatsbybold text-2xl text-gray-300 leading-relaxed">
              Nossa banda especializa-se em recriar a magia da Era de Ouro do Jazz, emocionando plateias em 
              casamentos, eventos corporativos e celebrações especiais em Belo Horizonte e Minas Gerais.
            </p>
          </div>

          {/* CTA Section */}
          <div className="text-center animate-scale-in">
            <div className="bg-black bg-opacity-40 p-8 border-2 border-jazz-gold border-opacity-50 max-w-2xl mx-auto">
              <h2 className="font-glimmer text-2xl jazz-gold font-bold mb-4">
                Experimente a Magia dos Grandes Clássicos
              </h2>
              <p className="font-gatsbybold text-2xl text-gray-300 mb-6">
                Cada estilo oferece uma experiência única. Adaptamos o repertório ao seu evento.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => navigate('/repertorio')}
                  className="px-6 py-3 border border-jazz-gold text-jazz-gold hover:bg-jazz-gold hover:text-black transition-all duration-300 font-gatsbybold tracking-wide"
                >
                  Ver Repertório Completo
                </button>
                <button
                  onClick={() => navigate('/contato')}
                  className="px-6 py-3 bg-jazz-gold text-black hover:bg-yellow-400 transition-all duration-300 font-gatsbybold tracking-wide font-semibold"
                >
                  Contratar Banda Jazz Soul
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EstilosMusicaisSection;
