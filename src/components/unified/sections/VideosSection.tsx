import React from 'react';
import { Play, ExternalLink, Calendar, MapPin } from 'lucide-react';
import { useResponsiveComponent } from '@/hooks/useResponsiveComponent';

const VideosSection = () => {
  const { styles, isMobile } = useResponsiveComponent();

  const videoCategories = [
    {
      title: "Apresentações em Casamentos",
      description: "Momentos especiais capturados em cerimônias e recepções",
      videos: [
        {
          title: "Summertime - Casamento Ana & Pedro",
          date: "2024-05-15",
          venue: "Igreja São José",
          thumbnail: "/images/video-placeholder.jpg",
          duration: "3:45"
        },
        {
          title: "At Last - Recepção Marina & Carlos",
          date: "2024-04-20",
          venue: "Clube Campestre",
          thumbnail: "/images/video-placeholder.jpg",
          duration: "4:12"
        }
      ]
    },
    {
      title: "Shows em Casas Noturnas",
      description: "Apresentações ao vivo em ambientes intimistas",
      videos: [
        {
          title: "Fly Me to the Moon - Soul Jazz Burguer",
          date: "2024-06-10",
          venue: "Soul Jazz Burguer",
          thumbnail: "/images/video-placeholder.jpg",
          duration: "4:30"
        },
        {
          title: "Valerie - The Bulltique Vino Bar",
          date: "2024-05-25",
          venue: "The Bulltique Vino Bar",
          thumbnail: "/images/video-placeholder.jpg",
          duration: "3:55"
        }
      ]
    },
    {
      title: "Eventos Corporativos",
      description: "Música profissional para empresas e confraternizações",
      videos: [
        {
          title: "Blue Moon - Evento Corporativo",
          date: "2024-03-18",
          venue: "Hotel Mercure",
          thumbnail: "/images/video-placeholder.jpg",
          duration: "3:20"
        },
        {
          title: "The Girl from Ipanema - Jantar Empresarial",
          date: "2024-02-14",
          venue: "Restaurante Amici",
          thumbnail: "/images/video-placeholder.jpg",
          duration: "4:05"
        }
      ]
    }
  ];

  const testimonialVideos = [
    {
      title: "Depoimento - Noiva Ana Carolina",
      description: "\"A Mariana e a banda foram incríveis no nosso casamento!\"",
      date: "2024-05-16",
      thumbnail: "/images/testimonial-placeholder.jpg",
      duration: "1:30"
    },
    {
      title: "Depoimento - Soul Jazz Burguer",
      description: "\"Uma das melhores apresentações que já presenciei\"",
      date: "2024-06-11",
      thumbnail: "/images/testimonial-placeholder.jpg",
      duration: "1:45"
    }
  ];

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
            Galeria de Vídeos
          </h1>
          <p className={`font-gatsby ${styles.text.medium} text-gray-300 max-w-3xl mx-auto`}>
            Vídeos das apresentações da Mariana Matheos Jazz Band. Conheça nosso repertório 
            e qualidade musical em ação
          </p>
        </div>

        {/* Performance Videos */}
        {videoCategories.map((category, categoryIndex) => (
          <div key={categoryIndex} className="mb-16">
            <h2 className={`font-gatsby ${styles.text.large} text-jazz-gold mb-4`}>
              {category.title}
            </h2>
            <p className={`font-gatsby ${styles.text.medium} text-gray-300 mb-8`}>
              {category.description}
            </p>
            
            <div className="grid md:grid-cols-2 gap-8">
              {category.videos.map((video, index) => (
                <div key={index} className="bg-gray-900 rounded-lg border border-gray-700 hover:border-jazz-gold/50 transition-all duration-300 overflow-hidden">
                  <div className="relative">
                    <img 
                      src={video.thumbnail} 
                      alt={video.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                      <button className="bg-jazz-gold/90 text-black p-4 rounded-full hover:bg-jazz-gold transition-colors">
                        <Play className="w-8 h-8" />
                      </button>
                    </div>
                    <div className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-sm">
                      {video.duration}
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <h3 className={`font-gatsby ${styles.text.medium} text-jazz-gold mb-2`}>
                      {video.title}
                    </h3>
                    
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4 text-jazz-gold" />
                        <span className="font-gatsby text-gray-300">
                          {new Date(video.date).toLocaleDateString('pt-BR')}
                        </span>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <MapPin className="w-4 h-4 text-jazz-gold" />
                        <span className="font-gatsby text-gray-300">{video.venue}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Testimonial Videos */}
        <div className="mb-16">
          <h2 className={`font-gatsby ${styles.text.large} text-jazz-gold mb-4`}>
            Depoimentos em Vídeo
          </h2>
          <p className={`font-gatsby ${styles.text.medium} text-gray-300 mb-8`}>
            Clientes contam suas experiências com a Mariana Matheos Jazz Band
          </p>
          
          <div className="grid md:grid-cols-2 gap-8">
            {testimonialVideos.map((video, index) => (
              <div key={index} className="bg-gray-900 rounded-lg border border-gray-700 hover:border-jazz-gold/50 transition-all duration-300 overflow-hidden">
                <div className="relative">
                  <img 
                    src={video.thumbnail} 
                    alt={video.title}
                    className="w-full h-32 object-cover"
                  />
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                    <button className="bg-jazz-gold/90 text-black p-3 rounded-full hover:bg-jazz-gold transition-colors">
                      <Play className="w-6 h-6" />
                    </button>
                  </div>
                  <div className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-sm">
                    {video.duration}
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className={`font-gatsby ${styles.text.medium} text-jazz-gold mb-2`}>
                    {video.title}
                  </h3>
                  <p className="font-gatsby text-gray-300 text-sm italic mb-3">
                    {video.description}
                  </p>
                  
                  <div className="flex items-center space-x-2 text-sm">
                    <Calendar className="w-4 h-4 text-jazz-gold" />
                    <span className="font-gatsby text-gray-300">
                      {new Date(video.date).toLocaleDateString('pt-BR')}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Video Coming Soon */}
        <div className="bg-gray-900 p-8 rounded-lg border border-gray-700 mb-16">
          <div className="text-center">
            <h2 className={`font-gatsby ${styles.text.large} text-jazz-gold mb-4`}>
              Mais Vídeos em Breve
            </h2>
            <p className={`font-gatsby ${styles.text.medium} text-gray-300 mb-6`}>
              Estamos constantemente adicionando novos vídeos das nossas apresentações. 
              Acompanhe nossas redes sociais para não perder nenhuma novidade!
            </p>
            
            <div className="flex justify-center space-x-4">
              <a
                href="https://instagram.com/marianamatheosjazz"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-lg font-gatsby transition-all duration-300 hover:from-purple-600 hover:to-pink-600"
              >
                <ExternalLink className="w-5 h-5 mr-2" />
                Instagram
              </a>
              
              <a
                href="https://youtube.com/@marianamatheosjazz"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center bg-red-600 text-white px-6 py-3 rounded-lg font-gatsby transition-all duration-300 hover:bg-red-700"
              >
                <ExternalLink className="w-5 h-5 mr-2" />
                YouTube
              </a>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <p className={`font-gatsby ${styles.text.medium} text-gray-400 mb-8`}>
            Quer ver essa qualidade musical no seu evento?
          </p>
          <a
            href="https://wa.me/5531997522127?text=Olá! Vi os vídeos da Mariana Matheos e gostaria de contratar para meu evento"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center bg-jazz-gold hover:bg-jazz-gold/90 text-black px-8 py-3 rounded-lg font-gatsby text-lg transition-all duration-300"
          >
            Solicitar Orçamento
          </a>
        </div>
      </div>
    </section>
  );
};

export default VideosSection;