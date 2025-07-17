
import React from 'react';
import SEOMetaTags from '@/components/globalComponents/SEOMetaTags';


// Importing components
import Header from '@/components/sections/commonPages/header/Header';
import HeroSection from '@/components/sections/Index/HeroSection';
import Footer from '@/components/sections/commonPages/footer/Footer';
import WhatsAppButton from '@/components/globalComponents/WhatsAppButton';
import AdvancedBreadcrumb from '@/components/globalComponents/AdvancedBreadcrumb';
import RelatedPagesSection from '@/components/globalComponents/RelatedPagesSection';


const Index = () => {
  return (
    <>
      <SEOMetaTags 
        title="Mariana Matheos Jazz Band - Música ao Vivo para Eventos"
        description="Banda de jazz para casamentos e eventos corporativos. Repertório profissional de jazz, bossa nova e música brasileira. Qualidade garantida."
        keywords="banda de jazz, música ao vivo, casamentos, eventos corporativos, shows, repertório jazz, música brasileira"
        canonicalUrl="/"
      />
      
      <div className="min-h-screen bg-black">
        <Header />
        <AdvancedBreadcrumb />
        <HeroSection />
        <RelatedPagesSection 
          title="Descubra Nossos Serviços"
          subtitle="Explore tudo que oferecemos para tornar seu evento inesquecível"
          variant="grid"
          maxLinks={6}
          className="bg-gradient-to-b from-black via-jazz-dark to-black"
        />
        <Footer />
        <WhatsAppButton />
      </div>
    </>
  );
};

export default Index;
