
import React from 'react';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import RepertoireSection from '@/components/RepertoireSection';
import GallerySection from '@/components/GallerySection';
import BookingSection from '@/components/BookingSection';
import TestimonialSection from '@/components/TestimonialSection';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';

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
