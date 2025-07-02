
import React from 'react';
import HeroSection from '@/components/desktopVersion/Index/HeroSection';
import AboutSection from '@/components/desktopVersion/sobre/AboutSection';
import RepertoireSection from '@/components/desktopVersion/repertorio/RepertoireSection';
import GallerySection from '@/components/desktopVersion/galeria/GallerySection';
import BookingSection from '@/components/desktopVersion/booking/BookingSection';
import TestimonialSection from '@/components/desktopVersion/testimonial/TestimonialSection';
import Footer from '@/components/desktopVersion/footer/Footer';
import WhatsAppButton from '@/components/desktopVersion/whatsappbuttom/WhatsAppButton';

const Index = () => {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <AboutSection />
      <RepertoireSection />
      <GallerySection />
      <BookingSection />
      <TestimonialSection />
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Index;
