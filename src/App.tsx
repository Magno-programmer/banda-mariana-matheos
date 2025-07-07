
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import AboutPage from "./pages/AboutPage";
import ImagePage from "./pages/ImagePage";
import VideosPage from "./pages/VideosPage";
import RepertoirePage from "./pages/RepertoirePage";
import BookingPage from "./pages/BookingPage";
import ContactPage from "./pages/ContactPage";
import EstilosMusicaisPage from "./pages/EstilosMusicaisPage";
import FAQPage from "./pages/FAQPage";
import ScrollToTop from "./components/globalComponents/ScrollToTop";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="*" element={<Navigate to="/inicio" replace/>} />
          <Route path="/inicio" element={<Index />} />
          <Route path="/sobre" element={<AboutPage />} />
          <Route path="/fotos" element={<ImagePage />} />
          <Route path="/videos" element={<VideosPage />} />
          <Route path="/repertorio" element={<RepertoirePage />} />
          <Route path="/agenda" element={<BookingPage />} />
          <Route path="/contato" element={<ContactPage />} />
          <Route path="/estilos-musicais" element={<EstilosMusicaisPage />} />
          <Route path="/faq" element={<FAQPage />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
