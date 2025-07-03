import React from "react";
import AboutSection from "@/components/desktopVersion/sobre/AboutSection";
import Footer from "@/components/desktopVersion/commonPages/footer/Footer";
import WhatsAppButton from "@/components/desktopVersion/commonPages/whatsappbuttom/WhatsAppButton";
import Header from "@/components/desktopVersion/commonPages/header/Header";
import AboutSectionMobile from "@/components/mobileVersion/sobre/AboutSectionMobile";
import FooterMobile from "@/components/mobileVersion/commonPages/footer/FooterMobile";
import HeaderMobile from "@/components/mobileVersion/commonPages/header/HeaderMobile";

const AboutPage = () => {
  return (
    <>
      {/* Mobile Version */}
      <div className="block sm:hidden">
        <HeaderMobile />
        <AboutSectionMobile />
        <FooterMobile />
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