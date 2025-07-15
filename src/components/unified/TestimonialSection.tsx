import React from 'react';
import { useAdvancedViewport } from '@/hooks/useAdvancedViewport';

const TestimonialSection = () => {
  const { isMobile, isTablet } = useAdvancedViewport();

  const titleSize = isMobile ? 'text-4xl' : isTablet ? 'text-5xl' : 'text-6xl';
  const subtitleSize = isMobile ? 'text-xl' : isTablet ? 'text-2xl' : 'text-3xl';
  const quoteSize = isMobile ? 'text-2xl' : isTablet ? 'text-3xl' : 'text-4xl';
  const descriptionSize = isMobile ? 'text-lg' : isTablet ? 'text-xl' : 'text-2xl';

  return (
    <section className="py-20 bg-black relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/2 left-10 text-9xl font-glimmer text-jazz-gold transform -rotate-12">♫</div>
        <div className="absolute top-1/2 right-10 text-7xl font-glimmer text-jazz-gold transform rotate-12">♪</div>
      </div>

      <div className="container mx-auto px-6 relative">
        {/* Section Title */}
        <div className="text-center mb-12 animate-fade-in">
          <h2 className={`font-glimmer ${titleSize} font-bold jazz-gold mb-6 jazz-text-shadow`}>
            Experiência Musical Única
          </h2>
          <p className={`font-gatsbybold ${subtitleSize} text-gray-300 max-w-4xl mx-auto leading-relaxed`}>
            Uma jornada sonora que transcende o tempo, conectando o passado glorioso do jazz com a sensibilidade contemporânea
          </p>
        </div>

        {/* Main Quote */}
        <div className="text-center mb-12 animate-scale-in">
          <div className="relative max-w-5xl mx-auto">
            <div className="absolute -top-8 -left-8 text-8xl font-glimmer jazz-gold opacity-30">"</div>
            <div className="absolute -bottom-8 -right-8 text-8xl font-glimmer jazz-gold opacity-30">"</div>
            <blockquote className={`font-glimmer ${quoteSize} jazz-gold font-bold italic mb-6 relative z-10`}>
              Da nostalgia vintage à sofisticação contemporânea
            </blockquote>
          </div>
        </div>

        {/* Description */}
        <div className="text-center animate-fade-in">
          <p className={`font-gatsbybold ${descriptionSize} text-gray-100 max-w-4xl mx-auto leading-relaxed mb-8`}>
            Cada apresentação é uma viagem no tempo, onde os clássicos do jazz ganham vida através de interpretações autênticas e envolventes. 
            A atmosfera única criada pela banda transporta o público para a Era de Ouro da música, 
            proporcionando momentos de pura magia e conexão emocional.
          </p>
          <p className={`font-gatsby ${descriptionSize} text-gray-100 mt-8 italic`}>
            Uma experiência que permanece na alma muito depois da última nota
          </p>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;