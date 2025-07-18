import React, {useState, useRef} from 'react';
import lineArtDeco from '/images/divisor-de-sessao.avif';
import { useAdvancedViewport } from '@/hooks/useAdvancedViewport';

const ImageSection = () => {
  const { isMiniMobile, isMobile, isMiniTablet, isTablet } = useAdvancedViewport();
  const [images, setImages] = useState([
    { 
      src: '/images/cantora.avif',
      alt: 'Mariana Matheos, vocalista da banda de jazz, em performance elegante para casamento em Belo Horizonte - repertório da Era de Ouro do jazz e bossa nova'
    },
    { 
      src: '/images/baixista.avif',
      alt: 'Baixista Tarcíso Junior da Mariana Matheos Jazz Band em performance para evento exclusivo em Belo Horizonte - groove profissional para cerimônias e celebrações'
    },
    { 
      src: '/images/baterista.avif',
      alt: 'Baterista Rubens Kalil da banda de jazz Mariana Matheos em show ao vivo em Nova Lima, MG - ritmo refinado para casamentos e eventos empresariais'
    },
    { 
      src: '/images/pianista.avif',
      alt: 'Pianista Carlos Nobre da banda Mariana Matheos em performance sofisticada de jazz standards em evento corporativo, Belo Horizonte - música ao vivo para eventos especiais'
    },
    { 
      src: '/images/banda-blue-jazz-concurso.avif',
      alt: 'Banda completa Mariana Matheos Jazz no Festival de Jazz & Blues de Tiradentes 2025, Minas Gerais - formação profissional para eventos especiais e casamentos em BH'
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
            Galeria de Fotos
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
