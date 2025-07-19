
import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
import "./App.css";

// Global components
import ScrollToTop from "./components/globalComponents/ScrollToTop";
import SkipLink from "./components/globalComponents/SkipLink";
import FocusManager from "./components/globalComponents/FocusManager";
import ViewportManager from "./components/globalComponents/ViewportManager";
import UrlRedirectHandler from "./components/globalComponents/UrlRedirectHandler";
import VisualBreadcrumb from "./components/globalComponents/VisualBreadcrumb";

// Lazy load pages for better performance
const Index = lazy(() => import("./pages/Index"));
const AboutPage = lazy(() => import("./pages/AboutPage"));
const RepertoirePage = lazy(() => import("./pages/RepertoirePage"));
const ImagePage = lazy(() => import("./pages/ImagePage"));
const VideosPage = lazy(() => import("./pages/VideosPage"));
const BookingPage = lazy(() => import("./pages/BookingPage"));
const ContactPage = lazy(() => import("./pages/ContactPage"));
const TestimonialsPage = lazy(() => import("./pages/TestimonialsPage"));
const FAQPage = lazy(() => import("./pages/FAQPage"));
const BlogPage = lazy(() => import("./pages/BlogPage"));
const BlogArticlePage = lazy(() => import("./pages/BlogArticlePage"));

// Loading component
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
  </div>
);

function App() {
  return (
    <>
      {/* Skip link for accessibility */}
      <SkipLink />
      
      {/* Global focus and viewport management */}
      <FocusManager />
      <ViewportManager />
      
      {/* URL handling */}
      <UrlRedirectHandler />
      
      {/* Visual breadcrumb navigation */}
      <VisualBreadcrumb />
      
      {/* Main content with lazy loading */}
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/sobre" element={<AboutPage />} />
          <Route path="/repertorio" element={<RepertoirePage />} />
          <Route path="/fotos" element={<ImagePage />} />
          <Route path="/videos" element={<VideosPage />} />
          <Route path="/agenda" element={<BookingPage />} />
          <Route path="/contato" element={<ContactPage />} />
          <Route path="/depoimentos" element={<TestimonialsPage />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:slug" element={<BlogArticlePage />} />
        </Routes>
      </Suspense>
      
      {/* Global scroll behavior */}
      <ScrollToTop />
      
      {/* Toast notifications */}
      <Toaster />
    </>
  );
}

export default App;
