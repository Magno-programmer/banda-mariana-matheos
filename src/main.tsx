
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import App from "./App.tsx";
import "./index.css";

// Performance and SEO components
import WebVitalsReporter from "./components/performance/WebVitalsReporter";
import AdvancedServiceWorkerRegistration from "./components/performance/AdvancedServiceWorkerRegistration";
import CriticalCSS from "./components/performance/CriticalCSS";
import AggressiveResourcePreloader from "./components/performance/AggressiveResourcePreloader";
import AdvancedSecurityHeaders from "./components/globalComponents/AdvancedSecurityHeaders";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes
    },
  },
});

const helmetContext = {};

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <HelmetProvider context={helmetContext}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          {/* Critical CSS for above-the-fold content */}
          <CriticalCSS />
          
          {/* Advanced security headers */}
          <AdvancedSecurityHeaders />
          
          {/* Aggressive resource preloading */}
          <AggressiveResourcePreloader />
          
          {/* Main application */}
          <App />
          
          {/* Performance monitoring */}
          <WebVitalsReporter 
            enableGA4={true}
            enableConsoleReporting={process.env.NODE_ENV === 'development'}
          />
          
          {/* Advanced Service Worker registration */}
          <AdvancedServiceWorkerRegistration
            enableUpdates={true}
            enableBackgroundSync={true}
            enablePushNotifications={false}
          />
        </BrowserRouter>
      </QueryClientProvider>
    </HelmetProvider>
  </StrictMode>
);
