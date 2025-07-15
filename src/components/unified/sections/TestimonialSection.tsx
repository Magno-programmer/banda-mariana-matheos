import React from 'react';
import { useResponsiveComponent } from '@/hooks/useResponsiveComponent';

const TestimonialSection = () => {
  const { styles, isMobile, isTablet } = useResponsiveComponent();

  return (
    <section className="py-20 bg-black relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/2 left-10 text-9xl font-glimmer text-jazz-gold transform -rotate-12">♫</div>
        <div className="absolute top-1/2 right-10 text-7xl font-glimmer text-jazz-gold transform rotate-12">♪</div>
      </div>

      <div className={`${styles.container} relative`}>
        <div className="max-w-4xl mx-auto text-center animate-fade-in">
          {/* Decorative quotes */}
          <div className="relative">
            <div className="absolute -top-8 -left-8 text-8xl font-glimmer jazz-gold opacity-20">"</div>
            <div className="absolute -bottom-8 -right-8 text-8xl font-glimmer jazz-gold opacity-20">"</div>
            
            <div className="relative z-10 py-16">
              <h2 className={`font-glimmer ${styles.text.large} font-bold text-white mb-8 jazz-text-shadow leading-tight`}>
                Mais do que música.
              </h2>
              
              <div className="space-y-4">
                <p className={`font-glimmer ${styles.text.large} jazz-gold font-bold`}>
                  É memória.
                </p>
                <p className={`font-glimmer ${styles.text.large} jazz-gold font-bold`}>
                  É presença.
                </p>
                <p className={`font-glimmer ${styles.text.large} jazz-gold font-bold`}>
                  É sentimento.
                </p>
              </div>
            </div>
          </div>

          {/* Decorative musical elements */}
          <div className="flex justify-center items-center mt-12 space-x-8 animate-scale-in">
            <div className="w-12 h-12 border-2 border-jazz-gold rounded-full flex items-center justify-center opacity-70">
              <span className="text-jazz-gold text-lg">♪</span>
            </div>
            <div className="w-16 h-16 border-2 border-jazz-gold rounded-full flex items-center justify-center">
              <span className="text-jazz-gold text-xl">♫</span>
            </div>
            <div className="w-12 h-12 border-2 border-jazz-gold rounded-full flex items-center justify-center opacity-70">
              <span className="text-jazz-gold text-lg">♪</span>
            </div>
          </div>

          {/* Subtitle */}
          <p className={`font-gatsby ${styles.text.medium} text-gray-50 mt-8 italic`}>
            Uma experiência que permanece na alma muito depois da última nota
          </p>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;