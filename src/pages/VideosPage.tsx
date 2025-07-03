import React from "react";
import VideosSection from "@/components/desktopVersion/galeria/VideosSection";
import Footer from "@/components/desktopVersion/commonPages/footer/Footer";
import WhatsAppButton from "@/components/desktopVersion/commonPages/whatsappbuttom/WhatsAppButton";
import Header from "@/components/desktopVersion/commonPages/header/Header";
import VideosSectionMobile from "@/components/mobileVersion/galeria/VideosSectionMobile";
import FooterMobile from "@/components/mobileVersion/commonPages/footer/FooterMobile";
import HeaderMobile from "@/components/mobileVersion/commonPages/header/HeaderMobile";

const VideosPage = () => {
  return (
    <>
      {/* Mobile Version */}
      <div className="block sm:hidden">
        <HeaderMobile />
        <VideosSectionMobile />
        <FooterMobile />
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