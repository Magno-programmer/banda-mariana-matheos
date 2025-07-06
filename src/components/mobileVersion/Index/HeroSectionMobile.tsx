
import React from 'react';
import { useNavigate } from 'react-router-dom';
import logoGold from '@/assets/images/Logo-Mariana-Matheos-Jazz-textura-dourada-fundo-transparente.png';
import bandaCompletaPalco from '@/assets/images/imagem-da-banda.jpg';
import logoWhite from '@/assets/images/Logo-Mariana-Matheos-Jazz-textura-dourada-fundo-transparente-invertida.png';
import lineArtDeco from '@/assets/images/divisor-de-sessao.png';
import bordabuttonArtDeco from '@/assets/images/divisor-de-botao.png';

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <section className="min-h-screen jazz-gradient flex flex-col items-center justify-center relative overflow-hidden">
      {/* Decorative Art Deco elements */}
      <div className="absolute opacity-10">
        <div className="absolute left-0 w-32 h-32 border-2 border-jazz-gold rotate-45 animate-float"></div>
        <div className="absolute bottom-20 right-10 w-24 h-24 border-2 border-jazz-gold rotate-12 animate-float" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 left-0 w-16 h-16 border-2 border-jazz-gold rounded-full animate-float" style={{animationDelay: '2s'}}></div>
      </div>

      <div className="container mx-auto px-0 text-center animate-fade-in">
        {/* Logo Placeholder */}
        <div className="relative w-full overflow-hidden">
          {/* imagem de fundo */}
          <img
            src={bandaCompletaPalco}
            alt="Banda de jazz soul blues R&B Mariana Matheos em apresentação ao vivo em Belo Horizonte MG"
            className="relative top-0 left-0 w-full object-cover z-0 opacity-50 fade-bottom"
          />

          {/* Logo no canto superior esquerdo */}
          <div className="absolute top-2 left-4 z-50">
            <img
              src={logoWhite}
              alt="Logo Banda Mariana Matheos - Jazz Soul Blues R&B para casamentos e eventos BH"
              className="h-16 object-contain fixed"
            />
          </div>

          {/* Conteúdo central sobreposto */}
          <div className="absolute mt-20 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center h-full text-center text-jazz-gold ">
            <img
              src={logoGold}
              alt="Banda de Jazz Soul Blues R&B Mariana Matheos - Música ao vivo para eventos especiais em Belo Horizonte"
              className="w-32 h-32 object-contain drop-shadow-lg"
            />
          </div>

          {/* Main SEO Optimized H1 for Mobile */}
          <h1 className="font-glimmer mt-8 text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 jazz-text-shadow leading-tight">
            Banda de Jazz Soul Blues R&B BH
          </h1>
          <h2 className="font-glimmer text-3xl md:text-5xl lg:text-6xl font-bold jazz-gold mb-8 jazz-text-shadow">
            Música ao Vivo para Casamentos e Eventos em MG
          </h2>

          {/* Divisor decorativo acima */}
          <div className="w-full flex justify-center mb-4">
            <img
              src={lineArtDeco}
              alt="Divisor decorativo Art Déco - Banda de jazz para eventos"
              className="w-[80%] object-contain"
            />
          </div>

          {/* SEO Optimized CTA Button */}
          <div className="relative w-[100%] h-[200px] mx-auto">
            <img 
              src={bordabuttonArtDeco} 
              alt="Moldura decorativa do botão - Agendar banda de jazz para evento"
              className="absolute inset-0 w-full h-full object-contain pointer-events-none z-10"
            />
            <button
              onClick={() => navigate('/sobre')}
              className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 font-gatsby text-lg mt-[119px] h-[75px] w-[253px] text-jazz-gold hover:bg-jazz-gold hover:text-black 
              hover:cursor-pointer transition-all duration-300 tracking-wider uppercase font-semibold z-20"
              aria-label="Contratar banda de jazz soul blues para meu evento em BH"
            >
              Agendar Show de Jazz Soul
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
