
import React from "react";
import SEOMetaTags from "@/components/globalComponents/SEOMetaTags";
// Importing structured data for SEO
import TestimonialsStructuredData from "@/components/globalComponents/estrutura/TestimonialsStructuredData";

// Importing desktop components
import Header from "@/components/desktopVersion/commonPages/header/Header";
import AvaliationSection from "@/components/desktopVersion/depoimentos/AvaliationSection";
import Footer from "@/components/desktopVersion/commonPages/footer/Footer";
import WhatsAppButton from "@/components/globalComponents/WhatsAppButton";

// Importing tablet components
import HeaderTablet from "@/components/tabletVersion/commonPages/header/HeaderTablet";
import AvaliationSectionTablet from "@/components/tabletVersion/depoimentos/AvaliationSectionTablet";
import FooterMobile from "@/components/mobileVersion/commonPages/footer/FooterMobile";

// Importing mobile components
import HeaderMobile from "@/components/mobileVersion/commonPages/header/HeaderMobile";
import AvaliationSectionMobile from "@/components/mobileVersion/depoimentos/AvaliationSectionMobile";
import FooterTablet from "@/components/tabletVersion/commonPages/footer/FooterTablet";

const TestimonialsPage = () => {
  return (
    <>
      <SEOMetaTags 
        title="Depoimentos - Mariana Matheos Jazz Band"
        description="Avaliações 5 estrelas no Google e depoimentos de clientes satisfeitos com os shows da Mariana Matheos Jazz Band."
        keywords="depoimentos, avaliações, reviews, google reviews, banda de jazz, música ao vivo"
        canonicalUrl="/depoimentos"
      />
      {/* Structured Data for SEO */}
      <TestimonialsStructuredData />
      
      {/* Mobile Version */}
      <div className="block sm:hidden">
        <HeaderMobile />
        <AvaliationSectionMobile />
        <FooterMobile />
        <WhatsAppButton />
      </div>  
      {/* Tablet Version */}
      <div className="hidden sm:block lg:hidden"> 
        <HeaderTablet />
        <AvaliationSectionTablet />
        <FooterTablet />
        <WhatsAppButton />
      </div> 
      {/* Desktop Version */}
      <div className="hidden lg:block">
        <Header />
        <AvaliationSection />
        <Footer />
        <WhatsAppButton />
      </div>   
    </>
  );
};

export default TestimonialsPage;
