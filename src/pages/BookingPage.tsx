import React from "react";
import SEOMetaTags from "@/components/globalComponents/SEOMetaTags";
import AdvancedRichSnippet from "@/components/globalComponents/AdvancedRichSnippet";

// Importing components
import BookingSection from "@/components/sections/agendamento/BookingSection";
import Footer from "@/components/sections/commonPages/footer/Footer";
import WhatsAppButton from "@/components/globalComponents/WhatsAppButton";
import Header from "@/components/sections/commonPages/header/Header";

const BookingPage = () => {
  return (
    <>
      <SEOMetaTags 
        title="Agendamento - Mariana Matheos Jazz Band"
        description="Agende sua apresentação com a Mariana Matheos Jazz Band. Música ao vivo para casamentos, eventos corporativos e shows especiais."
        keywords="agendamento, contratar banda, shows, casamentos, eventos corporativos, música ao vivo"
        canonicalUrl="/agenda"
      />
      <AdvancedRichSnippet />
      
      <div>
        <Header />
        <BookingSection />
        <Footer />
        <WhatsAppButton />
      </div>
    </>
  );
};
export default BookingPage;