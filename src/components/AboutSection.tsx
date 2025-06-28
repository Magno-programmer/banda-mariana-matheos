
import React from 'react';
import marianaPerformanceRedHat from '@/assets/images/mariana-performance-red-hat.jpg';

const AboutSection = () => {
  return (
    <section id="sobre" className="py-20 bg-black relative">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 right-10 text-9xl font-glimmer text-jazz-gold">♪</div>
        <div className="absolute bottom-10 left-10 text-7xl font-glimmer text-jazz-gold">♫</div>
      </div>

      <div className="container mx-auto px-6 relative">
        <div className="max-w-6xl mx-auto">
          {/* Section Title */}
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="font-glimmer text-5xl md:text-6xl font-bold jazz-gold mb-4 jazz-text-shadow">
              Sobre a Banda
            </h2>
            <div className="flex items-center justify-center">
              <div className="h-px bg-jazz-gold w-20"></div>
              <div className="mx-4 w-3 h-3 bg-jazz-gold rounded-full"></div>
              <div className="h-px bg-jazz-gold w-20"></div>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Text Content */}
            <div className="animate-fade-in">
              <div className="space-y-6 font-gatsby text-lg leading-relaxed text-gray-300">
                <p className="text-xl text-white first-letter:text-4xl first-letter:font-glimmer first-letter:text-jazz-gold first-letter:float-left first-letter:mr-3 first-letter:mt-1">
                  A banda <span className="jazz-gold font-semibold">Mariana Matheos</span> oferece muito mais do que música ao vivo — entrega uma experiência sensorial sofisticada, envolvente e memorável. Inspirada na Era de Ouro do Jazz (1920–1960), sua sonoridade reflete o requinte de um tempo em que a arte de tocar era também a arte de emocionar.
                </p>
                
                <p>
                  Sob a liderança da cantora <span className="jazz-gold font-semibold">Mariana Matheos</span>, cuja voz combina elegância, carisma e intensidade emocional, o grupo apresenta performances sob medida para eventos que exigem <span className="jazz-gold font-semibold">excelência estética e sonora</span>.
                </p>
                
                <p>
                  Cada apresentação é um espetáculo completo — com figurinos planejados, repertório personalizado e presença cênica. É música viva, com alma, para eventos verdadeiramente especiais.
                </p>
              </div>

              {/* Quote */}
              <div className="mt-8 p-6 border-l-4 border-jazz-gold bg-jazz-dark bg-opacity-20">
                <p className="font-glimmer text-xl jazz-gold italic">
                  "A música é a linguagem universal da alma, e nós falamos fluentemente."
                </p>
                <p className="font-gatsby text-sm text-gray-400 mt-2">— Mariana Matheos</p>
              </div>
            </div>

            {/* Image Placeholder */}
            <div className="animate-scale-in">
              <div className="relative">
                {/* Art Deco frame */}
                <div className="absolute -inset-4 border-4 border-jazz-gold opacity-50 transform rotate-2"></div>
                <div className="relative bg-gradient-to-br from-jazz-dark to-black h-96 flex items-center justify-center overflow-hidden">
                  <img 
                    src={marianaPerformanceRedHat}
                    alt="Mariana Matheos Jazz Band" 
                    className="w-full h-full object-cover filter sepia-[0.3] contrast-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
