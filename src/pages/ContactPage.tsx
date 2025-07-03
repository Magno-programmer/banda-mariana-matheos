import React from "react";
import ContactSection from "@/components/desktopVersion/contatos/ContactSection";
import Footer from "@/components/desktopVersion/commonPages/footer/Footer";
import WhatsAppButton from "@/components/desktopVersion/commonPages/whatsappbuttom/WhatsAppButton";
import Header from "@/components/desktopVersion/commonPages/header/Header";

const ContactPage = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <ContactSection />
      <Footer />
      <WhatsAppButton />
    </div>
  );
};
export default ContactPage;