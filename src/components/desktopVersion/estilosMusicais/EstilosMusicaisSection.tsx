
import React from 'react';
import lineArtDeco from '@/assets/images/divisor-de-sessao.png';
import { useNavigate } from 'react-router-dom';

const EstilosMusicaisSection = () => {
  const navigate = useNavigate();

  const estilos = [
    {
      titulo: "Jazz - A Sofisticação Musical",
      descricao: "O Jazz é nossa paixão principal. Com raízes no início do século XX, representa liberdade, improvisação e elegância. Nossa banda de jazz em Belo Horizonte interpreta clássicos de Ella Fitzgerald, Louis Armstrong e Duke Ellington, criando uma atmosfera sofisticada perfeita para casamentos e eventos corporativos em Minas Gerais.",
      influencias: ["Ella Fitzgerald", "Louis Armstrong", "Duke Ellington", "Miles Davis"]
    },
    {
      titulo: "Soul - A Emoção em Cada Nota",
      descricao: "O Soul traz a alma da música negra americana para seus eventos. Nossa banda de soul em BH oferece interpretações emocionantes de Aretha Franklin, Otis Redding e Ray Charles. Ideal para criar momentos íntimos e tocantes em casamentos e celebrações especiais em Minas Gerais.",
      influencias: ["Aretha Franklin", "Otis Redding", "Ray Charles", "Sam Cooke"]
    },
    {
      titulo: "Blues - A Expressão Autêntica",
      descricao: "O Blues é a raiz de toda música moderna. Nossa banda de blues apresenta o melhor de B.B. King, Muddy Waters e Etta James, trazendo autenticidade e profundidade emocional para eventos que buscam uma experiência musical genuína e marcante em Belo Horizonte.",
      influencias: ["B.B. King", "Muddy Waters", "Etta James", "Howlin' Wolf"]
    },
    {
      titulo: "R&B - Rhythm & Blues Contemporâneo",
      descricao: "O R&B moderno conecta tradição e contemporaneidade. Interpretamos Amy Winehouse, Adele, John Legend e Alicia Keys, oferecendo uma sonoridade atual e sofisticada. Perfeito para eventos que desejam música ao vivo elegante com um toque moderno em Minas Gerais.",
      influencias: ["Amy Winehouse", "Adele", "John Legend", "Alicia Keys"]
    }
  ];

  return (
    <section className="py-20 jazz-gradient relative">
      <div className="container mx-auto px-6 relative">
        <div className="max-w-6xl mx-auto">
          {/* SEO Optimized Title */}
          <div className="text-center mb-16 animate-fade-in">
            <h1 className="font-glimmer text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4 jazz-text-shadow">
              Estilos Musicais da Banda de Jazz Soul Blues R&B
            </h1>
            <div className="w-full flex justify-center mb-6">
              <img
                src={lineArtDeco}
                alt="Divisor decorativo - Estilos musicais da banda"
                className="w-[50%] object-contain"
              />
            </div>
            <p className="font-gatsby text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
              Conheça os estilos musicais que fazem da Mariana Matheos Jazz Band a escolha perfeita para eventos sofisticados em Belo Horizonte e região. Cada gênero musical traz sua própria magia e atmosfera única.
            </p>
          </div>

          {/* Estilos Grid */}
          <div className="grid gap-12 mb-16">
            {estilos.map((estilo, index) => (
              <div 
                key={estilo.titulo}
                className={`flex flex-col lg:flex-row items-center gap-8 animate-fade-in ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}
                style={{animationDelay: `${index * 0.2}s`}}
              >
                <div className="flex-1">
                  <h2 className="font-glimmer text-3xl lg:text-4xl jazz-gold font-bold mb-4">
                    {estilo.titulo}
                  </h2>
                  <p className="font-gatsby text-lg text-gray-300 leading-relaxed mb-6">
                    {estilo.descricao}
                  </p>
                  <div>
                    <h3 className="font-glimmer text-xl jazz-gold font-semibold mb-3">
                      Principais Influências:
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {estilo.influencias.map((influencia) => (
                        <span 
                          key={influencia}
                          className="px-3 py-1 bg-jazz-dark bg-opacity-40 border border-jazz-gold border-opacity-30 text-jazz-gold text-sm rounded"
                        >
                          {influencia}
                        </span>
                      ))}
                    </div>
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
            <p className="font-gatsby text-lg text-gray-300 leading-relaxed">
              Nossa banda especializa-se em recriar a magia da Era de Ouro do Jazz, período áureo que vai de 1920 a 1960. 
              Essa época marcou o nascimento dos grandes standards do jazz, soul e blues que ainda hoje emocionam plateias em 
              casamentos, eventos corporativos e celebrações especiais em Belo Horizonte e toda Minas Gerais.
            </p>
          </div>

          {/* CTA Section */}
          <div className="text-center animate-scale-in">
            <div className="bg-black bg-opacity-40 p-8 border-2 border-jazz-gold border-opacity-50 max-w-2xl mx-auto">
              <h2 className="font-glimmer text-2xl jazz-gold font-bold mb-4">
                Experimente a Magia dos Grandes Clássicos
              </h2>
              <p className="font-gatsby text-lg text-gray-300 mb-6">
                Cada estilo musical oferece uma experiência única. Nossa banda adapta o repertório ao seu evento, 
                criando a atmosfera perfeita para momentos inesquecíveis.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => navigate('/repertorio')}
                  className="px-6 py-3 border border-jazz-gold text-jazz-gold hover:bg-jazz-gold hover:text-black transition-all duration-300 font-gatsby tracking-wide"
                >
                  Ver Repertório Completo
                </button>
                <button
                  onClick={() => navigate('/contato')}
                  className="px-6 py-3 bg-jazz-gold text-black hover:bg-yellow-400 transition-all duration-300 font-gatsby tracking-wide font-semibold"
                >
                  Contratar Banda de Jazz Soul
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
