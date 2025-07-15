
import React from 'react';
import SEOMetaTags from '@/components/globalComponents/SEOMetaTags';
import AdvancedRichSnippet from '@/components/globalComponents/AdvancedRichSnippet';

// Importing desktop components
import Header from '@/components/desktopVersion/commonPages/header/Header';
import HeroSection from '@/components/desktopVersion/Index/HeroSection';
import TestimonialSection from '@/components/desktopVersion/Index/TestimonialSection';
import Footer from '@/components/desktopVersion/commonPages/footer/Footer';
import WhatsAppButton from '@/components/globalComponents/WhatsAppButton';
import VoiceAccessibilityButton from '@/components/globalComponents/VoiceAccessibilityButton';

// Importing mobile components
import HeaderMobile from '@/components/mobileVersion/commonPages/header/HeaderMobile';
import HeroSectionMobile from '@/components/mobileVersion/Index/HeroSectionMobile';
import FooterMobile from '@/components/mobileVersion/commonPages/footer/FooterMobile';
import TestimonialSectionMobile from '@/components/mobileVersion/Index/TestimonialSectionMobile';

// Importing tablet components
import HeaderTablet from '@/components/tabletVersion/commonPages/header/HeaderTablet';
import HeroSectionTablet from '@/components/tabletVersion/Index/HeroSectionTablet';
import FooterTablet from '@/components/tabletVersion/commonPages/footer/FooterTablet';
import TestimonialSectionTablet from '@/components/tabletVersion/Index/TestimonialSectionTablet';

const Index = () => {
  return (
    <>
      <SEOMetaTags 
        title="Mariana Matheos Jazz Band - Música ao Vivo para Eventos"
        description="Banda de jazz para casamentos e eventos corporativos. Repertório profissional de jazz, bossa nova e música brasileira. Qualidade garantida."
        keywords="banda de jazz, música ao vivo, casamentos, eventos corporativos, shows, repertório jazz, música brasileira"
        canonicalUrl="/"
      />
      <AdvancedRichSnippet />
      {/* Mobile Version */}
      <div className="block sm:hidden">
        <HeaderMobile />
        <div className="p-4 bg-background border-b">
          <VoiceAccessibilityButton />
        </div>
        <HeroSectionMobile />
        <TestimonialSectionMobile />
        <FooterMobile />
        <WhatsAppButton />
      </div>

      {/* Tablet Version */}
      <div className="hidden sm:block lg:hidden">
        <HeaderTablet />
        <div className="p-6 bg-background border-b">
          <VoiceAccessibilityButton />
        </div>
        <HeroSectionTablet />
        <TestimonialSectionTablet />
        <FooterTablet />
        <WhatsAppButton />
      </div>

      {/* Desktop Version */}
      <div className="hidden lg:block">
        <Header />
        <div className="p-8 bg-background border-b">
          <VoiceAccessibilityButton />
        </div>
        <HeroSection />
        <TestimonialSection />
        <Footer />
        <WhatsAppButton />
      </div>
    </>
  );
};

export default Index;
