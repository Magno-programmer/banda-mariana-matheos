import React from 'react';
import { useNavigate } from 'react-router-dom';
import logoGold from '@/assets/images/Logo-Mariana-Matheos-Jazz-textura-dourada-fundo-transparente.png';
import bandaCompletaPalco from '@/assets/images/imagem-da-banda.jpg';
import lineArtDeco from '@/assets/images/divisor-de-sessao.png';
import bordabuttonArtDeco from '@/assets/images/divisor-de-botao.png';
import { useResponsiveComponent } from '@/hooks/useResponsiveComponent';

const HeroSection = () => {
  const navigate = useNavigate();
  const { styles, layout, isMobile, isTablet } = useResponsiveComponent();

  const handleNavigation = (path: string) => {
    navigate(path);
  };

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
          {/* Background image */}
          <img
            src={bandaCompletaPalco}
            alt="Mariana Matheos em apresentação ao vivo do festival Jazz & Blues de Tiradentes em Nova Lima - MG"
            className="absolute top-0 left-0 w-full min-h-auto object-cover z-0 opacity-50 fade-bottom"
          />

          {/* Central content overlay */}
          <div className="relative z-20 flex flex-col items-center justify-start h-full text-center text-jazz-gold px-4">
            <img
              src={logoGold}
              alt="Logo oficial da Banda de Jazz Mariana Matheos com textura dourada"
              className={`${isMobile ? 'w-[60%] mt-[20%] pb-[20%]' : layout.imageSize + ' mt-[15%] pb-[15%]'} object-contain drop-shadow-lg ${isMobile ? 'block' : 'hidden sm:block'}`}
            />
          </div>
        </div>

        {/* Main Slogan */}
        <h1 className={`font-glimmer ${styles.spacing.small} ${styles.text.xlarge} font-bold text-white mb-6 jazz-text-shadow leading-tight`}>
          Mariana Matheos
        </h1>
        <h2 className={`font-glimmer ${styles.text.large} font-bold jazz-gold mb-8 jazz-text-shadow`}>
          Uma experiência {isMobile ? 'musical ' : ''}sofisticada, atemporal e arrebatadora
        </h2>

        {/* Decorative divider */}
        <div className="w-full flex justify-center mb-4">
          <img
            src={lineArtDeco}
            alt="Divisor decorativo Art Déco"
            className="w-[50%] object-contain"
            aria-hidden="true"
          />
        </div>

        {/* CTA Button */}
        <div className="relative w-[100%] h-[200px] mx-auto">
          <img 
            src={bordabuttonArtDeco} 
            alt="Moldura decorativa do botão em estilo Art Déco"
            className="absolute inset-0 w-full h-full object-contain pointer-events-none z-10"
            aria-hidden="true"
          />
          <button
            onClick={() => handleNavigation('/sobre')}
            className={`absolute left-1/2 -translate-x-1/2 -translate-y-1/2 font-gatsby ${isMobile ? 'text-base' : 'text-lg'} px-6 py-2 mt-[120px] h-[80px] w-[255px] pb-2 text-jazz-gold hover:bg-jazz-gold hover:text-black focus:bg-jazz-gold focus:text-black transition-all duration-300 tracking-wider uppercase font-semibold z-0 focus:outline-none focus:ring-2 focus:ring-jazz-gold focus:ring-offset-2 focus:ring-offset-black rounded`}
            aria-label="Conheça nossa Banda de Jazz - Ir para página sobre"
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleNavigation('/sobre');
              }
            }}
          >
            Conheça nossa Banda de jazz
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;