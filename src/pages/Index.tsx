
import React from 'react';
import StructuredData from '@/components/globalComponents/StructuredData';

// Importing desktop components
import HeroSection from '@/components/desktopVersion/Index/HeroSection';
import TestimonialSection from '@/components/desktopVersion/Index/TestimonialSection';
import Footer from '@/components/desktopVersion/commonPages/footer/Footer';
import WhatsAppButton from '@/components/globalComponents/WhatsAppButton';

// Importing mobile components
import HeroSectionMobile from '@/components/mobileVersion/Index/HeroSectionMobile';
import FooterMobile from '@/components/mobileVersion/commonPages/footer/FooterMobile';
import TestimonialSectionMobile from '@/components/mobileVersion/Index/TestimonialSectionMobile';

import HeroSectionTablet from '@/components/tabletVersion/Index/HeroSectionTablet';
import FooterTablet from '@/components/tabletVersion/commonPages/footer/FooterTablet';
import TestimonialSectionTablet from '@/components/tabletVersion/Index/TestimonialSectionTablet';

const Index = () => {
  return (
    <>
      {/* Structured Data for SEO */}
      <StructuredData />
      
      {/* Mobile Version */}
      <div className="block sm:hidden">
        <HeroSectionMobile />
        <TestimonialSectionMobile />
        <FooterMobile />
        <WhatsAppButton />
      </div>

      {/* Tablet Version */}
      <div className="hidden sm:block lg:hidden">
        <HeroSectionTablet />
        <TestimonialSectionTablet />
        <FooterTablet />
        <WhatsAppButton />
      </div>

      {/* Desktop Version */}
      <div className="hidden lg:block">
        <HeroSection />
        <TestimonialSection />
        <Footer />
        <WhatsAppButton />
      </div>
    </>
  );
};

export default Index;
