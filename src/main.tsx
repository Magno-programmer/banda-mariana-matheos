
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import App from "./App.tsx";
import "./index.css";

// Advanced performance monitoring
import AdvancedServiceWorkerRegistration from './components/performance/AdvancedServiceWorkerRegistration';

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <HelmetProvider>
      <App />
      <AdvancedServiceWorkerRegistration 
        enableUpdates={true}
        enableBackgroundSync={true}
        enablePushNotifications={false}
      />
    </HelmetProvider>
  </StrictMode>
);
