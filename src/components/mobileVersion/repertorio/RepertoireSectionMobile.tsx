
import React from 'react';
import { useNavigate } from 'react-router-dom';
import lineArtDeco from '@/assets/images/divisor-de-sessao.png';
import bordaComum from '@/assets/images/borda-comum-gold.png';

const RepertoireSection = () => {
  const navigate = useNavigate();
  
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
          {/* Section Title - Otimizado para SEO */}
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="font-glimmer text-5xl md:text-6xl font-bold text-white mb-4 jazz-text-shadow">
              Repertório Jazz, Soul, Blues e R&B
            </h2>
            {/* Divisor decorativo acima */}
            <div className="w-full flex justify-center mb-4">
              <img
                src={lineArtDeco}
                alt="Divisor Art Déco decorativo"
                className="w-[50%] object-contain"
              />
            </div>
          </div>

          {/* Main Content - Otimizado para SEO */}
          <div className="text-center mb-12 animate-fade-in">
            <p className="font-gatsby text-3xl text-gray-50 leading-relaxed mb-8">
              Nossa banda de jazz apresenta um repertório cuidadosamente selecionado de <span className="jazz-gold font-semibold">clássicos do Jazz, Soul, Blues e R&B</span> — com interpretações sofisticadas de grandes artistas como:
            </p>

            {/* Artists Grid */}
            <div
            className="grid grid-cols-2 mb-12 gap-y-0">
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

            <p className="font-gatsby text-3xl text-gray-50 leading-relaxed mb-12">
              Nossa banda de música ao vivo oferece arranjos fiéis da Era de Ouro do Jazz com estética cênica vintage, criando uma atmosfera musical sofisticada e inesquecível para seu evento especial.
            </p>

            {/* Featured Quote */}
            <div className="relative animate-scale-in mb-12">
              <div className="absolute -top-4 -left-4 text-6xl font-glimmer jazz-gold opacity-30">"</div>
              <div className="absolute -bottom-4 -right-4 text-6xl font-glimmer jazz-gold opacity-30">"</div>
              <div className="bg-black bg-opacity-40 p-8 md:p-12 border-2 border-jazz-gold border-opacity-50">
                <p className="font-glimmer text-2xl md:text-3xl jazz-gold font-bold italic mb-4">
                  De Billie Holiday a Amy Winehouse,
                </p>
                <p className="font-glimmer text-xl md:text-2xl text-white">
                  nossa banda conecta a elegância vintage com a emoção contemporânea
                </p>
              </div>
            </div>

            {/* Internal Link for SEO */}
            <div className="mb-8 animate-fade-in text-center">
              <p className="font-gatsby text-2xl text-gray-300 mb-4">
                Quer saber como adaptamos nosso repertório para diferentes eventos?
              </p>
              <button
                onClick={() => navigate('/estilos-musicais')}
                className="font-gatsby text-xl jazz-gold hover:text-yellow-400 underline transition-colors duration-300"
              >
                Veja nossa página de estilos musicais
              </button>
            </div>
          </div>

          {/* Musical genres - Otimizados para SEO */}
          <div className="flex flex-wrap justify-center gap-4 animate-fade-in">
            {['Jazz', 'Soul', 'Blues', 'R&B'].map((genre, index) => (
              <span 
                key={genre}
                className="font-gatsbybold px-7 py-2 border border-jazz-gold text-jazz-gold text-xl hover:bg-jazz-gold hover:text-black transition-all duration-300 text-sm tracking-wider"
                style={{animationDelay: `${index * 0.1}s`}}
              >
                Banda de {genre}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default RepertoireSection;
