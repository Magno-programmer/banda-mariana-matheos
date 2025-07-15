import React from "react";
import SEOMetaTags from "@/components/globalComponents/SEOMetaTags";
import AdvancedRichSnippet from "@/components/globalComponents/AdvancedRichSnippet";

// Importing unified responsive components
import Header from "@/components/unified/layout/Header";
import Footer from "@/components/unified/layout/Footer";
import RepertoireSection from "@/components/unified/sections/RepertoireSection";
import WhatsAppButton from "@/components/globalComponents/WhatsAppButton";

const RepertoirePage = () => {
  return (
    <>
      <SEOMetaTags 
        title="Repertório - Mariana Matheos Jazz Band"
        description="Repertório completo da Mariana Matheos Jazz Band: jazz clássico, bossa nova, blues, swing e música brasileira para todos os eventos."
        keywords="repertório, jazz clássico, bossa nova, blues, swing, música brasileira, playlist"
        canonicalUrl="/repertorio"
      />
      <AdvancedRichSnippet />
      
      {/* Unified Responsive Layout */}
      <Header />
      <RepertoireSection />
      <Footer />
      <WhatsAppButton />
    </>
  );
};
export default RepertoirePage;