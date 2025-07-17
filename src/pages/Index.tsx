
import React from 'react';
import SEOMetaTags from '@/components/globalComponents/SEOMetaTags';
import AdvancedRichSnippet from '@/components/globalComponents/AdvancedRichSnippet';

// Importing components
import Header from '@/components/sections/commonPages/header/Header';
import HeroSection from '@/components/sections/Index/HeroSection';
import Footer from '@/components/sections/commonPages/footer/Footer';
import WhatsAppButton from '@/components/globalComponents/WhatsAppButton';
import AdvancedBreadcrumb from '@/components/globalComponents/AdvancedBreadcrumb';


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
      <div>
        <Header />
        <AdvancedBreadcrumb />
        <HeroSection />
        <Footer />
        <WhatsAppButton />
      </div>
    </>
  );
};

export default Index;
