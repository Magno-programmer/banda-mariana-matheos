import React from "react";
import SEOMetaTags from "@/components/globalComponents/SEOMetaTags";
import AdvancedRichSnippet from "@/components/globalComponents/AdvancedRichSnippet";

// Importing desktop components
import BookingSection from "@/components/desktopVersion/agendamento/BookingSection";
import Footer from "@/components/desktopVersion/commonPages/footer/Footer";
import WhatsAppButton from "@/components/globalComponents/WhatsAppButton";
import VoiceAccessibilityButton from "@/components/globalComponents/VoiceAccessibilityButton";
import Header from "@/components/desktopVersion/commonPages/header/Header";

// Importing mobile components
import BookingSectionMobile from "@/components/mobileVersion/agendamento/BookingSectionMobile";
import FooterMobile from "@/components/mobileVersion/commonPages/footer/FooterMobile";
import HeaderMobile from "@/components/mobileVersion/commonPages/header/HeaderMobile";

// Importing tablet components
import BookingSectionTablet from "@/components/tabletVersion/agendamento/BookingSectionTablet";
import FooterTablet from "@/components/tabletVersion/commonPages/footer/FooterTablet";
import HeaderTablet from "@/components/tabletVersion/commonPages/header/HeaderTablet";

const BookingPage = () => {
  return (
    <>
      <SEOMetaTags 
        title="Agendamento - Mariana Matheos Jazz Band"
        description="Agende sua apresentação com a Mariana Matheos Jazz Band. Música ao vivo para casamentos, eventos corporativos e shows especiais."
        keywords="agendamento, contratar banda, shows, casamentos, eventos corporativos, música ao vivo"
        canonicalUrl="/agenda"
      />
      <AdvancedRichSnippet />
      
      {/* Mobile Version */}
      <div className="block sm:hidden">
        <HeaderMobile />
        <div className="p-4 bg-background border-b">
          <VoiceAccessibilityButton />
        </div>
        <BookingSectionMobile />
        <FooterMobile />
        <WhatsAppButton />
      </div>
      {/* Tablet Version */}
      <div className="hidden sm:block lg:hidden">
        <HeaderTablet />
        <div className="p-6 bg-background border-b">
          <VoiceAccessibilityButton />
        </div>
        <BookingSectionTablet />
        <FooterTablet />
        <WhatsAppButton />
      </div>
      {/* Desktop Version */}
      <div className="hidden lg:block">
        <Header />
        <div className="p-8 bg-background border-b">
          <VoiceAccessibilityButton />
        </div>
        <BookingSection />
        <Footer />
        <WhatsAppButton />
      </div>
    </>
  );
};
export default BookingPage;