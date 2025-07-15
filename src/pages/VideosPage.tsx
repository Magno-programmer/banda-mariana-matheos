import React from "react";
import SEOMetaTags from "@/components/globalComponents/SEOMetaTags";
import AdvancedRichSnippet from "@/components/globalComponents/AdvancedRichSnippet";

// Importing unified responsive components
import Header from "@/components/unified/layout/Header";
import Footer from "@/components/unified/layout/Footer";
import WhatsAppButton from "@/components/globalComponents/WhatsAppButton";

const VideosPage = () => {
  return (
    <>
      <SEOMetaTags 
        title="Vídeos - Mariana Matheos Jazz Band"
        description="Vídeos das apresentações da Mariana Matheos Jazz Band. Conheça nosso repertório e qualidade musical em ação."
        keywords="vídeos, apresentações, repertório, jazz, música ao vivo, shows"
        canonicalUrl="/videos"
      />
      <AdvancedRichSnippet />
      {/* Unified Responsive Layout */}
      <Header />
      <div className="min-h-screen bg-black text-white">
        <h1 className="text-4xl font-bold text-center py-20">Galeria de Vídeos - Em Breve</h1>
      </div>
      <Footer />
      <WhatsAppButton />
    </>
  );
};
export default VideosPage;