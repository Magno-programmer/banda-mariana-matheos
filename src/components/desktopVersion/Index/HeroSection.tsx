
import React from 'react';
import { useNavigate } from 'react-router-dom';
import LazyImage from '@/components/globalComponents/LazyImage';
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
        <div className="absolute top-20 left-0 w-32 h-32 border-2 border-jazz-gold rotate-45 animate-float"></div>
        <div className="absolute bottom-20 right-10 w-24 h-24 border-2 border-jazz-gold rotate-12 animate-float" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 left-0 w-16 h-16 border-2 border-jazz-gold rounded-full animate-float" style={{animationDelay: '2s'}}></div>
      </div>

      <div className="container mx-auto px-0 text-center animate-fade-in">
        {/* Logo Placeholder */}
        <div className="relative w-full max-h-screen overflow-hidden">
          {/* imagem de fundo */}
          <LazyImage
            src={bandaCompletaPalco}
            alt="Banda de Jazz Mariana Matheos em apresentação ao vivo - cantora profissional de jazz, soul e blues para eventos em Minas Gerais"
            className="absolute top-0 left-0 w-full min-h-auto object-cover z-0 opacity-50 fade-bottom"
          />

          {/* Conteúdo central sobreposto */}
          <div className="relative z-20 flex flex-col items-center justify-start h-full text-center text-jazz-gold px-4 ">
            <LazyImage
              src={logoGold}
              alt="Logo oficial da Banda de Jazz Mariana Matheos - música ao vivo para casamentos, eventos corporativos e festivais"
              className="hidden sm:block w-[30%] mt-[15%] pb-[15%] object-contain drop-shadow-lg"
            />
          </div>
        </div>

        {/* Main Slogan */}
        <h1 className="font-glimmer mt-8 text-7xl font-bold text-white mb-6 jazz-text-shadow leading-tight">
          Mariana Matheos - Banda de Jazz
        </h1>
        <h2 className="font-glimmer text-4xl font-bold jazz-gold mb-4 jazz-text-shadow">
          Música Jazz Ao Vivo para Eventos Sofisticados
        </h2>
        <h3 className="font-gatsby text-2xl text-gray-200 mb-8 leading-relaxed">
          Casamentos • Eventos Corporativos • Festivais • Celebrações Especiais em Minas Gerais
        </h3>

        {/* Divisor decorativo acima */}
        <div className="w-full flex justify-center mb-4">
          <LazyImage
            src={lineArtDeco}
            alt="Divisor Art Déco"
            className="w-[50%] object-contain"
          />
        </div>

        {/* CTA Button */}
        <div className="relative w-[100%] h-[200px] mx-auto">
          <LazyImage 
            src={bordabuttonArtDeco} 
            alt="Moldura decorativa do botão"
            className="absolute inset-0 w-full h-full object-contain pointer-events-none z-10"
          />
          <button
            onClick={() => navigate('/sobre')}
            className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 font-gatsby text-lg px-6 py-2 mt-[120px] h-[80px] w-[255px] pb-2 text-jazz-gold hover:bg-jazz-gold hover:text-black transition-all duration-300 tracking-wider uppercase font-semibold z-0"
          >
            Conheça nossa Banda de jazz
          </button> {/* Botão de rolagem suave para a seção "Sobre" versão desktop*/}

        </div>
      </div>
    </section>
  );
};

export default HeroSection;
