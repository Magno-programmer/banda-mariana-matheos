import React from "react";
import AdvancedSEOMetaTags from "@/components/seo/AdvancedSEOMetaTags";
import AdvancedSchemaMarkup from "@/components/seo/AdvancedSchemaMarkup";
import CTRTracker from "@/components/seo/CTRTracker";

// Importing components
import AboutSection from "@/components/sections/sobre/AboutSection";
import Footer from "@/components/sections/commonPages/footer/Footer";
import WhatsAppButton from "@/components/globalComponents/WhatsAppButton";
import Header from "@/components/sections/commonPages/header/Header";
import AdvancedBreadcrumb from "@/components/globalComponents/AdvancedBreadcrumb";
import RelatedPagesSection from "@/components/globalComponents/RelatedPagesSection";


const AboutPage = () => {
  return (
    <>
      <AdvancedSEOMetaTags 
        title="🎶 História da Mariana Matheos Jazz Band | 15+ Anos | Conheça Nossa Trajetória"
        description="🎶 Conheça a história da Mariana Matheos Jazz Band | 15+ anos de experiência | Formação especializada em jazz, bossa nova e música brasileira. Tradição e qualidade garantida!"
        keywords="história, mariana matheos, jazz band, experiência, formação, tradição, qualidade"
        canonicalUrl="/sobre"
        pageType="organization"
        isOptimizedForCTR={true}
        enableABTesting={true}
        priority="high"
      />
      <AdvancedSchemaMarkup pageType="about" />
      <CTRTracker enableHeatmaps={true} enableScrollTracking={true} enableClickTracking={true} />
      <div className="min-h-screen bg-black">
        <Header />
        <AdvancedBreadcrumb />
        <AboutSection />
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
export default AboutPage;