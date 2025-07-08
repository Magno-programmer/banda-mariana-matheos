
import React from "react";
// Importing structured data for SEO
import TestimonialsStructuredData from "@/components/globalComponents/estrutura/TestimonialsStructuredData";

// Importing desktop components
import AvaliationSection from "@/components/desktopVersion/depoimentos/AvaliationSection";

// Importing tablet components
import AvaliationSectionTablet from "@/components/tabletVersion/depoimentos/AvaliationSectionTablet";

// Importing mobile components
import AvaliationSectionMobile from "@/components/mobileVersion/depoimentos/AvaliationSectionMobile";

// Importing common components
import Header from "@/components/desktopVersion/commonPages/header/Header";
import HeaderTablet from "@/components/tabletVersion/commonPages/header/HeaderTablet";
import HeaderMobile from "@/components/mobileVersion/commonPages/header/HeaderMobile";
import Footer from "@/components/desktopVersion/commonPages/footer/Footer";
import FooterTablet from "@/components/tabletVersion/commonPages/footer/FooterTablet";
import FooterMobile from "@/components/mobileVersion/commonPages/footer/FooterMobile";
import WhatsAppButton from "@/components/globalComponents/WhatsAppButton";

// Importing hooks
import { useIsMobile } from "@/hooks/use-mobile";

const TestimonialsPage = () => {
  const isMobile = useIsMobile();
  const isTablet = window.innerWidth >= 768 && window.innerWidth < 1024;

  return (
    <>
      <TestimonialsStructuredData />
      <div className="min-h-screen bg-black">
        {/* Header responsive */}
        {isMobile ? <HeaderMobile /> : isTablet ? <HeaderTablet /> : <Header />}
        
        {/* Main content */}
        <main>
          {isMobile ? <AvaliationSectionMobile /> : isTablet ? <AvaliationSectionTablet /> : <AvaliationSection />}
        </main>

        {/* Footer responsive */}
        {isMobile ? <FooterMobile /> : isTablet ? <FooterTablet /> : <Footer />}
        
        {/* WhatsApp button */}
        <WhatsAppButton />
      </div>
    </>
  );
};

export default TestimonialsPage;
