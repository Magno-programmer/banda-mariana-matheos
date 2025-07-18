
import React from 'react';
import lineArtDeco from '/images/divisor-de-sessao.avif';
import bordaComum from '/images/borda-comum-gold.avif';
import { useAdvancedViewport } from '@/hooks/useAdvancedViewport';

const RepertoireSection = () => {
  const { isMiniMobile, isMobile, isMiniTablet, isTablet } = useAdvancedViewport();

  const artists = [
    "Billie Holiday",
    "Ella Fitzgerald", 
    "Etta James",
    "Amy Winehouse",
    "Frank Sinatra",
    "Nina Simone"
  ];

  const titleSize = isMobile ? 'text-4xl' : isMiniTablet ? 'text-4xl' : isTablet ? 'text-5xl' : 'text-6xl';
  const textSize = isMobile ? 'text-xl' : isTablet ? 'text-2xl' : 'text-3xl';
  const artistTextSize = isMobile ? 'text-lg' : isTablet ? 'text-xl' : 'text-2xl';
  const gridCols = isMiniMobile ? 'grid-cols-1' : isMobile ? 'grid-cols-2' : isMiniTablet ? 'grid-cols-2' : isTablet ? 'grid-cols-3' : 'grid-cols-3';
  const padding = isMobile ? 'px-4' : isMiniTablet ? 'px-6' : isTablet ? 'px-16' : 'px-32';
  const minHeight = isMobile ? 'min-h-[120px]' : isMiniTablet ? 'min-h-[179px]' : isTablet ? 'min-h-[180px]' : 'min-h-[190px]';


  return (
    <section className="py-20 jazz-gradient relative">
      {/* Background elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-1/4 text-6xl font-glimmer text-jazz-gold rotate-12" aria-hidden="true">🎵</div>
        <div className="absolute bottom-20 right-1/4 text-8xl font-glimmer text-jazz-gold -rotate-12" aria-hidden="true">🎶</div>
      </div>

      <div className="container mx-auto px-6 relative">
        <div className="max-w-5xl mx-auto">
          {/* Section Title */}
          <div className="text-center mb-16 animate-fade-in">
            <h1 className={`font-glimmer ${titleSize} md:text-6xl font-bold text-white mb-4 jazz-text-shadow`}>
              Repertório & Estilo 
            </h1>
            {/* Divisor decorativo acima */}
            <div className="w-full flex justify-center mb-4">
          <img
            src={lineArtDeco}
            alt=""
            className="w-[50%] object-contain"
            aria-hidden="true"
          />
            </div>
          </div>

          {/* Main Content */}
          <div className="text-center mb-12 animate-fade-in">
            <p className="font-gatsby text-xl md:text-3xl text-gray-300 leading-relaxed mb-8">
              O repertório da banda é uma curadoria refinada de clássicos do <span className="jazz-gold font-semibold">Jazz, Soul, Blues e R&B</span> — com interpretações de artistas como: 
            </p>

            {/* Artists Grid */}
            <div
            className={`grid ${gridCols} ${padding} mb-12`}>
              {artists.map((artist, index) => (
                <div 
                  key={artist}
                  className={`animate-scale-in bg-no-repeat bg-center bg-contain text-center flex items-center justify-center ${minHeight} transition-all duration-300 hover:bg-jazz-dark hover:bg-opacity-30 border border-jazz-gold border-opacity-5 hover:border-opacity-10 p-4`}
                  style={{
                    animationDelay: `${index * 0.1}s`,
                    backgroundImage: `url(${bordaComum})`,
                  }}
                >
                  <p className={`font-gatsby ${artistTextSize} jazz-gold font-semibold`}>{artist} </p>
                </div>
              ))}
            </div>
              
            <p className={`font-gatsby ${textSize} text-gray-50 leading-relaxed mb-12`}>
              Cada performance é realizada com arranjos fiéis e estética cênica trazendo a Era de Ouro até você, criando um ambiente emocional, sofisticado e inesquecível. 
            </p>

            {/* Featured Quote */}
            <div className="relative animate-scale-in">
              <div className="absolute -top-4 -left-4 text-6xl font-glimmer jazz-gold opacity-30">"</div>
              <div className="absolute -bottom-4 -right-4 text-6xl font-glimmer jazz-gold opacity-30">"</div>
              <div className="bg-black bg-opacity-40 p-8 md:p-12 border-2 border-jazz-gold border-opacity-50">
                <p className={`font-glimmer ${textSize} jazz-gold font-bold italic mb-4`}>
                  De Billie a Amy,
                </p>
                <p className={`font-glimmer ${isMobile ? 'text-lg' : textSize} text-white`}>
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
                className={`font-gatsbybold px-7 py-2 border border-jazz-gold text-jazz-gold ${textSize} hover:bg-jazz-gold hover:text-black transition-all duration-300 tracking-wider`}
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
