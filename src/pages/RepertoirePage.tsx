import React from "react";
import SEOMetaTags from "@/components/globalComponents/SEOMetaTags";
import AdvancedRichSnippet from "@/components/globalComponents/AdvancedRichSnippet";

// Importing unified responsive components
import Header from "@/components/unified/layout/Header";
import Footer from "@/components/unified/layout/Footer";
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
      <div className="min-h-screen bg-black text-white">
        <h1 className="text-4xl font-bold text-center py-20">Repertório - Em Breve</h1>
      </div>
      <Footer />
      <WhatsAppButton />
    </>
  );
};
export default RepertoirePage;