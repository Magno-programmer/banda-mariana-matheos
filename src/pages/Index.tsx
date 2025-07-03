
import React from 'react';
import HeroSection from '@/components/desktopVersion/Index/HeroSection';
import TestimonialSection from '@/components/desktopVersion/Index/TestimonialSection';
import Footer from '@/components/desktopVersion/commonPages/footer/Footer';
import WhatsAppButton from '@/components/desktopVersion/commonPages/whatsappbuttom/WhatsAppButton';
import HeroSectionMobile from '@/components/mobileVersion/Index/HeroSectionMobile';
import FooterMobile from '@/components/mobileVersion/commonPages/footer/FooterMobile';
import TestimonialSectionMobile from '@/components/mobileVersion/Index/TestimonialSectionMobile';

const Index = () => {
  return (
    <>
    {/* Mobile Version */}
      <div className="block sm:hidden">
        <HeroSectionMobile />
        <TestimonialSectionMobile />
        <FooterMobile />
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
