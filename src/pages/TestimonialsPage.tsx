
import React from "react";
import SEOMetaTags from "@/components/globalComponents/SEOMetaTags";


// Importing components
import Header from "@/components/sections/commonPages/header/Header";
import TestimonialsSection from "@/components/sections/depoimentos/TestimonialsSection";
import Footer from "@/components/sections/commonPages/footer/Footer";
import WhatsAppButton from "@/components/globalComponents/WhatsAppButton";
import AdvancedBreadcrumb from "@/components/globalComponents/AdvancedBreadcrumb";
import RelatedPagesSection from "@/components/globalComponents/RelatedPagesSection";
import EnhancedStructuredData from "@/components/globalComponents/EnhancedStructuredData";

const TestimonialsPage = () => {
  return (
    <>
      <SEOMetaTags 
        title="Depoimentos - Mariana Matheos Jazz Band"
        description="Avaliações 5 estrelas no Google e depoimentos de clientes satisfeitos com os shows da Mariana Matheos Jazz Band."
        keywords="depoimentos, avaliações, reviews, google reviews, banda de jazz, música ao vivo"
        canonicalUrl="/depoimentos"
      />
      
      <EnhancedStructuredData pageType="testimonials" />
      
      <div className="min-h-screen bg-black">
        <Header />
        <AdvancedBreadcrumb />
        <TestimonialsSection />
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

export default TestimonialsPage;
