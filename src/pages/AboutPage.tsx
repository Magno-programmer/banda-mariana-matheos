import React from "react";
import SEOMetaTags from "@/components/globalComponents/SEOMetaTags";
import AdvancedRichSnippet from "@/components/globalComponents/AdvancedRichSnippet";

// Importing components
import AboutSection from "@/components/sections/sobre/AboutSection";
import Footer from "@/components/sections/commonPages/footer/Footer";
import WhatsAppButton from "@/components/globalComponents/WhatsAppButton";
import Header from "@/components/sections/commonPages/header/Header";
import AdvancedBreadcrumb from "@/components/globalComponents/AdvancedBreadcrumb";
import RelatedPagesSection from "@/components/globalComponents/RelatedPagesSection";


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
      <div className="min-h-screen bg-black">
        <Header />
        <AdvancedBreadcrumb />
        <AboutSection />
        <RelatedPagesSection 
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
export default AboutPage;