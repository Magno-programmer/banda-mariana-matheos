import React from "react";
import AboutSection from "@/components/desktopVersion/sobre/AboutSection";
import Footer from "@/components/desktopVersion/commonPages/footer/Footer";
import WhatsAppButton from "@/components/desktopVersion/commonPages/whatsappbuttom/WhatsAppButton";
import Header from "@/components/desktopVersion/commonPages/header/Header";

const AboutPage = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <AboutSection />
      <Footer />
      <WhatsAppButton />
    </div>
  );
};
export default AboutPage;