import React, {useState, useRef} from 'react';
import lineArtDeco from '/images/divisor-de-sessao.avif';
import { useAdvancedViewport } from '@/hooks/useAdvancedViewport';

const ImageSection = () => {
  const { isMiniMobile, isMobile, isMiniTablet, isTablet } = useAdvancedViewport();
  const [images, setImages] = useState([
    { 
      src: '/images/cantora.avif',
      alt: 'Artista musical Mariana Matheos, vocalista principal da banda, em retrato elegante com expressão sofisticada e presença cênica marcante'
    },
    { 
      src: '/images/baixista.avif',
      alt: 'Artista musical Tarcíso Junior tocando baixo elétrico em performance ao vivo, demonstrando técnica apurada e groove característico do jazz'
    },
    { 
      src: '/images/baterista.avif',
      alt: 'Artista musical Rubens Kalil na bateria em apresentação energética, com técnica precisa e ritmo swing característico do jazz moderno'
    },
    { 
      src: '/images/pianista.avif',
      alt: 'Artista musical Carlos Nobre ao piano em performance íntima, demonstrando virtuosismo e sensibilidade musical em estilo jazz contemporâneo'
    },
    { 
      src: '/images/banda-blue-jazz-concurso.avif',
      alt: 'Grupo musical Mariana Matheos Jazz Band em apresentação oficial no Festival de Jazz & Blues de Tiradentes 2025, palco profissional com iluminação cênica'
    },
  ]);
  
  const titleSize = isMobile ? 'text-4xl' : isTablet ? 'text-5xl' : 'text-7xl';
  const textSize = isMobile ? 'text-lg' : isTablet ? 'text-xl' : 'text-2xl';
  const captionSize = isMobile ? 'text-sm' : isTablet ? 'text-base' : 'text-xl';
  const gridCols = isMiniMobile ? 'grid-cols-1' : isMobile ? 'grid-cols-2' : 'grid-cols-3';
  const imageHeight = isMiniMobile ? 'h-[55vh]' : isMobile ? 'h-56' : isMiniTablet ? 'h-72' : 'h-96';

  return (
    <section className="py-20 jazz-gradient relative">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-40 h-40 border border-jazz-gold rotate-45"></div>
        <div className="absolute bottom-10 right-10 w-32 h-32 border border-jazz-gold rotate-12"></div>
      </div>

      <div className="container mx-auto px-6 relative">
        {/* Section Title */}
        <div className="text-center mb-16 animate-fade-in">
          <h1 className={`font-glimmer ${titleSize} font-bold jazz-gold mb-4 jazz-text-shadow`}>
            Galeria 
          </h1>
            {/* Divisor decorativo acima */}
            <div className="w-full flex justify-center mb-4">
              <img
                src={lineArtDeco}
                alt=""
                className="w-[50%] object-contain"
                aria-hidden="true"
                loading="lazy"
              />
            </div>
          <p className={`font-gatsbybold ${textSize} text-gray-400 max-w-2xl mx-auto`}>
            Momentos especiais capturados durante nossas apresentações exclusivas 
          </p>
        </div>

        {/* Gallery Grid */}
        <div className={`grid ${gridCols} gap-6 max-w-6xl mx-auto`}>
          {images.map((image, index) => (
            <div 
              key={index}
              className="group animate-scale-in relative overflow-hidden"
              style={{animationDelay: `${index * 0.1}s`}}
            >
              {/* Art Deco frame */}
              <div className="absolute -inset-2 border-2 border-jazz-gold opacity-0 group-hover:opacity-50 transition-opacity duration-300 z-10"></div>
              
              <div className="relative overflow-hidden bg-jazz-dark">
                <img 
                  src={image.src}
                  alt={image.alt}
                  className={`w-full ${imageHeight} object-cover filter sepia-[0.2] contrast-110 group-hover:scale-110 transition-transform duration-500`}
                  loading="lazy"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60"></div>
                
                {/* Hover effect */}
                <div className="absolute inset-0 bg-jazz-gold bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300"></div>

                {/* Caption */}
                <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <p className={`font-gatsbybold text-white ${captionSize}`}>{image.alt} </p>
                </div>
              </div>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
};

export default ImageSection;
