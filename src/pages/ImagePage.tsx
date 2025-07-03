import React from "react";
import ImageSection from "@/components/desktopVersion/galeria/ImagesSection";
import Footer from "@/components/desktopVersion/commonPages/footer/Footer";
import WhatsAppButton from "@/components/desktopVersion/commonPages/whatsappbuttom/WhatsAppButton";
import Header from "@/components/desktopVersion/commonPages/header/Header"; 
import ImageSectionMobile from "@/components/mobileVersion/galeria/ImagesSectionMobile";
import FooterMobile from "@/components/mobileVersion/commonPages/footer/FooterMobile";
import HeaderMobile from "@/components/mobileVersion/commonPages/header/HeaderMobile";

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