import React from "react";
import VideosSection from "@/components/desktopVersion/galeria/VideosSection";
import Footer from "@/components/desktopVersion/commonPages/footer/Footer";
import WhatsAppButton from "@/components/desktopVersion/commonPages/whatsappbuttom/WhatsAppButton";
import Header from "@/components/desktopVersion/commonPages/header/Header";

const VideosPage = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <VideosSection />
      <Footer />
      <WhatsAppButton />
    </div>
  );
};
export default VideosPage;