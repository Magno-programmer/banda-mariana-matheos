
import React from "react";
import AdvancedSEOMetaTags from "@/components/seo/AdvancedSEOMetaTags";
import AdvancedSchemaMarkup from "@/components/seo/AdvancedSchemaMarkup";
import CTRTracker from "@/components/seo/CTRTracker";
import FeaturedSnippetsOptimizer, { sampleFAQData } from "@/components/seo/FeaturedSnippetsOptimizer";

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
      <AdvancedSEOMetaTags 
        title="❓ FAQ Completo | Mariana Matheos Jazz | Todas as Respostas | Leia Agora!"
        description="❓ FAQ completo da Mariana Matheos Jazz Band | Todas as respostas sobre contratação, repertório, equipamentos e valores. Esclareça suas dúvidas agora!"
        keywords="FAQ, perguntas frequentes, dúvidas, contratação, repertório, equipamentos, valores, mariana matheos jazz"
        canonicalUrl="/faq"
        pageType="website"
        isOptimizedForCTR={true}
        enableABTesting={true}
        priority="high"
      />
      <AdvancedSchemaMarkup pageType="faq" />
      <CTRTracker enableHeatmaps={true} enableScrollTracking={true} enableClickTracking={true} />

      <div className="min-h-screen bg-black">
        <Header />
        <AdvancedBreadcrumb />
        <FeaturedSnippetsOptimizer 
          content={sampleFAQData} 
          pageType="faq" 
          title="Perguntas Frequentes - Mariana Matheos Jazz Band" 
        />
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
