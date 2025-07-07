
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
              Repertório da Banda - Jazz Soul Blues R&B ao Vivo
            </h2>
            {/* Divisor decorativo acima */}
            <div className="w-full flex justify-center mb-4">
              <img
                src={lineArtDeco}
                alt="Divisor Art Déco - Show ao vivo"
                className="w-[50%] object-contain"
              />
            </div>
          </div>

          {/* Main Content */}
          <div className="text-center mb-12 animate-fade-in">
            <p className="font-gatsby text-xl md:text-3xl text-gray-300 leading-relaxed mb-8">
              O repertório da <span className="jazz-gold font-semibold">banda Mariana Matheos</span> apresenta uma curadoria sofisticada dos maiores clássicos do <span className="jazz-gold font-semibold">jazz, soul, blues e R&B</span>. Nossos <span className="jazz-gold font-semibold">shows ao vivo</span> incluem interpretações especializadas de lendas como:
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

            <p className="font-gatsby text-2xl text-gray-50 leading-relaxed mb-12">
              Cada <span className="jazz-gold font-semibold">show da banda Mariana Matheos</span> é uma experiência única, onde nossos <span className="jazz-gold font-semibold">shows de jazz soul blues ao vivo</span> transportam o público para a Era de Ouro da música. Nossa <span className="jazz-gold font-semibold">banda ao vivo especializada</span> cria ambientes sofisticados e emocionantes através de arranjos fiéis e presença cênica marcante.
            </p>

            {/* Featured Quote */}
            <div className="relative animate-scale-in">
              <div className="absolute -top-4 -left-4 text-6xl font-glimmer jazz-gold opacity-30">"</div>
              <div className="absolute -bottom-4 -right-4 text-6xl font-glimmer jazz-gold opacity-30">"</div>
              <div className="bg-black bg-opacity-40 p-8 md:p-12 border-2 border-jazz-gold border-opacity-50">
                <p className="font-glimmer text-2xl md:text-3xl jazz-gold font-bold italic mb-4">
                  De Billie Holiday a Amy Winehouse,
                </p>
                <p className="font-glimmer text-xl md:text-2xl text-white">
                  nossa banda ao vivo conecta gerações através da música
                </p>
              </div>
            </div>
          </div>

          {/* Musical genres */}
          <div className="flex flex-wrap justify-center gap-4 animate-fade-in">
            {[
              'Bandas de Jazz', 
              'Bandas de Soul', 
              'Bandas de Blues', 
              'Bandas de R&B'
            ].map((genre, index) => (
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
