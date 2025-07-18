import React, { useState } from "react";
import { Helmet } from 'react-helmet-async';
import { generateVideoSchema } from '@/utils/schemaGenerators';
import { useAdvancedViewport } from "@/hooks/useAdvancedViewport";

const VideosSection = () => {
  const videoData = [
    {
      id: "3vUOFhwE134",
      title: "Summertime (Festival Jazz & Blues)",
      description: "Performance da Mariana Matheos Jazz Band interpretando o clássico Summertime no Festival Jazz & Blues de Tiradentes, MG.",
      uploadDate: "2024-01-15"
    },
    {
      id: "CO_yWe9z8S0", 
      title: "All About That Bass - Postmodern Jukebox Cover (Matozinhos)",
      description: "Versão jazz do hit All About That Bass em apresentação especial em Matozinhos, MG.",
      uploadDate: "2024-02-20"
    },
    {
      id: "h8z62Ae5a9Q",
      title: "Blue Moon - Billie Holiday (Festival Jazz & Blues)",
      description: "Interpretação do clássico Blue Moon de Billie Holiday no Festival Jazz & Blues.",
      uploadDate: "2024-03-10"
    }
  ];

  const videoSchemas = videoData.map(video => generateVideoSchema({
    name: video.title,
    description: video.description,
    thumbnailUrl: `https://img.youtube.com/vi/${video.id}/maxresdefault.jpg`,
    uploadDate: video.uploadDate,
    duration: "PT3M30S",
    embedUrl: `https://www.youtube.com/embed/${video.id}`,
    contentUrl: `https://www.youtube.com/watch?v=${video.id}`
  }));
    
  const [videoOpen, setVideoOpen] = useState(false);
  const [videoUrl, setVideoUrl] = useState("https://www.youtube.com/embed/3vUOFhwE134");
  const { isMiniMobile, isMobile, isMiniTablet, isTablet } = useAdvancedViewport();

  const thumbnailUrl = "https://img.youtube.com/vi/3vUOFhwE134/hqdefault.jpg";

  const handleVideoSelect = (id: string) => {
    setVideoUrl(`https://www.youtube.com/embed/${id}`);
    setVideoOpen(true);
  };

  const titleSize = isMobile ? 'text-3xl' : isTablet ? 'text-4xl' : 'text-5xl';
  const textSize = isMobile ? 'text-lg' : isTablet ? 'text-xl' : 'text-2xl';
  const videoHeight = isMiniMobile ? 'h-[70%]' : isMobile ? 'h-[346px]' : isMiniTablet ? 'h-[380px]' : isTablet ? 'h-[390px]' : 'h-[450px]';
  const videoWidth = isMobile ? 'w-full' : isMiniTablet ? 'w-[500px]' : isTablet ? 'w-[600px]' : 'w-[700px]';
  const gridCols = isMobile ? 'grid-cols-1' : isTablet ? 'grid-cols-2' : 'grid-cols-3';
  const buttonTextSize = isMobile ? 'text-sm' : isTablet ? 'text-base' : 'text-xl';

  return (
    <>
      <Helmet>
        {videoSchemas.map((schema, index) => (
          <script key={`video-schema-${index}`} type="application/ld+json">
            {JSON.stringify(schema)}
          </script>
        ))}
      </Helmet>
      
      <section className="py-20 jazz-gradient relative">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-10 left-10 w-40 h-40 border border-jazz-gold rotate-45"></div>
          <div className="absolute bottom-10 right-10 w-32 h-32 border border-jazz-gold rotate-12"></div>
        </div>

        <div className="max-w-3xl mx-auto animate-fade-in">
          <div className="text-center mb-8">
            <h1 className={`font-glimmer ${titleSize} font-bold jazz-gold mb-4`}>Vídeos e Performances</h1>
            <p className={`font-gatsbybold text-gray-400 ${textSize}`}>Assista um trecho da apresentação</p>
          </div>

          <div className={`relative bg-jazz-dark ${videoHeight} border border-jazz-dark border-opacity-50 flex items-center justify-center mx-auto`}>
            {videoOpen ? (
              <iframe
                className="w-full h-full"
                src={`${videoUrl}?autoplay=1`}
                title="Vídeo da Mariana Matheos"
                frameBorder="0"
                allow="autoplay; encrypted-media"
                allowFullScreen
              />
            ) : (
              <div className="text-center">
                <div
                  onClick={() => setVideoOpen(true)}
                  className="relative w-full h-full cursor-pointer group"
                >
                  <img
                    src={thumbnailUrl}
                    alt="Vídeo performance da banda Mariana Matheos Jazz tocando Summertime no Festival Jazz & Blues de Tiradentes, Minas Gerais - música ao vivo para casamentos e eventos em BH"
                    className={`${videoHeight} ${videoWidth} object-cover`}
                    loading="lazy"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40 group-hover:bg-black/60 transition">
                    <div className="w-16 h-16 border-2 border-jazz-gold rounded-full flex items-center justify-center hover:bg-jazz-gold hover:text-black transition text-jazz-gold text-3xl">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-8 h-8"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-6.197-3.6A1 1 0 007 8.5v7a1 1 0 001.555.832l6.197-3.6a1 1 0 000-1.664z" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className={`mt-6 grid ${gridCols} gap-4`}>
            {videoData.map((video, index) => (
              <button
                key={index}
                onClick={() => handleVideoSelect(video.id)}
                className={`font-gatsbybold ${buttonTextSize} px-4 py-2 border border-jazz-gold text-jazz-gold hover:bg-jazz-gold hover:text-black transition z-20`}
              >
                {video.title}
              </button>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default VideosSection;