import React from "react";
import SEOMetaTags from "@/components/globalComponents/SEOMetaTags";
import AdvancedRichSnippet from "@/components/globalComponents/AdvancedRichSnippet";

import Header from '@/components/unified/Header';
import AboutSection from '@/components/unified/AboutSection';
import Footer from '@/components/unified/Footer';
import WhatsAppButton from '@/components/globalComponents/WhatsAppButton';

const AboutPage = () => {
  return (
    <>
      <SEOMetaTags 
        title="Sobre a Banda - Mariana Matheos Jazz Band"
        description="História da Mariana Matheos Jazz Band, formação especializada em jazz, bossa nova e música brasileira para eventos especiais."
        keywords="sobre a banda, história, formação musical, jazz band, bossa nova, música brasileira"
        canonicalUrl="/sobre"
      />
      <AdvancedRichSnippet />
      
      <Header />
      <AboutSection />
      <Footer />
      <WhatsAppButton />
    </>
  );
};
export default AboutPage;