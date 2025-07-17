import React from "react";
import AdvancedSEOMetaTags from "@/components/seo/AdvancedSEOMetaTags";
import AdvancedSchemaMarkup from "@/components/seo/AdvancedSchemaMarkup";
import CTRTracker from "@/components/seo/CTRTracker";

// Importing components
import RepertoireSection from "@/components/sections/repertorio/RepertoireSection";
import Footer from "@/components/sections/commonPages/footer/Footer";
import WhatsAppButton from "@/components/globalComponents/WhatsAppButton";
import Header from "@/components/sections/commonPages/header/Header";
import AdvancedBreadcrumb from "@/components/globalComponents/AdvancedBreadcrumb";
import RelatedPagesSection from "@/components/globalComponents/RelatedPagesSection";

const RepertoirePage = () => {
  return (
    <>
      <AdvancedSEOMetaTags 
        title="🎼 200+ Músicas Jazz | Repertório Completo | Mariana Matheos | Escute Agora!"
        description="🎼 200+ músicas no repertório! Jazz clássico, bossa nova, blues e swing. Repertório completo da Mariana Matheos Jazz Band. Escute samples antes de contratar!"
        keywords="repertório, 200 músicas, jazz clássico, bossa nova, blues, swing, samples"
        canonicalUrl="/repertorio"
        pageType="website"
        isOptimizedForCTR={true}
        enableABTesting={true}
        priority="high"
      />
      <AdvancedSchemaMarkup pageType="services" />
      <CTRTracker enableHeatmaps={true} enableScrollTracking={true} enableClickTracking={true} />
    
      <div className="min-h-screen bg-black">
        <Header />
        <AdvancedBreadcrumb />
        <RepertoireSection />
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
export default RepertoirePage;