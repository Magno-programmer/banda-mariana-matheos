import React from "react";
import SEOMetaTags from "@/components/globalComponents/SEOMetaTags";
import AdvancedRichSnippet from "@/components/globalComponents/AdvancedRichSnippet";

// Importing components
import VideosSection from "@/components/sections/galeria/VideosSection";
import Footer from "@/components/sections/commonPages/footer/Footer";
import WhatsAppButton from "@/components/globalComponents/WhatsAppButton";
import Header from "@/components/sections/commonPages/header/Header";
import AdvancedBreadcrumb from "@/components/globalComponents/AdvancedBreadcrumb";

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

      <div>
        <Header />
        <AdvancedBreadcrumb />
        <VideosSection />
        <Footer />
        <WhatsAppButton />
      </div>
    </>
  );
};
export default VideosPage;