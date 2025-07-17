
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { HelmetProvider } from 'react-helmet-async';
import EnhancedStructuredData from "@/components/globalComponents/EnhancedStructuredData";
import Index from "./pages/Index";
import AboutPage from "./pages/AboutPage";
import ImagePage from "./pages/ImagePage";
import VideosPage from "./pages/VideosPage";
import RepertoirePage from "./pages/RepertoirePage";
import BookingPage from "./pages/BookingPage";
import ContactPage from "./pages/ContactPage";
import FAQPage from "./pages/FAQPage";
import TestimonialsPage from "./pages/TestimonialsPage";
import BlogPage from "./pages/BlogPage";
import BlogArticlePage from "./pages/BlogArticlePage";
import ScrollToTop from "./components/globalComponents/ScrollToTop";
import SkipLink from "./components/globalComponents/SkipLink";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <HelmetProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
        <SkipLink />
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/sobre" element={<AboutPage />} />
          <Route path="/fotos" element={<ImagePage />} />
          <Route path="/videos" element={<VideosPage />} />
          <Route path="/repertorio" element={<RepertoirePage />} />
          <Route path="/agenda" element={<BookingPage />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/depoimentos" element={<TestimonialsPage />} />
          <Route path="/contato" element={<ContactPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:slug" element={<BlogArticlePage />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
    </HelmetProvider>
  </QueryClientProvider>
);

export default App;
