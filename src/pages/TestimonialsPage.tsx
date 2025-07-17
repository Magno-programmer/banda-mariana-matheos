
import React from "react";
import SEOMetaTags from "@/components/globalComponents/SEOMetaTags";


// Importing components
import Header from "@/components/sections/commonPages/header/Header";
import AvaliationSection from "@/components/sections/depoimentos/AvaliationSection";
import Footer from "@/components/sections/commonPages/footer/Footer";
import WhatsAppButton from "@/components/globalComponents/WhatsAppButton";
import AdvancedBreadcrumb from "@/components/globalComponents/AdvancedBreadcrumb";
import RelatedPagesSection from "@/components/globalComponents/RelatedPagesSection";

const TestimonialsPage = () => {
  return (
    <>
      <SEOMetaTags 
        title="Depoimentos - Mariana Matheos Jazz Band"
        description="Avaliações 5 estrelas no Google e depoimentos de clientes satisfeitos com os shows da Mariana Matheos Jazz Band."
        keywords="depoimentos, avaliações, reviews, google reviews, banda de jazz, música ao vivo"
        canonicalUrl="/depoimentos"
      />
      
      
      <div className="min-h-screen bg-black">
        <Header />
        <AdvancedBreadcrumb />
        <AvaliationSection />
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
