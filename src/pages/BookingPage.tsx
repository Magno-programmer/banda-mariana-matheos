import React from "react";
import BookingSection from "@/components/desktopVersion/agendamento/BookingSection";
import Footer from "@/components/desktopVersion/commonPages/footer/Footer";
import WhatsAppButton from "@/components/desktopVersion/commonPages/whatsappbuttom/WhatsAppButton";
import Header from "@/components/desktopVersion/commonPages/header/Header";

const BookingPage = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <BookingSection />
      <Footer />
      <WhatsAppButton />
    </div>
  );
};
export default BookingPage;