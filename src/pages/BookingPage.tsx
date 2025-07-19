import React from "react";
import SEOMetaTags from "@/components/globalComponents/SEOMetaTags";


// Importing components
import BookingSection from "@/components/sections/agendamento/BookingSection";
import Footer from "@/components/sections/commonPages/footer/Footer";
import WhatsAppButton from "@/components/globalComponents/WhatsAppButton";
import Header from "@/components/sections/commonPages/header/Header";
import RelatedPagesSection from "@/components/globalComponents/RelatedPagesSection";

const BookingPage = () => {
  return (
    <>
      <SEOMetaTags 
        title="Agendamento - Mariana Matheos Jazz Band"
        description="Agende sua apresentação com a Mariana Matheos Jazz Band. Música ao vivo para casamentos, eventos corporativos e shows especiais."
        keywords="agendamento, contratar banda, shows, casamentos, eventos corporativos, música ao vivo"
        canonicalUrl="/agenda"
      />
      
      
      <div className="min-h-screen bg-black">
        <Header />
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