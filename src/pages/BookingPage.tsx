import React from "react";
import SEOMetaTags from "@/components/globalComponents/SEOMetaTags";
import AdvancedRichSnippet from "@/components/globalComponents/AdvancedRichSnippet";

// Importing unified responsive components
import Header from "@/components/unified/layout/Header";
import Footer from "@/components/unified/layout/Footer";
import WhatsAppButton from "@/components/globalComponents/WhatsAppButton";

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
      
      {/* Unified Responsive Layout */}
      <Header />
      <div className="min-h-screen bg-black text-white">
        <h1 className="text-4xl font-bold text-center py-20">Agendamento - Em Breve</h1>
      </div>
      <Footer />
      <WhatsAppButton />
    </>
  );
};
export default BookingPage;