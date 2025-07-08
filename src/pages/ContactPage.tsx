import React from "react";
// Importing structured data for SEO
import ContactStructuredData from "@/components/globalComponents/estrutura/ContactStructuredData";

// Importing desktop components
import ContactSection from "@/components/desktopVersion/contatos/ContactSection";
import Footer from "@/components/desktopVersion/commonPages/footer/Footer";
import WhatsAppButton from "@/components/globalComponents/WhatsAppButton";
import Header from "@/components/desktopVersion/commonPages/header/Header";

// Importing mobile components
import ContactSectionMobile from "@/components/mobileVersion/contatos/ContactSectionMobile";
import FooterMobile from "@/components/mobileVersion/commonPages/footer/FooterMobile";
import HeaderMobile from "@/components/mobileVersion/commonPages/header/HeaderMobile";

// Importing tablet components
import ContactSectionTablet from "@/components/tabletVersion/contatos/ContactSectionTablet";
import FooterTablet from "@/components/tabletVersion/commonPages/footer/FooterTablet";
import HeaderTablet from "@/components/tabletVersion/commonPages/header/HeaderTablet";

const ContactPage = () => {
  return (
    <>
      {/* Structured Data for SEO */}
      <ContactStructuredData />
      
      {/* Mobile Version */}
      <div className="block sm:hidden">
          <HeaderMobile />
          <ContactSectionMobile />
          <FooterMobile />
          <WhatsAppButton />
      </div>
      {/* Tablet Version */}
      <div className="hidden sm:block lg:hidden">
          <HeaderTablet />
          <ContactSectionTablet />
          <FooterTablet />
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