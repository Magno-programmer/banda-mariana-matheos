import React from "react";
import RepertoireSection from "@/components/desktopVersion/repertorio/RepertoireSection";
import Footer from "@/components/desktopVersion/commonPages/footer/Footer";
import WhatsAppButton from "@/components/desktopVersion/commonPages/whatsappbuttom/WhatsAppButton";
import Header from "@/components/desktopVersion/commonPages/header/Header";

const RepertoirePage = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <RepertoireSection />
      <Footer />
      <WhatsAppButton />
    </div>
  );
};
export default RepertoirePage;