
import React from 'react';

const HeroSection = () => {
  return (
    <section className="min-h-screen jazz-gradient flex flex-col items-center justify-center relative overflow-hidden">
      {/* Decorative Art Deco elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-32 h-32 border-2 border-jazz-gold rotate-45 animate-float"></div>
        <div className="absolute bottom-20 right-10 w-24 h-24 border-2 border-jazz-gold rotate-12 animate-float" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 left-20 w-16 h-16 border-2 border-jazz-gold rounded-full animate-float" style={{animationDelay: '2s'}}></div>
      </div>

      <div className="container mx-auto px-6 text-center animate-fade-in">
        {/* Logo Placeholder */}
        <div className="mb-8 animate-scale-in">
          <div className="mx-auto w-80 h-32 bg-gradient-to-r from-jazz-gold to-yellow-300 rounded-lg flex items-center justify-center mb-6 shadow-2xl">
            <span className="font-glimmer text-2xl font-bold text-black">
              MARIANA MATHEOS
            </span>
          </div>
          <p className="text-jazz-gold font-gatsby text-lg tracking-wider">JAZZ BAND</p>
        </div>

        {/* Main Slogan */}
        <h1 className="font-glimmer text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 jazz-text-shadow leading-tight">
          Uma experiência musical
        </h1>
        <h2 className="font-glimmer text-3xl md:text-5xl lg:text-6xl font-bold jazz-gold mb-8 jazz-text-shadow">
          sofisticada, atemporal e arrebatadora
        </h2>

        {/* Decorative line */}
        <div className="flex items-center justify-center mb-8">
          <div className="h-px bg-jazz-gold w-16"></div>
          <div className="mx-4 w-2 h-2 bg-jazz-gold rounded-full"></div>
          <div className="h-px bg-jazz-gold w-16"></div>
        </div>

        {/* CTA Button */}
        <a 
          href="#sobre" 
          className="inline-block font-gatsby text-lg px-8 py-4 border-2 border-jazz-gold text-jazz-gold hover:bg-jazz-gold hover:text-black transition-all duration-300 tracking-wider uppercase font-semibold"
        >
          Descubra Nossa História
        </a>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-jazz-gold rounded-full flex justify-center">
          <div className="w-1 h-3 bg-jazz-gold rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
