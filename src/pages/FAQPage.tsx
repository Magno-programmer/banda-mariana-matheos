
import React from "react";
import SEOMetaTags from "@/components/globalComponents/SEOMetaTags";
import AdvancedRichSnippet from "@/components/globalComponents/AdvancedRichSnippet";

// Importing unified responsive components
import Header from "@/components/unified/layout/Header";
import Footer from "@/components/unified/layout/Footer";
import WhatsAppButton from "@/components/globalComponents/WhatsAppButton";

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

      {/* Unified Responsive Layout */}
      <Header />
      <div className="min-h-screen bg-black text-white">
        <h1 className="text-4xl font-bold text-center py-20">FAQ - Em Breve</h1>
      </div>
      <Footer />
      <WhatsAppButton />
    </>
  );
};
export default FAQPage;
