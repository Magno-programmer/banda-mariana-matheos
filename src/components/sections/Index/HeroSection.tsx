
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import logoGold from '/images/Logo-Mariana-Matheos-Jazz-textura-dourada-fundo-transparente.avif';
import bandaCompletaPalco from '/images/imagem-da-banda.avif';
import logoWhite from '/images/Logo-Mariana-Matheos-Jazz-textura-dourada-fundo-transparente-invertida.avif';
import lineArtDeco from '/images/divisor-de-sessao.avif';
import bordabuttonArtDeco from '/images/divisor-de-botao.avif';
import { useAdvancedViewport } from '@/hooks/useAdvancedViewport';
import TestimonialSection from './HeroTwoSection';

const HeroSection = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isMobile, isTablet } = useAdvancedViewport();
  
  // Check if we're on the index page to determine heading hierarchy
  const isIndexPage = location.pathname === '/';

  const titleSize = isMobile ? 'text-4xl' : isTablet ? 'text-5xl' : 'text-7xl';
  const subtitleSize = isMobile ? 'text-2xl' : isTablet ? 'text-3xl' : 'text-5xl';
  const logoWidth = isMobile ? 'w-[30%]' : isTablet ? 'w-[30%]' : 'w-[30%]';
  const buttonSize = isMobile ? 'text-sm px-4 py-2 h-[60px] w-[200px]' : isTablet ? 'text-base px-5 py-2 h-[70px] w-[225px]' : 'text-lg px-6 py-2 h-[80px] w-[255px]';
  const containerHeight = isMobile ? 'h-[150px]' : isTablet ? 'h-[175px]' : 'h-[200px]';
  const buttonMargin = isMobile ? 'mt-[90px]' : isTablet ? 'mt-[105px]' : 'mt-[120px]';

  return (
    <section 
      id="main-content" 
      className="min-h-screen jazz-gradient flex flex-col items-center justify-center relative overflow-hidden"
      role="main"
      aria-label="Seção principal - Apresentação da Banda Mariana Matheos"
    >
      {/* Decorative Art Deco elements */}
      <div className="absolute opacity-10" aria-hidden="true">
        <div className="absolute top-20 left-0 w-32 h-32 border-2 border-jazz-gold rotate-45 animate-float"></div>
        <div className="absolute bottom-20 right-10 w-24 h-24 border-2 border-jazz-gold rotate-12 animate-float" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 left-0 w-16 h-16 border-2 border-jazz-gold rounded-full animate-float" style={{animationDelay: '2s'}}></div>
      </div>

      <div className="container mx-auto px-0 text-center animate-fade-in">
        {/* Logo Placeholder */}
        <div className="relative w-full max-h-screen overflow-hidden">
          {/* imagem de fundo */}
          <img
            src={bandaCompletaPalco}
            alt="Banda de jazz Mariana Matheos em show ao vivo no Festival Jazz & Blues Tiradentes 2024, Minas Gerais - música para casamentos e eventos corporativos BH"
            className="absolute top-0 left-0 w-full min-h-auto object-cover z-0 opacity-50 fade-bottom"
            loading="lazy"
          />

          {/* Conteúdo central sobreposto */}
          <div className="relative z-20 flex flex-col items-center justify-start h-full text-center text-jazz-gold px-4 ">
            <img
              src={logoGold}
              alt="Logotipo Mariana Matheos Jazz Band - banda de jazz profissional para casamentos e eventos em Belo Horizonte, Minas Gerais"
              className={`${logoWidth} mt-[25%] pb-[15%] object-contain drop-shadow-lg`}
              loading="eager"
            />
          </div>
        </div>

        {/* Main Slogan */}
        {isIndexPage ? (
          <>
            <h1 className={`font-glimmer mt-8 ${titleSize} font-bold text-white mb-6 jazz-text-shadow leading-tight`}>
              Mariana Matheos
            </h1>
            <h2 className={`font-glimmer ${subtitleSize} font-bold jazz-gold mb-8 jazz-text-shadow ${isMobile ? 'px-4' : ''}`}>
              Uma experiência sofisticada, atemporal e arrebatadora
            </h2>
          </>
        ) : (
          <>
            <div className={`font-glimmer mt-8 ${titleSize} font-bold text-white mb-6 jazz-text-shadow leading-tight`}>
              Mariana Matheos
            </div>
            <div className={`font-glimmer ${subtitleSize} font-bold jazz-gold mb-8 jazz-text-shadow ${isMobile ? 'px-4' : ''}`}>
              Uma experiência sofisticada, atemporal e arrebatadora
            </div>
          </>
        )}

        {/* Divisor decorativo acima */}
        <div className="w-full flex justify-center mb-4">
          <img
            src={lineArtDeco}
            alt=""
            className="w-[50%] object-contain"
            aria-hidden="true"
            loading="lazy"
          />
        </div>

        {/* CTA Button */}
        <div className={`relative w-[100%] ${containerHeight} mx-auto`}>
          <img 
            src={bordabuttonArtDeco} 
            alt=""
            className="absolute inset-0 w-full h-full object-contain pointer-events-none z-10"
            aria-hidden="true"
            loading="lazy"
          />
          <button
            onClick={() => navigate('/sobre')}
            className={`absolute left-1/2 -translate-x-1/2 -translate-y-1/2 font-gatsby ${buttonSize} ${buttonMargin} pb-2 text-jazz-gold hover:bg-jazz-gold hover:text-black focus:bg-jazz-gold focus:text-black transition-all duration-300 tracking-wider uppercase font-semibold z-0 focus:outline-none focus:ring-2 focus:ring-jazz-gold focus:ring-offset-2 focus:ring-offset-black rounded`}
            aria-label="Conheça nossa Banda de Jazz - Ir para página sobre"
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                navigate('/sobre');
              }
            }}
          >
            Conheça nossa Banda de jazz
          </button>
        </div>
      </div>
      
      {isIndexPage && <TestimonialSection />}
    </section>
  );
};

export default HeroSection;
