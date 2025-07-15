import React, { useState } from 'react';
import { Camera, Calendar, MapPin, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useResponsiveComponent } from '@/hooks/useResponsiveComponent';

const ImagesSection = () => {
  const { styles, isMobile } = useResponsiveComponent();
  const [selectedImage, setSelectedImage] = useState<any>(null);

  const imageCategories = [
    {
      title: "Apresentações em Casamentos",
      description: "Momentos especiais capturados em cerimônias e recepções",
      images: [
        {
          src: "/images/cantora.png",
          alt: "Mariana Matheos cantando em casamento",
          date: "2024-05-15",
          venue: "Igreja São José",
          description: "Interpretação emocionante de 'At Last' durante cerimônia"
        },
        {
          src: "/images/banda.png",
          alt: "Banda tocando em recepção",
          date: "2024-04-20",
          venue: "Clube Campestre",
          description: "Banda completa durante recepção de casamento"
        },
        {
          src: "/images/pianista.png",
          alt: "Pianista da banda",
          date: "2024-03-18",
          venue: "Espaço Villa Real",
          description: "Momento intimista ao piano durante cerimônia"
        }
      ]
    },
    {
      title: "Shows em Casas Noturnas",
      description: "Apresentações ao vivo em ambientes intimistas",
      images: [
        {
          src: "/images/banda-blue-jazz-concurso.png",
          alt: "Show no Soul Jazz Burguer",
          date: "2024-06-10",
          venue: "Soul Jazz Burguer",
          description: "Apresentação especial com repertório de jazz e soul"
        },
        {
          src: "/images/cantora.png",
          alt: "Mariana no The Bulltique",
          date: "2024-05-25",
          venue: "The Bulltique Vino Bar",
          description: "Performance íntima no palco do The Bulltique"
        },
        {
          src: "/images/baterista.png",
          alt: "Baterista da banda",
          date: "2024-05-20",
          venue: "Café com Letras",
          description: "Groove perfeito em apresentação intimista"
        }
      ]
    },
    {
      title: "Eventos Corporativos",
      description: "Música profissional para empresas e confraternizações",
      images: [
        {
          src: "/images/banda.png",
          alt: "Evento corporativo",
          date: "2024-03-18",
          venue: "Hotel Mercure",
          description: "Apresentação em jantar empresarial"
        },
        {
          src: "/images/baixista.png",
          alt: "Baixista em evento",
          date: "2024-02-14",
          venue: "Restaurante Amici",
          description: "Base harmônica sólida em evento corporativo"
        }
      ]
    },
    {
      title: "Ensaios e Bastidores",
      description: "Momentos de preparação e descontração da banda",
      images: [
        {
          src: "/images/imagem-da-banda.jpg",
          alt: "Banda em ensaio",
          date: "2024-06-01",
          venue: "Estúdio de Ensaio",
          description: "Preparação para show especial"
        },
        {
          src: "/images/banda-blue-jazz-concurso.png",
          alt: "Banda nos bastidores",
          date: "2024-05-30",
          venue: "Backstage",
          description: "Momento de descontração antes do show"
        }
      ]
    }
  ];

  const openLightbox = (image: any, categoryIndex: number, imageIndex: number) => {
    setSelectedImage({ ...image, categoryIndex, imageIndex });
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const navigateImage = (direction: 'prev' | 'next') => {
    if (!selectedImage) return;
    
    const currentCategory = imageCategories[selectedImage.categoryIndex];
    const currentIndex = selectedImage.imageIndex;
    
    let newIndex;
    if (direction === 'prev') {
      newIndex = currentIndex > 0 ? currentIndex - 1 : currentCategory.images.length - 1;
    } else {
      newIndex = currentIndex < currentCategory.images.length - 1 ? currentIndex + 1 : 0;
    }
    
    const newImage = currentCategory.images[newIndex];
    setSelectedImage({
      ...newImage,
      categoryIndex: selectedImage.categoryIndex,
      imageIndex: newIndex
    });
  };

  return (
    <section className="py-20 bg-black relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 text-9xl font-glimmer text-jazz-gold transform -rotate-12">♪</div>
        <div className="absolute bottom-20 right-10 text-7xl font-glimmer text-jazz-gold transform rotate-12">♫</div>
      </div>

      <div className={styles.container}>
        <div className="text-center mb-16">
          <h1 className={`font-gatsby ${styles.text.xlarge} text-jazz-gold mb-6`}>
            Galeria de Fotos
          </h1>
          <p className={`font-gatsby ${styles.text.medium} text-gray-300 max-w-3xl mx-auto`}>
            Fotos das apresentações da Mariana Matheos Jazz Band em eventos, casamentos e shows. 
            Veja a banda em ação!
          </p>
        </div>

        {/* Image Categories */}
        {imageCategories.map((category, categoryIndex) => (
          <div key={categoryIndex} className="mb-16">
            <h2 className={`font-gatsby ${styles.text.large} text-jazz-gold mb-4`}>
              {category.title}
            </h2>
            <p className={`font-gatsby ${styles.text.medium} text-gray-300 mb-8`}>
              {category.description}
            </p>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {category.images.map((image, imageIndex) => (
                <div 
                  key={imageIndex} 
                  className="bg-gray-900 rounded-lg border border-gray-700 hover:border-jazz-gold/50 transition-all duration-300 overflow-hidden cursor-pointer"
                  onClick={() => openLightbox(image, categoryIndex, imageIndex)}
                >
                  <div className="relative group">
                    <img 
                      src={image.src} 
                      alt={image.alt}
                      className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <Camera className="w-8 h-8 text-jazz-gold" />
                    </div>
                  </div>
                  
                  <div className="p-4">
                    <h3 className={`font-gatsby ${isMobile ? 'text-sm' : 'text-base'} text-jazz-gold mb-2`}>
                      {image.description}
                    </h3>
                    
                    <div className="space-y-1 text-xs">
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-3 h-3 text-jazz-gold" />
                        <span className="font-gatsby text-gray-300">
                          {new Date(image.date).toLocaleDateString('pt-BR')}
                        </span>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <MapPin className="w-3 h-3 text-jazz-gold" />
                        <span className="font-gatsby text-gray-300">{image.venue}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Call to Action */}
        <div className="text-center">
          <p className={`font-gatsby ${styles.text.medium} text-gray-400 mb-8`}>
            Quer registrar momentos especiais como esses no seu evento?
          </p>
          <a
            href="https://wa.me/5531997522127?text=Olá! Vi as fotos da Mariana Matheos e gostaria de contratar para meu evento"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center bg-jazz-gold hover:bg-jazz-gold/90 text-black px-8 py-3 rounded-lg font-gatsby text-lg transition-all duration-300"
          >
            Solicitar Orçamento
          </a>
        </div>
      </div>

      {/* Lightbox */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4">
          <div className="relative max-w-4xl max-h-full">
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 text-white hover:text-jazz-gold transition-colors z-10"
            >
              <X className="w-8 h-8" />
            </button>
            
            <button
              onClick={() => navigateImage('prev')}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:text-jazz-gold transition-colors z-10"
            >
              <ChevronLeft className="w-8 h-8" />
            </button>
            
            <button
              onClick={() => navigateImage('next')}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-jazz-gold transition-colors z-10"
            >
              <ChevronRight className="w-8 h-8" />
            </button>
            
            <img
              src={selectedImage.src}
              alt={selectedImage.alt}
              className="max-w-full max-h-full object-contain"
            />
            
            <div className="absolute bottom-4 left-4 right-4 bg-black/70 text-white p-4 rounded-lg">
              <h3 className="font-gatsby text-jazz-gold mb-2">{selectedImage.description}</h3>
              <div className="flex items-center space-x-4 text-sm">
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4 text-jazz-gold" />
                  <span>{new Date(selectedImage.date).toLocaleDateString('pt-BR')}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4 text-jazz-gold" />
                  <span>{selectedImage.venue}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default ImagesSection;