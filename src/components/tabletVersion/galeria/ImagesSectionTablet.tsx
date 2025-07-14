import React, {useState, useRef} from 'react';
import lineArtDeco from '@/assets/images/divisor-de-sessao.png';

const ImageSection = () => {
  const [images, setImages] = useState(
    [
      { 
        src: '/images/cantora.png',
        alt: 'Mariana Matheos - Cantora e Criadora da Banda'
      },
      { 
        src: '/images/baixista.png',
        alt: 'Tarcíso Junior - Baixista e Guitarrista da Banda'
      },
      { 
        src: '/images/baterista.png',
        alt: 'Rubens Kalil - Baterista da Banda'
      },
      { 
        src: '/images/pianista.png',
        alt: 'Carlos Nobre - Pianista da Banda'
      },
      { 
        src: '/images/banda-blue-jazz-concurso.png',
        alt: 'Mariana Matheos no Festival de Jazz & Blues de Tiradentes 2025'
      },
    ]
  );

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
          <h2 className="font-glimmer text-5xl md:text-6xl font-bold jazz-gold mb-4 jazz-text-shadow">
            Galeria
          </h2>
            {/* Divisor decorativo acima */}
            <div className="w-full flex justify-center mb-4">
              <img
                src={lineArtDeco}
                alt="Divisor Art Déco"
                className="w-[50%] object-contain"
              />
            </div>
          <p className="font-gatsbybold text-3xl text-gray-400 max-w-2xl mx-auto">
            Momentos especiais capturados durante nossas apresentações exclusivas
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
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
                  className="w-full h-64 md:h-72 object-cover filter sepia-[0.2] contrast-110 group-hover:scale-110 transition-transform duration-500"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60"></div>
                
                {/* Hover effect */}
                <div className="absolute inset-0 bg-jazz-gold bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300"></div>

                {/* Caption */}
                <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <p className="font-gatsby text-white text-sm">{image.alt}</p>
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
