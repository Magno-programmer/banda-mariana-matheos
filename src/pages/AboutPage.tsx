import React from "react";
import SEOMetaTags from "@/components/globalComponents/SEOMetaTags";
import AdvancedRichSnippet from "@/components/globalComponents/AdvancedRichSnippet";

// Importing unified responsive components
import Header from "@/components/unified/layout/Header";
import Footer from "@/components/unified/layout/Footer";
import WhatsAppButton from "@/components/globalComponents/WhatsAppButton";

const AboutPage = () => {
  return (
    <>
      <SEOMetaTags 
        title="Sobre a Banda - Mariana Matheos Jazz Band"
        description="História da Mariana Matheos Jazz Band, formação especializada em jazz, bossa nova e música brasileira para eventos especiais."
        keywords="sobre a banda, história, formação musical, jazz band, bossa nova, música brasileira"
        canonicalUrl="/sobre"
      />
      <AdvancedRichSnippet />
      
      {/* Unified Responsive Layout */}
      <Header />
      <div className="min-h-screen bg-black text-white">
        <h1 className="text-4xl font-bold text-center py-20">Sobre a Banda - Em Breve</h1>
      </div>
      <Footer />
      <WhatsAppButton />
    </>
  );
};
export default AboutPage;