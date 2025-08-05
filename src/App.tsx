
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { HelmetProvider } from 'react-helmet-async';
import EnhancedStructuredData from "@/components/globalComponents/EnhancedStructuredData";
import InternationalRouter from "./components/international/InternationalRouter";
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
import UrlRedirectHandler from "./components/globalComponents/UrlRedirectHandler";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <HelmetProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <InternationalRouter>
            <SkipLink />
            <UrlRedirectHandler />
            <ScrollToTop />
            <Routes>
              {/* Default Portuguese routes */}
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
              
              {/* International routes with language prefix */}
              <Route path="/:lang" element={<Index />} />
              <Route path="/:lang/sobre" element={<AboutPage />} />
              <Route path="/:lang/fotos" element={<ImagePage />} />
              <Route path="/:lang/videos" element={<VideosPage />} />
              <Route path="/:lang/repertorio" element={<RepertoirePage />} />
              <Route path="/:lang/agenda" element={<BookingPage />} />
              <Route path="/:lang/faq" element={<FAQPage />} />
              <Route path="/:lang/depoimentos" element={<TestimonialsPage />} />
              <Route path="/:lang/contato" element={<ContactPage />} />
              <Route path="/:lang/blog" element={<BlogPage />} />
              <Route path="/:lang/blog/:slug" element={<BlogArticlePage />} />
            </Routes>
          </InternationalRouter>
        </BrowserRouter>
      </TooltipProvider>
    </HelmetProvider>
  </QueryClientProvider>
);

export default App;
