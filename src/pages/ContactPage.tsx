import React from "react";
import SEOMetaTags from "@/components/globalComponents/SEOMetaTags";
import AdvancedRichSnippet from "@/components/globalComponents/AdvancedRichSnippet";

// Importing components
import ContactSection from "@/components/sections/contatos/ContactSection";
import Footer from "@/components/sections/commonPages/footer/Footer";
import WhatsAppButton from "@/components/globalComponents/WhatsAppButton";
import Header from "@/components/sections/commonPages/header/Header";
import AdvancedBreadcrumb from "@/components/globalComponents/AdvancedBreadcrumb";
import RelatedPagesSection from "@/components/globalComponents/RelatedPagesSection";

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
      
      <div className="min-h-screen bg-black">
        <Header />
        <AdvancedBreadcrumb />
        <ContactSection />
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
export default ContactPage;