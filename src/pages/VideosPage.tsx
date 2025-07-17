import React from "react";
import SEOMetaTags from "@/components/globalComponents/SEOMetaTags";


// Importing components
import VideosSection from "@/components/sections/galeria/VideosSection";
import Footer from "@/components/sections/commonPages/footer/Footer";
import WhatsAppButton from "@/components/globalComponents/WhatsAppButton";
import Header from "@/components/sections/commonPages/header/Header";
import AdvancedBreadcrumb from "@/components/globalComponents/AdvancedBreadcrumb";
import RelatedPagesSection from "@/components/globalComponents/RelatedPagesSection";

const VideosPage = () => {
  return (
    <>
      <SEOMetaTags 
        title="Vídeos - Mariana Matheos Jazz Band"
        description="Vídeos das apresentações da Mariana Matheos Jazz Band. Conheça nosso repertório e qualidade musical em ação."
        keywords="vídeos, apresentações, repertório, jazz, música ao vivo, shows"
        canonicalUrl="/videos"
      />
      

      <div className="min-h-screen bg-black">
        <Header />
        <AdvancedBreadcrumb />
        <VideosSection />
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
export default VideosPage;