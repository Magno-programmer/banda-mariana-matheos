
import React from 'react';

const TestimonialSection = () => {
  return (
    <section className="py-20 bg-black relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/2 left-10 text-9xl font-glimmer text-jazz-gold transform -rotate-12">♫</div>
        <div className="absolute top-1/2 right-10 text-7xl font-glimmer text-jazz-gold transform rotate-12">♪</div>
      </div>

      <div className="container mx-auto px-6 relative">
        <div className="max-w-4xl mx-auto text-center animate-fade-in">
          {/* Decorative quotes */}
          <div className="relative">
            <div className="absolute -top-8 -left-8 text-8xl font-glimmer jazz-gold opacity-20">"</div>
            <div className="absolute -bottom-8 -right-8 text-8xl font-glimmer jazz-gold opacity-20">"</div>
            
            <div className="relative z-10 py-16">
              <h2 className="font-glimmer text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8 jazz-text-shadow leading-tight">
                Mais do que música.
              </h2>
              
              <div className="space-y-4">
                <p className="font-glimmer text-3xl md:text-4xl jazz-gold font-bold">
                  É memória.
                </p>
                <p className="font-glimmer text-3xl md:text-4xl jazz-gold font-bold">
                  É presenÇa.
                </p>
                <p className="font-glimmer text-3xl md:text-4xl jazz-gold font-bold">
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
          <p className="font-gatsby text-2xl text-gray-50 mt-8 italic">
            Uma experiência que permanece na alma muito depois da última nota
          </p>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
