import React from "react";
import SEOMetaTags from "@/components/globalComponents/SEOMetaTags";
// Importing structured data for SEO
import AboutStructuredData from "@/components/globalComponents/estrutura/AboutStructuredData";

// Importing desktop components
import AboutSection from "@/components/desktopVersion/sobre/AboutSection";
import Footer from "@/components/desktopVersion/commonPages/footer/Footer";
import WhatsAppButton from "@/components/globalComponents/WhatsAppButton";
import Header from "@/components/desktopVersion/commonPages/header/Header";

// Importing mobile components
import AboutSectionMobile from "@/components/mobileVersion/sobre/AboutSectionMobile";
import FooterMobile from "@/components/mobileVersion/commonPages/footer/FooterMobile";
import HeaderMobile from "@/components/mobileVersion/commonPages/header/HeaderMobile";

// Importing tablet components
import AboutSectionTablet from "@/components/tabletVersion/sobre/AboutSectionTablet";
import FooterTablet from "@/components/tabletVersion/commonPages/footer/FooterTablet";
import HeaderTablet from "@/components/tabletVersion/commonPages/header/HeaderTablet";

const AboutPage = () => {
  return (
    <>
      <SEOMetaTags 
        title="Sobre a Banda - Mariana Matheos Jazz Band"
        description="História da Mariana Matheos Jazz Band, formação especializada em jazz, bossa nova e música brasileira para eventos especiais."
        keywords="sobre a banda, história, formação musical, jazz band, bossa nova, música brasileira"
        canonicalUrl="/sobre"
      />
      {/* Structured Data for SEO */}
      <AboutStructuredData />
      
      {/* Mobile Version */}
      <div className="block sm:hidden">
        <HeaderMobile />
        <AboutSectionMobile />
        <FooterMobile />
        <WhatsAppButton />
      </div>
      {/* Tablet Version */}
      <div className="hidden sm:block lg:hidden">
        <HeaderTablet />
        <AboutSectionTablet />
        <FooterTablet />
        <WhatsAppButton />
      </div>
      {/* Desktop Version */}
      <div className="hidden lg:block">
        <Header />
        <AboutSection />
        <Footer />
        <WhatsAppButton />
      </div>  
    </>
  );
};
export default AboutPage;