import React from "react";
import RepertoireSection from "@/components/desktopVersion/repertorio/RepertoireSection";
import Footer from "@/components/desktopVersion/commonPages/footer/Footer";
import WhatsAppButton from "@/components/desktopVersion/commonPages/whatsappbuttom/WhatsAppButton";
import Header from "@/components/desktopVersion/commonPages/header/Header";
import RepertoireSectionMobile from "@/components/mobileVersion/repertorio/RepertoireSectionMobile";
import FooterMobile from "@/components/mobileVersion/commonPages/footer/FooterMobile";
import HeaderMobile from "@/components/mobileVersion/commonPages/header/HeaderMobile";

const RepertoirePage = () => {
  return (
    <>
      {/* Mobile Version */}
      <div className="block sm:hidden">
        <HeaderMobile />
        <RepertoireSectionMobile />
        <FooterMobile />
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