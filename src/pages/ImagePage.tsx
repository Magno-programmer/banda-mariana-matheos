import React from "react";
import SEOMetaTags from "@/components/globalComponents/SEOMetaTags";
import AdvancedRichSnippet from "@/components/globalComponents/AdvancedRichSnippet";

// Importing desktop components
import ImageSection from "@/components/desktopVersion/galeria/ImagesSection";
import Footer from "@/components/desktopVersion/commonPages/footer/Footer";
import WhatsAppButton from "@/components/globalComponents/WhatsAppButton";
import VoiceAccessibilityButton from "@/components/globalComponents/VoiceAccessibilityButton";
import Header from "@/components/desktopVersion/commonPages/header/Header"; 

// Importing mobile components
import ImageSectionMobile from "@/components/mobileVersion/galeria/ImagesSectionMobile";
import FooterMobile from "@/components/mobileVersion/commonPages/footer/FooterMobile";
import HeaderMobile from "@/components/mobileVersion/commonPages/header/HeaderMobile";

// Importing tablet components
import ImageSectionTablet from "@/components/tabletVersion/galeria/ImagesSectionTablet";
import FooterTablet from "@/components/tabletVersion/commonPages/footer/FooterTablet";
import HeaderTablet from "@/components/tabletVersion/commonPages/header/HeaderTablet";

const ImagePage = () => {
  return (
    <>
      <SEOMetaTags 
        title="Galeria de Fotos - Mariana Matheos Jazz Band"
        description="Fotos das apresentações da Mariana Matheos Jazz Band em eventos, casamentos e shows. Veja a banda em ação!"
        keywords="fotos, galeria, apresentações, shows, eventos, casamentos, banda de jazz"
        canonicalUrl="/fotos"
      />
      <AdvancedRichSnippet />
      {/* Mobile Version */}
      <div className="block sm:hidden">
        <HeaderMobile />
        <div className="p-4 bg-background border-b">
          <VoiceAccessibilityButton />
        </div>
        <ImageSectionMobile />
        <FooterMobile />
        <WhatsAppButton />
      </div>
      {/* Tablet Version */}
      <div className="hidden sm:block lg:hidden">
        <HeaderTablet />
        <div className="p-6 bg-background border-b">
          <VoiceAccessibilityButton />
        </div>
        <ImageSectionTablet />
        <FooterTablet />
        <WhatsAppButton />
      </div>
      {/* Desktop Version */}
      <div className="hidden lg:block">
        <Header />
        <div className="p-8 bg-background border-b">
          <VoiceAccessibilityButton />
        </div>
        <ImageSection />
        <Footer />
        <WhatsAppButton />
      </div>
    </>
  );
};
export default ImagePage;