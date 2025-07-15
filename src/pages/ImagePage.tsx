import React from "react";
import SEOMetaTags from "@/components/globalComponents/SEOMetaTags";
import AdvancedRichSnippet from "@/components/globalComponents/AdvancedRichSnippet";

// Importing unified responsive components
import Header from "@/components/unified/layout/Header";
import Footer from "@/components/unified/layout/Footer";
import WhatsAppButton from "@/components/globalComponents/WhatsAppButton";

const ImagePage = () => {
  return (
    <>
      <SEOMetaTags 
        title="Galeria de Fotos - Mariana Matheos Jazz Band"
        description="Fotos das apresentações da Mariana Matheos Jazz Band em eventos, casamentos e shows. Veja a banda em ação!"
        keywords="fotos, galeria, apresentações, shows, eventos, casamentos, banda de jazz"
        canonicalUrl="/fotos"
      />
      <AdvancedRichSnippet />
      
      {/* Unified Responsive Layout */}
      <Header />
      <div className="min-h-screen bg-black text-white">
        <h1 className="text-4xl font-bold text-center py-20">Galeria de Fotos - Em Breve</h1>
      </div>
      <Footer />
      <WhatsAppButton />
    </>
  );
};
export default ImagePage;