import React from "react";
import AdvancedSEOMetaTags from "@/components/seo/AdvancedSEOMetaTags";
import AdvancedSchemaMarkup from "@/components/seo/AdvancedSchemaMarkup";
import CTRTracker from "@/components/seo/CTRTracker";
import LocalPackOptimizer from "@/components/seo/LocalPackOptimizer";

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
      <AdvancedSEOMetaTags 
        title="📞 Contato Direto | Mariana Matheos Jazz | Atendimento Imediato | WhatsApp"
        description="📞 Contato direto com a Mariana Matheos Jazz Band BH | Atendimento imediato via WhatsApp | Orçamento personalizado em 2h. Fale conosco agora!"
        keywords="contato, whatsapp, orçamento, atendimento, imediato, mariana matheos jazz"
        canonicalUrl="/contato"
        pageType="website"
        isOptimizedForCTR={true}
        enableABTesting={true}
        priority="high"
      />
      <AdvancedSchemaMarkup pageType="contact" />
      <CTRTracker enableHeatmaps={true} enableScrollTracking={true} enableClickTracking={true} />
      <LocalPackOptimizer 
        businessName="Mariana Matheos Jazz Band"
        address="Belo Horizonte, MG"
        phone="(31) 99752-2127"
        rating={5.0}
        reviewCount={50}
        hours="Seg-Dom: 09:00-22:00"
        categories={["Banda de Jazz", "Música ao Vivo", "Entretenimento"]}
        services={["Casamentos", "Eventos Corporativos", "Shows", "Festas"]}
        images={["/images/banda.png", "/images/cantora.png", "/images/pianista.png"]}
      />
      
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