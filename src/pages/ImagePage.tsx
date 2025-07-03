import React from "react";

// Importing desktop components
import ImageSection from "@/components/desktopVersion/galeria/ImagesSection";
import Footer from "@/components/desktopVersion/commonPages/footer/Footer";
import WhatsAppButton from "@/components/globalComponents/WhatsAppButton";
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
      {/* Mobile Version */}
      <div className="block sm:hidden">
        <HeaderMobile />
        <ImageSectionMobile />
        <FooterMobile />
        <WhatsAppButton />
      </div>
      {/* Tablet Version */}
      <div className="hidden sm:block lg:hidden">
        <HeaderTablet />
        <ImageSectionTablet />
        <FooterTablet />
        <WhatsAppButton />
      </div>
      {/* Desktop Version */}
      <div className="hidden lg:block">
        <Header />
        <ImageSection />
        <Footer />
        <WhatsAppButton />
      </div>
    </>
  );
};
export default ImagePage;