import React, { useState } from 'react';
import bordarArtDeco from '@/assets/images/divisor-de-textos.png';
import lineArtDeco from '@/assets/images/divisor-de-sessao.png';
import { useAdvancedViewport } from '@/hooks/useAdvancedViewport';

const AboutSection = () => {
  const [imagemUnica] = useState({src: '/images/cantora.png', alt: 'Cantora Mariana Matheos'});
  const { isMobile, isTablet } = useAdvancedViewport();

  const titleSize = isMobile ? 'text-4xl' : isTablet ? 'text-5xl' : 'text-6xl';
  const subtitleSize = isMobile ? 'text-xl' : isTablet ? 'text-2xl' : 'text-3xl';
  const textSize = isMobile ? 'text-lg' : isTablet ? 'text-xl' : 'text-2xl';
  const gridCols = isMobile ? 'grid-cols-1' : isTablet ? 'grid-cols-1 lg:grid-cols-2' : 'grid-cols-2';
  const imageSize = isMobile ? 'w-full max-w-sm' : isTablet ? 'w-full max-w-md' : 'w-full max-w-lg';

  return (
    <section id="sobre" className="py-20 jazz-gradient relative">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 right-10 text-9xl font-glimmer text-jazz-gold">♪</div>
        <div className="absolute bottom-10 left-10 text-7xl font-glimmer text-jazz-gold">♫</div>
      </div>

      <div className="container mx-auto px-6 relative">
        {/* Section Title */}
        <div className="text-center mb-16 animate-fade-in">
          <h2 className={`font-glimmer ${titleSize} font-bold text-white mb-4 jazz-text-shadow`}>
            Sobre a Banda
          </h2>
          {/* Divisor decorativo */}
          <div className="w-full flex justify-center mb-4">
            <img
              src={lineArtDeco}
              alt="Divisor Art Déco"
              className="w-[50%] object-contain"
            />
          </div>
          <p className={`font-gatsbybold ${subtitleSize} text-gray-400 max-w-3xl mx-auto`}>
            A história de uma paixão que se tornou uma experiência musical única
          </p>
        </div>

        {/* Main Content */}
        <div className={`grid ${gridCols} gap-12 items-center max-w-6xl mx-auto`}>
          {/* Text Content */}
          <div className="animate-fade-in">
            <div className="space-y-6">
              <div className="relative">
                <img
                  src={bordarArtDeco}
                  alt="Borda decorativa Art Déco"
                  className="absolute -top-2 -left-2 w-8 h-8 z-0"
                />
                <h3 className={`font-glimmer ${subtitleSize} jazz-gold font-bold mb-4 relative z-10`}>
                  Uma Jornada Musical Autêntica
                </h3>
                <p className={`font-gatsbybold ${textSize} text-gray-300 leading-relaxed mb-6`}>
                  A Mariana Matheos Jazz Band nasceu da paixão pela Era de Ouro do Jazz (1920-1960), 
                  trazendo para os dias atuais a sofisticação e elegância que marcaram essa época única na história da música.
                </p>
              </div>

              <div className="relative">
                <img
                  src={bordarArtDeco}
                  alt="Borda decorativa Art Déco"
                  className="absolute -top-2 -left-2 w-8 h-8 z-0"
                />
                <h3 className={`font-glimmer ${subtitleSize} jazz-gold font-bold mb-4 relative z-10`}>
                  Formação Profissional
                </h3>
                <p className={`font-gatsbybold ${textSize} text-gray-300 leading-relaxed mb-6`}>
                  Composta por músicos experientes e apaixonados, a banda combina técnica apurada com 
                  interpretação sensível, criando apresentações que emocionam e transportam o público 
                  para uma atmosfera única de nostalgia e elegância.
                </p>
              </div>

              <div className="relative">
                <img
                  src={bordarArtDeco}
                  alt="Borda decorativa Art Déco"
                  className="absolute -top-2 -left-2 w-8 h-8 z-0"
                />
                <h3 className={`font-glimmer ${subtitleSize} jazz-gold font-bold mb-4 relative z-10`}>
                  Repertório Cuidadosamente Selecionado
                </h3>
                <p className={`font-gatsbybold ${textSize} text-gray-300 leading-relaxed`}>
                  Cada música é escolhida para criar uma narrativa musical coesa, passando por 
                  clássicos do jazz, soul, blues e R&B, sempre com o compromisso de manter a 
                  autenticidade e o charme dos grandes sucessos de uma era dourada.
                </p>
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="animate-scale-in flex justify-center">
            <div className="relative">
              <div className="absolute -inset-4 border-2 border-jazz-gold opacity-30"></div>
              <img
                src={imagemUnica.src}
                alt={imagemUnica.alt}
                className={`${imageSize} object-cover filter sepia-[0.1] contrast-110`}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-30"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;