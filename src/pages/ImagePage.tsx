import React from "react";
import SEOMetaTags from "@/components/globalComponents/SEOMetaTags";


// Importing components
import ImageSection from "@/components/sections/galeria/ImagesSection";
import Footer from "@/components/sections/commonPages/footer/Footer";
import WhatsAppButton from "@/components/globalComponents/WhatsAppButton";
import Header from "@/components/sections/commonPages/header/Header";
import AdvancedBreadcrumb from "@/components/globalComponents/AdvancedBreadcrumb";
import RelatedPagesSection from "@/components/globalComponents/RelatedPagesSection";

const ImagePage = () => {
  return (
    <>
      <SEOMetaTags 
        title="Galeria de Fotos - Mariana Matheos Jazz Band"
        description="Fotos das apresentações da Mariana Matheos Jazz Band em eventos, casamentos e shows. Veja a banda em ação!"
        keywords="fotos, galeria, apresentações, shows, eventos, casamentos, banda de jazz"
        canonicalUrl="/fotos"
      />
      

      <div className="min-h-screen bg-black">
        <Header />
        <AdvancedBreadcrumb />
        <ImageSection />
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
export default ImagePage;