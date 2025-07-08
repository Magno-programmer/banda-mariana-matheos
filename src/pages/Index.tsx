
import React from 'react';

// Importing desktop components
import Header from '@/components/desktopVersion/commonPages/header/Header';
import HeroSection from '@/components/desktopVersion/Index/HeroSection';
import TestimonialSection from '@/components/desktopVersion/Index/TestimonialSection';
import Footer from '@/components/desktopVersion/commonPages/footer/Footer';
import WhatsAppButton from '@/components/globalComponents/WhatsAppButton';

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
      {/* Mobile Version */}
      <div className="block sm:hidden">
        <HeaderMobile />
        <HeroSectionMobile />
        <TestimonialSectionMobile />
        <FooterMobile />
        <WhatsAppButton />
      </div>

      {/* Tablet Version */}
      <div className="hidden sm:block lg:hidden">
        <HeaderTablet />
        <HeroSectionTablet />
        <TestimonialSectionTablet />
        <FooterTablet />
        <WhatsAppButton />
      </div>

      {/* Desktop Version */}
      <div className="hidden lg:block">
        <Header />
        <HeroSection />
        <TestimonialSection />
        <Footer />
        <WhatsAppButton />
      </div>
    </>
  );
};

export default Index;
