import React from "react";
import SEOMetaTags from "@/components/globalComponents/SEOMetaTags";
import AdvancedRichSnippet from "@/components/globalComponents/AdvancedRichSnippet";

// Importing unified responsive components
import Header from "@/components/unified/layout/Header";
import Footer from "@/components/unified/layout/Footer";
import WhatsAppButton from "@/components/globalComponents/WhatsAppButton";

const ContactPage = () => {
  return (
    <>
      <SEOMetaTags 
        title="Contato - Mariana Matheos Jazz Band"
        description="Contato da Mariana Matheos Jazz Band para agendamentos e informações sobre shows e apresentações musicais."
        keywords="contato, telefone, whatsapp, email, agendamento, orçamento"
        canonicalUrl="/contato"
      />
      <AdvancedRichSnippet />
      
      {/* Unified Responsive Layout */}
      <Header />
      <div className="min-h-screen bg-black text-white">
        <h1 className="text-4xl font-bold text-center py-20">Contato - Em Breve</h1>
      </div>
      <Footer />
      <WhatsAppButton />
    </>
  );
};
export default ContactPage;