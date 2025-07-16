
import React from "react";
import SEOMetaTags from "@/components/globalComponents/SEOMetaTags";
import AdvancedRichSnippet from "@/components/globalComponents/AdvancedRichSnippet";

// Importing components
import FAQSection from "@/components/sections/depoimentos/FAQSection";
import Footer from "@/components/sections/commonPages/footer/Footer";
import WhatsAppButton from "@/components/globalComponents/WhatsAppButton";
import Header from "@/components/sections/commonPages/header/Header";

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

        <div>
        <Header />
        <FAQSection />
        <Footer />
        <WhatsAppButton />
        </div>
    </>
  );
};
export default FAQPage;
