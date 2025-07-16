import React from "react";
import SEOMetaTags from "@/components/globalComponents/SEOMetaTags";
import AdvancedRichSnippet from "@/components/globalComponents/AdvancedRichSnippet";

// Importing components
import RepertoireSection from "@/components/sections/repertorio/RepertoireSection";
import Footer from "@/components/sections/commonPages/footer/Footer";
import WhatsAppButton from "@/components/globalComponents/WhatsAppButton";
import Header from "@/components/sections/commonPages/header/Header";

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
    
      <div>
        <Header />
        <RepertoireSection />
        <Footer />
        <WhatsAppButton />
      </div>   
    </>
  );
};
export default RepertoirePage;