
import React from "react";

// Importing desktop components
import EstilosMusicaisSection from "@/components/desktopVersion/estilosMusicais/EstilosMusicaisSection";
import Footer from "@/components/desktopVersion/commonPages/footer/Footer";
import WhatsAppButton from "@/components/globalComponents/WhatsAppButton";
import Header from "@/components/desktopVersion/commonPages/header/Header";

// Importing mobile components
import EstilosMusicaisSectionMobile from "@/components/mobileVersion/estilosMusicais/EstilosMusicaisSectionMobile";
import FooterMobile from "@/components/mobileVersion/commonPages/footer/FooterMobile";
import HeaderMobile from "@/components/mobileVersion/commonPages/header/HeaderMobile";

// Importing tablet components
import EstilosMusicaisSectionTablet from "@/components/tabletVersion/estilosMusicais/EstilosMusicaisSectionTablet";
import FooterTablet from "@/components/tabletVersion/commonPages/footer/FooterTablet";
import HeaderTablet from "@/components/tabletVersion/commonPages/header/HeaderTablet";

const EstilosMusicaisPage = () => {
  return (
    <>
      {/* Mobile Version */}
      <div className="block sm:hidden">
        <HeaderMobile />
        <EstilosMusicaisSectionMobile />
        <FooterMobile />
        <WhatsAppButton />
      </div>
      {/* Tablet Version */}
      <div className="hidden sm:block lg:hidden">
        <HeaderTablet />
        <EstilosMusicaisSectionTablet />
        <FooterTablet />
        <WhatsAppButton />
      </div>
      {/* Desktop Version */}
      <div className="hidden lg:block">
        <Header />
        <EstilosMusicaisSection />
        <Footer />
        <WhatsAppButton />
      </div>
    </>
  );
};
export default EstilosMusicaisPage;
