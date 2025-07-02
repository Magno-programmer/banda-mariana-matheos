
import React from 'react';
import HeroSection from '@/components/desktopVersion/Index/HeroSection';
import TestimonialSection from '@/components/desktopVersion/commonPages/testimonial/TestimonialSection';
import Footer from '@/components/desktopVersion/commonPages/footer/Footer';
import WhatsAppButton from '@/components/desktopVersion/commonPages/whatsappbuttom/WhatsAppButton';

const Index = () => {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <TestimonialSection />
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Index;
