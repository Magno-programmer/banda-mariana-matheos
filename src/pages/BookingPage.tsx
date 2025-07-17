import React from "react";
import AdvancedSEOMetaTags from "@/components/seo/AdvancedSEOMetaTags";
import AdvancedSchemaMarkup from "@/components/seo/AdvancedSchemaMarkup";
import CTRTracker from "@/components/seo/CTRTracker";
import FeaturedSnippetsOptimizer, { sampleHowToData } from "@/components/seo/FeaturedSnippetsOptimizer";

// Importing components
import BookingSection from "@/components/sections/agendamento/BookingSection";
import Footer from "@/components/sections/commonPages/footer/Footer";
import WhatsAppButton from "@/components/globalComponents/WhatsAppButton";
import Header from "@/components/sections/commonPages/header/Header";
import AdvancedBreadcrumb from "@/components/globalComponents/AdvancedBreadcrumb";
import RelatedPagesSection from "@/components/globalComponents/RelatedPagesSection";

const BookingPage = () => {
  return (
    <>
      <AdvancedSEOMetaTags 
        title="📅 Agenda Limitada 2024 | Mariana Matheos Jazz | Reserve Sua Data Hoje!"
        description="📅 Agenda limitada 2024! Agende sua apresentação com a Mariana Matheos Jazz Band. Música ao vivo para casamentos e eventos corporativos. Consulte disponibilidade!"
        keywords="agenda, agendamento, reserva, 2024, limitada, casamentos, eventos corporativos"
        canonicalUrl="/agenda"
        pageType="event"
        isOptimizedForCTR={true}
        enableABTesting={true}
        priority="high"
      />
      <AdvancedSchemaMarkup pageType="events" />
      <CTRTracker enableHeatmaps={true} enableScrollTracking={true} enableClickTracking={true} />
      
      <div className="min-h-screen bg-black">
        <Header />
        <AdvancedBreadcrumb />
        <FeaturedSnippetsOptimizer 
          content={sampleHowToData} 
          pageType="howto" 
          title="Como Contratar a Mariana Matheos Jazz Band" 
        />
        <BookingSection />
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
export default BookingPage;