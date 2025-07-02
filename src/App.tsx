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

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<Navigate to="/inicio" replace/>} />
          <Route path="/inicio" element={<Index />} />
          <Route path="/sobre" element={<AboutPage />} />
          <Route path="/fotos" element={<ImagePage />} />
          <Route path="/videos" element={<VideosPage />} />
          <Route path="/repertorio" element={<RepertoirePage />} />
          <Route path="/agenda" element={<BookingPage />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
