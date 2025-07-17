
import React from "react";
import SEOMetaTags from "@/components/globalComponents/SEOMetaTags";
import AdvancedRichSnippet from "@/components/globalComponents/AdvancedRichSnippet";
import FAQStructuredData from "@/components/globalComponents/FAQStructuredData";

// Importing components
import FAQSection from "@/components/sections/depoimentos/FAQSection";
import Footer from "@/components/sections/commonPages/footer/Footer";
import WhatsAppButton from "@/components/globalComponents/WhatsAppButton";
import Header from "@/components/sections/commonPages/header/Header";
import AdvancedBreadcrumb from "@/components/globalComponents/AdvancedBreadcrumb";
import RelatedPagesSection from "@/components/globalComponents/RelatedPagesSection";

const FAQPage = () => {
  return (
    <>
        <SEOMetaTags 
          title="FAQ - Perguntas Frequentes | Mariana Matheos Jazz Band"
          description="Dúvidas sobre contratação, repertório e serviços da Mariana Matheos Jazz Band. Respostas às perguntas mais comuns dos clientes."
          keywords="FAQ, perguntas frequentes, dúvidas, contratação, repertório, equipamentos"
          canonicalUrl="/faq"
        />
        <AdvancedRichSnippet />
        <FAQStructuredData pageType="faq-index" />

      <div className="min-h-screen bg-black">
        <Header />
        <AdvancedBreadcrumb />
        <FAQSection />
        <RelatedPagesSection 
          variant="grid"
          maxLinks={6}
          className="bg-gradient-to-b from-black via-jazz-dark to-black"
        />
        <Footer />
        <WhatsAppButton />
      </div>
    </>
  );
};
export default FAQPage;
