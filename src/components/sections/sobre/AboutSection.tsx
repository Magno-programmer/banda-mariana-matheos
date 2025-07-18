
import React, {useRef, useState} from 'react';
import bordarArtDeco from '/images/divisor-de-textos.avif';
import lineArtDeco from '/images/divisor-de-sessao.avif';
import { useAdvancedViewport } from '@/hooks/useAdvancedViewport';

const AboutSection = () => {

  const [imagemUnica] = useState({src: '/images/cantora.avif', alt: 'Artista musical Mariana Matheos, vocalista e fundadora da banda de jazz, em retrato artístico elegante com expressão sofisticada e presença cênica marcante'});
  const { isMiniMobile, isMobile, isTablet } = useAdvancedViewport();

  const titleSize = isMobile ? 'text-4xl' : isTablet ? 'text-5xl' : 'text-6xl';
  const subtitleSize = isMobile ? 'text-xl' : isTablet ? 'text-2xl' : 'text-3xl';
  const textSize = isMobile ? 'text-xl' : isTablet ? 'text-2xl' : 'text-2xl';
  const gridCols = isMobile ? 'grid-cols-1' : isTablet ? 'grid-cols-1 lg:grid-cols-2' : 'grid-cols-2';
  const imageSize = isMiniMobile ? 'w-[90%] h-[82%]' : isMobile ? ' w-[92%] h-[270px]' : isTablet ? ' w-[92%] h-[320px]' : 'w-[92%] h-[390px]';
  const divSize = isMiniMobile ? 'w-full h-[80%]' : isMobile ? 'w-full h-[84%]' : isTablet ? 'w-[500px] h-[85%]' : 'w-[600px] h-[90%]';
  
  return (
    <section id="sobre" className="py-20 jazz-gradient relative">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 right-10 text-9xl font-glimmer text-jazz-gold" aria-hidden="true">♪</div>
        <div className="absolute bottom-10 left-10 text-7xl font-glimmer text-jazz-gold" aria-hidden="true">♫</div>
      </div>

      <div className="container mx-auto px-6 relative">
        <div className="max-w-6xl mx-auto">
          {/* Section Title */}
          <div className="text-center mb-16 animate-fade-in">
            <h1 className={`font-glimmer ${titleSize} font-bold text-white mb-4 jazz-text-shadow`}>
              Sobre a Banda 
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

            <p className={`font-gatsbybold ${subtitleSize} text-gray-400 max-w-3xl mx-auto`}>
              A história de uma paixão que se tornou uma  experiência musical única 
            </p>
          </div>

          <div className={`grid ${gridCols} gap-12 items-center max-w-6xl mx-auto`}>
            {/* Text Content */}
            <div className="animate-fade-in">
              <div className="space-y-6 font-gatsbybold text-lg leading-relaxed text-gray-300">
                <p className={`${textSize} text-white  first-letter:text-4xl first-letter:font-glimmer first-letter:text-jazz-gold first-letter:float-left first-letter:mr-2`}>
                  A banda <span className="jazz-gold font-bold">Mariana Matheos</span> oferece muito mais do que música ao vivo — entrega uma experiência sensorial sofisticada, envolvente e memorável. Inspirada na Era de Ouro do Jazz (1920–1960), sua sonoridade reflete o requinte de um tempo em que a arte de tocar era também a arte de emocionar. 
                </p>
                
                <p className={`font-gatsbybold ${textSize} text-gray-300 leading-relaxed mb-6`}>
                  Sob a liderança da cantora <span className="jazz-gold font-semibold">Mariana Matheos</span>, cuja voz combina elegância, carisma e intensidade emocional, o grupo apresenta performances sob medida para eventos que exigem <span className="jazz-gold font-semibold">excelência estética e sonora</span>. 
                </p>
                
                <p className={`font-gatsbybold ${textSize} text-gray-300 leading-relaxed`}>
                  Cada apresentação é um espetáculo completo — com figurinos planejados, repertório personalizado e presença cênica. É música viva, com alma, para eventos verdadeiramente especiais. 
                </p>
              </div>

              {/* Quote */}
              <div className="mt-8 p-6 border-l-4 border-jazz-gold bg-jazz-dark bg-opacity-20">
                <p className="font-glimmer text-xl jazz-gold italic">
                  "A música é a linguagem universal da alma, e nós falamos fluentemente." 
                </p>
                <p className="font-gatsbybold text-xl text-gray-100 mt-2">— Mariana Matheos</p>
              </div>
            </div>

            <div className={`animate-scale-in group relative ${divSize} mx-auto`}>
              <div className="relative w-full h-full flex items-center justify-center">
                
                {/* Moldura decorativa como imagem */}
                <img
                  src={bordarArtDeco}
                  alt=""
                  className="absolute object-contain pointer-events-none z-30"
                  aria-hidden="true"
                />

                {/* Área clicável */}
                <div
                  className={`relative ${imageSize} bg-gradient-to-br -inset-1 mt-3 from-jazz-dark to-black flex items-center justify-center overflow-hidden z-20`}
                  >
                  <img
                    src={imagemUnica.src}
                    alt={imagemUnica.alt}
                    className="object-cover filter sepia-[0.3] contrast-110"
                  />

                  {/* Overlay escuro decorativo */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
