import React from "react";
import SEOMetaTags from "@/components/globalComponents/SEOMetaTags";

// Importing desktop components
import VideosSection from "@/components/desktopVersion/galeria/VideosSection";
import Footer from "@/components/desktopVersion/commonPages/footer/Footer";
import WhatsAppButton from "@/components/globalComponents/WhatsAppButton";
import Header from "@/components/desktopVersion/commonPages/header/Header";

// Importing mobile components
import VideosSectionMobile from "@/components/mobileVersion/galeria/VideosSectionMobile";
import FooterMobile from "@/components/mobileVersion/commonPages/footer/FooterMobile";
import HeaderMobile from "@/components/mobileVersion/commonPages/header/HeaderMobile";

// Importing tablet components
import VideosSectionTablet from "@/components/tabletVersion/galeria/VideosSectionTablet";
import FooterTablet from "@/components/tabletVersion/commonPages/footer/FooterTablet";
import HeaderTablet from "@/components/tabletVersion/commonPages/header/HeaderTablet";

const VideosPage = () => {
  return (
    <>
      <SEOMetaTags 
        title="Vídeos - Mariana Matheos Jazz Band"
        description="Assista aos vídeos das apresentações da Mariana Matheos Jazz Band. Conheça nosso repertório e qualidade musical em ação."
        keywords="vídeos, apresentações, repertório, jazz, música ao vivo, shows"
        canonicalUrl="/videos"
      />
      {/* Mobile Version */}
      <div className="block sm:hidden">
        <HeaderMobile />
        <VideosSectionMobile />
        <FooterMobile />
        <WhatsAppButton />
      </div>
      {/* Tablet Version */}
      <div className="hidden sm:block lg:hidden">
        <HeaderTablet />
        <VideosSectionTablet />
        <FooterTablet />
        <WhatsAppButton />
      </div>
      {/* Desktop Version */}
      <div className="hidden lg:block">
        <Header />
        <VideosSection />
        <Footer />
        <WhatsAppButton />
      </div>
    </>
  );
};
export default VideosPage;