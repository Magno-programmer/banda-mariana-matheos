
import React from 'react';
import SEOMetaTags from '@/components/globalComponents/SEOMetaTags';
import AdvancedRichSnippet from '@/components/globalComponents/AdvancedRichSnippet';
import Header from '@/components/unified/Header';
import HeroSection from '@/components/unified/HeroSection';
import TestimonialSection from '@/components/unified/TestimonialSection';
import Footer from '@/components/unified/Footer';
import WhatsAppButton from '@/components/globalComponents/WhatsAppButton';

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
      <Header />
      <HeroSection />
      <TestimonialSection />
      <Footer />
      <WhatsAppButton />
    </>
  );
};

export default Index;
