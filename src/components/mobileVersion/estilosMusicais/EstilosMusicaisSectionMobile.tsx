
import React from 'react';
import lineArtDeco from '@/assets/images/divisor-de-sessao.png';
import { useNavigate } from 'react-router-dom';

const EstilosMusicaisSection = () => {
  const navigate = useNavigate();

  const estilos = [
    {
      titulo: "Jazz",
      subtitulo: "A Sofisticação Musical",
      descricao: "Nossa banda de jazz em BH interpreta clássicos de Ella Fitzgerald e Duke Ellington, criando atmosfera sofisticada para casamentos e eventos corporativos em Minas Gerais.",
      influencias: ["Ella Fitzgerald", "Louis Armstrong", "Duke Ellington"]
    },
    {
      titulo: "Soul", 
      subtitulo: "A Emoção em Cada Nota",
      descricao: "Nossa banda de soul oferece interpretações emocionantes de Aretha Franklin e Ray Charles, ideal para momentos íntimos em celebrações especiais.",
      influencias: ["Aretha Franklin", "Otis Redding", "Ray Charles"]
    },
    {
      titulo: "Blues",
      subtitulo: "A Expressão Autêntica", 
      descricao: "Apresentamos o melhor de B.B. King e Etta James, trazendo autenticidade para eventos que buscam experiência musical genuína em BH.",
      influencias: ["B.B. King", "Muddy Waters", "Etta James"]
    },
    {
      titulo: "R&B",
      subtitulo: "Rhythm & Blues Contemporâneo",
      descricao: "Interpretamos Amy Winehouse, Adele e John Legend, oferecendo sonoridade atual e sofisticada para eventos modernos em Minas Gerais.",
      influencias: ["Amy Winehouse", "Adele", "John Legend"]
    }
  ];

  return (
    <section className="py-20 jazz-gradient relative">
      <div className="container mx-auto px-4 relative">
        <div className="max-w-4xl mx-auto">
          {/* SEO Optimized Title */}
          <div className="text-center mb-12 animate-fade-in">
            <h1 className="font-glimmer text-4xl md:text-5xl font-bold text-white mb-4 jazz-text-shadow">
              Estilos Musicais - Banda Jazz Soul Blues R&B
            </h1>
            <div className="w-full flex justify-center mb-4">
              <img
                src={lineArtDeco}
                alt="Divisor decorativo - Estilos musicais"
                className="w-[80%] object-contain"
              />
            </div>
            <p className="font-gatsby text-xl text-gray-300 leading-relaxed">
              Conheça os estilos que fazem da banda a escolha perfeita para eventos em BH.
            </p>
          </div>

          {/* Estilos */}
          <div className="space-y-8 mb-12">
            {estilos.map((estilo, index) => (
              <div 
                key={estilo.titulo}
                className="bg-black bg-opacity-40 p-6 border border-jazz-gold border-opacity-30 animate-fade-in"
                style={{animationDelay: `${index * 0.1}s`}}
              >
                <h2 className="font-glimmer text-2xl jazz-gold font-bold mb-2">
                  {estilo.titulo}
                </h2>
                <h3 className="font-gatsby text-lg text-jazz-gold font-semibold mb-3 opacity-80">
                  {estilo.subtitulo}
                </h3>
                <p className="font-gatsby text-lg text-gray-300 leading-relaxed mb-4">
                  {estilo.descricao}
                </p>
                <div>
                  <p className="font-gatsby text-sm jazz-gold font-semibold mb-2">
                    Principais Influências:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {estilo.influencias.map((influencia) => (
                      <span 
                        key={influencia}
                        className="px-2 py-1 bg-jazz-dark border border-jazz-gold border-opacity-20 text-jazz-gold text-xs"
                      >
                        {influencia}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Era de Ouro */}
          <div className="text-center mb-8 animate-fade-in bg-black bg-opacity-40 p-6 border border-jazz-gold border-opacity-30">
            <h2 className="font-glimmer text-2xl jazz-gold font-bold mb-3">
              Era de Ouro do Jazz (1920-1960)
            </h2>
            <p className="font-gatsby text-lg text-gray-300 leading-relaxed">
              Especializamo-nos em recriar a magia da Era de Ouro, emocionando plateias em 
              casamentos e eventos especiais em Belo Horizonte e Minas Gerais.
            </p>
          </div>

          {/* CTA */}
          <div className="text-center animate-scale-in">
            <div className="bg-black bg-opacity-40 p-6 border border-jazz-gold border-opacity-50">
              <h2 className="font-glimmer text-xl jazz-gold font-bold mb-3">
                Experiência Musical Única
              </h2>
              <p className="font-gatsby text-lg text-gray-300 mb-4">
                Adaptamos o repertório ao seu evento, criando a atmosfera perfeita.
              </p>
              <div className="space-y-3">
                <button
                  onClick={() => navigate('/repertorio')}
                  className="w-full px-4 py-3 border border-jazz-gold text-jazz-gold hover:bg-jazz-gold hover:text-black transition-all duration-300 font-gatsby"
                >
                  Ver Repertório
                </button>
                <button
                  onClick={() => navigate('/contato')}
                  className="w-full px-4 py-3 bg-jazz-gold text-black hover:bg-yellow-400 transition-all duration-300 font-gatsby font-semibold"
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
