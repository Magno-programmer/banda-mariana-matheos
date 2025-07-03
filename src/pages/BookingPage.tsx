import React from "react";
import BookingSection from "@/components/desktopVersion/agendamento/BookingSection";
import Footer from "@/components/desktopVersion/commonPages/footer/Footer";
import WhatsAppButton from "@/components/desktopVersion/commonPages/whatsappbuttom/WhatsAppButton";
import Header from "@/components/desktopVersion/commonPages/header/Header";
import BookingSectionMobile from "@/components/mobileVersion/agendamento/BookingSectionMobile";
import FooterMobile from "@/components/mobileVersion/commonPages/footer/FooterMobile";
import HeaderMobile from "@/components/mobileVersion/commonPages/header/HeaderMobile";

const BookingPage = () => {
  return (
    <>
      {/* Mobile Version */}
      <div className="block sm:hidden">
        <HeaderMobile />
        <BookingSectionMobile />
        <FooterMobile />
        <WhatsAppButton />
      </div>
      {/* Desktop Version */}
      <div className="hidden lg:block">
        <Header />
        <BookingSection />
        <Footer />
        <WhatsAppButton />
      </div>
    </>
  );
};
export default BookingPage;