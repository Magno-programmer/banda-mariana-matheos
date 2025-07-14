import React from "react";
import SEOMetaTags from "@/components/globalComponents/SEOMetaTags";
import AdvancedRichSnippet from "@/components/globalComponents/AdvancedRichSnippet";

// Importing desktop components
import RepertoireSection from "@/components/desktopVersion/repertorio/RepertoireSection";
import Footer from "@/components/desktopVersion/commonPages/footer/Footer";
import WhatsAppButton from "@/components/globalComponents/WhatsAppButton";
import Header from "@/components/desktopVersion/commonPages/header/Header";

// Importing mobile components
import RepertoireSectionMobile from "@/components/mobileVersion/repertorio/RepertoireSectionMobile";
import FooterMobile from "@/components/mobileVersion/commonPages/footer/FooterMobile";
import HeaderMobile from "@/components/mobileVersion/commonPages/header/HeaderMobile";

// Importing tablet components
import RepertoireSectionTablet from "@/components/tabletVersion/repertorio/RepertoireSectionTablet";
import FooterTablet from "@/components/tabletVersion/commonPages/footer/FooterTablet";
import HeaderTablet from "@/components/tabletVersion/commonPages/header/HeaderTablet";

const RepertoirePage = () => {
  return (
    <>
      <SEOMetaTags 
        title="Repertório - Mariana Matheos Jazz Band"
        description="Repertório completo da Mariana Matheos Jazz Band: jazz clássico, bossa nova, blues, swing e música brasileira para todos os eventos."
        keywords="repertório, jazz clássico, bossa nova, blues, swing, música brasileira, playlist"
        canonicalUrl="/repertorio"
      />
      <AdvancedRichSnippet />
      
      {/* Mobile Version */}
      <div className="block sm:hidden">
        <HeaderMobile />
        <RepertoireSectionMobile />
        <FooterMobile />
        <WhatsAppButton />
      </div>  
      {/* Tablet Version */}
      <div className="hidden sm:block lg:hidden"> 
        <HeaderTablet />
        <RepertoireSectionTablet />
        <FooterTablet />
        <WhatsAppButton />
      </div> 
      {/* Desktop Version */}
      <div className="hidden lg:block">
        <Header />
        <RepertoireSection />
        <Footer />
        <WhatsAppButton />
      </div>   
    </>
  );
};
export default RepertoirePage;