
import React from "react";
import SEOMetaTags from "@/components/globalComponents/SEOMetaTags";

// Importing structured data for SEO
import FAQStructuredData from "@/components/globalComponents/estrutura/FAQStructuredData";

// Importing desktop components
import FAQSection from "@/components/desktopVersion/depoimentos/FAQSection";
import Footer from "@/components/desktopVersion/commonPages/footer/Footer";
import WhatsAppButton from "@/components/globalComponents/WhatsAppButton";
import Header from "@/components/desktopVersion/commonPages/header/Header";

// Importing mobile components
import FAQSectionMobile from "@/components/mobileVersion/depoimentos/FAQSectionMobile";
import FooterMobile from "@/components/mobileVersion/commonPages/footer/FooterMobile";
import HeaderMobile from "@/components/mobileVersion/commonPages/header/HeaderMobile";

// Importing tablet components
import FAQSectionTablet from "@/components/tabletVersion/depoimentos/FAQSectionTablet";
import FooterTablet from "@/components/tabletVersion/commonPages/footer/FooterTablet";
import HeaderTablet from "@/components/tabletVersion/commonPages/header/HeaderTablet";

const FAQPage = () => {
  return (
    <>
        <SEOMetaTags 
          title="FAQ - Perguntas Frequentes | Mariana Matheos Jazz Band"
          description="Dúvidas sobre contratação, repertório e serviços da Mariana Matheos Jazz Band. Respostas às perguntas mais comuns dos clientes."
          keywords="FAQ, perguntas frequentes, dúvidas, contratação, repertório, equipamentos"
          canonicalUrl="/faq"
        />
        {/* Structured Data for SEO */}
        <FAQStructuredData />

        {/* Mobile Version */}
        <div className="block sm:hidden">
        <HeaderMobile />
        <FAQSectionMobile />
        <FooterMobile />
        <WhatsAppButton />
        </div>
        {/* Tablet Version */}
        <div className="hidden sm:block lg:hidden">
        <HeaderTablet />
        <FAQSectionTablet />
        <FooterTablet />
        <WhatsAppButton />
        </div>
        {/* Desktop Version */}
        <div className="hidden lg:block">
        <Header />
        <FAQSection />
        <Footer />
        <WhatsAppButton />
        </div>
    </>
  );
};
export default FAQPage;
