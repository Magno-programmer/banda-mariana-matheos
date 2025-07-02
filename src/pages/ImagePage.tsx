import React from "react";
import ImageSection from "@/components/desktopVersion/galeria/ImagesSection";
import Footer from "@/components/desktopVersion/commonPages/footer/Footer";
import WhatsAppButton from "@/components/desktopVersion/commonPages/whatsappbuttom/WhatsAppButton";
import Header from "@/components/desktopVersion/commonPages/header/Header"; 

const ImagePage = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <ImageSection />
      <Footer />
      <WhatsAppButton />
    </div>
  );
};
export default ImagePage;