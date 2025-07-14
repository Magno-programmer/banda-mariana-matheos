
import React from 'react';
import lineArtDeco from '@/assets/images/divisor-de-sessao.png';
import bordaComum from '@/assets/images/borda-comum-gold.png';

const RepertoireSection = () => {
  const artists = [
    "Billie Holiday",
    "Ella Fitzgerald", 
    "Etta James",
    "Amy Winehouse",
    "Frank Sinatra",
    "Nina Simone"
  ];

  return (
    <section className="py-20 jazz-gradient relative">
      {/* Background elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-1/4 text-6xl font-glimmer text-jazz-gold rotate-12">🎵</div>
        <div className="absolute bottom-20 right-1/4 text-8xl font-glimmer text-jazz-gold -rotate-12">🎶</div>
      </div>

      <div className="container mx-auto px-6 relative">
        <div className="max-w-5xl mx-auto">
          {/* Section Title */}
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="font-glimmer text-5xl md:text-6xl font-bold text-white mb-4 jazz-text-shadow">
              Repertório Musical & Estilo
            </h2>
            <h3 className="font-gatsby text-2xl text-gray-200 mb-6">
              Jazz • Soul • Blues • R&B - Clássicos Atemporais para Seus Eventos
            </h3>
            {/* Divisor decorativo acima */}
            <div className="w-full flex justify-center mb-4">
              <img
                src={lineArtDeco}
                alt="Divisor decorativo Art Déco para seção de repertório musical"
                className="w-[50%] object-contain"
              />
            </div>
          </div>

          {/* Main Content */}
          <div className="text-center mb-12 animate-fade-in">
            <h4 className="font-glimmer text-3xl jazz-gold mb-4">
              Repertório Cuidadosamente Selecionado
            </h4>
            <p className="font-gatsby text-xl md:text-2xl text-gray-300 leading-relaxed mb-8">
              Nossa seleção musical é uma curadoria refinada de clássicos eternos do <span className="jazz-gold font-semibold">Jazz, Soul, Blues e R&B</span>, incluindo interpretações magistrais de grandes artistas como:
            </p>

            {/* Artists Grid */}
            <div
            className="grid grid-cols-3 px-32 mb-12">
              {artists.map((artist, index) => (
                <div 
                  key={artist}
                  className="animate-scale-in bg-no-repeat bg-center bg-contain text-center flex items-center justify-center min-h-[170px] transition-all duration-300 hover:bg-jazz-dark hover:bg-opacity-30 border border-jazz-gold border-opacity-5 hover:border-opacity-10 p-4"
                  style={{animationDelay: `${index * 0.1}s`,
                  backgroundImage: `url(${bordaComum})`,
                  }}
                >
                  <p className="font-gatsby text-2xl jazz-gold font-semibold">{artist}</p>
                </div>
              ))}
            </div>
              
            <h5 className="font-glimmer text-2xl jazz-gold mb-4">
              Qualidade Musical Profissional
            </h5>
            <p className="font-gatsby text-xl text-gray-50 leading-relaxed mb-8">
              Cada performance é realizada com arranjos musicais fiéis aos originais e estética cênica autêntica da Era de Ouro do Jazz, criando um ambiente emocional, sofisticado e verdadeiramente inesquecível para seus convidados.
            </p>
            
            <div className="grid md:grid-cols-2 gap-8 mb-12 text-left">
              <div className="bg-jazz-dark bg-opacity-30 p-6 border border-jazz-gold border-opacity-30">
                <h6 className="font-gatsbybold text-xl jazz-gold mb-3">Ideal Para:</h6>
                <ul className="font-gatsby text-gray-200 space-y-2">
                  <li>• Casamentos elegantes e sofisticados</li>
                  <li>• Eventos corporativos de alto padrão</li>
                  <li>• Aniversários e celebrações especiais</li>
                  <li>• Recepções e coquetéis refinados</li>
                </ul>
              </div>
              
              <div className="bg-jazz-dark bg-opacity-30 p-6 border border-jazz-gold border-opacity-30">
                <h6 className="font-gatsbybold text-xl jazz-gold mb-3">Nossos Diferenciais:</h6>
                <ul className="font-gatsby text-gray-200 space-y-2">
                  <li>• Repertório personalizado para seu evento</li>
                  <li>• Figurinos temáticos autênticos</li>
                  <li>• Equipamentos profissionais de som</li>
                  <li>• Experiência comprovada em eventos</li>
                </ul>
              </div>
            </div>

            {/* Featured Quote */}
            <div className="relative animate-scale-in">
              <div className="absolute -top-4 -left-4 text-6xl font-glimmer jazz-gold opacity-30">"</div>
              <div className="absolute -bottom-4 -right-4 text-6xl font-glimmer jazz-gold opacity-30">"</div>
              <div className="bg-black bg-opacity-40 p-8 md:p-12 border-2 border-jazz-gold border-opacity-50">
                <p className="font-glimmer text-2xl md:text-3xl jazz-gold font-bold italic mb-4">
                  De Billie a Amy,
                </p>
                <p className="font-glimmer text-xl md:text-2xl text-white">
                  da elegância vintage à emoção contemporânea
                </p>
              </div>
            </div>
          </div>

          {/* Musical genres */}
          <div className="flex flex-wrap justify-center gap-4 animate-fade-in">
            {['Jazz', 'Soul', 'Blues', 'R&B'].map((genre, index) => (
              <span 
                key={genre}
                className="font-gatsbybold px-7 py-2 border border-jazz-gold text-jazz-gold text-xl hover:bg-jazz-gold hover:text-black transition-all duration-300 text-sm tracking-wider"
                style={{animationDelay: `${index * 0.1}s`}}
              >
                {genre}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default RepertoireSection;
