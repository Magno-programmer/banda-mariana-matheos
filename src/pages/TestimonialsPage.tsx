
import React from "react";
import SEOMetaTags from "@/components/globalComponents/SEOMetaTags";
import AdvancedRichSnippet from "@/components/globalComponents/AdvancedRichSnippet";

// Importing unified responsive components
import Header from "@/components/unified/layout/Header";
import Footer from "@/components/unified/layout/Footer";
import WhatsAppButton from "@/components/globalComponents/WhatsAppButton";

const TestimonialsPage = () => {
  return (
    <>
      <SEOMetaTags 
        title="Depoimentos - Mariana Matheos Jazz Band"
        description="Avaliações 5 estrelas no Google e depoimentos de clientes satisfeitos com os shows da Mariana Matheos Jazz Band."
        keywords="depoimentos, avaliações, reviews, google reviews, banda de jazz, música ao vivo"
        canonicalUrl="/depoimentos"
      />
      <AdvancedRichSnippet />
      
      {/* Unified Responsive Layout */}
      <Header />
      <div className="min-h-screen bg-black text-white">
        <h1 className="text-4xl font-bold text-center py-20">Depoimentos - Em Breve</h1>
      </div>
      <Footer />
      <WhatsAppButton />
    </>
  );
};

export default TestimonialsPage;
