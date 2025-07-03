import React from "react";
import ContactSection from "@/components/desktopVersion/contatos/ContactSection";
import Footer from "@/components/desktopVersion/commonPages/footer/Footer";
import WhatsAppButton from "@/components/desktopVersion/commonPages/whatsappbuttom/WhatsAppButton";
import Header from "@/components/desktopVersion/commonPages/header/Header";
import ContactSectionMobile from "@/components/mobileVersion/contatos/ContactSectionMobile";
import FooterMobile from "@/components/mobileVersion/commonPages/footer/FooterMobile";
import HeaderMobile from "@/components/mobileVersion/commonPages/header/HeaderMobile";

const ContactPage = () => {
  return (
    <>
        {/* Mobile Version */}
        <div className="block sm:hidden">
            <HeaderMobile />
            <ContactSectionMobile />
            <FooterMobile />
            <WhatsAppButton />
        </div>
        {/* Desktop Version */}
        <div className="hidden lg:block">
            <Header />
            <ContactSection />
            <Footer />
            <WhatsAppButton />
        </div>
    </>
  );
};
export default ContactPage;