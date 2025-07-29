import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { generateImageObjectSchema, generateImageGallerySchema } from "@/utils/schemaGenerators";
import { useAdvancedViewport } from "@/hooks/useAdvancedViewport";
import { altTextGenerator } from "@/utils/advancedAltText";
import { useLocation } from "react-router-dom";
import lineArtDeco from '/images/divisor-de-sessao.avif';

// Enhanced images data with advanced alt text generation
const imagesData = [
  { 
    src: "/images/cantora.avif", 
    baseAlt: "Mariana Matheos, vocalista da banda de jazz",
    category: 'performance' as const,
    keywords: ['Mariana Matheos', 'vocalista jazz', 'cantora', 'performance ao vivo']
  },
  { 
    src: "/images/pianista.avif", 
    baseAlt: "Pianista da banda executando repertório jazz clássico",
    category: 'performance' as const,
    keywords: ['pianista jazz', 'piano', 'música instrumental', 'performance']
  },
  { 
    src: "/images/baixista.avif", 
    baseAlt: "Baixista em solo expressivo durante apresentação",
    category: 'performance' as const,
    keywords: ['baixista', 'contrabaixo', 'solo jazz', 'música instrumental']
  },
  { 
    src: "/images/baterista.avif", 
    baseAlt: "Baterista mantendo ritmo swing do jazz",
    category: 'performance' as const,
    keywords: ['baterista', 'bateria', 'swing', 'ritmo jazz']
  },
  { 
    src: "/images/banda.avif", 
    baseAlt: "Formação completa da banda de jazz",
    category: 'band' as const,
    keywords: ['banda completa', 'formação jazz', 'grupo musical', 'ensemble']
  }
];

const ImagesSection = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  
  // Generate advanced alt text for each image
  const images = imagesData.map(imageData => {
    const context = {
      page: currentPath,
      category: imageData.category,
      location: 'Belo Horizonte',
      keywords: imageData.keywords
    };
    
    const advancedAlt = altTextGenerator.generateAltText(
      imageData.baseAlt,
      context,
      {
        includeContext: true,
        includeLocation: true,
        localKeywords: true,
        maxLength: 120,
        screenReaderOptimized: true
      }
    );
    
    return {
      src: imageData.src,
      alt: advancedAlt,
      category: imageData.category,
      keywords: imageData.keywords
    };
  });

  // Generate enhanced image schemas for SEO
  const imageSchemas = images.map((image, index) => 
    generateImageObjectSchema({
      url: `https://marianamatheos.com.br${image.src}`,
      alt: image.alt,
      caption: image.alt,
      width: 800,
      height: 600,
      contentLocation: {
        name: 'Belo Horizonte',
        address: {
          addressLocality: 'Belo Horizonte',
          addressRegion: 'MG',
          addressCountry: 'BR'
        }
      },
      keywords: image.keywords.join(', '),
      creator: 'Mariana Matheos Jazz Band',
      copyrightHolder: 'Mariana Matheos Jazz Band',
      datePublished: new Date(2024, 0, 15 + index).toISOString().split('T')[0],
      representativeOfPage: index === 0
    })
  );

  // Generate gallery schema
  const gallerySchema = generateImageGallerySchema({
    name: 'Galeria de Fotos - Mariana Matheos Jazz Band',
    description: 'Fotos das apresentações da Mariana Matheos Jazz Band em eventos, casamentos e shows em Belo Horizonte',
    images: images.map(image => ({
      url: `https://marianamatheos.com.br${image.src}`,
      caption: image.alt,
      keywords: image.keywords.join(', ')
    })),
    author: 'Mariana Matheos Jazz Band',
    datePublished: '2024-01-15',
    location: {
      name: 'Belo Horizonte',
      address: {
        addressLocality: 'Belo Horizonte',
        addressRegion: 'MG', 
        addressCountry: 'BR'
      }
    }
  });

  const { isMiniMobile, isMobile, isMiniTablet, isTablet } = useAdvancedViewport();
  
  const titleSize = isMobile ? 'text-4xl' : isTablet ? 'text-5xl' : 'text-7xl';
  const textSize = isMobile ? 'text-lg' : isTablet ? 'text-xl' : 'text-2xl';
  const captionSize = isMobile ? 'text-sm' : isTablet ? 'text-base' : 'text-xl';
  const gridCols = isMiniMobile ? 'grid-cols-1' : isMobile ? 'grid-cols-2' : 'grid-cols-3';
  const imageHeight = isMiniMobile ? 'h-[55vh]' : isMobile ? 'h-56' : isMiniTablet ? 'h-72' : 'h-96';

  return (
    <>
      <Helmet>
        {/* Individual image schemas */}
        {imageSchemas.map((schema, index) => (
          <script key={`image-${index}`} type="application/ld+json">
            {JSON.stringify(schema)}
          </script>
        ))}
        {/* Gallery schema */}
        <script key="gallery" type="application/ld+json">
          {JSON.stringify(gallerySchema)}
        </script>
      </Helmet>
      
      <section className="py-20 jazz-gradient relative">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-10 left-10 w-40 h-40 border border-jazz-gold rotate-45"></div>
          <div className="absolute bottom-10 right-10 w-32 h-32 border border-jazz-gold rotate-12"></div>
        </div>

        <div className="container mx-auto px-6 relative">
          <div className="text-center mb-16 animate-fade-in">
            <h1 className={`font-glimmer ${titleSize} font-bold jazz-gold mb-4 jazz-text-shadow`}>
              Galeria de Fotos
            </h1>
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

          <div className={`grid ${gridCols} gap-6 max-w-6xl mx-auto`}>
            {images.map((image, index) => (
              <div 
                key={index}
                className="group animate-scale-in relative overflow-hidden cursor-pointer"
                style={{animationDelay: `${index * 0.1}s`}}
                onClick={() => setSelectedImageIndex(index)}
              >
                <div className="absolute -inset-2 border-2 border-jazz-gold opacity-0 group-hover:opacity-50 transition-opacity duration-300 z-10"></div>
                
                <div className="relative overflow-hidden bg-jazz-dark">
                  <img 
                    src={image.src}
                    alt={image.alt}
                    className={`w-full ${imageHeight} object-cover filter sepia-[0.2] contrast-110 group-hover:scale-110 transition-transform duration-500`}
                    loading="lazy"
                  />
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60"></div>
                  <div className="absolute inset-0 bg-jazz-gold bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300"></div>

                  <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <p className={`font-gatsbybold text-white ${captionSize}`}>{image.alt}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {selectedImageIndex !== null && (
            <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50" onClick={() => setSelectedImageIndex(null)}>
              <div className="relative max-w-4xl max-h-4xl p-4">
                <button 
                  onClick={() => setSelectedImageIndex(null)}
                  className="absolute top-4 right-4 text-white text-2xl hover:text-jazz-gold transition z-10"
                >
                  ✕
                </button>
                <img 
                  src={images[selectedImageIndex].src}
                  alt={images[selectedImageIndex].alt}
                  className="max-w-full max-h-full object-contain"
                />
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default ImagesSection;